"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  condition: "Novo" | "Usado" | "Danificado";
  cover: string;
  donorName: string;
  donorUf: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  condition,
  cover,
  donorName,
  donorUf,
}) => {
  const [imageError, setImageError] = useState(false);

  const conditionClasses =
    condition === "Novo"
      ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
      : condition === "Usado"
      ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
      : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100";

  return (
    <Link
      // href={`/books/${id}`}
      href={`/books/id`}
      className="bg-white hover:scale-104 transition-all dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-lg overflow-hidden flex flex-col hover:shadow-xl"
    >
      {/* Capa do livro ou placeholder */}
      <div className="h-100 p-4 w-full relative flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        {!imageError ? (
          <Image
            src={cover}
            alt={title || "Capa do livro"}
            fill
            className="object-contain select-none"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageIcon className="w-12 h-12 mb-2 select-none" />
            <span className="text-sm select-none">
              Imagem indisponível - ID do Livro: ${id}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
          Autor: {author}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
          Doador: {donorName} ({donorUf})
        </p>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${conditionClasses}`}
        >
          {condition}
        </span>
      </div>
    </Link>
  );
};
