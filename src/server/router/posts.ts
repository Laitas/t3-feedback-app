import { createRouter } from "./context";
import { z } from "zod";

export const postsRouter = createRouter()
  .query("byType", {
    input: z
      .object({
        type: z.enum(["UI", "UX", "Enhancement", "Bug", "Feature"]),
      })
      .nullish(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findMany({
        where: {
          type: input?.type,
        },
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
      return posts;
    },
  });
