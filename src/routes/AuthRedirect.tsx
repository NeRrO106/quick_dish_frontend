import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";

function AuthRedirect() {
  const { data, isLoading } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!data || data?.role === null) {
      if (
        location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/reset-password"
      ) {
        navigate("/");
      }
    } else if (data?.role === "Client" || data?.role === "Ghost") {
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password"
      ) {
        navigate("/about");
      }
    }
  }, [data, isLoading, location.pathname, navigate]);
  return null;
}
export default AuthRedirect;
