import { useState } from "react";
import { RouteSearch } from "@/components/RouteSearch";
import { RouteResult } from "@/components/RouteResult";
import { findRoute, type Route } from "@/lib/routePlanner";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Train, Bus, Footprints, AlertCircle } from "lucide-react";

type OptimizeBy = "time" | "transfers" | "distance";

const Index = () => {
  const [route, setRoute] = useState<Route | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [optimizeBy, setOptimizeBy] = useState<OptimizeBy>("time");
  const [searched, setSearched] = useState(false);

  const handleSearch = (fromId: string, toId: string) => {
    const result = findRoute(fromId, toId, optimizeBy);
    setRoute(result);
    setNotFound(!result);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Hyderabad Transit</h1>
            <p className="text-xs text-muted-foreground">Multi-modal route planner</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Plan Your Journey
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Combine metro, bus &amp; walking for the best route across Hyderabad
          </p>
          <div className="flex justify-center gap-4 pt-2">
            {[
              { icon: Train, label: "Metro" },
              { icon: Bus, label: "Bus" },
              { icon: Footprints, label: "Walk" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5" /> {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Search */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4">
          <RouteSearch onSearch={handleSearch} />

          {/* Optimize options */}
          <div className="flex gap-2 flex-wrap">
            {(["time", "transfers", "distance"] as OptimizeBy[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setOptimizeBy(opt)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  optimizeBy === opt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-secondary-foreground border-border hover:bg-accent/50"
                }`}
              >
                {opt === "time" ? "⚡ Fastest" : opt === "transfers" ? "🔄 Fewest Transfers" : "📏 Shortest"}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {route && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RouteResult route={route} />
            </motion.div>
          )}
          {notFound && searched && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
            >
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <p className="text-sm text-foreground">
                No route found between these stops. Try different locations.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info footer */}
        {!searched && (
          <div className="text-center text-xs text-muted-foreground pt-8 space-y-1">
            <p>Covers 40+ stops across Hyderabad's metro &amp; bus network</p>
            <p>Blue Line • Red Line • Green Line • City Bus Routes</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
