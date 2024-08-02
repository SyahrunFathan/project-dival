const ModelGraph = require("../../models/ModelGraph.js");
const ModelRumahSakit = require("../../models/ModelRumahSakit.js");
const axios = require("axios");

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
};

function haversineDistance(coord1, coord2) {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}

function convertRouteToGraph(route) {
  const graph = {};
  const coordinates = route.geometry.coordinates;
  // console.log(coordinates);

  for (let i = 0; i < coordinates.length - 1; i++) {
    const start = coordinates[i];
    const end = coordinates[i + 1];
    const startKey = `${i}`;
    const endKey = `${i + 1}`;
    const distance = haversineDistance(start, end);

    if (!graph[startKey]) graph[startKey] = {};
    if (!graph[endKey]) graph[endKey] = {};

    graph[startKey][endKey] = distance;
    graph[endKey][startKey] = distance; // Jika graf tidak berarah, tambahkan ini
  }

  return graph;
}

function dijkstra(graph, startNode) {
  const distances = {};
  const visited = {};
  const previousNodes = {};

  for (let node in graph) {
    distances[node] = Infinity;
    previousNodes[node] = null;
  }

  distances[startNode] = 0;

  while (Object.keys(visited).length !== Object.keys(graph).length) {
    const currentNode = Object.keys(distances).reduce((closestNode, node) => {
      if (
        !visited[node] &&
        (closestNode === null || distances[node] < distances[closestNode])
      ) {
        closestNode = node;
      }
      return closestNode;
    }, null);

    if (distances[currentNode] === Infinity) {
      break;
    }

    for (let neighbor in graph[currentNode]) {
      const newDistance = distances[currentNode] + graph[currentNode][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previousNodes[neighbor] = currentNode;
      }
    }

    visited[currentNode] = true;
  }

  return { distances, previousNodes };
}

async function getRouteFromMapbox(start, destination) {
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1Ijoic3lhaHJ1bjE5IiwiYSI6ImNseHZheW5ndDFxcjUya3B4MTF6cGh3djgifQ.lndfFCRzCfSUdLfBXbaoUg";
  try {
    const startCoords = `${start[0]},${start[1]}`;
    const destinationCoords = `${destination[0]},${destination[1]}`;

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${destinationCoords}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    const response = await axios.get(url);

    if (response.data.routes && response.data.routes.length > 0) {
      return response.data.routes[0];
    } else {
      throw new Error("No route found");
    }
  } catch (error) {
    console.error("Error fetching route from Mapbox:", error);
    throw error;
  }
}

module.exports = {
  createGraph: async (req, res) => {
    try {
      const { rsId } = req.body;
      const checkRsId = await ModelGraph.findAll({
        where: {
          rs_id: rsId,
        },
      });

      if (checkRsId[0])
        return res
          .status(400)
          .json({ message: "Tujuan RS ini sudah memiliki graph!" });

      const lat1 = -0.9018363186733893;
      const lng1 = 119.87812991231158;

      const ambilData = await ModelRumahSakit.findOne({
        where: { id_rs: rsId },
      });
      const lat2 = parseFloat(ambilData?.latitude);
      const lng2 = parseFloat(ambilData?.longitude);

      if (!lat2 || !lng2) {
        return res
          .status(400)
          .json({ message: "Invalid latitude or longitude from database" });
      }

      const allLocations = await ModelRumahSakit.findAll();

      const graph = {};
      allLocations.forEach((location) => {
        const { id_rs, latitude, longitude } = location;
        graph[id_rs] = {};
        // Calculate distance to all other locations
        allLocations.forEach((otherLocation) => {
          const {
            id_rs: otherId,
            latitude: otherLat,
            longitude: otherLng,
          } = otherLocation;
          graph[id_rs][otherId] = haversine(
            latitude,
            longitude,
            otherLat,
            otherLng
          );
        });
      });

      // Calculate distance using Haversine formula
      const distance = haversine(lat1, lng1, lat2, lng2);

      const timeInMinutes = (distance / 20) * 60;

      await ModelGraph.create({
        rs_id: rsId,
        jarak: `${distance.toFixed(2)} Km`,
        waktu: `${timeInMinutes.toFixed(2)} Menit`,
      });

      return res.status(201).json({ message: "Berhasil di tambahkan!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getGraph: async (req, res) => {
    try {
      const response = await ModelGraph.findAll({
        include: {
          model: ModelRumahSakit,
          as: "rs",
          foreignKey: "rs_id",
        },
      });

      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteGraph: async (req, res) => {
    try {
      await ModelGraph.destroy({
        where: {
          id_graph: req.params.id,
        },
      });

      return res.status(200).json({ message: "Graph berhasil di hapus!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  postDirection: async (req, res) => {
    try {
      const { start, graphId } = req.body;
      const ambildata = await ModelGraph.findOne({
        include: {
          model: ModelRumahSakit,
          as: "rs",
          foreignKey: "rs_id",
        },
        where: {
          id_graph: graphId,
        },
      });

      const destination = [
        parseFloat(ambildata.rs.longitude),
        parseFloat(ambildata.rs.latitude),
      ];

      const route = await getRouteFromMapbox(start, destination);
      const graph = convertRouteToGraph(route);
      const result = dijkstra(graph, "0");

      return res.status(200).json({ result, destination, ambildata });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
