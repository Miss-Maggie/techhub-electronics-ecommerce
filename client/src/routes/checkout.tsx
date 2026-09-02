import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Phone number contains invalid characters"),
  address: z.string().trim().min(5, "Enter your street address").max(200, "Address is too long"),
  city: z.string().trim().min(2, "Enter your city").max(80, "City is too long"),
  postalCode: z.string().trim().min(3, "Enter your postal code").max(20, "Postal code is too long"),
  country: z.string().trim().min(2, "Enter your country").max(80, "Country is too long"),
  notes: z.string().trim().max(500, "Notes must be under 500 characters").optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;
type FieldName = keyof CheckoutValues;

const emptyForm: CheckoutValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  notes: "",
};

const inputClass =
  "mt-1.5 h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [placed, setPlaced] = useState<{ reference: string; name: string; email: string } | null>(
    null,
  );

  const shipping = total > 250 || total === 0 ? 0 : 19;
  const grandTotal = total + shipping;

  const update = (field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    const reference = `TH-${Date.now().toString(36).toUpperCase()}`;
    setPlaced({ reference, name: parsed.data.fullName, email: parsed.data.email });
    clearCart();
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <CheckCircle2 className="mx-auto size-10 text-gold" />
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Thank you, {placed.name}!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your order <span className="font-semibold text-foreground">{placed.reference}</span> has
          been received. A confirmation will be sent to {placed.email}.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Payment processing isn&apos;t connected yet, so no charge has been made.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <ShoppingCart className="mx-auto size-8 text-gold" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few products before heading to checkout.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your contact and shipping details to place your order.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} noValidate className="rounded-lg bg-surface p-6">
          <h2 className="font-display text-base font-semibold">Contact details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              name="fullName"
              value={form.fullName}
              error={errors.fullName}
              autoComplete="name"
              onChange={update}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              autoComplete="email"
              onChange={update}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              error={errors.phone}
              autoComplete="tel"
              onChange={update}
            />
          </div>

          <h2 className="mt-8 font-display text-base font-semibold">Shipping address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                label="Street address"
                name="address"
                value={form.address}
                error={errors.address}
                autoComplete="street-address"
                onChange={update}
              />
            </div>
            <Field
              label="City"
              name="city"
              value={form.city}
              error={errors.city}
              autoComplete="address-level2"
              onChange={update}
            />
            <Field
              label="Postal code"
              name="postalCode"
              value={form.postalCode}
              error={errors.postalCode}
              autoComplete="postal-code"
              onChange={update}
            />
            <div className="sm:col-span-2">
              <Field
                label="Country"
                name="country"
                value={form.country}
                error={errors.country}
                autoComplete="country-name"
                onChange={update}
              />
            </div>
          </div>

          <label className="mt-6 block text-sm font-medium">
            Delivery notes (optional)
            <textarea
              rows={3}
              maxLength={500}
              value={form.notes ?? ""}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Gate code, preferred delivery time, etc."
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
            />
          </label>
          {errors.notes && <p className="mt-1 text-xs text-destructive">{errors.notes}</p>}

          <button
            type="submit"
            className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-gold hover:text-accent-foreground"
          >
            Place order · {formatPrice(grandTotal)}
          </button>
          <Link
            to="/cart"
            className="mt-3 block text-center text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            Back to cart
          </Link>
        </form>

        <aside className="h-fit rounded-lg bg-surface p-6">
          <h2 className="font-display text-base font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
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
                {formatPrice(grandTotal)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  label: string;
  name: FieldName;
  value: string;
  error?: string | undefined;
  type?: string;
  autoComplete?: string | undefined;
  onChange: (field: FieldName, value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(name, e.target.value)}
        className={inputClass}
      />
      {error && <p className="mt-1 text-xs font-normal text-destructive">{error}</p>}
    </label>
  );
}
