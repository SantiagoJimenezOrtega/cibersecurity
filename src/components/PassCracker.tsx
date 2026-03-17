import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Lock, RotateCcw, Zap, HelpCircle, ArrowRight, Trophy, Download, Terminal as TerminalIcon, Key, User, Hash, Clock, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const PASS_INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <Key size={40} />,
        subtitle: 'The #1 attack vector',
        title: 'Passwords Are the Weakest Link',
        body: '81% of data breaches involve weak or stolen passwords. Attackers use automated tools to try thousands of combinations per second — a technique called brute force. Understanding it is the first step to stopping it.',
        highlight: 'A 4-digit PIN has only 10,000 possible combinations. A modern computer can crack it in under a millisecond.',
    },
    {
        icon: <Hash size={40} />,
        subtitle: 'Attack types you\'ll practice',
        title: 'Not All Cracks Are Equal',
        body: 'This lab teaches 4 attack methodologies: Manual brute force (try everything), Heat sensor (proximity feedback), Timing attack (race the system clock), Pattern recognition (exploit predictable sequences), and Dictionary attack (common passwords list).',
        highlight: 'Each technique exploits a different vulnerability. Defenders need to understand all of them.',
    },
    {
        icon: <Clock size={40} />,
        subtitle: 'Timing attacks — a real threat',
        title: 'The System Tells You the Answer',
        body: 'In a timing attack, the system responds slightly faster when it matches a digit. This microscopic difference (nanoseconds) can be measured and used to crack passwords digit by digit. It\'s a real cryptographic vulnerability.',
        highlight: 'Real timing attacks were used to crack early SSL implementations and PS3 encryption. They are not theoretical.',
    },
    {
        icon: <Database size={40} />,
        subtitle: 'Building better defenses',
        title: 'What This Teaches You',
        body: 'After this lab you will instinctively know why password length matters, why patterns are dangerous, and why systems implement lockouts after failed attempts. You\'ll also understand entropy — the measure of password unpredictability.',
        highlight: 'A random 12-character password would take 34,000 years to crack with current technology. Length beats complexity.',
    },
];

interface PassCrackerProps {
    onComplete: (cert: CertificateRecord) => void;
}

const PassCracker: React.FC<PassCrackerProps> = ({ onComplete }) => {
    const levels = [
        { id: 1, target: '1234', title: 'Basic Manual Entry', type: 'manual' },
        { id: 2, target: '8080', title: 'Heat Sensor Guessing', type: 'heat' },
        { id: 3, target: '4422', title: 'Pattern Recognition', type: 'pattern' },
        { id: 4, target: '9173', title: 'Timing Attack', type: 'timing' },
        { id: 5, target: '0070', title: 'Dictionary Search', type: 'dictionary' },
        { id: 6, target: '5566', title: 'Frequency Analysis', type: 'frequency' },
        { id: 7, target: '1010', title: 'Binary Logic', type: 'manual' },
        { id: 8, target: '3399', title: 'Advanced Heat', type: 'heat' },
        { id: 9, target: '7788', title: 'Multi-threaded Brute', type: 'timing' },
        { id: 10, target: '2025', title: 'The Ultimate Vault', type: 'timing' }
    ];

    const [showIntro, setShowIntro] = useState(true);
    const [currentLevel, setCurrentLevel] = useState(0);
    const levelData = levels[currentLevel];
    
    const [status, setStatus] = useState<'idle' | 'hacking' | 'success' | 'failed'>('idle');
    const [userPin, setUserPin] = useState(['', '', '', '']);
    const [hints, setHints] = useState<string[]>([]);
    const [allCompleted, setAllCompleted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [failCount, setFailCount] = useState(0);
    const [revealedCount, setRevealedCount] = useState(0);
    const [hintLevel, setHintLevel] = useState(0);
    const [userName, setUserName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    // Timing attack states
    const [spinningDigits, setSpinningDigits] = useState([true, true, true, true]);
    const [displayDigits, setDisplayDigits] = useState(['0', '0', '0', '0']);

    useEffect(() => {
        let interval: any;
        if (status === 'hacking' && levelData.type === 'timing') {
            interval = setInterval(() => {
                setDisplayDigits(prev => prev.map((d, i) => 
                    spinningDigits[i] ? Math.floor(Math.random() * 10).toString() : d
                ));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status, spinningDigits, levelData.type]);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [hints]);

    const handleDigitChange = (index: number, val: string) => {
        if (!/^\d*$/.test(val)) return;
        const newPin = [...userPin];
        newPin[index] = val.slice(-1);
        setUserPin(newPin);
        
        // Auto-focus next input
        if (val && index < 3) {
            const nextInput = document.getElementById(`digit-${index + 1}`);
            nextInput?.focus();
        }
    };

    const provideHint = () => {
        const target = levelData.target;
        let hintMsg = "[INTEL] ";
        const hL = hintLevel;
        
        switch(levelData.type) {
            case 'manual':
                if (hL === 0) {
                    const sum = target.split('').reduce((acc, d) => acc + parseInt(d), 0);
                    hintMsg += `Signal analysis: The security checksum for this PIN is ${sum}. (Sum of digits)`;
                } else if (hL === 1) {
                    const first = parseInt(target[0]);
                    hintMsg += `Frequency intercepted: The first digit is ${first % 2 === 0 ? 'EVEN' : 'ODD'}.`;
                } else {
                    const unknownIndices = [];
                    for(let i=0; i<4; i++) if(userPin[i] !== target[i]) unknownIndices.push(i);
                    const idx = unknownIndices.length > 0 ? unknownIndices[0] : 0;
                    hintMsg += `Packet decryption successful: Digit ${idx+1} confirmed as ${target[idx]}.`;
                }
                break;
            case 'heat':
                if (hL === 0) {
                    hintMsg += `Thermal profile: The target PIN is ${parseInt(target) > 5000 ? 'HIGHER' : 'LOWER'} than 5000.`;
                } else if (hL === 1) {
                    const targetVal = parseInt(target);
                    const rangeMin = Math.max(0, targetVal - (Math.floor(Math.random() * 200) + 100));
                    const rangeMax = Math.min(9999, targetVal + (Math.floor(Math.random() * 200) + 100));
                    hintMsg += `Radiation detection: The signal is fluctuating between ${rangeMin} and ${rangeMax}.`;
                } else {
                    const lastDigit = target[3];
                    hintMsg += `Core scan: The sequence ends in ${lastDigit}.`;
                }
                break;
            case 'pattern':
                if (hL === 0) {
                    hintMsg += "Traffic analysis: The sequence duplicates its internal structure.";
                } else if (hL === 1) {
                    hintMsg += `Leak detected: The repeating value is ${target[0]}.`;
                } else {
                    hintMsg += `Full pattern breach: The target is a symmetrical ${target[0]}${target[1]}${target[0]}${target[1]} structure.`;
                }
                break;
            case 'dictionary':
                if (hL === 0) {
                    if (target === '0070') hintMsg += "History: Used by a British intelligence operative.";
                    else if (target === '1337') hintMsg += "History: Common among early computer enthusiasts.";
                    else hintMsg += "History: This is a legacy system default.";
                } else if (hL === 1) {
                    hintMsg += `Metadata: This code was most popular in the year ${target === '2025' ? '2025' : '1990'}.`;
                } else {
                    hintMsg += `Direct Intercept: The PIN starts with ${target[0]} and ends with ${target[3]}.`;
                }
                break;
            default:
                hintMsg += "Firewall weakening... keep trying to force a leak.";
        }
        
        setHints(prev => [...prev, hintMsg]);
        setHintLevel(prev => prev + 1);
    };

    const useAutoComplete = () => {
        if (failCount < 5 || revealedCount >= 4) return;
        
        const nextDigit = levelData.target[revealedCount];
        const newPin = [...userPin];
        newPin[revealedCount] = nextDigit;
        
        setUserPin(newPin);
        setRevealedCount(prev => prev + 1);
        setFailCount(prev => prev - 5);
        setHints(prev => [...prev, `[HINT] Signal decrypted! Digit ${revealedCount + 1} is validated as: ${nextDigit}`]);
        
        // Focus the next input if possible
        if (revealedCount < 3) {
            setTimeout(() => {
                document.getElementById(`digit-${revealedCount + 1}`)?.focus();
            }, 10);
        }
    };

    const submitManualGuess = () => {
        const pin = userPin.join('');
        if (pin.length < 4) return;

        setAttempts(prev => prev + 1);
        const target = levelData.target;
        
        if (pin === target) {
            setHints(prev => [...prev, `[SUCCESS] PIN ${pin} detected. Bypassing encryption...`, "[V] ACCESS GRANTED"]);
            setStatus('success');
            setFailCount(0);
        } else {
            const newFailCount = failCount + 1;
            setFailCount(newFailCount);
            
            let feedback = `[x] PIN ${pin}: FAILED. `;
            if (levelData.type === 'heat') {
                const diff = Math.abs(parseInt(pin) - parseInt(target));
                if (diff < 100) feedback += "(CORES OVERHEATING - VERY CLOSE)";
                else if (diff < 500) feedback += "(TEMPERATURE RISING - CLOSE)";
                else feedback += "(CORES CHILLED - FAR)";
            } else if (levelData.type === 'manual') {
                let correctCount = 0;
                for(let i=0; i<4; i++) if(pin[i] === target[i]) correctCount++;
                feedback += `(${correctCount} digits in correct position)`;
            }
            
            setHints(prev => [...prev.slice(-12), feedback]);
            
            if (newFailCount % 2 === 0) {
                provideHint();
            }
            
            // Clear inputs that ARE NOT revealed
            const clearedPin = userPin.map((digit, i) => i < revealedCount ? digit : '');
            setUserPin(clearedPin);
            setTimeout(() => {
                document.getElementById(`digit-${revealedCount}`)?.focus();
            }, 10);
        }
    };

    const lockDigit = (index: number) => {
        const newSpinning = [...spinningDigits];
        newSpinning[index] = false;
        
        // In timing attack, we check if they locked the right one
        if (displayDigits[index] === levelData.target[index]) {
            setHints(prev => [...prev, `[+] Digit ${index + 1} locked: ${displayDigits[index]} (MATCH FOUND)`]);
        } else {
            setHints(prev => [...prev, `[!] Digit ${index + 1} locked: ${displayDigits[index]} (MISMATCH - RECALIBRATING)`]);
            // Restart spin after a delay maybe? Or just keep it locked and fail at end
        }
        
        setSpinningDigits(newSpinning);

        if (newSpinning.every(s => !s)) {
            if (displayDigits.join('') === levelData.target) {
                setHints(prev => [...prev, "[SUCCESS] Full sequence matched. Protocol breached.", "[V] ACCESS GRANTED"]);
                setStatus('success');
            } else {
                setHints(prev => [...prev, "[FAILURE] Sequence mismatch. Anti-tamper triggered.", "[!] RESTARTING SCAN..."]);
                setTimeout(resetLevel, 2000);
            }
        }
    };

    const resetLevel = () => {
        setUserPin(['', '', '', '']);
        setHints([`[SYSTEM] Initializing hacking module for Level ${currentLevel + 1}...`, `[!] Target: ${levelData.title}`]);
        setStatus('idle');
        setSpinningDigits([true, true, true, true]);
        setDisplayDigits(['0', '0', '0', '0']);
        setAttempts(0);
        setFailCount(0);
        setRevealedCount(0);
        setHintLevel(0);
    };

    const nextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            setStatus('idle');
            setHints([]);
            setUserPin(['', '', '', '']);
            setSpinningDigits([true, true, true, true]);
            setRevealedCount(0);
            setHintLevel(0);
        } else {
            setAllCompleted(true);
        }
    };

    useEffect(() => {
        resetLevel();
    }, [currentLevel]);

    // Checkpoint for completion screen UI below

    if (showIntro) {
        return (
            <IntroModal
                slides={PASS_INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-secondary"
                borderClass="border-accent-secondary-25"
                bgClass="bg-accent-secondary-5"
                buttonClass="neon-button-secondary"
            />
        );
    }

    if (allCompleted) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-10 bg-accent-primary-10 rounded-full text-accent-primary mb-10 shadow-neon border border-accent-primary-20"
                >
                    <Trophy size={100} />
                </motion.div>
                <h2 className="text-6xl font-black text-white mb-6 tracking-tight uppercase">LEGENDARY HACKER!</h2>
                <p className="text-2xl text-text-secondary max-w-2xl mb-12">
                    You've bypassed every security layer manually. You now understand the perseverance required for brute force and why entropy matters.
                </p>

                <div className="cyber-card p-12 bg-bg-secondary border-accent-primary-30 max-w-xl w-full mb-10">
                    <h3 className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                        <User className="inline" size={18} /> Enter recruiter name for the certificate
                    </h3>
                    <input 
                        type="text" 
                        placeholder="YOUR FULL NAME"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-black border-2 border-white-10 rounded-2xl py-5 px-8 text-center text-2xl font-black text-white focus:border-accent-primary focus:shadow-neon outline-none transition-all placeholder:opacity-20 mb-8"
                    />
                    <div className="flex gap-4">
                        <button 
                            onClick={() => { setAllCompleted(false); setCurrentLevel(0); setUserName(''); }} 
                            className="flex-1 py-5 bg-bg-tertiary border rounded-2xl text-text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                        >
                            RESTART
                        </button>
                        <button
                            disabled={!userName.trim() || isGenerating}
                            onClick={() => {
                                setIsGenerating(true);
                                setTimeout(() => {
                                    const moduleName = "Interactive Password Cracking";
                                    generateCertificate(userName, moduleName);
                                    onComplete({
                                        moduleId: 'pass-crack',
                                        moduleName,
                                        userName,
                                        date: new Date().toLocaleDateString('en-US'),
                                    });
                                    setIsGenerating(false);
                                }, 1000);
                            }}
                            className="flex-2 neon-button py-5 text-lg disabled:opacity-20 disabled:grayscale transition-all"
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-3"><RotateCcw className="animate-spin" /> GENERATING...</span>
                            ) : (
                                <span className="flex items-center gap-3"><Download size={24} /> GET CERTIFICATE</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1700 mx-auto min-h-full">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-1">
                        Challenge #02 - Manual Breach - LEVEL {currentLevel + 1}/10
                    </div>
                    <h2 className="text-4xl font-extrabold text-white">Advanced <span className="text-accent-secondary">Cracker</span></h2>
                    <p className="text-text-secondary">Manual security auditing and pattern exploitation.</p>
                </div>
                <div className="flex gap-2 mb-2">
                    {levels.map((_, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full border ${idx <= currentLevel ? (idx === currentLevel && status !== 'success' ? 'bg-accent-secondary animate-pulse shadow-neon' : 'bg-accent-primary border-accent-primary') : 'border-white-5 opacity-30'}`} />
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                    <div className="cyber-card p-6 bg-accent-secondary-5 border-accent-secondary-25 flex items-start gap-4">
                        <HelpCircle className="text-accent-secondary shrink-0" size={28} />
                        <div>
                            <h4 className="text-white font-bold mb-1">Intel Report: {levelData.title}</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                {levelData.type === 'manual' && "Standard brute force. Try common patterns (sequential, repetitive). Terminal will tell you how many digits match."}
                                {levelData.type === 'heat' && "Thermal attack. The terminal senses core temperature (proximity to the correct PIN). Use binary search logic."}
                                {levelData.type === 'timing' && "Timing vulnerability detected! The PIN digits are spinning in memory. Click the digits below to LOCK them when they match the target."}
                                {levelData.type === 'pattern' && "Memory leak found! The target PIN follows a pattern: first two match, last two match (XYXY). Find it."}
                                {levelData.type === 'dictionary' && "Common password list loaded. Try the 'standard' hacker digits (0070, 1337, etc)."}
                            </p>
                        </div>
                    </div>

                    <div className="cyber-card flex-1 flex flex-col items-center justify-center p-12 bg-bg-secondary border relative overflow-hidden">
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-accent-primary-10 z-0 animate-pulse" />
                        )}
                        
                        <div className="relative z-10 w-full flex flex-col items-center">
                            <AnimatePresence mode='wait'>
                                <motion.div 
                                    key={currentLevel}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="mb-10 p-12 bg-black border-2 border-accent-secondary-30 rounded-[3rem] shadow-2xl flex flex-col items-center w-full max-w-sm"
                                >
                                    <div className="flex gap-4 mb-10">
                                        {(levelData.type === 'timing' ? displayDigits : userPin).map((digit, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                {levelData.type !== 'timing' && status !== 'success' && (
                                                    <input
                                                        id={`digit-${i}`}
                                                        type="text"
                                                        value={digit}
                                                        maxLength={1}
                                                        onChange={(e) => handleDigitChange(i, e.target.value)}
                                                        className="w-16 h-20 bg-bg-tertiary border-2 border-accent-secondary-20 rounded-2xl text-center text-4xl font-black text-white focus:border-accent-primary focus:shadow-neon outline-none transition-all"
                                                        autoFocus={i === 0}
                                                        autoComplete="off"
                                                    />
                                                )}
                                                {levelData.type === 'timing' && (
                                                    <div className={`w-16 h-20 bg-bg-tertiary border-2 ${spinningDigits[i] ? 'border-accent-tertiary-30' : 'border-accent-primary shadow-neon'} rounded-2xl flex items-center justify-center text-4xl font-black text-white`}>
                                                        {displayDigits[i]}
                                                    </div>
                                                )}
                                                {status === 'success' && levelData.type !== 'timing' && (
                                                    <div className="w-16 h-20 bg-accent-primary-10 border-2 border-accent-primary rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-neon">
                                                        {levelData.target[i]}
                                                    </div>
                                                )}
                                                
                                                {levelData.type === 'timing' && spinningDigits[i] && (
                                                    <button 
                                                        onClick={() => lockDigit(i)}
                                                        className="mt-2 p-2 bg-accent-tertiary text-bg-primary rounded-xl hover:bg-white transition-all text-[10px] font-black uppercase"
                                                    >
                                                        LOCK
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {status === 'success' ? (
                                        <div className="flex flex-col items-center animate-bounce">
                                            <Zap size={48} className="text-accent-primary mb-4 shadow-neon" />
                                            <span className="text-accent-primary font-black uppercase tracking-widest text-sm">BREACH SUCCESSFUL</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Lock size={48} className={spinningDigits.some(s => s) ? "text-accent-secondary opacity-50" : "text-accent-primary"} />
                                            {levelData.type !== 'timing' && (
                                                <div className="w-full mt-8 flex flex-col gap-3">
                                                    <button 
                                                        onClick={submitManualGuess}
                                                        className="neon-button px-12 py-4 text-xs w-full"
                                                    >
                                                        INJECT PAYLOAD
                                                    </button>
                                                    {failCount >= 5 && revealedCount < 4 && (
                                                        <button 
                                                            onClick={useAutoComplete}
                                                            className="w-full py-3 bg-accent-secondary-10 border border-accent-secondary-30 text-accent-secondary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent-secondary hover:text-bg-primary transition-all animate-pulse"
                                                        >
                                                            DECRYPT NEXT DIGIT (COST: 5 FAILS)
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            {levelData.type === 'timing' && spinningDigits.every(s => !s) && (
                                                <span className="mt-4 text-[10px] text-accent-tertiary font-bold animate-pulse">ANALYZING SEQUENCE...</span>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex gap-4 w-full px-6">
                                {status === 'success' ? (
                                    <button 
                                        onClick={nextLevel}
                                        className="flex-1 neon-button bg-accent-primary text-bg-primary border-accent-primary py-5 text-sm"
                                    >
                                        PROCEED TO NEXT LAYER <ArrowRight size={18} className="ml-2" />
                                    </button>
                                ) : (
                                    <div className="flex-1 bg-bg-tertiary border rounded-2xl p-4 flex items-center justify-center gap-6">
                                        <div className="text-center">
                                            <div className="text-[10px] text-text-muted font-bold uppercase mb-1">ATTEMPTS</div>
                                            <div className="text-2xl font-black text-white">{attempts}</div>
                                        </div>
                                        <div className="w-px h-8 bg-white-10" />
                                        <div className="text-center">
                                            <div className="text-[10px] text-text-muted font-bold uppercase mb-1">TYPE</div>
                                            <div className="text-sm font-black text-accent-secondary uppercase">{levelData.type}</div>
                                        </div>
                                    </div>
                                )}
                                <button onClick={resetLevel} className="p-5 bg-bg-tertiary border rounded-2xl hover:border-white transition-all text-text-muted hover:text-white">
                                    <RotateCcw size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                    <div className="cyber-card flex-1 bg-black border-accent-primary-20 p-0 overflow-hidden shadow-2xl relative min-h-600">
                        <div className="bg-bg-tertiary px-5 py-3 border-b flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <TerminalIcon size={16} className="text-accent-primary" />
                                <span className="text-[10px] uppercase font-bold text-accent-primary tracking-widest">Breach Console v2.0</span>
                            </div>
                            <div className="flex gap-1.5 grayscale opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-tertiary" />
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-secondary" />
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
                            </div>
                        </div>

                        <div className="flex-1 p-8 font-mono text-sm overflow-y-auto bg-black custom-scrollbar h-500">
                            <AnimatePresence>
                                {hints.map((line, i) => (
                                    <motion.div
                                        key={`${currentLevel}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={
                                            line.includes('[SUCCESS]') ? 'text-accent-primary font-bold bg-accent-primary-5 p-2 rounded mb-2' :
                                            line.includes('[v]') ? 'text-accent-primary text-xl mt-4 border-t border-accent-primary-20 pt-4' :
                                            line.includes('[x]') ? 'text-accent-tertiary opacity-80 mb-1' :
                                            line.includes('[INTEL]') ? 'text-accent-secondary font-bold border-l-2 border-accent-secondary pl-2 mb-2' :
                                            'text-green-400 opacity-60 leading-relaxed mb-1'
                                        }
                                    >
                                        <span className="opacity-30 mr-3">#</span>{line}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={terminalEndRef} />
                        </div>
                        
                        <div className="p-6 bg-bg-secondary border-t">
                             <div className="flex items-center gap-3 text-accent-tertiary">
                                <ShieldAlert size={20} />
                                <span className="text-[10px] font-black uppercase tracking-ultra">Bypass Strategy:</span>
                                <span className="text-xs text-text-secondary">
                                    {levelData.type === 'heat' ? "Observe the core temperature. Lower diff = higher temp." : "Manual entropy testing required."}
                                </span>
                             </div>
                        </div>
                    </div>

                    <div className="cyber-card bg-bg-tertiary border-white-5 p-8 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white-5 rounded-2xl flex items-center justify-center text-accent-secondary">
                            <Key size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-widest">Why is this interactive?</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Real hacking isn't a "Play" button. It requires <strong>observing system responses</strong> to your inputs. In these levels, you're learning to listen to what the machine tells you when you're wrong.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassCracker;
