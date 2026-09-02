import { cn } from "@/lib/utils";

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
}) {
  const options = ["all", ...categories];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors",
            active === option
              ? "border-gold bg-gold text-primary-foreground shadow-gold"
              : "border-border bg-surface text-muted-foreground hover:border-gold hover:text-gold",
          )}
        >
          {option === "all" ? "All products" : option}
        </button>
      ))}
    </div>
  );
}
