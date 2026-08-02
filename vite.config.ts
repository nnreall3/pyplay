import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Standard TanStack Start config (ejected from @lovable.dev/vite-tanstack-config).
// Nitro builds the server bundle targeting Vercel. The NITRO_PRESET env var
// (set automatically by Vercel) overrides this, so the same config works locally
// and in CI without changes.
const nitroPreset = process.env.NITRO_PRESET ?? "vercel";

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
    nitro({ preset: nitroPreset }),
  ],
});
