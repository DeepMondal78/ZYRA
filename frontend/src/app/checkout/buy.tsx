"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useCart } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// স্ট্রাইপ লোড করা হচ্ছে
console.log("Stripe Key Test:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface CartItem {
  id?: string | number;
  name?: string;
  price: string | number;
  img?: string;
  quantity?: number;
  [key: string]: any;
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const { selectedProduct, closeCheckout, clearCart } = useCart() as {
    selectedProduct: CartItem | null;
    closeCheckout: () => void;
    clearCart: () => void;
  };

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // ইনপুট ভ্যালিডেশন
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Validation Error");
      setIsProcessing(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout-success`,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.zipCode,
              country: "IN" // UPI এর জন্য কান্ট্রি কোড প্রয়োজন হতে পারে
            }
          },
        },
        redirect: "if_required", // পেজেই সাকসেস মেসেজ দেখানোর জন্য
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Payment Failed");
        setIsProcessing(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();

        setTimeout(() => {
          gsap.fromTo(".success-msg",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }, 100);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100000] bg-[#FBF3E4] flex items-center justify-center p-6 text-center">
        <div className="success-msg max-w-sm">
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
          <h2 className="text-3xl font-bold text-black mb-2 uppercase tracking-tight font-[didot]">Order Confirmed</h2>
          <p className="text-gray-600 mb-8 font-medium text-sm">Thank you for shopping with ZYRA. Your payment has been safely authorized.</p>
          <button
            onClick={() => { setIsSuccess(false); closeCheckout(); }}
            className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs cursor-pointer hover:bg-black/80 transition-colors"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="checkout-container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16" onSubmit={handlePaymentSubmit}>
      {/* বাম পাশ: কাস্টমার ডিটেইলস ও বডি পেমেন্ট ইনপুট */}
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl text-black font-[didot] mb-8 uppercase tracking-tighter">Checkout</h1>
          <h3 className="text-gray-500 font-semibold mb-6 uppercase tracking-widest text-[11px]">Shipping Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
            </div>
            <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
            <input type="text" name="address" placeholder="Full Address" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
              <input type="text" name="zipCode" placeholder="ZIP Code" onChange={handleInputChange} className="w-full placeholder-gray-400 text-black p-4 bg-transparent border border-black/10 rounded-xl outline-none" required />
            </div>
          </div>
        </div>

        {/* 💳 স্ট্রাইপের লাইভ বডি ইনপুট (এখানে কার্ড এবং UPI দুটোই একসাথে ট্যাব হিসেবে শো করবে) */}
        <div>
          <h3 className="text-gray-500 font-semibold mb-6 uppercase tracking-widest text-[11px]">Secure Payment Gateway</h3>
          <div className="p-6 border border-black/10 rounded-2xl bg-white shadow-sm">
            {/* স্ট্রাইপ ড্যাশবোর্ডে UPI অন থাকলে এই একটা এলিমেন্টের ভেতরেই Card এবং UPI দুটো ট্যাবই দেখতে পাবে */}
            <PaymentElement />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-3 font-medium uppercase tracking-wider">⚠️ {errorMessage}</p>
          )}
        </div>
      </div>

      {/* ডান পাশ: অর্ডার সামারি */}
      <div className="lg:sticky lg:top-10 h-fit">
        <div className="bg-black text-white p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4 uppercase tracking-tighter font-[didot]">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-white/50 uppercase text-[10px] tracking-widest">
              <span>Selected Item Value</span>
              <span>${Number(selectedProduct.price).toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between text-xl font-bold font-[didot]">
              <span>Grand Total</span>
              <span>${Number(selectedProduct.price).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !stripe}
            className="w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest text-xs mt-10 disabled:opacity-50 cursor-pointer hover:bg-white/90 transition-all"
          >
            {isProcessing ? "Processing Authorization..." : `Authorize Payment`}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const { isCheckoutOpen, selectedProduct, closeCheckout, setIsCartOpen } = useCart() as {
    isCheckoutOpen: boolean;
    selectedProduct: CartItem | null;
    closeCheckout: () => void;
    setIsCartOpen: (open: boolean) => void;
  };

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (isCheckoutOpen) {
      gsap.fromTo(".checkout-container", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen || !selectedProduct) return;

    const fetchSecret = async () => {
      try {
        const priceAmount = typeof selectedProduct.price === "string"
          ? Number(selectedProduct.price.replace(/[^0-9.-]+/g, ""))
          : Number(selectedProduct.price);

        const response = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: priceAmount }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };

    fetchSecret();
  }, [isCheckoutOpen, selectedProduct]);

  if (!isCheckoutOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#FBF3E4] overflow-y-auto py-20 px-4 md:px-10">
      <button
        onClick={() => { closeCheckout(); setIsCartOpen(true); }}
        className="fixed top-10 text-black left-10 z-[100000] uppercase text-[10px] font-bold border-b border-black tracking-widest cursor-pointer hover:opacity-70"
      >
        ← Back to Bag
      </button>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
        
      ) : (
        <div className="w-full h-screen flex items-center justify-center font-[didot] text-black/40 text-sm tracking-widest uppercase animate-pulse">
          Establishing Secure ZYRA Gateway...
        </div>
      )}
      
    </div>
  );
}