import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";
import { Post, Upvote } from "@prisma/client";

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
      userId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          category: input?.category,
        },
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: true,
        },
      });
      return posts.map(({ upvotes, ...post }) => ({
        ...post,
        upvote: !!upvotes.find((i) => i.userId === input.userId),
      }));
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
      userId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.findUnique({
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
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: true,
        },
      });
      if (post) {
        const updatedPost = {
          ...post,
          upvote: !!post.upvotes.find((i) => i.userId === input.userId),
        };
        if ("upvotes" in updatedPost) {
          //@ts-ignore
          delete updatedPost.upvotes;
        }
        return updatedPost;
      }
    },
  })
  .query("all", {
    input: z.object({
      userId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findMany({
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: true,
        },
      });
      return posts.map(({ upvotes, ...post }) => ({
        ...post,
        upvote: !!upvotes.find((i) => i.userId === input.userId),
      }));
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
  })
  .mutation("upvote", {
    input: z.object({
      userId: z.string(),
      postId: z.string(),
    }),
    async resolve({ ctx, input: { userId, postId } }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          upvote: {
            include: {
              user: true,
            },
          },
        },
      });
      if (user) {
        const upvote = user.upvote.find(
          (i) => i.userId === userId && i.postId === postId
        );
        if (upvote) {
          return await ctx.prisma.upvote
            .delete({
              where: { id: upvote.id },
            })
            .then(() => "deleted");
        } else {
          return await ctx.prisma.upvote
            .create({
              data: {
                postId,
                userId,
              },
            })
            .then(() => "upvoted");
        }
      }
      throw new trpc.TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    },
  });
