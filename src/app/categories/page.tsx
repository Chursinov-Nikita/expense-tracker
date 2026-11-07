import { Suspense } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";

const CategoriesPage = () => {
  return (
    <main>
      <CategoryForm />
      <Suspense fallback={<p>Загрузка...</p>}>
        <CategoryList />
      </Suspense>
    </main>
  );
};

export default CategoriesPage;
