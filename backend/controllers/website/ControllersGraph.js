import ModelGraph from "../../models/ModelGraph.js";
import ModelRumahSakit from "../../models/ModelRumahSakit.js";

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

class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(element, priority) {
    const newElement = { value: element, priority };
    if (this.isEmpty()) {
      this.collection.push(newElement);
    } else {
      let added = false;
      for (let i = 0; i < this.collection.length; i++) {
        if (priority < this.collection[i].priority) {
          this.collection.splice(i, 0, newElement);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(newElement);
      }
    }
  }
  dequeue() {
    return this.collection.shift();
  }
  isEmpty() {
    return this.collection.length === 0;
  }
}

const dijkstra = (graph, startNode) => {
  const distances = {};
  const visited = {};
  const pq = new PriorityQueue();

  distances[startNode] = 0;
  pq.enqueue(startNode, 0);

  while (!pq.isEmpty()) {
    const { value: currentNode } = pq.dequeue();
    visited[currentNode] = true;

    const neighbors = graph[currentNode];
    for (let neighbor in neighbors) {
      if (!visited[neighbor]) {
        const newDist = distances[currentNode] + neighbors[neighbor];
        if (!distances[neighbor] || newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.enqueue(neighbor, newDist);
        }
      }
    }
  }

  return distances;
};

export const createGraph = async (req, res) => {
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

    const ambilData = await ModelRumahSakit.findOne({ where: { id_rs: rsId } });
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
};

export const getGraph = async (req, res) => {
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
};

export const deleteGraph = async (req, res) => {
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
};
