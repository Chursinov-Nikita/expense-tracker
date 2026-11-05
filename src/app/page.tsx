import { Suspense } from "react";
import { requireUser } from "@/lib/session";

async function Dashboard() {
  const user = await requireUser();

  return <h1>Привет, {user.name}</h1>;
}

export default function Home() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <Dashboard />
    </Suspense>
  );
}
