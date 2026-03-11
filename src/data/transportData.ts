// Hyderabad Public Transport Data (MVP - sample dataset)

export type TransportMode = "walk" | "bus" | "metro" | "auto";

export interface Stop {
  id: string;
  name: string;
  type: TransportMode[];
  lat: number;
  lng: number;
}

export interface Connection {
  from: string;
  to: string;
  mode: TransportMode;
  duration: number; // minutes
  distance: number; // meters
  routeLabel?: string; // e.g. "Bus 47", "Blue Line"
}

export const stops: Stop[] = [
  // Metro Stations - Blue Line (Nagole to Raidurg)
  { id: "nagole", name: "Nagole", type: ["metro"], lat: 17.3950, lng: 78.5590 },
  { id: "uppal", name: "Uppal", type: ["metro", "bus"], lat: 17.4005, lng: 78.5585 },
  { id: "secunderabad", name: "Secunderabad", type: ["metro", "bus"], lat: 17.4344, lng: 78.5013 },
  { id: "parade_grounds", name: "Parade Grounds", type: ["metro"], lat: 17.4390, lng: 78.4920 },
  { id: "begumpet", name: "Begumpet", type: ["metro", "bus"], lat: 17.4430, lng: 78.4710 },
  { id: "ameerpet", name: "Ameerpet", type: ["metro", "bus"], lat: 17.4375, lng: 78.4483 },
  { id: "madhura_nagar", name: "Madhura Nagar", type: ["metro"], lat: 17.4410, lng: 78.4380 },
  { id: "yousufguda", name: "Yousufguda", type: ["metro"], lat: 17.4350, lng: 78.4270 },
  { id: "jubilee_hills", name: "Jubilee Hills Check Post", type: ["metro"], lat: 17.4310, lng: 78.4130 },
  { id: "hitech_city", name: "Hitech City", type: ["metro", "bus"], lat: 17.4435, lng: 78.3772 },
  { id: "raidurg", name: "Raidurg", type: ["metro"], lat: 17.4380, lng: 78.3870 },

  // Metro Stations - Red Line (Miyapur to LB Nagar)
  { id: "miyapur", name: "Miyapur", type: ["metro", "bus"], lat: 17.4969, lng: 78.3548 },
  { id: "jntu", name: "JNTU", type: ["metro"], lat: 17.4930, lng: 78.3630 },
  { id: "kukatpally", name: "Kukatpally", type: ["metro", "bus"], lat: 17.4850, lng: 78.3750 },
  { id: "balanagar", name: "Balanagar", type: ["metro", "bus"], lat: 17.4750, lng: 78.4420 },
  { id: "erragadda", name: "Erragadda", type: ["metro"], lat: 17.4530, lng: 78.4380 },
  { id: "sr_nagar", name: "S.R. Nagar", type: ["metro"], lat: 17.4440, lng: 78.4420 },
  // ameerpet is shared interchange
  { id: "gandhi_bhavan", name: "Gandhi Bhavan", type: ["metro"], lat: 17.4010, lng: 78.4730 },
  { id: "osmania", name: "Osmania Medical College", type: ["metro"], lat: 17.3940, lng: 78.4780 },
  { id: "mgbs", name: "MGBS", type: ["metro", "bus"], lat: 17.3780, lng: 78.4830 },
  { id: "malakpet", name: "Malakpet", type: ["metro", "bus"], lat: 17.3730, lng: 78.4970 },
  { id: "dilsukhnagar", name: "Dilsukhnagar", type: ["metro", "bus"], lat: 17.3690, lng: 78.5240 },
  { id: "lb_nagar", name: "LB Nagar", type: ["metro", "bus"], lat: 17.3490, lng: 78.5480 },

  // Metro Stations - Green Line (JBS to MGBS)
  { id: "jbs", name: "JBS Parade Ground", type: ["metro", "bus"], lat: 17.4470, lng: 78.5010 },
  { id: "musheerabad", name: "Musheerabad", type: ["metro"], lat: 17.4310, lng: 78.4910 },
  { id: "sultan_bazaar", name: "Sultan Bazaar", type: ["metro", "bus"], lat: 17.3930, lng: 78.4860 },

  // Major Bus Stops (non-metro)
  { id: "gachibowli", name: "Gachibowli", type: ["bus"], lat: 17.4401, lng: 78.3489 },
  { id: "kondapur", name: "Kondapur", type: ["bus"], lat: 17.4590, lng: 78.3630 },
  { id: "madhapur", name: "Madhapur", type: ["bus"], lat: 17.4484, lng: 78.3908 },
  { id: "lakdikapul", name: "Lakdikapul", type: ["bus", "metro"], lat: 17.4020, lng: 78.4570 },
  { id: "mehdipatnam", name: "Mehdipatnam", type: ["bus"], lat: 17.3950, lng: 78.4380 },
  { id: "tolichowki", name: "Tolichowki", type: ["bus"], lat: 17.4020, lng: 78.4190 },
  { id: "kphb", name: "KPHB Colony", type: ["bus"], lat: 17.4870, lng: 78.3890 },
  { id: "lingampally", name: "Lingampally", type: ["bus"], lat: 17.4920, lng: 78.3170 },
  { id: "charminar", name: "Charminar", type: ["bus"], lat: 17.3616, lng: 78.4747 },
  { id: "abids", name: "Abids", type: ["bus"], lat: 17.3930, lng: 78.4740 },
  { id: "nampally", name: "Nampally", type: ["bus"], lat: 17.3920, lng: 78.4640 },
  { id: "panjagutta", name: "Panjagutta", type: ["bus"], lat: 17.4280, lng: 78.4510 },
  { id: "somajiguda", name: "Somajiguda", type: ["bus"], lat: 17.4320, lng: 78.4610 },
  { id: "banjara_hills", name: "Banjara Hills", type: ["bus"], lat: 17.4180, lng: 78.4420 },
  { id: "manikonda", name: "Manikonda", type: ["bus"], lat: 17.4050, lng: 78.3880 },
  { id: "narsingi", name: "Narsingi", type: ["bus"], lat: 17.3860, lng: 78.3590 },
];

export const connections: Connection[] = [
  // ===== METRO BLUE LINE (Nagole → Raidurg) =====
  { from: "nagole", to: "uppal", mode: "metro", duration: 3, distance: 2100, routeLabel: "Blue Line" },
  { from: "uppal", to: "secunderabad", mode: "metro", duration: 8, distance: 7000, routeLabel: "Blue Line" },
  { from: "secunderabad", to: "parade_grounds", mode: "metro", duration: 3, distance: 1500, routeLabel: "Blue Line" },
  { from: "parade_grounds", to: "begumpet", mode: "metro", duration: 3, distance: 2000, routeLabel: "Blue Line" },
  { from: "begumpet", to: "ameerpet", mode: "metro", duration: 4, distance: 2500, routeLabel: "Blue Line" },
  { from: "ameerpet", to: "madhura_nagar", mode: "metro", duration: 2, distance: 1200, routeLabel: "Blue Line" },
  { from: "madhura_nagar", to: "yousufguda", mode: "metro", duration: 2, distance: 1300, routeLabel: "Blue Line" },
  { from: "yousufguda", to: "jubilee_hills", mode: "metro", duration: 3, distance: 1800, routeLabel: "Blue Line" },
  { from: "jubilee_hills", to: "hitech_city", mode: "metro", duration: 5, distance: 3800, routeLabel: "Blue Line" },
  { from: "hitech_city", to: "raidurg", mode: "metro", duration: 3, distance: 1500, routeLabel: "Blue Line" },

  // ===== METRO RED LINE (Miyapur → LB Nagar) =====
  { from: "miyapur", to: "jntu", mode: "metro", duration: 2, distance: 1500, routeLabel: "Red Line" },
  { from: "jntu", to: "kukatpally", mode: "metro", duration: 3, distance: 1800, routeLabel: "Red Line" },
  { from: "kukatpally", to: "balanagar", mode: "metro", duration: 5, distance: 5000, routeLabel: "Red Line" },
  { from: "balanagar", to: "erragadda", mode: "metro", duration: 4, distance: 2500, routeLabel: "Red Line" },
  { from: "erragadda", to: "sr_nagar", mode: "metro", duration: 2, distance: 1200, routeLabel: "Red Line" },
  { from: "sr_nagar", to: "ameerpet", mode: "metro", duration: 2, distance: 1000, routeLabel: "Red Line" },
  { from: "ameerpet", to: "gandhi_bhavan", mode: "metro", duration: 6, distance: 4500, routeLabel: "Red Line" },
  { from: "gandhi_bhavan", to: "osmania", mode: "metro", duration: 2, distance: 1000, routeLabel: "Red Line" },
  { from: "osmania", to: "mgbs", mode: "metro", duration: 3, distance: 2000, routeLabel: "Red Line" },
  { from: "mgbs", to: "malakpet", mode: "metro", duration: 3, distance: 1800, routeLabel: "Red Line" },
  { from: "malakpet", to: "dilsukhnagar", mode: "metro", duration: 4, distance: 3000, routeLabel: "Red Line" },
  { from: "dilsukhnagar", to: "lb_nagar", mode: "metro", duration: 5, distance: 3500, routeLabel: "Red Line" },

  // ===== METRO GREEN LINE (JBS → MGBS) =====
  { from: "jbs", to: "secunderabad", mode: "metro", duration: 3, distance: 1500, routeLabel: "Green Line" },
  { from: "secunderabad", to: "musheerabad", mode: "metro", duration: 3, distance: 1500, routeLabel: "Green Line" },
  { from: "musheerabad", to: "sultan_bazaar", mode: "metro", duration: 5, distance: 4000, routeLabel: "Green Line" },
  { from: "sultan_bazaar", to: "mgbs", mode: "metro", duration: 3, distance: 1500, routeLabel: "Green Line" },

  // ===== BUS ROUTES =====
  // Bus Route 47: Secunderabad → Gachibowli
  { from: "secunderabad", to: "begumpet", mode: "bus", duration: 10, distance: 4000, routeLabel: "Bus 47" },
  { from: "begumpet", to: "ameerpet", mode: "bus", duration: 8, distance: 3000, routeLabel: "Bus 47" },
  { from: "ameerpet", to: "panjagutta", mode: "bus", duration: 5, distance: 1500, routeLabel: "Bus 47" },
  { from: "panjagutta", to: "banjara_hills", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 47" },
  { from: "banjara_hills", to: "tolichowki", mode: "bus", duration: 7, distance: 2500, routeLabel: "Bus 47" },
  { from: "tolichowki", to: "manikonda", mode: "bus", duration: 8, distance: 3000, routeLabel: "Bus 47" },
  { from: "manikonda", to: "gachibowli", mode: "bus", duration: 7, distance: 3500, routeLabel: "Bus 47" },

  // Bus Route 10: Miyapur → Mehdipatnam
  { from: "miyapur", to: "kukatpally", mode: "bus", duration: 10, distance: 4000, routeLabel: "Bus 10" },
  { from: "kukatpally", to: "kphb", mode: "bus", duration: 5, distance: 2000, routeLabel: "Bus 10" },
  { from: "kphb", to: "balanagar", mode: "bus", duration: 8, distance: 3500, routeLabel: "Bus 10" },
  { from: "balanagar", to: "erragadda", mode: "bus", duration: 7, distance: 2500, routeLabel: "Bus 10" },
  { from: "erragadda", to: "ameerpet", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 10" },
  { from: "ameerpet", to: "lakdikapul", mode: "bus", duration: 8, distance: 3000, routeLabel: "Bus 10" },
  { from: "lakdikapul", to: "mehdipatnam", mode: "bus", duration: 7, distance: 2500, routeLabel: "Bus 10" },

  // Bus Route 216: Hitech City → Dilsukhnagar
  { from: "hitech_city", to: "madhapur", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 216" },
  { from: "madhapur", to: "kondapur", mode: "bus", duration: 5, distance: 2000, routeLabel: "Bus 216" },
  { from: "kondapur", to: "gachibowli", mode: "bus", duration: 7, distance: 3000, routeLabel: "Bus 216" },
  { from: "hitech_city", to: "jubilee_hills", mode: "bus", duration: 8, distance: 3500, routeLabel: "Bus 216" },
  { from: "jubilee_hills", to: "panjagutta", mode: "bus", duration: 7, distance: 3000, routeLabel: "Bus 216" },
  { from: "panjagutta", to: "lakdikapul", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 216" },
  { from: "lakdikapul", to: "abids", mode: "bus", duration: 5, distance: 1500, routeLabel: "Bus 216" },
  { from: "abids", to: "sultan_bazaar", mode: "bus", duration: 4, distance: 1200, routeLabel: "Bus 216" },
  { from: "sultan_bazaar", to: "dilsukhnagar", mode: "bus", duration: 12, distance: 6000, routeLabel: "Bus 216" },

  // Bus Route 5: Secunderabad → Charminar
  { from: "secunderabad", to: "jbs", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 5" },
  { from: "jbs", to: "somajiguda", mode: "bus", duration: 10, distance: 4000, routeLabel: "Bus 5" },
  { from: "somajiguda", to: "abids", mode: "bus", duration: 8, distance: 3500, routeLabel: "Bus 5" },
  { from: "abids", to: "nampally", mode: "bus", duration: 4, distance: 1000, routeLabel: "Bus 5" },
  { from: "nampally", to: "charminar", mode: "bus", duration: 10, distance: 4000, routeLabel: "Bus 5" },

  // Bus Route 127: LB Nagar → Gachibowli
  { from: "lb_nagar", to: "dilsukhnagar", mode: "bus", duration: 8, distance: 4000, routeLabel: "Bus 127" },
  { from: "dilsukhnagar", to: "malakpet", mode: "bus", duration: 6, distance: 3000, routeLabel: "Bus 127" },
  { from: "malakpet", to: "nampally", mode: "bus", duration: 10, distance: 5000, routeLabel: "Bus 127" },
  { from: "nampally", to: "lakdikapul", mode: "bus", duration: 4, distance: 1500, routeLabel: "Bus 127" },
  { from: "lakdikapul", to: "mehdipatnam", mode: "bus", duration: 7, distance: 2500, routeLabel: "Bus 127" },
  { from: "mehdipatnam", to: "tolichowki", mode: "bus", duration: 6, distance: 2000, routeLabel: "Bus 127" },
  { from: "tolichowki", to: "gachibowli", mode: "bus", duration: 12, distance: 5500, routeLabel: "Bus 127" },

  // Bus: Kondapur ↔ Hitech City
  { from: "kondapur", to: "hitech_city", mode: "bus", duration: 8, distance: 3000, routeLabel: "Bus 113" },

  // Bus: Lingampally ↔ Miyapur
  { from: "lingampally", to: "miyapur", mode: "bus", duration: 10, distance: 4500, routeLabel: "Bus 288" },

  // ===== WALKING CONNECTIONS (between nearby stops) =====
  { from: "abids", to: "nampally", mode: "walk", duration: 8, distance: 600 },
  { from: "abids", to: "sultan_bazaar", mode: "walk", duration: 10, distance: 800 },
  { from: "sultan_bazaar", to: "osmania", mode: "walk", duration: 6, distance: 400 },
  { from: "charminar", to: "mgbs", mode: "walk", duration: 15, distance: 1200 },
  { from: "somajiguda", to: "panjagutta", mode: "walk", duration: 8, distance: 600 },
  { from: "madhapur", to: "hitech_city", mode: "walk", duration: 12, distance: 900 },
  { from: "kondapur", to: "kphb", mode: "walk", duration: 18, distance: 1400 },
  { from: "manikonda", to: "narsingi", mode: "walk", duration: 20, distance: 1600 },
  { from: "narsingi", to: "gachibowli", mode: "walk", duration: 15, distance: 1200 },
  { from: "nampally", to: "lakdikapul", mode: "walk", duration: 10, distance: 800 },
  { from: "lakdikapul", to: "gandhi_bhavan", mode: "walk", duration: 7, distance: 500 },
];

// Make all connections bidirectional
export function getAllConnections(): Connection[] {
  const bidir: Connection[] = [];
  for (const c of connections) {
    bidir.push(c);
    bidir.push({ ...c, from: c.to, to: c.from });
  }
  return bidir;
}

export function getStopById(id: string): Stop | undefined {
  return stops.find((s) => s.id === id);
}

export function getStopByName(name: string): Stop | undefined {
  const lower = name.toLowerCase();
  return stops.find((s) => s.name.toLowerCase() === lower || s.id === lower);
}

export function searchStops(query: string): Stop[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  return stops.filter(
    (s) => s.name.toLowerCase().includes(lower) || s.id.includes(lower)
  );
}
