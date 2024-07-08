const graphLib = require('graph-data-structure');

export function haversineDistance(lat1, lon1, lat2, lon2) {
  const r = 6371;
  const dlat = ((lat2 - lat1) * Math.PI) / 180;
  const dlon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    0.5 -
    Math.cos(dlat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dlon))) /
      2;

  return r * 2 * Math.asin(Math.sqrt(a));
}

export function createGraph(coordinates) {
  const graph = graphLib.Graph();

  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const startNode = coordinates[i].id;
      const endNode = coordinates[j].id;
      const distance = haversineDistance(
        coordinates[i].latitude,
        coordinates[i].longitude,
        coordinates[j].latitude,
        coordinates[j].longitude,
      );

      graph.addEdge(startNode, endNode, distance);
    }
  }

  return graph;
}

export function djikstraPathWithPolyline(graph, startNode, endNode) {
  const paths = graph.shortestPath(startNode, endNode);
  if (!paths) return {path: [], polyline: []};

  const polyline = [];
  for (let i = 0; i < paths.length - 1; i++) {
    polyline.push([paths[i], paths[i + 1]]);
  }

  return {path: paths, polyline: polyline};
}
