"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageGroup {
  left: string;
  right: string;
}

interface HeroProps {
  isLoading: boolean;
}

export default function Hero({ isLoading }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  // First load image (zara3 & zara4)
  const imageGroups: ImageGroup[] = [
    { left: "/zara3.webp", right: "/zara4.webp" },
    { left: "/zara1.webp", right: "/zara2.webp" },
  ];

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {

      // Text Animation
      if (textWrapperRef.current) {
        gsap.fromTo(
          textWrapperRef.current,
          { y: 90 },
          {
            y: 0,
            scale: 1.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "top -80%",
              scrub: 2,
            }
          }
        );
      }

      // Image Animetions
      gsap.utils.toArray<HTMLElement>(".image-box").forEach((img, index) => {
        if (index === 0 || index === 1) {
          gsap.fromTo(img,
            { scale: 1.05 },
            {
              scale: 1,
              duration: 1.2, 
              ease: "power2.out",
              clearProps: "all" 
            }
          );
        } else {
          gsap.fromTo(img,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section ref={containerRef} className="hero-content relative w-full bg-[#FBF3E4]">

      <div
        ref={textWrapperRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none will-change-transform"
      >
        <h1
          className="text-[35vw] font-[didot] leading-[0.8] text-transparent tracking-[-0.05em] flex select-none opacity-20 absolute"
          style={{ WebkitTextStroke: "1px black" }}
        >
          <span>Z</span><span>Y</span><span>R</span><span>A</span>
        </h1>

        <h1 className="text-[35vw] font-[didot] leading-none text-black tracking-[-0.05em] flex overflow-hidden select-none z-20">
          <span>Z</span><span>Y</span><span>R</span><span>A</span>
        </h1>
      </div>

      {/* Image container */}
      <div className="relative z-0 w-full flex flex-col items-center gap-16 md:gap-24 lg:gap-32 py-20 px-4 md:px-12 lg:px-16">
        {imageGroups.map((group, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-16 lg:gap-24 w-full">

            {/* Left side image box */}
            <div className="image-box relative w-full md:w-[46%] lg:w-[45%] xl:w-[45%] aspect-3/4 overflow-hidden shadow-xl">
              <Image
                src={group.left}
                alt="Zara Collection Left"
                fill
                className="object-cover"
                priority={index === 0 && !isLoading}
                loading={index === 0 ? "eager" : "lazy"} 
                fetchPriority={index === 0 ? "high" : "low"}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 45vw"
              />
            </div>

            {/* Write Side image box*/}
            <div className="image-box relative w-full md:w-[46%] lg:w-[45%] xl:w-[45%] aspect-3/4 overflow-hidden shadow-xl md:mt-24 lg:mt-36">
              <Image
                src={group.right}
                alt="Zara Collection Right"
                fill
                className="object-cover"
                priority={index === 0 && !isLoading}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 45vw"
              />
            </div>

          </div>
        ))}
      </div>

      <div className="fixed bottom-10 left-10 z-20 hidden md:block">
        <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/60">
          New Collection / 2026
        </p>
      </div>
    </section>
  );
}