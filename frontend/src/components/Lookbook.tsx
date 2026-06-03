"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Lookbook = () => {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".floating-img", {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.02
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={gridRef} className="relative min-h-screen bg-[#080808] py-32 px-6 overflow-hidden">
      
      <div className="text-center mb-24">
        <h3 className="text-zinc-500 uppercase tracking-[0.4em] text-xs mb-4 font-mono">Archive 2026</h3>
        <h2 className="text-6xl md:text-8xl font-[didot] text-white uppercase italic">AESTHETIC JOURNEY</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 relative">
        
        {/* 🌟 zara9.webp: মোবাইলে ফুল স্ক্রিন, ডেক্সটপে অর্ধেক স্ক্রিন (col-span-6) */}
        <div className="col-span-12 md:col-span-6 aspect-4/5 relative floating-img overflow-hidden rounded-sm">
          <Image 
            src="/zara9.webp" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="l1" 
          />
        </div>

        {/* 🌟 zara8.webp: মোবাইলে অর্ধেক স্ক্রিন (col-span-6), ডেক্সটপে ৪ ভাগের ১ ভাগ (col-span-3) */}
        <div className="col-span-6 md:col-span-3 aspect-3/4 relative mt-20 floating-img overflow-hidden rounded-sm">
          <Image 
            src="/zara8.webp" 
            fill 
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover" 
            alt="l2" 
          />
        </div>

        {/* 🌟 zara7.webp: মোবাইলে অর্ধেক স্ক্রিন (col-span-6), ডেক্সটপে ৪ ভাগের ১ ভাগ (col-span-3) */}
        <div className="col-span-6 md:col-span-3 aspect-3/4 relative mt-40 floating-img overflow-hidden rounded-sm">
          <Image 
            src="/zara7.webp" 
            fill 
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="l3" 
          />
        </div>

        <div className="col-span-12 md:col-span-4 mt-12 md:mt-0">
            <p className="text-zinc-400 font-serif italic text-2xl leading-relaxed">
              Fashion is not just about clothes, it&apos;s about the story you tell without speaking.
            </p>
        </div>

        {/* 🌟 zara6.webp: মোবাইলে ফুল স্ক্রিন, ডেক্সটপে ১২ ভাগের ৫ ভাগ (col-span-5) */}
        <div className="col-span-12 md:col-span-5 aspect-video relative mt-12 floating-img overflow-hidden rounded-sm">
          <Image 
            src="/zara6.webp" 
            fill 
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover brightness-75" 
            alt="l4" 
          />
        </div>

      </div>
    </section>
  );
};

export default Lookbook;