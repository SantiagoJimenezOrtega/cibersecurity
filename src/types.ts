export type Grade = 'grade9' | 'grade11';

export interface CertificateRecord {
  moduleId: string;
  moduleName: string;
  userName: string;
  date: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Coding' | 'Network' | 'Password' | 'SafeBrowsing' | 'Social' | 'DataRisk' | 'Security' | 'Scam';
  grade: Grade;
}

export const lessons: Lesson[] = [
  // ── Grado 11 ──────────────────────────────────────────
  {
    id: 'malware-101',
    title: 'Safe Malware Lab',
    description: 'Build a simulated "malware" that detects if a user is clicking a fake button using drag-and-drop blocks.',
    icon: 'Bug',
    difficulty: 'Beginner',
    category: 'Coding',
    grade: 'grade11'
  },
  {
    id: 'pass-crack',
    title: 'Password Cracker',
    description: 'Learn how brute force works by trying to guess a 4-digit PIN in our simulated terminal.',
    icon: 'Key',
    difficulty: 'Beginner',
    category: 'Password',
    grade: 'grade11'
  },
  {
    id: 'social-eng',
    title: 'Phishing Detector',
    description: 'Analyze emails and decide which ones are dangerous in this interactive simulation.',
    icon: 'ShieldAlert',
    difficulty: 'Intermediate',
    category: 'SafeBrowsing',
    grade: 'grade11'
  },
  {
    id: 'net-packets',
    title: 'Network Packet Lab',
    description: 'Explore how data travels across the internet — packet anatomy, OSI model, TCP handshakes, routing, sniffing, ARP spoofing, and firewall rules.',
    icon: 'Network',
    difficulty: 'Intermediate',
    category: 'Network',
    grade: 'grade11'
  },
  {
    id: 'social-eng-sim',
    title: 'Social Engineering Pro',
    description: 'Face 10 realistic manipulation scenarios — phone calls, chats, and in-person encounters. Learn to recognize and resist psychological attacks.',
    icon: 'Users',
    difficulty: 'Advanced',
    category: 'Social',
    grade: 'grade11'
  },
  {
    id: 'ip-classifier',
    title: 'IP Address Classification',
    description: 'Learn to classify IPv4 and IPv6 addresses — identify private ranges (RFC 1918), public IPs, loopback, APIPA, broadcast, and link-local addresses across 10 levels.',
    icon: 'Globe',
    difficulty: 'Beginner',
    category: 'Network',
    grade: 'grade11'
  },
  {
    id: 'cyber-tools-quiz',
    title: 'Cyber Tools Quiz',
    description: 'Demuestra que sabes cuándo y cómo usar cada herramienta: VPN, gestor de contraseñas, VirusTotal, verificadores de URL, navegadores seguros, 2FA y más — 30 preguntas, 50 minutos.',
    icon: 'Wrench',
    difficulty: 'Intermediate',
    category: 'Security',
    grade: 'grade11'
  },
  {
    id: 'final-quiz-g11',
    title: 'Grade 11 Final Quiz',
    description: 'Comprehensive 35-question assessment covering all 7 Grado 11 modules: malware, passwords, phishing, networking, social engineering, IP classification, and cyber tools. Certificate shows correct/incorrect breakdown.',
    icon: 'GraduationCap',
    difficulty: 'Advanced',
    category: 'Security',
    grade: 'grade11'
  },
  // ── Grado 9 ───────────────────────────────────────────
  {
    id: 'data-risks',
    title: 'Data Risks',
    description: 'Learn to recognize when personal data is at risk — 10 real-world scenarios covering personal data, breaches, oversharing, IoT risks, and data harvesting attacks.',
    icon: 'Database',
    difficulty: 'Beginner',
    category: 'DataRisk',
    grade: 'grade9'
  },
  {
    id: 'security-practices',
    title: 'Security Practices',
    description: 'Master the 5 pillars of personal security: strong passwords, two-factor authentication, software updates, safe backups, and privacy settings — 10 practical levels.',
    icon: 'ShieldCheck',
    difficulty: 'Beginner',
    category: 'Security',
    grade: 'grade9'
  },
  {
    id: 'security-guides',
    title: 'Security Guides',
    description: 'Step-by-step security guidance for everyday digital life — password managers, HTTPS, email security, mobile safety, home networks, and incident response.',
    icon: 'BookOpen',
    difficulty: 'Beginner',
    category: 'Security',
    grade: 'grade9'
  },
  {
    id: 'phishing-signs',
    title: 'Phishing Signs',
    description: 'Train your eye to spot phishing indicators — fake domains, urgency tactics, suspicious links, dangerous attachments, spear phishing, and smishing across 10 levels.',
    icon: 'MailWarning',
    difficulty: 'Intermediate',
    category: 'SafeBrowsing',
    grade: 'grade9'
  },
  {
    id: 'scam-responses',
    title: 'Scam Responses',
    description: 'Learn the correct response to tech support scams, lottery fraud, romance scams, fake job offers, government impersonation, and more — 10 scenario-based levels.',
    icon: 'AlertOctagon',
    difficulty: 'Intermediate',
    category: 'Scam',
    grade: 'grade9'
  },
  {
    id: 'malware-builder',
    title: 'Malware Builder Lab',
    description: 'Drag-and-drop challenge: assemble malware components, map attack phases, and build complete attack chains in a fully controlled simulation — 10 progressive levels.',
    icon: 'Cpu',
    difficulty: 'Advanced',
    category: 'Coding',
    grade: 'grade9'
  }
];
