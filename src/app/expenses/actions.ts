"use server";

import { requireUser } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type FormState = { error?: string };

export async function createExpense(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();
  const amountText = String(formData.get("amount") ?? "");
  const dateText = String(formData.get("date") ?? "");
  const categoryId = String(formData.get("categoryId") ?? "");
  const comment = String(formData.get("comment") ?? "").trim();

  const rubles = Number(amountText.replace(",", "."));

  if (!Number.isFinite(rubles) || rubles <= 0) {
    return { error: "Введите сумму больше нуля" };
  }

  const amount = Math.round(rubles * 100);

  const date = new Date(dateText);

  if (Number.isNaN(date.getTime())) {
    return { error: "Выберите дату" };
  }

  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId: user.id, type: "EXPENSE" },
  });

  if (!category) {
    return { error: "Выберите категорию" };
  }

  await prisma.expense.create({
    data: {
      amount,
      date,
      categoryId,
      comment: comment || null,
      userId: user.id,
    },
  });

  revalidatePath("/expenses");

  return {};
}
