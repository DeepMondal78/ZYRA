"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ScrollItem {
  id: number;
  title: string;
  img: string;
  subtitle: string;
}

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw", 
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top", 
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  const items: ScrollItem[] = [
    { id: 1, title: "Modernist", img: "/zara14.webp", subtitle: "Summer Collection" },
    { id: 2, title: "Minimal", img: "/zara13.webp", subtitle: "Winter 2026" },
    { id: 3, title: "The Artisan", img: "/zara12.webp", subtitle: "Handcrafted" },
    { id: 4, title: "Vortex", img: "/zara11.webp", subtitle: "Luxury Wear" },
  ];

  return (
    <section className="overflow-hidden bg-[#080808]">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="flex flex-row relative w-[400vw] h-screen items-center">
          
          {items.map((item) => (
            <div key={item.id} className="h-screen w-screen flex items-center justify-center p-10 relative">
              
              <div className="absolute top-[20%] left-[10%] opacity-10 pointer-events-none">
                <h2 className="text-[20vw] font-[didot] leading-none text-white uppercase italic">
                  {item.id.toString().padStart(2, '0')}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full max-w-6xl">
                
                <div className="relative w-full md:w-[45%] aspect-4/5 overflow-hidden group">
                  <Image 
                    src={item.img} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                    alt={item.title} 
                  />
                </div>

                <div className="w-full md:w-[50%] text-white">
                  <p className="text-zinc-500 uppercase tracking-[0.3em] mb-4 text-sm font-mono">
                    {item.subtitle}
                  </p>
                  <h3 className="text-6xl md:text-8xl font-[didot] leading-tight mb-8">
                    {item.title}
                  </h3>
                  <div className="w-20 h-px bg-white/30 mb-8"></div>
                  <button className="text-xs uppercase tracking-widest border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                    Discover More
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;