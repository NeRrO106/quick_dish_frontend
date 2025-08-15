import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Users from "./features/users/Users";
import Products from "./features/products/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditUser from "./features/users/EditUser";
import EditProduct from "./features/products/EditProduct";
import AddUser from "./features/users/AddUser";
import AddProduct from "./features/products/AddProduct";
import { CartProvider } from "./features/cart/CartProvider";
import ResetPassword from "./features/auth/ResetPassword";
import ForgotPassword from "./features/auth/ForgotPassword";
import Cart from "./features/cart/Cart";
import ProductDetail from "./features/products/ProductDetail";
import MyOrder from "./features/orders/MyOrder";
import FinishOrder from "./features/orders/FinishOrder";
import { RouteProtector } from "./routes/RouteProtector";
import AuthRedirect from "./routes/AuthRedirect";
import Orders from "./features/orders/Orders";

const queryClient = new QueryClient();

function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthRedirect />
          <NavBar />
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route
              path="/about"
              element={
                <RouteProtector>
                  <About />
                </RouteProtector>
              }
            />
            <Route
              path="/menu"
              element={
                <RouteProtector>
                  <Menu />
                </RouteProtector>
              }
            />
            <Route
              path="/productdetails/:id"
              element={
                <RouteProtector>
                  <ProductDetail />
                </RouteProtector>
              }
            />
            <Route
              path="/myorders/:id"
              element={
                <RouteProtector>
                  <MyOrder />
                </RouteProtector>
              }
            />
            <Route
              path="/contact"
              element={
                <RouteProtector>
                  <Contact />
                </RouteProtector>
              }
            />
            <Route
              path="/orders/finish"
              element={
                <RouteProtector>
                  <FinishOrder />
                </RouteProtector>
              }
            />

            <Route
              path="/cart"
              element={
                <RouteProtector>
                  <Cart />
                </RouteProtector>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route
              path="/users"
              element={
                <RouteProtector allowedRoles={["Admin"]}>
                  <Users />
                </RouteProtector>
              }
            />
            <Route
              path="/users/:id"
              element={
                <RouteProtector allowedRoles={["Admin"]}>
                  <EditUser />
                </RouteProtector>
              }
            />
            <Route
              path="/users/add"
              element={
                <RouteProtector allowedRoles={["Admin"]}>
                  <AddUser />
                </RouteProtector>
              }
            />
            <Route
              path="/products"
              element={
                <RouteProtector allowedRoles={["Admin", "Manager"]}>
                  <Products />
                </RouteProtector>
              }
            />
            <Route
              path="/products/:id"
              element={
                <RouteProtector allowedRoles={["Admin", "Manager"]}>
                  <EditProduct />
                </RouteProtector>
              }
            />
            <Route
              path="/products/add"
              element={
                <RouteProtector allowedRoles={["Admin", "Manager"]}>
                  <AddProduct />
                </RouteProtector>
              }
            />
            <Route
              path="/orders"
              element={
                <RouteProtector allowedRoles={["Admin", "Manager", "Courier"]}>
                  <Orders />
                </RouteProtector>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
