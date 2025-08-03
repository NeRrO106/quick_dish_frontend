import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEffect } from "react";

function AuthRedirect() {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user || user?.role === null) {
      if (
        location.pathname !== "/hero" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/hero");
      }
    } else if (user?.role === "Client" || user?.role === "Ghost") {
      if (
        location.pathname === "/hero" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/about");
      }
    }
  }, [user, loading, location.pathname, navigate]);
  return null;
}
export default AuthRedirect;
