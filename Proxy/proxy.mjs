import { createProxyMiddleware } from "http-proxy-middleware";
import express from "express";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://localhost:7100/api",
    secure: false,
    changeOrigin: true,
    cookieDomainRewrite: "", // gol => lasă domeniul cookie-ului neschimbat
    xfwd: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie); // trimite cookie-urile originale
      }
    },
  })
);

app.listen(6969, () => {
  console.log("Proxy server started");
});
