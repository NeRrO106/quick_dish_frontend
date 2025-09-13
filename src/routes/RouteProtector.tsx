import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const RouteProtector = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { data: user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user?.Role) {
      navigate("/login", { replace: true });
    } else if (allowedRoles && !allowedRoles.includes(user.Role)) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, allowedRoles, navigate]);

  if (isLoading) return null;
  if (!user?.Role) return null;
  if (allowedRoles && !allowedRoles.includes(user.Role)) return null;

  return <>{children}</>;
};
