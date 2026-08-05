import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Standard TanStack Start config (ejected from @lovable.dev/vite-tanstack-config).
// On Vercel (VERCEL=1 is set automatically) Nitro builds to .vercel/output.
// Everywhere else (Lovable preview/publish, local builds) it must emit the
// default dist/ output, otherwise the platform's dist check fails.
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
      // Redirect TanStack Start's bundled server entry to src/server.ts
      // (our SSR error wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({ preset: nitroPreset, ...(nitroOutput ? { output: nitroOutput } : {}) }),
  ],
});
