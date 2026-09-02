import { Navigate, Route, Routes } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { CataloguePage } from "@/routes/index";
import { ProductDetailsPage } from "@/routes/product.$id";
import { CartPage } from "@/routes/cart";
import { CheckoutPage } from "@/routes/checkout";
import { NotFoundComponent } from "@/routes/__root";

export function App() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<CataloguePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/404" element={<NotFoundComponent />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </CartProvider>
  );
}
