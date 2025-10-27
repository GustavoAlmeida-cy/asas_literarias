"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Ícone de seta para cima

export function ScrollTopButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`cursor-pointer fixed bottom-6 right-6 z-50 text-3xl h-12 w-12 flex justify-center items-center rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110
        ${
          showScrollButton
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
        text-white hover:text-[#FEFEFE] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,var(--color-hero-bg-2),var(--color-hero-bg-1))] overflow-x-clip`}
    >
      <ArrowUp className="w-5 h-5 text-foreground" />
    </button>
  );
}
