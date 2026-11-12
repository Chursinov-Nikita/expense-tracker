import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import ExpenseForm from "../components/ExpenseForm";
import { Suspense } from "react";

async function NewExpense() {
  const user = await requireUser();

  const categories = await prisma.category.findMany({
    where: { userId: user.id, type: "EXPENSE" },
    orderBy: { name: "asc" },
  });

  return <ExpenseForm categories={categories} />;
}

const ExpensesPage = () => {
  return (
    <main>
      <Suspense fallback={<p>Загрузка...</p>}>
        <NewExpense />
      </Suspense>
    </main>
  );
};

export default ExpensesPage;
