import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

const isVercel = Boolean(process.env.VERCEL);
const nitroPreset = process.env.NITRO_PRESET ?? (isVercel ? "vercel" : "cloudflare-module");
const nitroOutput = isVercel
  ? undefined
  : { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" };



export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({

      server: { entry: "server" },
    }),
    viteReact(),
    nitro({ preset: nitroPreset, ...(nitroOutput ? { output: nitroOutput } : {}) }),
  ],
});
