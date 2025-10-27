"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function BookPage() {
  const book = {
    title: "Box de Livros - René Guénon Essencial",
    author: "René Guénon",
    genre: "Filosofia / Esoterismo",
    condition: "Usado",
    summary:
      "Coleção completa de obras essenciais de René Guénon, reunindo temas de tradição, metafísica e filosofia esotérica, cuidadosamente selecionadas para estudo e referência.",
    donorComment: "Box em excelente estado, sem marcas relevantes.",
    totalCopies: 1,
    donorName: "Gustavo Almeida",
    donorUf: "SP",
    whatsapp: "5511948080918",
    phoneNumber: "+55 (11) 94808-0918",
    coverUrls: [
      "/books/guenon/guenon_1.jpg",
      "/books/guenon/guenon_2.webp",
      "/books/guenon/guenon_3.png",
      "/books/guenon/guenon_4.jpg",
      "/books/guenon/guenon_5.jpg",
    ],
    createdAt: "2025-10-20T14:30:00Z",
  };

  const [mainImage, setMainImage] = useState(book.coverUrls[0]);

  const formattedDate = new Date(book.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen w-full bg-[var(--color-hero-bg-2)] dark:bg-[var(--color-dark-bg)] p-4 sm:p-6 lg:p-12">
      <div className="max-w-6xl mx-auto bg-[var(--color-hero-bg-1)] rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
        {/* Seção de imagens */}
        <div className="flex flex-col-reverse sm:flex-row lg:flex-row gap-4 w-full lg:w-auto justify-center items-center">
          {/* Miniaturas */}
          <div className="flex flex-row sm:flex-col gap-3 justify-start sm:justify-start order-2 sm:order-1 overflow-x-auto sm:overflow-visible w-full sm:w-auto p-4 sm:p-0">
            {book.coverUrls.map((img, i) => {
              const isSelected = mainImage === img;
              return (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-16 sm:h-16 rounded-md flex items-center justify-center cursor-pointer transition overflow-hidden
                    ${
                      isSelected
                        ? "ring-2 ring-green-500"
                        : "hover:ring-2 hover:ring-green-400"
                    }
                  `}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    width={64}
                    height={64}
                    className="rounded-md object-contain select-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Imagem principal com efeito de zoom */}
          <div className="relative w-full sm:w-72 lg:w-80 h-96 sm:h-[28rem] flex-shrink-0 rounded-lg overflow-hidden shadow-md order-1 sm:order-2 group">
            <Image
              src={mainImage}
              alt={book.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110 select-none"
            />
          </div>
        </div>

        {/* Seção de informações */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {book.title}
            </h1>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Autor:</span> {book.author}
              </p>
              <p>
                <span className="font-semibold">Gênero:</span> {book.genre}
              </p>
              <p>
                <span className="font-semibold">Condição:</span>{" "}
                {book.condition}
              </p>
              <p>
                <span className="font-semibold">Resumo:</span> {book.summary}
              </p>
              {book.donorComment && (
                <p>
                  <span className="font-semibold">Comentário do doador:</span>{" "}
                  {book.donorComment}
                </p>
              )}
              <p>
                <span className="font-semibold">Total de cópias:</span>{" "}
                {book.totalCopies}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Doador:</span> {book.donorName}{" "}
                ({book.donorUf})
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Contato direto:</span>{" "}
                {book.phoneNumber}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                Anúncio criado em {formattedDate}
              </p>
            </div>
          </div>

          {/* Botão WhatsApp */}
          <a
            href={`https://wa.me/${book.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition max-w-[100%] md:max-w-[50%] text-center"
          >
            <Phone size={18} />
            Entrar em contato via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
