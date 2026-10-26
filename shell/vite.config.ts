import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "shell",
      remotes: {}, // để trống: remote được đăng ký lúc chạy từ menu.json
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    react(),
  ],
  server: { port: 5000 },
  preview: { port: 5000 },
  build: { target: "chrome89" },
});
