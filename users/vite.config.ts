import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "users",
      filename: "remoteEntry.js",
      exposes: { "./UsersPage": "./src/UsersPage.tsx" }, // module cho shell nạp
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      dts: false,
    }),
    react(),
  ],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toLocaleString("vi-VN")),
  },
  server: { fs: { allow: [".."] }, port: 5002 },
  preview: { port: 5002 },
  build: { target: "chrome89" },
});
