import React from 'react';
import { Lock, Eye, AlertTriangle } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
    {
        icon: <Lock size={32} />,
        title: 'Advanced Data Risks',
        body: 'You already know the basics. Now go deeper: GDPR rights, data brokers, biometric data, behavioral profiling, dark patterns, metadata, and surveillance capitalism. These are the threats that affect your data every single day.',
    },
    {
        icon: <Eye size={32} />,
        title: 'Who Is Watching You?',
        body: 'Hundreds of companies you have never heard of hold detailed profiles about you. Data brokers, ad networks, app developers, and even your own devices constantly track, package, and sell your behavioral data as a commodity.',
    },
    {
        icon: <AlertTriangle size={32} />,
        title: 'Your Rights — Use Them',
        body: 'In this module you will face 10 specialized scenarios covering GDPR rights, biometric dangers, metadata exposure, dark patterns, and the surveillance economy. Answer correctly to unlock each level — no skipping allowed.',
    },
];

const levels: QuizLevel[] = [
    {
        title: 'GDPR Right of Access',
        question: 'Under GDPR, which specific right allows you to request a copy of ALL personal data a company holds about you?',
        options: [
            'Right to Data Portability — lets you move your data to another service provider',
            'Right of Access (Subject Access Request) — the company must provide all your personal data within 30 days, free of charge',
            'Right to Erasure — forces the company to delete all your data immediately',
            'Right to Restriction — limits how the company is allowed to process your data',
        ],
        correct: 1,
        explanation: 'GDPR Article 15 grants the Right of Access. A Subject Access Request (SAR) compels any company to provide every piece of personal data they hold about you within 30 days at no charge. This is distinct from portability (transferring data) and erasure (deleting it). You can exercise this right against any company operating in the EU.',
    },
    {
        title: 'Data Broker Industry',
        scenario: 'A company you have never interacted with holds a profile on you that includes your income bracket, political leanings, shopping habits, and health interests.',
        question: 'How did this company legally obtain this information?',
        options: [
            'They accessed your social media accounts without authorization — this is illegal',
            'They purchased your aggregated data from data brokers who compile public records, loyalty card data, app usage, and purchased commercial datasets',
            'This is illegal everywhere — no company can hold personal data without a direct relationship with you',
            'They inferred it from publicly available demographic statistics about your zip code and age group',
        ],
        correct: 1,
        explanation: 'Data brokers collect and sell detailed personal profiles by combining public records (court filings, voter rolls), store loyalty programs, app data, and datasets purchased from other companies. Firms like Acxiom and LexisNexis hold profiles on billions of people. GDPR limits this significantly in Europe, but many countries have minimal or no data broker regulation.',
    },
    {
        title: 'Biometric Data Risks',
        scenario: 'An app offers to authenticate your account using facial recognition and stores your facial geometry data on its servers for future logins.',
        question: 'Why is biometric data uniquely more dangerous than a password if it is breached?',
        options: [
            'Biometric data files are very large and cause more server storage costs when leaked',
            'Passwords can be changed after a breach — your face, fingerprint, iris pattern, or voice cannot be changed ever',
            'Facial recognition technology is less accurate than passwords and therefore easier to exploit',
            'Companies are universally prohibited by law from storing any biometric data on servers',
        ],
        correct: 1,
        explanation: 'Biometric data is permanent and physically tied to your identity. If a password database is breached, you generate a new password. If your facial geometry hash or fingerprint template is stolen, you cannot change your face or fingerprints. GDPR Article 9 classifies biometric data as special category data, requiring explicit informed consent and strict security measures.',
    },
    {
        title: 'Behavioral Profiling',
        scenario: 'You search for "knee pain treatment" on Monday. By Wednesday, you see advertisements for knee braces, physiotherapy clinics, and mobility aids across every unrelated website you visit.',
        question: 'What technology enables this cross-site tracking behavior?',
        options: [
            'Pure coincidence — search engines detect trending topics and show related ads to everyone in your region',
            'Third-party tracking cookies and invisible pixel trackers that report your activity to centralized ad networks across millions of partner websites',
            'Your internet service provider selling your search history data directly to advertising companies',
            'GPS location tracking on your device linked to physical store visits and purchase history',
        ],
        correct: 1,
        explanation: 'Third-party cookies and 1×1 pixel trackers (invisible tracking images embedded in pages) send your activity data to centralized ad networks. A single ad network can track you across millions of sites, building a detailed behavioral profile over years. GDPR requires explicit opt-in consent for non-essential tracking cookies. Privacy browsers like Firefox and Brave block third-party trackers by default.',
    },
    {
        title: 'Dark Patterns',
        scenario: 'A cookie consent banner displays a large green "Accept All" button. To reject non-essential cookies, you must click "Manage Preferences," navigate through 6 sub-pages, and manually uncheck 47 individual vendor toggles.',
        question: 'What is this manipulative UI design technique called?',
        options: [
            'UX best practices — the most common user preference should always be the easiest option',
            'A dark pattern — a deliberately deceptive interface designed to steer users toward consenting to data collection against their best interests',
            'A legal requirement under GDPR to display all privacy options in a comprehensive structured format',
            'An accessibility feature helping users who prefer a simple one-click consent experience',
        ],
        correct: 1,
        explanation: 'Dark patterns are UI designs engineered to manipulate users into choices they would not make if given a fair interface. Under GDPR, withdrawing consent must be as easy as giving it — making "Reject All" deliberately harder than "Accept All" violates this principle. French regulator CNIL and German authorities have fined major companies millions of euros for exactly this practice.',
    },
    {
        title: 'Metadata Risks',
        scenario: 'A journalist sends a confidential document to a source as a Word file. She believes she removed all identifying content from the text. The source later discovers the journalist\'s real name and workplace hidden in the file.',
        question: 'What type of hidden data reveals this information?',
        options: [
            'A digital watermark embedded invisibly by the company\'s printing system',
            'Document metadata: author name, company, revision history, previous editor names, tracked changes, and edit timestamps are stored invisibly in the file properties',
            'The file name itself was encoded with information about the document\'s origin and author',
            'Word documents cannot contain hidden data — the source must have used other investigative methods',
        ],
        correct: 1,
        explanation: 'Office documents carry rich metadata invisible in the text: author name, company, all previous editor names from revision history, total edit time, and tracked changes. Photos embed EXIF data including GPS coordinates. Metadata has exposed whistleblowers, confidential sources, and undercover investigators. Always use dedicated metadata scrubbing tools (like MAT2 or the "Inspect Document" feature) before sharing sensitive files.',
    },
    {
        title: 'Data Aggregation Problem',
        scenario: 'A data analytics company has compiled these four facts about you — each sourced from public records: (1) 32-year-old female, (2) lives in Austin, TX, (3) works in healthcare, (4) attended UT Austin.',
        question: 'Why is this combination dangerous even though every individual fact is publicly available?',
        options: [
            'It is not dangerous — all information is public and therefore inherently harmless',
            'Data aggregation: combining individually innocuous facts creates a unique profile that can identify, target, and discriminate against a specific individual with high precision',
            'Only sensitive private records create real privacy risk — demographic facts are never harmful regardless of how they are combined',
            'The combination is only dangerous if it reaches criminals — advertising companies and insurers pose no real risk',
        ],
        correct: 1,
        explanation: 'The aggregation problem: data points that are individually harmless become a precise identifier when combined. A 32-year-old female healthcare worker who attended UT Austin and lives in Austin might narrow to fewer than 50 people. Adding one more data point can make someone uniquely identifiable. This enables insurance discrimination, hiring bias, political micro-targeting, and stalking.',
    },
    {
        title: 'Right to Erasure',
        scenario: 'You request a social media platform to delete an embarrassing post you made eight years ago, invoking GDPR\'s Right to be Forgotten. The platform refuses, citing its policy of maintaining a public historical archive.',
        question: 'When can a company legally refuse a Right to Erasure request under GDPR?',
        options: [
            'Companies can always refuse — once you publish something publicly, you permanently lose your right to have it deleted',
            'Companies can refuse when data is necessary for legal obligations, public interest archiving, scientific research, or freedom of expression — but must provide a specific legal justification for the refusal',
            'Agreeing to Terms of Service at account creation permanently waives all GDPR rights including the right to erasure',
            'Erasure rights are only available to public figures — private citizens have unrestricted erasure rights at all times',
        ],
        correct: 1,
        explanation: 'GDPR Article 17 grants the Right to Erasure with specific statutory exceptions: compliance with legal obligations, tasks in the public interest, scientific or historical research, and freedom of expression (including journalism). A company must cite a specific legal basis for any refusal — a general Terms of Service cannot override GDPR. If refused without valid grounds, you can file a complaint with your national Data Protection Authority (DPA).',
    },
    {
        title: 'Valid Consent Under GDPR',
        scenario: 'A shopping app\'s 47-page Terms and Conditions state in section 31.4 that by creating an account you consent to your real-time location data being continuously tracked and sold to third-party advertisers.',
        question: 'Is this valid consent under GDPR?',
        options: [
            'Yes — by creating an account you agreed to the full Terms, which constitutes a legally binding contract',
            'No — GDPR requires consent to be freely given, specific, informed, and unambiguous. Burying consent in Terms of Service fails all four requirements and is explicitly prohibited',
            'Yes — Terms of Service are formal legal contracts that supersede data protection regulations',
            'Only invalid if the Terms were not translated into your native language or if you did not confirm you read them',
        ],
        correct: 1,
        explanation: 'GDPR Recital 32 and Article 7 explicitly prohibit pre-ticked boxes, bundled consent, and consent buried in Terms of Service. Each data processing purpose requires a separate, clear, affirmative action. An all-or-nothing Terms agreement that bundles location tracking consent with basic account creation satisfies none of the four GDPR consent requirements and is legally unenforceable as a consent mechanism.',
    },
    {
        title: 'Surveillance Capitalism',
        scenario: 'A "free" email service scans every email you send and receive to build a behavioral profile, sells that profile to hedge funds for market prediction, and provides detailed voter personality data to political campaigns for micro-targeted advertising.',
        question: 'What economic model does this describe?',
        options: [
            'Traditional advertising — similar in kind to how television networks and magazines sell audience-targeted ad placements',
            'Surveillance capitalism — the systematic extraction and commodification of behavioral data to predict and modify human behavior, far beyond what traditional advertising ever claimed to do',
            'A freemium business model where a paid premium tier removes all data collection',
            'Open-source economics where anonymized data is shared freely to improve public services',
        ],
        correct: 1,
        explanation: 'Surveillance capitalism, a term coined by academic Shoshana Zuboff, describes how personal behavioral data is harvested at massive scale and sold not merely for ad targeting but to predict and influence human decisions, emotions, and beliefs. Unlike traditional advertising which reached audiences, surveillance capitalism sells the ability to modify individual behavior — to corporations, insurers, and political actors alike.',
    },
];

const AdvancedDataRisksLab: React.FC<{ onComplete: (cert?: CertificateRecord) => void }> = ({ onComplete }) => (
    <G9QuizModule
        moduleId="advanced-data-risks"
        moduleName="Advanced Data Risks"
        levels={levels}
        introSlides={introSlides}
        accentClass="accent-primary"
        onComplete={onComplete}
    />
);

export default AdvancedDataRisksLab;
