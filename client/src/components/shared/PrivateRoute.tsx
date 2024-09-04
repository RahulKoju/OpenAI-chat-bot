import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../helpers/useAuth";

export default function PrivateRoute() {
  const auth = useAuth();
  return auth.isSignedIn && auth.user ? <Outlet /> : <Navigate to="/sign-in" />;
}
