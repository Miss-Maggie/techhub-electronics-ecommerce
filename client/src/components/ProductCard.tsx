import { Link } from "react-router-dom";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card"
    >
      <div className="aspect-4/3 overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="eyebrow text-muted-foreground group-hover:text-gold">
          {product.category}
        </span>
        <h3 className="text-base font-semibold leading-snug text-foreground">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
