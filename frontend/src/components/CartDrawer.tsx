"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useEffect, useRef } from "react";
import useLenis from "../hooks/useLenis";
import { ArrowLeft } from "lucide-react";

interface CartItem {
  img: string;
  name: string;
  price: number;
  [key: string]: any;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, totalPrice, openCheckout } = useCart() as {
        cart: CartItem[];
        removeFromCart: (index: number) => void;
        totalPrice: number;
        openCheckout: (item: CartItem) => void;
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    
    // 💡 এখানে 'as any' যুক্ত করা হয়েছে যাতে টাইপস্ক্রিপ্ট এরর না দেয়
    const lenis = useLenis() as any;

    const handleCheckout = (item: CartItem) => {
        if (typeof openCheckout === "function") {
            onClose();
            openCheckout(item); 
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (lenis) {
                lenis.resize();
                lenis.scrollTo(0, { immediate: true });
            }
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen, lenis]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className={`fixed inset-0 z-9999 bg-[#FBF3E4] transition-transform duration-700 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div ref={scrollRef} className="h-full w-full overflow-y-auto" data-lenis-prevent>
                <div className="max-w-350 mx-auto p-8 md:p-16 min-h-full flex flex-col">
                    <div className="flex justify-between items-center mb-16">
                        <button onClick={onClose} className="flex items-center gap-2 text-sm text-black uppercase tracking-widest hover:opacity-70">
                            <ArrowLeft size={18} /> Back
                        </button>
                        <h1 className="text-5xl text-black md:text-6xl font-[didot] tracking-tight">Your Bag</h1>
                        <span className="text-sm text-black uppercase">{cart.length} Items</span>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-20">
                            <p className="uppercase text-sm text-black/20 tracking-widest mb-6">Your bag is empty</p>
                            <button onClick={onClose} className="border border-black text-black/20 px-10 py-4 text-xs uppercase hover:bg-black hover:text-white transition-all">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                                {cart.map((item, index) => (
                                    <div key={index} className="group">
                                        <div className="relative aspect-3/4 overflow-hidden bg-white">
                                            <Image src={item.img} alt={item.name} fill priority className="object-cover transition duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 bg-white/90 backdrop-blur-sm text-center hidden md:block">
                                                <button onClick={() => handleCheckout(item)} className="text-[9px] text-gray-500 uppercase tracking-widest font-bold hover:text-black transition">
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={() => handleCheckout(item)} className="w-full mt-3 py-2 border border-black/10 text-[9px] uppercase tracking-widest md:hidden text-gray-500 active:bg-black active:text-white transition-colors">
                                            Buy Now
                                        </button>
                                        <div className="flex justify-between mt-4">
                                            <h3 className="text-[11px] text-black uppercase tracking-wide max-w-[70%]">{item.name}</h3>
                                            <span className="text-[11px] text-black">${item.price}</span>
                                        </div>
                                        <button onClick={() => removeFromCart(index)} className="text-[9px] uppercase text-red-500 mt-2 hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-24 pt-10 pb-10 border-t border-black/10">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-lg uppercase text-black tracking-wider">Total Cart Value</p>
                                    <span className="text-2xl text-orange-600 font-[didot]">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}