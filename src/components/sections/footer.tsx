"use client";

import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[var(--color-footer-bg)] text-white text-sm py-10 text-center"
    >
      <div className="container mx-auto px-4">
        {/* Logo + Social */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
          {/* Logo com efeito */}
          <div className="relative inline-flex before:content-[''] before:absolute before:inset-0 before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo image"
                width={70}
                height={70}
                className="select-none relative"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-xs sm:text-sm text-foreground">
          Copyright &copy; 2025 Gustavo Almeida, Marcelo Frota, Rhayan Andrade,
          <br></br>
          Vinicius Bastos, Thamyres Paula.
          <br></br>
          Todos os direitos reservados. &nbsp;|&nbsp; Projeto open source
          no&nbsp;
          <Link
            className="hover:opacity-80 transition-opacity font-bold"
            href="https://github.com/GustavoAlmeida-cy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </p>
      </div>
    </footer>
  );
};
