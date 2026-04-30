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
  category: 'Coding' | 'Network' | 'Password' | 'SafeBrowsing' | 'Social';
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
  },
  {
    id: 'net-packets',
    title: 'Network Packet Lab',
    description: 'Explore how data travels across the internet — packet anatomy, OSI model, TCP handshakes, routing, sniffing, ARP spoofing, and firewall rules.',
    icon: 'Network',
    difficulty: 'Intermediate',
    category: 'Network'
  },
  {
    id: 'social-eng-sim',
    title: 'Social Engineering Pro',
    description: 'Face 10 realistic manipulation scenarios — phone calls, chats, and in-person encounters. Learn to recognize and resist psychological attacks.',
    icon: 'Users',
    difficulty: 'Advanced',
    category: 'Social'
  },
  {
    id: 'ip-classifier',
    title: 'IP Address Classification',
    description: 'Learn to classify IPv4 and IPv6 addresses — identify private ranges (RFC 1918), public IPs, loopback, APIPA, broadcast, and link-local addresses across 10 levels.',
    icon: 'Globe',
    difficulty: 'Beginner',
    category: 'Network'
  }
];
