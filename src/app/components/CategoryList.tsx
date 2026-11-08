import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { CATEGORY_COLORS, getCategoryIcon } from "@/lib/category-appearance";
import { deleteCategory } from "../categories/actions";

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
      {categories.map((category) => {
        const Icon = getCategoryIcon(category.icon);

        return (
          <li key={category.id} className="flex items-center gap-2">
            <Icon
              className="size-4"
              style={{ color: CATEGORY_COLORS[category.type] }}
            />
            {category.name}
            <form action={deleteCategory}>
              <input type="hidden" name="id" value={category.id} />
              <button type="submit">Удалить</button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
