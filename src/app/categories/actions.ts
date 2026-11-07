"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { isCategoryIcon } from "@/lib/category-appearance";

type FormState = { error?: string };

export async function createCategory(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();

  const name = String(formData.get("name") ?? "").trim();
  const icon = String(formData.get("icon") ?? "");
  const type = String(formData.get("type") ?? "");

  if (!name) {
    return { error: "Введите название" };
  }

  if (!isCategoryIcon(icon)) {
    return { error: "Выберите иконку" };
  }

  if (type !== "INCOME" && type !== "EXPENSE") {
    return { error: "Выберите тип" };
  }

  await prisma.category.create({
    data: { name, icon, type, userId: user.id },
  });

  revalidatePath("/categories");

  return {};
}
