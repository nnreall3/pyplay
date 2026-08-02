import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
<<<<<<< HEAD
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
=======
>>>>>>> ce5d5dc5811f9da15d9b5c80382cfcd936916ee1

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
<<<<<<< HEAD
  functionMiddleware: [attachSupabaseAuth],
=======
>>>>>>> ce5d5dc5811f9da15d9b5c80382cfcd936916ee1
  requestMiddleware: [errorMiddleware],
}));
