"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import bg_1 from "@/assets/bg_1.jpg";

// Animation variables
const fadeInVariants = (
  direction: "up" | "down" | "left" | "right" | "none",
  delay: number,
  opacity: number
): Variants => ({
  hidden: {
    opacity: opacity,
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
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Text variables
const heading = "Conectando leitores, espalhando conhecimento";
const text =
  "O Asas Literárias é uma plataforma dedicada a incentivar a leitura e a doação de livros. Nosso objetivo é conectar pessoas que desejam compartilhar histórias com quem busca conhecimento, dando nova vida às páginas e promovendo aprendizado e cultura para todos.";

export const About = () => {
  return (
    <section
      id="about"
      className="py-15 pt-25 bg-[radial-gradient(ellipse_200%_100%_at_top_left,var(--color-hero-bg-1),var(--color-hero-bg-2))] overflow-x-clip"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Imagem (aparece apenas em telas grandes, agora à esquerda) */}
          <motion.div
            variants={fadeInVariants("up", 0.02, 0)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.07 }}
            className="hidden lg:flex flex-1 justify-center order-1 lg:order-1"
          >
            <Image
              src={bg_1}
              alt="Leitores e livros"
              width={400}
              height={400}
              className="select-none shadow-md rounded-md"
            />
          </motion.div>

          {/* Texto */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-2">
            <motion.div
              variants={fadeInVariants("left", 0.01, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.07 }}
              className="tag mb-8"
            >
              ✌️ Entenda nossa missão!
            </motion.div>
            <motion.div
              variants={fadeInVariants("right", 0.01, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.07 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-[var(--color-about-h1-2)] to-[var(--color-about-h1-1)] text-transparent bg-clip-text">
                {heading}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[var(--color-about-txt)] tracking-tight mt-6">
                {text}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
