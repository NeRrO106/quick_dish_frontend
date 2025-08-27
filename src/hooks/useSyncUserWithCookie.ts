import { useEffect } from "react";

export function useSyncUserWithCookie() {
  useEffect(() => {
    const checkCookie = () => {
      const exist = document.cookie
        .split("; ")
        .some((c) => c.startsWith(".AspNetCore.CookieAuth="));

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!exist && user.Role !== "Guest") {
        localStorage.removeItem("user");
      }
    };

    checkCookie();

    window.addEventListener("storage", checkCookie);

    return () => {
      window.removeEventListener("storage", checkCookie);
    };
  }, []);
}
