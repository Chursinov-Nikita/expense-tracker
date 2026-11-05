import { Suspense } from "react";
import CategoryList from "../components/CategoryList";

const CategoriesPage = () => {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <CategoryList />
    </Suspense>
  );
};

export default CategoriesPage;
