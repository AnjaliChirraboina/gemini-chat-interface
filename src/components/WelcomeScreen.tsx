import { Sparkles, Code, Lightbulb, PenTool } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

const suggestions = [
  { icon: Code, text: "Write a Python function to sort a list", label: "Code" },
  { icon: Lightbulb, text: "Explain quantum computing simply", label: "Learn" },
  { icon: PenTool, text: "Help me write a professional email", label: "Write" },
];

export function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Hello! How can I help?
        </h1>
        <p className="text-muted-foreground text-sm">
          Ask me anything — I'm here to assist.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            onClick={() => onSuggestion(s.text)}
            className="flex flex-col items-start gap-2 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left group"
          >
            <s.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            <span className="text-sm text-foreground leading-snug">{s.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
