import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Key, ShieldAlert, Zap, Globe, ArrowRight, Users } from 'lucide-react';
import { lessons } from '../types';

interface DashboardProps {
    onSelectLesson: (id: string) => void;
    completedLessons: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson, completedLessons }) => {
    const isSocialEngUnlocked = completedLessons.length >= 3;
    const getIcon = (name: string) => {
        switch (name) {
            case 'Bug': return <Bug size={24} />;
            case 'Key': return <Key size={24} />;
            case 'ShieldAlert': return <ShieldAlert size={24} />;
            case 'Users': return <Users size={24} />;
            default: return <Zap size={24} />;
        }
    };

    return (
        <div className="p-10 animate-fade-in max-w-1600 mx-auto">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest mb-2">
                    <div className="w-8 h-1 bg-accent-primary" />
                    Academia de Ciberseguridad
                </div>
                <h1 className="text-5xl font-extrabold mb-4 neon-text">Panel de Misiones</h1>
                <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                    Bienvenido, recluta. Aquí aprenderás las bases de la seguridad informática a través de desafíos prácticos. Tu objetivo es entender cómo piensan los hackers para poder <span className="text-white font-bold">proteger mejor el mundo digital</span>.
                </p>
            </header>

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <Zap className="text-accent-secondary" size={20} />
                    Entrenamientos Disponibles
                </h2>
                <div className="text-xs text-text-muted">Mostrando 3 misiones de nivel inicial</div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {lessons.map((lesson) => (
                    <motion.div
                        key={lesson.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="cyber-card cursor-pointer group flex flex-col justify-between border border-transparent border-accent-primary-30"
                        onClick={() => onSelectLesson(lesson.id)}
                    >
                        <div>
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-accent-primary-10 rounded-2xl text-accent-primary group-hover:bg-accent-primary group-hover:text-bg-primary transition-all duration-300 shadow-neon">
                                    {getIcon(lesson.icon)}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${lesson.difficulty === 'Beginner'
                                    ? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5'
                                    : 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5'
                                    }`}>
                                    Nivel {lesson.difficulty === 'Beginner' ? 'Inicial' : 'Medio'}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-primary transition-colors text-white">{lesson.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                {lesson.description}
                            </p>
                        </div>

                        <button className="neon-button w-full py-4 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                            Comenzar <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ))}

                {/* Social Engineering Mission */}
                <motion.div
                    whileHover={isSocialEngUnlocked ? { scale: 1.02, y: -5 } : {}}
                    onClick={() => isSocialEngUnlocked && onSelectLesson('social-eng-sim')}
                    className={`cyber-card flex flex-col border ${isSocialEngUnlocked ? 'cursor-pointer border-accent-primary-30 hover:shadow-neon' : 'opacity-50 grayscale border-dashed border-white-5'}`}
                >
                    <div className={`p-4 rounded-2xl mb-6 w-fit ${isSocialEngUnlocked ? 'bg-accent-primary-10 text-accent-primary' : 'bg-white-5 text-text-muted'}`}>
                        <Users size={24} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${isSocialEngUnlocked ? 'text-white' : 'text-white opacity-50'}`}>Ingeniería Social Pro</h3>
                    <p className="text-text-muted text-sm mb-6 flex-1">
                        Aprende técnicas reales para protegerte de la manipulación psicológica en la red.
                    </p>
                    {isSocialEngUnlocked ? (
                        <button className="neon-button w-full py-4 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                            Comenzar <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button disabled className="bg-white-5 text-text-muted border border-white-5 py-3 rounded-xl cursor-not-allowed font-bold text-sm uppercase tracking-widest">
                            Requiere Completar 3 Módulos
                        </button>
                    )}
                </motion.div>
            </section>

            <section className="mt-16 bg-accent-secondary-5 border border-accent-secondary-20 rounded-3xl p-10 relative overflow-hidden flex items-center gap-10">
                <div className="flex-1 relative z-10">
                    <div className="p-3 bg-accent-secondary-20 rounded-xl text-accent-secondary w-fit mb-6">
                        <Globe size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Código de Ética del CyberLab</h2>
                    <p className="text-text-secondary mb-8 leading-relaxed max-w-2xl text-lg">
                        "Un gran poder conlleva una gran responsabilidad". Como estudiante de grado 11, estás adquiriendo habilidades que podrían ser mal utilizadas. Promete usar este conocimiento para encontrar fallos y ayudar a otros, nunca para causar daño.
                    </p>
                    <button className="text-accent-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm group">
                        LEER EL MANIFIESTO HACKER <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
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
