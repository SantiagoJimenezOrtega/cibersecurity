import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, CheckCircle2, XCircle, Trophy, Layers,
  Zap, Lock, Terminal, ArrowRight, Star,
} from 'lucide-react';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';
import type { CertificateRecord } from '../types';
import { generateCertificate } from '../utils/certificate';

interface Props {
  onComplete: (cert: CertificateRecord) => void;
}

interface IPLevel {
  id: number;
  title: string;
  ip: string;
  question: string;
  hint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  badge: string;
}

const introSlides: IntroSlide[] = [
  {
    icon: <Globe size={48} />,
    title: 'Every Device Has an Address',
    subtitle: 'What is an IP Address?',
    body: 'An IP address is a unique numerical label assigned to every device on a network. Just like a postal address, it tells the network exactly where to deliver data packets. Without IP addresses, devices would have no way to find each other across the internet.',
    highlight: "There are ~4.3 billion IPv4 addresses — and we've nearly exhausted them, which is why IPv6 was created.",
  },
  {
    icon: <Layers size={48} />,
    title: 'IPv4 vs IPv6',
    subtitle: 'Two Generations of Addressing',
    body: 'IPv4 uses 32-bit addresses written as 4 decimal numbers separated by dots (e.g., 192.168.1.1). IPv6 uses 128-bit addresses in hexadecimal groups separated by colons (e.g., 2001:db8::1). IPv6 can address 340 undecillion devices — enough for every grain of sand on Earth to have multiple IPs.',
    highlight: 'IPv6 adoption is growing rapidly, but IPv4 still dominates most networks today.',
  },
  {
    icon: <Lock size={48} />,
    title: 'Private vs Public IPs',
    subtitle: 'RFC 1918 Reserved Ranges',
    body: 'Three IPv4 ranges are reserved for private networks (RFC 1918): 10.0.0.0/8 (Class A — up to 16 M devices), 172.16.0.0/12 (Class B — ~1 M devices), and 192.168.0.0/16 (Class C — 65 K devices). Devices with private IPs use NAT (Network Address Translation) to share a single public IP for internet access.',
    highlight: 'Your home router likely assigns 192.168.x.x addresses to all your devices.',
  },
  {
    icon: <Zap size={48} />,
    title: 'Special-Purpose Addresses',
    subtitle: 'Reserved for Specific Functions',
    body: 'Some addresses have special meanings: 127.0.0.1 is the loopback (your own machine), 169.254.x.x is APIPA (self-assigned when DHCP fails), 255.255.255.255 is the limited broadcast (reaches all local hosts), and fe80::/10 is IPv6 link-local (valid only on the local segment).',
    highlight: 'Recognizing special IPs is essential for network troubleshooting and security analysis.',
  },
];

const levels: IPLevel[] = [
  {
    id: 1,
    title: 'IPv4 Fundamentals',
    ip: '192.168.1.100',
    question: 'What IP version is this address?',
    hint: 'Count the groups of numbers separated by dots.',
    options: ['IPv4', 'IPv6', 'MAC Address', 'Domain Name'],
    correctIndex: 0,
    explanation:
      '192.168.1.100 is an IPv4 address — 4 groups of numbers (0–255) separated by dots, totaling 32 bits. IPv4 was standardized in 1981 and remains the most widely deployed addressing scheme.',
    badge: 'IP Version',
  },
  {
    id: 2,
    title: 'IPv6 Recognition',
    ip: '2001:0db8:85a3::8a2e:0370:7334',
    question: 'What IP version is this address?',
    hint: 'Notice the colons and hexadecimal notation.',
    options: ['IPv4', 'IPv6', 'Subnet Mask', 'Serial Number'],
    correctIndex: 1,
    explanation:
      'This is an IPv6 address — up to 8 groups of 4 hex digits separated by colons, giving 128 bits total. The "::" compresses consecutive zero groups. IPv6 provides ~340 undecillion unique addresses.',
    badge: 'IP Version',
  },
  {
    id: 3,
    title: 'Private Range — Class C',
    ip: '192.168.0.50',
    question: 'Is this a private or public IP?',
    hint: 'The range 192.168.0.0 – 192.168.255.255 is defined in RFC 1918.',
    options: ['Public (Internet)', 'Private (LAN)', 'Loopback', 'Multicast'],
    correctIndex: 1,
    explanation:
      '192.168.x.x is the Class C private range (RFC 1918). These IPs are used in homes and small offices — never routed on the public internet. Your router uses NAT to let them reach external servers.',
    badge: 'Private / Public',
  },
  {
    id: 4,
    title: 'Private Range — Class A',
    ip: '10.42.100.5',
    question: 'Is this a private or public IP?',
    hint: 'The entire 10.x.x.x block is reserved for private use.',
    options: ['Public (Internet)', 'Private (LAN)', 'Loopback', 'Broadcast'],
    correctIndex: 1,
    explanation:
      '10.0.0.0/8 is the Class A private range — the largest RFC 1918 block with over 16 million addresses. Large enterprises, data centers, and cloud providers use it internally for servers and containers.',
    badge: 'Private / Public',
  },
  {
    id: 5,
    title: 'Public IP — Google DNS',
    ip: '8.8.8.8',
    question: 'Is this a private or public IP?',
    hint: "This is one of the world's most recognizable DNS resolvers.",
    options: ['Private (LAN)', 'Public (Internet)', 'Loopback', 'APIPA'],
    correctIndex: 1,
    explanation:
      "8.8.8.8 is Google's public DNS resolver. Public IPs are globally routable — assigned by ISPs and registered with IANA/RIRs. Unlike private IPs, you can reach a public IP from anywhere on the internet.",
    badge: 'Private / Public',
  },
  {
    id: 6,
    title: 'The Loopback Address',
    ip: '127.0.0.1',
    question: 'What is the purpose of this special address?',
    hint: 'Your own computer uses this to communicate with itself.',
    options: ['Default Gateway', 'Loopback / Self-Reference', 'Broadcast All Hosts', 'DHCP Discovery'],
    correctIndex: 1,
    explanation:
      '127.0.0.1 (alias: "localhost") is the loopback address. Traffic sent here never leaves your machine — the OS immediately routes it back. Developers use it to test web servers and APIs locally without touching the network.',
    badge: 'Special',
  },
  {
    id: 7,
    title: 'Private Range — Class B',
    ip: '172.20.5.10',
    question: 'Is this a private or public IP?',
    hint: 'The range 172.16.0.0 – 172.31.255.255 is RFC 1918 reserved.',
    options: ['Public (Internet)', 'Private (LAN)', 'Loopback', 'Special Purpose'],
    correctIndex: 1,
    explanation:
      '172.16.0.0/12 is the Class B private range (RFC 1918), spanning 172.16.x.x through 172.31.x.x — about 1 million addresses. Commonly found in medium-to-large corporate networks and VPN tunnels.',
    badge: 'Private / Public',
  },
  {
    id: 8,
    title: 'APIPA — Auto-Configuration',
    ip: '169.254.45.100',
    question: 'Why would a device have this IP address?',
    hint: 'Devices self-assign this range when they cannot reach a DHCP server.',
    options: [
      'Registered public server IP',
      'DHCP failed — self-assigned (APIPA)',
      'VPN tunnel endpoint',
      'Multicast group address',
    ],
    correctIndex: 1,
    explanation:
      '169.254.0.0/16 is the APIPA (Automatic Private IP Addressing) range. When a device fails to get an address from DHCP, it self-assigns one here. Seeing an APIPA address almost always signals a DHCP or network configuration problem.',
    badge: 'Special',
  },
  {
    id: 9,
    title: 'IPv6 Link-Local',
    ip: 'fe80::1a2b:3c4d:5e6f',
    question: 'What type of IPv6 address is this?',
    hint: 'All IPv6 addresses starting with fe80:: are local-only.',
    options: ['Global Unicast', 'Link-Local', 'IPv6 Loopback', 'Multicast'],
    correctIndex: 1,
    explanation:
      'fe80::/10 is the IPv6 Link-Local range. Every IPv6 interface automatically generates a link-local address — used for neighbor discovery and routing protocols, but NOT routable beyond the local network segment.',
    badge: 'IPv6 Type',
  },
  {
    id: 10,
    title: 'Grand Challenge',
    ip: '255.255.255.255',
    question: 'What is the role of this IPv4 address?',
    hint: 'All 32 bits are set to 1. Think: what does that mean for delivery?',
    options: ['Public DNS Server', 'IPv6 Transition Address', 'Limited Broadcast', 'Default Gateway'],
    correctIndex: 2,
    explanation:
      '255.255.255.255 is the limited broadcast address. Packets sent here reach every device on the local network segment — routers block it so it never crosses network boundaries. DHCP discovery uses this address to find servers.',
    badge: 'Special',
  },
];

const getBadgeStyle = (badge: string): string => {
  if (badge === 'Special')
    return 'text-accent-tertiary bg-accent-tertiary-5 border border-accent-tertiary-20';
  if (badge === 'Private / Public')
    return 'text-accent-primary bg-accent-primary-5 border border-accent-primary-20';
  return 'text-accent-secondary bg-accent-secondary-5 border border-accent-secondary-20';
};

const IPClassifierLab: React.FC<Props> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userName, setUserName] = useState(
    () => localStorage.getItem('cyberlab-username') ?? ''
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const level = levels[currentLevel];
  const isCorrect = selectedOption === level.correctIndex;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === level.correctIndex) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleCertificate = async () => {
    setIsGenerating(true);
    const name = userName.trim() || 'Cyber Student';
    await generateCertificate(name, 'IP Address Classification');
    const record: CertificateRecord = {
      moduleId: 'ip-classifier',
      moduleName: 'IP Address Classification',
      userName: name,
      date: new Date().toLocaleDateString('en-US'),
    };
    onComplete(record);
    setIsGenerating(false);
  };

  /* ── Intro ───────────────────────────────────────────────────────── */
  if (showIntro) {
    return (
      <IntroModal
        slides={introSlides}
        onStart={() => setShowIntro(false)}
        accentClass="text-accent-secondary"
        borderClass="border-accent-secondary-25"
        bgClass="bg-accent-secondary-5"
        buttonClass="neon-button"
      />
    );
  }

  /* ── Completion ──────────────────────────────────────────────────── */
  if (isComplete) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ background: 'rgba(0,0,0,0.6)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="cyber-card w-full max-w-lg p-10 border border-accent-secondary-25 text-center"
        >
          <div className="w-20 h-20 bg-accent-secondary-10 border border-accent-secondary-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-accent-secondary">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">Module Complete!</h2>
          <p className="text-text-muted mb-3">IP Address Classification</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star size={16} className="text-accent-secondary" />
            <span className="text-accent-secondary font-bold text-xl">
              {correctCount} / {levels.length} correct
            </span>
            <Star size={16} className="text-accent-secondary" />
          </div>

          <div className="cyber-card p-6 bg-accent-secondary-5 border border-accent-secondary-20 mb-6 text-left">
            <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-3">
              Certificate Name
            </p>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Enter your full name…"
              className="w-full bg-bg-primary border border-white-10 rounded-xl px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent-secondary transition-all text-sm"
            />
          </div>

          <button
            onClick={handleCertificate}
            disabled={isGenerating || !userName.trim()}
            className="neon-button w-full py-4 flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isGenerating ? 'Generating PDF…' : 'Download Certificate'}
            {!isGenerating && <ArrowRight size={18} />}
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── Level UI ────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-secondary-10 border border-accent-secondary-20 rounded-xl text-accent-secondary">
              <Globe size={20} />
            </div>
            <div>
              <h1 className="text-white font-black text-lg">IP Address Classification</h1>
              <p className="text-text-muted text-xs">
                Level {currentLevel + 1} of {levels.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-accent-primary" />
            <span className="text-accent-primary font-bold">{correctCount}</span>
            <span className="text-text-muted">correct</span>
          </div>
        </div>
        <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent-secondary rounded-full"
            animate={{ width: `${(currentLevel / levels.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
        >
          {/* Title + badge */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h2 className="text-white font-black text-2xl">{level.title}</h2>
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getBadgeStyle(level.badge)}`}
            >
              {level.badge}
            </span>
          </div>

          {/* IP display */}
          <div className="cyber-card p-6 mb-6 bg-bg-tertiary border border-accent-secondary-20">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={13} className="text-accent-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent-secondary">
                Target Address
              </span>
            </div>
            <p className="font-mono text-3xl font-bold text-white tracking-wider break-all">
              {level.ip}
            </p>
          </div>

          {/* Question + hint */}
          <p className="text-white font-bold text-lg mb-1">{level.question}</p>
          <p className="text-text-muted text-sm mb-6">Hint: {level.hint}</p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {level.options.map((option, index) => {
              let cls =
                'cyber-card p-4 border text-sm font-semibold transition-all text-left rounded-2xl ';
              if (!isAnswered) {
                cls +=
                  'border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white cursor-pointer';
              } else if (index === level.correctIndex) {
                cls +=
                  'border-accent-primary-30 bg-accent-primary-5 text-accent-primary cursor-default';
              } else if (index === selectedOption) {
                cls +=
                  'border-accent-tertiary-30 bg-accent-tertiary-5 text-accent-tertiary cursor-default';
              } else {
                cls += 'border-white-5 text-text-muted opacity-40 cursor-default';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={cls}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{option}</span>
                    {isAnswered && index === level.correctIndex && (
                      <CheckCircle2 size={16} className="text-accent-primary shrink-0" />
                    )}
                    {isAnswered && index === selectedOption && index !== level.correctIndex && (
                      <XCircle size={16} className="text-accent-tertiary shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`cyber-card p-5 mb-6 border ${
                  isCorrect
                    ? 'bg-accent-primary-5 border-accent-primary-20'
                    : 'bg-accent-tertiary-5 border-accent-tertiary-20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 size={18} className="text-accent-primary shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={18} className="text-accent-tertiary shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`font-bold text-sm mb-1 ${
                        isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'
                      }`}
                    >
                      {isCorrect ? 'Correct!' : "Not quite — here's why:"}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {level.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          {isAnswered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="neon-button w-full py-4 flex items-center justify-center gap-2"
            >
              {currentLevel < levels.length - 1 ? 'NEXT LEVEL' : 'COMPLETE MODULE'}
              <ArrowRight size={18} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IPClassifierLab;
