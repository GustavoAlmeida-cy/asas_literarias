import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { About } from "@/components/sections/about";
import { Values } from "@/components/sections/values";

export default function Home() {
  return (
    <>
      <main className="w-screen">
        <div className="max-w-screen">
          <Hero />
          <Highlights />
          <About />
          <Values />
        </div>
      </main>
    </>
  );
}
