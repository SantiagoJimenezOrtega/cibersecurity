import React from 'react';
import { Shield, RefreshCw, Lock } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
  {
    icon: <Shield size={32} />,
    title: 'Why Security Practices Matter',
    body: '95% of cybersecurity breaches are caused by human error. The good news: adopting a few key habits dramatically reduces your risk. Security is not about perfect knowledge — it is about consistent behavior.'
  },
  {
    icon: <Lock size={32} />,
    title: 'The 5 Pillars of Personal Security',
    body: 'Strong passwords, two-factor authentication, software updates, safe backups, and privacy settings — these five practices protect you against the vast majority of attacks targeting individuals.'
  },
  {
    icon: <RefreshCw size={32} />,
    title: 'Building Security Habits',
    body: 'In this module you will evaluate real-world security decisions across 10 levels. Each level tests your understanding of a specific practice. Answer correctly to unlock the next challenge!'
  }
];

const levels: QuizLevel[] = [
  {
    title: 'Password Strength',
    question: 'Which password is the MOST secure?',
    options: ['password123', 'MyName2010!', 'Tr0ub4dor&3_sky', '12345678'],
    correct: 2,
    explanation: 'A strong password combines uppercase, lowercase, numbers, and symbols with length. "Tr0ub4dor&3_sky" has all four elements and 15 characters. Length matters more than complexity alone — aim for 14+ characters.'
  },
  {
    title: 'Two-Factor Auth',
    question: 'What is the main purpose of two-factor authentication (2FA)?',
    options: ['It makes your password longer automatically', 'Even if your password is stolen, attackers still cannot log in without the second factor', 'It permanently replaces your password', 'It only works on mobile phones'],
    correct: 1,
    explanation: '2FA adds a second verification layer (SMS code, authenticator app, or hardware key). A thief who steals your password cannot access your account without also having your phone or key. Enable it everywhere possible.'
  },
  {
    title: 'Software Updates',
    scenario: 'Your operating system shows: "Critical security patch available — 47 vulnerabilities fixed."',
    question: 'You are busy. What should you do?',
    options: ['Dismiss it — updates often break things', 'Schedule the update for the soonest convenient time today', 'Wait until your device starts running slowly', 'Ignore it — security patches are for businesses, not individuals'],
    correct: 1,
    explanation: 'Security patches fix vulnerabilities that attackers are actively exploiting. The WannaCry ransomware of 2017 infected 230,000 computers — all running systems that had a patch available for 2 months. Update promptly.'
  },
  {
    title: 'Public WiFi',
    scenario: 'At a café you see: "CafeGuest_Free" (open, no password) and "CafeGuest_Secure" (requires registration).',
    question: 'You need to check your bank account. What do you do?',
    options: ['Connect to the open one — faster is better', 'Connect to either — WiFi encryption protects you', 'Use your mobile data or a VPN before connecting to any public network', 'Only avoid public WiFi for shopping, banking is fine'],
    correct: 2,
    explanation: 'Public WiFi allows attackers to intercept unencrypted traffic (man-in-the-middle attack). For sensitive operations like banking, use mobile data or activate a VPN first. Never trust open networks for financial activity.'
  },
  {
    title: 'Backup Strategy',
    question: 'What does the 3-2-1 backup rule mean?',
    options: ['Back up 3 times per day, 2 times per week, 1 time per month', '3 copies of your data, on 2 different media types, with 1 stored offsite', '3 cloud services, 2 local drives, 1 encrypted USB', 'Back up 3 critical files, 2 optional files, delete 1 old version'],
    correct: 1,
    explanation: 'The 3-2-1 rule ensures recovery from any failure: 3 copies (1 original + 2 backups), on 2 media types (e.g., SSD + external drive), with 1 offsite copy (cloud or remote location). This protects against ransomware, fire, and hardware failure.'
  },
  {
    title: 'Privacy Settings',
    scenario: 'Sofia just created her first social media account.',
    question: 'What should she do FIRST before posting anything?',
    options: ['Upload a profile photo so friends recognize her', 'Add all classmates to grow her network quickly', 'Review and configure privacy settings to control who sees her information', 'Connect all her other accounts for easy sharing'],
    correct: 2,
    explanation: 'Default social media settings are often set to maximum visibility to grow the platform — not to protect you. Always configure privacy settings first: who can see posts, who can find you, what data the app collects.'
  },
  {
    title: 'Device Lock Screen',
    question: 'Which device unlock method provides the LEAST security?',
    options: ['6-digit PIN', 'Biometric fingerprint scan', 'Swipe pattern (draw a shape)', 'Alphanumeric passphrase'],
    correct: 2,
    explanation: 'Swipe patterns leave smudge traces on screens, are visible when entered in public, and have limited combinations (only 389,112 vs 1,000,000 for a 6-digit PIN). Use biometrics + PIN as the most practical secure combination.'
  },
  {
    title: 'Suspicious Downloads',
    scenario: 'You find a free version of a $60 video game on an unknown website. The .exe file triggers your antivirus warning.',
    question: 'What do you do?',
    options: ['Download it — antivirus false positives are common with games', 'Download it but scan it with a second antivirus', "Don't download it — free copies of paid software frequently contain malware", 'Ask a friend to download and test it first'],
    correct: 2,
    explanation: 'Cracked software is one of the top malware distribution vectors. The "free game" often hides a RAT (Remote Access Trojan), cryptocurrency miner, or ransomware. No game is worth a compromised system. Use legitimate platforms only.'
  },
  {
    title: 'Shared Computers',
    scenario: 'You used a library computer to check your email and social media.',
    question: 'Before leaving the computer, what MUST you do?',
    options: ['Clear browser history only', 'Log out of all accounts AND clear browsing data (history, cookies, cached passwords)', 'Just close all browser tabs', 'Restart the computer so data is erased'],
    correct: 1,
    explanation: 'Closing tabs does NOT log you out. The next user could reopen your session. Always: (1) log out of all accounts, (2) clear cookies and saved passwords, (3) close the browser. Never save passwords on shared machines.'
  },
  {
    title: 'Secure Communication',
    question: 'You need to send your passport scan and tax ID to a government office. Which method is MOST secure?',
    options: ['Regular unencrypted email (Gmail, Outlook)', 'SMS text message', "The government portal's secure encrypted upload system or encrypted email", 'Post the scan in a private Facebook message'],
    correct: 2,
    explanation: 'Standard email is not encrypted in transit and can be intercepted. Government portals use TLS encryption and access controls. For highly sensitive documents, always use the official secure channel — never social media or standard SMS.'
  }
];

const SecurityPracticesLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
  <G9QuizModule
    moduleId="security-practices"
    moduleName="Security Practices"
    levels={levels}
    introSlides={introSlides}
    accentClass="accent-secondary"
    onComplete={onComplete}
  />
);

export default SecurityPracticesLab;
