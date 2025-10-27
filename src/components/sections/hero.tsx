"use client";

// Assets
import bookImage from "@/assets/book_2.png";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

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
const heading = "Compartilhe histórias, espalhe asas";
const text =
  "O Asas Literárias conecta leitores que desejam doar e receber livros. Dê nova vida às páginas que inspiraram você e ajude outras pessoas a voarem com a leitura.";

export const Hero = () => {
  return (
    <section className="pt-30 pb-30 sm:pt-45 md:pt-30 -mt-25 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,var(--color-hero-bg-1),var(--color-hero-bg-2))] overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Texto */}
          <div className="w-full md:max-w-[550px] text-center md:text-left">
            <motion.div
              variants={fadeInVariants("right", 0.01, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.07 }}
              className="tag"
            >
              📚 Doe, receba e inspire!
            </motion.div>
            <motion.div
              variants={fadeInVariants("left", 0.01, 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.07 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b text-transparent bg-clip-text my-8 from-[var(--color-hero-h1-2)] to-[var(--color-hero-h1-1)]">
                {heading}
              </h1>
              <p className="text-2xl text-hero-txt tracking-tight mt-6">
                {text}
              </p>
              <div className="flex justify-center md:justify-start mt-8">
                <Link href="/books/new">
                  <button className="btn btn-primary p-3 text-2xl">
                    Doe um livro!
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Imagem (oculta em telas pequenas) */}
          <motion.div
            variants={fadeInVariants("up", 0.01, 0)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.07 }}
            className="hidden md:block w-full max-w-[500px] mx-auto md:mx-0 mt-10 md:mt-0"
          >
            <motion.img
              src={bookImage.src}
              alt="Book image"
              className="select-none w-full h-auto"
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
