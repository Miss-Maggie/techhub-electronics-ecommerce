import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { CartItemRow } from "@/components/CartItemRow";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export function CartPage() {
  const { items, setQuantity, removeFromCart, total, itemCount } = useCart();
  const navigate = useNavigate();
  const shipping = total > 250 || total === 0 ? 0 : 19;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Shopping cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
      </p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-lg border border-border bg-surface px-6 py-20 text-center">
          <ShoppingCart className="mx-auto size-8 text-gold" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the catalogue and add something great.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
          >
            Shop products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 border-t border-border">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onQuantityChange={(q) => setQuantity(item.product.id, q)}
                onRemove={() => removeFromCart(item.product.id)}
              />
            ))}
          </ul>

          <div className="mt-8 ml-auto w-full max-w-sm rounded-lg bg-surface p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <dt className="font-display text-base font-semibold">Total</dt>
                <dd className="font-display text-2xl font-bold text-gold">
                  {formatPrice(total + shipping)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/"
              className="mt-3 block text-center text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
