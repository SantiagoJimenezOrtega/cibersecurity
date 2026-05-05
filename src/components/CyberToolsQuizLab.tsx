import React from 'react';
import { Shield, CheckCircle, XCircle, ChevronRight, Download, RotateCcw, User, Lock, Globe, Eye, ShieldCheck, Zap, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <Shield size={40} />,
        subtitle: 'Cybersecurity tools',
        title: 'Your Digital Defense Arsenal',
        body: 'A security professional does not just know the attacks — they know exactly which tool to use in each situation. VPNs, password managers, secure browsers, URL checkers: each has a specific purpose and a correct moment of use.',
        highlight: '95% of security incidents are preventable with the correct use of freely available tools.',
    },
    {
        icon: <Lock size={40} />,
        subtitle: 'Passwords and managers',
        title: 'The First Line of Defense',
        body: 'A weak password is an open door. Password managers generate and store unique, complex credentials for every service. Combined with two-factor authentication (2FA), they make unauthorized access nearly impossible.',
        highlight: 'Reusing passwords is the #1 mistake: if one site is breached, every other account you use that password on is exposed.',
    },
    {
        icon: <Globe size={40} />,
        subtitle: 'VPN and safe browsing',
        title: 'Protect Your Traffic',
        body: 'A VPN encrypts your connection and hides your real IP — essential on public Wi-Fi. Secure browsers like Firefox or Brave block trackers, fingerprinting, and malicious ads that commercial browsers allow by default.',
        highlight: 'A VPN does not make you anonymous — it protects you on untrusted networks. For real anonymity you need Tor.',
    },
    {
        icon: <Eye size={40} />,
        subtitle: 'Threat verification',
        title: 'Before You Click, Verify',
        body: 'VirusTotal scans files and URLs against 70+ antivirus engines simultaneously. URL checkers like URLVoid detect phishing, malware, and domain reputation before you visit the site.',
        highlight: 'A clean result on VirusTotal does not guarantee 100% safety — some zero-day malware is not yet in the databases.',
    },
    {
        icon: <Zap size={40} />,
        subtitle: 'Your mission',
        title: '30 Questions — 50 Minutes',
        body: 'You will be tested on when and how to use each tool. Every question presents a real-world scenario with four options. Read carefully — details matter in cybersecurity.',
        highlight: 'Score 70% or higher (21/30) to demonstrate professional competence in security tools.',
    },
];

interface Question {
    id: number;
    category: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const QUESTIONS: Question[] = [
    // ── VPN ──────────────────────────────────────────────────
    {
        id: 1,
        category: 'VPN',
        question: 'You are at a café and need to access your bank account over public Wi-Fi. What is the safest action?',
        options: [
            'Connect directly — the bank uses HTTPS so you are already protected',
            'Activate your VPN first, then access the bank',
            'Use the browser\'s incognito mode',
            'Change the Wi-Fi password before connecting',
        ],
        correct: 1,
        explanation: 'HTTPS only encrypts traffic between you and the server, but does not protect against man-in-the-middle (MITM) attacks on untrusted local networks. A VPN encrypts all your traffic from the device — including DNS — protecting you from the Wi-Fi operator.',
    },
    {
        id: 2,
        category: 'VPN',
        question: 'Which of these statements about VPNs is CORRECT?',
        options: [
            'A VPN makes you completely anonymous on the internet',
            'A VPN protects your traffic from being intercepted on untrusted local networks',
            'A VPN prevents websites from tracking your cookies',
            'A VPN always speeds up your internet connection',
        ],
        correct: 1,
        explanation: 'A VPN encrypts your traffic between your device and the VPN server, protecting you on untrusted networks. It does not make you anonymous (the VPN provider can see your traffic), does not remove cookies, and typically adds latency rather than speed.',
    },
    {
        id: 3,
        category: 'VPN',
        question: 'Your company requires you to use a corporate VPN to access internal servers from home. Why is this measure necessary?',
        options: [
            'So the company can monitor your personal browsing',
            'To create an encrypted tunnel that extends the corporate private network to your home connection',
            'To block websites unrelated to work',
            'To increase download speed for corporate files',
        ],
        correct: 1,
        explanation: 'The corporate VPN creates an encrypted tunnel between your device and the company\'s internal network, allowing your computer to act as if it were physically inside the office — accessing internal resources not exposed to the public internet.',
    },
    {
        id: 4,
        category: 'VPN',
        question: 'In which of these scenarios is a VPN NOT the primary tool you need?',
        options: [
            'Accessing geo-blocked content from another country',
            'Browsing privately on airport Wi-Fi',
            'Removing a virus already installed on your computer',
            'Hiding your activity from your ISP',
        ],
        correct: 2,
        explanation: 'To remove malware already installed you need antivirus/antimalware software, not a VPN. A VPN protects network traffic but cannot detect or remove malicious software on your local device.',
    },
    // ── Password Managers ─────────────────────────────────────
    {
        id: 5,
        category: 'Password Managers',
        question: 'What is the main advantage of using a password manager like Bitwarden or 1Password?',
        options: [
            'It lets you use the same strong password on every site',
            'It generates and stores unique, complex passwords for each account without you having to memorize them',
            'It saves your passwords in an encrypted text file on your desktop',
            'It automatically shares your passwords with trusted contacts',
        ],
        correct: 1,
        explanation: 'The key benefit is having unique, long, random passwords for every account without memorizing them — you only need one strong master password. This eliminates the risk of a breach on one site compromising other accounts.',
    },
    {
        id: 6,
        category: 'Password Managers',
        question: 'Your password manager master password is "My_Dog_Is_Named_Toby2019". A colleague says it is weak because it contains dictionary words. Who is right?',
        options: [
            'Your colleague — any password with common words is weak',
            'You — a long passphrase with variations is more resistant than a short random character string',
            'Neither — only length and numbers matter',
            'Your colleague — you must use only special characters like @#$%',
        ],
        correct: 1,
        explanation: 'Long passphrases are extremely resistant. With 30+ characters, the computational cost of a brute-force attack is astronomical. A short random string like "Xk!9mP" is actually easier to crack than a long phrase, even if the phrase contains common words.',
    },
    {
        id: 7,
        category: 'Password Managers',
        question: 'You receive an email: "We detected suspicious activity on your Bitwarden. Click here to verify your master password." What do you do?',
        options: [
            'Click and verify immediately — security is top priority',
            'Ignore the email and go directly to bitwarden.com to review your account',
            'Change your master password using the link in the email',
            'Forward the email to your contacts so they are also alerted',
        ],
        correct: 1,
        explanation: 'This is a classic phishing attack targeting password manager users. Never click links in security emails — always go directly to the official site by typing the URL. Legitimate password managers will never ask for your master password via email.',
    },
    {
        id: 8,
        category: 'Password Managers',
        question: 'What does the "password audit" feature included in most password managers do?',
        options: [
            'Automatically changes all your passwords every 30 days',
            'Identifies reused, weak, or compromised passwords that appear in known breach databases',
            'Checks whether the websites you use have an SSL certificate',
            'Generates a report to share with your employer',
        ],
        correct: 1,
        explanation: 'Password auditing cross-references your credentials against databases like HaveIBeenPwned, flags reused passwords across sites, identifies short or simple passwords, and alerts you to change them before they are exploited.',
    },
    // ── Secure Passwords ──────────────────────────────────────
    {
        id: 9,
        category: 'Secure Passwords',
        question: 'Which of these passwords is the MOST SECURE for a critical account?',
        options: [
            'Colombia2024!',
            'Tr0ub4dor&3',
            'hV$9kP!mQx2#nL7@wE4z',
            'admin123',
        ],
        correct: 2,
        explanation: '"hV$9kP!mQx2#nL7@wE4z" is the most secure: 20 characters with uppercase, lowercase, numbers, and symbols in no recognizable pattern. "Colombia2024!" uses predictable information. "Tr0ub4dor&3" is popular and appears in attack dictionaries. "admin123" is trivial.',
    },
    {
        id: 10,
        category: 'Secure Passwords',
        question: 'How long does it typically take a modern brute-force attack (using a GPU) to crack an 8-character password using only lowercase letters?',
        options: [
            'Several years',
            'Several months',
            'Less than a day',
            'Several decades',
        ],
        correct: 2,
        explanation: 'With modern hardware (GPU), an 8-character lowercase-only password (26^8 ≈ 200 billion combinations) can be cracked in minutes to hours. Adding uppercase, numbers, symbols, and extending to 12+ characters pushes the time to decades or centuries.',
    },
    {
        id: 11,
        category: 'Secure Passwords',
        question: 'Your email service forces you to change your password every 90 days. According to modern NIST guidelines, is this a good practice?',
        options: [
            'Yes — changing passwords frequently always improves security',
            'No — forced rotation leads to predictable patterns like "Company2024" → "Company2025"',
            'Only if the password has fewer than 8 characters',
            'Yes, but only for banking accounts',
        ],
        correct: 1,
        explanation: 'NIST (SP 800-63B) no longer recommends mandatory periodic password rotation. Users tend to create predictable variations. The current recommendation: long unique passwords, changed only when there is evidence of compromise, with 2FA enabled.',
    },
    {
        id: 12,
        category: 'Secure Passwords',
        question: 'What is a "credential stuffing" attack?',
        options: [
            'Guessing passwords by trying every possible combination',
            'Using stolen username/password lists from one breach to try access on other services',
            'Installing a keylogger to capture what the user types',
            'Tricking a user into revealing their password over the phone',
        ],
        correct: 1,
        explanation: 'Credential stuffing exploits password reuse. Attackers take millions of credentials leaked from one breach (e.g., a delivery app) and automatically test them on banks, email, and other services. The only effective defense is unique passwords per site combined with 2FA.',
    },
    // ── Secure Browsers ───────────────────────────────────────
    {
        id: 13,
        category: 'Secure Browsers',
        question: 'What is the main difference between Firefox with uBlock Origin and Chrome without privacy extensions?',
        options: [
            'Firefox is slower but downloads files faster',
            'Firefox blocks third-party trackers by default; Chrome allows Google and partners to track your activity across sites',
            'Chrome has better support for modern web standards',
            'There is no significant privacy difference between the two browsers',
        ],
        correct: 1,
        explanation: 'Firefox with uBlock Origin blocks cross-site trackers, fingerprinting, and malicious ads. Chrome, developed by Google (an advertising company), allows more tracking by default. Brave goes even further by blocking tracking scripts at the browser engine level.',
    },
    {
        id: 14,
        category: 'Secure Browsers',
        question: 'You visit a site and the browser shows a padlock next to the URL (HTTPS). Does this guarantee the site is legitimate and safe?',
        options: [
            'Yes — HTTPS guarantees the site is authentic and not malicious',
            'No — HTTPS only encrypts the connection; a phishing site can have a valid SSL certificate',
            'Yes — sites with HTTPS are verified by the government',
            'No — HTTPS is no longer relevant to modern web security',
        ],
        correct: 1,
        explanation: 'HTTPS only guarantees the connection is encrypted and the domain matches the certificate. An attacker can create "https://paypa1.com" with a valid free SSL certificate. The padlock does not validate legitimacy — always check the full URL carefully.',
    },
    {
        id: 15,
        category: 'Secure Browsers',
        question: 'What does the browser\'s incognito / private mode actually do?',
        options: [
            'It hides your activity from your internet service provider (ISP)',
            'It does not save browsing history, cookies, or form data on the local device',
            'It protects against viruses and malware during the session',
            'It makes you invisible to the websites you visit',
        ],
        correct: 1,
        explanation: 'Incognito mode only prevents the browser from saving history, cookies, and cache on your device. Your ISP, employer (if using a company network), and the websites you visit can still see your activity. It provides no network privacy and no malware protection.',
    },
    {
        id: 16,
        category: 'Secure Browsers',
        question: 'Which browser extension represents the greatest security risk if installed without verification?',
        options: [
            'An ad blocker from a well-known company',
            'A "translator" extension from an unknown source that requests permission to read and modify all data on every site',
            'The official Bitwarden password manager extension',
            'Your bank\'s official extension for secure payments',
        ],
        correct: 1,
        explanation: 'Extensions with permission to "read and modify all data on all websites" from unknown sources are extremely dangerous. They can steal passwords, intercept banking sessions, and inject malicious code into any page you visit. Only install extensions from verified, trusted sources.',
    },
    // ── VirusTotal ────────────────────────────────────────────
    {
        id: 17,
        category: 'VirusTotal',
        question: 'You download an executable file (.exe) from the internet. What is the correct procedure using VirusTotal?',
        options: [
            'Run the file first and upload it to VirusTotal if your antivirus detects it',
            'Upload the file to VirusTotal BEFORE running it and review the results from 70+ engines',
            'VirusTotal only works for URLs, not files',
            'Upload the file and run it if at least 1 engine says it is clean',
        ],
        correct: 1,
        explanation: 'Always analyze files BEFORE executing them. VirusTotal runs the file against 70+ antivirus engines simultaneously. If several engines flag it as malicious, do not run it. Even if "clean," proceed with caution for files from unknown sources — zero-day malware may not yet be cataloged.',
    },
    {
        id: 18,
        category: 'VirusTotal',
        question: 'You upload a file to VirusTotal and 3 out of 72 engines flag it as suspicious. The other 69 say it is clean. How do you interpret this result?',
        options: [
            'The file is definitely malicious — any detection is a danger signal',
            'The file is definitely safe — the majority approves it',
            'Likely a false positive, but if the file is from an unknown source, investigate further before running it',
            'VirusTotal has a bug — you should upload the file again',
        ],
        correct: 2,
        explanation: '1–3 detections when the majority is clean are frequently false positives, especially for new legitimate software. However, if the file is from an unknown or suspicious origin, investigate further: search the filename, verify the SHA256 hash, and consider not running it.',
    },
    {
        id: 19,
        category: 'VirusTotal',
        question: 'What additional valuable information does VirusTotal provide beyond antivirus scanning?',
        options: [
            'It only shows whether the file has a virus or not',
            'It shows file behavior, relationships with other files/IPs, metadata, and detection history over time',
            'It automatically repairs infected files',
            'It blocks malicious files before they reach your computer',
        ],
        correct: 1,
        explanation: 'VirusTotal is far more than a scanner: it shows sandbox behavior analysis, relationships to domains/IPs/related files, metadata (compilation date, internal strings), and the timeline of detection changes. This information is invaluable for forensic analysis.',
    },
    {
        id: 20,
        category: 'VirusTotal',
        question: 'A security researcher warns you: "Do not upload confidential documents to VirusTotal." Why?',
        options: [
            'VirusTotal charges extra for documents with private data',
            'Uploaded files are shared with VirusTotal\'s partners and can be downloaded by other researchers',
            'VirusTotal can only analyze executable files (.exe)',
            'There is no reason — VirusTotal is completely private',
        ],
        correct: 1,
        explanation: 'VirusTotal shares samples with its security-company partners, and files can be accessed by researchers with premium accounts. Never upload documents containing personal data, confidential contracts, proprietary source code, or any sensitive information.',
    },
    // ── URL Checkers ──────────────────────────────────────────
    {
        id: 21,
        category: 'URL Checkers',
        question: 'You receive the link "http://amaz0n-deals.com/50-off". What tool would you use to verify it before clicking?',
        options: [
            'Google Maps — to see if the company exists physically',
            'URLVoid or VirusTotal to check the domain\'s reputation and safety',
            'Simply search the domain on Google',
            'Copy the URL into a WhatsApp chat for others to review',
        ],
        correct: 1,
        explanation: 'URLVoid, VirusTotal, and URLScan.io check domain reputation against multiple phishing and malware databases. In this case, "amaz0n" uses a zero instead of the letter "o" — a classic typosquatting technique. Never click URLs with character substitutions.',
    },
    {
        id: 22,
        category: 'URL Checkers',
        question: 'What is "typosquatting" in the context of malicious URLs?',
        options: [
            'Registering domains with common typos to trap users who mistype the URL',
            'An attack that modifies network packets to change the destination URL',
            'Using very long URLs to hide the real destination',
            'Creating subdomains that look like legitimate domains (e.g., paypal.com.malicious.xyz)',
        ],
        correct: 0,
        explanation: 'Typosquatting registers domains like "gooogle.com," "faceboook.com," or "paypa1.com" to catch users who mistype the URL. When the user lands on the fake site, it looks legitimate and can steal credentials. Always verify the full URL before entering any data.',
    },
    {
        id: 23,
        category: 'URL Checkers',
        question: 'You use a URL shortener (bit.ly) to share a link. Why can this represent a security risk?',
        options: [
            'URL shorteners always add malware to links',
            'They hide the real destination, making it impossible to verify the URL before clicking',
            'URL shorteners only work in insecure browsers',
            'URL shorteners reveal your IP address to the recipient',
        ],
        correct: 1,
        explanation: 'URL shorteners hide the real destination. A link like "bit.ly/xK3m9" can lead anywhere, including phishing or malware sites. Use services like checkshorturl.com, or add "+" to the end of bit.ly links (bit.ly/xK3m9+) to preview the destination before visiting.',
    },
    {
        id: 24,
        category: 'URL Checkers',
        question: 'You analyze a URL with URLScan.io and see the domain was registered 2 days ago, has a valid SSL certificate, and its content mimics your bank\'s login page. What do you conclude?',
        options: [
            'It is safe because it has an SSL certificate',
            'It is almost certainly a phishing site — new domain + bank imitation = critical red flags',
            'It is probably a bank testing environment',
            'There is not enough information to draw any conclusion',
        ],
        correct: 1,
        explanation: 'Newly created domain + visual copy of a bank = phishing with high confidence. Attackers buy fresh domains for each campaign (to avoid accumulated bad reputation) and can get free SSL from Let\'s Encrypt in minutes. Report the site and do not enter any data.',
    },
    // ── 2FA / MFA ─────────────────────────────────────────────
    {
        id: 25,
        category: '2FA / MFA',
        question: 'Which of these second-factor (2FA) options is the MOST SECURE?',
        options: [
            'SMS code sent to a mobile phone',
            'Verification email sent to your email account',
            'Authenticator app (Google Authenticator, Authy) based on TOTP',
            'Security question like "What was your first pet\'s name?"',
        ],
        correct: 2,
        explanation: 'TOTP (Time-based One-Time Password) authenticator apps are more secure than SMS or email because codes are generated locally and cannot be intercepted via SIM-swapping. Security questions are the weakest method — answers are often publicly available or guessable.',
    },
    {
        id: 26,
        category: '2FA / MFA',
        question: 'What is a "SIM swapping" attack and how does it compromise SMS-based 2FA?',
        options: [
            'A physical attack to steal the SIM card from the victim\'s phone',
            'Tricking the mobile carrier into transferring the victim\'s number to an attacker\'s SIM, intercepting their SMS verification codes',
            'A virus that intercepts SMS messages on the device',
            'Cloning the phone\'s Bluetooth signal to receive SMS on another device',
        ],
        correct: 1,
        explanation: 'In SIM swapping, the attacker calls the carrier impersonating the victim (using data stolen from social media) and transfers the phone number to a new SIM. From that point they receive all SMS including 2FA codes for banking and email — making SMS-based 2FA vulnerable.',
    },
    // ── Antivirus / Firewall ──────────────────────────────────
    {
        id: 27,
        category: 'Antivirus & Firewall',
        question: 'What is the fundamental difference between an antivirus and a firewall?',
        options: [
            'Antivirus is paid and firewall is free',
            'Antivirus detects and removes malware on the system; a firewall controls incoming and outgoing network traffic',
            'The firewall protects against viruses and the antivirus protects against hackers',
            'They are the same tool with different names',
        ],
        correct: 1,
        explanation: 'Antivirus scans files and processes for known malicious code. A firewall acts as a network traffic guard, blocking unauthorized connections. They are complementary: antivirus protects against threats on the device, the firewall controls what enters and leaves through the network.',
    },
    {
        id: 28,
        category: 'Antivirus & Firewall',
        question: 'Your antivirus detects nothing suspicious, but you notice your computer is sending unusual traffic to unknown IPs at 3 AM. What type of threat could this be?',
        options: [
            'Not a threat — the antivirus says everything is fine',
            'Possibly a zero-day malware or APT (Advanced Persistent Threat) that the antivirus does not yet have in its signature database',
            'The operating system sending automatic updates',
            'Definitely the ISP performing network maintenance',
        ],
        correct: 1,
        explanation: 'Signature-based antivirus does not detect new (zero-day) malware or APTs designed to evade detection. Unexplained outbound traffic to unknown IPs at unusual hours is a strong indicator of compromise. Response: network behavior analysis, EDR (Endpoint Detection & Response), and isolating the machine.',
    },
    // ── Integrated Scenarios ──────────────────────────────────
    {
        id: 29,
        category: 'Integrated Scenario',
        question: 'A colleague sends you via WhatsApp: "Urgent! Your account was hacked. Click bit.ly/r3c0ver-acc to recover it within 10 minutes." What is the correct response?',
        options: [
            'Click immediately — 10 minutes is too short to think',
            'Expand the URL with CheckShortURL, call your colleague directly to confirm they sent it, and check your account from the official site',
            'Forward the message to 5 friends to help you decide',
            'Reply to the message asking for more information',
        ],
        correct: 1,
        explanation: 'This is an urgency attack with multiple red flags: shortened URL, extreme time pressure ("10 minutes"), sent via informal channel. Correct procedure: 1) Do not click. 2) Expand the URL first. 3) Verify with your colleague via phone call. 4) Log in to your account from the official URL.',
    },
    {
        id: 30,
        category: 'Integrated Scenario',
        question: 'Which combination of tools and practices represents the most complete "security posture" for an everyday user?',
        options: [
            'Just a good paid antivirus',
            'VPN + password manager + 2FA on critical accounts + privacy-focused browser + verify suspicious URLs',
            'Changing passwords every week and not saving them anywhere',
            'Never downloading anything and only using pre-installed apps',
        ],
        correct: 1,
        explanation: 'Layered security is the correct approach. VPN protects on untrusted networks, password manager ensures unique strong credentials, 2FA blocks access even if your password is stolen, a configured browser reduces tracking and malicious ads, and URL verification prevents phishing. No single tool is enough on its own.',
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    'VPN': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Password Managers': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Secure Passwords': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Secure Browsers': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'VirusTotal': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'URL Checkers': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    '2FA / MFA': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Antivirus & Firewall': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Integrated Scenario': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
};

interface CyberToolsQuizLabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const CyberToolsQuizLab: React.FC<CyberToolsQuizLabProps> = ({ onComplete }) => {
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
    const categoryColor = CATEGORY_COLORS[question?.category] ?? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5';

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

    const passing = Math.round(QUESTIONS.length * 0.7);
    const passed = score >= passing;

    if (showIntro) {
        return (
            <IntroModal
                slides={INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-primary"
                borderClass="border-accent-primary-25"
                bgClass="bg-accent-primary-5"
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
                    className={`p-10 rounded-full mb-10 shadow-neon border ${passed ? 'bg-accent-primary-10 text-accent-primary border-accent-primary-20' : 'bg-accent-tertiary-10 text-accent-tertiary border-accent-tertiary-20'}`}
                >
                    {passed ? <ShieldCheck size={100} /> : <AlertTriangle size={100} />}
                </motion.div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
                    {passed ? 'Quiz Complete!' : 'Keep Practicing'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mb-6">
                    {passed
                        ? 'You demonstrated competence in the correct use of cybersecurity tools.'
                        : `You needed ${passing} correct answers to pass. Review the topics and try again.`}
                </p>

                <div className={`text-6xl font-mono mb-4 ${passed ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                    {score} / {QUESTIONS.length}
                </div>
                <div className="text-sm text-text-muted mb-12 uppercase tracking-widest">
                    {Math.round((score / QUESTIONS.length) * 100)}% — {passed ? 'PASSED' : 'NOT PASSED'}
                </div>

                {passed ? (
                    <div className="cyber-card p-12 bg-bg-secondary border-accent-primary-30 max-w-xl w-full mb-10">
                        <h3 className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                            <User className="inline" size={18} /> Enter your name for the certificate
                        </h3>
                        <input
                            type="text"
                            placeholder="YOUR FULL NAME"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-black border-2 border-white-10 rounded-2xl py-5 px-8 text-center text-2xl font-black text-white focus:border-accent-primary focus:shadow-neon outline-none transition-all placeholder:opacity-20 mb-8"
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
                                        const moduleName = 'Cyber Tools Quiz — Grade 11';
                                        await generateCertificate(userName, moduleName);
                                        onComplete({
                                            moduleId: 'cyber-tools-quiz',
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
                <div className="flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest mb-1">
                    Grade 11 — Cybersecurity Tools
                </div>
                <h2 className="text-4xl font-extrabold text-white">Quiz: Correct Use of Security Tools</h2>
                <p className="text-text-secondary">Prove you know when and how to apply each security tool.</p>
            </header>

            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted font-bold uppercase tracking-widest">Question {currentIndex + 1} of {QUESTIONS.length}</span>
                    <span className="text-xs text-accent-primary font-mono font-bold">{score} correct</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent-primary rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </div>

            {/* Question card */}
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
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest mb-4 ${categoryColor}`}>
                            <Shield size={12} />
                            {question.category}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-relaxed">{question.question}</h3>
                    </div>

                    <div className="p-8 grid grid-cols-1 gap-3">
                        {question.options.map((option, i) => {
                            const isCorrect = i === question.correct;
                            const isSelected = i === selected;
                            let cls = 'border-white-10 text-text-secondary hover:border-accent-primary hover:text-white hover:bg-accent-primary-5 cursor-pointer';

                            if (answered) {
                                if (isCorrect) {
                                    cls = 'border-accent-primary bg-accent-primary-10 text-white cursor-default';
                                } else if (isSelected && !isCorrect) {
                                    cls = 'border-accent-tertiary bg-accent-tertiary-10 text-accent-tertiary cursor-default';
                                } else {
                                    cls = 'border-white-5 text-text-muted cursor-default opacity-50';
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    disabled={answered}
                                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${cls}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 border ${
                                        answered && isCorrect ? 'bg-accent-primary border-accent-primary text-bg-primary' :
                                        answered && isSelected && !isCorrect ? 'bg-accent-tertiary border-accent-tertiary text-white' :
                                        'bg-bg-tertiary border-white-10'
                                    }`}>
                                        {answered && isCorrect ? <CheckCircle size={16} /> :
                                         answered && isSelected && !isCorrect ? <XCircle size={16} /> :
                                         String.fromCharCode(65 + i)}
                                    </div>
                                    <span className="font-medium leading-relaxed">{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {answered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mx-8 mb-8 p-6 rounded-2xl border flex gap-4 ${
                                    selected === question.correct
                                        ? 'bg-accent-primary-5 border-accent-primary-20'
                                        : 'bg-accent-tertiary-5 border-accent-tertiary-20'
                                }`}
                            >
                                <HelpCircle className={`shrink-0 mt-0.5 ${selected === question.correct ? 'text-accent-primary' : 'text-accent-tertiary'}`} size={20} />
                                <div>
                                    <p className={`font-bold text-sm mb-1 uppercase tracking-widest ${selected === question.correct ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                                        {selected === question.correct ? 'Correct!' : 'Incorrect'}
                                    </p>
                                    <p className="text-text-secondary text-sm leading-relaxed">{question.explanation}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="neon-button px-12 py-4 text-base flex items-center gap-3"
                    >
                        {currentIndex < QUESTIONS.length - 1 ? 'NEXT QUESTION' : 'SEE RESULTS'}
                        <ChevronRight size={20} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default CyberToolsQuizLab;
