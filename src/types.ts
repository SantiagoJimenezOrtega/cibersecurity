export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Coding' | 'Network' | 'Password' | 'SafeBrowsing';
}

export const lessons: Lesson[] = [
  {
    id: 'malware-101',
    title: 'Safe Malware Lab',
    description: 'Build a simulated "malware" that detects if a user is clicking a fake button using drag-and-drop blocks.',
    icon: 'Bug',
    difficulty: 'Beginner',
    category: 'Coding'
  },
  {
    id: 'pass-crack',
    title: 'Password Cracker',
    description: 'Learn how brute force works by trying to guess a 4-digit PIN in our simulated terminal.',
    icon: 'Key',
    difficulty: 'Beginner',
    category: 'Password'
  },
  {
    id: 'social-eng',
    title: 'Phishing Detector',
    description: 'Analyze emails and decide which ones are dangerous in this interactive simulation.',
    icon: 'ShieldAlert',
    difficulty: 'Intermediate',
    category: 'SafeBrowsing'
  }
];
