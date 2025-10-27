"use client";

import { motion, Variants } from "framer-motion";
import { BookCard } from "@/components/misc/book-card";

// Animação de fade + direção
const fadeInVariants = (
  direction: "up" | "down" | "left" | "right" | "none",
  delay: number,
  opacity: number
): Variants => ({
  hidden: {
    opacity,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1.2,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Animação em cascata para o container de cards
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // cada card aparece com 0.15s de diferença
    },
  },
};

// Dados do usuário (doador)
const user = {
  name: "Gustavo Almeida",
  uf: "SP",
};

// Lista de livros
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
    cover: "/books/20th_Century_Boys.jpg",
  },
  {
    id: 3,
    title: "Industrial Society and Its Future",
    author: "Ted Kaczynski",
    condition: "Danificado",
    cover: "/books/Industrial_Society.jpg",
  },
];

// Título e descrição
const heading = "Destaques de Livros para Doação";
const subheading =
  "Explore a coleção de livros oferecidos por nossos doadores. Cada página é uma oportunidade de aprendizado e compartilhamento!";

export const Highlights = () => {
  return (
    <section
      id="highlights"
      className="bg-[radial-gradient(ellipse_200%_100%_at_top_left,var(--color-hero-bg-1),var(--color-hero-bg-2))] py-24 sm:py-32 md:py-40 overflow-x-clip"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            variants={fadeInVariants("left", 0.01, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.07 }}
            className="tag mb-8"
          >
            📖 Compartilhe Leitura e Conhecimento
          </motion.div>

          <motion.h2
            variants={fadeInVariants("up", 0.05, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-[var(--color-about-h1-2)] to-[var(--color-about-h1-1)] text-transparent bg-clip-text"
          >
            {heading}
          </motion.h2>

          <motion.p
            variants={fadeInVariants("up", 0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Seção de livros animada */}
        <motion.div
          className="mt-12 sm:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                variants={fadeInVariants("up", index * 0.1, 0)}
              >
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  condition={book.condition}
                  cover={book.cover}
                  donorName={user.name}
                  donorUf={user.uf}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
