import sha256 from "crypto-js/sha256";
import { createRouter } from "./context";
import { z } from "zod";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const userRouter = createRouter().mutation("signup", {
  input: z
    .object({
      email: z.string().min(1),
      name: z.string().min(3),
      password: z.string().min(6),
    })
    .nullish(),
  async resolve({ ctx, input }) {
    return await ctx.prisma.user.create({
      data: {
        email: input?.email,
        name: input?.name,
        password: hashPassword(input?.password),
      },
    });
  },
});
