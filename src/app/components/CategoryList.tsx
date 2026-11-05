import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

async function CategoryList() {
  const user = await requireUser();

  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) {
    return <p>Категорий пока нет</p>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
}

export default CategoryList;
