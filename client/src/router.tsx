import { createBrowserRouter } from "react-router-dom";
import { CataloguePage } from "@/routes/index";
import { ProductDetailsPage } from "@/routes/product.$id";
import { CartPage } from "@/routes/cart";
import { CheckoutPage } from "@/routes/checkout";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <CataloguePage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);

export default appRouter;
