// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { postsRouter } from "./posts";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts.", postsRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
