import { useState, useRef, useEffect } from "react";
import { searchStops, type Stop } from "@/data/transportData";
import { Search, MapPin, Navigation, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSearch: (fromId: string, toId: string) => void;
}

function StopInput({
  label,
  icon: Icon,
  value,
  onSelect,
}: {
  label: string;
  icon: typeof MapPin;
  value: Stop | null;
  onSelect: (stop: Stop) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stop[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setResults(searchStops(query));
  }, [query]);

  return (
    <div ref={ref} className="relative flex-1">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={label}
          value={value ? value.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSelect(null as any);
            setOpen(true);
          }}
          onFocus={() => {
            if (!value) setOpen(true);
          }}
          className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
          {results.map((s) => (
            <button
              key={s.id}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/50 transition-colors flex items-center gap-2 text-foreground"
              onClick={() => {
                onSelect(s);
                setQuery(s.name);
                setOpen(false);
              }}
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>{s.name}</span>
              <span className="ml-auto flex gap-1">
                {s.type.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function RouteSearch({ onSearch }: Props) {
  const [from, setFrom] = useState<Stop | null>(null);
  const [to, setTo] = useState<Stop | null>(null);

  const handleSearch = () => {
    if (from && to && from.id !== to.id) {
      onSearch(from.id, to.id);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <StopInput label="Start location" icon={Navigation} value={from} onSelect={setFrom} />
      <ArrowRight className="hidden sm:block h-5 w-5 text-muted-foreground shrink-0" />
      <StopInput label="Destination" icon={MapPin} value={to} onSelect={setTo} />
      <Button
        onClick={handleSearch}
        disabled={!from || !to || from.id === to.id}
        className="h-12 px-6 rounded-xl font-semibold"
      >
        <Search className="h-4 w-4 mr-2" />
        Find Route
      </Button>
    </div>
  );
}
