import React, { useState } from 'react';
import { Shield, Bug, Key, Home, Settings, Info, Users, CheckCircle2, Trash2, Trophy, BookOpen, X, AlertTriangle, ShieldAlert, Brain, User, Check, Network, Globe, Database, ShieldCheck, Mail, AlertOctagon, Cpu, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Grade } from '../types';

interface SidebarProps {
    currentLessonId: string | null;
    onSelectLesson: (id: string | null) => void;
    completedLessons: string[];
    selectedGrade: Grade;
    onChangeGrade: () => void;
    onResetProgress: () => void;
}

/* ── Settings Modal ─────────────────────────────────────────────────── */
const SettingsModal: React.FC<{ onClose: () => void; onResetProgress: () => void; onResetCerts: () => void; onChangeGrade: () => void }> = ({ onClose, onResetProgress, onResetCerts, onChangeGrade }) => {
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
                            className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-1 ${nameSaved ? 'bg-accent-primary text-bg-primary' : 'border border-accent-primary-20 text-accent-primary hover:bg-accent-primary hover:text-bg-primary disabled:opacity-30 disabled:cursor-not-allowed'}`}
                        >
                            {nameSaved ? <><Check size={12} /> Saved</> : 'Save'}
                        </button>
                    </div>

                    {/* Change Grade */}
                    <div className="cyber-card p-5 bg-accent-secondary-5 border-accent-secondary-20 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-accent-secondary-10 rounded-xl text-accent-secondary shrink-0">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm mb-1">Change Grade</p>
                                <p className="text-text-muted text-xs leading-relaxed">Switch between Grado 9 and Grado 11 curricula.</p>
                            </div>
                        </div>
                        <button onClick={() => { onChangeGrade(); onClose(); }}
                            className="shrink-0 px-4 py-2 border border-accent-secondary-20 text-accent-secondary rounded-xl text-[10px] font-black uppercase hover:bg-accent-secondary hover:text-bg-primary transition-all">
                            Switch
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
                                <p className="text-text-muted text-xs leading-relaxed">Remove all earned certificates. Module progress is kept.</p>
                            </div>
                        </div>
                        {confirmReset === 'certs' ? (
                            <div className="flex flex-col gap-2 shrink-0">
                                <button onClick={() => { onResetCerts(); setConfirmReset(null); onClose(); }} className="px-4 py-2 bg-accent-tertiary text-white rounded-xl text-[10px] font-black uppercase">Confirm</button>
                                <button onClick={() => setConfirmReset(null)} className="px-4 py-2 bg-bg-tertiary border text-text-muted rounded-xl text-[10px] font-black uppercase">Cancel</button>
                            </div>
                        ) : (
                            <button onClick={() => setConfirmReset('certs')} className="shrink-0 px-4 py-2 border border-accent-tertiary-20 text-accent-tertiary rounded-xl text-[10px] font-black uppercase hover:bg-accent-tertiary hover:text-white transition-all">Clear</button>
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
                                <p className="text-text-muted text-xs leading-relaxed">Delete all completed modules and certificates. Cannot be undone.</p>
                            </div>
                        </div>
                        {confirmReset === 'progress' ? (
                            <div className="flex flex-col gap-2 shrink-0">
                                <button onClick={() => { onResetProgress(); setConfirmReset(null); onClose(); }} className="px-4 py-2 bg-accent-tertiary text-white rounded-xl text-[10px] font-black uppercase">Confirm</button>
                                <button onClick={() => setConfirmReset(null)} className="px-4 py-2 bg-bg-tertiary border text-text-muted rounded-xl text-[10px] font-black uppercase">Cancel</button>
                            </div>
                        ) : (
                            <button onClick={() => setConfirmReset('progress')} className="shrink-0 px-4 py-2 border border-accent-tertiary-30 text-accent-tertiary rounded-xl text-[10px] font-black uppercase hover:bg-accent-tertiary hover:text-white transition-all">
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
const HelpModal: React.FC<{ onClose: () => void; grade: Grade }> = ({ onClose, grade }) => {
    const grade11Modules = [
        { icon: <Bug size={18} />, name: 'Malware Lab', color: 'text-accent-primary', bg: 'bg-accent-primary-10 border-accent-primary-20', desc: 'Build simulated malware using visual drag-and-drop blocks. Learn how attack logic is structured — 10 escalating missions.' },
        { icon: <Key size={18} />, name: 'Password Cracking', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels using 5 attack techniques: brute force, heat sensor, timing attack, pattern recognition, and frequency analysis.' },
        { icon: <ShieldAlert size={18} />, name: 'Phishing Detector', color: 'text-accent-tertiary', bg: 'bg-accent-tertiary-5 border-accent-tertiary-20', desc: 'Analyze 10 real-world emails and classify them as phishing or legitimate.' },
        { icon: <Brain size={18} />, name: 'Social Engineering Pro', color: 'text-accent-primary', bg: 'bg-accent-primary-5 border-accent-primary-20', desc: '10 realistic attack scenarios — phone calls, chats, and in-person encounters.' },
        { icon: <Network size={18} />, name: 'Network Packet Lab', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels covering packet anatomy, OSI model, TCP handshakes, routing, sniffing, ARP spoofing, and firewall rules.' },
        { icon: <Globe size={18} />, name: 'IP Classification', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels to master IPv4/IPv6 recognition, private vs public ranges, loopback, APIPA, and broadcast addresses.' },
    ];

    const grade9Modules = [
        { icon: <Database size={18} />, name: 'Data Risks', color: 'text-accent-primary', bg: 'bg-accent-primary-10 border-accent-primary-20', desc: '10 scenarios covering personal data exposure, breaches, oversharing, IoT risks, and data harvesting attacks.' },
        { icon: <ShieldCheck size={18} />, name: 'Security Practices', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 levels on passwords, 2FA, updates, backups, privacy settings, and device security.' },
        { icon: <BookOpen size={18} />, name: 'Security Guides', color: 'text-accent-primary', bg: 'bg-accent-primary-5 border-accent-primary-20', desc: '10 step-by-step guides: password managers, HTTPS, email security, mobile safety, and incident response.' },
        { icon: <Mail size={18} />, name: 'Phishing Signs', color: 'text-accent-tertiary', bg: 'bg-accent-tertiary-5 border-accent-tertiary-20', desc: '10 levels identifying fake domains, urgency tactics, suspicious links, dangerous attachments, and smishing.' },
        { icon: <AlertOctagon size={18} />, name: 'Scam Responses', color: 'text-accent-secondary', bg: 'bg-accent-secondary-5 border-accent-secondary-20', desc: '10 scenarios: tech support scams, lottery fraud, romance scams, fake jobs, and how to respond and report.' },
        { icon: <Cpu size={18} />, name: 'Malware Builder Lab', color: 'text-accent-tertiary', bg: 'bg-accent-tertiary-5 border-accent-tertiary-20', desc: '10 drag-and-drop challenges: assemble attack components, map kill chain phases, and build complete attack scenarios.' },
    ];

    const modules = grade === 'grade9' ? grade9Modules : grade11Modules;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                className="cyber-card w-full max-w-2xl bg-bg-secondary border p-0 overflow-hidden">
                <div className="flex items-center justify-between px-8 py-5 border-b bg-bg-tertiary">
                    <div className="flex items-center gap-3 text-white">
                        <BookOpen size={18} className="text-accent-secondary" />
                        <span className="font-black text-sm uppercase tracking-widest">Help & Guide</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${grade === 'grade9' ? 'bg-accent-secondary-10 text-accent-secondary' : 'bg-accent-primary-10 text-accent-primary'}`}>
                            {grade === 'grade9' ? 'Grado 9' : 'Grado 11'}
                        </span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all"><X size={18} /></button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar" style={{ maxHeight: '75vh' }}>
                    <div className="mb-8">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">How it works</p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                'Select any module from the sidebar to start a training mission.',
                                'Read the theory intro — each module starts with real-world context.',
                                'Complete all 10 levels to earn your certificate. Each level must be passed to unlock the next.',
                                'Enter your name and download your PDF certificate when finished.',
                                grade === 'grade9' ? 'All 6 Grado 9 modules are available — no unlock requirements between modules.' : 'All 6 Grado 11 modules are available from day one.',
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                    <div className="w-5 h-5 rounded-full bg-accent-primary-10 border border-accent-primary-20 text-accent-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

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
const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, completedLessons, selectedGrade, onChangeGrade, onResetProgress }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const grade11Items = [
        { id: 'malware-101',    icon: <Bug size={20} />,         label: 'Malware Lab' },
        { id: 'pass-crack',     icon: <Key size={20} />,         label: 'Password Cracking' },
        { id: 'social-eng',     icon: <ShieldAlert size={20} />, label: 'Phishing Detector' },
        { id: 'social-eng-sim', icon: <Users size={20} />,       label: 'Social Engineering' },
        { id: 'net-packets',    icon: <Network size={20} />,     label: 'Network Packets' },
        { id: 'ip-classifier',  icon: <Globe size={20} />,       label: 'IP Classification' },
    ];

    const grade9Items = [
        { id: 'data-risks',          icon: <Database size={20} />,     label: 'Data Risks' },
        { id: 'security-practices',  icon: <ShieldCheck size={20} />,  label: 'Security Practices' },
        { id: 'security-guides',     icon: <BookOpen size={20} />,     label: 'Security Guides' },
        { id: 'phishing-signs',      icon: <Mail size={20} />,         label: 'Phishing Signs' },
        { id: 'scam-responses',      icon: <AlertOctagon size={20} />, label: 'Scam Responses' },
        { id: 'malware-builder',     icon: <Cpu size={20} />,          label: 'Malware Builder Lab' },
    ];

    const moduleItems = selectedGrade === 'grade9' ? grade9Items : grade11Items;
    const gradeAccent = selectedGrade === 'grade9' ? 'accent-secondary' : 'accent-primary';

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
                        onChangeGrade={onChangeGrade}
                    />
                )}
                {showHelp && (
                    <HelpModal onClose={() => setShowHelp(false)} grade={selectedGrade} />
                )}
            </AnimatePresence>

            <div className="w-64 h-screen bg-bg-secondary border-r flex flex-col p-6 fixed left-0 top-0 z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="p-2 bg-accent-primary rounded-lg text-bg-primary shadow-neon">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">Cyber<span className="text-accent-primary">Lab</span></h1>
                </div>

                {/* Grade badge */}
                <button
                    onClick={onChangeGrade}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border mb-6 transition-all hover:opacity-80 ${selectedGrade === 'grade9' ? 'bg-accent-secondary-10 border-accent-secondary-20 text-accent-secondary' : 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'}`}
                >
                    <div className="flex items-center gap-2">
                        <GraduationCap size={16} />
                        <span className="font-black text-xs uppercase tracking-widest">
                            {selectedGrade === 'grade9' ? 'Grado 9' : 'Grado 11'}
                        </span>
                    </div>
                    <span className="text-[10px] text-text-muted">change</span>
                </button>

                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-2">Learning Modules</p>

                <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                    {/* Home */}
                    <button
                        onClick={() => onSelectLesson(null)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                            currentLessonId === null
                                ? `bg-${gradeAccent}-10 text-${gradeAccent} border border-${gradeAccent}-20 shadow-neon`
                                : 'text-text-secondary hover:bg-glass hover:text-white border border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <Home size={20} />
                            <span className="font-semibold text-sm">Home / Progress</span>
                        </div>
                    </button>

                    {moduleItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelectLesson(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                                currentLessonId === item.id
                                    ? `bg-${gradeAccent}-10 text-${gradeAccent} border border-${gradeAccent}-20 shadow-neon`
                                    : 'text-text-secondary hover:bg-glass hover:text-white border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            {completedLessons.includes(item.id) && <CheckCircle2 size={16} className="text-accent-primary" />}
                            {currentLessonId === item.id && !completedLessons.includes(item.id) && <div className={`w-1.5 h-1.5 rounded-full bg-${gradeAccent} animate-pulse`} />}
                        </button>
                    ))}
                </nav>

                {/* Bottom buttons */}
                <div className="mt-auto space-y-1 border-t pt-6">
                    <button onClick={() => setShowSettings(true)} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all text-sm">
                        <Settings size={18} /><span>Settings</span>
                    </button>
                    <button onClick={() => setShowHelp(true)} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white hover:bg-glass transition-all text-sm">
                        <Info size={18} /><span>Help / Guide</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
