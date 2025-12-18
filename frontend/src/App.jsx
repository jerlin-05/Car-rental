import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import BecomeDealer from "./pages/BecomeDealer";
import DealerSuccess from "./pages/DealerSuccess";

/* STATIC */
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin";

/* DEALER */
import DealerDashboard from "./pages/dealer/DealerDashboard";
import DealerCars from "./pages/dealer/DealerCars";
import DealerBookings from "./pages/dealer/DealerBookings";
import ProtectedDealer from "./pages/dealer/ProtectedDealer";

export default function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />

          <Route path="/become-dealer" element={<BecomeDealer />} />
          <Route path="/dealer-success" element={<DealerSuccess />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdmin>
                <AdminDashboard />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedAdmin>
                <AdminUsers />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/cars"
            element={
              <ProtectedAdmin>
                <AdminCars />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedAdmin>
                <AdminBookings />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/dealer/dashboard"
            element={
              <ProtectedDealer>
                <DealerDashboard />
              </ProtectedDealer>
            }
          />

          <Route
            path="/dealer/cars"
            element={
              <ProtectedDealer>
                <DealerCars />
              </ProtectedDealer>
            }
          />

          <Route
            path="/dealer/bookings"
            element={
              <ProtectedDealer>
                <DealerBookings />
              </ProtectedDealer>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
