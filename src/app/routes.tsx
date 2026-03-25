import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MonthlyBreakdown from "./pages/MonthlyBreakdown";
import OrderDetail from "./pages/OrderDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/monthly-breakdown",
    Component: MonthlyBreakdown,
  },
  {
    path: "/order-detail",
    Component: OrderDetail,
  },
]);
