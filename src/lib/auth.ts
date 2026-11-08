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
        after: async (user) => {
          await prisma.category.createMany({
            data: [
              { name: "Еда", icon: "food", type: "EXPENSE", userId: user.id },
              {
                name: "Транспорт",
                icon: "transport",
                type: "EXPENSE",
                userId: user.id,
              },
              {
                name: "Покупки",
                icon: "shopping",
                type: "EXPENSE",
                userId: user.id,
              },
              {
                name: "Счета",
                icon: "bills",
                type: "EXPENSE",
                userId: user.id,
              },
              {
                name: "Здоровье",
                icon: "health",
                type: "EXPENSE",
                userId: user.id,
              },
              {
                name: "Развлечения",
                icon: "entertainment",
                type: "EXPENSE",
                userId: user.id,
              },
              {
                name: "Зарплата",
                icon: "salary",
                type: "INCOME",
                userId: user.id,
              },
              {
                name: "Подработка",
                icon: "freelance",
                type: "INCOME",
                userId: user.id,
              },
            ],
          });
        },
      },
    },
  },
});
