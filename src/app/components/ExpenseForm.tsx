"use client";

import { useActionState } from "react";
import { createExpense } from "../expenses/actions";

type ExpenseFormProps = {
  categories: { id: string; name: string }[];
};

function ExpenseForm({ categories }: ExpenseFormProps) {
  const [state, formAction, isPending] = useActionState(createExpense, {});

  return (
    <form action={formAction} className="flex gap-2">
      <input
        name="amount"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Сумма"
        required
      />

      <input name="date" type="date" required />

      <select name="categoryId">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input name="comment" placeholder="Комментарий" />

      {state.error && <p>{state.error}</p>}

      <button type="submit" disabled={isPending}>
        Добавить
      </button>
    </form>
  );
}

export default ExpenseForm;
