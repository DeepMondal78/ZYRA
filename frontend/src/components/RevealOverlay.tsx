"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const RevealOverlay = () => {
    // HTML এলিমেন্টের সঠিক Ref টাইপ নির্ধারণ করা হলো
    const containerRef = useRef<HTMLDivElement>(null);
    const mosaicRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      
      const createCrazyMosaic = () => {
        const rows = 14; 
        const cols = rows; 
        const fragmentCount = rows * cols;
        const mosaic = mosaicRef.current;

        // mosaic অবজেক্টটি নাল (null) কিনা তা পরীক্ষা করে নেওয়া হলো
        if (!mosaic) return;

        for (let i = 0; i < fragmentCount; i++) {
          const fragment = document.createElement("div");
          fragment.className = "mosaic-fragment bg-zinc-950"; 
          
          const randomVertices = 6;
          let clipPath = `polygon(`;
          for (let v = 0; v < randomVertices; v++) {
            const xPercent = gsap.utils.random((i % cols) * (100 / cols), ((i % cols) + 1) * (100 / cols));
            const yPercent = gsap.utils.random(Math.floor(i / cols) * (100 / rows), (Math.floor(i / cols) + 1) * (100 / rows));
            clipPath += `${xPercent}% ${yPercent}%,`;
          }
          clipPath = clipPath.slice(0, -1) + `)`; 
          fragment.style.clipPath = clipPath;
          mosaic.appendChild(fragment);
        }
      };

      createCrazyMosaic();

      const tl = gsap.timeline();

      tl.to(".mosaic-fragment", {
        opacity: 0,
        scale: 0.1, 
        rotateX: () => gsap.utils.random(-360, 360), 
        rotateY: () => gsap.utils.random(-360, 360),
        x: () => gsap.utils.random(-300, 300), 
        y: () => gsap.utils.random(-300, 300), 
        stagger: {
          grid: [14, 14], 
          from: "random", 
          amount: 2.2, 
        },
        ease: "back.inOut(2.5)", 
        delay: 0.5,
      })
      
      .fromTo(".hero-content", 
          { y: 100, opacity: 0, skewY: 15, scale: 0.8 }, 
          { y: 0, opacity: 1, skewY: 0, scale: 1, duration: 1.8, ease: "expo.out" }, 
          "-=1.6" 
      )
      
      .to(containerRef.current, {
          display: "none",
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-100000 pointer-events-none overflow-hidden">
            <div ref={mosaicRef} className="mosaic-container absolute inset-0"></div>
        </div>
    );
};

export default RevealOverlay;