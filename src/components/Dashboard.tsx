import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Key, ShieldAlert, Zap, Globe, ArrowRight, Users, Trophy, Award, Download, Network, Database, ShieldCheck, BookOpen, Mail, AlertOctagon, Cpu } from 'lucide-react';
import { lessons } from '../types';
import type { CertificateRecord, Grade } from '../types';
import { generateCertificate } from '../utils/certificate';

interface DashboardProps {
    onSelectLesson: (id: string) => void;
    completedLessons: string[];
    certificates: CertificateRecord[];
    grade: Grade;
}

const getIcon = (name: string) => {
    switch (name) {
        case 'Bug':          return <Bug size={24} />;
        case 'Key':          return <Key size={24} />;
        case 'ShieldAlert':  return <ShieldAlert size={24} />;
        case 'Users':        return <Users size={24} />;
        case 'Network':      return <Network size={24} />;
        case 'Globe':        return <Globe size={24} />;
        case 'Database':     return <Database size={24} />;
        case 'ShieldCheck':  return <ShieldCheck size={24} />;
        case 'BookOpen':     return <BookOpen size={24} />;
        case 'MailWarning':  return <Mail size={24} />;
        case 'AlertOctagon': return <AlertOctagon size={24} />;
        case 'Cpu':          return <Cpu size={24} />;
        default:             return <Zap size={24} />;
    }
};

const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson, completedLessons, certificates, grade }) => {
    const gradeLessons = lessons.filter(l => l.grade === grade);
    const totalModules = gradeLessons.length;
    const completedCount = completedLessons.filter(id => gradeLessons.some(l => l.id === id)).length;
    const progressPct = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    const gradeLabel = grade === 'grade9' ? 'Grado 9' : 'Grado 11';
    const accentPrimary = grade === 'grade9' ? 'accent-secondary' : 'accent-primary';

    return (
        <div className="p-10 animate-fade-in max-w-1600 mx-auto">
            <header className="mb-10">
                <div className={`flex items-center gap-2 text-${accentPrimary} text-xs font-bold uppercase tracking-widest mb-2`}>
                    <div className={`w-8 h-1 bg-${accentPrimary}`} />
                    Cybersecurity Academy · {gradeLabel}
                </div>
                <h1 className="text-5xl font-extrabold mb-4 neon-text">Mission Control</h1>
                <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                    {grade === 'grade9'
                        ? 'Welcome, recruit. Master the foundations of cybersecurity — learn to recognize risks, defend against attacks, and respond to scams. Your goal: protect yourself and others in the digital world.'
                        : 'Welcome, recruit. Here you will learn the mechanics of information security through practical challenges. Your goal is to understand how hackers think so you can '}
                    {grade === 'grade11' && <span className="text-white font-bold">better protect the digital world</span>}
                    {grade === 'grade11' && '.'}
                </p>
            </header>

            {/* ── Progress Panel ── */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className={`lg:col-span-2 cyber-card p-8 bg-${accentPrimary}-5 border-${accentPrimary}-25 relative overflow-hidden`}>
                    <div className="absolute -right-8 -top-8 opacity-5 pointer-events-none"><Trophy size={180} /></div>
                    <div className={`flex items-center gap-3 mb-2 text-${accentPrimary}`}>
                        <Trophy size={22} />
                        <span className="font-black text-xs uppercase tracking-widest">Overall Progress — {gradeLabel}</span>
                    </div>
                    <div className="flex items-end justify-between mb-4">
                        <p className="text-5xl font-black text-white">
                            {completedCount}<span className="text-2xl text-text-muted font-bold">/{totalModules}</span>
                        </p>
                        <span className={`text-${accentPrimary} font-black text-2xl`}>{progressPct}%</span>
                    </div>
                    <div className="w-full h-3 bg-white-5 rounded-full overflow-hidden border border-white-10">
                        <motion.div
                            className={`h-full bg-${accentPrimary} rounded-full shadow-neon`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {gradeLessons.map(lesson => (
                            <span key={lesson.id} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                completedLessons.includes(lesson.id)
                                    ? `bg-${accentPrimary} text-bg-primary border-${accentPrimary} shadow-neon`
                                    : 'bg-white-5 text-text-muted border-white-10 opacity-40'
                            }`}>
                                {completedLessons.includes(lesson.id) ? '✓ ' : ''}{lesson.title}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className={`cyber-card p-6 bg-${accentPrimary}-5 border-${accentPrimary}-25 flex items-center gap-5`}>
                        <div className={`p-4 bg-${accentPrimary}-10 rounded-2xl text-${accentPrimary}`}>
                            <Award size={28} />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white">{certificates.length}</p>
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Certificates Earned</p>
                        </div>
                    </div>
                    <div className="cyber-card p-6 bg-accent-tertiary-5 border-accent-tertiary-20 flex items-center gap-5">
                        <div className="p-4 bg-accent-tertiary-10 rounded-2xl text-accent-tertiary">
                            <Zap size={28} />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-white">{totalModules - completedCount}</p>
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Modules Remaining</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Module Cards ── */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <Zap className={`text-${accentPrimary}`} size={20} />
                    Available Trainings
                </h2>
                <div className="text-xs text-text-muted">Showing {totalModules} missions · {gradeLabel}</div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                {gradeLessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                        <motion.div
                            key={lesson.id}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`cyber-card cursor-pointer group flex flex-col justify-between border transition-all ${isCompleted ? `border-${accentPrimary}-30 bg-${accentPrimary}-5` : 'border-transparent border-accent-primary-30'}`}
                            onClick={() => onSelectLesson(lesson.id)}
                        >
                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-4 rounded-2xl transition-all duration-300 shadow-neon ${isCompleted ? `bg-${accentPrimary} text-bg-primary` : `bg-${accentPrimary}-10 text-${accentPrimary} group-hover:bg-${accentPrimary} group-hover:text-bg-primary`}`}>
                                        {getIcon(lesson.icon)}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        isCompleted
                                            ? `text-${accentPrimary} border-${accentPrimary}-20 bg-${accentPrimary}-5`
                                            : lesson.difficulty === 'Beginner'
                                                ? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5'
                                                : lesson.difficulty === 'Advanced'
                                                    ? 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5'
                                                    : 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5'
                                    }`}>
                                        {isCompleted ? '✓ Completed' : lesson.difficulty}
                                    </span>
                                </div>
                                <h3 className={`text-2xl font-bold mb-3 group-hover:text-${accentPrimary} transition-colors text-white`}>{lesson.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6">{lesson.description}</p>
                            </div>
                            <button className={`w-full py-4 flex items-center justify-center gap-2 group-hover:gap-4 transition-all rounded-2xl font-extrabold text-sm uppercase tracking-widest border ${isCompleted ? `bg-${accentPrimary}-10 border-${accentPrimary}-20 text-${accentPrimary} hover:bg-${accentPrimary} hover:text-bg-primary` : 'neon-button'}`}>
                                {isCompleted ? 'Replay' : 'Start'} <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    );
                })}
            </section>

            {/* ── Certificate Gallery ── */}
            {certificates.length > 0 && (
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="text-accent-secondary" size={22} />
                        <h2 className="text-2xl font-bold text-white">My Certificates</h2>
                        <span className="px-2 py-0.5 bg-accent-secondary-10 border border-accent-secondary-20 text-accent-secondary text-[10px] font-black uppercase rounded-full">{certificates.length}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {certificates.map((cert, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                className="cyber-card p-6 bg-accent-secondary-5 border-accent-secondary-20 flex flex-col gap-4 relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none"><Award size={100} /></div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-accent-secondary-10 rounded-xl text-accent-secondary"><Award size={20} /></div>
                                    <div>
                                        <p className="text-white font-black text-sm">{cert.moduleName}</p>
                                        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{cert.date}</p>
                                    </div>
                                </div>
                                <p className="text-text-secondary text-xs font-medium">
                                    Issued to: <span className="text-white font-bold uppercase">{cert.userName}</span>
                                </p>
                                <button onClick={() => void generateCertificate(cert.userName, cert.moduleName)}
                                    className="neon-button-secondary w-full py-3 text-[10px] flex items-center justify-center gap-2 mt-auto">
                                    <Download size={14} /> Re-Download
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Ethics Banner ── */}
            <section className="bg-accent-secondary-5 border border-accent-secondary-20 rounded-3xl p-10 relative overflow-hidden flex items-center gap-10">
                <div className="flex-1 relative z-10">
                    <div className="p-3 bg-accent-secondary-20 rounded-xl text-accent-secondary w-fit mb-6">
                        <Globe size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">CyberLab Code of Ethics</h2>
                    <p className="text-text-secondary mb-8 leading-relaxed max-w-2xl text-lg">
                        {grade === 'grade9'
                            ? '"With knowledge comes responsibility." As a 9th-grade student, you are beginning to learn skills that can be used for good or harm. Commit to using this knowledge to protect yourself, your family, and your community — never to harm others.'
                            : '"With great power comes great responsibility." As an 11th-grade student, you are gaining skills that could be misused. Promise to use this knowledge to find flaws and help others, never to cause harm.'}
                    </p>
                    <button className="text-accent-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm group">
                        READ THE HACKER MANIFESTO <ArrowRight size={16} />
                    </button>
                </div>
                <div className="hidden lg:block opacity-10 absolute right-minus-40 bottom-minus-40 rotate-12">
                    <ShieldAlert size={300} />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
