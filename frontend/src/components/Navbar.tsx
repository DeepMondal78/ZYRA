"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Search from "../components/Search";
import { PiShoppingBagLight } from "react-icons/pi";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import Login from "../components/Login"; 
import Help from "../components/Help"; 

// SplitText-এর প্রোপসের জন্য টাইপস্ক্রিপ্ট ইন্টারফেস
interface SplitTextProps {
  children: string;
}

const SplitText = ({ children }: SplitTextProps) => {
  return (
    <span className="relative overflow-hidden inline-block group cursor-pointer">
      <span className="flex">
        {children.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 0.02}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      <span className="absolute top-0 left-0 flex">
        {children.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 italic"
            style={{ transitionDelay: `${i * 0.02}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
};

interface CartContextType {
  cart: unknown[];
  cartCount: number;
  removeFromCart: (id: unknown) => void;
  totalPrice: number;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [showLogin, setShowLogin] = useState<boolean>(false); 
  const [showHelp, setShowHelp] = useState<boolean>(false); 

  const { cartCount } = useCart() as CartContextType;

  const images: string[] = ["/zara19.webp", "/zara12.webp", "/zara14.webp", "/zara15.webp", "/zara16.webp"];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, images.length]);

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isOpen || showLogin) { 
      document.body.style.overflow = "hidden";
    }

    if (isOpen) {
      gsap.to(".nav-link", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
      });
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else if (!showLogin) { 
      gsap.to(".nav-link", {
        y: 50,
        opacity: 0,
        duration: 0.5,
      });
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [isOpen, showLogin]);

  return (
    <header className="fixed top-0 w-full z-10000 p-8">
      <nav className="flex justify-between items-start">

        <div className="text-3xl font-[didot] text-black tracking-tighter select-none z-110">
          ZYRA
        </div>

        <div className="flex flex-col items-end gap-4 z-110">

          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`text-black transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <span className="text-[10px] uppercase tracking-widest border-b border-black">Search</span>
            </button>

            <div className="group cursor-pointer space-y-2" onClick={() => setIsOpen(!isOpen)}>
              <div className={`h-px bg-black transition-all duration-500 ${isOpen ? 'w-8 rotate-45 translate-y-1.25' : 'w-8'}`} />
              <div className={`h-px bg-black transition-all duration-500 ${isOpen ? 'w-8 -rotate-45 -translate-y-1.25' : 'w-5 ml-auto group-hover:w-8'}`} />
            </div>
          </div>

          <div className={`flex flex-col items-end gap-3 text-black text-[10px] uppercase tracking-widest transition-all duration-700 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1 hover:opacity-70 transition"
            >
              <PiShoppingBagLight className="text-xl" />
              <span>({cartCount})</span>
            </button>

            <button 
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false); 
              }}
              className="hover:opacity-70 transition border-b border-black w-fit"
            >
              Login
            </button>

            <button 
              onClick={() => {
                setShowHelp(true);
                setIsOpen(false); 
              }}
              className="hover:opacity-70 transition border-b border-black w-fit"
            >
              Help
            </button>
          </div>

        </div>

        <div className={`fixed inset-0 bg-white z-100 transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 h-full pt-40 px-8 md:px-20 overflow-y-auto pb-20">

            <div className="md:col-span-5 md:flex items-center justify-center relative">
              <div className="nav-link opacity-0 translate-y-20 relative w-full h-125 flex gap-3.5 items-center justify-center">
                <h1 className="absolute text-[12vw] font-[didot] text-black tracking-[0.1rem] z-10 select-none">ZYRA</h1>
                <div className="relative w-55 h-70 z-0 overflow-hidden shadow-2xl">
                  <Image src={images[currentImg]} alt="loop-model" fill className="w-full h-full object-cover transition-opacity duration-500" />
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex space-x-15 mt-12 md:mt-0 text-left md:pl-10">
              <div className="nav-link opacity-0 translate-y-10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-5">|01| New In</p>
                <ul className="space-y-3 text-[11px] uppercase tracking-widest font-medium text-black">
                  <li className="hover:line-through cursor-pointer">The New</li>
                  <li className="hover:line-through cursor-pointer">The Item</li>
                  <li className="hover:line-through cursor-pointer">Into the Process</li>
                </ul>
              </div>
              <div className="nav-link opacity-0 translate-y-10">
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 mb-5">|02| Collection</p>
                <ul className="space-y-3 text-[11px] uppercase tracking-widest font-medium text-black">
                  <li className="hover:line-through cursor-pointer">Dresses</li>
                  <li className="hover:line-through cursor-pointer">T-Shirts</li>
                  <li className="hover:line-through cursor-pointer">Jeans</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4 text-left">
              {['Woman', 'Man', 'Kids', 'Perfumes', 'Travel Mode'].map((item) => (
                <div key={item} className="overflow-hidden">
                  <a
                    href="#"
                    className="nav-link block text-4xl md:text-5xl text-black font-medium uppercase tracking-tighter translate-y-full opacity-0 transition-all"
                  >
                    <SplitText>{item}</SplitText>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showLogin && (
          <div className="fixed inset-0 z-20000 bg-white">
            <button 
              onClick={() => {
                setShowLogin(false);
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0px";
              }} 
              className="absolute top-8 right-8 z-21000 text-xs tracking-widest uppercase border-b border-black text-black hover:opacity-50"
            >
              CLOSE ✕
            </button>
            <Login />
          </div>
        )}

        {showHelp && (
          <div className="fixed inset-0 z-20000 bg-white">
            <button 
              onClick={() => {
                setShowHelp(false);
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0px";
              }}
              className="absolute top-8 right-8 z-21000 text-xs tracking-widest uppercase border-b border-black text-black hover:opacity-50"
            >
              CLOSE ✕
            </button>
            <Help />
          </div>
        )}

        <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </nav>
    </header>
  );
}