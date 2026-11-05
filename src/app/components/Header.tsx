"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();

    router.push("/sign-in");
  };

  return (
    <header>
      <nav className="bg-zinc-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-white text-lg font-semibold">Трекер</h1>
          </Link>
          <ul className="flex space-x-4">
            <li>
              {isPending ? null : session ? (
                <button onClick={handleSignOut}>Выйти</button>
              ) : (
                <Link href="/sign-in">Войти</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
