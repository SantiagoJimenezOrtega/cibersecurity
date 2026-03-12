import { Shield, Bug, Key, Home, Settings, Info, Lock, Users, CheckCircle2 } from 'lucide-react';


interface SidebarProps {
    currentLessonId: string | null;
    onSelectLesson: (id: string | null) => void;
    completedLessons: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, completedLessons }) => {
    const isSocialEngLocked = completedLessons.length < 3;

    const menuItems = [
        { id: null, icon: <Home size={20} />, label: 'Inicio / Progreso', locked: false },
        { id: 'malware-101', icon: <Bug size={20} />, label: 'Taller de Malware', locked: false },
        { id: 'pass-crack', icon: <Key size={20} />, label: 'Descifrar Claves', locked: false },
        { id: 'social-eng', icon: <Shield size={20} />, label: 'Detector Phishing', locked: false },
        { id: 'social-eng-sim', icon: <Users size={20} />, label: 'Ingeniería Social', locked: isSocialEngLocked },
    ];

    return (
        <div className="w-64 h-screen bg-bg-secondary border-r border-glass-border flex flex-col p-6 fixed left-0 top-0 z-10">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="p-2 bg-accent-primary rounded-lg text-bg-primary shadow-neon">
                    <Shield size={24} />
                </div>
                <h1 className="text-xl font-extrabold tracking-tight">Cyber<span className="text-accent-primary">Lab</span></h1>
            </div>

            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 px-2">Módulos de Aprendizaje</p>
            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        disabled={item.locked}
                        onClick={() => onSelectLesson(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${currentLessonId === item.id
                            ? 'bg-accent-primary-10 text-accent-primary border border-accent-primary-20 shadow-neon'
                            : item.locked
                                ? 'opacity-40 cursor-not-allowed grayscale'
                                : 'text-text-secondary hover:bg-glass hover:text-white border border-transparent border'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="font-semibold text-sm">{item.label}</span>
                        </div>
                        {item.locked && <Lock size={14} className="opacity-50" />}
                        {completedLessons.includes(item.id || '') && !item.locked && <CheckCircle2 size={16} className="text-accent-primary" />}
                        {currentLessonId === item.id && !item.locked && !completedLessons.includes(item.id || '') && <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />}
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-1 border-t border-glass-border pt-6">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white transition-colors text-sm">
                    <Settings size={18} />
                    <span>Configuración</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-muted hover:text-white transition-colors text-sm">
                    <Info size={18} />
                    <span>Ayuda / Guía</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
