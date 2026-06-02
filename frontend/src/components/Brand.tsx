"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandStatement: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll<HTMLSpanElement>(".statement-char");

    gsap.to(chars, {
      color: "#ffffff",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  const statement: string =
    "ZYRA is more than a brand. It is an exploration of timeless elegance, crafted for those who find beauty in simplicity and strength in minimalism.";

  return (
    <section className="bg-[#080808] py-40 px-6 flex items-center justify-center">
      <div className="max-w-5xl text-center">
        <h4 className="text-zinc-600 uppercase tracking-[0.5em] text-xs mb-12 font-mono">
          Our Philosophy
        </h4>

        <p
          ref={textRef}
          className="text-4xl md:text-6xl font-[didot] leading-tight text-zinc-800 transition-colors duration-500"
        >
          {statement.split(" ").map((word, i) => (
            <span key={i} className="statement-char inline-block mr-3 mb-2">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-16 w-px h-24 bg-linear-to-b from-white/20 to-transparent mx-auto"></div>
      </div>
    </section>
  );
};

export default BrandStatement;