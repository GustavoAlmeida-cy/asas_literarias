"use client";

import React from "react";
import Link from "next/link";
import { BookCard } from "@/components/misc/book-card";

export default function Page() {
  // Dados do usuário (doador)
  const user = {
    name: "Gustavo Almeida",
    uf: "SP",
  };

  // Lista de livros com imagem de capa
  const books: {
    id: number;
    title: string;
    author: string;
    condition: "Novo" | "Usado" | "Danificado";
    cover: string;
  }[] = [
    {
      id: 1,
      title: "Box de Livros - René Guénon Essencial",
      author: "René Guénon",
      condition: "Usado",
      cover: "/books/guenon/guenon_1.jpg",
    },
    {
      id: 2,
      title: "20th Century Boys",
      author: "Naoki Urasawa",
      condition: "Novo",
      cover: "/books/20th Century Boys.jpg",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      condition: "Usado",
      cover: "/books/1984.webp",
    },
    {
      id: 4,
      title: "Industrial Society and Its Future",
      author: "Ted Kaczynski",
      condition: "Danificado",
      cover: "/books/Industrial Society.jpg",
    },
  ];

  return (
    <main className="w-screen min-h-screen flex flex-col items-center p-4 space-y-8">
      {/* Banner de incentivo à doação */}
      <section className="w-full max-w-5xl bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Compartilhe conhecimento!
          </h2>
          <p className="text-blue-800 text-lg">
            Doe um livro e ajude a comunidade a ter acesso a mais conhecimento e
            cultura. É rápido e simples!
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Link href="/books/new">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition cursor-pointer">
              Doe um livro!
            </button>
          </Link>
        </div>
      </section>

      {/* Seção de livros */}
      <section className="w-full max-w-5xl my-10">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Seus Livros em Doação
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              condition={book.condition}
              cover={book.cover}
              donorName={user.name}
              donorUf={user.uf}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
