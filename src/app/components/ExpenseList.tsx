import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

async function ExpenseList(params: type) {
  const user = await requireUser();

  const expenses = await prisma.expense.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { date: "desc" },
  });

  if (expenses.length === 0) {
    return <p>Расходов пока нет</p>;
  }
}
