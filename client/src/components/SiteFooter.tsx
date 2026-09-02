export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-2 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          <span className="font-display font-semibold text-foreground">TechHub</span>{" "}
          <span className="text-gold">Electronics</span> — premium computer hardware.
        </p>
        <p>Free next-day delivery on orders over $250.</p>
        <p className="text-muted-foreground">
          © 2026 TechHub Electronics —  created by the Magdaline Muthui.
        </p>
      </div>
    </footer>
  );
}
