import React from 'react';
import { BookOpen, Compass, CheckSquare } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
  {
    icon: <BookOpen size={32} />,
    title: 'Your Security Toolkit',
    body: 'Knowing a threat exists is only half the battle. You also need concrete step-by-step guides for protecting yourself. This module teaches you exactly what to do — and when — across every aspect of your digital life.'
  },
  {
    icon: <Compass size={32} />,
    title: 'Defense in Depth',
    body: 'Professional security uses multiple overlapping layers of protection. No single tool is perfect, but combining password managers, HTTPS awareness, secure networks, and backup routines creates a powerful shield.'
  },
  {
    icon: <CheckSquare size={32} />,
    title: 'Apply Each Guide',
    body: '10 levels cover the most important security guides for everyday digital life. From password managers to incident response — each correct answer unlocks the next level.'
  }
];

const levels: QuizLevel[] = [
  {
    title: 'Password Managers',
    question: 'What is the PRIMARY benefit of using a password manager?',
    options: ['It creates one master password you use everywhere', 'It generates and stores unique, strong passwords for every site — you only remember one master password', 'It automatically changes your passwords every day', 'It stores passwords in a text file on your desktop'],
    correct: 1,
    explanation: 'Password managers like Bitwarden (free) generate a different strong password for each site. If one site is breached, all your other accounts stay safe. The master password encrypts the vault — it never leaves your device.'
  },
  {
    title: 'HTTPS & Secure Sites',
    scenario: 'You are about to enter your credit card number on a shopping website.',
    question: 'What should you verify FIRST?',
    options: ['The website has a modern, professional design', 'The URL begins with https:// and a padlock icon is visible in the address bar', 'The website loads quickly', 'The site has a copyright notice at the bottom'],
    correct: 1,
    explanation: 'HTTPS (HyperText Transfer Protocol Secure) encrypts data between your browser and the server. Without it, your card number travels in plain text. The padlock means the connection is encrypted — but NOT that the site is legitimate. Also check the domain carefully.'
  },
  {
    title: 'Email Security',
    scenario: 'You receive an email from "billing@paypa1-secure.com" asking you to verify your PayPal account.',
    question: "What is suspicious about this email's sender?",
    options: ['Nothing — PayPal uses different domains for billing', '"paypa1-secure.com" is a fake domain (uses number 1 instead of letter l) — not the real paypal.com', 'Billing emails are always suspicious regardless of domain', 'The word "secure" in the domain is the red flag'],
    correct: 1,
    explanation: 'Domain impersonation replaces hard-to-spot characters: l→1, o→0, rn→m. The real PayPal only sends from @paypal.com. Always check the full domain, not just the display name. Hover over the sender address to reveal the actual email.'
  },
  {
    title: 'Social Media Safety',
    question: 'Which information should NEVER appear on a public social media profile?',
    options: ['Your favorite music or movies', 'Your home address combined with your daily schedule and employer', 'Your first name and general interests', 'Your school city (not full address)'],
    correct: 1,
    explanation: 'Combining home address + schedule + employer creates a stalking/burglary blueprint. Criminals use social media to case targets. Keep profiles to first name, general interests, and vague location. Your full birthday also enables identity theft.'
  },
  {
    title: 'Mobile Security',
    scenario: 'Your phone is stolen from a café.',
    question: 'Which setting would have BEST protected your data?',
    options: ['Having a lock screen wallpaper with your name', 'Full-disk encryption enabled + remote wipe configured beforehand', 'Turning off WiFi when not in use', 'Using a dark mode theme (harder to see screen)'],
    correct: 1,
    explanation: 'Full-disk encryption makes data unreadable without the PIN even if the storage is physically removed. Remote wipe (via Find My iPhone or Google Find My Device) lets you erase the device remotely. Both should be configured before loss occurs, not after.'
  },
  {
    title: 'Home Router Security',
    scenario: 'You set up a new home router. It came with username "admin" and password "admin".',
    question: 'What is the FIRST thing you should change?',
    options: ['The router color theme in the settings', 'The default admin username and password to something unique and strong', 'The WiFi channel for better speed', 'The router firmware only when there are speed problems'],
    correct: 1,
    explanation: 'Default router credentials are published online — attackers scan for routers using them. Changing admin credentials prevents unauthorized access to your entire network. Also: update firmware, disable WPS, use WPA3 encryption, and hide SSID.'
  },
  {
    title: 'Safe Online Shopping',
    scenario: 'You find a deal on an unfamiliar website and want to buy something.',
    question: 'Which payment method minimizes your risk?',
    options: ['Your primary debit card directly linked to your bank account', 'A wire transfer — it is fast', 'A virtual/disposable credit card or PayPal (buyer protection)', 'Sharing your main bank account details with the merchant'],
    correct: 2,
    explanation: 'Virtual cards generate a one-time number — even if stolen, it cannot be reused. PayPal offers buyer protection and never shares your actual card with merchants. Debit cards have fewer protections than credit cards and directly expose your bank balance.'
  },
  {
    title: 'App Verification',
    question: 'Before downloading a new app, what should you check?',
    options: ['Only the star rating — 4+ stars means safe', 'Developer reputation, permissions requested, review content, and download count', 'Only whether it is free', 'Only if it is featured on the app store homepage'],
    correct: 1,
    explanation: 'Star ratings can be faked with bots. Check: (1) Is the developer verified? (2) Do requested permissions match the app purpose? (3) Do reviews mention suspicious behavior? (4) Is the download count realistic for an app of that type? All four together paint a real picture.'
  },
  {
    title: 'Incident Response',
    scenario: 'You discover someone has been accessing your email account from another country.',
    question: 'What is your FIRST action?',
    options: ['Post about it on social media to warn friends', 'Wait to see if more damage occurs before acting', 'Immediately change your password, enable 2FA, and review what was accessed', 'Delete the email account permanently'],
    correct: 2,
    explanation: 'Time matters in incident response. Step 1: Change password (locks out attacker). Step 2: Enable 2FA (prevents return). Step 3: Review account activity (assess damage). Step 4: Check if the same password was used elsewhere. Speed limits damage.'
  },
  {
    title: 'Full Security Audit',
    question: 'When conducting a complete personal digital security audit, which areas should you cover?',
    options: ['Only your social media accounts', 'Passwords, devices, all accounts, home network, backups, and app permissions', 'Only your computer and email', 'Only your financial accounts and credit cards'],
    correct: 1,
    explanation: 'A complete audit covers all six layers: (1) Passwords — unique everywhere with manager, (2) Devices — locked, encrypted, updated, (3) Accounts — 2FA enabled, unused accounts deleted, (4) Network — router secured, VPN for public WiFi, (5) Backups — 3-2-1 rule applied, (6) Apps — permissions audited.'
  }
];

const SecurityGuidesLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
  <G9QuizModule
    moduleId="security-guides"
    moduleName="Security Guides"
    levels={levels}
    introSlides={introSlides}
    accentClass="accent-primary"
    onComplete={onComplete}
  />
);

export default SecurityGuidesLab;
