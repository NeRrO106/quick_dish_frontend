import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgotpassword",
  "/resetpassword",
];

function AuthRedirect() {
  const { data, isLoading } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    const isPublic = publicPaths.includes(location.pathname);

    if (!data || !data.Role) {
      if (!isPublic) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    } else if (["Client"].includes(data.Role) && isPublic) {
      if (isPublic) {
        navigate("/about", { replace: true });
      }
    }
  }, [data, isLoading, location, navigate]);
  return null;
}
export default AuthRedirect;
