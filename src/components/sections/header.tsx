"use client";

import * as React from "react";
import { ThemeToggleButton } from "@/components/misc/theme-toggle-btn";
import { Menu } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-section-bg-2/10">
      <div className="py-4 sm:py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo com efeito */}
            <div className="relative inline-flex before:content-[''] before:absolute before:inset-0 before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
              {/* Logo */}
              <Link
                href="/"
                className="h-10 sm:h-12 w-auto select-none flex items-center"
              >
                <Image
                  src={Logo}
                  alt="Logo image"
                  width={60}
                  height={60}
                  className="select-none relative"
                />
              </Link>
            </div>

            <div className="flex gap-10">
              {/* Desktop navigation */}
              <nav className="hidden md:flex items-center gap-6 text-sm sm:text-base text-7 font-semibold">
                <Link
                  className="hover:opacity-80 transition-opacity"
                  href="/books"
                >
                  Pesquisar
                </Link>
                <Link
                  className="hover:opacity-80 transition-opacity"
                  href="/profile"
                >
                  Perfil
                </Link>
                <Link
                  className="hover:opacity-80 transition-opacity"
                  href="#highlights"
                >
                  Destaques
                </Link>
                <Link
                  className="hover:opacity-80 transition-opacity"
                  href="#about"
                >
                  Sobre
                </Link>
                <Link
                  className="hover:opacity-80 transition-opacity"
                  href="#values"
                >
                  Nossos Valores
                </Link>
                <Link
                  className="hover:opacity-80 transition-opacity btn btn-primary"
                  href="/sign-in"
                >
                  Entrar
                </Link>
              </nav>

              {/* Right side (desktop + mobile trigger) */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Mobile menu */}
                <Sheet>
                  <SheetTrigger className="ml-1.5 cursor-pointer md:hidden shadow-2xl">
                    <div className="shadow-2xl shadow-black rounded-lg p-1 bg-transparent hover:bg-1/40">
                      <Menu
                        size={32}
                        className="text-nav-txt transition-opacity hover:opacity-85"
                        strokeWidth={2.5}
                        aria-label="Abrir menu"
                      />
                    </div>
                  </SheetTrigger>

                  <SheetContent className="p-5 pt-0 w-[240px] bg-nav-bg">
                    <SheetHeader className="px-0">
                      <SheetTitle className="text-nav-txt">Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-4 text-sm text-nav-txt font-semibold">
                      <Link
                        className="hover:opacity-80 transition-opacity"
                        href="/books"
                      >
                        Pesquisar
                      </Link>
                      <Link
                        className="hover:opacity-80 transition-opacity"
                        href="/profile"
                      >
                        Perfil
                      </Link>
                      <Link
                        className="hover:opacity-80 transition-opacity"
                        href="#highlights"
                      >
                        Destaques
                      </Link>
                      <Link
                        className="hover:opacity-80 transition-opacity"
                        href="#about"
                      >
                        Sobre
                      </Link>
                      <Link
                        className="hover:opacity-80 transition-opacity"
                        href="#values"
                      >
                        Nossos Valores
                      </Link>
                      <Link
                        className="hover:opacity-80 transition-opacity btn btn-primary"
                        href="/sign-in"
                      >
                        Entrar
                      </Link>
                    </div>

                    {/* Separador */}
                    <div className="flex justify-between items-center mt-4 border-t border-[#050505]/30 pt-4"></div>
                  </SheetContent>
                </Sheet>

                {/* Theme button */}
                <ThemeToggleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
