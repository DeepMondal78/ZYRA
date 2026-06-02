"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Paralax = () => {
  // HTML এলিমেন্টের সঠিক Ref টাইপ নির্ধারণ করা হলো
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 2,
        },
      });

      // textReveal returns the animation properties
      const textReveal = () => {
        return {
          opacity: 1,
          filter: "blur(0px)",
          letterSpacing: "0em",
          scale: 1,
          duration: 2,
          stagger: 0.08,
          ease: "expo.out",
        };
      };

      const textInitial = {
        opacity: 0,
        filter: "blur(20px)",
        letterSpacing: "1em",
        scale: 1.2,
      };

      // Layer 1
      tl.fromTo(".layer-1 .char", textInitial, textReveal())
        .to(".layer-1", { opacity: 0, y: -50, filter: "blur(10px)", duration: 1.5 }, "+=1")

      // Layer 2
      .fromTo(".layer-2", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=1")
      .fromTo(".layer-2 .char", textInitial, textReveal(), "-=0.5")
      .to(".layer-2", { opacity: 0, y: -50, filter: "blur(10px)", duration: 1.5 }, "+=1")

      // Layer 3
      .fromTo(".layer-3", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=1")
      .fromTo(".layer-3 .char", textInitial, textReveal(), "-=0.5");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // text প্যারামিটারের টাইপ string নির্ধারণ করা হলো
  const renderText = (text: string) => text.split("").map((char, i) => (
    <span key={i} className="char inline-block will-change-[filter,opacity,transform]">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={triggerRef} className="bg-[#0a0a0a] overflow-hidden">
      <section className="relative h-screen w-full flex items-center justify-center">
        
        {/* Layer 1 */}
        <div className="layer-1 absolute inset-0 flex items-center justify-center w-full h-full px-4">
          <div className="absolute left-[5%] top-[15%] w-[45%] md:w-[25%] aspect-3/4 opacity-30">
            <Image src="/zara14.webp" fill className="object-cover grayscale" alt="z1" />
          </div>
          <h2 className="text-[14vw] md:text-[12vw] font-[didot] text-white z-20 pointer-events-none text-center">
            {renderText("ZENITH")}
          </h2>
          <div className="absolute right-[5%] bottom-[15%] w-[40%] md:w-[22%] aspect-3/4 opacity-30">
            <Image src="/zara15.webp" fill className="object-cover grayscale" alt="z2" />
          </div>
        </div>

        {/* Layer 2 */}
        <div className="layer-2 absolute inset-0 opacity-0 flex items-center justify-center w-full h-full px-4">
          <div className="absolute left-[15%] bottom-[10%] w-[35%] md:w-[20%] aspect-4/5 overflow-hidden">
            <Image src="/zara13.webp" fill className="object-cover" alt="a1" />
          </div>
          <h2 className="text-[14vw] md:text-[12vw] font-[didot] text-zinc-300 z-20 pointer-events-none text-center">
            {renderText("AURORA")}
          </h2>
          <div className="absolute right-[10%] top-[10%] w-[40%] md:w-[25%] aspect-3/4 overflow-hidden">
            <Image src="/zara12.webp" fill className="object-cover" alt="a2" />
          </div>
        </div>

        {/* Layer 3 */}
        <div className="layer-3 absolute inset-0 opacity-0 flex items-center justify-center w-full h-full px-4">
          <div className="absolute left-[15%] bottom-[10%] w-[35%] md:w-[20%] aspect-4/5 overflow-hidden">
            <Image src="/zara11.webp" fill className="object-cover" alt="v1" />
          </div>
          <h2 className="text-[14vw] md:text-[12vw] font-[didot] text-zinc-300 z-20 pointer-events-none text-center">
            {renderText("VORTEX")}
          </h2>
          <div className="absolute right-[10%] top-[10%] w-[40%] md:w-[25%] aspect-3/4 overflow-hidden">
            <Image src="/zara12.webp" fill className="object-cover" alt="v2" />
          </div>
        </div>

      </section>
    </div>
  );
};

export default Paralax;