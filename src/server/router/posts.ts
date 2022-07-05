import { createRouter } from "./context";
import { z } from "zod";

export const postsRouter = createRouter()
  .query("byType", {
    input: z.object({
      category: z.enum(["UI", "UX", "Enhancement", "Bug", "Feature"]),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findMany({
        where: {
          category: input?.category,
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
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input?.id,
        },
        include: {
          comments: {
            include: {
              author: {
                select: {
                  email: true,
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
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
  })
  .mutation("new", {
    input: z.object({
      title: z.string(),
      desc: z.string(),
      category: z.enum(["UI", "UX", "Enhancement", "Bug", "Feature"]),
      userId: z.string(),
    }),
    async resolve({ ctx, input: { title, desc, category, userId } }) {
      return await ctx.prisma.post.create({
        data: {
          title,
          desc,
          category,
          upvotes: 0,
          userId,
        },
      });
    },
  });
