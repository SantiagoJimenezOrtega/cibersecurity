import React from 'react';
import { GraduationCap, CheckCircle, XCircle, ChevronRight, Download, RotateCcw, User, Shield, Database, ShieldCheck, BookOpen, Mail, AlertOctagon, Cpu, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <GraduationCap size={40} />,
        subtitle: 'Final Assessment',
        title: 'Grade 9 Comprehensive Quiz',
        body: 'This final quiz evaluates everything you have studied in Grado 9. It covers all 6 modules: Data Risks, Security Practices, Security Guides, Phishing Signs, Scam Responses, and Malware Builder Lab.',
        highlight: '30 questions — 5 per module. Score 70% or higher (21/30) to earn your certificate.',
    },
    {
        icon: <Database size={40} />,
        subtitle: 'Modules 1–2',
        title: 'Data & Security Practices',
        body: 'Questions cover what personal data is, how data breaches happen, oversharing risks, IoT dangers, and data harvesting — plus strong passwords, 2FA, software updates, backups, and privacy settings.',
        highlight: 'Your personal data is the most valuable thing attackers want. Protecting it starts with basic habits.',
    },
    {
        icon: <BookOpen size={40} />,
        subtitle: 'Modules 3–4',
        title: 'Security Guides & Phishing Signs',
        body: 'You will be tested on HTTPS, password managers, email safety, mobile security, and incident response — as well as recognizing fake domains, urgency tactics, suspicious links, dangerous attachments, and smishing.',
        highlight: 'Most attacks succeed because of one distracted click. Train your eye to spot the signs.',
    },
    {
        icon: <AlertOctagon size={40} />,
        subtitle: 'Modules 5–6',
        title: 'Scams & Malware Concepts',
        body: 'Scam questions cover tech support fraud, lottery scams, romance scams, fake jobs, and government impersonation. Malware questions test your knowledge of attack phases, payloads, C2 servers, persistence, and exfiltration.',
        highlight: 'Scams and malware are two sides of the same coin — both exploit trust and urgency.',
    },
    {
        icon: <Shield size={40} />,
        subtitle: 'Your mission',
        title: '30 Questions — Prove Your Skills',
        body: 'Each question presents a real-world scenario with four options. Read carefully before answering. After completing all 30 questions you will see your score and, if you pass, download a certificate showing your exact results.',
        highlight: 'Your certificate will show: correct answers, incorrect answers, and your final percentage.',
    },
];

interface Question {
    id: number;
    module: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const QUESTIONS: Question[] = [
    // ── Module 1: Data Risks ───────────────────────────────────────────
    {
        id: 1,
        module: 'Data Risks',
        question: 'Which of the following is considered personal data?',
        options: [
            'The color of your favorite car',
            'Your full name, date of birth, and home address',
            'The title of a movie you watched',
            'A public news article you shared',
        ],
        correct: 1,
        explanation: 'Personal data is any information that can identify a specific individual: name, date of birth, address, phone number, email, ID numbers, and more. This data must be protected because it can be used for identity theft or fraud.',
    },
    {
        id: 2,
        module: 'Data Risks',
        question: 'A data breach occurs when:',
        options: [
            'You forget your password and reset it',
            'Unauthorized individuals access, steal, or expose private data',
            'A website updates its privacy policy',
            'You delete your account from a service',
        ],
        correct: 1,
        explanation: 'A data breach is an unauthorized access or exposure of private information — whether by external hackers, malicious insiders, or accidental misconfiguration. Breaches can expose millions of records at once.',
    },
    {
        id: 3,
        module: 'Data Risks',
        question: 'Posting your home address, daily schedule, and vacation plans on public social media primarily puts you at risk of:',
        options: [
            'Receiving too many friend requests',
            'Identity theft, stalking, and physical burglary',
            'Slow internet connection',
            'Losing access to your account',
        ],
        correct: 1,
        explanation: 'Oversharing on social media gives attackers and criminals the information they need. Publishing your location, routine, and personal details enables identity theft, stalking, and even physical break-ins while you are away.',
    },
    {
        id: 4,
        module: 'Data Risks',
        question: 'Which of these represents a typical IoT (Internet of Things) privacy risk?',
        options: [
            'A smart TV that requires a remote control',
            'A smart speaker that continuously listens and sends voice data to company servers',
            'A printer connected via USB to your computer',
            'A calculator app on your phone',
        ],
        correct: 1,
        explanation: 'IoT devices like smart speakers, cameras, and thermostats continuously collect data — sometimes without clear user awareness. This data can be accessed by manufacturers, third parties, or attackers if the device or account is compromised.',
    },
    {
        id: 5,
        module: 'Data Risks',
        question: 'Data harvesting refers to:',
        options: [
            'Backing up files to an external drive',
            'Collecting large amounts of personal information — often without full user consent — to build profiles for advertising or attacks',
            'Deleting outdated data from databases',
            'Encrypting sensitive files on your computer',
        ],
        correct: 1,
        explanation: 'Data harvesting is the large-scale collection of personal data, often via apps, websites, or quizzes that seem harmless. The harvested data is used for targeted advertising, sold to third parties, or exploited in social engineering attacks.',
    },

    // ── Module 2: Security Practices ──────────────────────────────────
    {
        id: 6,
        module: 'Security Practices',
        question: 'Which of these passwords is the strongest?',
        options: [
            'maria2005',
            '123456789',
            'Password1',
            'T#8xK!2vQm@9rL',
        ],
        correct: 3,
        explanation: 'T#8xK!2vQm@9rL is long (14 characters) and combines uppercase, lowercase, digits, and symbols. Length is the most important factor — every extra character multiplies the time needed to crack it exponentially.',
    },
    {
        id: 7,
        module: 'Security Practices',
        question: 'Two-Factor Authentication (2FA) protects your account because:',
        options: [
            'It makes your password twice as long',
            'It requires a second verification step even if your password is stolen',
            'It blocks all login attempts from other countries',
            'It encrypts your password before sending it',
        ],
        correct: 1,
        explanation: '2FA adds a second layer of protection: something you know (password) plus something you have (phone code, hardware key) or something you are (fingerprint). Even with your password, an attacker cannot log in without the second factor.',
    },
    {
        id: 8,
        module: 'Security Practices',
        question: 'Why is it important to keep your operating system and apps updated?',
        options: [
            'Updates add new wallpapers and themes',
            'Updates fix security vulnerabilities that attackers could otherwise exploit',
            'Updates make the device run slower, proving it is working harder',
            'Updates are optional and rarely affect security',
        ],
        correct: 1,
        explanation: 'Software updates patch known security vulnerabilities. Attackers actively scan for unpatched systems — running outdated software is like leaving a known unlocked door. Many major breaches exploited vulnerabilities that had patches available for months.',
    },
    {
        id: 9,
        module: 'Security Practices',
        question: 'Which backup strategy best protects against data loss from ransomware?',
        options: [
            'One copy on the same computer in a different folder',
            'Three copies — original + local backup + offsite/offline backup not connected to the network',
            'Copying files to a USB drive that stays plugged into the computer',
            'Emailing yourself important files occasionally',
        ],
        correct: 1,
        explanation: 'The 3-2-1 backup rule: 3 copies of data, on 2 different media types, with 1 stored offsite or offline. Ransomware encrypts connected drives — an offline or cloud backup that is not always mounted is the only guaranteed recovery option.',
    },
    {
        id: 10,
        module: 'Security Practices',
        question: 'What is the primary purpose of privacy settings on social media platforms?',
        options: [
            'To make your profile look more professional',
            'To control who can see your personal information and posts',
            'To increase the number of followers you get',
            'To speed up the loading of your profile page',
        ],
        correct: 1,
        explanation: 'Privacy settings let you decide who can view your posts, personal data, and activity. Keeping profiles private limits exposure to strangers, reduces social engineering risk, and protects your personal information from data scrapers.',
    },

    // ── Module 3: Security Guides ──────────────────────────────────────
    {
        id: 11,
        module: 'Security Guides',
        question: 'When you see a padlock icon and "https://" in your browser address bar, it means:',
        options: [
            'The website is 100% trustworthy and safe',
            'The connection between your browser and the server is encrypted',
            'The website has been approved by the government',
            'Your antivirus has scanned the page',
        ],
        correct: 1,
        explanation: 'HTTPS (with the padlock) means the connection is encrypted using TLS — preventing eavesdropping. However, it does NOT mean the site is legitimate. Phishing sites also use HTTPS. Always verify the domain name.',
    },
    {
        id: 12,
        module: 'Security Guides',
        question: 'What is the main benefit of using a password manager?',
        options: [
            'It shares your passwords with trusted contacts automatically',
            'It generates and securely stores a unique, complex password for every account',
            'It stores passwords in a plain text file for easy access',
            'It uses the same strong password across all your accounts',
        ],
        correct: 1,
        explanation: 'A password manager creates a different strong password for every service and stores them in an encrypted vault. You only need to remember one master password — eliminating password reuse, which is the #1 cause of account takeovers.',
    },
    {
        id: 13,
        module: 'Security Guides',
        question: 'You receive an unexpected email from your bank with a link to "verify your account." What should you do?',
        options: [
            'Click the link immediately — banks send these for your security',
            'Do not click the link. Open your browser and go directly to the bank\'s official website',
            'Reply to the email asking if it is real',
            'Forward it to all your contacts to warn them',
        ],
        correct: 1,
        explanation: 'Never click links in unexpected emails, even if they look legitimate. Type the bank\'s address directly in your browser or use a saved bookmark. Phishing emails are designed to look exactly like official communications.',
    },
    {
        id: 14,
        module: 'Security Guides',
        question: 'Why should you avoid installing apps from sources outside the official app stores?',
        options: [
            'Unofficial apps have worse graphics',
            'Unofficial apps may contain malware, spyware, or modified code that steals your data',
            'Official stores charge more, so unofficial is cheaper and safer',
            'Unofficial apps use more battery power',
        ],
        correct: 1,
        explanation: 'Official app stores (Google Play, App Store) review apps for malware. Third-party sources have no review process — attackers distribute modified apps ("trojanized apps") that look legitimate but steal credentials or install ransomware.',
    },
    {
        id: 15,
        module: 'Security Guides',
        question: 'You suspect your email account has been hacked. What is the FIRST action you should take?',
        options: [
            'Wait to see if anything bad happens',
            'Immediately change the password and enable 2FA on that account',
            'Delete the account and create a new one with the same password',
            'Post on social media asking for help',
        ],
        correct: 1,
        explanation: 'Change the compromised password immediately to lock the attacker out, then enable 2FA to prevent future unauthorized access. Also check for any forwarding rules or connected apps the attacker may have added.',
    },

    // ── Module 4: Phishing Signs ───────────────────────────────────────
    {
        id: 16,
        module: 'Phishing Signs',
        question: 'Which of these URLs is most likely a phishing site impersonating PayPal?',
        options: [
            'paypal.com/login',
            'paypa1.com/secure-login',
            'developer.paypal.com',
            'paypal.com/help/contact',
        ],
        correct: 1,
        explanation: '"paypa1.com" replaces the letter "l" with the number "1" — a classic typosquatting trick. Always inspect the exact domain name carefully before entering credentials. A single character difference is easy to miss at a glance.',
    },
    {
        id: 17,
        module: 'Phishing Signs',
        question: 'An email states: "YOUR ACCOUNT WILL BE PERMANENTLY DELETED IN 2 HOURS — Act now!" What phishing technique is this?',
        options: [
            'Spear phishing',
            'Whaling',
            'Urgency and fear manipulation',
            'Smishing',
        ],
        correct: 2,
        explanation: 'Creating artificial urgency is one of the most effective phishing techniques. It triggers panic and disables critical thinking, pushing the victim to act immediately without verifying the message\'s legitimacy.',
    },
    {
        id: 18,
        module: 'Phishing Signs',
        question: 'Before clicking a link in an email, how can you check where it actually leads?',
        options: [
            'Read the surrounding text — if it sounds official, it is safe',
            'Hover your mouse over the link to reveal the real destination URL',
            'Click it and immediately close the browser if it looks wrong',
            'Check if the email has a company logo',
        ],
        correct: 1,
        explanation: 'Hovering over a link (without clicking) shows the real destination URL in the status bar. The visible link text can say anything — only the actual URL matters. This is a critical habit before clicking any link in any email.',
    },
    {
        id: 19,
        module: 'Phishing Signs',
        question: 'You receive an email from an unknown sender with an attachment named "invoice_2025.exe". What should you do?',
        options: [
            'Open it — it is probably a billing document',
            'Do not open it. Delete the email. An .exe file from an unknown sender is likely malware',
            'Open it in a folder with antivirus enabled',
            'Forward it to a friend to check',
        ],
        correct: 1,
        explanation: '.exe files are executable programs. Opening one from an unknown sender can immediately install malware. Legitimate invoices are sent as PDFs, never as executable files. When in doubt, delete without opening.',
    },
    {
        id: 20,
        module: 'Phishing Signs',
        question: 'Smishing is a phishing attack delivered through:',
        options: [
            'Fake social media profiles',
            'SMS text messages',
            'Voice phone calls',
            'Malicious USB drives',
        ],
        correct: 1,
        explanation: 'Smishing (SMS phishing) uses text messages to trick victims into clicking malicious links or calling fake numbers. Common smishing lures include fake package delivery alerts, bank fraud warnings, and prize notifications.',
    },

    // ── Module 5: Scam Responses ───────────────────────────────────────
    {
        id: 21,
        module: 'Scam Responses',
        question: 'You receive a call from someone claiming to be "Microsoft Support" saying your computer has a virus and they need remote access to fix it. What should you do?',
        options: [
            'Give them access — Microsoft must have detected the problem',
            'Hang up immediately. Microsoft does not make unsolicited support calls',
            'Ask them to wait while you restart your computer',
            'Pay the fee they request to fix the issue',
        ],
        correct: 1,
        explanation: 'This is a classic tech support scam. Microsoft, Apple, and other companies do NOT call you unsolicited about viruses. Granting remote access lets scammers steal files, install malware, and charge fake fees. Hang up immediately.',
    },
    {
        id: 22,
        module: 'Scam Responses',
        question: 'An email tells you that you have won $500,000 in a lottery you never entered, and you just need to pay a "processing fee" to claim your prize. This is:',
        options: [
            'A real lottery — companies run random giveaways',
            'A lottery fraud scam — you cannot win a prize from a contest you never entered',
            'A government grant you should apply for',
            'A marketing offer that is probably legitimate',
        ],
        correct: 1,
        explanation: 'Lottery fraud is one of the oldest scams. You cannot win a prize from a contest you never entered. The "processing fee" is the real goal — once paid, the scammer disappears. Any upfront payment to receive a supposed prize is a scam.',
    },
    {
        id: 23,
        module: 'Scam Responses',
        question: 'You have been chatting online for weeks with someone you have never met in person. They ask you to send money urgently for an "emergency." What should you do?',
        options: [
            'Send the money — they seem trustworthy after weeks of chatting',
            'Never send money to someone you have not met in person; this is likely a romance scam',
            'Send half the amount to test if they are real',
            'Ask them for their bank account details first',
        ],
        correct: 1,
        explanation: 'Romance scams build emotional trust over weeks or months before asking for money. The "emergency" is always fabricated. Scammers may use stolen photos and detailed fake personas. Never send money to someone you have only known online.',
    },
    {
        id: 24,
        module: 'Scam Responses',
        question: 'A job offer requires you to pay upfront for "training materials" or "certification fees" before you can start. This is a sign of:',
        options: [
            'A legitimate company with strict requirements',
            'An advance fee fraud / fake job offer scam',
            'A government employment program',
            'A highly competitive internship',
        ],
        correct: 1,
        explanation: 'Legitimate employers never ask job applicants to pay upfront fees. Advance fee fraud tricks victims into paying for fake "requirements." Once paid, the "employer" vanishes. Research any company before providing personal or financial information.',
    },
    {
        id: 25,
        module: 'Scam Responses',
        question: 'A caller claims to be from the tax authority and threatens immediate arrest unless you wire money within the hour. What should you do?',
        options: [
            'Pay immediately to avoid arrest',
            'Hang up. Government agencies communicate by official mail and never threaten immediate arrest by phone',
            'Ask them for your case number and pay online',
            'Give them your bank account details to verify your identity',
        ],
        correct: 1,
        explanation: 'Government impersonation scams create extreme fear and urgency to force immediate payment. Real government agencies always send official written notices first and never demand wire transfers or gift cards over the phone. This is always a scam.',
    },

    // ── Module 6: Malware Builder Lab ─────────────────────────────────
    {
        id: 26,
        module: 'Malware Builder',
        question: 'What is the FIRST phase of a cyberattack kill chain?',
        options: [
            'Exploitation — attacking the vulnerability',
            'Exfiltration — stealing the data',
            'Reconnaissance — gathering information about the target',
            'Installation — deploying the malware',
        ],
        correct: 2,
        explanation: 'Reconnaissance is the first phase: attackers gather information about the target (employees, technologies, vulnerabilities) before launching the attack. This can include public social media, job listings, and network scanning.',
    },
    {
        id: 27,
        module: 'Malware Builder',
        question: 'In the context of malware, what is a "payload"?',
        options: [
            'The email used to deliver the malware',
            'The malicious code that executes the actual attack after infection',
            'The vulnerability in the target system',
            'The network port the malware uses to communicate',
        ],
        correct: 1,
        explanation: 'The payload is the part of the malware that performs the intended malicious action — encrypting files (ransomware), stealing data (spyware), or opening a backdoor. The delivery mechanism (phishing email, exploit) gets it there; the payload does the damage.',
    },
    {
        id: 28,
        module: 'Malware Builder',
        question: 'What is a Command and Control (C2) server in a malware attack?',
        options: [
            'The victim\'s computer that runs the malware',
            'The antivirus server that detects the malware',
            'A server controlled by the attacker used to send commands to and receive data from infected machines',
            'A firewall that monitors outgoing connections',
        ],
        correct: 2,
        explanation: 'C2 (Command and Control) infrastructure is how attackers communicate with compromised systems. After infection, malware "calls home" to the C2 server to receive instructions (download more malware, encrypt files, exfiltrate data) and send stolen information back.',
    },
    {
        id: 29,
        module: 'Malware Builder',
        question: 'A persistence mechanism in malware is a technique that:',
        options: [
            'Makes the malware spread faster across networks',
            'Allows the malware to survive system reboots and remain active after the computer restarts',
            'Encrypts the malware to hide it from antivirus',
            'Prevents the user from opening Task Manager',
        ],
        correct: 1,
        explanation: 'Persistence ensures the malware survives reboots by adding itself to startup entries, scheduled tasks, registry keys, or system services. Without persistence, malware would be eliminated simply by restarting the computer.',
    },
    {
        id: 30,
        module: 'Malware Builder',
        question: 'The "exfiltration" phase of a cyberattack refers to:',
        options: [
            'Deleting logs to cover the attacker\'s tracks',
            'Installing malware on additional machines',
            'Stealing and transferring the victim\'s data to the attacker\'s server',
            'Scanning the network for open ports',
        ],
        correct: 2,
        explanation: 'Exfiltration is the phase where stolen data (credentials, documents, financial records) is transferred from the victim\'s environment to attacker-controlled infrastructure. Attackers often compress and encrypt data before exfiltration to avoid detection.',
    },
];

const MODULE_COLORS: Record<string, string> = {
    'Data Risks':        'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Security Practices': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Security Guides':   'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'Phishing Signs':    'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Scam Responses':    'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Malware Builder':   'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
};

interface FinalQuizG9LabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const PASSING_SCORE = Math.round(QUESTIONS.length * 0.7); // 21/30

const FinalQuizG9Lab: React.FC<FinalQuizG9LabProps> = ({ onComplete }) => {
    const [showIntro, setShowIntro] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [answered, setAnswered] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);
    const [userName, setUserName] = React.useState(() => localStorage.getItem('cyberlab-username') ?? '');
    const [isGenerating, setIsGenerating] = React.useState(false);

    const question = QUESTIONS[currentIndex];
    const progress = (currentIndex / QUESTIONS.length) * 100;
    const moduleColor = MODULE_COLORS[question?.module] ?? 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5';

    const handleSelect = (optionIndex: number) => {
        if (answered) return;
        setSelected(optionIndex);
        setAnswered(true);
        if (optionIndex === question.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setSelected(null);
        setAnswered(false);
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setCompleted(false);
        setUserName('');
    };

    const passed = score >= PASSING_SCORE;
    const incorrect = QUESTIONS.length - score;

    if (showIntro) {
        return (
            <IntroModal
                slides={INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-secondary"
                borderClass="border-accent-secondary-25"
                bgClass="bg-accent-secondary-5"
                buttonClass="neon-button"
            />
        );
    }

    if (completed) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-10 rounded-full mb-10 shadow-neon border ${passed ? 'bg-accent-secondary-10 text-accent-secondary border-accent-secondary-20' : 'bg-accent-tertiary-10 text-accent-tertiary border-accent-tertiary-20'}`}
                >
                    {passed ? <GraduationCap size={100} /> : <AlertTriangle size={100} />}
                </motion.div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
                    {passed ? 'Final Quiz Complete!' : 'Keep Practicing'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mb-6">
                    {passed
                        ? 'You have demonstrated mastery across all Grado 9 cybersecurity modules.'
                        : `You needed ${PASSING_SCORE} correct answers to pass. Review the modules and try again.`}
                </p>

                <div className={`text-6xl font-mono mb-4 ${passed ? 'text-accent-secondary' : 'text-accent-tertiary'}`}>
                    {score} / {QUESTIONS.length}
                </div>

                <div className="flex items-center gap-8 mb-4">
                    <div className="flex items-center gap-2 text-accent-secondary">
                        <CheckCircle size={20} />
                        <span className="font-bold text-lg">{score} correct</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent-tertiary">
                        <XCircle size={20} />
                        <span className="font-bold text-lg">{incorrect} incorrect</span>
                    </div>
                </div>

                <div className="text-sm text-text-muted mb-12 uppercase tracking-widest">
                    {Math.round((score / QUESTIONS.length) * 100)}% — {passed ? 'PASSED' : 'NOT PASSED'}
                </div>

                {passed ? (
                    <div className="cyber-card p-12 bg-bg-secondary border-accent-secondary-30 max-w-xl w-full mb-10">
                        <h3 className="text-accent-secondary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                            <User className="inline" size={18} /> Enter your name for the certificate
                        </h3>
                        <p className="text-text-muted text-xs mb-4">
                            Your certificate will show: <span className="text-white font-bold">{score} correct · {incorrect} incorrect · {Math.round((score / QUESTIONS.length) * 100)}%</span>
                        </p>
                        <input
                            type="text"
                            placeholder="YOUR FULL NAME"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-black border-2 border-white-10 rounded-2xl py-5 px-8 text-center text-2xl font-black text-white focus:border-accent-secondary focus:shadow-neon outline-none transition-all placeholder:opacity-20 mb-8"
                        />
                        <div className="flex gap-4">
                            <button onClick={handleRestart} className="flex-1 py-5 bg-bg-tertiary border rounded-2xl text-text-muted hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                                RESTART
                            </button>
                            <button
                                disabled={!userName.trim() || isGenerating}
                                onClick={() => {
                                    setIsGenerating(true);
                                    setTimeout(async () => {
                                        const moduleName = 'Grade 9 Final Quiz — Cybersecurity';
                                        await generateCertificate(userName, moduleName, {
                                            correct: score,
                                            incorrect,
                                            total: QUESTIONS.length,
                                        });
                                        onComplete({
                                            moduleId: 'final-quiz-g9',
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
                ) : (
                    <button onClick={handleRestart} className="neon-button py-5 px-16 text-lg">
                        <RotateCcw size={20} className="inline mr-3" /> TRY AGAIN
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1200 mx-auto min-h-full">
            <header className="mb-8">
                <div className="flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-1">
                    Grade 9 — Final Assessment
                </div>
                <h2 className="text-4xl font-extrabold text-white">Comprehensive Cybersecurity Quiz</h2>
                <p className="text-text-secondary">All 6 modules · {QUESTIONS.length} questions · Pass with {PASSING_SCORE} correct ({Math.round((PASSING_SCORE / QUESTIONS.length) * 100)}%)</p>
            </header>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted font-bold uppercase tracking-widest">Question {currentIndex + 1} of {QUESTIONS.length}</span>
                    <span className="text-xs text-accent-secondary font-mono font-bold">{score} correct</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent-secondary rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="cyber-card bg-bg-secondary border p-0 overflow-hidden mb-6"
                >
                    <div className="p-8 border-b bg-bg-tertiary">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest mb-4 ${moduleColor}`}>
                            <Shield size={12} />
                            {question.module}
                        </div>
                        <p className="text-white text-xl font-bold leading-relaxed">{question.question}</p>
                    </div>

                    <div className="p-8 grid grid-cols-1 gap-3">
                        {question.options.map((option, i) => {
                            let style = 'border bg-bg-tertiary text-text-secondary hover:border-accent-secondary hover:text-white hover:bg-accent-secondary-5';
                            if (answered) {
                                if (i === question.correct) {
                                    style = 'border-2 border-accent-secondary bg-accent-secondary-10 text-accent-secondary';
                                } else if (i === selected && selected !== question.correct) {
                                    style = 'border-2 border-accent-tertiary bg-accent-tertiary-10 text-accent-tertiary';
                                } else {
                                    style = 'border bg-bg-tertiary text-text-muted opacity-40';
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    disabled={answered}
                                    className={`w-full text-left px-6 py-4 rounded-xl transition-all font-semibold text-sm flex items-center gap-4 ${style}`}
                                >
                                    <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-black shrink-0">
                                        {answered
                                            ? i === question.correct
                                                ? <CheckCircle size={18} className="text-accent-secondary" />
                                                : i === selected
                                                    ? <XCircle size={18} className="text-accent-tertiary" />
                                                    : String.fromCharCode(65 + i)
                                            : String.fromCharCode(65 + i)}
                                    </span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {answered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mx-8 mb-6 p-5 rounded-xl border text-sm leading-relaxed ${selected === question.correct ? 'bg-accent-secondary-5 border-accent-secondary-20 text-accent-secondary' : 'bg-accent-tertiary-5 border-accent-tertiary-20 text-accent-tertiary'}`}
                        >
                            <span className="font-black uppercase text-xs tracking-widest block mb-2">
                                {selected === question.correct ? '✓ Correct' : '✗ Incorrect'}
                            </span>
                            <span className="text-text-secondary">{question.explanation}</span>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {answered && (
                <div className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="neon-button py-4 px-10 text-base flex items-center gap-3"
                    >
                        {currentIndex < QUESTIONS.length - 1 ? (
                            <><ChevronRight size={20} /> NEXT QUESTION</>
                        ) : (
                            <><GraduationCap size={20} /> SEE RESULTS</>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FinalQuizG9Lab;
