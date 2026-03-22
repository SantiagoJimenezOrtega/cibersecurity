import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone, Monitor, MessageSquare, CheckCircle, XCircle, ArrowRight, Trophy, Download, RotateCcw, User, AlertTriangle, ShieldCheck } from 'lucide-react';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

interface SocialEngProProps {
    onComplete: (cert: CertificateRecord) => void;
}

/* ── Intro slides ─────────────────────────────────────────────────── */
const SE_INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <Users size={40} />,
        subtitle: 'The ultimate attack',
        title: 'Hacking the Human Mind',
        body: 'Social engineering is the art of manipulating people into revealing confidential information or performing actions that benefit the attacker. No technical skills required — just psychology, trust, and pressure.',
        highlight: 'Kevin Mitnick, once the world\'s most wanted hacker, said: "The human factor is the weakest link in security."',
    },
    {
        icon: <Phone size={40} />,
        subtitle: 'Vishing — voice phishing',
        title: 'The Fake IT Support Call',
        body: 'Attackers call employees pretending to be IT staff, bank officers, or government agents. They create urgency ("your account will be locked"), build false trust, and extract passwords or OTP codes over the phone.',
        highlight: 'A 2020 Twitter hack started with a vishing call to an employee who was convinced to hand over internal credentials.',
    },
    {
        icon: <Monitor size={40} />,
        subtitle: 'Pretexting',
        title: 'Building a Fake Identity',
        body: 'Pretexting means constructing a fabricated scenario to extract information. The attacker researches the target on LinkedIn, Instagram, or company directories — then contacts them with a convincing cover story.',
        highlight: 'Always verify the identity of anyone requesting sensitive information, even if they know internal details about your company.',
    },
    {
        icon: <MessageSquare size={40} />,
        subtitle: 'Your training',
        title: 'Recognize the Script',
        body: 'You will face 10 realistic scenarios — phone calls, chat messages, and on-site encounters. For each one, decide if you should comply or refuse. Then see exactly which manipulation tactics were being used.',
        highlight: 'Defend by slowing down. Attackers rely on urgency. A 5-second pause to verify is your best weapon.',
    },
];

/* ── Scenario types ───────────────────────────────────────────────── */
type ScenarioType = 'phone' | 'chat' | 'email' | 'physical';

interface Scenario {
    id: number;
    type: ScenarioType;
    from: string;
    role: string;
    message: string;
    shouldComply: false; // All social engineering should be refused — lesson is always to refuse
    tactics: string[];
    explanation: string;
}

/* All scenarios are attacks — student should always choose REFUSE */
const scenarios: Scenario[] = [
    {
        id: 1,
        type: 'phone',
        from: 'Unknown number (+1-888-555-0192)',
        role: 'IT Help Desk — Carlos',
        message: '"Hi, this is Carlos from the IT department. We detected suspicious activity on your account and need to verify your identity immediately. Can you give me your current password so I can run a diagnostic? This will only take a second and prevents your account from being locked."',
        shouldComply: false,
        tactics: ['Authority impersonation', 'Artificial urgency', 'Password request'],
        explanation: 'Legitimate IT departments NEVER ask for your password over the phone or any channel. Asking for your current password is always a red flag, regardless of how official the caller sounds.',
    },
    {
        id: 2,
        type: 'chat',
        from: 'Internal Chat — @sys.admin',
        role: 'System Administrator',
        message: '"Hey, I\'m migrating the servers tonight and need your login credentials temporarily to move your data over. Don\'t worry, I\'ll change it back after. It\'s urgent — maintenance window closes in 30 min."',
        shouldComply: false,
        tactics: ['Urgency and deadline', 'Internal impersonation', 'Credential harvesting'],
        explanation: 'No system migration ever requires a user\'s personal credentials. Admins have privileged access tools for this. The fake username @sys.admin mimics official accounts but isn\'t one.',
    },
    {
        id: 3,
        type: 'phone',
        from: 'Bank Customer Service (claimed)',
        role: 'Fraud Prevention — Maria',
        message: '"Good afternoon, we\'ve detected a $2,400 transaction on your account from an unknown location. To cancel it immediately, I need you to confirm your 6-digit SMS verification code that we just sent you. Act fast — you have 90 seconds."',
        shouldComply: false,
        tactics: ['Fear of financial loss', 'Extreme time pressure', 'OTP hijacking'],
        explanation: 'This is a classic OTP (One-Time Password) hijacking attack. The attacker initiated a real login attempt and needs YOUR code to complete it. Banks never ask for SMS codes over the phone — that code is your second factor.',
    },
    {
        id: 4,
        type: 'physical',
        from: 'Office lobby — stranger',
        role: 'New contractor with a large package',
        message: '"Hey, could you hold the door for me? My badge isn\'t activating yet — HR said they\'d process it today but apparently it\'s delayed. I\'ve got this delivery for the 3rd floor and my hands are full. It\'ll just be a second!"',
        shouldComply: false,
        tactics: ['Physical tailgating', 'Sympathy appeal', 'Distraction with props'],
        explanation: 'This is called tailgating or piggybacking. No physical access should be granted without proper badge verification, no matter how harmless the person looks. A "large package" is a classic distraction tactic.',
    },
    {
        id: 5,
        type: 'email',
        from: 'ceo@company-corp.net',
        role: 'CEO — Direct Request',
        message: '"I\'m in a confidential meeting and can\'t talk. I need you to purchase 5x $200 Amazon gift cards for a client deal — it\'s urgent and I\'ll explain later. Keep this between us for now. Send the codes when done."',
        shouldComply: false,
        tactics: ['CEO fraud / whaling', 'Secrecy request', 'Gift card scam'],
        explanation: 'This is known as CEO fraud or Business Email Compromise (BEC). Attackers spoof executive email addresses (notice company-corp.net not company.com). Requests for gift cards + secrecy are always scams. Verify by phone before any action.',
    },
    {
        id: 6,
        type: 'chat',
        from: 'Discord — @TechSupport#0001',
        role: 'Discord Trust & Safety',
        message: '"Your account has been flagged for suspicious activity and will be terminated in 24 hours. To appeal, you must verify ownership by providing your login token. Use this form: discord-verify-account.xyz/token"',
        shouldComply: false,
        tactics: ['Account termination threat', 'Token theft', 'Fake support impersonation'],
        explanation: 'Discord (and all platforms) never ask for your login token. A token is equivalent to your password — handing it over gives complete account access. Official support contact always comes through verified in-app channels, never unsolicited DMs.',
    },
    {
        id: 7,
        type: 'phone',
        from: 'Automated Call — Government Agency',
        role: 'Tax Authority — Enforcement Division',
        message: '"This is an automated call from the IRS. You owe $3,200 in back taxes. Failure to pay within 2 hours will result in arrest. Press 1 to speak with an officer and settle this immediately with a wire transfer or gift cards."',
        shouldComply: false,
        tactics: ['Government impersonation', 'Arrest threat', 'Gift card / wire transfer scam'],
        explanation: 'Government agencies communicate via official mail, not phone calls threatening immediate arrest. The IRS and similar agencies never accept gift cards as payment. This is a well-documented phone scam targeting millions annually.',
    },
    {
        id: 8,
        type: 'physical',
        from: 'At your desk — visitor',
        role: 'Security Auditor from HQ',
        message: '"Hi, I\'m conducting a surprise security audit. I need to inspect your workstation. Can you log in so I can check your access permissions? Don\'t worry about notifying your manager — surprise audits must remain unannounced."',
        shouldComply: false,
        tactics: ['Authority + surprise tactic', 'Isolation from oversight', 'Direct access request'],
        explanation: 'Legitimate security audits are conducted with prior HR/management notification and proper credentials. Any request to exclude your manager from oversight is a massive red flag — it removes your safety net for verification.',
    },
    {
        id: 9,
        type: 'chat',
        from: 'WhatsApp — "Mom" (new number)',
        role: 'Family member in trouble',
        message: '"Hi sweetheart, I broke my phone and this is a friend\'s number. I\'m stuck abroad and need $400 urgently for the hotel — they won\'t let me leave until I pay. Can you Venmo it? I\'ll pay you back tonight. Love you."',
        shouldComply: false,
        tactics: ['Family impersonation', 'Emotional manipulation', 'Urgency + empathy exploitation'],
        explanation: 'This is the "grandparent scam" adapted for digital channels. Attackers research family members on social media. Always verify by calling the actual family member\'s real phone number before sending any money.',
    },
    {
        id: 10,
        type: 'email',
        from: 'hr-portal@on-boarding-docs.com',
        role: 'HR Department — Onboarding',
        message: '"Welcome to the team! Please complete your onboarding by logging into our HR portal with your corporate credentials to sign your contract documents. Link: https://hr-onboarding-portal.company-docs.net/signin"',
        shouldComply: false,
        tactics: ['Credential harvesting', 'Fake onboarding portal', 'Lookalike domain'],
        explanation: 'Lookalike domains (company-docs.net instead of company.com) are used to host fake login pages that steal corporate credentials. Always type your company\'s HR portal URL directly — never click email links to enter passwords.',
    },
];

const TYPE_ICONS: Record<ScenarioType, React.ReactNode> = {
    phone: <Phone size={20} />,
    chat: <MessageSquare size={20} />,
    email: <Monitor size={20} />,
    physical: <Users size={20} />,
};

const TYPE_LABELS: Record<ScenarioType, string> = {
    phone: 'Phone Call',
    chat: 'Chat Message',
    email: 'Email',
    physical: 'In-Person',
};

/* ── Component ────────────────────────────────────────────────────── */
const SocialEngPro: React.FC<SocialEngProProps> = ({ onComplete }) => {
    const [showIntro, setShowIntro] = useState(true);
    const [current, setCurrent] = useState(0);
    const [decision, setDecision] = useState<'comply' | 'refuse' | null>(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [userName, setUserName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const scenario = scenarios[current];

    const makeDecision = (choice: 'comply' | 'refuse') => {
        setDecision(choice);
        if (choice === 'refuse') setScore(p => p + 1);
    };

    const next = () => {
        setDecision(null);
        if (current < scenarios.length - 1) setCurrent(p => p + 1);
        else setCompleted(true);
    };

    const scoreLabel = () => {
        if (score >= 9) return { label: 'Elite Analyst', color: 'text-accent-primary' };
        if (score >= 7) return { label: 'Security Specialist', color: 'text-accent-secondary' };
        if (score >= 5) return { label: 'Aware Defender', color: 'text-accent-tertiary' };
        return { label: 'Needs Training', color: 'text-text-muted' };
    };

    if (showIntro) {
        return (
            <IntroModal
                slides={SE_INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-primary"
                borderClass="border-accent-primary-25"
                bgClass="bg-accent-primary-5"
                buttonClass="neon-button"
            />
        );
    }

    if (completed) {
        const { label, color } = scoreLabel();
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-10 bg-accent-primary-10 rounded-full text-accent-primary mb-10 shadow-neon border border-accent-primary-20"
                >
                    <Trophy size={100} />
                </motion.div>
                <h2 className="text-6xl font-black text-white mb-4 tracking-tight uppercase">Mission Complete!</h2>
                <div className={`text-4xl font-black mb-2 ${color}`}>{label}</div>
                <div className="text-5xl font-mono text-white mb-4">{score} <span className="text-text-muted text-2xl">/ 10</span></div>
                <p className="text-text-secondary text-lg max-w-2xl mb-12">
                    You correctly refused {score} out of 10 social engineering attacks. Remember: every real attacker relies on you acting before you think.
                </p>

                <div className="cyber-card p-12 bg-bg-secondary border-accent-primary-30 max-w-xl w-full mb-10">
                    <h3 className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                        <User size={18} /> Enter your name for the certificate
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
                            onClick={() => { setCompleted(false); setCurrent(0); setScore(0); setDecision(null); setUserName(''); }}
                            className="flex-1 py-5 bg-bg-tertiary border rounded-2xl text-text-muted hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                        >
                            <RotateCcw size={16} className="inline mr-2" />RESTART
                        </button>
                        <button
                            disabled={!userName.trim() || isGenerating}
                            onClick={() => {
                                setIsGenerating(true);
                                setTimeout(async () => {
                                    const moduleName = 'Social Engineering Pro';
                                    await generateCertificate(userName, moduleName);
                                    onComplete({
                                        moduleId: 'social-eng-sim',
                                        moduleName,
                                        userName,
                                        date: new Date().toLocaleDateString('en-US'),
                                    });
                                    setIsGenerating(false);
                                }, 1000);
                            }}
                            className="flex-2 neon-button py-5 text-lg"
                        >
                            {isGenerating
                                ? <span className="flex items-center gap-3 justify-center"><RotateCcw className="animate-spin" size={18} /> GENERATING...</span>
                                : <span className="flex items-center gap-3 justify-center"><Download size={22} /> GET CERTIFICATE</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1600 mx-auto min-h-full">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest mb-1">
                        Challenge #04 — Social Engineering — Scenario {current + 1}/10
                    </div>
                    <h2 className="text-4xl font-extrabold text-white">Social Engineering <span className="text-accent-primary">Pro</span></h2>
                    <p className="text-text-secondary">Read each scenario carefully. Would you comply or refuse?</p>
                </div>
                {/* Progress dots */}
                <div className="flex gap-2 mb-2">
                    {scenarios.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-3 h-3 rounded-full border transition-all ${
                                idx < current
                                    ? 'bg-accent-primary border-accent-primary'
                                    : idx === current
                                        ? 'bg-accent-primary animate-pulse shadow-neon border-accent-primary'
                                        : 'border-white-5 opacity-30'
                            }`}
                        />
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Scenario card */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.25 }}
                            className="cyber-card bg-bg-secondary border flex flex-col overflow-hidden shadow-2xl"
                        >
                            {/* Scenario header */}
                            <div className="bg-bg-tertiary p-5 border-b flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-accent-tertiary-10 rounded-xl text-accent-tertiary">
                                        {TYPE_ICONS[scenario.type]}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{scenario.from}</p>
                                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{TYPE_LABELS[scenario.type]} · {scenario.role}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-accent-tertiary-10 border border-accent-tertiary-20 text-accent-tertiary text-[10px] font-black uppercase rounded-full">
                                    {TYPE_LABELS[scenario.type]}
                                </span>
                            </div>

                            {/* Message */}
                            <div className="p-10 flex-1">
                                <div className="bg-glass border rounded-2xl p-8 relative overflow-hidden mb-8">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                        {TYPE_ICONS[scenario.type]}
                                    </div>
                                    <p className="text-xl text-text-secondary leading-relaxed relative z-10 italic">
                                        {scenario.message}
                                    </p>
                                </div>

                                {/* Result panel */}
                                <AnimatePresence>
                                    {decision && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-8 rounded-2xl border mb-6 relative overflow-hidden ${
                                                decision === 'refuse'
                                                    ? 'bg-accent-primary-5 border-accent-primary-30 text-accent-primary'
                                                    : 'bg-accent-tertiary-5 border-accent-tertiary-30 text-accent-tertiary'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                {decision === 'refuse'
                                                    ? <CheckCircle size={32} />
                                                    : <XCircle size={32} />
                                                }
                                                <h4 className="font-black text-2xl uppercase tracking-tight">
                                                    {decision === 'refuse' ? 'Correct — You Protected Yourself!' : 'You Were Compromised!'}
                                                </h4>
                                            </div>
                                            <p className="text-text-secondary text-base leading-relaxed mb-6">
                                                {scenario.explanation}
                                            </p>
                                            <div className="bg-white-5 rounded-xl p-5 border border-white-10 mb-6">
                                                <p className="text-xs font-black uppercase tracking-widest mb-3 opacity-60">Tactics used in this attack:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {scenario.tactics.map((t, i) => (
                                                        <span key={i} className="px-3 py-1 bg-accent-tertiary-10 border border-accent-tertiary-20 text-accent-tertiary text-[10px] font-black uppercase rounded-full">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={next}
                                                className="neon-button px-10 py-4 text-sm flex items-center gap-2"
                                            >
                                                {current < scenarios.length - 1 ? 'Next Scenario' : 'See Results'} <ArrowRight size={18} />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Decision buttons */}
                                {!decision && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => makeDecision('refuse')}
                                            className="flex items-center justify-center gap-3 p-6 border-2 border-accent-primary rounded-2xl text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-all font-extrabold uppercase tracking-widest text-sm"
                                        >
                                            <ShieldCheck size={24} /> REFUSE / REPORT
                                        </button>
                                        <button
                                            onClick={() => makeDecision('comply')}
                                            className="flex items-center justify-center gap-3 p-6 border-2 border-accent-tertiary rounded-2xl text-accent-tertiary hover:bg-accent-tertiary hover:text-white transition-all font-extrabold uppercase tracking-widest text-sm"
                                        >
                                            <AlertTriangle size={24} /> COMPLY
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Sidebar stats */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* Score tracker */}
                    <div className="cyber-card p-6 bg-accent-primary-5 border-accent-primary-25">
                        <p className="text-xs font-black uppercase tracking-widest text-accent-primary mb-2">Defenses Held</p>
                        <p className="text-5xl font-black text-white mb-3">{score}<span className="text-xl text-text-muted font-bold">/{current + (decision ? 1 : 0)}</span></p>
                        <div className="w-full h-2 bg-white-5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent-primary rounded-full transition-all"
                                style={{ width: current + (decision ? 1 : 0) > 0 ? `${(score / (current + (decision ? 1 : 0))) * 100}%` : '0%' }}
                            />
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="cyber-card p-6 bg-accent-secondary-5 border-accent-secondary-20 flex flex-col gap-4">
                        <p className="text-xs font-black uppercase tracking-widest text-accent-secondary">Defense Mindset</p>
                        <ul className="space-y-3 text-xs text-text-secondary leading-relaxed">
                            <li className="flex gap-2"><span className="text-accent-primary mt-0.5">▸</span> Slow down. Urgency is a manipulation tactic.</li>
                            <li className="flex gap-2"><span className="text-accent-primary mt-0.5">▸</span> Verify identity through a separate channel before acting.</li>
                            <li className="flex gap-2"><span className="text-accent-primary mt-0.5">▸</span> No legitimate org asks for passwords, OTPs, or gift cards by phone.</li>
                            <li className="flex gap-2"><span className="text-accent-primary mt-0.5">▸</span> When in doubt, hang up and call back on a known official number.</li>
                            <li className="flex gap-2"><span className="text-accent-primary mt-0.5">▸</span> Requests for secrecy ("don't tell your manager") are always red flags.</li>
                        </ul>
                    </div>

                    {/* Attack type legend */}
                    <div className="cyber-card p-6 bg-bg-secondary border">
                        <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-4">Scenario Types</p>
                        <div className="flex flex-col gap-2">
                            {(Object.keys(TYPE_LABELS) as ScenarioType[]).map(t => (
                                <div key={t} className="flex items-center gap-3 text-xs">
                                    <div className="text-accent-tertiary">{TYPE_ICONS[t]}</div>
                                    <span className="text-text-secondary font-medium">{TYPE_LABELS[t]}</span>
                                    <span className="ml-auto text-text-muted font-bold">
                                        {scenarios.filter(s => s.type === t).length}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialEngPro;
