"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await authClient.signIn.email({
      email,
      password,
    });

    if (result.error) {
      setError("Ошибка при входе: " + result.error.message);
      return;
    }

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />

      {error && <p>{error}</p>}

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
