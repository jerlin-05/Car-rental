import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedDealer({ children }) {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role !== "dealer") {
    return <Navigate to="/login" />;
  }

  return children;
}
