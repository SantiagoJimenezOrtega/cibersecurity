import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export interface IntroSlide {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    body: string;
    highlight?: string;
}

interface IntroModalProps {
    slides: IntroSlide[];
    onStart: () => void;
    accentClass?: string;       // e.g. 'text-accent-primary'
    borderClass?: string;       // e.g. 'border-accent-primary-25'
    bgClass?: string;           // e.g. 'bg-accent-primary-5'
    buttonClass?: string;       // e.g. 'neon-button'
}

const IntroModal: React.FC<IntroModalProps> = ({
    slides,
    onStart,
    accentClass = 'text-accent-primary',
    borderClass = 'border-accent-primary-25',
    bgClass = 'bg-accent-primary-5',
    buttonClass = 'neon-button',
}) => {
    const [current, setCurrent] = useState(0);
    const isLast = current === slides.length - 1;
    const slide = slides[current];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(24px)' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`cyber-card w-full max-w-2xl p-0 overflow-hidden border ${borderClass}`}
            >
                {/* Header bar */}
                <div className={`flex items-center justify-between px-8 py-4 border-b ${bgClass}`}>
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${accentClass}`}>
                        <BookOpen size={14} />
                        Theory Brief — {current + 1} / {slides.length}
                    </div>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all ${
                                    i === current ? `w-4 h-1.5 ${bgClass} border ${borderClass}` : 'w-1.5 h-1.5 bg-white-10'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Slide content */}
                <div className="p-10 min-h-400">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <div className={`w-fit p-5 rounded-3xl ${bgClass} border ${borderClass} ${accentClass}`}>
                                {slide.icon}
                            </div>
                            <div>
                                <p className={`text-xs font-black uppercase tracking-widest mb-2 ${accentClass}`}>{slide.subtitle}</p>
                                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{slide.title}</h2>
                                <p className="text-text-secondary text-base leading-relaxed">{slide.body}</p>
                            </div>
                            {slide.highlight && (
                                <div className={`p-5 rounded-2xl ${bgClass} border ${borderClass}`}>
                                    <p className={`text-sm font-bold ${accentClass} leading-relaxed`}>
                                        💡 {slide.highlight}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer navigation */}
                <div className="px-10 py-6 border-t flex items-center justify-between gap-4">
                    <button
                        onClick={() => setCurrent(p => Math.max(0, p - 1))}
                        disabled={current === 0}
                        className="p-3 bg-bg-tertiary border rounded-xl text-text-muted hover:text-white transition-all disabled:opacity-20"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => {
                            if (isLast) onStart();
                            else setCurrent(p => p + 1);
                        }}
                        className={`flex-1 py-4 text-sm flex items-center justify-center gap-2 ${buttonClass}`}
                    >
                        {isLast ? 'START MISSION' : 'NEXT'} <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default IntroModal;
