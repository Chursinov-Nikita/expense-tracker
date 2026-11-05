import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const name = user.name.trim();

          if (!name) {
            throw new APIError("BAD_REQUEST", { message: "Укажите имя" });
          }

          return { data: { ...user, name } };
        },
      },
    },
  },
});
