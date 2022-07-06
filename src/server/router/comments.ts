import { createRouter } from "./context";
import { z } from "zod";

export const commentsRouter = createRouter()
  .mutation("new", {
    input: z.object({
      postId: z.string(),
      authorId: z.string(),
      comment: z.string().min(10),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.comment.create({
        data: input,
      });
    },
  })
  .mutation("newReply", {
    input: z.object({
      commentId: z.string(),
      authorId: z.string(),
      reply: z.string().min(10),
      replyingTo: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.reply.create({
        data: input,
      });
    },
  });
