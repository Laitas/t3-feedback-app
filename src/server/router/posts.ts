import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const postsRouter = createRouter()
  .query("roadmap", {
    async resolve({ ctx }) {
      const planned = await ctx.prisma.post.count({
        where: {
          status: "Planned",
        },
      });
      const inProgress = await ctx.prisma.post.count({
        where: {
          status: "In-Progress",
        },
      });
      const live = await ctx.prisma.post.count({
        where: {
          status: "Live",
        },
      });
      return {
        planned,
        live,
        inProgress,
      };
    },
  })
  .query("byCategory", {
    input: z.object({
      category: z.enum(["UI", "UX", "Enhancement", "Bug", "Feature"]),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findMany({
        where: {
          category: input?.category,
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
              replies: {
                include: {
                  author: {
                    select: {
                      username: true,
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  username: true,
                  id: true,
                  name: true,
                  image: true,
                },
              },
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
      title: z.string().min(10),
      desc: z.string().min(10),
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
          commentsLength: 0,
        },
      });
    },
  })
  .mutation("edit", {
    input: z.object({
      title: z.string().min(10),
      desc: z.string().min(10),
      category: z.enum(["UI", "UX", "Enhancement", "Bug", "Feature"]),
      userId: z.string(),
      id: z.string(),
      status: z.enum(["Planned", "In-Progress", "Live", "None"]).optional(),
    }),
    async resolve({
      ctx,
      input: { title, desc, category, userId, id, status },
    }) {
      return await ctx.prisma.post.update({
        where: { id },
        data: {
          title,
          desc,
          category,
          upvotes: undefined,
          status,
          userId,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      userId: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input: { userId, id } }) {
      const post = await ctx.prisma.post.findUnique({
        where: { id },
      });
      if (post?.id === id && post?.userId === userId) {
        await ctx.prisma.post.delete({
          where: { id },
        });
        return "success";
      }
      throw new trpc.TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    },
  });
