"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// window অবজেক্টে কাস্টম mouseX এবং mouseY এর জন্য টাইপ ডিফাইন করা হলো
declare global {
  interface Window {
    mouseX?: number;
    mouseY?: number;
  }
}

export default function Cursor() {
  // HTML এলিমেন্টের সঠিক Ref টাইপ নির্ধারণ করা হলো
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.4, ease: "power3" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.4, ease: "power3" });
    const xOutline = gsap.quickTo(outlineRef.current, "x", { duration: 0.8, ease: "power3" });
    const yOutline = gsap.quickTo(outlineRef.current, "y", { duration: 0.8, ease: "power3" });

    const updateCursor = (e: { target: EventTarget | null; clientX?: number; clientY?: number }) => {
      
      const x = e.clientX || (window.mouseX || 0);
      const y = e.clientY || (window.mouseY || 0);
      
      xDot(x);
      yDot(y);
      xOutline(x);
      yOutline(y);

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isHoverable = target.closest("button, a, .cursor-pointer, .menu-item");
      const isImage = target.tagName.toLowerCase() === 'img';
      const isInsideButton = target.closest('button, a');

      if (isHoverable && (!isImage || isInsideButton)) {
        gsap.to(dotRef.current, { scale: 4, duration: 0.3, overwrite: "auto" });
        gsap.to(outlineRef.current, { scale: 1.5, opacity: 0.5, duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(dotRef.current, { scale: 1, duration: 0.3, overwrite: "auto" });
        gsap.to(outlineRef.current, { scale: 1, opacity: 1, duration: 0.3, overwrite: "auto" });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
      updateCursor(e);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const observer = new MutationObserver(() => {
      const x = typeof window.mouseX === 'number' && isFinite(window.mouseX) ? window.mouseX : 0;
      const y = typeof window.mouseY === 'number' && isFinite(window.mouseY) ? window.mouseY : 0;

      const currentTarget = document.elementFromPoint(x, y);
      
      if (currentTarget) {
        updateCursor({ 
          target: currentTarget, 
          clientX: x, 
          clientY: y 
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-999999 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-999998 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}