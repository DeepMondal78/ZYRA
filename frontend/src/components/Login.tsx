"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Login: React.FC = () => {
    // Modes Available: 'login' | 'forgot' | 'register'
    const [mode, setMode] = useState<'login' | 'forgot' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Password Visibility States (Show / Hide)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [resetSuccess, setResetSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'forgot') {
            console.log("Trigger Password Reset Pipeline for:", email);
            setResetSuccess(true);
        } else if (mode === 'register') {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log("Registering user:", { email, password });
        } else {
            console.log("Logging in user:", { email, password });

        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col md:flex-row font-sans text-[#111111]">

            {/* Left Branding Panel (Editorial Vibe) */}
            <div className="hidden md:flex md:w-1/2 bg-[#111111] text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Background Pattern effect */}
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

            {/* Right Login/Register Form Panel */}
            <div className="flex-1 flex flex-col justify-center px-6 py-20 md:px-24 bg-white">

                {/* Mobile Header Only */}
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

                            {mode === 'forgot' && resetSuccess ? (
                                /* Forgot Password Success Response */
                                <div className="space-y-6">
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        An email has been dispatched containing a link to securely restructure your credential layer. Please monitor your network inbox.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => { setMode('login'); setResetSuccess(false); }}
                                        className="text-xs tracking-widest font-medium border-b border-[#111111] pb-1 hover:opacity-60 transition-opacity uppercase"
                                    >
                                        Return to Login Workspace
                                    </button>
                                </div>
                            ) : (
                                /* Core Form Structure */
                                <form onSubmit={handleSubmit} className="space-y-8">

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

                                    {/* Input Password (Hidden natively on forgot state) */}
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

                                            {/* Password Eye Control Text Button */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-3.5 text-[10px] font-mono tracking-widest text-gray-400 hover:text-black transition-colors duration-200"
                                            >
                                                {showPassword ? "HIDE" : "VIEW"}
                                            </button>

                                            {mode === 'login' && (
                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setMode('forgot')}
                                                        className="text-[11px] tracking-wider text-gray-400 hover:text-[#111111] transition-colors duration-200 uppercase"
                                                    >
                                                        Forgot password?
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Input Confirm Password (Only Appears in Register Mode) */}
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

                                            {/* Confirm Field Eye Control Text Button */}
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-0 top-3.5 text-[10px] font-mono tracking-widest text-gray-400 hover:text-black transition-colors duration-200"
                                            >
                                                {showConfirmPassword ? "HIDE" : "VIEW"}
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Action Button */}
                                    <motion.button
                                        whileHover={{ backgroundColor: '#222222' }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        className="w-full bg-[#111111] text-white py-4 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-200 mt-4 shadow-sm hover:shadow-md"
                                    >
                                        {mode === 'login' && "CONTINUE"}
                                        {mode === 'register' && "REGISTER PROFILE"}
                                        {mode === 'forgot' && "REQUEST RECOVERY"}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Alternative Dynamic Toggler footer footprint */}
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
                            }}
                            className="text-xs tracking-widest font-medium border-b border-[#111111] pb-1 hover:opacity-60 transition-opacity uppercase"
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