import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-lg font-bold tracking-tight sm:text-xl">TechHub</span>
          <span className="eyebrow text-gold">Electronics</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hidden text-sm font-medium transition-colors hover:text-gold sm:block ${
                isActive ? "text-gold" : "text-foreground"
              }`
            }
          >
            Catalogue
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold ${
                isActive ? "border-gold text-gold" : "text-foreground"
              }`
            }
          >
            <ShoppingCart className="size-4" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-primary">
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
