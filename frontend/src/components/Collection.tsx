"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import useLenis from "../hooks/useLenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  _id: string;      
  name: string;
  price: number;    
  image: string;    
  description?: string;
}

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🌟 Context থেকে পুরো cart অ্যারেটি নিয়ে আসা হলো চেক করার জন্য
  const { addToCart, cart } = useCart() as { 
    addToCart: (product: any) => void; 
    cart: any[]; 
  };
  
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  
  // জাস্ট ক্লিক করার মুহূর্তের ইনস্ট্যান্ট ফিডব্যাকের জন্য
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  
  const lenis = useLenis() as { resize?: () => void } | undefined;

  // ব্যাকএন্ড থেকে ডাটা আনা
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setDbProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from ZYRA backend:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lenis Resize
  useEffect(() => {
    if (loading || dbProducts.length === 0) return;
    
    if (visibleCount > 8) {
      ScrollTrigger.refresh();
      if (lenis?.resize) lenis.resize();

      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
        if (lenis?.resize) lenis.resize();
        window.dispatchEvent(new Event('resize')); 
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [visibleCount, lenis, dbProducts, loading]);

  // GSAP Animation
  useEffect(() => {
    if (loading || dbProducts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 90%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [visibleCount, dbProducts, loading]);

  const showMoreProducts = () => {
    setVisibleCount(dbProducts.length);
    document.body.style.height = 'auto';
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FBF3E4] pt-24 md:pt-32 pb-56 px-4 md:px-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 border-b border-black/10 pb-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-[didot] tracking-tight text-black uppercase">View All</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] mt-2 text-black/50">Summer Collection 2026</p>
        </div>

        <div className="flex justify-between md:justify-end w-full md:w-auto gap-8 mt-8 md:mt-0 text-[10px] uppercase tracking-widest">
          <div className="flex gap-8">
            <button className="hover:underline underline-offset-4 cursor-pointer">Filter</button>
            <button className="hover:underline underline-offset-4 cursor-pointer">Sort By</button>
          </div>
          <span className="text-black/30">{loading ? "..." : dbProducts.length} Products</span>
        </div>
      </div>

      {/* Product Grid বা Loader */}
      {loading ? (
        <div className="w-full py-32 flex justify-center items-center font-[didot] text-xl tracking-widest uppercase text-black/40 animate-pulse">
          Loading ZYRA Collection...
        </div>
      ) : (
        <div className="product-grid grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
          {dbProducts.slice(0, visibleCount).map((product, index) => {
            
            // 🌟 ম্যাজিক চেক: এই প্রোডাক্টটি অলরেডি কার্ট স্টেটের ভেতর আছে কিনা
            const isAlreadyInCart = cart.some((item) => item.id === product._id);

            // বাটনে কী টেক্সট শো করবে তার ডাইনামিক লজিক
            let buttonText = "+ Add to Cart";
            if (clickedProductId === product._id) {
              buttonText = "✓ Added to Cart";
            } else if (isAlreadyInCart) {
              buttonText = "Already in Cart";
            }

            return (
              <div key={product._id} className="product-card group relative cursor-pointer">
                <div className="relative aspect-3/4 w-full overflow-hidden bg-white/30">
                  <Image
                    src={product.image} 
                    alt={product.name}
                    fill
                    priority={index <= 3}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* 💻 Desktop Hover Button */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm text-center hidden md:block z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAlreadyInCart) return; // অলরেডি থাকলে নতুন করে আর ক্লিক লজিক কাজ করবে না
                        
                        addToCart({ id: product._id, name: product.name, price: String(product.price), img: product.image });
                        
                        // ইনস্ট্যান্ট "Added to Cart" অ্যানিমেশন স্টেট
                        setClickedProductId(product._id);
                        setTimeout(() => {
                          setClickedProductId(null);
                        }, 1200);
                      }}
                      className={`w-full text-[10px] uppercase tracking-widest font-bold transition py-2 cursor-pointer 
                        ${isAlreadyInCart ? "text-amber-700/70 font-medium cursor-not-allowed" : "text-gray-600 hover:text-black"} 
                        ${clickedProductId === product._id ? "text-emerald-600" : ""}`}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-start">
                  <div className="max-w-[80%]">
                    <h3 className="text-[11px] md:text-[13px] uppercase tracking-wider text-black leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[9px] text-black/40 mt-1 uppercase">
                      {isAlreadyInCart ? "In Your Bag" : "New Arrival"}
                    </p>
                  </div>
                  <span className="text-[11px] md:text-[13px] font-medium text-black">${product.price}</span>
                </div>

                {/* 📱 Mobile Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAlreadyInCart) return;
                    
                    addToCart({ id: product._id, name: product.name, price: String(product.price), img: product.image });
                    
                    setClickedProductId(product._id);
                    setTimeout(() => {
                      setClickedProductId(null);
                    }, 1200);
                  }}
                  className={`w-full mt-3 py-3 border text-[9px] uppercase tracking-widest md:hidden transition-colors cursor-pointer
                    ${isAlreadyInCart 
                      ? "border-amber-600/20 text-amber-700/70 bg-amber-500/5 cursor-not-allowed" 
                      : "border-black/10 text-gray-500 active:bg-black active:text-white"
                    }
                    ${clickedProductId === product._id ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/5" : ""}`}
                >
                  {clickedProductId === product._id ? "✓ Added" : isAlreadyInCart ? "Already in Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Section */}
      {!loading && visibleCount < dbProducts.length && (
        <div className="mt-32 flex justify-center pb-20">
          <button
            onClick={showMoreProducts}
            className="group relative overflow-hidden border border-black px-12 py-4 cursor-pointer"
          >
            <span className="relative z-10 text-[11px] uppercase tracking-widest text-gray-500 group-hover:text-white group-active:text-white transition-colors duration-500">
              Load More
            </span>
            <div className="absolute inset-0 z-0 translate-y-full bg-black transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      )}
    </section>
  );
}