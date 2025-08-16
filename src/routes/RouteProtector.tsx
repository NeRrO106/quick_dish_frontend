import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RouteProtector = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthenticated = !!user?.Role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (allowedRoles && !allowedRoles.includes(user.Role)) {
      navigate("/");
    }
  }, [isAuthenticated, user.Role, allowedRoles, navigate]);

  if (!isAuthenticated) return null;
  if (allowedRoles && !allowedRoles.includes(user.Role)) return null;

  return <>{children}</>;
};
