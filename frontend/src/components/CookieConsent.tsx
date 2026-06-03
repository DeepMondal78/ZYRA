"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function CookieConsent() {
  const [show, setShow] = useState<boolean>(false);
  // Btn active state for dynamic hover effect
  const [activeBtn, setActiveBtn] = useState<"accept" | "reject">("accept");
  
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay showing the banner by 7 seconds after page load
    const timer = setTimeout(() => {
      setShow(true);
    }, 7000); 

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
      {/* Close Button */}
      <button
        onClick={closeBanner}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white rounded-full transition-all duration-300 group"
      >
        <span className="text-lg leading-none text-black group-hover:text-white">&times;</span>
      </button>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">
            ZYRA
          </div>
          <span className="font-bold tracking-tight text-black">Cookie Policy</span>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-gray-600">
          This website collects cookies to deliver better user experience and analyze our website traffic and performance; we never collect any personal data.
        </p>

        {/* Buttons with Dynamic Hover Color Swap effect */}
        <div className="flex gap-2 pt-2">
          
          {/* Accept All Button */}
          <button
            onClick={closeBanner}
            onMouseEnter={() => setActiveBtn("accept")} // হোভার করলে এটি ব্ল্যাক হবে
            className={`flex-1 px-4 py-2.5 text-[12px] font-semibold rounded-lg transition-all duration-300 border ${
              activeBtn === "accept"
                ? "bg-black text-white border-black" // অ্যাক্টিভ থাকলে সলিড ব্ল্যাক
                : "bg-white text-black border-gray-200 hover:bg-gray-50" // রিজেক্ট হোভারড হলে এটি হোয়াইট বর্ডার হবে
            }`}
          >
            Accept All
          </button>

          {/* Reject All Button */}
          <button
            onClick={closeBanner}
            onMouseEnter={() => setActiveBtn("reject")} // হোভার করলে এটি ব্ল্যাক হবে এবং Accept বাটন হোয়াইট হবে
            onMouseLeave={() => setActiveBtn("accept")} // মাউস সরালে আবার আগের মতো Accept বাটন ব্ল্যাক হয়ে যাবে
            className={`flex-1 px-4 py-2.5 text-[12px] font-semibold rounded-lg transition-all duration-300 border ${
              activeBtn === "reject"
                ? "bg-black text-white border-black" // হোভার করলে সলিড ব্ল্যাক হয়ে যাবে
                : "bg-white text-black border-gray-200 hover:bg-gray-50" // নরমালি হোয়াইট বর্ডারে থাকবে
            }`}
          >
            Reject All
          </button>

        </div>
      </div>
    </div>
  );
}