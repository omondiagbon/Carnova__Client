import React from "react";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

// Components
import Logout from "./components/common/Logout";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import MobileNavBar from "./components/layout/MobileNavBar";

// Admin pages
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import UpdateCar from "./Admin/UpdateCar";
import AddCars from "./Admin/AddCars";
import AllOrder from "./Admin/AllOrder";
import ManageCars from "./Admin/ManageCar";
import AdminSidebar from "./Admin/AdminSidebar";
import OrderDetails from "./Admin/OrderDetails";
import AdminUsers from "./Admin/AdminUsers";

/* ---------- USER LAYOUT ---------- */
function Layout() {
  return (
    <>
      <MobileNavBar />
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/* ---------- ADMIN LAYOUT ---------- */
function AdminLayout() {
  const isAdmin = localStorage.getItem("admin") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <aside className="w-[20%] bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <AdminSidebar />
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:profileid" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* USER LOGIN/USER SINGIN */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin-login" element={<AdminLogin />} />
      {/* <Route path="/all/order" element={<AllOrder />} /> */}
      
      {/* PROTECTED ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/update/:id" element={<UpdateCar />} />
        <Route path="/admin/addcars" element={<AddCars />} />
        <Route path="/admin/orders" element={<AllOrder />} />
        <Route path="/admin/order/:id" element={<OrderDetails />} />
        <Route path="/admin/managecar" element={<ManageCars />} />
        <Route path="/admin/siteuser" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}

export default App;
