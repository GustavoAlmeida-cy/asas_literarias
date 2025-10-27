"use client";

import React, { useState } from "react";
import { BookCard } from "@/components/misc/book-card";
import { Search } from "lucide-react";

export default function Page() {
  const [search, setSearch] = useState("");

  // Lista de livros (expandida com doadores variados)
  const books = [
    {
      id: 1,
      title: "Box de Livros - René Guénon Essencial",
      author: "René Guénon",
      condition: "Usado",
      cover: "/books/guenon/guenon_1.jpg",
      donor: { name: "Gustavo Almeida", uf: "SP" },
    },
    {
      id: 2,
      title: "20th Century Boys",
      author: "Naoki Urasawa",
      condition: "Novo",
      cover: "/books/20th_Century_Boys.jpg",
      donor: { name: "Gustavo Almeida", uf: "SP" },
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      condition: "Usado",
      cover: "/books/1984.webp",
      donor: { name: "Gustavo Almeida", uf: "SP" },
    },
    {
      id: 4,
      title: "Industrial Society and Its Future",
      author: "Ted Kaczynski",
      condition: "Danificado",
      cover: "/books/Industrial_Society.jpg",
      donor: { name: "Gustavo Almeida", uf: "SP" },
    },
    {
      id: 5,
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      condition: "Novo",
      cover: "/books/O_Pequeno_Principe.jpg",
      donor: { name: "Paulo Silva", uf: "SP" },
    },
    {
      id: 6,
      title: "Dom Casmurro",
      author: "Machado de Assis",
      condition: "Usado",
      cover: "/books/Dom_Casmurro.jpg",
      donor: { name: "Carla Mendes", uf: "RS" },
    },
    {
      id: 7,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      condition: "Novo",
      cover: "/books/Harry_Potter.jpg",
      donor: { name: "Fernanda Costa", uf: "BA" },
    },
  ];

  // Filtragem pela busca (título, autor ou doador)
  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.donor.name.toLowerCase().includes(query) ||
      book.donor.uf.toLowerCase().includes(query)
    );
  });

  return (
    <main className="w-screen min-h-screen flex flex-col items-center p-4 space-y-10 bg-[var(--color-hero-bg-2)]">
      {/* Título principal */}
      <div className="text-center mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
          Catálogo de Doações
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
          Explore os livros disponíveis e encontre novas histórias doadas por
          pessoas de todo o Brasil.
        </p>
      </div>

      {/* Barra de busca */}
      <div className="w-full max-w-lg relative mt-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por título, autor ou doador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[var(--color-hero-bg-2)] w-full pl-12 pr-4 py-3 text-base rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>

      {/* Seção de livros */}
      <section className="w-full max-w-7xl my-8">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">
          Livros Disponíveis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-20">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              condition={book.condition as "Novo" | "Usado" | "Danificado"}
              cover={book.cover}
              donorName={book.donor.name}
              donorUf={book.donor.uf}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum livro encontrado.
          </p>
        )}
      </section>
    </main>
  );
}
