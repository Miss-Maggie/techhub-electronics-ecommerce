import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "@/data/products";
import type { CartItem } from "@/context/CartContext";

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  const { product, quantity } = item;

  return (
    <li className="flex flex-col gap-4 border-b border-border py-5 sm:flex-row sm:items-center">
      <Link
        to={`/product/${product.id}`}
        className="size-24 shrink-0 overflow-hidden rounded-md border border-border bg-surface"
      >
        <img src={product.image} alt={product.name} className="size-full object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <span className="eyebrow text-muted-foreground">{product.category}</span>
        <Link
          to={`/product/${product.id}`}
          className="block text-base font-semibold transition-colors hover:text-gold"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.price)} each · {product.quantity} in stock
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <QuantitySelector value={quantity} max={product.quantity} onChange={onQuantityChange} />
        <span className="w-24 text-right font-display text-base font-bold text-gold">
          {formatPrice(product.price * quantity)}
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${product.name} from cart`}
          className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </li>
  );
}
