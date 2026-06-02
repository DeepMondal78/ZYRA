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

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let startValue = 0;
    const endValue = 100;

    const interval = setInterval(() => {
      startValue += Math.floor(Math.random() * 5) + 2;
      if (startValue >= endValue) {
        startValue = endValue;
        clearInterval(interval);
        
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
            if (onLoadingComplete) onLoadingComplete();
          }
        });

        tl.to(textRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power4.inOut"
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut"
        });
      }
      setCounter(startValue);
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-10000 flex items-center justify-center bg-[#ebebeb] text-black"
    >
      <div className="overflow-hidden">
        <p 
          ref={textRef} 
          className="text-2xl font-light tracking-widest flex items-center gap-2"
        >
          <span className="w-12 inline-block text-right">{counter}%</span>
        </p>
      </div>
    </div>
  );
}