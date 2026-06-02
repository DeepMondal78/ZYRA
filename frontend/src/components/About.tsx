"use client";
import React, { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
      });

      if (videoRef.current) {
        gsap.from(videoRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 70%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FBF3E4] py-20 md:py-40 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5 z-10">
          <h2 className="about-text text-[10px] uppercase tracking-[0.5em] text-black/50 mb-6">
            The Philosophy
          </h2>
          <h3 className="about-text text-4xl md:text-8xl font-[didot] leading-tight text-black mb-8">
            REDEFINING <br /> MODERN <br /> ELEGANCE
          </h3>
          <p className="about-text text-sm md:text-base leading-relaxed text-black/80 max-w-md">
            At ZYRA, we believe that fashion is a language that creates itself in
            the intersection of design and emotion. Our 2026 collection embodies
            the spirit of the contemporary individual—bold, refined, and timeless.
          </p>

          <div className="about-text mt-10">
            <button className="group relative overflow-hidden border border-black px-8 py-3 transition-all duration-500 hover:text-[#FBF3E4]">
              <span className="relative z-10 text-[12px] uppercase text-gray-500 tracking-widest">
                Discover More
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-black transition-transform duration-500 group-hover:translate-y-0"></div>
            </button>
          </div>
        </div>

        <div className="md:col-span-7 relative w-full aspect-video md:aspect-square lg:aspect-video bg-black/5 overflow-hidden shadow-2xl">
          <div ref={videoRef} className="w-full h-full relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/about-video-thumbnail.jpg"
              webkit-playsinline="true"
              className="w-full h-full object-cover"
            >
              <source src="/videos/zara-about-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-10 opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[20vw] font-serif">EST. 1975</h1>
      </div>
    </section>
  );
}