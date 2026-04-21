import React, { useState } from 'react';
import { Shield, Bug, Key, Home, Settings, Info, Lock, Users, CheckCircle2, Trash2, Trophy, BookOpen, X, AlertTriangle, ShieldAlert, Brain, User, Check, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    currentLessonId: string | null;
    onSelectLesson: (id: string | null) => void;
    completedLessons: string[];
    onResetProgress: () => void;
}

/* ── Settings Modal ─────────────────────────────────────────────────── */
const SettingsModal: React.FC<{ onClose: () => void; onResetProgress: () => void; onResetCerts: () => void }> = ({ onClose, onResetProgress, onResetCerts }) => {
    const [confirmReset, setConfirmReset] = useState<'progress' | 'certs' | null>(null);
    const [nameInput, setNameInput] = useState(() => localStorage.getItem('cyberlab-username') ?? '');
    const [nameSaved, setNameSaved] = useState(false);

    const handleSaveName = () => {
        localStorage.setItem('cyberlab-username', nameInput.trim());
        setNameSaved(true);
        setTimeout(() => setNameSaved(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="cyber-card w-full max-w-lg bg-bg-secondary border p-0 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b bg-bg-tertiary">
                    <div className="flex items-center gap-3 text-white">
                        <Settings size={18} className="text-accent-primary" />
                        <span className="font-black text-sm uppercase tracking-widest">Settings</span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8 flex flex-col gap-4">

                    {/* Certificate name */}
                    <div className="cyber-card p-5 bg-accent-primary-5 border-accent-primary-20 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="p-3 bg-accent-primary-10 rounded-xl text-accent-primary shrink-0">
                                <User size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-sm mb-1">Certificate Name</p>
                                <p className="text-text-muted text-xs leading-relaxed mb-3">This name will be pre-filled when you earn a certificate.</p>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={e => { setNameInput(e.target.value); setNameSaved(false); }}
                                    onKeyDown={e => e.key === 'Enter' && nameInput.trim() && handleSaveName()}
                                    placeholder="Enter your full name…"
                                    className="w-full bg-bg-primary border border-white-10 rounded-xl px-4 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-primary transition-all"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSaveName}
                            disabled={!nameInput.trim()}
                            className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-1 ${
                                nameSaved
                                    ? 'bg-accent-primary text-bg-primary'
                                    : 'border border-accent-primary-20 text-accent-primary hover:bg-accent-primary hover:text-bg-primary disabled:opacity-30 disabled:cursor-not-allowed'
                            }`}
                        >
                            {nameSaved ? <><Check size={12} /> Saved</> : 'Save'}
                        </button>
                    </div>

                    {/* Reset certificates */}
                    <div className="cyber-card p-5 bg-accent-tertiary-5 border-accent-tertiary-20 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-accent-tertiary-10 rounded-xl text-accent-tertiary shrink-0">
                                <Trophy size={20} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm mb-1">Clear Certificates</p>
                                <p className="text-text-muted text-xs leading-relaxed">Remove all earned certificates from the gallery. Your module progress is kept.</p>
                            </div>
                        </div>
                        {confirmReset === 'certs' ? (
                            <div className="flex flex-col gap-2 shrink-0">
                                <button onClick={() => { onResetCerts(); setConfirmReset(null); onClose(); }}
                                    className="px-4 py-2 bg-accent-tertiary text-white rounded-xl text-[10px] font-black uppercase">
                                    Confirm
                                </button>
                                <button onClick={() => setConfirmReset(null)}
                                    className="px-4 py-2 bg-bg-tertiary border text-text-muted rounded-xl text-[10px] font-black uppercase">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setConfirmReset('certs')}
                                className="shrink-0 px-4 py-2 border border-accent-tertiary-20 text-accent-tertiary rounded-xl text-[10px] font-black uppercase hover:bg-accent-tertiary hover:text-white transition-all">
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Reset all progress */}
                    <div className="cyber-card p-5 bg-accent-tertiary-10 border-accent-tertiary-30 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-accent-tertiary-20 rounded-xl text-accent-tertiary shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm mb-1">Reset All Progress</p>
                                <p className="text-text-muted text-xs leading-relaxed">Delete all completed modules and certificates. This cannot be undone.</p>
                            </div>
                        </div>
                        {confirmReset === 'progress' ? (
                            <div className="flex flex-col gap-2 shrink-0">
                                <button onClick={() => { onResetProgress(); setConfirmReset(null); onClose(); }}
                                    className="px-4 py-2 bg-accent-tertiary text-white rounded-xl text-[10px] font-black uppercase">
                                    Confirm
                                </button>
                                <button onClick={() => setConfirmReset(null)}
                                    className="px-4 py-2 bg-bg-tertiary border text-text-muted rounded-xl text-[10px] font-black uppercase">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setConfirmReset('progress')}
                                className="shrink-0 px-4 py-2 border border-accent-tertiary-30 text-accent-tertiary rounded-xl text-[10px] font-black uppercase hover:bg-accent-tertiary hover:text-white transition-all">
                                <Trash2 size={14} className="inline mr-1" />Reset
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ── Help Modal ─────────────────────────────────────────────────────── */
const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const modules = [
        { icon: <Bug size={18} />, name: 'Malware Lab', color: 'text-accent-primary', bg: 'bg-accent-primary-10 border-accent-primary-20', desc: 'Build simulated malware using visual drag-and-drop blocks. Learn how attack logic is structured — 10 escalating missions.' },
        { icon: <Key size={18} />, name: 'Password Cracking', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels using 5 different attack techniques: brute force, heat sensor, timing attack, pattern recognition, and frequency analysis.' },
        { icon: <ShieldAlert size={18} />, name: 'Phishing Detector', color: 'text-accent-tertiary', bg: 'bg-accent-tertiary-5 border-accent-tertiary-20', desc: 'Analyze 10 real-world emails and classify them as phishing or legitimate. Learn to spot red flags before they cause damage.' },
        { icon: <Brain size={18} />, name: 'Social Engineering Pro', color: 'text-accent-primary', bg: 'bg-accent-primary-5 border-accent-primary-20', desc: '10 realistic attack scenarios — phone calls, chats, and in-person encounters. Learn to recognize and resist psychological manipulation.' },
        { icon: <Network size={18} />, name: 'Network Packet Lab', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels covering packet anatomy, OSI model, TCP handshakes, routing, HTTP/HTTPS sniffing, ARP spoofing, and firewall rules.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="cyber-card w-full max-w-2xl bg-bg-secondary border p-0 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b bg-bg-tertiary">
                    <div className="flex items-center gap-3 text-white">
                        <BookOpen size={18} className="text-accent-secondary" />
                        <span className="font-black text-sm uppercase tracking-widest">Help & Guide</span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar" style={{ maxHeight: '75vh' }}>

                    {/* How it works */}
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">How it works</p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                '1. Select any module from the sidebar to start a training mission.',
                                '2. Read the theory intro — each module starts with real-world context.',
                                '3. Complete all 10 levels inside the module to earn your certificate.',
                                '4. Enter your name and download your PDF certificate.',
                                '5. All 5 modules are available from day one — no unlock requirements.',
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                    <div className="w-5 h-5 rounded-full bg-accent-primary-10 border border-accent-primary-20 text-accent-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                        {i + 1}
                                    </div>
                                    <span>{step.slice(3)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modules */}
                    <div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Training Modules</p>
                        <div className="flex flex-col gap-3">
                            {modules.map((m, i) => (
                                <div key={i} className={`cyber-card p-4 border flex items-start gap-4 ${m.bg}`}>
                                    <div className={`p-2 rounded-lg ${m.bg} ${m.color} shrink-0 mt-0.5`}>{m.icon}</div>
                                    <div>
                                        <p className={`font-bold text-sm mb-1 ${m.color}`}>{m.name}</p>
                                        <p className="text-text-muted text-xs leading-relaxed">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ethics reminder */}
                    <div className="mt-6 p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl">
                        <p className="text-accent-secondary font-bold text-xs uppercase tracking-widest mb-2">Code of Ethics</p>
                        <p className="text-text-muted text-xs leading-relaxed">
                            Everything you learn here is for <strong className="text-white">defensive and educational purposes only</strong>. Using these techniques against real systems without authorization is illegal. Use your knowledge to protect, not to harm.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ── Sidebar ────────────────────────────────────────────────────────── */
const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, completedLessons, onResetProgress }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const isSocialEngLocked = false;

    const menuItems = [
        { id: null,             icon: <Home size={20} />,   label: 'Home / Progress',   locked: false },
        { id: 'malware-101',    icon: <Bug size={20} />,    label: 'Malware Lab',        locked: false },
        { id: 'pass-crack',     icon: <Key size={20} />,    label: 'Password Cracking',  locked: false },
        { id: 'social-eng',     icon: <Shield size={20} />, label: 'Phishing Detector',  locked: false },
        { id: 'social-eng-sim', icon: <Users size={20} />,   label: 'Social Engineering', locked: isSocialEngLocked },
        { id: 'net-packets',    icon: <Network size={20} />, label: 'Network Packets',    locked: false },
    ];

    const handleResetCerts = () => {
        localStorage.removeItem('cyberlab-certificates');
        window.location.reload();
    };

    const handleResetProgress = () => {
        localStorage.removeItem('cyberlab-completed');
        localStorage.removeItem('cyberlab-certificates');
        onResetProgress();
        window.location.reload();
    };

    return (
        <>
            <AnimatePresence>
                {showSettings && (
                    <SettingsModal
                        onClose={() => setShowSettings(false)}
                        onResetProgress={handleResetProgress}
                        onResetCerts={handleResetCerts}
                    />
                )}
                {showHelp && (
                    <HelpModal onClose={() => setShowHelp(false)} />
                )}
            </AnimatePresence>

            <div className="w-64 h-screen bg-bg-secondary border-r flex flex-col p-6 fixed left-0 top-0 z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="p-2 bg-accent-primary rounded-lg text-bg-primary shadow-neon">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">Cyber<span className="text-accent-primary">Lab</span></h1>
                </div>

                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-2">Learning Modules</p>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            disabled={item.locked}
                            onClick={() => onSelectLesson(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                                currentLessonId === item.id
                                    ? 'bg-accent-primary-10 text-accent-primary border border-accent-primary-20 shadow-neon'
                                    : item.locked
                                        ? 'opacity-40 cursor-not-allowed grayscale'
                                        : 'text-text-secondary hover:bg-glass hover:text-white border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            {item.locked && <Lock size={14} className="opacity-50" />}
                            {completedLessons.includes(item.id || '') && !item.locked && <CheckCircle2 size={16} className="text-accent-primary" />}
                            {currentLessonId === item.id && !item.locked && !completedLessons.includes(item.id || '') && <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />}
                        </button>
                    ))}
                </nav>

                {/* Bottom buttons */}
                <div className="mt-auto space-y-1 border-t pt-6">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all text-sm"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all text-sm"
                    >
                        <Info size={18} />
                        <span>Help / Guide</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
