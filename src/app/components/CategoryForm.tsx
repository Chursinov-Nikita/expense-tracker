"use client";

import { CATEGORY_ICONS } from "@/lib/category-appearance";
import { createCategory } from "../categories/actions";
import { useActionState } from "react";

function CategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategory, {});

  return (
    <form action={formAction} className="flex gap-2">
      <input name="name" placeholder="Название" required />

      <select name="icon">
        {Object.keys(CATEGORY_ICONS).map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>

      <select name="type">
        <option value="EXPENSE">Расход</option>

        <option value="INCOME">Доход</option>
      </select>

      {state.error && <p>{state.error}</p>}

      <button disabled={isPending} type="submit">
        Добавить
      </button>
    </form>
  );
}
export default CategoryForm;
