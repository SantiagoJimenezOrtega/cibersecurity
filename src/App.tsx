import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GradeSelector from './components/GradeSelector';
import MalwareLab from './components/MalwareLab';
import PassCracker from './components/PassCracker';
import PhishingLab from './components/PhishingLab';
import SocialEngPro from './components/SocialEngPro';
import NetworkLab from './components/NetworkLab';
import IPClassifierLab from './components/IPClassifierLab';
import CyberToolsQuizLab from './components/CyberToolsQuizLab';
import FinalQuizG11Lab from './components/FinalQuizG11Lab';
import DataRisksLab from './components/DataRisksLab';
import SecurityPracticesLab from './components/SecurityPracticesLab';
import SecurityGuidesLab from './components/SecurityGuidesLab';
import PhishingSignsLab from './components/PhishingSignsLab';
import ScamResponsesLab from './components/ScamResponsesLab';
import MalwareDragDropLab from './components/MalwareDragDropLab';
import type { CertificateRecord, Grade } from './types';

const STORAGE_KEYS = {
  completed: 'cyberlab-completed',
  certificates: 'cyberlab-certificates',
  grade: 'cyberlab-grade',
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
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(
    () => (localStorage.getItem(STORAGE_KEYS.grade) as Grade | null) ?? null
  );
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    () => loadFromStorage<string[]>(STORAGE_KEYS.completed, [])
  );
  const [certificates, setCertificates] = useState<CertificateRecord[]>(
    () => loadFromStorage<CertificateRecord[]>(STORAGE_KEYS.certificates, [])
  );

  const handleSelectGrade = (grade: Grade) => {
    setSelectedGrade(grade);
    setCurrentLessonId(null);
    localStorage.setItem(STORAGE_KEYS.grade, grade);
  };

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
      // ── Grado 11 ──────────────────────────────────────
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
      case 'ip-classifier':
        return <IPClassifierLab onComplete={(cert) => handleComplete('ip-classifier', cert)} />;
      case 'cyber-tools-quiz':
        return <CyberToolsQuizLab onComplete={(cert) => handleComplete('cyber-tools-quiz', cert)} />;
      case 'final-quiz-g11':
        return <FinalQuizG11Lab onComplete={(cert) => handleComplete('final-quiz-g11', cert)} />;
      // ── Grado 9 ───────────────────────────────────────
      case 'data-risks':
        return <DataRisksLab onComplete={(cert) => handleComplete('data-risks', cert)} />;
      case 'security-practices':
        return <SecurityPracticesLab onComplete={(cert) => handleComplete('security-practices', cert)} />;
      case 'security-guides':
        return <SecurityGuidesLab onComplete={(cert) => handleComplete('security-guides', cert)} />;
      case 'phishing-signs':
        return <PhishingSignsLab onComplete={(cert) => handleComplete('phishing-signs', cert)} />;
      case 'scam-responses':
        return <ScamResponsesLab onComplete={(cert) => handleComplete('scam-responses', cert)} />;
      case 'malware-builder':
        return <MalwareDragDropLab onComplete={(cert) => handleComplete('malware-builder', cert)} />;
      default:
        return (
          <Dashboard
            onSelectLesson={setCurrentLessonId}
            completedLessons={completedLessons}
            certificates={certificates}
            grade={selectedGrade ?? 'grade11'}
          />
        );
    }
  };

  if (!selectedGrade) {
    return <GradeSelector onSelect={handleSelectGrade} />;
  }

  return (
    <div className="flex bg-bg-primary text-text-primary h-screen overflow-hidden">
      <Sidebar
        currentLessonId={currentLessonId}
        onSelectLesson={setCurrentLessonId}
        completedLessons={completedLessons}
        selectedGrade={selectedGrade}
        onChangeGrade={() => {
          setSelectedGrade(null);
          setCurrentLessonId(null);
          localStorage.removeItem(STORAGE_KEYS.grade);
        }}
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
