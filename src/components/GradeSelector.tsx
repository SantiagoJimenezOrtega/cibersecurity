import React from 'react';
import { motion } from 'framer-motion';
import { Shield, GraduationCap, ChevronRight } from 'lucide-react';

interface Props {
  onSelect: (grade: 'grade9' | 'grade11') => void;
}

const GradeSelector: React.FC<Props> = ({ onSelect }) => (
  <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-accent-primary rounded-xl text-bg-primary shadow-neon">
          <Shield size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Cyber<span className="text-accent-primary">Lab</span></h1>
      </div>
      <p className="text-text-secondary text-base max-w-md mx-auto">Select your grade to access your personalized cybersecurity curriculum.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
      <motion.button
        whileHover={{ scale: 1.03, y: -5 }}
        onClick={() => onSelect('grade9')}
        className="cyber-card p-8 text-left border border-accent-secondary-20 bg-accent-secondary-5 hover:border-accent-secondary-40 transition-all group cursor-pointer"
      >
        <div className="p-4 bg-accent-secondary-10 rounded-2xl text-accent-secondary w-fit mb-6 group-hover:bg-accent-secondary group-hover:text-bg-primary transition-all">
          <GraduationCap size={32} />
        </div>
        <span className="text-accent-secondary font-black text-xs uppercase tracking-widest block mb-2">Foundational Level</span>
        <h2 className="text-2xl font-black text-white mb-3">Grado 9</h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Learn the foundations of cybersecurity: data risks, security practices, phishing detection, scam responses, and malware basics.
        </p>
        <div className="flex items-center gap-2 text-accent-secondary font-bold text-sm">
          8 Modules <ChevronRight size={16} />
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03, y: -5 }}
        onClick={() => onSelect('grade11')}
        className="cyber-card p-8 text-left border border-accent-primary-20 bg-accent-primary-5 hover:border-accent-primary-40 transition-all group cursor-pointer"
      >
        <div className="p-4 bg-accent-primary-10 rounded-2xl text-accent-primary w-fit mb-6 group-hover:bg-accent-primary group-hover:text-bg-primary transition-all">
          <Shield size={32} />
        </div>
        <span className="text-accent-primary font-black text-xs uppercase tracking-widest block mb-2">Advanced Level</span>
        <h2 className="text-2xl font-black text-white mb-3">Grado 11</h2>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Master advanced techniques: malware analysis, password cracking, network packets, social engineering, phishing, IP classification, and security tools.
        </p>
        <div className="flex items-center gap-2 text-accent-primary font-bold text-sm">
          9 Modules <ChevronRight size={16} />
        </div>
      </motion.button>
    </div>
  </div>
);

export default GradeSelector;
