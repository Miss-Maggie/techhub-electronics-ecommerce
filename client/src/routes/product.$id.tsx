import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductGrid } from "@/components/ProductGrid";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProduct, products } from "@/data/products";

export function ProductDetailsPage() {
  const { id } = useParams();
  const product = getProduct(id ?? "");

  if (!product) {
    return <ProductNotFoundPage />;
  }

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-gold"
      >
        <ChevronLeft className="size-4" /> Back to catalogue
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-4/3 w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="eyebrow text-gold">{product.category}</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-4 font-display text-3xl font-bold text-gold">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-surface p-4 text-sm">
            <div>
              <dt className="eyebrow text-muted-foreground">Availability</dt>
              <dd className="mt-1 font-semibold">
                {product.quantity > 0 ? `${product.quantity} units in stock` : "Out of stock"}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Category</dt>
              <dd className="mt-1 font-semibold capitalize">{product.category}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantitySelector
              value={quantity}
              max={Math.max(1, product.quantity)}
              onChange={setQuantity}
            />
            <button
              type="button"
              disabled={product.quantity === 0}
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`${product.name} added to cart`);
              }}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              Add to Cart
            </button>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-gold" /> Free next-day delivery over $250
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-gold" /> 2-year TechHub warranty
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">More in {product.category}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

function ProductNotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The product you’re looking for is no longer available or never existed.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
      >
        Back to catalogue
      </Link>
    </div>
  );
}
