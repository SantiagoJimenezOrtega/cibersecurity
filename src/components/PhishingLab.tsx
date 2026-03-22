import React from 'react';
import { Mail, ShieldCheck, ShieldAlert, BadgeInfo, CheckCircle, XCircle, User, Calendar, ExternalLink, HelpCircle, Download, RotateCcw, AtSign, AlertTriangle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const PHISHING_INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <Mail size={40} />,
        subtitle: 'Social engineering',
        title: 'The Human Is the Vulnerability',
        body: 'Phishing is the practice of sending fraudulent emails that impersonate trusted organizations to steal credentials, financial data, or install malware. It accounts for over 90% of successful cyberattacks worldwide.',
        highlight: 'In 2020, a phishing email cost Twitter its most famous accounts: Barack Obama, Elon Musk, Apple — all hacked in one afternoon.',
    },
    {
        icon: <AtSign size={40} />,
        subtitle: 'The anatomy of a phishing email',
        title: 'Red Flags to Look For',
        body: 'Attackers rely on urgency, fear, and impersonation. Key indicators: suspicious sender domain (amazon-support.xyz instead of amazon.com), threats of account closure, requests for credentials or payment, and generic greetings like "Dear User".',
        highlight: 'Hover over any link before clicking. The real URL always appears in your browser\'s status bar.',
    },
    {
        icon: <AlertTriangle size={40} />,
        subtitle: 'Spear phishing — the advanced version',
        title: 'When They Know Your Name',
        body: 'Spear phishing targets specific individuals using personal information from LinkedIn, Instagram, or public databases. The email mentions your real name, employer, or recent activity — making it far more convincing than generic attacks.',
        highlight: 'If an unexpected email seems suspiciously specific about your details, treat it as a red flag, not proof of legitimacy.',
    },
    {
        icon: <Eye size={40} />,
        subtitle: 'Your mission',
        title: 'Train Your Threat Detection',
        body: 'You will analyze 10 real-world email scenarios — some phishing, some legitimate. For each one, decide and then see the detailed breakdown of every indicator. The goal is to build pattern recognition that becomes instinctive.',
        highlight: 'Score 8/10 or higher and you\'re operating at a professional security awareness level.',
    },
];

interface PhishingLabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const PhishingLab: React.FC<PhishingLabProps> = ({ onComplete }) => {
    const phishingEmails = [
        {
            id: 1,
            sender: "security-alert@amazon-shipping-update.com",
            subject: "⚠️ Action required! Your order has been blocked",
            content: "Dear user, your account has been suspended due to unusual activity. Click here to verify your details and avoid additional charges or permanent closure of your account.",
            isPhishing: true,
            indicators: [
                "Suspicious sender: Amazon uses 'amazon.com', not 'amazon-shipping-update.com'",
                "Artificial urgency: Threatens with 'permanent closure'",
                "Fake link: You can't see where the button leads until you click"
            ]
        },
        {
            id: 2,
            sender: "google-accounts-noreply@google.com",
            subject: "New sign-in to your account",
            content: "Someone just signed in to your account from a new device (Linux, Bogota). If this wasn't you, review your activity here. If it was you, you can ignore this message.",
            isPhishing: false,
            indicators: [
                "Official sender: 'google-accounts-noreply@google.com'",
                "Informative tone: Doesn't use fear or extreme urgency",
                "Real info: Indicates city and device"
            ]
        },
        {
            id: 3,
            sender: "netflix-billing@payments-info.net",
            subject: "Update your payment method - Membership on hold",
            content: "We regret to inform you that your last payment was declined. To continue enjoying your favorite shows, update your billing information within the next 24 hours or your account will be deleted.",
            isPhishing: true,
            indicators: [
                "Fake domain: @payments-info.net is not @netflix.com",
                "Sense of urgency: 'within the next 24 hours'",
                "Extreme threat: 'your account will be deleted'"
            ]
        },
        {
            id: 4,
            sender: "tech-support@educational-institution.edu",
            subject: "Scheduled maintenance for student platform",
            content: "Hello students, this Saturday from 2:00 PM to 6:00 PM the grades platform will be offline for maintenance. No action is required.",
            isPhishing: false,
            indicators: [
                "Correct institutional email (.edu)",
                "Doesn't ask for passwords or links",
                "Informative and planned in advance"
            ]
        },
        {
            id: 5,
            sender: "alerts@bank-virtual-branch.xyz",
            subject: "Security lockout - Credit Card!",
            content: "We detected a purchase of $1,200 in an unknown store. If you do not recognize this transaction, click the following link IMMEDIATELY to cancel the charge.",
            isPhishing: true,
            indicators: [
                "Suspicious domain extension (.xyz)",
                "Use of caps to generate panic",
                "Request for immediate action via external link"
            ]
        },
        {
            id: 6,
            sender: "updates@discord.com",
            subject: "Updated Terms of Service",
            content: "We are updating our policies to improve your experience. You can read the detailed changes on our official blog. Thanks for being part of Discord.",
            isPhishing: false,
            indicators: [
                "Verified sender: discord.com",
                "Reference to official communication channel (blog)",
                "Routine administrative subject without alarms"
            ]
        },
        {
            id: 7,
            sender: "hr-payroll@microsoft-rewards.org",
            subject: "🎁 Your special employee bonus is ready!",
            content: "As a thank you for your performance, Microsoft has granted you a $500 bonus. To claim it, enter your corporate credentials in this secure form.",
            isPhishing: true,
            indicators: [
                "Prize bait ($500 Bonus)",
                "Request for 'corporate credentials'",
                "You aren't a Microsoft employee, why would you receive this?"
            ]
        },
        {
            id: 8,
            sender: "support@spotify.com",
            subject: "Receipt for your Spotify Premium payment",
            content: "Thanks for your monthly subscription. The $18 charge has been processed successfully. You can view your invoice by downloading it in your user profile.",
            isPhishing: false,
            indicators: [
                "Expected transactional email",
                "No urgency or threats",
                "The link (if any) should lead to spotify.com"
            ]
        },
        {
            id: 9,
            sender: "instagram-security@notice-verify.com",
            subject: "Copyright Violation - Your account will be deleted",
            content: "One of your photos violates our rules. You have 12 hours to appeal the decision or we will delete your account permanently. Click here to appeal.",
            isPhishing: true,
            indicators: [
                "Fake 'notice-verify.com' domain",
                "Extreme urgency (12 hours)",
                "Common fear tactic on social media"
            ]
        },
        {
            id: 10,
            sender: "notifications@tax-auth.gov",
            subject: "Information about your tax return",
            content: "We inform you that you can now consult your tax obligations by entering our electronic headquarters through the official portal www.tax.gov.",
            isPhishing: false,
            indicators: [
                "Official government domain (.gov)",
                "Redirects to a real and known URL",
                "Formal language without immediate financial threats"
            ]
        }
    ];

    const [showIntro, setShowIntro] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showResult, setShowResult] = React.useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    const checkDecision = (decision: boolean) => {
        if (decision === phishingEmails[currentIndex].isPhishing) {
            setShowResult('correct');
            setScore(prev => prev + 1);
        } else {
            setShowResult('wrong');
        }
    };

    const nextEmail = () => {
        setShowResult(null);
        if (currentIndex < phishingEmails.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const email = phishingEmails[currentIndex];

    const [userName, setUserName] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);

    if (showIntro) {
        return (
            <IntroModal
                slides={PHISHING_INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-secondary"
                borderClass="border-accent-secondary-25"
                bgClass="bg-accent-secondary-5"
                buttonClass="neon-button-secondary"
            />
        );
    }

    if (completed) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-10 bg-accent-secondary-10 rounded-full text-accent-secondary mb-10 shadow-neon border border-accent-secondary-20"
                >
                    <ShieldCheck size={100} />
                </motion.div>
                <h2 className="text-6xl font-black text-white mb-6 tracking-tight uppercase">TRAINING COMPLETED!</h2>
                <p className="text-2xl text-text-secondary max-w-2xl mb-4">
                    You have analyzed all 10 emails in the database. You are now better prepared to identify phishing attempts.
                </p>
                <div className="text-5xl font-mono text-accent-primary mb-12">
                    Score: {score} / 10
                </div>

                <div className="cyber-card p-12 bg-bg-secondary border-accent-secondary-30 max-w-xl w-full mb-10">
                    <h3 className="text-accent-secondary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                        <User className="inline" size={18} /> Enter recruiter name for the certificate
                    </h3>
                    <input 
                        type="text" 
                        placeholder="YOUR FULL NAME"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-black border-2 border-white-10 rounded-2xl py-5 px-8 text-center text-2xl font-black text-white focus:border-accent-secondary focus:shadow-neon outline-none transition-all placeholder:opacity-20 mb-8"
                    />
                    <div className="flex gap-4">
                        <button 
                            onClick={() => { setCompleted(false); setCurrentIndex(0); setScore(0); setUserName(''); }} 
                            className="flex-1 py-5 bg-bg-tertiary border rounded-2xl text-text-muted hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
                        >
                            RESTART
                        </button>
                        <button
                            disabled={!userName.trim() || isGenerating}
                            onClick={() => {
                                setIsGenerating(true);
                                setTimeout(async () => {
                                    const moduleName = "Phishing Detection Training";
                                    await generateCertificate(userName, moduleName);
                                    onComplete({
                                        moduleId: 'social-eng',
                                        moduleName,
                                        userName,
                                        date: new Date().toLocaleDateString('en-US'),
                                    });
                                    setIsGenerating(false);
                                }, 1000);
                            }}
                            className="flex-2 neon-button-secondary py-5 text-lg disabled:opacity-20 disabled:grayscale transition-all"
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
        <div className="p-10 animate-fade-in max-w-1400 mx-auto min-h-full">
            <header className="mb-8">
                <div className="flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-1">
                    Challenge #03 - Social Engineering
                </div>
                <h2 className="text-4xl font-extrabold text-white">Phishing Detector</h2>
                <p className="text-text-secondary">Analyze emails and decide if they are safe or a trap.</p>
            </header>

            <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-8">
                <div className="cyber-card p-4 bg-accent-secondary-5 border border-accent-secondary-20 flex items-center gap-4">
                    <HelpCircle className="text-accent-secondary shrink-0" size={24} />
                    <p className="text-sm text-text-secondary leading-relaxed">
                        <strong>Your mission:</strong> Can you spot the red flags? An email can be the entry point for a major cyberattack. Analyze sender and content.
                    </p>
                </div>

                <div className="cyber-card bg-bg-secondary flex-1 shadow-2xl relative overflow-hidden flex flex-col p-0 border min-h-500">
                    <div className="bg-bg-tertiary p-5 border-b flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent-secondary-10 rounded-xl text-accent-secondary shadow-neon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <span className="font-bold text-white block">Secure Mail Service</span>
                                <div className="flex items-center gap-3 text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> Today, 09:45 am</span>
                                    <span className="flex items-center gap-1 text-accent-primary animate-pulse"><ShieldCheck size={12} /> Protected</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white-5 rounded-full text-[10px] text-text-muted font-bold tracking-widest uppercase">Message {currentIndex + 1} of {phishingEmails.length}</div>
                    </div>

                    <div className="p-10 overflow-y-auto bg-bg-secondary flex-1 custom-scrollbar">
                        <div className="mb-10 pb-6 border-b">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent-secondary-10 flex items-center justify-center text-accent-secondary border border-accent-secondary-20">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-widest mb-1">De:</div>
                                    <div className="text-white font-bold text-lg">{email.sender}</div>
                                </div>
                            </div>
                            <div className="text-2xl text-white font-extrabold mb-1 tracking-tight">Asunto: {email.subject}</div>
                        </div>

                        <div className="text-xl leading-relaxed text-text-secondary mb-12 p-10 bg-glass rounded-3xl border shadow-inner relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Mail size={120} />
                            </div>
                            <p className="relative z-10">"{email.content}"</p>
                            <div className="mt-10 relative z-10">
                                <div className="w-fit px-8 py-4 bg-accent-primary-10 border border-accent-primary-20 rounded-2xl text-accent-primary font-black text-sm cursor-pointer hover:bg-accent-primary-20 transition-all flex items-center gap-3 shadow-lg">
                                    <ExternalLink size={20} /> CLICK HERE TO RESOLVE
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {showResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-10 rounded-3xl border shadow-2xl overflow-hidden relative ${showResult === 'correct' ? 'bg-accent-primary-5 border-accent-primary-30 text-accent-primary' : 'bg-accent-tertiary-5 border-accent-tertiary-30 text-accent-tertiary'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        {showResult === 'correct' ? <ShieldCheck size={200} /> : <ShieldAlert size={200} />}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            {showResult === 'correct' ? <CheckCircle size={40} /> : <XCircle size={40} />}
                                            <h4 className="font-extrabold text-3xl mb-1 uppercase tracking-tighter">{showResult === 'correct' ? 'Correct Answer!' : 'You fell for the trap!'}</h4>
                                        </div>

                                        <div className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
                                            {email.isPhishing
                                                ? 'Correct. This email was a **PHISHING** attack designed to steal your data.'
                                                : 'This was a **LEGITIMATE** security email. It is important not to block it.'
                                            }
                                        </div>

                                        <div className="bg-white-5 p-6 rounded-2xl mb-8 border border-white-5">
                                            <h5 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-70">Security indicators:</h5>
                                            <ul className="space-y-3">
                                                {email.indicators.map((ind, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                        {ind}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={nextEmail}
                                            className={`px-10 py-4 rounded-xl font-extrabold uppercase tracking-widest border-2 shadow-neon transition-all hover:scale-105 active:scale-95 ${showResult === 'correct' ? 'border-accent-primary bg-accent-primary text-bg-primary' : 'border-accent-tertiary bg-accent-tertiary text-bg-primary'
                                                }`}
                                        >
                                            CONTINUE TRAINING
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {!showResult && (
                        <div className="p-8 bg-bg-tertiary border-t grid grid-cols-2 gap-6 shrink-0 mt-auto">
                            <button
                                onClick={() => checkDecision(true)}
                                className="flex items-center justify-center gap-3 p-6 border-2 border-accent-tertiary rounded-2xl text-accent-tertiary hover:bg-accent-tertiary hover:text-white transition-all font-extrabold uppercase tracking-widest text-sm shadow-inner"
                            >
                                <ShieldAlert size={24} /> THIS IS PHISHING
                            </button>
                            <button
                                onClick={() => checkDecision(false)}
                                className="flex items-center justify-center gap-3 p-6 border-2 border-accent-secondary rounded-2xl text-accent-secondary hover:bg-accent-secondary hover:text-white transition-all font-extrabold uppercase tracking-widest text-sm shadow-inner"
                            >
                                <ShieldCheck size={24} /> THIS IS SECURE
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-8 pb-12">
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #1</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Look for spelling errors or an exaggerated sense of urgency."
                        </p>
                    </div>
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #2</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Hover over links to see the real URL before clicking."
                        </p>
                    </div>
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #3</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Reputable companies will never ask for passwords or bank details via email."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhishingLab;
