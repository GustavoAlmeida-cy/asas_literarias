"use client";

import React from "react";
import BooksForm from "@/components/misc/books-form";

export default function Page() {
  return (
    <main className="w-screen h-auto flex items-center justify-center p-4">
      <div className="w-120 max-w-md sm:max-w-lg bg-background-paper p-6 sm:p-8 rounded-xl shadow-lg my-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-8">
          Cadastro de Doação
        </h1>

        <BooksForm />
      </div>
    </main>
  );
}
