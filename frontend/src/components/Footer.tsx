"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo(
            ".footer-content",
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <footer
            ref={containerRef}
            className="relative bg-white text-black min-h-screen flex flex-col justify-between overflow-hidden"
        >

            <div className="footer-content w-full px-6 md:px-12 pt-24 pb-12 flex flex-col justify-between h-full grow">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div className="max-w-2xl">
                        <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 font-mono">
                            Have a project in mind?
                        </h4>
                        <h2 className="text-[12vw] md:text-[8vw] font-[didot] leading-[0.9] uppercase pointer-events-none">
                            Let&apos;s <br /> Create <span className="italic font-serif text-zinc-400">Magic</span>
                        </h2>
                    </div>

                    <button
                        className="group relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border border-black/30 overflow-hidden bg-transparent transition-all duration-500 active:scale-95 touch-manipulation outline-none"
                    >
                        <span className="z-10 text-sm uppercase tracking-[0.2em] flex items-center gap-1 font-semibold text-black group-hover:text-white transition-colors duration-500 ease-out pointer-events-none">
                            Connect
                            <ArrowUpRight
                                size={18}
                                className="transform transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 fixed-icon"
                            />
                            
                        </span>

                        <div className="absolute inset-0 bg-black translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs uppercase text-zinc-400 font-bold">Socials</span>
                        {['Instagram', 'LinkedIn', 'Twitter', 'Github'].map((link) => (
                            <a key={link} href="#" className="text-lg hover:italic transition-all w-fit">{link}</a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-xs uppercase text-zinc-400 font-bold">Menu</span>
                        {['Home', 'Collections', 'About', 'Contact'].map((item) => (
                            <a key={item} href="#" className="text-lg hover:italic transition-all w-fit">{item}</a>
                        ))}
                    </div>
                    <div className="col-span-2 flex flex-col justify-end md:items-end">
                        <p className="text-sm font-mono text-zinc-500 text-left md:text-right">
                            © 2026 ZYRA EDITIONS.<br />
                            ZYRA — ESSENTIALS FOR THE MODERN INDIVIDUAL.
                        </p>
                    </div>
                </div>

                <div className="mt-20 border-t border-black/10 pt-10 overflow-hidden">
                    <h1 className="text-[32vw] font-[didot] leading-none text-black text-center -mb-[5vw] select-none">
                        ZYRA
                    </h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer;