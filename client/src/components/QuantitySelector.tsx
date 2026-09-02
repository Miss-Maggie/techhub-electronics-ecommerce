import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  max,
  onChange,
  label = "Quantity",
}: {
  value: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className="grid size-9 place-items-center text-foreground transition-colors hover:text-gold disabled:opacity-30"
      >
        <Minus className="size-4" />
      </button>
      <span aria-live="polite" className="w-10 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className="grid size-9 place-items-center text-foreground transition-colors hover:text-gold disabled:opacity-30"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
