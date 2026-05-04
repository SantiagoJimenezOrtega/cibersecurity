import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, XCircle, Lock, Award, Download } from 'lucide-react';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';

export interface QuizLevel {
  title: string;
  scenario?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface IntroSlide {
  icon: React.ReactNode;
  title: string;
  body: string;
}

interface Props {
  moduleId: string;
  moduleName: string;
  levels: QuizLevel[];
  introSlides: IntroSlide[];
  accentClass: string;
  onComplete: (cert?: CertificateRecord) => void;
}

const G9QuizModule: React.FC<Props> = ({ moduleId, moduleName, levels, introSlides, accentClass, onComplete }) => {
  const sk = `g9-${moduleId}-levels`;
  const a = accentClass;

  const [phase, setPhase] = useState<'intro' | 'map' | 'quiz' | 'done'>('intro');
  const [slide, setSlide] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [done, setDone] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(sk) ?? '[]'); } catch { return []; }
  });
  const [sel, setSel] = useState<number | null>(null);
  const [fb, setFb] = useState(false);
  const [ok, setOk] = useState(false);
  const [certName, setCertName] = useState(() => localStorage.getItem('cyberlab-username') ?? '');
  const [certSaved, setCertSaved] = useState(false);

  const unlocked = (i: number) => i === 0 || done.includes(i - 1);
  const completed = (i: number) => done.includes(i);

  const pick = (idx: number) => {
    if (fb) return;
    setSel(idx);
    const correct = idx === levels[lvl].correct;
    setOk(correct);
    setFb(true);
    if (correct && !done.includes(lvl)) {
      const u = [...done, lvl];
      setDone(u);
      localStorage.setItem(sk, JSON.stringify(u));
    }
  };

  const next = () => {
    if (lvl < 9) { setLvl(l => l + 1); setSel(null); setFb(false); }
    else setPhase('done');
  };

  const goLevel = (i: number) => {
    if (!unlocked(i)) return;
    setLvl(i);
    setSel(null);
    setFb(false);
    setPhase('quiz');
  };

  const dl = async () => {
    const name = certName.trim() || 'Student';
    const rec: CertificateRecord = {
      moduleId, moduleName, userName: name,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    await generateCertificate(name, moduleName);
    onComplete(rec);
    setCertSaved(true);
  };

  /* ── INTRO ── */
  if (phase === 'intro') {
    const s = introSlides[slide];
    return (
      <div className="min-h-screen flex items-center justify-center p-8 animate-fade-in">
        <motion.div key={slide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cyber-card max-w-2xl w-full p-10">
          <div className={`p-4 bg-${a}-10 rounded-2xl text-${a} w-fit mb-6`}>{s.icon}</div>
          <div className="flex gap-2 mb-6">
            {introSlides.map((_, i) => (
              <div key={i} className={`h-1 rounded-full flex-1 transition-all ${i <= slide ? `bg-${a}` : 'bg-white-10'}`} />
            ))}
          </div>
          <h2 className="text-3xl font-black text-white mb-3">{s.title}</h2>
          <p className="text-text-secondary leading-relaxed mb-8 text-sm">{s.body}</p>
          <div className="flex items-center justify-between">
            <span className={`text-${a} font-bold text-xs uppercase tracking-widest`}>{slide + 1} / {introSlides.length}</span>
            <button
              onClick={() => slide < introSlides.length - 1 ? setSlide(s => s + 1) : setPhase('map')}
              className={`px-6 py-3 bg-${a} text-bg-primary font-black rounded-xl uppercase text-sm tracking-widest flex items-center gap-2`}
            >
              {slide < introSlides.length - 1 ? 'Next' : 'Start Training'} <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── LEVEL MAP ── */
  if (phase === 'map') {
    return (
      <div className="min-h-screen p-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className={`flex items-center gap-2 text-${a} text-xs font-bold uppercase tracking-widest mb-2`}>
              <div className={`w-8 h-1 bg-${a}`} /> {moduleName}
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Level Map</h1>
            <p className="text-text-secondary text-sm">Answer correctly to unlock the next level. You cannot skip ahead.</p>
          </header>

          <div className="w-full h-2 bg-white-5 rounded-full overflow-hidden border border-white-10 mb-8">
            <motion.div className={`h-full bg-${a} rounded-full`} initial={{ width: 0 }} animate={{ width: `${(done.length / 10) * 100}%` }} transition={{ duration: 0.8 }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {levels.map((level, i) => {
              const u = unlocked(i);
              const c = completed(i);
              return (
                <motion.button key={i} whileHover={u ? { scale: 1.05 } : {}} onClick={() => goLevel(i)} disabled={!u}
                  className={`cyber-card p-4 flex flex-col items-center gap-3 transition-all ${c ? `bg-${a}-10 border-${a}-20` : u ? 'bg-white-5 border-white-10 hover:border-white-20' : 'opacity-30 cursor-not-allowed'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${c ? `bg-${a} text-bg-primary` : u ? 'bg-white-10 text-white' : 'bg-white-5 text-text-muted'}`}>
                    {c ? <CheckCircle2 size={18} /> : !u ? <Lock size={14} /> : <span>{i + 1}</span>}
                  </div>
                  <span className="text-xs font-bold text-center leading-tight text-text-secondary">{level.title}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>{done.length} / 10 levels completed</span>
            {done.length === 10 && (
              <button onClick={() => setPhase('done')} className={`px-5 py-2 bg-${a} text-bg-primary rounded-xl font-black text-xs uppercase flex items-center gap-2`}>
                <Award size={14} /> Get Certificate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── QUIZ ── */
  if (phase === 'quiz') {
    const level = levels[lvl];
    return (
      <div className="min-h-screen p-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setPhase('map')} className="text-text-muted hover:text-white text-sm flex items-center gap-2">← Level Map</button>
            <div className="flex items-center gap-2">
              <span className="text-text-muted text-xs font-bold">Level {lvl + 1} / 10</span>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${done.includes(i) ? `bg-${a}` : i === lvl ? `bg-${a} animate-pulse` : 'bg-white-10'}`} />
                ))}
              </div>
            </div>
          </div>

          <motion.div key={lvl} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="cyber-card p-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${a}-10 border border-${a}-20 text-${a} text-xs font-black uppercase tracking-widest mb-4`}>
              Level {lvl + 1} — {level.title}
            </div>

            {level.scenario && (
              <div className="p-4 bg-white-5 border border-white-10 rounded-xl mb-5 text-text-secondary text-sm leading-relaxed">
                <span className="font-bold text-white">Scenario: </span>{level.scenario}
              </div>
            )}

            <h2 className="text-lg font-bold text-white mb-5">{level.question}</h2>

            <div className="space-y-3">
              {level.options.map((opt, i) => {
                const isCorrectOpt = i === level.correct;
                let cls = 'bg-white-5 border-white-10 text-text-secondary hover:bg-white-10 hover:text-white cursor-pointer';
                if (fb) {
                  if (isCorrectOpt) cls = 'bg-accent-primary-10 border-accent-primary-20 text-white';
                  else if (i === sel && !ok) cls = 'bg-accent-tertiary-10 border-accent-tertiary-20 text-accent-tertiary';
                  else cls = 'bg-white-5 border-white-10 text-text-muted opacity-40';
                }
                return (
                  <button key={i} onClick={() => pick(i)} disabled={fb}
                    className={`w-full p-4 border rounded-xl text-left text-sm transition-all flex items-center gap-3 ${cls}`}
                  >
                    <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-black shrink-0 ${fb && isCorrectOpt ? 'bg-accent-primary border-accent-primary text-bg-primary' : fb && i === sel && !ok ? 'bg-accent-tertiary border-accent-tertiary text-white' : 'border-white-20 text-text-muted'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {fb && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-5 p-5 rounded-xl border flex items-start gap-4 ${ok ? 'bg-accent-primary-10 border-accent-primary-20' : 'bg-accent-tertiary-10 border-accent-tertiary-20'}`}>
                  <div className={`p-2 rounded-lg shrink-0 ${ok ? 'bg-accent-primary-20 text-accent-primary' : 'bg-accent-tertiary-20 text-accent-tertiary'}`}>
                    {ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-sm mb-1 ${ok ? 'text-accent-primary' : 'text-accent-tertiary'}`}>{ok ? 'Correct!' : 'Incorrect — try again'}</p>
                    <p className="text-text-secondary text-xs leading-relaxed">{level.explanation}</p>
                  </div>
                  {ok ? (
                    <button onClick={lvl < 9 ? next : () => setPhase('done')} className={`shrink-0 px-4 py-2 bg-${a} text-bg-primary rounded-xl text-xs font-black uppercase`}>
                      {lvl < 9 ? 'Next →' : 'Finish ✓'}
                    </button>
                  ) : (
                    <button onClick={() => { setSel(null); setFb(false); }} className="shrink-0 px-4 py-2 bg-accent-tertiary text-white rounded-xl text-xs font-black uppercase">Retry</button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── DONE ── */
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="cyber-card max-w-md w-full p-10 text-center">
        <div className={`p-5 bg-${a}-20 rounded-full text-${a} w-fit mx-auto mb-6`}><Award size={48} /></div>
        <h1 className="text-3xl font-black text-white mb-2">Module Complete!</h1>
        <p className={`text-${a} font-bold text-sm mb-2`}>{moduleName}</p>
        <p className="text-text-secondary text-sm mb-8">All 10 levels completed. Download your certificate below.</p>
        <input
          type="text" value={certName} onChange={e => setCertName(e.target.value)}
          placeholder="Your full name for the certificate…"
          className="w-full bg-bg-primary border border-white-10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent-primary mb-4"
        />
        <button onClick={dl} disabled={certSaved || !certName.trim()}
          className={`w-full py-4 font-black uppercase text-sm rounded-xl flex items-center justify-center gap-2 transition-all ${certSaved ? `bg-${a}-20 text-${a} border border-${a}-30` : `bg-${a} text-bg-primary`}`}
        >
          <Download size={16} /> {certSaved ? 'Certificate Saved!' : 'Download Certificate'}
        </button>
      </motion.div>
    </div>
  );
};

export default G9QuizModule;
