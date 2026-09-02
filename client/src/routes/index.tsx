import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, products } from "@/data/products";

export function CataloguePage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list =
      category === "all" ? products : products.filter((p) => p.category === category);

    if (normalizedQuery) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery),
      );
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [category, normalizedQuery, sort]);

  return (
    <div>
      <section
        className="relative overflow-hidden border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <span className="eyebrow text-gold">Curated tech, no clutter</span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Gear that earns its place on your desk.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Hand-picked laptops, displays and peripherals from TechHub Electronics — tested,
            stocked, and shipped the next day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Catalogue</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} product{filtered.length === 1 ? "" : "s"}
              {category !== "all" && ` in ${category}`}
              {normalizedQuery && ` matching “${query.trim()}”`}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:w-64"
              />
            </div>

            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort products"
                className="h-10 w-full appearance-none rounded-md border border-border bg-background pl-9 pr-8 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:w-52"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <option key={key} value={key}>
                    {sortLabels[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface py-16 text-center">
            <p className="text-muted-foreground">No products match your search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setSort("featured");
              }}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </section>
    </div>
  );
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

