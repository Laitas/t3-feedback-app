import { createRouter } from "./context";
import { z } from "zod";

export const commentsRouter = createRouter().mutation("new", {
  input: z.object({
    postId: z.string(),
    commentId: z.string(),
    comment: z.string().min(10),
  }),
  async resolve({ ctx, input }) {
    return await ctx.prisma.comment.create({
      data: input,
    });
  },
});
