"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [counter, setCounter] = useState<number>(0);

  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let startValue = 0;
    const endValue = 100;

    const interval = setInterval(() => {

      startValue += Math.floor(Math.random() * 4) + 1;

      if (startValue >= endValue) {
        startValue = endValue;
        clearInterval(interval);

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
            if (onLoadingComplete) onLoadingComplete();
          }
        });


        tl.to([textRef.current, brandRef.current], {
          y: "-110%",
          duration: 0.8,
          ease: "power4.inOut",
          stagger: 0.04
        })

          .to(loaderRef.current, {
            yPercent: -100,
            duration: 1.3,
            ease: "power4.inOut"
          }, "-=0.4");
      }
      setCounter(startValue);
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-[#FBF3E4] text-black"
    >
      {/* 🌟 কন্টেন্ট মাস্কিং কন্টেইনার */}
      <div className="flex flex-col items-center justify-center overflow-hidden h-24 md:h-36">


        <span
          ref={brandRef}
          className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-2 font-medium block will-change-transform"
        >
          ZYRA STUDIO
        </span>

        <div className="overflow-hidden py-1">
          <p
            ref={textRef}
            className="text-5xl md:text-7xl font-[didot] font-light tracking-tight flex items-baseline will-change-transform"
          >
            {counter}
            <span className="text-lg md:text-xl font-sans ml-1 font-light text-black/50 relative -top-4 md:-top-7">%</span>
          </p>
        </div>

      </div>


      <div className="absolute bottom-10 overflow-hidden">
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 font-medium">
          Collection / 2026
        </p>
      </div>
    </div>
  );
}