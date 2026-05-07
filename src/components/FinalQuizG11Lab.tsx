import React from 'react';
import { GraduationCap, CheckCircle, XCircle, ChevronRight, Download, RotateCcw, User, Shield, Bug, Network, Globe, Wrench, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <GraduationCap size={40} />,
        subtitle: 'Final Assessment',
        title: 'Grade 11 Comprehensive Quiz',
        body: 'This final quiz evaluates everything you have studied in Grado 11. It covers all 7 modules: Malware Lab, Password Cracking, Phishing Detector, Network Packets, Social Engineering, IP Classification, and Cyber Tools.',
        highlight: '35 questions — 5 per module. Score 70% or higher (25/35) to earn your certificate.',
    },
    {
        icon: <Bug size={40} />,
        subtitle: 'Modules 1–2',
        title: 'Malware & Passwords',
        body: 'You will be tested on malware types (trojans, ransomware, keyloggers, rootkits, worms) and password attack techniques (brute force, dictionary attacks, rainbow tables). Understanding both attack and defense is key.',
        highlight: 'Knowing HOW attacks work is the best way to prevent them.',
    },
    {
        icon: <Network size={40} />,
        subtitle: 'Modules 3–4',
        title: 'Phishing & Networking',
        body: 'Questions on phishing email indicators, URL tricks, and spear phishing — plus networking fundamentals: OSI model layers, TCP handshakes, ARP spoofing, packet sniffing, and firewall concepts.',
        highlight: 'Most breaches start with either a phishing email or an unsecured network.',
    },
    {
        icon: <Globe size={40} />,
        subtitle: 'Modules 5–6',
        title: 'Social Engineering & IP',
        body: 'Social engineering questions cover pretexting, vishing, tailgating, and psychological manipulation. IP classification covers private vs public ranges, loopback, APIPA, broadcast, and IPv6 addresses.',
        highlight: 'Social engineering bypasses all technical defenses — humans are always the weakest link.',
    },
    {
        icon: <Wrench size={40} />,
        subtitle: 'Module 7 · Your mission',
        title: 'Cyber Tools — Final Challenge',
        body: 'The final 5 questions cover VPN usage, VirusTotal, 2FA, secure browsers, and password managers. After completing all 35 questions you will see your score broken down by correct and incorrect answers on your certificate.',
        highlight: 'Your certificate will show your exact score: correct answers, incorrect answers, and final percentage.',
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
    // ── Module 1: Malware Lab ──────────────────────────────────────────
    {
        id: 1,
        module: 'Malware Lab',
        question: 'A program disguises itself as a legitimate video player but secretly opens a backdoor for attackers. What type of malware is this?',
        options: [
            'Ransomware',
            'Trojan horse',
            'Worm',
            'Adware',
        ],
        correct: 1,
        explanation: 'A Trojan horse disguises itself as legitimate software to trick the user into running it. Unlike viruses or worms, it does not self-replicate — it relies on social engineering to be executed.',
    },
    {
        id: 2,
        module: 'Malware Lab',
        question: 'A victim\'s files are encrypted and a ransom note demands payment in cryptocurrency to recover them. What type of malware caused this?',
        options: [
            'Spyware',
            'Keylogger',
            'Ransomware',
            'Rootkit',
        ],
        correct: 2,
        explanation: 'Ransomware encrypts the victim\'s files and demands payment (usually cryptocurrency) for the decryption key. Notable examples include WannaCry and Ryuk.',
    },
    {
        id: 3,
        module: 'Malware Lab',
        question: 'Which type of malware records every keystroke a user makes, including passwords and credit card numbers?',
        options: [
            'Rootkit',
            'Worm',
            'Keylogger',
            'Botnet agent',
        ],
        correct: 2,
        explanation: 'A keylogger silently records all keystrokes, capturing credentials, credit card numbers, and private messages. They can be hardware (physical device on a keyboard) or software-based.',
    },
    {
        id: 4,
        module: 'Malware Lab',
        question: 'Malware that spreads across networks by exploiting vulnerabilities WITHOUT requiring a user to open a file or click a link is called:',
        options: [
            'Virus',
            'Worm',
            'Trojan',
            'Spyware',
        ],
        correct: 1,
        explanation: 'A worm self-replicates and spreads autonomously through networks without user interaction. This makes them especially dangerous — a single infected machine can infect thousands within minutes.',
    },
    {
        id: 5,
        module: 'Malware Lab',
        question: 'Which malware type hides deep in the operating system, making itself and other malware invisible to security tools?',
        options: [
            'Adware',
            'Rootkit',
            'Ransomware',
            'Dropper',
        ],
        correct: 1,
        explanation: 'Rootkits modify the OS kernel or bootloader to hide malicious processes, files, and network connections from security software. They are extremely difficult to detect and remove.',
    },

    // ── Module 2: Password Cracker ─────────────────────────────────────
    {
        id: 6,
        module: 'Password Cracking',
        question: 'An attacker writes a script that tries every possible combination from "0000" to "9999" to unlock a 4-digit PIN. What attack technique is this?',
        options: [
            'Dictionary attack',
            'Rainbow table attack',
            'Brute force attack',
            'Credential stuffing',
        ],
        correct: 2,
        explanation: 'A brute force attack systematically tries every possible combination. A 4-digit numeric PIN has 10,000 combinations (10^4), which is trivially fast for a computer.',
    },
    {
        id: 7,
        module: 'Password Cracking',
        question: 'A 4-digit numeric PIN (digits 0–9) has exactly how many possible combinations?',
        options: [
            '1,000',
            '9,999',
            '10,000',
            '100,000',
        ],
        correct: 2,
        explanation: 'Each of the 4 positions can be 0–9 (10 options), so total combinations = 10 × 10 × 10 × 10 = 10,000. This is why 4-digit PINs are considered weak without lockout mechanisms.',
    },
    {
        id: 8,
        module: 'Password Cracking',
        question: 'An attacker uses a list of commonly used passwords like "password123", "qwerty", and "123456" to attack an account. This is called:',
        options: [
            'Brute force attack',
            'Dictionary attack',
            'Timing attack',
            'Side-channel attack',
        ],
        correct: 1,
        explanation: 'A dictionary attack uses a precompiled list of likely passwords instead of all possible combinations. It is much faster than brute force because most users choose predictable passwords.',
    },
    {
        id: 9,
        module: 'Password Cracking',
        question: 'Which of these passwords is MOST resistant to brute force cracking?',
        options: [
            'maria2005',
            'Password1!',
            'X#9kP@2mQr!vLz',
            'iloveyou123',
        ],
        correct: 2,
        explanation: 'X#9kP@2mQr!vLz is long (14 characters) and uses uppercase, lowercase, digits, and symbols — maximizing the search space. Length is the single most important factor in password strength.',
    },
    {
        id: 10,
        module: 'Password Cracking',
        question: 'A rainbow table attack is most effective against passwords that are:',
        options: [
            'Stored as salted hashes',
            'Stored as plain text',
            'Stored as unsalted hashes',
            'Longer than 20 characters',
        ],
        correct: 2,
        explanation: 'Rainbow tables are precomputed hash-to-password mappings. They only work against unsalted hashes. Adding a salt (random value) to each password before hashing makes rainbow tables useless.',
    },

    // ── Module 3: Phishing Detector ────────────────────────────────────
    {
        id: 11,
        module: 'Phishing Detector',
        question: 'You receive an email saying "YOUR ACCOUNT WILL BE SUSPENDED IN 24 HOURS — click here to verify". What phishing technique is being used?',
        options: [
            'Spear phishing',
            'Urgency and fear manipulation',
            'Whaling',
            'Vishing',
        ],
        correct: 1,
        explanation: 'Creating artificial urgency ("act now or lose access") is a classic phishing technique. It triggers panic and reduces the victim\'s ability to think critically before clicking.',
    },
    {
        id: 12,
        module: 'Phishing Detector',
        question: 'A link in an email shows "paypal.com.login-secure.net/update". Which part reveals this is a phishing site?',
        options: [
            '"paypal.com" appears in the URL',
            'The real domain is "login-secure.net", not PayPal',
            'The path contains "/update"',
            'It uses HTTP instead of HTTPS',
        ],
        correct: 1,
        explanation: 'In a URL, only the part immediately before the first single "/" and after "://" is the real domain. Here the domain is "login-secure.net" — "paypal.com" is just a subdomain used to deceive.',
    },
    {
        id: 13,
        module: 'Phishing Detector',
        question: 'A senior manager at your company receives an email addressed to them by name, referencing their recent project. The attacker researched the target beforehand. This is:',
        options: [
            'Mass phishing',
            'Vishing',
            'Spear phishing',
            'Smishing',
        ],
        correct: 2,
        explanation: 'Spear phishing is a targeted attack against a specific individual, using personalized details to increase credibility. When the target is a senior executive, it\'s called "whaling".',
    },
    {
        id: 14,
        module: 'Phishing Detector',
        question: 'Which of these is NOT typically a red flag indicating a phishing email?',
        options: [
            'Generic greeting like "Dear Customer"',
            'Correct spelling and professional grammar throughout',
            'A link where the displayed text differs from the actual URL',
            'Request to confirm login credentials via email',
        ],
        correct: 1,
        explanation: 'Correct spelling and grammar is NOT a red flag — sophisticated phishing emails are well-written. The red flags are generic greetings, mismatched URLs, and requests for credentials.',
    },
    {
        id: 15,
        module: 'Phishing Detector',
        question: 'Email spoofing means:',
        options: [
            'Sending emails from a Tor-anonymized server',
            'Forging the "From" field to make an email appear to come from a trusted address',
            'Encrypting email content to hide it from filters',
            'Mass-sending identical emails to thousands of addresses',
        ],
        correct: 1,
        explanation: 'Email spoofing forges the "From" header so the email appears to come from a trusted address (e.g., your bank). DMARC, DKIM, and SPF records help email servers detect and reject spoofed messages.',
    },

    // ── Module 4: Network Packet Lab ───────────────────────────────────
    {
        id: 16,
        module: 'Network Packets',
        question: 'At which OSI layer does IP addressing and packet routing occur?',
        options: [
            'Layer 2 — Data Link',
            'Layer 3 — Network',
            'Layer 4 — Transport',
            'Layer 7 — Application',
        ],
        correct: 1,
        explanation: 'Layer 3 (Network) handles logical addressing (IP addresses) and routing between networks. Layer 2 handles MAC addresses within the same network segment.',
    },
    {
        id: 17,
        module: 'Network Packets',
        question: 'What is the correct sequence of the TCP 3-way handshake?',
        options: [
            'ACK → SYN → SYN-ACK',
            'SYN → ACK → SYN-ACK',
            'SYN → SYN-ACK → ACK',
            'SYN-ACK → SYN → ACK',
        ],
        correct: 2,
        explanation: 'The TCP 3-way handshake: (1) Client sends SYN to initiate connection, (2) Server replies SYN-ACK to acknowledge, (3) Client sends ACK to confirm. This establishes a reliable connection.',
    },
    {
        id: 18,
        module: 'Network Packets',
        question: 'ARP spoofing works by:',
        options: [
            'Flooding the network with fake DNS responses',
            'Sending forged ARP replies that link the attacker\'s MAC to a legitimate IP address',
            'Intercepting HTTPS traffic by forging SSL certificates',
            'Overloading the target with SYN packets',
        ],
        correct: 1,
        explanation: 'ARP spoofing sends fake ARP replies poisoning the ARP cache, making other devices send traffic to the attacker\'s machine instead of the legitimate gateway — enabling man-in-the-middle attacks.',
    },
    {
        id: 19,
        module: 'Network Packets',
        question: 'Which protocol resolves an IP address to a MAC address on a local network?',
        options: [
            'DNS',
            'DHCP',
            'ARP',
            'ICMP',
        ],
        correct: 2,
        explanation: 'ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on the local network. When a device wants to communicate, it broadcasts "who has IP X?" and the owner replies with its MAC.',
    },
    {
        id: 20,
        module: 'Network Packets',
        question: 'A packet sniffer placed on a network segment captures all traffic. What layer does it primarily operate at?',
        options: [
            'Layer 7 — Application',
            'Layer 4 — Transport',
            'Layer 2 — Data Link',
            'Layer 1 — Physical',
        ],
        correct: 2,
        explanation: 'Packet sniffers operate at Layer 2 (Data Link), capturing raw frames as they travel across the network. Tools like Wireshark put the NIC into promiscuous mode to capture all traffic, not just destined for that host.',
    },

    // ── Module 5: Social Engineering Pro ──────────────────────────────
    {
        id: 21,
        module: 'Social Engineering',
        question: 'An attacker calls an employee pretending to be IT support and says "We need your password urgently to fix a critical server issue." This technique is called:',
        options: [
            'Tailgating',
            'Pretexting',
            'Baiting',
            'Quid pro quo',
        ],
        correct: 1,
        explanation: 'Pretexting involves creating a fabricated scenario (a pretext) to manipulate the target. Here the attacker creates an IT emergency to justify the unusual request for credentials.',
    },
    {
        id: 22,
        module: 'Social Engineering',
        question: 'Vishing is a form of social engineering that uses:',
        options: [
            'Fake physical USB drives left in parking lots',
            'Voice calls (phone or VoIP) to manipulate victims',
            'Malicious links in text messages',
            'Fake websites that mimic legitimate ones',
        ],
        correct: 1,
        explanation: 'Vishing (voice phishing) uses phone calls or VoIP to impersonate banks, government agencies, or tech support to steal information. Attackers can spoof caller ID to appear legitimate.',
    },
    {
        id: 23,
        module: 'Social Engineering',
        question: 'An attacker physically follows an authorized employee through a secured door without using their own badge. This is called:',
        options: [
            'Shoulder surfing',
            'Dumpster diving',
            'Tailgating (piggybacking)',
            'Impersonation',
        ],
        correct: 2,
        explanation: 'Tailgating (piggybacking) is a physical security attack where an attacker follows an authorized person through a controlled entry point. It bypasses card readers and other electronic access controls.',
    },
    {
        id: 24,
        module: 'Social Engineering',
        question: 'A USB drive labeled "Salaries Q4 2025" is left in the company parking lot. An employee plugs it in out of curiosity and installs malware. What social engineering technique is this?',
        options: [
            'Pretexting',
            'Vishing',
            'Baiting',
            'Pharming',
        ],
        correct: 2,
        explanation: 'Baiting exploits human curiosity by leaving physical media (USB drives, CDs) in places where targets will find them. The label is designed to entice someone to plug it in.',
    },
    {
        id: 25,
        module: 'Social Engineering',
        question: 'What is the BEST defense against social engineering attacks?',
        options: [
            'Installing the latest antivirus software',
            'Using a VPN at all times',
            'Security awareness training and strict verification procedures',
            'Blocking all external email',
        ],
        correct: 2,
        explanation: 'Social engineering targets people, not systems. The best defense is security awareness training — teaching employees to recognize manipulation tactics — combined with strict verification procedures before giving out any information.',
    },

    // ── Module 6: IP Address Classification ───────────────────────────
    {
        id: 26,
        module: 'IP Classification',
        question: 'Which of these IP addresses is a private address per RFC 1918?',
        options: [
            '8.8.8.8',
            '172.32.0.1',
            '192.168.10.5',
            '100.64.0.1',
        ],
        correct: 2,
        explanation: 'RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12 (172.16–172.31), and 192.168.0.0/16. The address 192.168.10.5 falls in the 192.168.0.0/16 range. Note 172.32 is outside the private range.',
    },
    {
        id: 27,
        module: 'IP Classification',
        question: 'What is the IPv4 loopback address used to test the local network stack?',
        options: [
            '0.0.0.0',
            '255.255.255.255',
            '169.254.0.1',
            '127.0.0.1',
        ],
        correct: 3,
        explanation: '127.0.0.1 (and the entire 127.0.0.0/8 block) is the loopback address. Traffic sent to 127.0.0.1 never leaves the host — it loops back through the network stack, used for local testing.',
    },
    {
        id: 28,
        module: 'IP Classification',
        question: 'A computer that cannot reach a DHCP server automatically assigns itself an address in the range 169.254.x.x. This mechanism is called:',
        options: [
            'Static IP assignment',
            'APIPA (Automatic Private IP Addressing)',
            'NAT (Network Address Translation)',
            'DHCP relay',
        ],
        correct: 1,
        explanation: 'APIPA (169.254.0.0/16) is automatically assigned by Windows when DHCP fails. Devices with APIPA addresses can only communicate with other devices in the same 169.254.x.x range on the local segment.',
    },
    {
        id: 29,
        module: 'IP Classification',
        question: 'Which IPv6 address is the equivalent of 127.0.0.1 (loopback) in IPv4?',
        options: [
            'fe80::1',
            '::ffff:127.0.0.1',
            '::1',
            '2001:db8::1',
        ],
        correct: 2,
        explanation: '::1 is the IPv6 loopback address, equivalent to 127.0.0.1. fe80::/10 is the link-local range (APIPA equivalent), and 2001:db8::/32 is reserved for documentation/examples.',
    },
    {
        id: 30,
        module: 'IP Classification',
        question: 'What is the broadcast address for the network 192.168.1.0/24?',
        options: [
            '192.168.1.0',
            '192.168.1.1',
            '192.168.1.254',
            '192.168.1.255',
        ],
        correct: 3,
        explanation: 'In a /24 network (subnet mask 255.255.255.0), the broadcast address is the last address where all host bits are 1. For 192.168.1.0/24, that is 192.168.1.255. The usable host range is .1 to .254.',
    },

    // ── Module 7: Cyber Tools Quiz ─────────────────────────────────────
    {
        id: 31,
        module: 'Cyber Tools',
        question: 'You connect to public Wi-Fi at an airport to check work email. What is the FIRST security action you should take?',
        options: [
            'Enable incognito mode in your browser',
            'Activate your VPN before accessing any service',
            'Disconnect Wi-Fi and use mobile data',
            'Clear your browser cookies',
        ],
        correct: 1,
        explanation: 'On untrusted public Wi-Fi, activate your VPN first. It encrypts all traffic from your device, protecting against sniffing and man-in-the-middle attacks on the local network.',
    },
    {
        id: 32,
        module: 'Cyber Tools',
        question: 'VirusTotal is best described as a tool that:',
        options: [
            'Monitors your network traffic in real time',
            'Scans files and URLs against 70+ antivirus engines simultaneously',
            'Generates secure random passwords',
            'Encrypts your internet connection',
        ],
        correct: 1,
        explanation: 'VirusTotal aggregates results from 70+ antivirus engines and URL scanners. A clean result reduces risk but does not guarantee 100% safety — zero-day threats may not yet be in any database.',
    },
    {
        id: 33,
        module: 'Cyber Tools',
        question: 'Two-Factor Authentication (2FA) protects your account because:',
        options: [
            'It makes your password longer automatically',
            'It requires a second verification factor even if your password is stolen',
            'It encrypts the password before sending it to the server',
            'It blocks brute force attacks by slowing login attempts',
        ],
        correct: 1,
        explanation: '2FA requires something you know (password) plus something you have (phone, hardware key) or something you are (biometric). Even if an attacker steals your password, they cannot log in without the second factor.',
    },
    {
        id: 34,
        module: 'Cyber Tools',
        question: 'What is the PRIMARY purpose of a password manager?',
        options: [
            'To encrypt your hard drive',
            'To scan websites for phishing indicators',
            'To generate and securely store unique, complex passwords for every account',
            'To hide your IP address when browsing',
        ],
        correct: 2,
        explanation: 'A password manager generates strong, unique passwords for every service and stores them in an encrypted vault. This eliminates password reuse — the #1 cause of credential-based breaches.',
    },
    {
        id: 35,
        module: 'Cyber Tools',
        question: 'A colleague asks which browser configuration best protects privacy. Which answer is MOST complete?',
        options: [
            'Use Chrome in incognito mode — it hides all your activity',
            'Use Firefox or Brave with tracker blocking enabled, and install a reputable ad blocker',
            'Use Safari — it is the most secure browser by default',
            'Browser choice does not matter if you use a VPN',
        ],
        correct: 1,
        explanation: 'Firefox and Brave are built with privacy-first architectures. Combined with tracker blocking and a reputable ad blocker, they significantly reduce fingerprinting and tracking. Incognito mode only prevents local history storage — websites still see your IP and fingerprint.',
    },
];

const MODULE_COLORS: Record<string, string> = {
    'Malware Lab':        'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'Password Cracking':  'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Phishing Detector':  'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Network Packets':    'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Social Engineering': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'IP Classification':  'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Cyber Tools':        'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
};

interface FinalQuizG11LabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const PASSING_SCORE = Math.round(QUESTIONS.length * 0.7); // 25/35

const FinalQuizG11Lab: React.FC<FinalQuizG11LabProps> = ({ onComplete }) => {
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
    const moduleColor = MODULE_COLORS[question?.module] ?? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5';

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
                    className={`p-10 rounded-full mb-10 shadow-neon border ${passed ? 'bg-accent-primary-10 text-accent-primary border-accent-primary-20' : 'bg-accent-tertiary-10 text-accent-tertiary border-accent-tertiary-20'}`}
                >
                    {passed ? <GraduationCap size={100} /> : <AlertTriangle size={100} />}
                </motion.div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
                    {passed ? 'Final Quiz Complete!' : 'Keep Practicing'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mb-6">
                    {passed
                        ? 'You have demonstrated mastery across all Grado 11 cybersecurity modules.'
                        : `You needed ${PASSING_SCORE} correct answers to pass. Review the modules and try again.`}
                </p>

                <div className={`text-6xl font-mono mb-4 ${passed ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                    {score} / {QUESTIONS.length}
                </div>

                {/* Score breakdown */}
                <div className="flex items-center gap-8 mb-4">
                    <div className="flex items-center gap-2 text-accent-primary">
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
                    <div className="cyber-card p-12 bg-bg-secondary border-accent-primary-30 max-w-xl w-full mb-10">
                        <h3 className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
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
                                        const moduleName = 'Grade 11 Final Quiz — Cybersecurity';
                                        await generateCertificate(userName, moduleName, {
                                            correct: score,
                                            incorrect,
                                            total: QUESTIONS.length,
                                        });
                                        onComplete({
                                            moduleId: 'final-quiz-g11',
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
                    Grade 11 — Final Assessment
                </div>
                <h2 className="text-4xl font-extrabold text-white">Comprehensive Cybersecurity Quiz</h2>
                <p className="text-text-secondary">All 7 modules · {QUESTIONS.length} questions · Pass with {PASSING_SCORE} correct ({Math.round((PASSING_SCORE / QUESTIONS.length) * 100)}%)</p>
            </header>

            {/* Progress bar */}
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
                                    style = 'border-2 border-accent-primary bg-accent-primary-10 text-accent-primary';
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
                                                ? <CheckCircle size={18} className="text-accent-primary" />
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
                            className={`mx-8 mb-6 p-5 rounded-xl border text-sm leading-relaxed ${selected === question.correct ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary' : 'bg-accent-tertiary-5 border-accent-tertiary-20 text-accent-tertiary'}`}
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

export default FinalQuizG11Lab;
