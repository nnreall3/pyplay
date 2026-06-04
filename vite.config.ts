import { defineConfig as defineViteConfig } from "vite";
import { defineConfig as defineTanstackConfig } from "@lovable.dev/vite-tanstack-config";


export default defineViteConfig({
  base: "/pyplay/", 
  ...defineTanstackConfig({
    tanstackStart: {
      server: { entry: "server" },

      target: "static",
    },
  }),
});