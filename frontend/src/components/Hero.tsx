"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ইমেজ গ্রুপের জন্য টাইপস্ক্রিপ্ট ইন্টারফেস
interface ImageGroup {
  left: string;
  right: string;
}

export default function Hero() {
  // HTML এলিমেন্টের সঠিক Ref টাইপ নির্ধারণ করা হলো
  const containerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const imageGroups: ImageGroup[] = [
    { left: "/zara3.webp", right: "/zara4.webp" },
    { left: "/zara1.webp", right: "/zara2.webp" }, 
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        "h1 span",
        { y: "100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.5
        }
      );

      // utils.toArray-এর জন্য HTMLElement টাইপ সেট করা হলো
      gsap.utils.toArray<HTMLElement>(".image-box").forEach((img) => {
        gsap.fromTo(img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FBF3E4]">

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">

        <h1
          className="text-[35vw] font-[didot] leading-[0.8] text-transparent stroke-text tracking-[-0.05em] flex select-none opacity-20 absolute"
          style={{ WebkitTextStroke: "1px black" }}
        >
          <span>Z</span><span>Y</span><span>R</span><span>A</span>
        </h1>

        <h1
          ref={textRef}
          className="text-[35vw] font-[didot] leading-none text-black tracking-[-0.05em] flex overflow-hidden select-none z-20"
        >
          <span>Z</span><span>Y</span><span>R</span><span>A</span>
        </h1>

      </div>

      <div className="relative z-0 w-full flex flex-col items-center gap-10 md:gap-32 py-20 px-4 md:px-10">
        {imageGroups.map((group, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 w-full">

            <div className="image-box relative w-full md:w-[40%] aspect-3/4 md:h-[90vh] overflow-hidden shadow-xl">
              <Image
                src={group.left}
                alt="Zara Collection"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>

            <div className="image-box relative w-full md:w-[40%] aspect-3/4 md:h-[90vh] overflow-hidden shadow-xl md:mt-40">
              <Image
                src={group.right}
                alt="Zara Collection"
                fill
                className="object-cover"
                priority={index === 0}
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