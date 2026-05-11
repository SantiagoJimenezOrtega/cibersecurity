import React, { useEffect } from 'react';
import { AlertTriangle, GraduationCap, CheckCircle, XCircle, Download, RotateCcw, User, Clock, Briefcase, Smartphone, Shield, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <AlertTriangle size={40} />,
        subtitle: 'Real-World Module',
        title: 'Cyber Risk Situations',
        body: 'You will face 20 realistic cybersecurity scenarios drawn from actual incidents. Each tests your ability to identify the threat, understand its impact, and choose the correct response.',
        highlight: '20 scenario-based questions — 45 minutes. Score 70% or higher (14/20) to earn your certificate.',
    },
    {
        icon: <Briefcase size={40} />,
        subtitle: 'Topics 1–2',
        title: 'Workplace & Social Threats',
        body: 'Scenarios cover insider threats, BYOD risks, business email compromise (BEC), and data classification errors — plus social media OSINT, deepfakes, credential stuffing, and tech support scams.',
        highlight: 'Over 60% of breaches involve an insider or social engineering component.',
    },
    {
        icon: <Smartphone size={40} />,
        subtitle: 'Topics 3–4',
        title: 'Device Security & Incident Response',
        body: 'Real situations involving Evil Twin attacks, physical security failures, IoT vulnerabilities, and BYOD risks — plus the correct steps when a breach happens: containment, forensics, notification.',
        highlight: 'Knowing what to do in the first 60 minutes of an incident determines the outcome.',
    },
    {
        icon: <Shield size={40} />,
        subtitle: 'Your Mission',
        title: 'Think Like a Security Analyst',
        body: 'Each question includes a small hint about the concept being tested. Read the scenario carefully and use the hint to guide your thinking. Your certificate will show your exact score.',
        highlight: 'Real security is about judgment, not just memorizing rules.',
    },
];

interface Question {
    id: number;
    category: string;
    scenario: string;
    hint: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    'Workplace Threats': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Social & Personal':  'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Device & Network':   'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'Incident Response':  'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
};

const QUESTIONS: Question[] = [
    // ── Workplace Threats ──────────────────────────────────────────────
    {
        id: 1,
        category: 'Workplace Threats',
        scenario: 'An employee receives an email appearing to come from the CEO requesting an urgent wire transfer of $47,000 to a new vendor. The sender address is "ceo@company-corp.net" — the real company domain is company.com.',
        hint: 'Attackers register lookalike domains — one letter different from the real company. Always verify financial requests through a separate channel such as a direct phone call, never by replying to the same email.',
        question: 'What type of attack is this, and what should the employee do?',
        options: [
            'It is a phishing email — delete it and ignore it completely',
            'It is Business Email Compromise (BEC) — verify through a separate channel such as a direct phone call before any action',
            'It is a legitimate request since the CEO is authorized to order wire transfers',
            'It is ransomware — disconnect from the network immediately',
        ],
        correct: 1,
        explanation: 'This is Business Email Compromise (BEC) — attackers register lookalike domains to impersonate executives. Never initiate a wire transfer based solely on an email. Verify by calling the CEO directly on a known, pre-existing number. BEC costs businesses over $2.9 billion annually according to FBI IC3 data.',
    },
    {
        id: 2,
        category: 'Workplace Threats',
        scenario: 'A nurse at a hospital accesses the patient records of a celebrity who was recently admitted — out of curiosity, not for any treatment purpose. She does not share the records with anyone.',
        hint: 'Privacy laws like HIPAA govern HOW data is accessed, not only whether it is shared externally. Accessing records without a legitimate clinical need is a violation even if nothing is disclosed to anyone.',
        question: 'Has a security incident occurred?',
        options: [
            'No — she did not share the data, so no harm was done',
            'No — hospital employees are authorized to access all patient records in the system',
            'Yes — accessing records without a legitimate treatment purpose violates HIPAA and constitutes a data breach',
            'Only if the celebrity files a complaint — otherwise no action is required',
        ],
        correct: 2,
        explanation: 'This is a HIPAA violation and a breach regardless of whether the data was shared. Viewing records without a legitimate clinical need is unauthorized access. Healthcare workers can face termination, civil penalties, and criminal charges for "snooping." Minimum necessary access is a core HIPAA principle.',
    },
    {
        id: 3,
        category: 'Workplace Threats',
        scenario: 'An employee loses a company laptop containing unencrypted customer data: names, emails, and payment information for 15,000 clients. The laptop had no screen lock or password.',
        hint: 'Most countries have mandatory breach notification laws with strict time deadlines — 72 hours under GDPR, for example. "Wait and see" is never a legal option when personal data has been exposed.',
        question: 'What is the MOST critical immediate action the company must take?',
        options: [
            'Purchase a replacement laptop and configure a password this time',
            'Notify affected customers, relevant authorities, and activate the incident response plan',
            'Wait to see if anyone reports misuse of the data before acting',
            'Report only to the IT department and handle it internally',
        ],
        correct: 1,
        explanation: 'Under GDPR, CCPA, and most breach notification laws, companies must notify authorities within 72 hours and affected individuals without undue delay. Waiting to observe misuse is illegal and dramatically increases liability. This incident also shows why full-disk encryption is mandatory for all portable devices.',
    },
    {
        id: 4,
        category: 'Workplace Threats',
        scenario: 'A developer pushes code to a public GitHub repository and accidentally includes AWS access keys and a production database password inside a configuration file.',
        hint: 'Public repositories are indexed by search engines and continuously scanned by automated bots. Credentials exposed online should be treated as immediately and permanently compromised — no matter how quickly you react.',
        question: 'What must be done FIRST?',
        options: [
            'Delete the commit from history and hope nobody scraped the credentials',
            'Set the repository to private immediately to limit further exposure',
            'Immediately revoke and rotate all exposed credentials, then audit cloud access logs for unauthorized activity',
            'Add the config file to .gitignore to prevent the same mistake in the future',
        ],
        correct: 2,
        explanation: 'Credentials are compromised the instant they are publicly visible — automated bots scan GitHub continuously and can harvest secrets within minutes of a push. Deleting commits or setting the repo private does not help because the credentials were already exposed. Revoke everything immediately, rotate all affected secrets, then audit logs.',
    },
    {
        id: 5,
        category: 'Workplace Threats',
        scenario: 'An IT administrator leaves the company. Two months later, the organization discovers someone used the former admin\'s still-active credentials to access internal systems and exfiltrate HR data.',
        hint: 'The most dangerous access is often the simplest — an account nobody remembered to close. Privileged accounts left active after an employee\'s departure are one of the most common and preventable breach vectors.',
        question: 'What security control failure caused this breach?',
        options: [
            'The former admin chose a weak password that was easy to guess',
            'Failure to revoke access and disable accounts as part of the employee offboarding process',
            'The HR department stored sensitive data in an insecure file format',
            'The attacker used a zero-day exploit that no defense could have stopped',
        ],
        correct: 1,
        explanation: 'Offboarding must include immediate revocation of all accounts — VPN, email, cloud services, physical badges, and privileged access. Orphaned privileged accounts are one of the most common insider threat vectors. Every day an active admin account exists after departure is an open door for malicious use.',
    },
    // ── Social & Personal ──────────────────────────────────────────────
    {
        id: 6,
        category: 'Social & Personal',
        scenario: 'Maria posts on her public Instagram: a photo at home showing her street address on a package, a caption reading "Back to the office all week starting Monday!", and a selfie next to her car with a visible license plate.',
        hint: 'OSINT (Open Source Intelligence) means gathering intelligence from publicly available sources. Think about what a motivated attacker could learn by combining all the information from a single person\'s public social media profile.',
        question: 'What is the most serious combined risk created by these posts?',
        options: [
            'Her followers might unfollow her for oversharing personal details',
            'Advertisers will use the data to target her with more relevant ads',
            'She has provided enough information for physical stalking, targeted burglary, and identity theft',
            'She might violate Instagram\'s terms of service by showing a license plate publicly',
        ],
        correct: 2,
        explanation: 'The combination of home address, work schedule, and vehicle creates a stalker\'s and burglar\'s toolkit. Criminals use OSINT from social media to identify when homes are empty and plan physical crimes. The aggregation of individually harmless posts creates serious real-world danger.',
    },
    {
        id: 7,
        category: 'Social & Personal',
        scenario: 'Carlos receives a video call from what appears to be his grandmother. Her face and voice look completely authentic. She says she is stranded abroad and needs him to wire $500 immediately.',
        hint: 'AI tools can convincingly clone a person\'s voice and face from just a few seconds of publicly available video. Think about what verification method an attacker cannot fake — something that requires prior, independent contact.',
        question: 'What should Carlos do before sending any money?',
        options: [
            'Send the money immediately — he can see and hear his grandmother on the call',
            'Send half now and confirm the situation before sending the rest',
            'Hang up and call his grandmother directly on a known phone number — this could be a deepfake scam',
            'Ask her to hold up a piece of paper with today\'s date to prove the call is live',
        ],
        correct: 2,
        explanation: 'AI deepfake technology can clone a person\'s face and voice from just seconds of public video. This fraud technique has been used against families and corporate executives. Always verify financial requests through a separate, pre-existing communication channel — never based on the call requesting the money.',
    },
    {
        id: 8,
        category: 'Social & Personal',
        scenario: 'Sofia\'s email and password from a 2019 data breach appear in a leaked database on the dark web. She uses that same password for her email account, bank, and social media profiles.',
        hint: 'Leaked credentials from old breaches do not expire. Automated tools test them against hundreds of different services simultaneously — a technique called credential stuffing — within hours of a database appearing online.',
        question: 'What is the immediate risk she faces?',
        options: [
            'Only her 2019 account is at risk — current accounts with the same password are safe',
            'Credential stuffing attacks can automatically try those credentials against all other services and compromise every account sharing that password',
            'The risk is minimal since the breach happened years ago and the data is outdated',
            'She should create a new email address to avoid the problem',
        ],
        correct: 1,
        explanation: 'Credential stuffing uses leaked username/password pairs to automatically attack other services. Attackers try millions of combinations per hour across thousands of sites. Password reuse is the single most dangerous password habit — one breach becomes a breach of every account that shares that password. Use a password manager to generate unique passwords for every service.',
    },
    {
        id: 9,
        category: 'Social & Personal',
        scenario: 'A pop-up fills a student\'s screen: "VIRUS DETECTED! Your computer is at risk! Call 1-800-XXX-XXXX immediately to prevent data loss!" The phone number connects to someone claiming to be a Microsoft technician.',
        hint: 'Legitimate technology companies like Microsoft, Apple, or Google have no mechanism to detect viruses on your personal device and will never display a browser pop-up telling you to call a phone number.',
        question: 'What is happening and what should the student do?',
        options: [
            'Call the number — Microsoft proactively contacts users when they detect infected systems',
            'This is a tech support scam — force-close the browser, do not call, and run a scan with legitimate antivirus software',
            'Follow their instructions to download the recommended "security software" they provide',
            'Grant them remote access so they can prove the warning is a false alarm',
        ],
        correct: 1,
        explanation: 'Microsoft, Apple, and Google NEVER display pop-ups telling you to call a phone number. This is a classic tech support scam designed to gain remote access or extract payment for fake services. The pop-up is usually just a browser page — force-quit the browser or press F11 to escape fullscreen. Never call numbers from pop-up warnings.',
    },
    {
        id: 10,
        category: 'Social & Personal',
        scenario: 'A gaming app demands access to contacts, location, camera, microphone, and the ability to make phone calls. Without granting all permissions at once, the game cannot start.',
        hint: 'Apply the principle of least privilege — every permission granted is a potential attack surface. Ask yourself: what does a game genuinely need each of these permissions for?',
        question: 'What does this permission request indicate?',
        options: [
            'These are completely normal — all modern apps need a full suite of permissions to function',
            'The app legitimately requires them for voice chat features and location-based game mechanics',
            'Requesting permissions far beyond what the app needs is a major red flag for spyware or aggressive data harvesting',
            'Grant them for now — you can always review and revoke individual permissions later if something seems wrong',
        ],
        correct: 2,
        explanation: 'A gaming app has no legitimate reason to make phone calls or read your entire contacts list. Demanding all-or-nothing permission bundles is a classic data harvesting pattern. Under GDPR and app store policies, apps must request only permissions necessary for their core function. Deny unnecessary permissions and find an alternative app.',
    },
    // ── Device & Network ──────────────────────────────────────────────
    {
        id: 11,
        category: 'Device & Network',
        scenario: 'At a coffee shop you connect to a WiFi network named "CoffeeShop_Free" to check your bank balance and work email. A sign on the counter shows the real coffee shop WiFi is "CafeWiFi_2G".',
        hint: 'Anyone with a laptop can create a WiFi hotspot with any name they choose in seconds. Look carefully at the difference between the network you connected to and the real network name displayed on the sign.',
        question: 'What attack are you likely experiencing?',
        options: [
            'A DDoS attack — too many users are overwhelming the network bandwidth',
            'An Evil Twin attack — a fake access point designed to intercept all your network traffic',
            'DNS cache poisoning from the legitimate router',
            'No attack — HTTPS encryption makes any public WiFi completely safe for banking',
        ],
        correct: 1,
        explanation: 'An Evil Twin attack creates a fake WiFi hotspot that mimics a legitimate network name. The attacker controls all traffic, including HTTPS when combined with SSL stripping. Always confirm the exact network name with staff, use a VPN on all public WiFi, and avoid banking or work email on networks you do not control.',
    },
    {
        id: 12,
        category: 'Device & Network',
        scenario: 'A remote employee\'s home router has never been updated since purchase four years ago, still uses the default admin password "admin/admin," and connects to their employer\'s internal network via VPN daily.',
        hint: 'When employees work remotely via VPN, their home network effectively becomes an extension of the corporate network perimeter. A compromised home router is a compromised corporate entry point.',
        question: 'What is the PRIMARY security risk for the company?',
        options: [
            'Outdated firmware may cause slower internet speeds affecting productivity',
            'The router\'s unpatched vulnerabilities and default credentials allow nearby attackers to take full control of the network, and use the VPN connection as a pivot into corporate systems',
            'The hardware warranty has expired, creating a risk of unplanned hardware failure',
            'WPA2 is considered outdated — the company needs to require WPA3 on all home networks',
        ],
        correct: 1,
        explanation: 'Home routers with default credentials and outdated firmware are a top entry point for remote work attacks. A compromised home router allows attackers to intercept VPN credentials, perform DNS hijacking, and pivot into corporate networks. Change all router default credentials immediately and enable automatic firmware updates.',
    },
    {
        id: 13,
        category: 'Device & Network',
        scenario: 'You find a USB drive in the company parking lot labeled "PAYROLL — CONFIDENTIAL 2024." You want to identify the owner and return it.',
        hint: 'USB attacks can use a technique called BadUSB — the drive emulates a keyboard and automatically injects malicious commands before any antivirus software has a chance to react, even on isolated computers.',
        question: 'What is the correct action?',
        options: [
            'Plug it into your workstation to browse the files and find the owner\'s name',
            'Plug it into an air-gapped computer not connected to any network to safely check its contents',
            'Turn it in to the IT security team without plugging it into any device',
            'Discard it to prevent anyone else from finding and misusing it',
        ],
        correct: 2,
        explanation: 'This is a classic USB drop attack — attackers leave infected drives in parking lots and common areas hoping curious employees plug them in. Even air-gapped computers can be compromised by BadUSB attacks that emulate keyboards and inject malicious commands. IT security has forensic tools to analyze unknown drives safely. Never plug in a found USB device.',
    },
    {
        id: 14,
        category: 'Device & Network',
        scenario: 'An employee uses their personal smartphone for work email and stores company documents on it under a BYOD policy. Their phone is lost on public transport.',
        hint: 'A BYOD policy must balance the employee\'s right to personal privacy with the company\'s need to protect corporate data. Think about a solution that can address both concerns independently.',
        question: 'What capability should a proper corporate BYOD policy provide?',
        options: [
            'No capabilities — personal phones belong entirely to the employee and cannot be touched by the company',
            'The ability to contact the employee\'s mobile carrier to suspend the SIM card remotely',
            'Remote selective wipe of corporate data from the device using MDM (Mobile Device Management) software, while preserving personal data',
            'The ability to track the phone\'s real-time GPS location at all times through a monitoring app',
        ],
        correct: 2,
        explanation: 'MDM (Mobile Device Management) solutions allow companies to remotely wipe only corporate data from lost or stolen devices while leaving personal photos and apps untouched. MDM enrollment is a fundamental BYOD policy requirement. Without it, there is no way to protect company data on a personal device that is lost, stolen, or returned by a departing employee.',
    },
    {
        id: 15,
        category: 'Device & Network',
        scenario: 'An office security camera still uses the manufacturer default password "1234" and runs three-year-old firmware. It is connected to the same network segment as all employee workstations and servers.',
        hint: 'IoT devices on the same network as computers create a flat, unzoned attack surface. Attackers use compromised IoT devices as a stepping stone to reach more valuable targets — a technique called lateral movement.',
        question: 'What risk does this camera create beyond the camera itself?',
        options: [
            'The camera will likely produce lower-quality footage than current models',
            'The camera is an IoT device that can be compromised and used as a lateral movement pivot to attack workstations and servers on the same network segment',
            'The camera might overheat and cause a fire or equipment failure',
            'No network risk — cameras are isolated media devices with no ability to affect other network devices',
        ],
        correct: 1,
        explanation: 'IoT devices with default credentials on the same network as critical systems are a proven lateral movement vector. The Mirai botnet compromised millions of cameras and routers using default passwords. A compromised camera gives attackers a persistent foothold inside the corporate network to scan, pivot, and launch further attacks against workstations and servers.',
    },
    // ── Incident Response ──────────────────────────────────────────────
    {
        id: 16,
        category: 'Incident Response',
        scenario: 'Company files begin encrypting across three departments simultaneously. A ransom note demands $50,000 in Bitcoin within 48 hours. New systems are being encrypted every few minutes.',
        hint: 'Every second a ransomware binary runs, it encrypts more files and potentially spreads to new systems via network shares. Containment must always come before investigation or recovery attempts.',
        question: 'What is the correct FIRST response action?',
        options: [
            'Pay the ransom immediately to stop the encryption and recover access',
            'Isolate all affected systems from the network immediately to contain the spread, then activate the incident response plan',
            'Identify and manually delete the ransomware executable files on each affected system',
            'Assess the full scope of damage over the next 24 hours before deciding on a response strategy',
        ],
        correct: 1,
        explanation: 'Containment is the absolute first priority — unplug ethernet cables and disable WiFi on all affected systems to stop lateral spread. Do NOT pay the ransom: there is no guarantee of recovery, it funds criminal organizations, and may be illegal under sanctions laws. After containment, activate your IR plan, notify leadership, and engage cybersecurity professionals.',
    },
    {
        id: 17,
        category: 'Incident Response',
        scenario: 'An employee notices unusual outbound network traffic from their workstation and suspects compromise. The IT team must investigate the incident and preserve evidence for potential legal proceedings.',
        hint: 'Computer forensics follows strict legal standards. Some evidence only exists in volatile memory (RAM) and disappears permanently when the machine is rebooted. Evidence not properly collected may be inadmissible in court.',
        question: 'What must the IT team do to properly preserve forensic evidence?',
        options: [
            'Wipe the hard drive and reinstall the OS immediately to eliminate the threat',
            'Reboot the computer to clear any malware running in volatile memory',
            'Create a forensic bit-for-bit image of the disk before any changes, and capture memory dumps while the system is still live',
            'Run a full antivirus scan first and quarantine all flagged files before beginning the investigation',
        ],
        correct: 2,
        explanation: 'Digital forensics requires preserving evidence in its original state. Rebooting destroys volatile memory (RAM) which may contain running malware, encryption keys, and attacker commands. Wiping the drive permanently destroys all evidence. A forensic image captures the exact disk state. All remediation must come after evidence collection — not before.',
    },
    {
        id: 18,
        category: 'Incident Response',
        scenario: 'A company discovers it was breached six months ago. The attacker had stealthy persistent access throughout the entire period and exfiltrated terabytes of sensitive data without triggering any security alerts.',
        hint: '"Advanced" in APT does not always mean the most sophisticated malware — it means advanced in patience, stealth, and operational security. The goal is long-term, undetected access, not immediate disruption.',
        question: 'What type of threat actor behavior does this describe?',
        options: [
            'A script kiddie attack — fast, noisy, and opportunistic',
            'An Advanced Persistent Threat (APT) — characterized by long dwell time, stealth, and sustained targeted data exfiltration',
            'A DDoS attack that delayed its full impact for six months',
            'A phishing campaign where the payload was designed to activate slowly over time',
        ],
        correct: 1,
        explanation: 'An APT (Advanced Persistent Threat) is defined by long dwell time, persistent access, and targeted objectives — typically nation-state actors or organized criminal groups. The global average dwell time (breach to detection) exceeds 200 days. APTs require advanced detection: SIEM, EDR, network behavioral analysis, and threat intelligence — not just perimeter firewalls.',
    },
    {
        id: 19,
        category: 'Incident Response',
        scenario: 'After a ransomware attack, the IT team realizes they can restore from backups. However, the backup device was a Network-Attached Storage (NAS) drive connected to the same LAN — and it was encrypted by the ransomware too.',
        hint: 'Ransomware operators often wait weeks or months after initial infection before triggering encryption — giving the malware time to replicate itself into backup systems that are still connected to the network.',
        question: 'Which backup principle was violated?',
        options: [
            'Backups should use faster SSD hardware to reduce restore time',
            'The 3-2-1 rule: 3 copies, 2 different media types, 1 copy offline or offsite. The backup was reachable from the infected network and therefore encrypted along with everything else.',
            'Backups should be tested monthly — untested backups cannot be trusted for recovery',
            'The backup software version was outdated and created incompatible backup files',
        ],
        correct: 1,
        explanation: 'The 3-2-1 backup rule is the gold standard for ransomware resilience: 3 copies of data, on 2 different media types, with 1 copy offline or offsite (immutable). A NAS device on the same network segment as infected machines will be reached and encrypted by ransomware. Offline backups (tape, immutable cloud storage with versioning) are the only reliable recovery path.',
    },
    {
        id: 20,
        category: 'Incident Response',
        scenario: 'A journalist contacts a company to inform them that their customer data — including names, credit card numbers, and Social Security Numbers — is actively being sold on a dark web marketplace. The company\'s security team had no prior knowledge of any breach.',
        hint: 'Mature security programs use internal monitoring tools (SIEM, dark web intelligence feeds, EDR alerts) to detect breaches before external parties do. Discovering your own breach from a journalist signals a critical detection gap.',
        question: 'What does this reveal about the company\'s security posture?',
        options: [
            'The journalist is conducting social engineering and should be reported to law enforcement',
            'The company lacks adequate breach detection capabilities — a third party discovered and disclosed the breach before internal security did',
            'This is completely normal — most organizations learn about breaches from external sources first',
            'The company should publicly deny the breach until legal counsel can verify the claims internally',
        ],
        correct: 1,
        explanation: 'Discovering your own breach from an external party signals a critical monitoring failure. Organizations should have dark web monitoring, SIEM alerting, and threat intelligence feeds to detect breaches proactively. Responsible disclosure from journalists must be investigated immediately. Public denial without investigation dramatically increases legal liability and reputational damage.',
    },
];

const PASSING_SCORE = Math.round(QUESTIONS.length * 0.7); // 14/20

interface RealWorldRisksLabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const RealWorldRisksLab: React.FC<RealWorldRisksLabProps> = ({ onComplete }) => {
    const [showIntro, setShowIntro] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [answered, setAnswered] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);
    const [userName, setUserName] = React.useState(() => localStorage.getItem('cyberlab-username') ?? '');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(45 * 60);
    const [timerStarted, setTimerStarted] = React.useState(false);

    useEffect(() => {
        if (!timerStarted || completed || timeLeft <= 0) return;
        const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(id);
    }, [timerStarted, completed, timeLeft]);

    const formatTime = (s: number) =>
        `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const question = QUESTIONS[currentIndex];
    const categoryColor = CATEGORY_COLORS[question?.category] ?? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5';

    const handleStart = () => {
        setShowIntro(false);
        setTimerStarted(true);
    };

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
        setTimeLeft(45 * 60);
        setTimerStarted(true);
        setUserName('');
    };

    const passed = score >= PASSING_SCORE;
    const incorrect = QUESTIONS.length - score;

    if (showIntro) {
        return (
            <IntroModal
                slides={INTRO_SLIDES}
                onStart={handleStart}
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
                    {passed ? <GraduationCap size={100} /> : <AlertTriangle size={100} />}
                </motion.div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
                    {passed ? 'Assessment Passed!' : 'Keep Practicing'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mb-6">
                    {passed
                        ? 'You have demonstrated real-world cybersecurity judgment across all four risk categories.'
                        : `You needed ${PASSING_SCORE} correct answers to pass. Review the scenarios and try again.`}
                </p>

                <div className={`text-6xl font-mono mb-4 ${passed ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                    {score} / {QUESTIONS.length}
                </div>

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
                            onChange={e => setUserName(e.target.value)}
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
                                        const moduleName = 'Real-World Cyber Risks — Grade 11';
                                        await generateCertificate(userName, moduleName, {
                                            correct: score,
                                            incorrect,
                                            total: QUESTIONS.length,
                                        });
                                        onComplete({
                                            moduleId: 'real-world-risks',
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

    const progress = (currentIndex / QUESTIONS.length) * 100;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Real-World Cyber Risks · Grade 11</p>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-text-muted">Question {currentIndex + 1} of {QUESTIONS.length}</span>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${categoryColor}`}>{question.category}</span>
                    </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm border ${timeLeft < 300 ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-bg-secondary border-glass text-text-secondary'}`}>
                    <Clock size={14} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-bg-tertiary rounded-full mb-8">
                <div className="h-1.5 bg-accent-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            {/* Question card */}
            <div className="cyber-card p-8 mb-4">
                {/* Scenario */}
                <div className="bg-bg-tertiary border border-glass rounded-xl p-5 mb-4">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Scenario</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{question.scenario}</p>
                </div>

                {/* Hint */}
                <div className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 mb-5">
                    <Lightbulb size={15} className="text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-200/80 leading-relaxed"><span className="font-black text-yellow-400 mr-1">Hint:</span>{question.hint}</p>
                </div>

                <p className="font-bold text-white text-lg mb-6">{question.question}</p>

                <div className="grid gap-3">
                    {question.options.map((opt, i) => {
                        let cls = 'w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ';
                        if (!answered) {
                            cls += 'border-glass bg-bg-tertiary text-text-secondary hover:border-accent-primary-20 hover:text-white cursor-pointer';
                        } else {
                            if (i === question.correct) cls += 'border-green-500/50 bg-green-500/10 text-green-400';
                            else if (i === selected) cls += 'border-red-500/50 bg-red-500/10 text-red-400';
                            else cls += 'border-glass bg-bg-tertiary text-text-muted opacity-60';
                        }
                        return (
                            <button key={i} className={cls} onClick={() => handleSelect(i)}>
                                <span className="font-black text-text-muted mr-3">{String.fromCharCode(65 + i)}.</span>
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation */}
            {answered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cyber-card p-5 mb-6 border-accent-primary-20 bg-accent-primary-5"
                >
                    <p className="text-[10px] font-black text-accent-primary uppercase tracking-widest mb-2">Explanation</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{question.explanation}</p>
                </motion.div>
            )}

            {answered && (
                <div className="flex justify-end">
                    <button onClick={handleNext} className="neon-button px-8 py-3 text-sm">
                        {currentIndex + 1 >= QUESTIONS.length ? 'See Results' : 'Next Question →'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default RealWorldRisksLab;
