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

  const existing = await prisma.category.findUnique({
    where: { userId_name: { userId: user.id, name } },
  });

  if (existing) {
    return { error: "Такая категория уже есть" };
  }

  await prisma.category.create({
    data: { name, icon, type, userId: user.id },
  });

  revalidatePath("/categories");

  return {};
}

export async function deleteCategory(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");

  await prisma.category.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/categories");
}
