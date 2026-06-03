"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const supportCards = [
    {
        id: "pipeline",
        number: "01",
        title: "ORDER PIPELINE",
        subtitle: "DISPATCH & TRACKING STATUS",
        desc: "Once your order profile is authenticated, a unique tracking matrix is generated and transmitted via encrypted network node. Monitor your system transit dynamically in real-time.",
        extra: "Standard Processing Window: 24 - 48 Hours. Global Node Delivery: 5 - 7 Business Cycles."
    },
    {
        id: "returns",
        number: "02",
        title: "RETURNS / CREDIT",
        subtitle: "RETROACTIVE EXCHANGE SYSTEM",
        desc: "We maintain a rigorous 14-day allocation window for structural returns. Items must survive in original, unaltered parameters with all security tags fully intact.",
        extra: "Warning: Archive drops and custom tailored capsules are eligible for system store credit conversion only."
    },
    {
        id: "terminal",
        number: "03",
        title: "SUPPORT DESK",
        subtitle: "DIRECT DATA TRANSMISSION",
        desc: "Can't resolve your parameters manually? Submit a secure transmission packet directly to our central support registry panel.",
        extra: "Response Matrix Duration: Under 24 standard hours."
    }
];

export default function AvantGardeHelp() {
    const [expandedId, setExpandedId] = useState<string | null>("pipeline");
    const [ticketSubmitted, setTicketSubmitted] = useState(false);

    return (

        <div className="w-full h-screen bg-[#F9F9F9] text-[#111111] font-sans pt-24 pb-8 px-6 md:px-16 flex flex-col justify-between overflow-hidden select-none">

            {/* Light header */}
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                <div>
                    <span className="text-[9px] tracking-[0.6em] text-gray-400 uppercase font-mono block mb-1">
                        ZYRA SYSTEM INFRASTRUCTURE
                    </span>
                    <h1 className="text-2xl md:text-3xl font-light font-[didot] uppercase tracking-[0.15em] text-[#111111]">
                        ASSISTANCE CORE
                    </h1>
                </div>
                <span className="hidden md:inline text-[10px] font-mono text-gray-400 tracking-widest">
                    STATUS: OPERATIONAL [2026]
                </span>
            </div>

            {/* Cinematic paralax */}
            <div className="flex-1 flex flex-col md:flex-row gap-4 my-8 h-full max-h-[65vh] items-stretch">
                {supportCards.map((card) => {
                    const isExpanded = expandedId === card.id;

                    return (
                        <motion.div
                            key={card.id}
                            layout /* layout size changing animation  */
                            onClick={() => setExpandedId(card.id)}
                            className={`relative p-6 md:p-10 flex flex-col justify-between cursor-pointer border transition-colors duration-500 rounded-xs overflow-hidden ${isExpanded
                                    ? 'bg-white border-gray-900 flex-[3.5]'
                                    : 'bg-white/40 border-gray-200/80 hover:bg-white hover:border-gray-400 flex-[0.6] md:flex-[0.5]'
                                }`}
                            /* Ultar smooth animetion curve*/
                            transition={{ type: "spring", stiffness: 180, damping: 26 }}
                        >
                            <div className="absolute right-4 top-2 text-[7rem] md:text-[10rem] font-serif font-black text-gray-100/70 pointer-events-none select-none">
                                {card.number}
                            </div>

                            {/* Card top title */}
                            <div className="relative z-10 flex items-center justify-between">
                                <div className={`${!isExpanded && 'md:rotate-90 md:origin-left md:absolute md:top-4 md:left-8 md:whitespace-nowrap'}`}>
                                    <span className="text-[10px] font-mono tracking-widest text-gray-400 block mb-1">
                                        {card.number}
                                    </span>
                                    <h2 className={`text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${isExpanded ? 'text-[#111111]' : 'text-gray-500'}`}>
                                        {card.title}
                                    </h2>
                                </div>
                                {isExpanded && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-1.5 h-1.5 bg-[#111111] rounded-full hidden md:block"
                                    />
                                )}
                            </div>

                            {/* Under card content (Fade-up Motion) */}
                            <div className="relative z-10 max-w-xl">
                                <AnimatePresence mode="wait">
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.35, delay: 0.15 }}
                                            className="space-y-4"
                                        >
                                            <span className="text-[10px] font-mono text-gray-400 tracking-wider block uppercase">
                                                {card.subtitle}
                                            </span>

                                            {card.id === 'terminal' ? (
                                                ticketSubmitted ? (
                                                    <p className="text-xs tracking-wide text-emerald-600 leading-relaxed uppercase font-medium">
                                                        ✓ SYSTEM TRANSMISSION COMPLETELY SECURE. MONITOR YOUR EMAIL PORTAL.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-3 pt-2">
                                                        <p className="text-xs font-light tracking-wide text-gray-600 leading-relaxed uppercase">
                                                            {card.desc}
                                                        </p>
                                                        <form
                                                            onSubmit={(e) => { e.preventDefault(); setTicketSubmitted(true); }}
                                                            className="flex flex-col gap-2 pt-2"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <input
                                                                type="email"
                                                                required
                                                                placeholder="ENTER E-MAIL MATRIX"
                                                                className="bg-[#F9F9F9] border border-gray-200 px-3 py-2.5 text-xs font-mono tracking-widest text-[#111111] focus:outline-none focus:border-black placeholder-gray-300 transition-colors"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="bg-[#111111] text-white text-[9px] font-bold tracking-[0.3em] py-3 uppercase hover:bg-gray-800 transition-colors"
                                                            >
                                                                LAUNCH PACKET →
                                                            </button>
                                                        </form>
                                                    </div>
                                                )
                                            ) : (
                                                <>
                                                    <p className="text-xs font-light tracking-wide text-gray-600 leading-relaxed uppercase">
                                                        {card.desc}
                                                    </p>
                                                    <p className="text-[11px] font-mono text-gray-400 leading-normal uppercase pt-2 border-t border-gray-100">
                                                        {card.extra}
                                                    </p>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom action buttons */}
                            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-gray-400 tracking-widest">
                                <span className={`${isExpanded ? 'text-[#111111]' : 'text-gray-400'}`}>[ OPEN PARAMETER ]</span>
                                {!isExpanded && <span className="text-gray-400 group-hover:text-black">EXPAND +</span>}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 flex justify-between text-[9px] text-gray-400 tracking-widest uppercase font-mono">
                <span>HQ // CONTEXT CORP GLOBAL</span>
                <span>NO-SCROLL WORKSPACE V2</span>
            </div>

        </div>
    );
}