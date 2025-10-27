"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import odsImage from "@/assets/ods.png";

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

const heading = "Nossos Valores e Compromisso com a Educação de Qualidade";
const text =
  "O Asas Literárias promove a Educação de Qualidade, alinhada aos Objetivos de Desenvolvimento Sustentável da ONU, conectando leitores e doadores para incentivar a leitura, inclusão e aprendizado contínuo. Valorizamos o acesso igualitário ao conhecimento, o compartilhamento de livros e a construção de uma sociedade mais educada e consciente.";

export const Values = () => {
  return (
    <section
      id="values"
      className="bg-[var(--color-hero-bg-2)] py-40 overflow-x-clip"
    >
      <div className="container mx-auto px-6">
        {/* Cabeçalho do bloco */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Tag do topo */}
          <motion.div
            variants={fadeInVariants("up", 0.01, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.07 }}
            className="tag tracking-wide"
          >
            🌱 Educação e Sustentabilidade!
          </motion.div>

          <motion.div
            variants={fadeInVariants("left", 0.01, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.07 }}
          >
            {/* Título animado */}
            <h2 className="section-title mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-[var(--color-about-h1-2)] to-[var(--color-about-h1-1)] text-transparent bg-clip-text">
              {heading}
            </h2>

            {/* Parágrafo animado */}
            <p className="section-description mt-5 text-base sm:text-lg md:text-xl text-[var(--color-about-txt)] tracking-tight leading-relaxed">
              {text}
            </p>
          </motion.div>

          {/* Imagem das ODS */}
          <motion.div
            variants={fadeInVariants("up", 0.2, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 flex justify-center"
          >
            <Image
              src={odsImage}
              alt="Objetivos de Desenvolvimento Sustentável da ONU"
              className="rounded-xl shadow-lg w-full max-w-2xl h-auto object-contain select-none"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
