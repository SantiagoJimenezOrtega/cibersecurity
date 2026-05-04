import React from 'react';
import { Mail, AlertCircle, Search } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
  {
    icon: <Mail size={32} />,
    title: 'What is Phishing?',
    body: 'Phishing is a cyberattack that uses deceptive emails, messages, or websites to trick you into revealing passwords, card numbers, or personal data. Over 3 billion phishing emails are sent every day — it is the #1 attack vector worldwide.'
  },
  {
    icon: <AlertCircle size={32} />,
    title: 'The Anatomy of a Phishing Attack',
    body: "Attackers craft fake messages that look real. They use official logos, urgent language, familiar names, and convincing links. But every phishing attempt leaves signs — you just need to know where to look."
  },
  {
    icon: <Search size={32} />,
    title: 'Sharpen Your Detection Skills',
    body: '10 levels will test your ability to spot specific phishing indicators — from fake sender domains to dangerous attachments. You must identify the correct red flag to unlock the next level. Think like a detective!'
  }
];

const levels: QuizLevel[] = [
  {
    title: 'Fake Sender Domain',
    scenario: 'You receive an email from "security@amazon-account-alerts.net" saying your account has been suspended.',
    question: "What is wrong with this sender's email address?",
    options: ["Nothing — Amazon uses multiple domains for different departments", "Amazon's official domain is amazon.com — 'amazon-account-alerts.net' is a fake impersonation domain", 'The word "security" in the address makes it suspicious', 'Emails from .net domains are always fake'],
    correct: 1,
    explanation: 'Legitimate Amazon emails ONLY come from @amazon.com. Attackers register similar-looking domains (amazon-account-alerts.net, amazon-secure.com) to fool victims. Always check the domain after the @ symbol — not just the display name.'
  },
  {
    title: 'Urgency Tactics',
    scenario: 'Email subject: "⚠️ URGENT: Your account will be PERMANENTLY DELETED in 2 HOURS if you don\'t act NOW!"',
    question: 'What psychological manipulation technique is this using?',
    options: ['Personalization — using your name to build trust', 'Social proof — claiming others have already responded', 'False urgency — creating panic so you act without thinking', 'Authority bias — pretending to be official'],
    correct: 2,
    explanation: 'False urgency is the most common phishing technique. Artificial time pressure bypasses rational thinking — you click before analyzing. Real companies allow days or weeks for account issues, not hours. When you feel panicked, slow down and verify.'
  },
  {
    title: 'Hovering Over Links',
    scenario: 'An official-looking PayPal email has a "Verify Account" button.',
    question: 'Before clicking, what should you do?',
    options: ['Click it quickly to resolve the issue', 'Hover your cursor over the link to see the real destination URL in your browser status bar', 'Copy and paste it directly into the browser', 'Check if the email design looks professional enough to trust'],
    correct: 1,
    explanation: 'Phishing links display legitimate text (like "paypal.com/security") but the actual URL leads to a fake site. Hovering reveals the true destination. If the real URL does not match the claimed site, it is phishing. On mobile, long-press the link to preview.'
  },
  {
    title: 'Info Requests',
    question: 'A legitimate bank will NEVER ask you to do which of the following via email or phone?',
    options: ['Inform you about new account features', 'Send your password, full card number, or PIN via email or verbal communication', 'Notify you of unusual account activity (without requesting credentials)', 'Send monthly account statements'],
    correct: 1,
    explanation: 'Banks have a universal policy: they will NEVER ask for your password, full card number, or PIN — through any channel. This is an industry-wide rule. Any request for these details, regardless of how official it looks, is an attack.'
  },
  {
    title: 'Grammar Red Flags',
    scenario: 'Email body: "Dear Costumer, we have noting that you\'re acount have suspecious loggin activity from foreing device."',
    question: 'Beyond the obvious errors, why are grammar mistakes a strong phishing indicator?',
    options: ['They are not — anyone can make typos', 'Professional organizations have proofreading processes — mass phishing emails are rushed and translated poorly', 'Only the misspelling of "customer" matters here', 'Grammar errors only matter in formal documents, not emails'],
    correct: 1,
    explanation: 'Legitimate companies like banks and Amazon have legal, marketing, and technical teams reviewing every customer communication. Multiple grammar/spelling errors signal a rushed, often translated phishing template. Count the errors here: costumer, noting, acount, suspecious, foreing — 5 in one sentence.'
  },
  {
    title: 'Fake Branding',
    scenario: 'An email uses the Netflix logo and red color scheme, but the font is slightly different and the button says "Reactivate Acount" (one "c").',
    question: 'What is the correct response?',
    options: ['Trust it — the logo looks authentic enough', 'One typo is fine — Netflix support emails are not always perfect', 'Go directly to netflix.com by typing it in the browser — never click email links to check account status', 'Click one link to test if it redirects properly'],
    correct: 2,
    explanation: 'Attackers copy logos and color schemes but introduce subtle errors (font changes, typos). The safe rule: NEVER click links in emails to check account status. Always navigate directly to the official website by typing the address. The effort is worth it.'
  },
  {
    title: 'Dangerous Attachments',
    scenario: 'Unexpected email: "Please review your invoice." Attachment: "Invoice_March_Final.pdf.exe"',
    question: 'What is dangerous about this attachment?',
    options: ['PDF files are always safe to open', 'The filename hides a .exe extension after a fake .pdf extension — this is almost certainly malware', 'Invoice emails are always legitimate business communications', 'The file is compressed — that is what .exe means for PDFs'],
    correct: 1,
    explanation: 'Windows hides known file extensions by default. "Invoice.pdf.exe" appears as "Invoice.pdf" to most users. The .exe is the real extension — it is an executable program, not a PDF. Opening it runs malicious code. Never open unexpected attachments, especially from unknown senders.'
  },
  {
    title: 'Spear Phishing',
    scenario: 'Email: "Hi [your real name], I noticed you are in the Computer Science program at [your actual school]. Click here to confirm your course enrollment before Friday."',
    question: 'This is more dangerous than regular phishing because:',
    options: ['It uses formal language', 'It uses your real name and school — a targeted attack (spear phishing) using researched personal information to build credibility', 'It mentions a deadline', 'It came from an educational institution'],
    correct: 1,
    explanation: 'Spear phishing uses personal information gathered from social media, school websites, or data breaches to craft convincing targeted messages. They are significantly more effective than generic phishing. Your name + school + program + deadline = a very credible fake.'
  },
  {
    title: 'Smishing (SMS Phishing)',
    scenario: 'Text received: "USPS ALERT: Your package #7749 cannot be delivered. Pay $1.99 delivery fee at: http://usps-parcel-delivery.xyz"',
    question: 'How do you identify this as a scam?',
    options: ['USPS actually charges $1.99 fees for redelivery — this is normal', 'The domain "usps-parcel-delivery.xyz" is not the official usps.com, and USPS does not charge delivery redelivery fees via SMS links', 'The alert format looks unofficial', 'Only emails can be phishing — texts are always from real companies'],
    correct: 1,
    explanation: 'SMS phishing (smishing) has exploded because people trust text messages more than emails. Red flags: unofficial domain (.xyz vs .gov), unsolicited contact, small fee (lowers your guard), link to external site. USPS official domain is usps.com — nothing else.'
  },
  {
    title: 'Full Email Analysis',
    scenario: 'From: netflix-billing@customer-support-netflix.co | Subject: ⚠️ FINAL WARNING: Payment declined | Body: "Your subscription expires in 24h. Click HERE to update payment." | Link destination: netflix-account-update.suspicious.co',
    question: 'How many distinct red flags can you identify?',
    options: ['1 red flag — only the suspicious link', '2 red flags — the sender and the link', '3 red flags — sender, link, and urgent subject', 'At least 4 red flags: fake sender domain, fake link domain, urgency language, final warning pressure tactic'],
    correct: 3,
    explanation: "Count them: (1) Sender domain 'customer-support-netflix.co' is not netflix.com, (2) Link domain 'netflix-account-update.suspicious.co' is fake, (3) '⚠️ FINAL WARNING' is false urgency, (4) '24h deadline' is artificial pressure, (5) 'Click HERE' hides the real URL. 5 red flags in one email."
  }
];

const PhishingSignsLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
  <G9QuizModule
    moduleId="phishing-signs"
    moduleName="Phishing Signs"
    levels={levels}
    introSlides={introSlides}
    accentClass="accent-tertiary"
    onComplete={onComplete}
  />
);

export default PhishingSignsLab;
