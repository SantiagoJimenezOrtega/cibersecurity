import React from 'react';
import { AlertOctagon, Phone, Ban } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
  {
    icon: <AlertOctagon size={32} />,
    title: 'The Anatomy of a Scam',
    body: 'Scams exploit trust, urgency, greed, or fear. They arrive via phone, email, text, or in person. Understanding how scams work — and what they want — gives you the power to recognize and stop them.'
  },
  {
    icon: <Phone size={32} />,
    title: 'Why Smart People Fall for Scams',
    body: 'Scammers are professional manipulators. They use psychological techniques refined over decades: impersonation of authority, artificial deadlines, emotional exploitation, and incremental commitment. It is not about intelligence — it is about knowing the patterns.'
  },
  {
    icon: <Ban size={32} />,
    title: 'Your Response Playbook',
    body: '10 levels will train you to respond correctly to specific scam types. Each scenario tests a different manipulation technique. Answer correctly to unlock the next level and build your scam defense vocabulary.'
  }
];

const levels: QuizLevel[] = [
  {
    title: 'Tech Support Scam',
    scenario: 'A full-screen pop-up appears: "CRITICAL VIRUS DETECTED! Your computer is infected! Call Microsoft Support immediately: 1-800-XXX-XXXX. DO NOT CLOSE THIS WINDOW."',
    question: 'What is the correct response?',
    options: ['Call the number — it looks like an official Windows alert', 'Close the pop-up (force-quit if needed), run your real antivirus, and ignore the number', 'Pay the fee they request to clean the virus remotely', 'Restart your computer and call the number just in case'],
    correct: 1,
    explanation: 'Microsoft, Apple, and Google NEVER display phone numbers in pop-ups or call you about viruses. Tech support scams make millions annually. The number leads to scammers who will charge $200-$400 for "cleaning" a virus that did not exist. Close the browser, run your real antivirus.'
  },
  {
    title: 'Prize / Lottery Scam',
    scenario: 'Email: "Congratulations! You have been selected to receive $50,000! To claim your prize, pay a $200 processing and transfer fee first."',
    question: 'What type of scam is this and why does the fee exist?',
    options: ['A real lottery — processing fees are legally required for large transfers', 'An advance-fee scam: you never win because there is no prize — the fee itself is the scam', 'A promotional offer from a legitimate company that uses unusual payment methods', 'A government grant program with standard administrative fees'],
    correct: 1,
    explanation: 'The advance-fee scam is one of the oldest in existence (also called "419 fraud"). The "fee" is the entire scam. After paying, more fees appear. You never entered a lottery, so you cannot win one. Real lotteries never require payment before receiving a prize.'
  },
  {
    title: 'Romance Scam',
    scenario: 'You have been chatting with someone online for 3 weeks. They claim to love you deeply but have never video-called. Now they say they have a medical emergency and need $800 urgently.',
    question: 'What should you do?',
    options: ['Send the money — they are in a real emergency', 'Send half to test if they are genuine', 'This is a romance scam — never send money to someone you have only met online regardless of emotional connection', 'Give them your bank account details to transfer money themselves'],
    correct: 2,
    explanation: 'Romance scammers spend weeks building emotional bonds before the "crisis" request. They refuse video calls (using stolen photos). In 2022, romance scams caused $1.3 billion in losses in the US alone. The investment of time and emotion makes this scam especially painful — but the rule is absolute: no money to online-only relationships.'
  },
  {
    title: 'Crypto / Investment Scam',
    scenario: '"Join our exclusive crypto platform! Invest $500 today and get $5,000 back in 7 days — guaranteed returns of 1000%!"',
    question: 'What makes this definitively a scam?',
    options: ['Crypto investments can legitimately return 1000% in a week', 'Guaranteed returns are impossible in real investing — all investment carries risk', 'It is only risky, but some platforms do offer high returns', 'Only the 7-day timeline is suspicious — the return percentage is possible'],
    correct: 1,
    explanation: 'No legitimate investment guarantees returns. "Guaranteed" is the key word that proves fraud. This is a Ponzi scheme: early investors are paid with new investors\' money until it collapses. The SEC reports crypto investment fraud as the fastest-growing financial scam category.'
  },
  {
    title: 'Government Impersonation',
    scenario: 'Phone call: "This is the IRS. You owe $3,400 in back taxes. A warrant is being issued for your arrest in 2 hours unless you pay immediately via Google Play gift cards."',
    question: 'What do you do?',
    options: ['Buy the gift cards — an arrest warrant is serious', 'Hang up immediately. Government agencies never demand instant payment via gift cards', 'Ask them to send an email first, then pay', 'Pay half now and dispute the other half later'],
    correct: 1,
    explanation: 'The IRS, police, and government agencies NEVER: (1) demand immediate payment by phone, (2) accept gift cards as payment, (3) threaten arrest over unpaid taxes without prior written notice. Gift cards cannot be traced or reversed — that is why scammers demand them. Hang up and call the agency directly using the number on their official website.'
  },
  {
    title: 'Fake Job Offer',
    scenario: '"Work from home! $4,000/week. Process incoming payments and wire transfers. No experience needed. Send us your bank account details to set up direct deposit."',
    question: 'What is this really?',
    options: ['A legitimate remote job opportunity with high demand', 'A money mule scam — you would unknowingly launder criminal funds and be liable', 'A real training position with high starting pay', 'A data entry job using your bank account as a business account'],
    correct: 1,
    explanation: 'Money mule scams recruit unwitting accomplices to move stolen funds. You receive stolen money in your account, keep a percentage, and wire the rest. This is criminal money laundering even if you did not know the source. Consequences: bank account frozen, criminal charges, financial responsibility for all funds. Red flags: high pay, no experience, uses your personal bank account.'
  },
  {
    title: 'Fake Charity',
    scenario: 'After a major earthquake, you get a call from "Global Disaster Relief Fund" requesting urgent donations via wire transfer or gift cards to help victims.',
    question: 'What is the correct response?',
    options: ['Donate immediately — disaster victims need help now', 'Donate half by wire transfer and half by gift card to diversify', 'Research the organization through Charity Navigator or GuideStar before donating any amount', 'Only donate if they send you a receipt first'],
    correct: 2,
    explanation: 'Fake charity scams spike after every disaster. Red flags: pressure for immediate donation, gift card or wire transfer payment only, no verifiable address or registration number. Real charities accept credit cards, have EIN numbers, and appear on charity watchdog sites. Research before donating: charitynavigator.org, guidestar.org.'
  },
  {
    title: 'Student Loan Scam',
    scenario: 'Email: "URGENT: Your student loan has been approved for full forgiveness! Complete the process now — pay a $99 administrative processing fee to finalize."',
    question: 'Why is this definitely a scam?',
    options: ['Loan forgiveness programs are always run by private companies', 'Legitimate government loan forgiveness programs never charge processing fees of any kind', 'The $99 fee is reasonable for an administrative process', 'It is a real program — loan forgiveness requires a small activation fee'],
    correct: 1,
    explanation: 'Legitimate federal student loan forgiveness (PSLF, IDR forgiveness) is administered through your loan servicer at zero cost. Any company charging fees for "loan forgiveness services" is either a scam or an unnecessary middleman. Apply directly at studentaid.gov — it is free and official.'
  },
  {
    title: 'Reporting a Scam',
    scenario: 'You realize you clicked a phishing link and entered your login credentials on a fake website.',
    question: 'What is the MOST important first step?',
    options: ['Share the experience on social media to warn friends (post first)', 'Do nothing — you only gave a login, not financial information', 'Immediately change your password on the real site and enable 2FA, then report to the relevant authority', 'Wait 24 hours to see if unauthorized activity appears'],
    correct: 2,
    explanation: 'Speed is critical. Change the compromised password immediately — every minute the attacker has access. Enable 2FA to prevent return access. Then: report to the FTC (reportfraud.ftc.gov), the platform impersonated, and if financial data was involved, your bank. Early reporting limits damage and helps authorities track patterns.'
  },
  {
    title: 'Scam Recovery',
    scenario: 'You gave a scammer your credit card number, expiration date, and CVV code over the phone.',
    question: 'What should you do IMMEDIATELY — within the next 5 minutes?',
    options: ['Wait and monitor your statements for unauthorized charges over the next few days', 'Call your bank right now to freeze/cancel the card and dispute any pending transactions', 'Change your email password as the first step', 'Report only to social media so others are warned before taking action'],
    correct: 1,
    explanation: 'Card data scammers sell it within minutes on dark web markets. Call the number on the BACK of your card immediately. Say: "I believe my card was compromised — please freeze it and issue a new number." Banks can reverse charges if reported quickly. Every minute matters — do not wait for charges to appear.'
  }
];

const ScamResponsesLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
  <G9QuizModule
    moduleId="scam-responses"
    moduleName="Scam Responses"
    levels={levels}
    introSlides={introSlides}
    accentClass="accent-secondary"
    onComplete={onComplete}
  />
);

export default ScamResponsesLab;
