"use client";

import React from "react";
import Link from "next/link";
import SignInForm from "@/components/misc/sign-in-form"; // ajuste o caminho se necessário

export default function Page() {
  return (
    <main className="w-screen h-auto flex items-center justify-center p-4">
      <div className="w-100 max-w-md sm:max-w-lg bg-background-paper p-6 sm:p-8 rounded-xl shadow-lg my-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-8">
          Entrar na Conta
        </h1>

        <SignInForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Não possui uma conta?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Criar Conta
          </Link>
        </p>
      </div>
    </main>
  );
}
