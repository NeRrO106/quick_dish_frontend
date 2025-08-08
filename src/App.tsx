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
import AuthRedirect from "./routes/AuthRedirect";
import Users from "./features/users/Users";
import Products from "./features/products/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditUser from "./features/users/EditUser";
import EditProduct from "./features/products/EditProduct";
import AddUser from "./features/users/AddUser";
import AddProduct from "./features/products/AddProduct";
import Orders from "./features/orders/Orders";
import { CartProvider } from "./features/cart/CartProvider";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import MyOrder from "./pages/MyOrder";
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
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<EditProduct />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/productdetails/:id" element={<ProductDetail />} />
            <Route path="/myorders/:id" element={<MyOrder />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default App;
