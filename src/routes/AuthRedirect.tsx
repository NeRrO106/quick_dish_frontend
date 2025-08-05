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
        location.pathname !== "/hero" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/hero");
      }
    } else if (data?.role === "Client" || data?.role === "Ghost") {
      if (
        location.pathname === "/hero" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/about");
      }
    }
  }, [data, isLoading, location.pathname, navigate]);
  return null;
}
export default AuthRedirect;
