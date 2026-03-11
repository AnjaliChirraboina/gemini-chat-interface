import { getAllConnections, getStopById, type Connection, type TransportMode } from "@/data/transportData";

export interface RouteStep {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  mode: TransportMode;
  routeLabel?: string;
  duration: number;
  distance: number;
}

export interface Route {
  steps: RouteStep[];
  totalDuration: number;
  totalDistance: number;
  transfers: number;
}

type OptimizeBy = "time" | "transfers" | "distance";

export function findRoute(startId: string, endId: string, optimizeBy: OptimizeBy = "time"): Route | null {
  if (startId === endId) return null;

  const allConnections = getAllConnections();

  // Build adjacency list
  const adj = new Map<string, Connection[]>();
  for (const c of allConnections) {
    if (!adj.has(c.from)) adj.set(c.from, []);
    adj.get(c.from)!.push(c);
  }

  // Dijkstra's algorithm
  const dist = new Map<string, number>();
  const prev = new Map<string, { connection: Connection; prevMode: TransportMode | null }>();
  const visited = new Set<string>();

  dist.set(startId, 0);

  const getCost = (conn: Connection, prevMode: TransportMode | null): number => {
    switch (optimizeBy) {
      case "time":
        return conn.duration;
      case "distance":
        return conn.distance;
      case "transfers": {
        // Primary: minimize transfers, secondary: minimize time
        const transferPenalty = prevMode && prevMode !== conn.mode ? 100 : 0;
        return transferPenalty + conn.duration * 0.01;
      }
    }
  };

  while (true) {
    // Find unvisited node with smallest distance
    let current: string | null = null;
    let minDist = Infinity;
    for (const [node, d] of dist) {
      if (!visited.has(node) && d < minDist) {
        minDist = d;
        current = node;
      }
    }
    if (current === null || current === endId) break;

    visited.add(current);

    const neighbors = adj.get(current) ?? [];
    const prevEntry = prev.get(current);
    const prevMode = prevEntry?.connection.mode ?? null;

    for (const conn of neighbors) {
      if (visited.has(conn.to)) continue;
      const cost = getCost(conn, prevMode);
      const newDist = minDist + cost;
      if (newDist < (dist.get(conn.to) ?? Infinity)) {
        dist.set(conn.to, newDist);
        prev.set(conn.to, { connection: conn, prevMode });
      }
    }
  }

  // Reconstruct path
  if (!prev.has(endId)) return null;

  const steps: RouteStep[] = [];
  let current = endId;
  while (prev.has(current)) {
    const { connection } = prev.get(current)!;
    const fromStop = getStopById(connection.from);
    const toStop = getStopById(connection.to);
    steps.unshift({
      from: connection.from,
      fromName: fromStop?.name ?? connection.from,
      to: connection.to,
      toName: toStop?.name ?? connection.to,
      mode: connection.mode,
      routeLabel: connection.routeLabel,
      duration: connection.duration,
      distance: connection.distance,
    });
    current = connection.from;
  }

  // Merge consecutive steps with same mode and route
  const merged: RouteStep[] = [];
  for (const step of steps) {
    const last = merged[merged.length - 1];
    if (last && last.mode === step.mode && last.routeLabel === step.routeLabel) {
      merged[merged.length - 1] = {
        ...last,
        to: step.to,
        toName: step.toName,
        duration: last.duration + step.duration,
        distance: last.distance + step.distance,
      };
    } else {
      merged.push({ ...step });
    }
  }

  const totalDuration = merged.reduce((sum, s) => sum + s.duration, 0);
  const totalDistance = merged.reduce((sum, s) => sum + s.distance, 0);

  // Count transfers (mode changes, excluding walks)
  let transfers = 0;
  let lastTransportMode: TransportMode | null = null;
  for (const s of merged) {
    if (s.mode !== "walk") {
      if (lastTransportMode && lastTransportMode !== s.mode) transfers++;
      if (lastTransportMode && lastTransportMode === s.mode && s.routeLabel) transfers++; // different route same mode
      lastTransportMode = s.mode;
    }
  }

  return { steps: merged, totalDuration, totalDistance, transfers };
}
