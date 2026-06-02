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

  const imageGroups: ImageGroup[] = [
    { left: "/zara3.webp", right: "/zara4.webp" },
    { left: "/zara1.webp", right: "/zara2.webp" }, 
  ];

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      
      // 🎯 ১. টেক্সট স্ক্রোল অ্যানিমেশন
      if (textWrapperRef.current) {
        gsap.fromTo(
          textWrapperRef.current,
          { y: 80 }, 
          {
            y: 0,     
            scrollTrigger: {
              trigger: containerRef.current, 
              start: "top top",              
              end: "top -30%",               
              scrub: 1.2,                    
            }
          }
        );
      }

      // 🎯 ২. প্রথম দুটি ইমেজের লোড অ্যানিমেশন এবং বাকিগুলোর স্ক্রোল অ্যানিমেশন
      gsap.utils.toArray<HTMLElement>(".image-box").forEach((img, index) => {
        if (index === 0 || index === 1) {
          gsap.fromTo(img,
            { scale: 1.3, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.8,
              ease: "power3.out",
              delay: 0.2
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
                start: "top 80%",
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
    <section ref={containerRef} className="relative w-full bg-[#FBF3E4]">
      
      {/* 🌟 আপনার অরিজিনাল টেক্সট লেআউট (বিন্দুমাত্র পরিবর্তন করা হয়নি) */}
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

      {/* 🌟 নতুন ফিক্সড করা ইমেজ গ্রিড কন্টেইনার */}
      <div className="relative z-0 w-full flex flex-col items-center gap-16 md:gap-24 lg:gap-32 py-20 px-4 md:px-12 lg:px-16">
        {imageGroups.map((group, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 w-full">
            
            {/* 📸 বামের ইমেজ বক্স */}
            {/* উইডথকে ১০২৪ পিক্সেল এবং ট্যাবলেটে বাড়িয়ে চওড়া করা হয়েছে এবং এসপেক্ট রেশিও ৩:৪ এ ফিক্স করা হয়েছে */}
            <div className="image-box relative w-full md:w-[46%] lg:w-[38%] xl:w-[43%] aspect-3/4 overflow-hidden shadow-xl">
              <Image
                src={group.left}
                alt="Zara Collection"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>

            {/* 📸 ডানের ইমেজ বক্স */}
            {/* উইডথ এবং রেশিও বামেরটার সাথে হুবহু মিল রেখে জাস্ট ডেক্সটপ/ট্যাবলেট অনুযায়ী টপ মার্জিন অ্যাডজাস্ট করা হয়েছে */}
            <div className="image-box relative w-full md:w-[46%] lg:w-[38%] xl:w-[43%] aspect-3/4 overflow-hidden shadow-xl md:mt-24 lg:mt-36">
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