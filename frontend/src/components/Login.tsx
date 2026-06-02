"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'forgot' | 'register'>('login');
    // 🌟 নতুন স্টেটের নাম যোগ করা হলো
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [resetSuccess, setResetSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://zyra-xlpl.onrender.com";
        // const baseUrl = "http://localhost:5000";

        if (mode === 'forgot') {
            try {
                const response = await fetch(`${baseUrl}/api/auth/forgot-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                setResetSuccess(true);
            } catch (err: any) {
                setErrorMessage("Bypass transmission failed. Please try again.");
            } finally {
                setLoading(false);
            }
        } 
        
        else if (mode === 'register') {
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match!");
                setLoading(false);
                return;
            }

            try {
                console.log("Registering user:", { name, email, password });
                // 🌟 রিকোয়েস্ট বডিতে এখন name ও পাঠানো হচ্ছে
                const response = await fetch(`${baseUrl}/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }), 
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Registration node initialization failed.");
                }

                alert("Account created successfully! Please log in.");
                // রেজিস্টার সফল হলে ফিল্ডগুলো খালি করে লগইনে নিয়ে যাবে
                setName('');
                setMode('login');
            } catch (err: any) {
                setErrorMessage(err.message || "Registration failed.");
            } finally {
                setLoading(false);
            }
        } 
        
        else {
            try {
                console.log("Logging in user:", { email, password });
                
                const response = await fetch(`${baseUrl}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const htmlErrorText = await response.text();
                    console.error("🚨 BACKEND CRASHED (Login)! Actual Error HTML Below:");
                    console.log(htmlErrorText);
                    throw new Error("Backend server crashed. Please inspect browser Console tabs!");
                }

                const data = await response.json();
                console.log("🔥 Backend Response Data:", data); // 👈 ব্যাকএন্ড কী পাঠাচ্ছে তা কনসোলে দেখার জন্য

                if (!response.ok) {
                    throw new Error(data.message || "Invalid credential synchronization.");
                }

                // 🌟 ব্যাকএন্ড থেকে টোকেন আসছে কিনা নিশ্চিত হয়ে সেভ করা
                const token = data.token || data.accessToken; 
                const user = data.user || data.userData;

                if (token) {
                    localStorage.setItem("zyra_token", token);
                } else {
                    console.warn("⚠️ Warning: No token received from backend!");
                }

                if (user) {
                    localStorage.setItem("zyra_user", JSON.stringify(user));
                }

                // 🌟 ইউজারকে সফলতার মেসেজ দেখানো
                alert("Login Successful! Redirecting...");

                // 🌟 জোরপূর্বক হোম পেজে পাঠানো এবং উইন্ডো রিলোড করা যাতে টোকেন ঠিকঠাক ডিটেক্ট হয়
                window.location.href = "/"; 
                
            } catch (err: any) {
                setErrorMessage(err.message || "Authentication layer response error.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col md:flex-row font-sans text-[#111111]">

            {/* Left Branding Panel */}
            <div className="hidden md:flex md:w-1/2 bg-[#111111] text-white flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size:[16px_16px]"></div>
                <div className="z-10">
                    <span className="text-xs tracking-[0.4em] uppercase opacity-60 font-[didot]">Z Y R A / COLLECTION</span>
                </div>
                <div className="z-10 my-auto max-w-sm">
                    <motion.h1
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-5xl tracking-tight leading-tight uppercase font-[didot] whitespace-pre-line"
                    >
                        {mode === 'forgot' ? "Recover\nYour\nAccess Key." : "A Minimalist\nApproach to\nModern Style."}
                    </motion.h1>
                    <p className="mt-4 text-sm opacity-50 font-light leading-relaxed tracking-wide">
                        {mode === 'forgot'
                            ? "Input your registered identity criteria to request a temporary encryption bypass parameter."
                            : "Access your curated personal space, track orders, and experience seamless avant-garde fashion."}
                    </p>
                </div>
                <div className="z-10 flex justify-between text-[11px] opacity-40 tracking-widest uppercase">
                    <span>© 2026 ZYRA STUDIO</span>
                    <span>PRIVACY / TERMS</span>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col justify-center px-6 py-20 md:px-24 bg-white">
                <div className="md:hidden mb-12">
                    <h1 className="text-3xl tracking-[0.3em] uppercase font-[didot]">ZYRA</h1>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode + (resetSuccess ? "-success" : "-form")}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="mb-10">
                                <h2 className="text-2xl font-light tracking-widest uppercase">
                                    {mode === 'login' && "LOG IN"}
                                    {mode === 'register' && "REGISTER"}
                                    {mode === 'forgot' && "FORGOT PASSWORD"}
                                </h2>
                                <p className="text-xs text-gray-400 mt-1 tracking-wide">
                                    {mode === 'login' && "Enter your credentials to unlock the archive."}
                                    {mode === 'register' && "Create an authorized deployment node to synchronize parameters."}
                                    {mode === 'forgot' && "Submit your transmission address to claim password reset."}
                                </p>
                            </div>

                            {errorMessage && (
                                <p className="text-xs font-mono text-red-500 bg-red-50 p-3 rounded-lg border border-red-200 mb-6 tracking-wide">
                                    ⚠️ {errorMessage}
                                </p>
                            )}

                            {mode === 'forgot' && resetSuccess ? (
                                <div className="space-y-6">
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        An email has been dispatched containing a link to securely restructure your credential layer. Please monitor your network inbox.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => { setMode('login'); setResetSuccess(false); }}
                                        className="text-xs tracking-widest font-medium border-b border-[#111111] pb-1 hover:opacity-60 transition-opacity uppercase cursor-pointer"
                                    >
                                        Return to Login Workspace
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">

                                    {/* 🌟 নতুন ইনপুট: NAME (এটি শুধুমাত্র REGISTER মোডে অ্যানিমেশন সহ দেখা যাবে) */}
                                    {mode === 'register' && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="relative group"
                                        >
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={mode === 'register'}
                                                placeholder=" "
                                                className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#111111] transition-colors duration-300 placeholder-transparent peer text-[#111111]"
                                            />
                                            <label className="absolute left-0 top-3 text-xs tracking-widest text-gray-400 uppercase transition-all duration-300 transform -translate-y-6 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-95 peer-focus:text-[#111111]">
                                                FULL NAME
                                            </label>
                                        </motion.div>
                                    )}

                                    {/* Input Email */}
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder=" "
                                            className="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-[#111111] transition-colors duration-300 placeholder-transparent peer text-[#111111]"
                                        />
                                        <label className="absolute left-0 top-3 text-xs tracking-widest text-gray-400 uppercase transition-all duration-300 transform -translate-y-6 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-95 peer-focus:text-[#111111]">
                                            E-MAIL
                                        </label>
                                    </div>

                                    {/* Input Password */}
                                    {mode !== 'forgot' && (
                                        <div className="relative group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                placeholder=" "
                                                className="w-full bg-transparent border-b border-gray-200 py-3 pr-16 text-sm focus:outline-none focus:border-[#111111] transition-colors duration-300 placeholder-transparent peer text-[#111111]"
                                            />
                                            <label className="absolute left-0 top-3 text-xs tracking-widest text-gray-400 uppercase transition-all duration-300 transform -translate-y-6 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-95 peer-focus:text-[#111111]">
                                                PASSWORD
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-3.5 text-[10px] font-mono tracking-widest text-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
                                            >
                                                {showPassword ? "HIDE" : "VIEW"}
                                            </button>

                                            {mode === 'login' && (
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setMode('forgot'); setErrorMessage(null); }}
                                                        className="text-[11px] tracking-wider text-gray-400 hover:text-[#111111] transition-colors duration-200 uppercase cursor-pointer"
                                                    >
                                                        Forgot password?
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Input Confirm Password */}
                                    {mode === 'register' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative group"
                                        >
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                placeholder=" "
                                                className="w-full bg-transparent border-b border-gray-200 py-3 pr-16 text-sm focus:outline-none focus:border-[#111111] transition-colors duration-300 placeholder-transparent peer text-[#111111]"
                                            />
                                            <label className="absolute left-0 top-3 text-xs tracking-widest text-gray-400 uppercase transition-all duration-300 transform -translate-y-6 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-95 peer-focus:text-[#111111]">
                                                CONFIRM PASSWORD
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-0 top-3.5 text-[10px] font-mono tracking-widest text-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
                                            >
                                                {showConfirmPassword ? "HIDE" : "VIEW"}
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Action Button */}
                                    <motion.button
                                        whileHover={!loading ? { backgroundColor: '#222222' } : {}}
                                        whileTap={!loading ? { scale: 0.99 } : {}}
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-[#111111] text-white py-4 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-200 mt-4 shadow-sm hover:shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        {loading ? "PROCESSING..." : (
                                            <>
                                                {mode === 'login' && "CONTINUE"}
                                                {mode === 'register' && "REGISTER PROFILE"}
                                                {mode === 'forgot' && "REQUEST RECOVERY"}
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Footprint Toggler */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <h4 className="text-xs tracking-widest text-gray-400 uppercase">
                                {mode === 'login' ? "NEED AN ACCOUNT?" : "ALREADY REGISTERED?"}
                            </h4>
                            <p className="text-xs text-gray-500 font-light mt-1">
                                {mode === 'login' ? "Join to track and manage your orders dynamically." : "Re-route back to system authorization panel."}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (mode === 'login') setMode('register');
                                else setMode('login');
                                setResetSuccess(false);
                                setErrorMessage(null);
                            }}
                            className="text-xs tracking-widest font-medium border-b border-[#111111] pb-1 hover:opacity-60 transition-opacity uppercase cursor-pointer"
                        >
                            {mode === 'login' ? "REGISTER" : "LOG IN"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;