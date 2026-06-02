"use client";
import { useState, useEffect } from "react";
import Lenis from "../hooks/useLenis";
import Loader from "../components/Loader";
import Overlay from "../components/RevealOverlay";
import CookieConsent from "../components/CookieConsent";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import Hero from "../components/Hero";
import About from "../components/About";
import Collection from "../components/Collection";
import Buy from "../app/checkout/buy";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import Paralax from "../components/Parallax";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Featured from "../components/Featured";
import Lookbook from "../components/Lookbook";
import Brand from "../components/Brand";
import Footer from "../components/Footer";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const { isCartOpen, setIsCartOpen } = useCart();

  // Lenis গ্লোবালি রান করবে
  Lenis();

  useEffect(() => {
    // লোডিং শেষ হওয়ার সাথে সাথে GSAP ScrollTrigger রিফ্রেশ করা
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <main className="bg-white min-h-screen relative">
      
      {/* 🌟 লোডারকে কন্ডিশনাল রিটার্ন না করে সরাসরি রাখা হলো */}
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}

      {/* 🧱 মূল DOM স্ট্রাকচার সবসময় প্রেজেন্ট থাকবে। 
          শুধু ডাটা লোড হওয়ার আগ পর্যন্ত এটিকে pointer-events-none এবং invisible করে রাখা হয়েছে */}
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Overlay />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Buy />
        
        <div className="relative w-full overflow-hidden">
          <CookieConsent />
          <Cursor />
          <Navbar />
          <Hero />
          <About />
          <Collection />
          <Paralax />
          <Featured />
          <Lookbook />
          <Brand />
          <Footer />
        </div>
      </div>
    </main>
  );
}