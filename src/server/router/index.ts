// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { postsRouter } from "./posts";
import { userRouter } from "./user";
import { commentsRouter } from "./comments";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts.", postsRouter)
  .merge("comments.", commentsRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
