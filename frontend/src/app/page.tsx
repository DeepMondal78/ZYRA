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
    // 🌟 ১. ব্রাউজারের ডিফল্ট স্ক্রোল মেমোরি বন্ধ করা (যাতে আগের স্ক্রোল পজিশন ধরে না রাখে)
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    // 🌟 ২. পেজ একদম ফ্রেশ রিলোড বা ফার্স্ট টাইম লোড হলে শুরুতে (0,0) এ নিয়ে যাওয়া
    window.scrollTo(0, 0);
  }, []); // এই ডিপেন্ডেন্সি খালি থাকায় এটি শুধুমাত্র পেজ লোড/রিলোড হলেই ১ বার এক্সিকিউট হবে

  useEffect(() => {
    // লোডিং শেষ হওয়ার সাথে সাথে GSAP ScrollTrigger রিফ্রেশ করা
    if (!isLoading) {
      ScrollTrigger.refresh();
      // 🌟 ৩. সেফটি নেট: লোডার শেষ হওয়ার সাথে সাথে আরেকবার টপে স্ক্রোল নিশ্চিত করা (Lenis স্মুথনেসের জন্য)
      window.scrollTo(0, 0); 
    }
  }, [isLoading]);

  return (
    <main className="bg-white min-h-screen relative">
      
      {/* লোডারকে কন্ডিশনাল রিটার্ন না করে সরাসরি রাখা হলো */}
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}

      {/* 🧱 মূল DOM স্ট্রাকচার সবসময় প্রেজেন্ট থাকবে। */}
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Overlay />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <Buy />
        
        <div className="relative w-full overflow-hidden">
          <CookieConsent />
          <Cursor />
          <Navbar />
          <Hero isLoading={isLoading} />
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