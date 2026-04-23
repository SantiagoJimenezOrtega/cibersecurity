import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, ArrowRight, Lock, Monitor, Globe,
  CheckCircle2, XCircle, ShieldCheck,
  Trophy, Download, Check, Shield, Wifi, RefreshCw, Zap,
  AlertTriangle, Router, Smartphone, Home, WifiOff
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
    subtitle: 'How we connect',
    title: 'Wired & Wireless Networks',
    body: "Every device you use — phone, laptop, TV — connects to the internet in one of two ways: through a physical cable (wired) or through radio waves (wireless). Understanding how these connections work is the first step to staying safe online.",
    highlight: 'More than 5 billion people are connected to the internet today — through a mix of cables, Wi-Fi, and mobile networks.',
  },
  {
    icon: <Router size={40} />,
    subtitle: 'Your home network',
    title: 'How Devices Connect',
    body: 'At home, your modem connects to your ISP (Internet Service Provider). Your router shares that connection with all your devices. Each device gets a unique address on the network so data can find its way to the right place.',
    highlight: 'Your router is like a post office — it makes sure every message reaches the right device in your home.',
  },
  {
    icon: <Shield size={40} />,
    subtitle: 'Staying safe',
    title: 'Common Cybersecurity Risks',
    body: 'Being connected is powerful, but it comes with risks. Hackers use tricks like phishing emails, fake websites, and weak passwords to steal your information. Knowing the risks is your first line of defense.',
    highlight: "Over 80% of cyberattacks start with a simple phishing email — they don't need to hack your computer if they can trick you into giving your password.",
  },
  {
    icon: <Lock size={40} />,
    subtitle: 'Your mission',
    title: 'Build Your Network Knowledge',
    body: "In this lab you'll identify connection types, understand how data travels, recognize common cyber threats, and learn the habits that keep you safe. Each level builds on the last — by the end, you'll think like a cybersecurity professional.",
    highlight: 'Cybersecurity is not just about technology — 95% of breaches are caused by human error. Your awareness is the most powerful security tool.',
  },
];

// ── Shared helpers ────────────────────────────────────────────────────────────
const MCQ: React.FC<{
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  qNum: number;
  qTotal: number;
  onNext: (correct: boolean) => void;
}> = ({ question, options, answer, explanation, qNum, qTotal, onNext }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === answer;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Question {qNum} of {qTotal}</p>
      </div>
      <div className="p-5 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-5">
        <p className="text-white font-bold">{question}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 mb-5">
        {options.map((opt, i) => (
          <button key={i} onClick={() => selected === null && setSelected(i)}
            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
              selected === null
                ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white hover:bg-accent-secondary-5 cursor-pointer'
                : i === answer
                  ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                  : selected === i
                    ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-default'
            }`}
          >
            <span className="font-black text-[10px] uppercase tracking-wider opacity-50 mr-2">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${correct ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold mb-1 ${correct ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {correct ? '✓ Correct!' : '✗ Not quite.'}
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">{explanation}</p>
        </motion.div>
      )}
      {selected !== null && (
        <button onClick={() => onNext(correct)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {qNum >= qTotal ? 'Finish Level' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 1: Wired vs Wireless ────────────────────────────────────────────────
const L1_SCENARIOS = [
  { text: 'Your laptop has an Ethernet cable plugged into the wall.', answer: 'wired', icon: '🖥️' },
  { text: 'Your phone connects to the school Wi-Fi network.', answer: 'wireless', icon: '📱' },
  { text: 'A desktop computer is connected to the router via a cable.', answer: 'wired', icon: '🖥️' },
  { text: 'A smart TV streams Netflix through the home Wi-Fi.', answer: 'wireless', icon: '📺' },
  { text: 'A printer is connected to the network using an Ethernet port.', answer: 'wired', icon: '🖨️' },
  { text: 'You use your phone as a hotspot for your laptop.', answer: 'wireless', icon: '📡' },
];

const Level1WiredWireless: React.FC<LevelProps> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const scenario = L1_SCENARIOS[idx];
  const isCorrect = selected === scenario.answer;

  const handleSelect = (val: string) => {
    if (selected) return;
    setSelected(val);
    if (val === scenario.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx + 1 >= L1_SCENARIOS.length) { onComplete(score + (isCorrect ? 1 : 0) >= 4); return; }
    setIdx(i => i + 1);
    setSelected(null);
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Wifi size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Wired or Wireless?</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{idx + 1}/{L1_SCENARIOS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-6">Read each scenario and identify the type of connection.</p>

      <div className="p-6 bg-accent-secondary-5 border border-accent-secondary-20 rounded-2xl mb-6 text-center">
        <p className="text-4xl mb-3">{scenario.icon}</p>
        <p className="text-white font-bold text-lg">{scenario.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {['wired', 'wireless'].map(opt => (
          <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected}
            className={`p-5 rounded-2xl border font-black text-sm uppercase tracking-wider transition-all flex flex-col items-center gap-3 ${
              selected === opt
                ? opt === scenario.answer
                  ? 'bg-accent-primary-10 border-accent-primary text-accent-primary'
                  : 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary'
                : selected && opt === scenario.answer
                  ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary'
                  : !selected
                    ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white hover:bg-accent-secondary-5 cursor-pointer'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-30 cursor-default'
            }`}
          >
            {opt === 'wired' ? <Monitor size={24} /> : <Wifi size={24} />}
            {opt === 'wired' ? 'Wired' : 'Wireless'}
            <p className="text-[10px] font-normal normal-case opacity-70">
              {opt === 'wired' ? 'Cable / Ethernet' : 'Wi-Fi / Radio waves'}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {isCorrect ? `✓ Correct! This is a ${scenario.answer} connection.` : `✗ This is actually a ${scenario.answer} connection.`}
          </p>
        </motion.div>
      )}

      {selected && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {idx + 1 >= L1_SCENARIOS.length ? 'Finish Level' : 'Next Scenario'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 2: Network Components Match ─────────────────────────────────────────
const L2_PAIRS = [
  { device: 'Modem',          desc: 'Connects your home to the internet via your ISP' },
  { device: 'Router',         desc: 'Shares the internet connection with all home devices' },
  { device: 'Switch',         desc: 'Connects multiple wired devices in the same network' },
  { device: 'Access Point',   desc: 'Broadcasts the Wi-Fi signal so devices can connect wirelessly' },
];

const Level2NetworkComponents: React.FC<LevelProps> = ({ onComplete }) => {
  const [shuffledDescs] = useState(() => [...L2_PAIRS].map(p => p.desc).sort(() => Math.random() - 0.5));
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongDesc, setWrongDesc] = useState<string | null>(null);

  const handleDeviceClick = (device: string) => {
    if (matched[device]) return;
    setSelectedDevice(d => d === device ? null : device);
    setWrongDesc(null);
  };

  const handleDescClick = (desc: string) => {
    if (!selectedDevice) return;
    const correct = L2_PAIRS.find(p => p.device === selectedDevice)?.desc === desc;
    if (correct) {
      setMatched(m => ({ ...m, [selectedDevice]: desc }));
      setSelectedDevice(null);
    } else {
      setWrongDesc(desc);
      setTimeout(() => setWrongDesc(null), 700);
    }
  };

  const allMatched = Object.keys(matched).length === L2_PAIRS.length;

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Router size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Network Components</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Click a device name, then click its correct description. Match all 4!
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Devices</p>
          {L2_PAIRS.map(p => (
            <button key={p.device} onClick={() => handleDeviceClick(p.device)} disabled={!!matched[p.device]}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                matched[p.device]
                  ? 'bg-accent-primary-5 border-accent-primary-20 opacity-40 cursor-default'
                  : selectedDevice === p.device
                    ? 'bg-accent-secondary-10 border-accent-secondary text-white cursor-pointer'
                    : 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white cursor-pointer'
              }`}
            >
              <p className="font-black text-sm">{p.device}</p>
              {matched[p.device] && <p className="text-[10px] text-accent-primary font-bold mt-1">✓ Matched</p>}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Descriptions</p>
          {shuffledDescs.map(desc => {
            const isMatched = Object.values(matched).includes(desc);
            return (
              <button key={desc} onClick={() => handleDescClick(desc)} disabled={isMatched || !selectedDevice}
                className={`w-full p-4 rounded-xl border text-left text-xs leading-relaxed transition-all ${
                  isMatched
                    ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary opacity-40 cursor-default'
                    : wrongDesc === desc
                      ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary'
                      : !selectedDevice
                        ? 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-not-allowed'
                        : 'bg-accent-secondary-5 border-accent-secondary-20 text-text-secondary hover:bg-accent-secondary-10 cursor-pointer'
                }`}
              >
                {desc}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDevice && !allMatched && (
        <div className="mt-4 p-3 bg-accent-secondary-5 border border-accent-secondary-20 rounded-xl">
          <p className="text-accent-secondary text-sm">Selected: <strong>{selectedDevice}</strong> — now click its description</p>
        </div>
      )}

      {allMatched && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="p-4 bg-accent-primary-5 border border-accent-primary-20 rounded-xl mb-4">
            <p className="text-accent-primary font-bold">✓ All matched! These are the key pieces of every home and office network.</p>
          </div>
          <button onClick={() => onComplete(true)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 3: How Data Travels ─────────────────────────────────────────────────
const L3_QUESTIONS = [
  {
    q: "Why does the internet break data into small pieces called 'packets' instead of sending one big file?",
    opts: [
      'Because files are too large to name',
      'So multiple packets can travel different paths and arrive faster and more reliably',
      'To make it easier for hackers to intercept',
      'Because computers can only store small amounts of data',
    ],
    ans: 1,
    exp: "Packets can take different routes across the internet and arrive out of order — your device reassembles them. This makes the network more reliable: if one path is busy or broken, packets take another route.",
  },
  {
    q: 'What information does every packet carry so it can reach the right destination?',
    opts: [
      'The name of the person who sent it',
      'The source and destination address (IP addresses)',
      'A password to unlock it at the destination',
      'The time and date it was created',
    ],
    ans: 1,
    exp: 'Every packet has a header containing the source IP (where it came from) and destination IP (where it\'s going) — like the addresses on an envelope.',
  },
  {
    q: "When you load a webpage, your device receives hundreds of packets. What does it do with them?",
    opts: [
      'Displays each packet one by one as they arrive',
      'Waits for the first packet then ignores the rest',
      'Reassembles them in the correct order to display the full webpage',
      'Sends them back to the server for verification',
    ],
    ans: 2,
    exp: 'Packets are numbered so your device knows the correct order. It waits until all pieces arrive and then reassembles them — just like putting together a puzzle.',
  },
  {
    q: 'Which analogy best describes how packets work?',
    opts: [
      'Like a telephone call — continuous, unbroken stream of data',
      'Like mailing a book one page at a time — each page finds its own route and they\'re reassembled on arrival',
      'Like a fax — the whole document is sent at once over a single line',
      'Like a radio broadcast — everyone receives the same data simultaneously',
    ],
    ans: 1,
    exp: 'Packets are like mailing a book page by page. Each page (packet) may travel a different route through the postal system (internet). The recipient assembles the pages in order once all arrive.',
  },
];

const Level3HowDataTravels: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = (correct: boolean) => {
    const newScore = score + (correct ? 1 : 0);
    if (qIdx + 1 >= L3_QUESTIONS.length) { onComplete(newScore >= 3); return; }
    setScore(newScore);
    setQIdx(i => i + 1);
  };

  const q = L3_QUESTIONS[qIdx];
  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">How Data Travels</h2>
      </div>
      <MCQ key={qIdx} question={q.q} options={q.opts} answer={q.ans} explanation={q.exp}
        qNum={qIdx + 1} qTotal={L3_QUESTIONS.length} onNext={handleNext} />
    </div>
  );
};

// ── Level 4: Internet Connection Journey — Order the Steps ────────────────────
const L4_STEPS = [
  { id: 'a', text: 'Your device sends a request through your home Wi-Fi or cable' },
  { id: 'b', text: 'The router receives it and sends it to the modem' },
  { id: 'c', text: 'The modem connects to your ISP (Internet Service Provider)' },
  { id: 'd', text: 'The ISP routes your request across the internet' },
  { id: 'e', text: 'The website\'s server receives your request and sends back the webpage' },
];

const Level4InternetJourney: React.FC<LevelProps> = ({ onComplete }) => {
  const [shuffled] = useState(() => [...L4_STEPS].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(false);

  const handleClick = (id: string) => {
    if (done || selected.includes(id)) return;
    const next = [...selected, id];
    setSelected(next);
    if (next.length === L4_STEPS.length) {
      const ok = next.every((s, i) => s === L4_STEPS[i].id);
      setDone(true);
      setResult(ok);
    }
  };

  const handleReset = () => { setSelected([]); setDone(false); setResult(false); };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Globe size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Internet Connection Journey</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">
        Click the steps <strong className="text-white">in the correct order</strong> — from your device all the way to the website.
      </p>

      {/* Progress slots */}
      <div className="flex gap-1 mb-6">
        {L4_STEPS.map((_, i) => {
          const stepId = selected[i];
          const correct = stepId === L4_STEPS[i].id;
          return (
            <div key={i} style={{ flex: 1 }}
              className={`h-8 rounded-xl border flex items-center justify-center text-[10px] font-black transition-all ${
                stepId
                  ? done && !correct ? 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary'
                    : done && correct ? 'bg-accent-primary-10 border-accent-primary-20 text-accent-primary'
                    : 'bg-accent-secondary-10 border-accent-secondary-20 text-accent-secondary'
                  : 'bg-white-5 border-white-10 text-text-muted'
              }`}
            >
              {stepId ? (done ? (correct ? '✓' : '✗') : `${i + 1}`) : `${i + 1}`}
            </div>
          );
        })}
      </div>

      {/* Step tiles */}
      <div className="space-y-3 mb-6">
        {shuffled.map(step => {
          const isSelected = selected.includes(step.id);
          return (
            <button key={step.id} onClick={() => handleClick(step.id)} disabled={isSelected || done}
              className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${
                isSelected
                  ? 'opacity-30 cursor-not-allowed bg-white-5 border-white-10 text-text-muted'
                  : 'bg-accent-secondary-5 border-accent-secondary-20 text-text-secondary hover:bg-accent-secondary-10 hover:text-white cursor-pointer'
              }`}
            >
              {step.text}
            </button>
          );
        })}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${result ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold ${result ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {result ? '✓ Perfect order! Device → Router → Modem → ISP → Internet → Server'
                     : '✗ Not quite. The correct path goes: Device → Router → Modem → ISP → Internet → Server.'}
          </p>
        </motion.div>
      )}

      <div className="flex gap-3">
        {done && !result && (
          <button onClick={handleReset} className="flex-1 py-3 border border-white-10 text-text-muted rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-2 hover:bg-white-5 transition-all">
            <RefreshCw size={14} /> Try Again
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

// ── Level 5: Private vs Public Networks ───────────────────────────────────────
const L5_NETWORKS = [
  { name: 'Coffee shop Wi-Fi',          correct: 'public',  icon: '☕', hint: 'Open to anyone who walks in' },
  { name: 'Your home Wi-Fi',            correct: 'private', icon: '🏠', hint: 'Password-protected, only your family' },
  { name: 'School network',             correct: 'private', icon: '🏫', hint: 'Controlled by IT, only for students/staff' },
  { name: 'Airport free Wi-Fi',         correct: 'public',  icon: '✈️', hint: 'Open to all travelers' },
  { name: 'Your phone\'s mobile data',  correct: 'private', icon: '📱', hint: 'Your personal SIM, only you use it' },
  { name: 'Hotel lobby Wi-Fi',          correct: 'public',  icon: '🏨', hint: 'Available to all hotel guests' },
];

const Level5PrivatePublic: React.FC<LevelProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, 'private' | 'public'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleToggle = (i: number, val: 'private' | 'public') => {
    if (submitted) return;
    setAnswers(a => ({ ...a, [i]: val }));
  };

  const handleSubmit = () => {
    let s = 0;
    L5_NETWORKS.forEach((n, i) => { if (answers[i] === n.correct) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const allAnswered = L5_NETWORKS.every((_, i) => answers[i] !== undefined);

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <WifiOff size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Private or Public Network?</h2>
      </div>
      <p className="text-text-secondary text-sm mb-2">Classify each network. This matters for your security!</p>
      <div className="p-3 bg-accent-tertiary-5 border border-accent-tertiary-20 rounded-xl mb-5">
        <p className="text-accent-tertiary text-xs font-bold">⚠ Public networks are risky — anyone nearby can see your unencrypted traffic.</p>
      </div>

      <div className="space-y-3 mb-5">
        {L5_NETWORKS.map((net, i) => {
          const ans = answers[i];
          const isCorrect = submitted && ans === net.correct;
          const isWrong = submitted && ans && ans !== net.correct;
          return (
            <div key={i} className={`p-4 rounded-xl border transition-all ${isCorrect ? 'border-accent-primary-20 bg-accent-primary-5' : isWrong ? 'border-accent-tertiary-20 bg-accent-tertiary-5' : 'border-white-10 bg-bg-tertiary'}`}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{net.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{net.name}</p>
                    {submitted && <p className="text-text-muted text-[10px]">{net.hint}</p>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleToggle(i, 'private')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'private' ? 'bg-accent-primary-10 border-accent-primary text-accent-primary' : 'border-white-10 text-text-muted hover:border-accent-primary-20 hover:text-accent-primary cursor-pointer'}`}
                  >🔒 Private</button>
                  <button onClick={() => handleToggle(i, 'public')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'public' ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary' : 'border-white-10 text-text-muted hover:border-accent-tertiary-20 hover:text-accent-tertiary cursor-pointer'}`}
                  >🌐 Public</button>
                </div>
              </div>
              {submitted && isWrong && (
                <p className="text-accent-tertiary text-[10px] mt-2 font-bold">
                  ✗ This is a <strong>{net.correct}</strong> network — {net.hint.toLowerCase()}.
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
            <p className={`font-bold mb-1 ${score >= 5 ? 'text-accent-primary' : 'text-accent-secondary'}`}>{score}/{L5_NETWORKS.length} correct</p>
            <p className="text-text-secondary text-xs leading-relaxed">Always think twice before connecting to a public network — avoid logging into banks or entering passwords on public Wi-Fi.</p>
          </div>
          <button onClick={() => onComplete(score >= 4)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 6: Common Cybersecurity Risks — Match ───────────────────────────────
const L6_PAIRS = [
  { threat: 'Phishing',          desc: 'A fake email tricks you into clicking a link and entering your password' },
  { threat: 'Malware',           desc: 'Malicious software installed on your device without your knowledge' },
  { threat: 'Weak Password',     desc: 'Using "123456" makes it easy for attackers to guess your credentials' },
  { threat: 'Social Engineering',desc: 'An attacker pretends to be IT support to get you to reveal your password' },
];

const Level6CyberRisks: React.FC<LevelProps> = ({ onComplete }) => {
  const [shuffledDescs] = useState(() => [...L6_PAIRS].map(p => p.desc).sort(() => Math.random() - 0.5));
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrongDesc, setWrongDesc] = useState<string | null>(null);

  const handleThreatClick = (threat: string) => {
    if (matched[threat]) return;
    setSelectedThreat(t => t === threat ? null : threat);
    setWrongDesc(null);
  };

  const handleDescClick = (desc: string) => {
    if (!selectedThreat) return;
    const correct = L6_PAIRS.find(p => p.threat === selectedThreat)?.desc === desc;
    if (correct) {
      setMatched(m => ({ ...m, [selectedThreat]: desc }));
      setSelectedThreat(null);
    } else {
      setWrongDesc(desc);
      setTimeout(() => setWrongDesc(null), 700);
    }
  };

  const allMatched = Object.keys(matched).length === L6_PAIRS.length;

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Cybersecurity Threats</h2>
      </div>
      <p className="text-text-secondary text-sm mb-6">Match each threat with its correct description. Click a threat, then its description.</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Threats</p>
          {L6_PAIRS.map(p => (
            <button key={p.threat} onClick={() => handleThreatClick(p.threat)} disabled={!!matched[p.threat]}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                matched[p.threat]
                  ? 'bg-accent-primary-5 border-accent-primary-20 opacity-40 cursor-default'
                  : selectedThreat === p.threat
                    ? 'bg-accent-secondary-10 border-accent-secondary text-white cursor-pointer'
                    : 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white cursor-pointer'
              }`}
            >
              <p className="font-black text-sm">{p.threat}</p>
              {matched[p.threat] && <p className="text-[10px] text-accent-primary font-bold mt-1">✓ Matched</p>}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Descriptions</p>
          {shuffledDescs.map(desc => {
            const isMatched = Object.values(matched).includes(desc);
            return (
              <button key={desc} onClick={() => handleDescClick(desc)} disabled={isMatched || !selectedThreat}
                className={`w-full p-4 rounded-xl border text-left text-xs leading-relaxed transition-all ${
                  isMatched
                    ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary opacity-40 cursor-default'
                    : wrongDesc === desc
                      ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary'
                      : !selectedThreat
                        ? 'bg-white-5 border-white-10 text-text-muted opacity-40 cursor-not-allowed'
                        : 'bg-accent-secondary-5 border-accent-secondary-20 text-text-secondary hover:bg-accent-secondary-10 cursor-pointer'
                }`}
              >
                {desc}
              </button>
            );
          })}
        </div>
      </div>

      {selectedThreat && !allMatched && (
        <div className="mt-4 p-3 bg-accent-secondary-5 border border-accent-secondary-20 rounded-xl">
          <p className="text-accent-secondary text-sm">Selected: <strong>{selectedThreat}</strong> — now click its description</p>
        </div>
      )}

      {allMatched && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="p-4 bg-accent-primary-5 border border-accent-primary-20 rounded-xl mb-4">
            <p className="text-accent-primary font-bold">✓ All matched! Recognizing these threats is your first line of defense.</p>
          </div>
          <button onClick={() => onComplete(true)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 7: Spot the Phishing ────────────────────────────────────────────────
const L7_MESSAGES = [
  {
    from: 'security@bank0f-america.net',
    subject: 'URGENT: Your account will be closed in 24 hours!',
    body: 'Dear Customer, We detected suspicious activity. Click here immediately to verify your account or it will be permanently suspended.',
    type: 'phishing',
    clues: ['Fake domain (bank0f-america.net — notice the 0 instead of o)', 'Creates false urgency', 'Threatens consequences to panic you'],
  },
  {
    from: 'noreply@github.com',
    subject: 'Your pull request was merged',
    body: "Congrats! Your pull request #42 'Fix login bug' was merged into main by @teamlead. View it on GitHub.",
    type: 'legitimate',
    clues: ['Correct official domain (github.com)', 'No urgency or threats', 'Specific details about your actual activity'],
  },
  {
    from: 'prize-winner@free-gifts-2024.com',
    subject: 'You won an iPhone 15! Claim NOW',
    body: "Congratulations!!! You've been selected as today's winner. Send your home address and credit card to claim your free prize immediately!",
    type: 'phishing',
    clues: ['Suspicious domain (free-gifts-2024.com)', 'Too good to be true offer', 'Asks for personal and financial information'],
  },
  {
    from: 'notifications@linkedin.com',
    subject: 'John Smith viewed your profile',
    body: 'Hi Alex, John Smith from Acme Corp viewed your LinkedIn profile. See who else viewed your profile this week.',
    type: 'legitimate',
    clues: ['Official LinkedIn domain', 'Normal notification with no action required', 'No requests for personal information'],
  },
];

const Level7Phishing: React.FC<LevelProps> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const msg = L7_MESSAGES[idx];
  const isCorrect = selected === msg.type;

  const handleSelect = (val: string) => {
    if (selected) return;
    setSelected(val);
    if (val === msg.type) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx + 1 >= L7_MESSAGES.length) { onComplete(score + (isCorrect ? 1 : 0) >= 3); return; }
    setIdx(i => i + 1);
    setSelected(null);
  };

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Spot the Phishing Email</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{idx + 1}/{L7_MESSAGES.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-5">Read this email carefully. Is it legitimate or a phishing attempt?</p>

      <div className="p-5 bg-bg-tertiary border border-white-10 rounded-2xl mb-5 font-mono text-xs space-y-2">
        <p><span className="text-text-muted">From: </span><span className="text-accent-tertiary">{msg.from}</span></p>
        <p><span className="text-text-muted">Subject: </span><span className="text-white font-bold">{msg.subject}</span></p>
        <div className="border-t border-white-10 pt-3 mt-3">
          <p className="text-text-secondary leading-relaxed font-sans text-sm">{msg.body}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {[
          { val: 'phishing', label: 'Phishing', emoji: '🎣', color: 'tertiary' },
          { val: 'legitimate', label: 'Legitimate', emoji: '✅', color: 'primary' },
        ].map(opt => (
          <button key={opt.val} onClick={() => handleSelect(opt.val)} disabled={!!selected}
            className={`p-5 rounded-2xl border font-black text-sm uppercase tracking-wider transition-all flex flex-col items-center gap-2 ${
              selected === opt.val
                ? opt.val === msg.type
                  ? 'bg-accent-primary-10 border-accent-primary text-accent-primary'
                  : 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary'
                : selected && opt.val === msg.type
                  ? 'bg-accent-primary-5 border-accent-primary-20 text-accent-primary'
                  : !selected
                    ? 'bg-white-5 border-white-10 text-text-secondary hover:border-accent-secondary-20 hover:text-white cursor-pointer'
                    : 'bg-white-5 border-white-10 text-text-muted opacity-30 cursor-default'
            }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-tertiary-5 border border-accent-tertiary-20'}`}
        >
          <p className={`text-sm font-bold mb-2 ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
            {isCorrect ? `✓ Correct! This is ${msg.type}.` : `✗ This is actually ${msg.type}.`}
          </p>
          <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mb-1">Red flags / clues:</p>
          <ul className="space-y-1">
            {msg.clues.map((c, i) => (
              <li key={i} className="text-text-secondary text-xs">• {c}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {selected && (
        <button onClick={handleNext} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
          {idx + 1 >= L7_MESSAGES.length ? 'Finish Level' : 'Next Email'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// ── Level 8: Safe vs Unsafe Behaviors ─────────────────────────────────────────
const L8_BEHAVIORS = [
  { text: 'Use the same password for all your accounts', correct: 'unsafe', reason: 'If one account is hacked, all others are compromised too.' },
  { text: 'Enable two-factor authentication (2FA) on email and bank accounts', correct: 'safe', reason: '2FA adds a second verification step, making it much harder for attackers.' },
  { text: 'Click a link in an unexpected email asking you to "verify your account"', correct: 'unsafe', reason: 'This is a classic phishing technique. Always go to the website directly.' },
  { text: 'Keep your phone and computer software updated', correct: 'safe', reason: 'Updates patch security vulnerabilities that attackers could exploit.' },
  { text: 'Connect to any free public Wi-Fi to check your bank account', correct: 'unsafe', reason: 'Public Wi-Fi is unencrypted — attackers on the same network can intercept your data.' },
  { text: 'Log out of accounts when using a shared or public computer', correct: 'safe', reason: 'Logging out prevents the next person from accessing your account.' },
];

const Level8SafeUnsafe: React.FC<LevelProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, 'safe' | 'unsafe'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleToggle = (i: number, val: 'safe' | 'unsafe') => {
    if (submitted) return;
    setAnswers(a => ({ ...a, [i]: val }));
  };

  const handleSubmit = () => {
    let s = 0;
    L8_BEHAVIORS.forEach((b, i) => { if (answers[i] === b.correct) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const allAnswered = L8_BEHAVIORS.every((_, i) => answers[i] !== undefined);

  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Safe or Unsafe?</h2>
      </div>
      <p className="text-text-secondary text-sm mb-5">Rate each behavior. Your choices reveal your cybersecurity instincts!</p>

      <div className="space-y-3 mb-5">
        {L8_BEHAVIORS.map((b, i) => {
          const ans = answers[i];
          const isCorrect = submitted && ans === b.correct;
          const isWrong = submitted && ans && ans !== b.correct;
          return (
            <div key={i} className={`p-4 rounded-xl border transition-all ${isCorrect ? 'border-accent-primary-20 bg-accent-primary-5' : isWrong ? 'border-accent-tertiary-20 bg-accent-tertiary-5' : 'border-white-10 bg-bg-tertiary'}`}>
              <div className="flex items-center justify-between gap-4">
                <p className="text-white font-semibold text-sm flex-1">{b.text}</p>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleToggle(i, 'safe')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'safe' ? 'bg-accent-primary-10 border-accent-primary text-accent-primary' : 'border-white-10 text-text-muted hover:border-accent-primary-20 hover:text-accent-primary cursor-pointer'}`}
                  >✓ Safe</button>
                  <button onClick={() => handleToggle(i, 'unsafe')} disabled={submitted}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${ans === 'unsafe' ? 'bg-accent-tertiary-10 border-accent-tertiary text-accent-tertiary' : 'border-white-10 text-text-muted hover:border-accent-tertiary-20 hover:text-accent-tertiary cursor-pointer'}`}
                  >✗ Unsafe</button>
                </div>
              </div>
              {submitted && (
                <p className={`text-[10px] mt-2 font-bold ${isCorrect ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                  {isCorrect ? '✓' : `✗ This is ${b.correct}.`} {b.reason}
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
          Submit <ArrowRight size={16} />
        </button>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`p-4 rounded-xl mb-4 ${score >= 5 ? 'bg-accent-primary-5 border border-accent-primary-20' : 'bg-accent-secondary-5 border border-accent-secondary-20'}`}>
            <p className={`font-bold ${score >= 5 ? 'text-accent-primary' : 'text-accent-secondary'}`}>{score}/{L8_BEHAVIORS.length} correct</p>
          </div>
          <button onClick={() => onComplete(score >= 4)} className="neon-button-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ── Level 9: Password & Network Security Best Practices ───────────────────────
const L9_QUESTIONS = [
  {
    q: 'Which of these is the strongest password?',
    opts: ['password123', 'John1990', 'Tr0ub4dor&3!zK', 'qwerty'],
    ans: 2,
    exp: 'A strong password is long (12+ characters), mixes uppercase, lowercase, numbers, and symbols, and avoids personal information or dictionary words.',
  },
  {
    q: "You're at an airport using public Wi-Fi. What should you avoid doing?",
    opts: [
      'Browsing news websites',
      'Logging into your bank account',
      'Watching YouTube videos',
      'Checking the weather',
    ],
    ans: 1,
    exp: "Public Wi-Fi is unencrypted. Avoid logging into sensitive accounts (banking, email) on public networks. If you must, use a VPN.",
  },
  {
    q: 'What does Two-Factor Authentication (2FA) do?',
    opts: [
      'Requires you to enter your password twice',
      'Blocks all hackers automatically',
      'Adds a second verification step (like a text code) after your password',
      'Encrypts your entire hard drive',
    ],
    ans: 2,
    exp: 'Even if someone steals your password, 2FA stops them — they also need your phone or a second code to access the account.',
  },
  {
    q: 'You receive an email with an urgent link to "reset your password immediately." What is the safest action?',
    opts: [
      'Click the link and enter your new password quickly',
      'Forward it to all your contacts as a warning',
      'Delete it and go directly to the website by typing the URL in your browser',
      'Reply to ask if the email is real',
    ],
    ans: 2,
    exp: 'Never click links in suspicious emails. Always navigate directly to the website yourself. Phishing sites can look identical to real ones.',
  },
];

const Level9BestPractices: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = (correct: boolean) => {
    const newScore = score + (correct ? 1 : 0);
    if (qIdx + 1 >= L9_QUESTIONS.length) { onComplete(newScore >= 3); return; }
    setScore(newScore);
    setQIdx(i => i + 1);
  };

  const q = L9_QUESTIONS[qIdx];
  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Security Best Practices</h2>
      </div>
      <MCQ key={qIdx} question={q.q} options={q.opts} answer={q.ans} explanation={q.exp}
        qNum={qIdx + 1} qTotal={L9_QUESTIONS.length} onNext={handleNext} />
    </div>
  );
};

// ── Level 10: Real-World Scenario Challenge ───────────────────────────────────
const L10_SCENARIOS = [
  {
    situation: "You're at a café and receive a pop-up: 'Your computer is infected with 3 viruses! Call 1-800-HELP-NOW immediately to fix it.'",
    question: 'What should you do?',
    opts: [
      'Call the number immediately — it sounds urgent',
      'Close the pop-up and run your real antivirus software',
      'Give the pop-up access to your computer to remove the viruses',
      'Pay the fee shown to remove the viruses',
    ],
    ans: 1,
    exp: "This is 'scareware' — a fake pop-up designed to panic you into calling scammers or installing malware. Real antivirus software doesn't work this way. Always close and run your legitimate security software.",
  },
  {
    situation: 'Your friend texts you a link saying "I found a funny video of you, check it out!" but the link looks strange (e.g., bit.ly/xK9pzw).',
    question: 'What is the safest response?',
    opts: [
      'Click it — your friend sent it so it must be safe',
      "Don't click it and message your friend directly to ask if they actually sent it",
      'Click it but immediately close your browser if it looks weird',
      'Share it with other friends so they can check it for you',
    ],
    ans: 1,
    exp: "Attackers can hack your friend's account and send links to all their contacts. Always verify directly through another channel (call or text separately) before clicking suspicious links, even from known contacts.",
  },
  {
    situation: 'You want to create a new account for an online game. The site asks for your full name, home address, phone number, school name, and credit card.',
    question: 'What should you do?',
    opts: [
      'Fill in everything — sites need this information to work',
      'Fill in only what is absolutely necessary and question why a game needs your home address or credit card',
      'Use fake information everywhere',
      'Ask a friend to use their information instead',
    ],
    ans: 1,
    exp: "The principle of 'data minimization' — only share what's necessary. A free game shouldn't need your home address. Always question why a service needs each piece of information before sharing it.",
  },
  {
    situation: 'You log into the school Wi-Fi and notice a network called "FREE_School_WiFi" next to the official "School_Network". You normally use the official one.',
    question: 'What is the most likely risk of connecting to "FREE_School_WiFi"?',
    opts: [
      'Nothing — more Wi-Fi options are always better',
      'It could be a rogue access point set up by an attacker to intercept your traffic',
      "It's probably a backup school network for when the main one is busy",
      'It will drain your battery faster',
    ],
    ans: 1,
    exp: "This is called an 'Evil Twin' attack — a fake Wi-Fi network that mimics a legitimate one. All your traffic goes through the attacker's device. Always connect to verified, official networks.",
  },
];

const Level10Scenario: React.FC<LevelProps> = ({ onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = (correct: boolean) => {
    const newScore = score + (correct ? 1 : 0);
    if (qIdx + 1 >= L10_SCENARIOS.length) { onComplete(newScore >= 3); return; }
    setScore(newScore);
    setQIdx(i => i + 1);
  };

  const s = L10_SCENARIOS[qIdx];
  return (
    <div className="cyber-card p-8">
      <div className="flex items-center gap-3 mb-2">
        <Smartphone size={20} className="text-accent-secondary" />
        <h2 className="text-xl font-black text-white">Real-World Scenarios</h2>
        <span className="ml-auto text-xs text-text-muted font-bold">{qIdx + 1}/{L10_SCENARIOS.length}</span>
      </div>
      <p className="text-text-secondary text-sm mb-5">Apply everything you've learned to handle these real situations.</p>

      <div className="p-5 bg-accent-tertiary-5 border border-accent-tertiary-20 rounded-2xl mb-2">
        <p className="text-[10px] font-black text-accent-tertiary uppercase tracking-widest mb-2">Situation</p>
        <p className="text-white font-semibold text-sm leading-relaxed">{s.situation}</p>
      </div>

      <MCQ key={qIdx} question={s.question} options={s.opts} answer={s.ans} explanation={s.exp}
        qNum={qIdx + 1} qTotal={L10_SCENARIOS.length} onNext={handleNext} />
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
      <p className="text-accent-secondary font-black text-xl mb-8">Network & Cybersecurity Basics</p>
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
      moduleName: 'Network & Cybersecurity Basics',
      userName: name,
      date: new Date().toLocaleDateString(),
    };
    await generateCertificate(name, 'Network & Cybersecurity Basics');
    setCertSaved(true);
    onComplete(record);
  };

  const renderLevel = () => {
    if (levelDone) return <LevelResult correct={levelCorrect} level={level} total={TOTAL_LEVELS} onNext={handleNextLevel} />;
    switch (level) {
      case 1:  return <Level1WiredWireless       onComplete={handleLevelComplete} />;
      case 2:  return <Level2NetworkComponents   onComplete={handleLevelComplete} />;
      case 3:  return <Level3HowDataTravels      onComplete={handleLevelComplete} />;
      case 4:  return <Level4InternetJourney     onComplete={handleLevelComplete} />;
      case 5:  return <Level5PrivatePublic       onComplete={handleLevelComplete} />;
      case 6:  return <Level6CyberRisks          onComplete={handleLevelComplete} />;
      case 7:  return <Level7Phishing            onComplete={handleLevelComplete} />;
      case 8:  return <Level8SafeUnsafe          onComplete={handleLevelComplete} />;
      case 9:  return <Level9BestPractices       onComplete={handleLevelComplete} />;
      case 10: return <Level10Scenario           onComplete={handleLevelComplete} />;
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-secondary-10 rounded-xl text-accent-secondary">
            <Network size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Network & Security Lab</h1>
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
