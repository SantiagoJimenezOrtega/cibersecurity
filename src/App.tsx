import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MalwareLab from './components/MalwareLab';
import PassCracker from './components/PassCracker';
import PhishingLab from './components/PhishingLab';
import SocialEngPro from './components/SocialEngPro';
import NetworkLab from './components/NetworkLab';
import type { CertificateRecord } from './types';

const STORAGE_KEYS = {
  completed: 'cyberlab-completed',
  certificates: 'cyberlab-certificates',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    () => loadFromStorage<string[]>(STORAGE_KEYS.completed, [])
  );
  const [certificates, setCertificates] = useState<CertificateRecord[]>(
    () => loadFromStorage<CertificateRecord[]>(STORAGE_KEYS.certificates, [])
  );

  const handleComplete = (id: string, certRecord?: CertificateRecord) => {
    setCompletedLessons(prev => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(updated));
      return updated;
    });
    if (certRecord) {
      setCertificates(prev => {
        const updated = [...prev, certRecord];
        localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const renderContent = () => {
    switch (currentLessonId) {
      case 'malware-101':
        return <MalwareLab onComplete={(cert) => handleComplete('malware-101', cert)} />;
      case 'pass-crack':
        return <PassCracker onComplete={(cert) => handleComplete('pass-crack', cert)} />;
      case 'social-eng':
        return <PhishingLab onComplete={(cert) => handleComplete('social-eng', cert)} />;
      case 'social-eng-sim':
        return <SocialEngPro onComplete={(cert) => handleComplete('social-eng-sim', cert)} />;
      case 'net-packets':
        return <NetworkLab onComplete={(cert) => handleComplete('net-packets', cert)} />;
      default:
        return (
          <Dashboard
            onSelectLesson={setCurrentLessonId}
            completedLessons={completedLessons}
            certificates={certificates}
          />
        );
    }
  };

  return (
    <div className="flex bg-bg-primary text-text-primary h-screen overflow-hidden">
      <Sidebar
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
        completedLessons={completedLessons}
        onResetProgress={() => {
          setCompletedLessons([]);
          setCertificates([]);
          setCurrentLessonId(null);
        }}
      />
      <main className="flex-1 h-full overflow-y-auto ml-64 custom-scrollbar">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
