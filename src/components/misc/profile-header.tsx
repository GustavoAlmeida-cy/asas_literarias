"use client";

import * as React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { Edit } from "lucide-react"; // ícone de lápis

export const ProfileHeader = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-section-bg-2/10">
      <div className="py-4 sm:py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo com efeito */}
            <div className="relative inline-flex before:content-[''] before:absolute before:inset-0 before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
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

            <div className="flex items-center gap-6">
              {/* Botão de edição de informações */}
              <Link
                href="/profile/edit"
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit size={18} />
                Editar Usuário
              </Link>

              {/* Desktop navigation */}
              <nav className="flex items-center gap-6 text-sm sm:text-base font-semibold">
                <Link
                  className="hover:opacity-80 transition-opacity btn btn-primary"
                  href="/"
                >
                  Sair
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
