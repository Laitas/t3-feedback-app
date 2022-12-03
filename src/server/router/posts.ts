import * as trpc from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

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
      sortBy: z
        .enum([
          "MOST_UPVOTES",
          "LEAST_UPVOTES",
          "MOST_COMMENTS",
          "LEAST_COMMENTS",
          "NEW",
        ])
        .optional(),
    }),
    async resolve({ ctx, input }) {
      const getPosts = async () => {
        const include = {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: true,
        };
        switch (input.sortBy) {
          case "MOST_UPVOTES":
            return await ctx.prisma.post.findMany({
              orderBy: {
                upvotes: {
                  _count: "desc",
                },
              },
              where: {
                category: input?.category,
              },
              include: include,
            });
            break;
          case "MOST_COMMENTS":
            return await ctx.prisma.post.findMany({
              orderBy: {
                commentsLength: "desc",
              },
              where: {
                category: input?.category,
              },
              include: include,
            });
            break;
          case "LEAST_COMMENTS":
            return await ctx.prisma.post.findMany({
              orderBy: {
                commentsLength: "asc",
              },
              where: {
                category: input?.category,
              },
              include: include,
            });
            break;
          case "LEAST_UPVOTES":
            return await ctx.prisma.post.findMany({
              orderBy: {
                upvotes: {
                  _count: "asc",
                },
              },
              where: {
                category: input?.category,
              },
              include: include,
            });
            break;
          default:
            return await ctx.prisma.post.findMany({
              where: {
                category: input?.category,
              },
              include: include,
            });
        }
      };

      const posts = await getPosts();

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
      sortBy: z
        .enum([
          "MOST_UPVOTES",
          "LEAST_UPVOTES",
          "MOST_COMMENTS",
          "LEAST_COMMENTS",
          "NEW",
        ])
        .optional(),
    }),
    async resolve({ ctx, input }) {
      const getPosts = async () => {
        const include = {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: true,
        };
        switch (input.sortBy) {
          case "MOST_UPVOTES":
            return await ctx.prisma.post.findMany({
              orderBy: {
                upvotes: {
                  _count: "desc",
                },
              },
              include: include,
            });
            break;
          case "MOST_COMMENTS":
            return await ctx.prisma.post.findMany({
              orderBy: {
                commentsLength: "desc",
              },
              include: include,
            });
            break;
          case "LEAST_COMMENTS":
            return await ctx.prisma.post.findMany({
              orderBy: {
                commentsLength: "asc",
              },
              include: include,
            });
            break;
          case "LEAST_UPVOTES":
            return await ctx.prisma.post.findMany({
              orderBy: {
                upvotes: {
                  _count: "asc",
                },
              },
              include: include,
            });
            break;
          default:
            return await ctx.prisma.post.findMany({
              include: include,
            });
        }
      };

      const posts = await getPosts();

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
