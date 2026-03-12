import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Lock, RotateCcw, Zap, HelpCircle, ArrowRight, Trophy, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';

interface PassCrackerProps {
    onComplete: () => void;
}

const PassCracker: React.FC<PassCrackerProps> = ({ onComplete }) => {
    const levels = [
        { id: 1, target: '1234', title: 'Nivel Básico' },
        { id: 2, target: '0000', title: 'Fuerza Bruta Inicial' },
        { id: 3, target: '4829', title: 'Desafío Estándar' },
        { id: 4, target: '7731', title: 'Seguridad Media' },
        { id: 5, target: '1337', title: 'Hacker Speak' },
        { id: 6, target: '0506', title: 'PIN Personalizado' },
        { id: 7, target: '9912', title: 'Seguridad Mejorada' },
        { id: 8, target: '8008', title: 'Fuerza Bruta Avanzada' },
        { id: 9, target: '9999', title: 'Límite de Rango' },
        { id: 10, target: '2024', title: 'Último Bastión' }
    ];

    const [currentLevel, setCurrentLevel] = useState(0);
    const targetPin = levels[currentLevel].target;

    const [currentAttempts, setCurrentAttempts] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
    const [testedCount, setTestedCount] = useState(0);
    const [allCompleted, setAllCompleted] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const startBruteForce = async () => {
        setStatus('running');
        setTestedCount(0);
        setCurrentAttempts([`[!] Iniciando Nivel ${currentLevel + 1}: ${levels[currentLevel].title}...`, '[+] Tipo de ataque: Diccionario Secuencial.']);

        const targetValue = parseInt(targetPin);

        for (let i = 0; i <= targetValue; i++) {
            const pin = i.toString().padStart(4, '0');

            if (i % 25 === 0 || i === targetValue) {
                setTestedCount(i);
                setCurrentAttempts(prev => [...prev.slice(-12), `[x] Probando PIN: ${pin} - FALLIDO`]);
                await new Promise(r => setTimeout(r, 5));
            }

            if (pin === targetPin) {
                setTestedCount(i);
                setCurrentAttempts(prev => [...prev, `[!!!] ¡Vulnerabilidad encontrada! PIN: ${pin}`, '[V] ACCESO CONCEDIDO']);
                setStatus('success');
                return;
            }

            // Simple way to stop if component resets or status changes
        }
    };

    const nextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            resetAttack();
        } else {
            setAllCompleted(true);
        }
    };

    const resetAttack = () => {
        setStatus('idle');
        setTestedCount(0);
        setCurrentAttempts([]);
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentAttempts]);

    if (allCompleted) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <div className="p-10 bg-accent-primary-10 rounded-full text-accent-primary mb-10 shadow-neon border border-accent-primary-20">
                    <Trophy size={100} />
                </div>
                <h2 className="text-6xl font-black text-white mb-6 tracking-tight">¡MAESTRO CRACKER!</h2>
                <p className="text-2xl text-text-secondary max-w-2xl mb-12">
                    Has superado los 10 niveles de seguridad. Ahora entiendes perfectamente por qué las contraseñas simples son un peligro.
                </p>
                <div className="flex gap-4">
                    <button onClick={() => { setAllCompleted(false); setCurrentLevel(0); resetAttack(); }} className="px-8 py-4 bg-bg-tertiary border rounded-xl text-text-muted hover:text-white transition-all text-sm font-bold">
                        REINICIAR ENTRENAMIENTO
                    </button>
                    <button
                        onClick={() => {
                            generateCertificate("Recluta CyberLab", "Descifrado de Claves");
                            onComplete();
                        }}
                        className="neon-button px-12 py-5 text-xl flex items-center gap-3"
                    >
                        <Download size={24} /> DESCARGAR CERTIFICADO
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1700 mx-auto min-h-full">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-1">
                        Desafío #02 - Seguridad de Cuentas - NIVEL {currentLevel + 1}/10
                    </div>
                    <h2 className="text-4xl font-extrabold text-white">Cracker de Contraseñas</h2>
                    <p className="text-text-secondary">Simula cómo un atacante puede adivinar un PIN usando fuerza bruta.</p>
                </div>
                <div className="flex gap-2 mb-2">
                    {levels.map((_, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full border ${idx <= currentLevel ? (idx === currentLevel && status !== 'success' ? 'bg-accent-secondary animate-pulse' : 'bg-accent-primary border-accent-primary') : 'border-white-5 opacity-30'}`} />
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8 min-h-0">
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                    <div className="cyber-card p-4 bg-accent-secondary-5 border border-accent-secondary-20 flex items-center gap-4">
                        <HelpCircle className="text-accent-secondary shrink-0" size={24} />
                        <p className="text-sm text-text-secondary leading-relaxed">
                            <strong>Misión {currentLevel + 1}:</strong> {levels[currentLevel].title}. Activa el ataque para encontrar el PIN objetivo.
                        </p>
                    </div>

                    <div className="cyber-card flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-bg-secondary border p-12">
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent-secondary opacity-30">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: status === 'running' ? '100%' : 0 }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="h-full bg-accent-secondary shadow-neon"
                            />
                        </div>

                        <div className="mb-8 p-10 bg-accent-secondary-5 border-2 border-dashed border-accent-secondary-20 rounded-3xl flex flex-col items-center relative group">
                            <div className={`absolute top-minus-16 right-minus-16 p-3 rounded-full ${status === 'success' ? 'bg-accent-primary' : (status === 'running' ? 'bg-accent-secondary animate-spin' : 'bg-bg-tertiary')} text-white shadow-neon transition-all`}>
                                <Zap size={24} />
                            </div>
                            <Lock className={status === 'success' ? 'text-accent-primary animate-pulse' : 'text-accent-secondary'} size={80} />
                            <div className="mt-8 text-6xl font-mono tracking-ultra font-extrabold text-white">
                                {status === 'success' ? targetPin : (status === 'running' ? '****' : '----')}
                            </div>
                            <div className="mt-4 text-[10px] text-text-muted font-bold tracking-widest uppercase mb-2">SEGURIDAD NIVEL {currentLevel + 1}</div>
                            <div className="w-16 h-1 bg-accent-secondary opacity-30 rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full px-6">
                            <div className="bg-bg-tertiary p-6 rounded-2xl border flex flex-col items-center">
                                <div className="text-[10px] text-text-muted font-bold mb-2 uppercase">PINs PROBADOS</div>
                                <div className="text-3xl font-bold font-mono text-accent-secondary">{testedCount}</div>
                            </div>
                            <div className="bg-bg-tertiary p-6 rounded-2xl border flex flex-col items-center">
                                <div className="text-[10px] text-text-muted font-bold mb-2 uppercase">DIFFICULTAD</div>
                                <div className={`text-xl font-bold font-mono ${currentLevel > 6 ? 'text-accent-tertiary' : 'text-accent-secondary'}`}>{currentLevel > 6 ? 'ALTA' : 'MEDIA'}</div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4 w-full px-6 mb-2">
                            {status === 'success' ? (
                                <button
                                    onClick={nextLevel}
                                    className="flex-1 neon-button text-sm py-4 bg-accent-primary border-accent-primary text-bg-primary hover:bg-white hover:text-bg-primary"
                                >
                                    SUIENTE NIVEL <ArrowRight size={18} className="ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={startBruteForce}
                                    disabled={status === 'running'}
                                    className="flex-1 neon-button text-sm py-4 disabled:opacity-50"
                                >
                                    {status === 'running' ? 'ATACANDO...' : 'INICIAR ATAQUE'}
                                </button>
                            )}
                            <button onClick={resetAttack} className="p-4 bg-bg-tertiary border rounded-xl hover:border-white transition-all text-text-secondary hover:text-white">
                                <RotateCcw size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                    <div className="cyber-card flex-1 bg-black border-accent-primary-20 p-0 overflow-hidden shadow-2xl relative min-h-600">
                        <div className="bg-bg-tertiary px-4 py-3 border-b flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 grayscale opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-accent-tertiary" />
                                    <div className="w-3 h-3 rounded-full bg-accent-secondary" />
                                    <div className="w-3 h-3 rounded-full bg-accent-primary" />
                                </div>
                                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Ataque de fuerza bruta</span>
                            </div>
                            <div className="text-[10px] font-mono text-accent-primary animate-pulse">ESTADO: {status.toUpperCase()}</div>
                        </div>

                        <div className="flex-1 p-6 font-mono text-sm overflow-y-auto bg-black custom-scrollbar h-400">
                            <AnimatePresence>
                                {currentAttempts.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={
                                            line.includes('[!!!]') ? 'text-accent-primary font-bold bg-accent-primary-5 p-2 rounded' :
                                                line.includes('[V]') ? 'text-accent-primary text-xl mt-4 border-t border-accent-primary-20 pt-4' :
                                                    'text-green-400 opacity-60 leading-relaxed'
                                        }
                                    >
                                        <span className="opacity-30 mr-2">$</span>{line}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={terminalEndRef} />
                        </div>

                        <div className="p-4 bg-bg-secondary border-t mt-auto">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-[10px] font-bold text-text-muted uppercase">CAPACIDAD DE PROCESO</div>
                                <div className="text-[10px] font-mono text-accent-primary">{Math.round((testedCount / 9999) * 100)}%</div>
                            </div>
                            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden border border-white-5 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(testedCount / 9999) * 100}%` }}
                                    className="h-full bg-accent-primary shadow-neon"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="cyber-card bg-accent-tertiary-5 border-accent-tertiary-20 flex items-center gap-6 p-8">
                        <ShieldAlert size={48} className="text-accent-tertiary shrink-0" />
                        <div>
                            <h4 className="font-bold text-accent-tertiary text-sm mb-1 uppercase tracking-widest">¿Cómo detener esto en la vida real?</h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                Si el sistema bloqueara la cuenta después de <strong>3 intentos fallidos</strong>, este ataque tomaría años en lugar de segundos. ¡Eso es lo que debes implementar en tus aplicaciones!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassCracker;
