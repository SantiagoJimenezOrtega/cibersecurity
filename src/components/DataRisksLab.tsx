import React from 'react';
import { Database, AlertTriangle, Eye } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
  {
    icon: <Database size={32} />,
    title: 'What Are Data Risks?',
    body: 'Every time you use the internet, you share data. Data risks are the ways your personal information can be exposed, stolen, or misused. Understanding these risks is the first step to protecting yourself online.'
  },
  {
    icon: <AlertTriangle size={32} />,
    title: 'Why Your Data is Valuable',
    body: "Your personal data — name, address, medical records, and financial information — is worth money to cybercriminals. They can sell it, use it for identity theft, or exploit it for targeted attacks against you."
  },
  {
    icon: <Eye size={32} />,
    title: 'Train Your Risk Awareness',
    body: 'In this module you will face 10 real-world scenarios. Identify the data risk in each situation. You must answer correctly to unlock the next level — no skipping allowed!'
  }
];

const levels: QuizLevel[] = [
  {
    title: 'Personal Data',
    question: 'Which of the following is considered personal data?',
    options: ['The color of a public building', 'Your home address', "Today's weather forecast", 'The name of a public park'],
    correct: 1,
    explanation: 'Personal data is any information that can identify a specific individual. Your home address directly identifies where you live, making it personal data that must be protected.'
  },
  {
    title: 'Sensitive Data',
    question: 'Which category of data requires the MOST protection by law and ethics?',
    options: ['Your favorite color', 'Your medical history and diagnoses', 'Your city of residence', 'Your school name'],
    correct: 1,
    explanation: 'Medical history is classified as sensitive personal data. It is protected by special regulations (like HIPAA) because exposure can lead to discrimination, insurance denial, and severe privacy violations.'
  },
  {
    title: 'Data Breach Scenario',
    scenario: 'A hospital database is hacked and patient records — including names, diagnoses, and ID numbers — are posted online.',
    question: 'What type of data was breached?',
    options: ['Public data — hospitals share info anyway', 'Anonymous data — names were removed', 'Sensitive personal data requiring immediate action', 'Statistical data with no individual risk'],
    correct: 2,
    explanation: 'Patient records contain sensitive personal data. This breach exposes individuals to identity theft, fraud, and privacy violations. Hospitals must notify affected individuals and authorities immediately.'
  },
  {
    title: 'Social Media Risk',
    scenario: 'Ana posts her full birthday, phone number, and school schedule on her public Instagram profile.',
    question: 'What is the PRIMARY risk she faces?',
    options: ['No risk — social media is safe', 'Identity theft and targeted attacks using her personal info', 'Only spam emails from businesses', 'Risk of losing followers'],
    correct: 1,
    explanation: 'Combining birthday, phone, and schedule gives attackers everything needed for identity theft, social engineering, or even physical stalking. Never post combinations of personal identifiers publicly.'
  },
  {
    title: 'App Permissions',
    scenario: 'A flashlight app requests access to your contacts, microphone, camera, and location.',
    question: 'What should you do?',
    options: ['Accept all permissions — the app needs them', 'Only accept location access', 'Question why a flashlight needs these and deny unnecessary permissions', 'Delete your contacts first, then accept'],
    correct: 2,
    explanation: 'A flashlight only needs screen brightness access. Requesting contacts, microphone, and location is a red flag for data harvesting. Always ask: "Why does this app need this permission?"'
  },
  {
    title: 'IoT Device Risk',
    scenario: 'Your smart TV is always in listening mode for voice commands. It is connected to your home WiFi.',
    question: 'What data risk does this create?',
    options: ['No risk — smart TVs are certified secure', 'The TV could record private conversations and send them to servers', 'Only your TV viewing preferences are collected', 'It only risks your WiFi password'],
    correct: 1,
    explanation: 'Always-on microphones on IoT devices can capture private conversations. In 2017, Samsung smart TVs were found transmitting voice data to third parties. Disable voice features when not in use.'
  },
  {
    title: 'Cloud Storage',
    scenario: 'You store scanned copies of your passport and ID in a free cloud service without enabling two-factor authentication.',
    question: "What's the primary risk?",
    options: ['Files may get corrupted in the cloud', 'Unauthorized access to your sensitive identity documents', 'Files will be automatically deleted after 30 days', 'The cloud will charge you extra'],
    correct: 1,
    explanation: 'Without 2FA, a single compromised password exposes your most sensitive documents. Identity documents in the wrong hands enable full identity theft. Always enable 2FA on cloud storage containing personal files.'
  },
  {
    title: 'Third-Party Sharing',
    scenario: 'A free quiz app says in its terms: "We may share your data with advertising partners to improve your experience."',
    question: 'What does this mean for your data?',
    options: ['Nothing — this is standard and harmless', 'Your personal information will be sold to other companies for profit', 'Only your quiz scores are shared', 'Only anonymous data is shared — your identity is protected'],
    correct: 1,
    explanation: '"Advertising partners" is code for data brokers. Your age, interests, location, and behavior are sold to build profiles used for targeting. Read privacy policies before accepting — your data is the product.'
  },
  {
    title: 'Data Minimization',
    scenario: 'A website asks for your full name, birthday, phone, home address, and blood type just to create a newsletter subscription.',
    question: 'What is the correct approach?',
    options: ['Provide everything to complete registration faster', 'Provide only what is strictly necessary — an email address', 'Give fake information for all fields', 'Fill every field but use a middle initial instead of full name'],
    correct: 1,
    explanation: 'Data minimization is a core privacy principle: only share the minimum data needed for the service. A newsletter only needs an email. Collecting blood type for a newsletter is a major red flag for data harvesting.'
  },
  {
    title: 'Recognizing a Harvest',
    scenario: 'Email received: "Your account will be deleted unless you verify your identity by clicking this link and entering your SSN, password, and card number."',
    question: 'What is this?',
    options: ['A legitimate security alert from the company', 'A data harvesting phishing attack combining urgency and fear', 'Normal account maintenance — all companies do this', 'A test from your school IT department'],
    correct: 1,
    explanation: 'Legitimate companies NEVER ask for your SSN, password, or card number via email. This combines three classic phishing tactics: urgency ("will be deleted"), fear, and credential harvesting in one attack.'
  }
];

const DataRisksLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
  <G9QuizModule
    moduleId="data-risks"
    moduleName="Data Risks"
    levels={levels}
    introSlides={introSlides}
    accentClass="accent-primary"
    onComplete={onComplete}
  />
);

export default DataRisksLab;
