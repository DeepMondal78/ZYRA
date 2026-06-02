"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const mockDatabase: string[] = [
  "Blazers",
  "Linen Bags",
  "Linen Blazers",
  "Silk Dresses",
  "Evening Dresses",
  "Leather Bags",
  "Cotton Shirts"
];

interface SearchPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPage({ isOpen, onClose }: SearchPageProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "expo.out",
        onComplete: () => inputRef.current?.focus()
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 0.6,
        ease: "expo.in"
      });
      document.body.style.overflow = "auto";
      // 💡 useEffect-এর ভেতর থেকে সরাসরি স্টেট সেট করার লাইন দুটি সরিয়ে দেওয়া হয়েছে
    }
  }, [isOpen]);

  // 🛠️ ক্লোজ হওয়ার সময় স্টেট ক্লিয়ার করার জন্য নতুন হ্যান্ডলার ফাংশন
  const handleClose = () => {
    setSearchQuery("");
    setSuggestions([]);
    onClose(); // প্যারেন্ট কম্পোনেন্টের ক্লোজ ফাংশন কল হবে
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const filtered = mockDatabase.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-20000 bg-[#FBF3E4] -translate-y-full flex flex-col px-6 md:px-20 pt-10"
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-[10px] uppercase tracking-widest font-bold text-black">Search</span>
        
        {/* 🛠️ এখানে onClose-এর বদলে আমাদের নতুন handleClose ফাংশনটি দেওয়া হয়েছে */}
        <button onClick={handleClose} className="p-2 hover:rotate-90 transition-transform duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="mt-20 md:mt-32">
        <input 
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="ENTER SEARCH TERM"
          className="w-full bg-transparent border-b border-black/20 py-4 text-4xl md:text-7xl font-[didot] uppercase focus:outline-none placeholder:text-black/10 text-black"
        />
        
        {searchQuery.trim().length > 0 && (
          <div className="mt-8 flex flex-col gap-3">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <div 
                  key={index} 
                  className="text-lg md:text-xl font-light uppercase tracking-wide text-black/70 hover:text-black cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(item)}
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="text-xs uppercase tracking-widest text-black/30">No results found</div>
            )}
          </div>
        )}

        {searchQuery.trim().length === 0 && (
          <div className="mt-10 flex flex-wrap gap-6 text-[10px] uppercase tracking-widest text-black/40">
            <span className="text-black/20">Trending:</span>
            <button className="hover:text-black transition-colors" onClick={() => setSearchQuery("Blazers")}>Blazers</button>
            <button className="hover:text-black transition-colors" onClick={() => setSearchQuery("Linen")}>Linen</button>
            <button className="hover:text-black transition-colors" onClick={() => setSearchQuery("Dresses")}>Dresses</button>
            <button className="hover:text-black transition-colors" onClick={() => setSearchQuery("Bags")}>Bags</button>
          </div>
        )}
      </div>
    </div>
  );
}