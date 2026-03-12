import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MalwareLab from './components/MalwareLab';
import PassCracker from './components/PassCracker';
import PhishingLab from './components/PhishingLab';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleComplete = (id: string) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id]);
    }
  };

  const renderContent = () => {
    switch (currentLessonId) {
      case 'malware-101':
        return <MalwareLab onComplete={() => handleComplete('malware-101')} />;
      case 'pass-crack':
        return <PassCracker onComplete={() => handleComplete('pass-crack')} />;
      case 'social-eng':
        return <PhishingLab onComplete={() => handleComplete('social-eng')} />;
      case 'social-eng-sim':
        return (
          <div className="p-10 flex flex-col items-center justify-center h-full gap-6 text-center">
            <div className="w-20 h-20 bg-accent-primary-10 rounded-full flex items-center justify-center text-accent-primary mb-4 animate-bounce">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl font-black neon-text uppercase">Próximamente</h1>
            <p className="text-text-secondary text-lg max-w-lg">
              Estás desbloqueando la fase **Ingeniería Social Pro**. Esta misión de nivel avanzado estará disponible pronto para poner a prueba tus defensas definitivas.
            </p>
            <button
              onClick={() => setCurrentLessonId(null)}
              className="neon-button px-8 py-3"
            >
              Regresar al Panel
            </button>
          </div>
        );
      default:
        return <Dashboard onSelectLesson={setCurrentLessonId} completedLessons={completedLessons} />;
    }
  };

  return (
    <div className="flex bg-bg-primary text-text-primary h-screen overflow-hidden">
      <Sidebar
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
        completedLessons={completedLessons}
      />
      <main className="flex-1 h-full overflow-y-auto ml-64 custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
