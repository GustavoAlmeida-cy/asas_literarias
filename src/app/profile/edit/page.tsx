"use client";

import React from "react";
import Link from "next/link";
import SignUpForm from "@/components/misc/sign-up-form"; // ajuste o caminho se necessário

export default function Page() {
  return (
    <main className="w-screen h-auto flex items-center justify-center p-4">
      <div className="w-120 max-w-md sm:max-w-lg bg-background-paper p-6 sm:p-8 rounded-xl shadow-lg my-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-8">
          Editar Usuário
        </h1>

        <SignUpForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            href="/profile"
            className="text-blue-600 hover:underline font-medium"
          >
            Voltar
          </Link>
        </p>
      </div>
    </main>
  );
}
