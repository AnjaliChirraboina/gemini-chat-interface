import { type Route } from "@/lib/routePlanner";
import { type TransportMode } from "@/data/transportData";
import { Train, Bus, Footprints, Car, Clock, Repeat, MapPin, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const modeConfig: Record<TransportMode, { icon: typeof Train; label: string; color: string; bg: string }> = {
  metro: { icon: Train, label: "Metro", color: "text-primary", bg: "bg-primary/10" },
  bus: { icon: Bus, label: "Bus", color: "text-accent", bg: "bg-accent/10" },
  walk: { icon: Footprints, label: "Walk", color: "text-muted-foreground", bg: "bg-muted" },
  auto: { icon: Car, label: "Auto", color: "text-orange-500", bg: "bg-orange-500/10" },
};

function formatDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters}m`;
}

export function RouteResult({ route }: { route: Route }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Summary */}
      <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">{route.totalDuration} min</span>
          <span className="text-muted-foreground">total</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">{formatDistance(route.totalDistance)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Repeat className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">{route.transfers}</span>
          <span className="text-muted-foreground">transfer{route.transfers !== 1 ? "s" : ""}</span>
        </div>
        {/* Mode pills */}
        <div className="flex gap-1.5 ml-auto">
          {Array.from(new Set(route.steps.map((s) => s.mode))).map((m) => {
            const cfg = modeConfig[m];
            const Icon = cfg.icon;
            return (
              <span key={m} className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                <Icon className="h-3 w-3" />
                {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-border" />

        {route.steps.map((step, i) => {
          const cfg = modeConfig[step.mode];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative mb-1 last:mb-0"
            >
              {/* Dot */}
              <div className={`absolute -left-6 top-3 w-[22px] h-[22px] rounded-full border-2 border-background ${cfg.bg} flex items-center justify-center z-10`}>
                <Icon className={`h-3 w-3 ${cfg.color}`} />
              </div>

              <div className="p-3 rounded-lg hover:bg-card/60 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {step.mode === "walk" ? (
                        <>Walk {formatDistance(step.distance)} to <span className="font-semibold">{step.toName}</span></>
                      ) : (
                        <>
                          Take{" "}
                          <span className={`font-semibold ${cfg.color}`}>
                            {step.routeLabel ?? cfg.label}
                          </span>{" "}
                          → <span className="font-semibold">{step.toName}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      From {step.fromName} • {step.duration} min • {formatDistance(step.distance)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* End dot */}
        <div className="absolute -left-6 bottom-0 w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center z-10">
          <MapPin className="h-3 w-3 text-primary-foreground" />
        </div>
      </div>
    </motion.div>
  );
}
