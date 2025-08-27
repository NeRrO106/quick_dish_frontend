import { useEffect } from "react";

export function useSyncUserWithCookie() {
  useEffect(() => {
    const checkCookie = () => {
      const exist = document.cookie
        .split("; ")
        .some((c) => c.startsWith(".AspNetCore.CookieAuth="));

      if (!exist) {
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
