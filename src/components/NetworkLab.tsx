import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, ArrowRight, Lock, Server, Monitor, Globe,
  Eye, CheckCircle2, XCircle, Package, ShieldCheck,
  Trophy, Download, Check, Shield, Wifi, Cpu, RefreshCw, Zap
} from 'lucide-react';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const TOTAL_LEVELS = 10;

interface LevelProps {
  onComplete: (correct?: boolean) => void;
}

interface NetworkLabProps {
  onComplete: (cert: CertificateRecord) => void;
}

// ── Intro Slides ──────────────────────────────────────────────────────────────
const INTRO_SLIDES: IntroSlide[] = [
  {
    icon: <Network size={40} />,
    subtitle: 'What is a network packet?',
    title: 'Data Travels in Packets',
    body: "When you send a message, watch a video, or load a webpage, your data doesn't travel as one big chunk. It's broken into small pieces called packets — each carries part of your data plus addressing and control information.",
    highlight: 'Every YouTube video you watch arrives as millions of tiny packets, each finding its own path through the internet before being reassembled on your screen.',
  },
  {
    icon: <Package size={40} />,
    subtitle: 'Anatomy of a packet',
    title: "What's Inside a Packet?",
    body: 'A packet has three key parts: the Header (source/destination addresses, protocol, sequence number), the Payload (the actual data), and a Trailer (error-checking). The header is the envelope — the payload is the letter inside.',
    highlight: 'IP headers alone contain over 12 different fields — each one with a specific job in getting your data safely to the right place.',
  },
  {
    icon: <Globe size={40} />,
    subtitle: 'The OSI Model',
    title: 'Seven Layers of Communication',
    body: 'The OSI model describes 7 layers of network communication, from physical cables (Layer 1) up to applications like your browser (Layer 7). Each layer adds its own header when sending and strips it when receiving — called encapsulation and decapsulation.',
    highlight: 'When you type a URL, data passes down all 7 layers on your device, travels across networks, then back up all 7 layers on the server — in milliseconds.',
  },
  {
    icon: <Shield size={40} />,
    subtitle: 'Security risks',
    title: 'Why Packets Are a Security Target',
    body: 'Attackers can intercept packets (sniffing), modify them (man-in-the-middle), or flood a target with fakes (DDoS). Understanding packet structure is essential for building firewalls, intrusion detection systems, and encrypted protocols like HTTPS.',
    highlight: "In 2013, Edward Snowden revealed that intelligence agencies were intercepting and storing billions of raw network packets daily — that's exactly what we'll explore in this lab.",
  },
];

// ── Level 1: Packet Anatomy ───────────────────────────────────────────────────
const L1_SECTIONS = [
  { id: 'eth',     label: 'Ethernet Header',  color: '#a855f7', desc: 'MAC addresses & EtherType' },
  { id: 'ip',      label: 'IP Header',         color: '#00e5ff', desc: 'IP addresses, TTL, Protocol' },
  { id: 'tcp',     label: 'TCP Header',        color: '#00ff9d', desc: 'Ports, Sequence, Flags' },
  { id: 'payload', label: 'Payload / Data',    color: '#ff9d00', desc: 'The actual content' },
];

const L1_QUESTIONS = [
  { q: 'Which section contains the Source and Destination IP addresses?', answer: 'ip' },
  { q: 'Which section contains the actual data being transmitted (e.g., a webpage)?', answer: 'payload' },
  { q: 'Which section contains the port numbers (e.g., 443 for HTTPS)?', answer: 'tcp' },
  { q: 'Which section contains hardware MAC addresses for local network delivery?', answer: 'eth' },
];

const Level1PacketAnatomy: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const q = L1_QUESTIONS[qIdx];

  const handleSelect = (id: string) => {
    if (feedback) return;
    setSelected(id);
    const ok = id === q.answer;
    setFeedback(ok ? 'correct' : 'wrong');
    if (ok) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= L1_QUESTIONS.length) {
      onComplete(score >= 3);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
      setFeedback(null);
    }
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Package size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Packet Anatomy</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">Question {qIdx + 1}/{L1_QUESTIONS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-6">Click on the correct section of the packet to answer each question.</p>

      {/* Packet visual */}
      <div className="flex rounded-2xl overflow-hidden border border-white-10 mb-8" style={{ minHeight: '5rem' }}>
        {L1_SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            style={{ flex: s.id === 'payload' ? 2 : 1, cursor: feedback ? 'default' : 'pointer' }}
            className={`py-5 text-center transition-all border-r last:border-r-0 border-white-10 relative ${
              feedback && selected === s.id
                ? feedback === 'correct'
                  ? 'bg-accent-primary-10'
                  : 'bg-accent-tertiary-10'
                : feedback && s.id === q.answer
                  ? 'bg-accent-primary-5'
                  : 'hover:bg-white-5'
            }`}
          >
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: s.color }} />
            <p className="text-xs font-bold text-white px-2">{s.label}</p>
            <p className="text-[10px] text-text-muted mt-1 px-1">{s.desc}</p>
            {feedback && selected === s.id && feedback === 'correct' && (
              <div className="absolute top-2 right-2 text-accent-primary"><CheckCircle2 size={14} /></div>
            )}
            {feedback && selected === s.id && feedback === 'wrong' && (
              <div className="absolute top-2 right-2 text-accent-tertiary"><XCircle size={14} /></div>
            )}
            {feedback && s.id === q.answer && selected !== s.id && (
              <div className="absolute top-2 right-2 text-accent-primary"><CheckCircle2 size={14} /></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-accent-secondary mb-2">Which section is it?</p>
        <p className="text-white font-bold">{q.q}</p>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${feedback === 'correct' ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold ${feedback === 'correct' ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {feedback === 'correct' ? '✓ Correct!' : `✗ Not quite. The answer is: ${L1_SECTIONS.find(s => s.id === q.answer)?.label}`}
          </p>
        </motion.div>
      )}

      {feedback && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {qIdx + 1 >= L1_QUESTIONS.length ? 'Finish Level' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 2: OSI Model ────────────────────────────────────────────────────────
const OSI_LAYERS   = ['Physical', 'Data Link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'];
const OSI_DESCS    = ['Cables, signals, bits', 'MAC addresses, switches', 'IP addresses, routing', 'TCP/UDP, end-to-end', 'Session management', 'Encryption, data format', 'HTTP, DNS, apps'];
const OSI_COLORS   = ['#ff2d55','#ff6b35','#ff9d00','#00ff9d','#00e5ff','#a855f7','#ec4899'];

const Level2OSIModel: React.FC<LevelProps> = ({ onComplete }) => {
  const [shuffled] = useState(() => [...OSI_LAYERS].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(false);

  const handleClick = (layer: string) => {
    if (done || selected.includes(layer)) return;
    const next = [...selected, layer];
    setSelected(next);
    if (next.length === OSI_LAYERS.length) {
      const ok = next.every((l, i) => l === OSI_LAYERS[i]);
      setDone(true);
      setResult(ok);
    }
  };

  const handleReset = () => { setSelected([]); setDone(false); setResult(false); };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <span style={{ fontSize: '1.25rem' }}>📚</span>
        <h2 className="text-xl font-black text-white">OSI Model — Layer Order</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Click the 7 OSI layers in order from <strong className="text-white">Layer 1 (Physical)</strong> to <strong className="text-white">Layer 7 (Application)</strong>.
      </p>

      {/* Progress slots */}
      <div className="flex gap-1 mb-6">
        {OSI_LAYERS.map((_, i) => {
          const layer = selected[i];
          const correct = layer && layer === OSI_LAYERS[i];
          const wrong = layer && layer !== OSI_LAYERS[i];
          return (
            <div key={i} style={{ flex: 1 }}
              className={`h-10 rounded-xl border flex items-center justify-center text-[10px] font-black transition-all ${
                layer
                  ? done && wrong
                    ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : done && correct
                      ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                      : 'bg-accent-secondary-10 border-accent-secondary-20 text-accent-secondary'
                  : 'bg-white-5 border-white-10 text-text-muted'
              }`}
            >
              {layer ? (done ? (correct ? '✓' : '✗') : `${i + 1}`) : `${i + 1}`}
            </div>
          );
        })}
      </div>

      {/* Layer tiles */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {shuffled.map(layer => {
          const idx = OSI_LAYERS.indexOf(layer);
          const isSelected = selected.includes(layer);
          return (
            <button key={layer} onClick={() => handleClick(layer)} disabled={isSelected || done}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'opacity-30 cursor-not-allowed bg-white-5 border-white-10'
                  : 'bg-accent-secondary-5 border-accent-secondary-20 hover:bg-accent-secondary-10 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: OSI_COLORS[idx] }} />
                <div>
                  <p className="text-white font-bold text-sm">{layer}</p>
                  <p className="text-text-muted text-[10px]">{OSI_DESCS[idx]}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${result ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold ${result ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {result ? '✓ Perfect! Physical → Data Link → Network → Transport → Session → Presentation → Application'
                     : '✗ Not quite. The correct order is Physical (1) → Application (7). Click Reset to try again.'}
          </p>
        </motion.div>
      )}

      <div className="flex gap-3">
        {done && !result && (
          <button onClick={handleReset} className="flex-1 py-3 border border-white-10 text-text-muted rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-2 hover:bg-white-5 transition-all">
            <RefreshCw size={14} /> Reset
          </button>
        )}
        {done && (
          <button onClick={() => onComplete(result)} className="flex-1 neon-button-secondary py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// ── Level 3: IP Addressing ────────────────────────────────────────────────────
const L3_QUESTIONS = [
  {
    q: 'Which of these is a private (non-routable on the internet) IP address?',
    opts: ['8.8.8.8', '10.0.0.1', '1.1.1.1', '93.184.216.34'],
    ans: 1,
    exp: '10.0.0.1 belongs to the 10.0.0.0/8 private range (RFC 1918). Private IPs are never routed on the public internet.',
  },
  {
    q: 'What is the subnet mask for a /24 network (e.g. 192.168.1.0/24)?',
    opts: ['255.255.0.0', '255.0.0.0', '255.255.255.0', '255.255.255.128'],
    ans: 2,
    exp: '/24 means the first 24 bits are the network part, giving the mask 255.255.255.0. This allows 254 usable host addresses.',
  },
  {
    q: 'Which protocol automatically assigns IP addresses to new devices on a network?',
    opts: ['DNS', 'DHCP', 'FTP', 'ARP'],
    ans: 1,
    exp: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, gateways, and DNS servers to devices when they join the network.',
  },
  {
    q: 'What does the TTL (Time to Live) field in an IP packet do?',
    opts: ['Encrypts the packet data', "Defines the packet's maximum size", 'Limits the number of routers the packet can pass through', 'Specifies the destination port'],
    ans: 2,
    exp: 'TTL starts at a value (e.g. 64) and decrements by 1 at each router. When it hits 0 the packet is discarded — preventing infinite routing loops.',
  },
];

const Level3IPAddressing: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = L3_QUESTIONS[qIdx];
  const isCorrect = selected === q.ans;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= L3_QUESTIONS.length) onComplete(score >= 3);
    else { setQIdx(i => i + 1); setSelected(null); }
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Globe size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">IP Addressing & Protocols</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{qIdx + 1}/{L3_QUESTIONS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-6">Answer each question about IP addressing concepts.</p>

      <div className="p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-5">
        <p className="text-white font-bold">{q.q}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-5">
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)}
            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
              selected === null
                ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white hover:bg-accent-secondary-5 cursor-pointer'
                : i === q.ans
                  ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                  : selected === i
                    ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-default'
            }`}
          >
            <span className="font-black text-[10px] uppercase tracking-wider opacity-50" style={{ marginRight: '0.5rem' }}>{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">{q.exp}</p>
        </motion.div>
      )}

      {selected !== null && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {qIdx + 1 >= L3_QUESTIONS.length ? 'Finish Level' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 4: TCP 3-Way Handshake ──────────────────────────────────────────────
const HS_STEPS = [
  { label: 'SYN',     from: 'client', desc: 'Client → Server: "I want to connect!"' },
  { label: 'SYN-ACK', from: 'server', desc: 'Server → Client: "OK, I acknowledge. Ready!"' },
  { label: 'ACK',     from: 'client', desc: 'Client → Server: "Connection established!"' },
];
const HS_BUTTONS = ['FIN', 'ACK', 'SYN-ACK', 'RST', 'SYN'];

const Level4TCPHandshake: React.FC<LevelProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = (label: string) => {
    if (done) return;
    if (label === HS_STEPS[step].label) {
      if (step + 1 >= HS_STEPS.length) { setDone(true); }
      else setStep(s => s + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Wifi size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">TCP 3-Way Handshake</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Before any data flows over TCP, a 3-step handshake establishes the connection. Click the correct step in order.
      </p>

      {/* Diagram */}
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="p-4 bg-accent-secondary-10 border border-accent-secondary-20 rounded-2xl">
            <Monitor size={32} className="text-accent-secondary" />
          </div>
          <span className="text-xs font-bold text-white">CLIENT</span>
          <span className="text-[10px] text-text-muted font-mono">192.168.1.10</span>
        </div>

        <div className="flex-1 px-6 flex flex-col gap-3">
          {HS_STEPS.map((s, i) => {
            const isPast = i < step || done;
            const fromClient = s.from === 'client';
            return (
              <motion.div key={s.label} animate={{ opacity: isPast || done ? 1 : i === step ? 0.4 : 0.15 }}
                className={`flex items-center gap-2 ${fromClient ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`text-[10px] font-black px-3 py-1 rounded-full border ${isPast || done ? 'border-accent-primary-20 text-accent-primary bg-accent-primary-5' : 'border-white-10 text-text-muted bg-white-5'}`}>
                  {s.label}
                </div>
                <div className={`flex-1 h-px ${isPast || done ? 'bg-accent-primary' : 'bg-white-10'}`} />
                <ArrowRight size={14} className={isPast || done ? 'text-accent-primary' : 'text-text-muted'}
                  style={fromClient ? {} : { transform: 'rotate(180deg)' }} />
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="p-4 bg-accent-primary-10 border border-accent-primary-20 rounded-2xl">
            <Server size={32} className="text-accent-primary" />
          </div>
          <span className="text-xs font-bold text-white">SERVER</span>
          <span className="text-[10px] text-text-muted font-mono">93.184.216.34</span>
        </div>
      </div>

      {!done && (
        <div className="p-4 bg-accent-secondary-5 border border-accent-secondary-20 rounded-xl mb-5">
          <p className="text-accent-secondary text-[10px] font-black uppercase tracking-widest mb-1">
            Step {step + 1} of 3
          </p>
          <p className="text-text-secondary text-sm">
            {HS_STEPS[step].from === 'client' ? 'Client sends to Server' : 'Server sends to Client'} — which TCP flag?
          </p>
        </div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-accent-primary-5 border border-accent-primary-20 rounded-xl mb-5"
        >
          <p className="text-accent-primary font-bold">✓ Connection established! SYN → SYN-ACK → ACK. Data can now flow securely.</p>
        </motion.div>
      )}

      {!done && (
        <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} className="flex gap-3 flex-wrap">
          {HS_BUTTONS.map(btn => (
            <button key={btn} onClick={() => handleClick(btn)}
              className="px-5 py-3 rounded-xl border font-black text-sm uppercase tracking-wider transition-all bg-accent-secondary-5 border-accent-secondary-20 text-accent-secondary hover:bg-accent-secondary-10 cursor-pointer"
            >
              {btn}
            </button>
          ))}
        </motion.div>
      )}

      {done && (
        <button onClick={() => onComplete(true)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          Continue <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 5: Port Numbers ─────────────────────────────────────────────────────
const PORT_PAIRS = [
  { service: 'HTTP',  port: '80',  desc: 'Unencrypted web' },
  { service: 'HTTPS', port: '443', desc: 'Secure web (TLS)' },
  { service: 'SSH',   port: '22',  desc: 'Secure remote shell' },
  { service: 'DNS',   port: '53',  desc: 'Domain resolution' },
  { service: 'FTP',   port: '21',  desc: 'File transfer' },
];

const Level5Ports: React.FC<LevelProps> = ({ onComplete }) => {
  const [shuffledPorts] = useState(() => PORT_PAIRS.map(p => p.port).sort(() => Math.random() - 0.5));
  const [selectedSvc, setSelectedSvc] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongPort, setWrongPort] = useState<string | null>(null);

  const handleSvcClick = (svc: string) => {
    if (matched[svc]) return;
    setSelectedSvc(s => s === svc ? null : svc);
    setWrongPort(null);
  };

  const handlePortClick = (port: string) => {
    if (!selectedSvc) return;
    const correct = PORT_PAIRS.find(p => p.service === selectedSvc)?.port === port;
    if (correct) {
      setMatched(m => ({ ...m, [selectedSvc]: port }));
      setSelectedSvc(null);
    } else {
      setWrongPort(port);
      setTimeout(() => setWrongPort(null), 700);
    }
  };

  const allMatched = Object.keys(matched).length === PORT_PAIRS.length;

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Cpu size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Port Numbers</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Click a service, then click its matching port number. Ports tell the OS which application should handle each packet.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Services */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Services</p>
          {PORT_PAIRS.map(p => (
            <button key={p.service} onClick={() => handleSvcClick(p.service)} disabled={!!matched[p.service]}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                matched[p.service]
                  ? 'bg-accent-primary-5 border-accent-primary-20 opacity-40 cursor-default'
                  : selectedSvc === p.service
                    ? 'bg-accent-secondary-10 border-accent-secondary text-white cursor-pointer'
                    : 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white cursor-pointer'
              }`}
            >
              <p className="font-black text-sm">{p.service}</p>
              <p className="text-[10px] text-text-muted">{p.desc}</p>
              {matched[p.service] && (
                <p className="text-[10px] text-accent-primary font-bold mt-1">→ Port {matched[p.service]}</p>
              )}
            </button>
          ))}
        </div>

        {/* Ports */}
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Port Numbers</p>
          <div className="grid grid-cols-2 gap-3">
            {shuffledPorts.map(port => {
              const isMatched = Object.values(matched).includes(port);
              return (
                <button key={port} onClick={() => handlePortClick(port)} disabled={isMatched || !selectedSvc}
                  className={`p-4 rounded-xl border font-black text-2xl text-center transition-all ${
                    isMatched
                      ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary opacity-40 cursor-default'
                      : wrongPort === port
                        ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary'
                        : !selectedSvc
                          ? 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-not-allowed'
                          : 'bg-accent-secondary-5 border-accent-secondary-20 text-accent-secondary hover:bg-accent-secondary-10 cursor-pointer'
                  }`}
                >
                  {port}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedSvc && !allMatched && (
        <div className="mt-4 p-3 bg-accent-secondary-5 border border-accent-secondary-20 rounded-xl">
          <p className="text-accent-secondary text-sm">
            Selected: <strong>{selectedSvc}</strong> — now click its port number
          </p>
        </div>
      )}

      {allMatched && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="p-4 bg-accent-primary-5 border border-accent-primary-20 rounded-xl mb-4">
            <p className="text-accent-primary font-bold">✓ All ports matched! Memorizing common ports is a core skill in network security.</p>
          </div>
          <button onClick={() => onComplete(true)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 6: Packet Routing ───────────────────────────────────────────────────
const L6_QUESTIONS = [
  {
    q: 'Your packet starts at PC (192.168.1.10) and needs to reach a web server on the internet. Where does it go first?',
    opts: ['Directly to the web server', 'Default Gateway — Router A (192.168.1.1)', 'DNS Server (8.8.8.8)', 'Broadcast to all local devices'],
    ans: 1,
    exp: 'Packets destined for the internet always go to the default gateway first — the local router that bridges your network to the outside world.',
  },
  {
    q: 'Router A receives the packet. It checks its routing table. Which path does it choose?',
    opts: ['Return it to PC', 'ISP Border Router B (10.0.0.1)', 'Broadcast to all routers', 'Drop — TTL expired'],
    ans: 1,
    exp: 'Routers forward packets hop-by-hop using routing tables. Router A sends the packet to the ISP border router (Router B) as the next hop toward the internet.',
  },
  {
    q: 'The packet started with TTL=64 and has passed through 3 routers. What is the TTL now?',
    opts: ['64', '63', '61', '0'],
    ans: 2,
    exp: 'TTL decrements by 1 at each router. After 3 hops: 64 − 3 = 61. If it ever reaches 0 a "Time Exceeded" ICMP message is sent back.',
  },
  {
    q: 'The web server receives your packet. What does it check first to route it to the correct application?',
    opts: ['Source IP address', 'TTL value', 'Destination port number', 'Packet size'],
    ans: 2,
    exp: 'The server OS uses the destination port (e.g. 443 for HTTPS) to hand the packet to the right application — this is Transport Layer (L4) multiplexing at work.',
  },
];

const L6_HOPS = ['PC\n192.168.1.10', 'Router A\n192.168.1.1', 'Router B\n10.0.0.1', 'Server\n93.184.216.34'];

const Level6PacketRouting: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = L6_QUESTIONS[qIdx];
  const isCorrect = selected === q.ans;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= L6_QUESTIONS.length) onComplete(score >= 3);
    else { setQIdx(i => i + 1); setSelected(null); }
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Globe size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Packet Routing</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{qIdx + 1}/{L6_QUESTIONS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-6">Follow a packet's journey across the internet, hop by hop.</p>

      {/* Route visualization */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {L6_HOPS.map((hop, i) => (
          <React.Fragment key={i}>
            <div className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${i <= qIdx ? 'bg-accent-secondary-10 border-accent-secondary-20' : 'bg-white-5 border-white-10 opacity-30'}`}>
              <div className={`p-2 rounded-lg ${i === 0 ? 'text-accent-secondary' : i === L6_HOPS.length - 1 ? 'text-accent-primary' : 'text-text-muted'}`}>
                {i === 0 ? <Monitor size={18} /> : i === L6_HOPS.length - 1 ? <Server size={18} /> : <Globe size={18} />}
              </div>
              {hop.split('\n').map((line, j) => (
                <p key={j} className={`text-[10px] font-bold text-center font-mono ${j === 0 ? 'text-white' : 'text-text-muted'}`}>{line}</p>
              ))}
            </div>
            {i < L6_HOPS.length - 1 && (
              <ArrowRight size={14} className={`flex-shrink-0 ${i < qIdx ? 'text-accent-secondary' : 'text-text-muted opacity-30'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-5">
        <p className="text-white font-bold">{q.q}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-5">
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)}
            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
              selected === null
                ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white hover:bg-accent-secondary-5 cursor-pointer'
                : i === q.ans
                  ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                  : selected === i
                    ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-default'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">{q.exp}</p>
        </motion.div>
      )}

      {selected !== null && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {qIdx + 1 >= L6_QUESTIONS.length ? 'Finish Level' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 7: HTTP vs HTTPS Sniffing ──────────────────────────────────────────
const SNIFF_ITEMS = [
  { id: 'urlpath',  label: 'URL Path & Query',   sample: 'GET /account/transfer?to=attacker&amount=500', correct: 'hidden' },
  { id: 'password', label: 'Login Password',      sample: 'POST body: password=S3cret!23',               correct: 'hidden' },
  { id: 'cookie',   label: 'Session Cookie',      sample: 'Cookie: auth_token=a1b2c3d4e5...',            correct: 'hidden' },
  { id: 'domain',   label: 'Domain Name',         sample: 'SNI: banking.example.com',                    correct: 'visible' },
  { id: 'ip',       label: 'IP Addresses',        sample: '192.168.1.10 → 93.184.216.34',                correct: 'visible' },
  { id: 'body',     label: 'HTTP Response Body',  sample: 'Balance: $12,450.00 | Account: 4111...',      correct: 'hidden' },
];

const Level7Sniffing: React.FC<LevelProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, 'visible' | 'hidden'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleToggle = (id: string, val: 'visible' | 'hidden') => {
    if (submitted) return;
    setAnswers(a => ({ ...a, [id]: val }));
  };

  const handleSubmit = () => {
    let s = 0;
    SNIFF_ITEMS.forEach(item => { if (answers[item.id] === item.correct) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const allAnswered = SNIFF_ITEMS.every(i => answers[i.id]);

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Eye size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Sniffing — HTTP vs HTTPS</h2>
      </div>
      <p className="text-text-secondary text-sm mb-2">
        An attacker intercepts your traffic to <strong className="text-white">banking.example.com</strong>. If the site uses <strong className="text-accent-primary">HTTPS</strong>, which data is <strong className="text-accent-primary">hidden</strong> from them? Which is still <strong className="text-accent-tertiary">visible</strong>?
      </p>
      <div className="p-3 bg-accent-tertiary-5 border border-accent-tertiary-20 rounded-xl mb-5">
        <p className="text-accent-tertiary text-xs font-bold">⚠ Even HTTPS reveals domain names and IP addresses — only the payload is encrypted.</p>
      </div>

      <div className="space-y-3 mb-5">
        {SNIFF_ITEMS.map(item => {
          const ans = answers[item.id];
          const isCorrect = submitted && ans === item.correct;
          const isWrong = submitted && ans !== item.correct;
          return (
            <div key={item.id} className={`p-4 rounded-xl border transition-all ${isCorrect ? 'border-accent-primary-20 bg-accent-primary-5' : isWrong ? 'border-accent-tertiary-20 bg-accent-tertiary-5' : 'border-white-10 bg-white-5'}`}>
              <div className="flex items-center justify-between gap-4">
                <div style={{ flex: 1 }}>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-text-muted text-[10px] font-mono mt-1">{item.sample}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleToggle(item.id, 'visible')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'visible' ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary' : 'border-white-10 text-text-muted hover:border-accent-tertiary-20 hover:text-accent-tertiary cursor-pointer'}`}
                  >
                    <Eye size={10} style={{ display: 'inline', marginRight: '4px' }} />Visible
                  </button>
                  <button onClick={() => handleToggle(item.id, 'hidden')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'hidden' ? 'bg-accent-primary-10 border-accent-primary text-accent-primary' : 'border-white-10 text-text-muted hover:border-accent-primary-20 hover:text-accent-primary cursor-pointer'}`}
                  >
                    <Lock size={10} style={{ display: 'inline', marginRight: '4px' }} />HTTPS Hides
                  </button>
                </div>
              </div>
              {submitted && isWrong && (
                <p className="text-accent-tertiary text-[10px] mt-2 font-bold">
                  ✗ {item.correct === 'hidden' ? 'HTTPS encrypts this — the attacker cannot read it.' : 'This remains visible even in HTTPS (IP/domain headers are not encrypted).'}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!allAnswered}
          className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Check Answers <ArrowRight size={16} />
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`p-4 rounded-xl mb-4 ${score >= 5 ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-secondary-5 border border-accent-secondary-20'}`}>
            <p className={`font-bold mb-1 ${score >= 5 ? 'text-accent-primary' : 'text-accent-secondary'}`}>{score}/{SNIFF_ITEMS.length} correct</p>
            <p className="text-text-secondary text-xs leading-relaxed">HTTPS encrypts the entire payload — URL paths, cookies, passwords, body. But IP addresses and domain names (via SNI) remain visible even in HTTPS.</p>
          </div>
          <button onClick={() => onComplete(score >= 4)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 8: ARP Spoofing ─────────────────────────────────────────────────────
const L8_QUESTIONS = [
  {
    q: 'What does ARP stand for, and what does it do?',
    opts: ['Automated Routing Protocol — finds shortest path', 'Address Resolution Protocol — maps IP addresses to MAC addresses', 'Authentication Request Packet — verifies identity', 'Application Relay Protocol — proxies traffic'],
    ans: 1,
    exp: 'ARP maps IP addresses (Layer 3) to MAC addresses (Layer 2). When your PC wants to reach 192.168.1.1, it broadcasts "Who has 192.168.1.1? Tell me your MAC." The router replies with its MAC.',
  },
  {
    q: 'In an ARP spoofing attack, what exactly does the attacker do?',
    opts: ['Floods the network with SYN packets', 'Sends fake ARP replies linking their MAC to a victim\'s IP', 'Intercepts DNS queries to redirect traffic', 'Overflows the router\'s CAM table'],
    ans: 1,
    exp: 'The attacker broadcasts fake ARP replies: "192.168.1.1 is at MAC AA:BB:CC:DD:EE:FF (attacker\'s MAC)." Victims cache this and send all traffic to the attacker — a classic Man-in-the-Middle position.',
  },
  {
    q: 'After a successful ARP spoofing attack, what can the attacker do?',
    opts: ['Only crash the network — no data access', 'Only monitor traffic, cannot modify it', 'Intercept, read, and modify traffic between victims in real time', 'Only affect devices that initiated communication'],
    ans: 2,
    exp: 'ARP spoofing gives the attacker a full MITM position. They can read unencrypted data (passwords, cookies), inject malicious content into web pages, and forward modified traffic so victims notice nothing unusual.',
  },
  {
    q: 'Which defense best prevents ARP spoofing on a managed enterprise network?',
    opts: ['Using a stronger Wi-Fi password', 'Updating all devices\' operating systems', 'Dynamic ARP Inspection (DAI) on managed switches', 'Running antivirus on each endpoint'],
    ans: 2,
    exp: 'Dynamic ARP Inspection (DAI) validates ARP packets against a trusted DHCP snooping binding table. Any ARP reply not matching the table is dropped, preventing poisoned entries from reaching devices.',
  },
];

const Level8ARP: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = L8_QUESTIONS[qIdx];
  const isCorrect = selected === q.ans;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= L8_QUESTIONS.length) onComplete(score >= 3);
    else { setQIdx(i => i + 1); setSelected(null); }
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">ARP Spoofing Attack</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{qIdx + 1}/{L8_QUESTIONS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-4">ARP is a fundamental LAN protocol — its lack of authentication makes it a classic attack surface.</p>

      {qIdx === 1 && (
        <div className="p-4 bg-accent-tertiary-5 border border-accent-tertiary-20 rounded-xl mb-5 font-mono text-xs text-text-secondary">
          <p className="text-accent-tertiary font-bold mb-2">ARP Spoof — Scenario:</p>
          <p>• Victim A (192.168.1.10) wants to reach Router (192.168.1.1)</p>
          <p className="text-accent-tertiary mt-1">• Attacker sends: "192.168.1.1 is at MAC AA:BB:CC:DD:EE:FF" (FAKE)</p>
          <p className="mt-1">• Victim A caches this → all packets now go to the attacker</p>
        </div>
      )}

      <div className="p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-5">
        <p className="text-white font-bold">{q.q}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-5">
        {q.opts.map((opt, i) => (
          <button key={i} onClick={() => handleSelect(i)}
            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
              selected === null
                ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white hover:bg-accent-secondary-5 cursor-pointer'
                : i === q.ans
                  ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                  : selected === i
                    ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-default'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">{q.exp}</p>
        </motion.div>
      )}

      {selected !== null && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {qIdx + 1 >= L8_QUESTIONS.length ? 'Finish Level' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 9: Firewall Rules ───────────────────────────────────────────────────
const FW_RULES_TEXT = `RULE 1: ALLOW  TCP  ANY → 192.168.1.100 : 443
RULE 2: ALLOW  TCP  10.0.0.0/8 → 192.168.1.100 : 22
RULE 3: DENY   ALL`;

interface FWPacket { src: string; proto: string; port: number; correct: 'allow' | 'deny'; reason: string; }
const FW_PACKETS: FWPacket[] = [
  { src: '1.2.3.4',   proto: 'TCP', port: 443, correct: 'allow', reason: 'Rule 1 allows TCP from any source to port 443.' },
  { src: '1.2.3.4',   proto: 'TCP', port: 22,  correct: 'deny',  reason: '1.2.3.4 is outside 10.0.0.0/8. Rule 2 doesn\'t match. Rule 3 (DENY ALL) applies.' },
  { src: '10.0.0.5',  proto: 'UDP', port: 443, correct: 'deny',  reason: 'Rule 1 requires TCP, not UDP. Rule 3 catches this.' },
  { src: '10.0.0.5',  proto: 'TCP', port: 22,  correct: 'allow', reason: '10.0.0.5 is in 10.0.0.0/8. Rule 2 allows TCP to port 22.' },
  { src: '1.2.3.4',   proto: 'TCP', port: 80,  correct: 'deny',  reason: 'No rule allows port 80. Rule 3 (DENY ALL) applies.' },
  { src: '10.0.0.1',  proto: 'TCP', port: 443, correct: 'allow', reason: '10.0.0.1 is internal AND Rule 1 allows any TCP to port 443.' },
];

const Level9Firewall: React.FC<LevelProps> = ({ onComplete }) => {
  const [decisions, setDecisions] = useState<Record<number, 'allow' | 'deny'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDecision = (i: number, d: 'allow' | 'deny') => {
    if (submitted) return;
    setDecisions(p => ({ ...p, [i]: d }));
  };

  const handleSubmit = () => {
    let s = 0;
    FW_PACKETS.forEach((p, i) => { if (decisions[i] === p.correct) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const allDecided = FW_PACKETS.every((_, i) => decisions[i] !== undefined);

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Shield size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Firewall Rule Engine</h2>
      </div>
      <p className="text-text-secondary text-sm mb-4">Apply the ruleset to decide if each incoming packet should be ALLOWED or DENIED.</p>

      <div className="p-4 bg-bg-tertiary border border-white-10 rounded-xl mb-6 font-mono text-xs">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Active Ruleset</p>
        {FW_RULES_TEXT.split('\n').map((rule, i) => (
          <p key={i} className={`leading-relaxed ${i === 2 ? 'text-accent-tertiary' : 'text-accent-primary'}`}>{rule}</p>
        ))}
      </div>

      <div className="space-y-3 mb-5">
        {FW_PACKETS.map((pkt, i) => {
          const dec = decisions[i];
          const isCorrect = submitted && dec === pkt.correct;
          const isWrong = submitted && dec !== pkt.correct;
          return (
            <div key={i} className={`p-4 rounded-xl border transition-all ${isCorrect ? 'border-accent-primary-20 bg-accent-primary-5' : isWrong ? 'border-accent-tertiary-20 bg-accent-tertiary-5' : 'border-white-10 bg-white-5'}`}>
              <div className="flex items-center gap-4">
                <div style={{ flex: 1 }} className="font-mono text-xs">
                  <span className="text-accent-secondary">{pkt.proto}</span>
                  <span className="text-text-muted"> from </span>
                  <span className="text-white">{pkt.src}</span>
                  <span className="text-text-muted"> → :&nbsp;</span>
                  <span className="text-accent-primary">{pkt.port}</span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleDecision(i, 'allow')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${dec === 'allow' ? 'bg-accent-primary-10 border-accent-primary text-accent-primary' : 'border-white-10 text-text-muted hover:border-accent-primary-20 hover:text-accent-primary cursor-pointer'}`}
                  >Allow</button>
                  <button onClick={() => handleDecision(i, 'deny')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${dec === 'deny' ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary' : 'border-white-10 text-text-muted hover:border-accent-tertiary-20 hover:text-accent-tertiary cursor-pointer'}`}
                  >Deny</button>
                </div>
              </div>
              {submitted && (
                <p className={`text-[10px] mt-2 font-bold ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                  {isCorrect ? '✓' : '✗'} {pkt.reason}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!allDecided}
          className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Submit Decisions <ArrowRight size={16} />
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`p-4 rounded-xl mb-4 ${score >= 5 ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-secondary-5 border border-accent-secondary-20'}`}>
            <p className={`font-bold ${score >= 5 ? 'text-accent-primary' : 'text-accent-secondary'}`}>
              {score}/{FW_PACKETS.length} correct — {score >= 5 ? 'Excellent firewall instincts!' : 'Review the rule reasoning above.'}
            </p>
          </div>
          <button onClick={() => onComplete(score >= 4)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 10: Packet Builder ──────────────────────────────────────────────────
const Level10PacketBuilder: React.FC<LevelProps> = ({ onComplete }) => {
  const [dstIP, setDstIP] = useState('');
  const [protocol, setProtocol] = useState('TCP');
  const [port, setPort] = useState('');
  const [useEncryption, setUseEncryption] = useState(false);
  const [payload, setPayload] = useState('');
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!dstIP.match(/^\d{1,3}(\.\d{1,3}){3}$/))
      errs.push('Destination IP must be a valid IPv4 address (e.g. 93.184.216.34)');
    else if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(dstIP))
      errs.push('Use a public IP address (not private ranges like 10.x, 192.168.x, or 172.16-31.x)');
    if (!port) errs.push('Select a destination port');
    if (port === '443' && !useEncryption) errs.push('Port 443 is for HTTPS — toggle Encryption ON');
    if (port === '80' && useEncryption) errs.push('Port 80 is plain HTTP — use port 443 for encrypted traffic');
    if (!payload.trim()) errs.push('Payload cannot be empty');
    return errs;
  };

  const handleSend = () => {
    const errs = validate();
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);
    setAnimating(true);
    setTimeout(() => { setAnimating(false); setSent(true); }, 1500);
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Package size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Build & Send a Secure Packet</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Fill in the packet fields correctly. The system will validate your configuration before transmitting.
      </p>

      {!sent ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Source IP (your device)</label>
              <input value="192.168.1.10" readOnly
                className="w-full bg-bg-tertiary border border-white-10 rounded-xl px-4 py-3 text-sm text-text-muted opacity-60" />
            </div>
            <div>
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Destination IP *</label>
              <input type="text" value={dstIP} onChange={e => { setDstIP(e.target.value); setErrors([]); }}
                placeholder="e.g. 93.184.216.34"
                className="w-full bg-bg-tertiary border border-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-secondary transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Protocol *</label>
              <select value={protocol} onChange={e => setProtocol(e.target.value)}
                className="w-full bg-bg-tertiary border border-white-10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-secondary transition-all"
              >
                <option>TCP</option><option>UDP</option><option>ICMP</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Destination Port *</label>
              <select value={port} onChange={e => { setPort(e.target.value); setErrors([]); }}
                className="w-full bg-bg-tertiary border border-white-10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-secondary transition-all"
              >
                <option value="">-- Select port --</option>
                <option value="80">80 (HTTP)</option>
                <option value="443">443 (HTTPS)</option>
                <option value="22">22 (SSH)</option>
                <option value="21">21 (FTP)</option>
                <option value="53">53 (DNS)</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Payload / Message *</label>
            <input type="text" value={payload} onChange={e => { setPayload(e.target.value); setErrors([]); }}
              placeholder='e.g. GET /index.html HTTP/1.1'
              className="w-full bg-bg-tertiary border border-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-secondary transition-all" />
          </div>

          <div className="mb-6 flex items-center gap-4 p-4 bg-white-5 rounded-xl border border-white-10">
            <button onClick={() => { setUseEncryption(e => !e); setErrors([]); }}
              className={`w-12 h-6 rounded-full border transition-all relative flex-shrink-0 ${useEncryption ? 'bg-accent-primary border-accent-primary' : 'bg-white-10 border-white-10'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${useEncryption ? 'left-6' : 'left-0.5'}`} />
            </button>
            <div>
              <p className="text-white font-bold text-sm">Use Encryption (TLS / HTTPS)</p>
              <p className="text-text-muted text-xs">Required for port 443 — encrypts the entire payload</p>
            </div>
            {useEncryption && <Lock size={18} className="text-accent-primary" style={{ marginLeft: 'auto' }} />}
          </div>

          {errors.length > 0 && (
            <div className="p-4 bg-accent-tertiary-5 border border-accent-tertiary-20 rounded-xl mb-4">
              {errors.map((e, i) => <p key={i} className="text-accent-tertiary text-xs font-bold">✗ {e}</p>)}
            </div>
          )}

          <button onClick={handleSend} disabled={animating}
            className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            {animating
              ? <><RefreshCw size={16} className="animate-spin" /> Transmitting...</>
              : <>Send Packet <ArrowRight size={16} /></>}
          </button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="w-20 h-20 rounded-full bg-accent-primary-10 border-2 border-accent-primary flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-accent-primary" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Packet Delivered!</h3>
          <div className="p-5 bg-accent-primary-5 border border-accent-primary-20 rounded-2xl mb-4 text-left font-mono text-xs">
            <p className="text-text-muted">SRC: <span className="text-white">192.168.1.10</span></p>
            <p className="text-text-muted">DST: <span className="text-white">{dstIP}:{port}</span></p>
            <p className="text-text-muted">PROTO: <span className="text-white">{protocol}</span></p>
            <p className="text-text-muted">TLS: <span className={useEncryption ? 'text-accent-primary' : 'text-accent-tertiary'}>{useEncryption ? 'ENABLED ✓' : 'DISABLED'}</span></p>
            <p className="text-text-muted">PAYLOAD: <span className="text-white">{useEncryption ? '▒▒▒ ENCRYPTED ▒▒▒' : payload}</span></p>
          </div>
          <p className="text-text-secondary text-sm mb-6">
            {useEncryption
              ? 'Your data is encrypted. A network attacker cannot read the payload.'
              : 'Warning: payload transmitted in plaintext. Anyone on the network can read it.'}
          </p>
          <button onClick={() => onComplete(true)} className="neon-button-secondary px-8 py-3 text-sm flex items-center justify-center gap-2 mx-auto">
            Complete Lab <Trophy size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level Result ──────────────────────────────────────────────────────────────
const LevelResult: React.FC<{ correct: boolean; level: number; total: number; onNext: () => void }> = ({ correct, level, total, onNext }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    className="cyber-card p-12 text-center"
  >
    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${correct ? 'bg-accent-primary-10 border-2 border-accent-primary' : 'bg-accent-secondary-10 border-2 border-accent-secondary'}`}>
      {correct ? <CheckCircle2 size={40} className="text-accent-primary" /> : <Zap size={40} className="text-accent-secondary" />}
    </div>
    <h3 className="text-2xl font-black text-white mb-2">Level {level} Complete!</h3>
    <p className="text-text-secondary mb-8">
      {correct
        ? 'Great work! You demonstrated solid understanding of this concept.'
        : 'You finished the level — review the explanations above to reinforce your knowledge.'}
    </p>
    <button onClick={onNext} className="neon-button-secondary px-10 py-4 text-sm flex items-center justify-center gap-2 mx-auto">
      {level >= total ? 'Claim Certificate' : `Level ${level + 1} →`}
      {level >= total ? <Trophy size={16} /> : <ArrowRight size={16} />}
    </button>
  </motion.div>
);

// ── Certificate Screen ────────────────────────────────────────────────────────
const CertScreen: React.FC<{
  certName: string; setCertName: (n: string) => void;
  certSaved: boolean; onDownload: () => void;
}> = ({ certName, setCertName, certSaved, onDownload }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-8" style={{ minHeight: '100vh' }}
  >
    <div className="cyber-card p-12 max-w-lg w-full text-center bg-accent-secondary-5 border-accent-secondary-25">
      <div className="w-24 h-24 rounded-full bg-accent-secondary-10 border-2 border-accent-secondary flex items-center justify-center mx-auto mb-6">
        <Trophy size={48} className="text-accent-secondary" />
      </div>
      <h2 className="text-3xl font-black text-white mb-2">Lab Complete!</h2>
      <p className="text-text-secondary mb-2">You've mastered the fundamentals of</p>
      <p className="text-accent-secondary font-black text-xl mb-8">Network Packet Transmission</p>
      <p className="text-text-muted text-sm mb-3">Enter your name for the certificate:</p>
      <input type="text" value={certName} onChange={e => setCertName(e.target.value)}
        placeholder="Your full name..."
        className="w-full bg-bg-primary border border-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-secondary transition-all mb-4 text-center"
      />
      <button onClick={onDownload} disabled={!certName.trim() || certSaved}
        className={`w-full py-4 text-sm flex items-center justify-center gap-2 rounded-2xl font-black uppercase transition-all ${certSaved ? 'bg-accent-secondary text-bg-primary' : 'neon-button-secondary'} disabled:opacity-20 disabled:cursor-not-allowed`}
      >
        {certSaved ? <><Check size={18} /> Certificate Downloaded!</> : <><Download size={18} /> Download Certificate</>}
      </button>
    </div>
  </motion.div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const NetworkLab: React.FC<NetworkLabProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState(1);
  const [levelDone, setLevelDone] = useState(false);
  const [levelCorrect, setLevelCorrect] = useState(true);
  const [showCert, setShowCert] = useState(false);
  const [certName, setCertName] = useState(() => localStorage.getItem('cyberlab-username') ?? '');
  const [certSaved, setCertSaved] = useState(false);

  const handleLevelComplete = useCallback((correct: boolean = true) => {
    setLevelCorrect(correct);
    setLevelDone(true);
  }, []);

  const handleNextLevel = () => {
    if (level >= TOTAL_LEVELS) {
      setShowCert(true);
    } else {
      setLevel(l => l + 1);
      setLevelDone(false);
    }
  };

  const handleCertDownload = async () => {
    const name = certName.trim() || 'Student';
    const record: CertificateRecord = {
      moduleId: 'net-packets',
      moduleName: 'Network Packet Transmission',
      userName: name,
      date: new Date().toLocaleDateString(),
    };
    await generateCertificate(name, 'Network Packet Transmission');
    setCertSaved(true);
    onComplete(record);
  };

  const renderLevel = () => {
    if (levelDone) return <LevelResult correct={levelCorrect} level={level} total={TOTAL_LEVELS} onNext={handleNextLevel} />;
    switch (level) {
      case 1:  return <Level1PacketAnatomy  onComplete={handleLevelComplete} />;
      case 2:  return <Level2OSIModel       onComplete={handleLevelComplete} />;
      case 3:  return <Level3IPAddressing   onComplete={handleLevelComplete} />;
      case 4:  return <Level4TCPHandshake   onComplete={handleLevelComplete} />;
      case 5:  return <Level5Ports          onComplete={handleLevelComplete} />;
      case 6:  return <Level6PacketRouting  onComplete={handleLevelComplete} />;
      case 7:  return <Level7Sniffing       onComplete={handleLevelComplete} />;
      case 8:  return <Level8ARP            onComplete={handleLevelComplete} />;
      case 9:  return <Level9Firewall       onComplete={handleLevelComplete} />;
      case 10: return <Level10PacketBuilder onComplete={handleLevelComplete} />;
      default: return null;
    }
  };

  if (showIntro) {
    return (
      <IntroModal
        slides={INTRO_SLIDES}
        onStart={() => setShowIntro(false)}
        accentClass="text-accent-secondary"
        borderClass="border-accent-secondary-25"
        bgClass="bg-accent-secondary-5"
        buttonClass="neon-button-secondary"
      />
    );
  }

  if (showCert) {
    return <CertScreen certName={certName} setCertName={setCertName} certSaved={certSaved} onDownload={handleCertDownload} />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-secondary-10 rounded-xl text-accent-secondary">
            <Network size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Network Packet Lab</h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Level {level} of {TOTAL_LEVELS}</p>
          </div>
        </div>

        <div className="w-48">
          <div className="flex justify-between text-[10px] text-text-muted font-bold mb-1">
            <span>Progress</span>
            <span>{Math.round(((level - 1) / TOTAL_LEVELS) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white-5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-secondary rounded-full"
              animate={{ width: `${((level - 1) / TOTAL_LEVELS) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Level pills */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
        {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map(n => (
          <div key={n}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
              n < level
                ? 'bg-accent-secondary text-bg-primary border-accent-secondary'
                : n === level
                  ? 'bg-accent-secondary-10 border-accent-secondary text-accent-secondary'
                  : 'bg-white-5 border-white-10 text-text-muted opacity-30'
            }`}
          >
            {n < level ? '✓' : n}
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${level}-${levelDone}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {renderLevel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NetworkLab;
