"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function CookieConsent() {
  const [show, setShow] = useState<boolean>(false);
  
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
    }
  }, [show]);

  const closeBanner = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in",
        onComplete: () => setShow(false),
      });
    }
  };

  if (!show) return null;

  return (
    <div
      ref={bannerRef}
      style={{ zIndex: 999999 }} 
      className="fixed bottom-6 right-6 max-w-87.5 md:max-w-100 w-[90%] bg-white border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 rounded-2xl"
    >
      
      <button
        onClick={closeBanner}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-500 hover:bg-black hover:text-white rounded-full transition-all duration-300 group"
      >
        <span className="text-lg leading-none">&times;</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs">
            ZYRA
          </div>
          <span className="font-bold tracking-tight text-black">Cookie Policy</span>
        </div>

        <p className="text-[13px] leading-relaxed text-gray-600">
          This website collects cookies to deliver better user experience and analyze our website traffic and performance; we never collect any personal data.
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={closeBanner}
            className="flex-1 px-4 py-2.5 bg-black text-white text-[12px] font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={closeBanner}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-black text-[12px] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
}