import React from 'react';
import { Lock, Eye, AlertTriangle } from 'lucide-react';
import G9QuizModule, { type QuizLevel, type IntroSlide } from './G9QuizModule';
import type { CertificateRecord } from '../types';

const introSlides: IntroSlide[] = [
    {
        icon: <Lock size={32} />,
        title: 'Advanced Data Risks',
        body: 'You already know that your personal data can be at risk online. Now let\'s go deeper and understand HOW and WHY this happens. In this module you will learn about privacy rights, data tracking, and how to protect yourself.',
    },
    {
        icon: <Eye size={32} />,
        title: 'Who Has Your Data?',
        body: 'Every app, website, and online service you use collects information about you. Some companies share or sell that information to others — often without you realizing it. Understanding this is the first step to staying in control.',
    },
    {
        icon: <AlertTriangle size={32} />,
        title: 'Learn, Then Answer',
        body: 'Each level in this module teaches you something new about data privacy before asking you a question. Read the scenario carefully — it contains everything you need to answer correctly. You must pass each level to unlock the next one.',
    },
];

const levels: QuizLevel[] = [
    {
        title: 'Your Right to See Your Data',
        scenario: 'Did you know that in many countries, the law gives you the right to ask any company to show you exactly what personal information they have saved about you? This is called the "Right of Access." Companies that collect your data — like apps, social networks, or online stores — must reply to your request within 30 days and cannot charge you money for it.',
        question: 'You signed up for a gaming app one year ago. You want to know what personal information they have stored about you. What can you do?',
        options: [
            'Nothing — once you give a company your data, it belongs to them and you cannot ask for it back',
            'Contact the company and officially request a copy of all the personal data they hold about you — you have the legal right to do this',
            'Only your parents can make that kind of request because you are a minor',
            'Create a new account so that the old information gets replaced automatically',
        ],
        correct: 1,
        explanation: 'You have the legal "Right of Access" — you can ask any company to show you all personal data they hold about you. This right exists to protect you. If you submit a written request, the company must respond within 30 days for free. Knowing your rights is the first step in protecting your personal information online!',
    },
    {
        title: 'How Free Apps Make Money',
        scenario: 'Sofia downloads a "free" photo editing app. She enters her name, age, and email to create an account. A few weeks later, she starts receiving promotional emails from brands she has never heard of — brands that seem to know she is a teenager interested in fashion and music. Sofia never gave her contact information to those brands.\n\nMany free apps make money not by charging users, but by collecting user data and sharing or selling it to advertising companies. This is why you should always check what permissions an app asks for and read its privacy policy.',
        question: 'How did those companies most likely get Sofia\'s personal information?',
        options: [
            'Sofia must have accidentally signed up for their newsletters somewhere without noticing',
            'The free app shared or sold her data to other companies — this is one of the most common ways free apps make money',
            'The companies guessed her contact information based on her phone number or location',
            'Her email provider gave away her data without the app being involved',
        ],
        correct: 1,
        explanation: 'When an app or service is completely free, it often makes money by selling your data to advertisers. The long "Terms and Conditions" agreements you skip past usually explain this in complicated legal language. Before downloading any free app, ask: "How does this app make money?" If the answer is not clear, your data might be the product being sold.',
    },
    {
        title: 'Data You Can Never Change',
        scenario: 'Imagine someone steals your password. That is serious — but you can simply create a new password and protect your account again. Now imagine a company stores a digital copy of your fingerprint or a scan of your face, and that company gets hacked. The criminals now have your biometric data.\n\nThe word "biometric" refers to unique physical features used to identify you — like your fingerprint, the shape of your face, your iris pattern, or your voice. Unlike a password, you CANNOT change these things.',
        question: 'Why is biometric data (like a fingerprint or face scan) considered more dangerous to expose than a regular password?',
        options: [
            'It is not more dangerous — companies can reset your biometric data just like resetting a password',
            'Biometric data takes up more storage space so it causes bigger problems for servers',
            'You can never change your fingerprint or face — if that data is stolen, you cannot create a "new one" like you can with a password',
            'Biometric data is always encrypted automatically, so it cannot realistically be misused even if stolen',
        ],
        correct: 2,
        explanation: 'Your fingerprint, face structure, and iris pattern are permanently yours — they cannot be changed or "reset." If biometric data is leaked in a hack, criminals could potentially use it to impersonate you in security systems forever. This is why you should only use face ID or fingerprint login with trusted, well-known apps and devices. Be careful which apps you give this kind of access to.',
    },
    {
        title: 'Why Ads Follow You Around',
        scenario: 'Andrés searches for "birthday gift ideas" on his phone on Monday. For the next four days, he sees advertisements for gifts on every website he visits — including a sports news site, a math homework helper, and an online game. None of those sites sell gifts, but somehow they all know what he was looking for.\n\nThis happens because of small tracking files called "cookies" and invisible tracking images called "pixel trackers." When you visit a website, it places a cookie on your browser. Advertising networks connected to thousands of websites can read that cookie and show you related ads everywhere.',
        question: 'What technology is responsible for the ads following Andrés across all these different websites?',
        options: [
            'His phone\'s GPS is sharing his exact location with every website he visits',
            'The websites are making an educated guess about what he wants based on his age and where he lives',
            'Tracking cookies and invisible pixel trackers follow his browsing activity and report it to advertising networks across thousands of sites',
            'His internet provider is directly showing him sponsored content based on his recent searches',
        ],
        correct: 2,
        explanation: 'Websites place tiny tracking files (cookies) on your browser. When you visit another website that uses the same advertising network, that network recognizes you and shows relevant ads. This can feel like the internet is "watching you" — because in a way, it is. You can reduce this tracking by using privacy-focused browsers like Firefox or Brave, or by regularly clearing your cookies in browser settings.',
    },
    {
        title: 'Tricky Buttons That Trick You',
        scenario: 'Valentina visits a website and a big pop-up appears asking about privacy settings. There is a large, bright green button that says "ACCEPT ALL COOKIES." To say no, she has to click a tiny gray link labeled "Manage Preferences," then navigate through three more pages, and finally uncheck 12 different options one by one.\n\nThis kind of design is intentional. Companies make the "yes" button big and easy, and the "no" option tiny and complicated. This manipulation technique has a name: a "dark pattern."',
        question: 'What is the term for this design trick that makes it easy to say yes and very hard to say no?',
        options: [
            'Standard web design — websites are required by law to show all options this way',
            'A dark pattern — a deliberately manipulative design that pushes users into sharing more data than they intended',
            'A security feature that protects users by showing them every available privacy option in detail',
            'An accessibility improvement that helps users who prefer to manage their own cookie settings',
        ],
        correct: 1,
        explanation: 'A "dark pattern" is when a website or app uses clever design tricks to make you do something that benefits the company but goes against your own interests. Making the "Accept All" button obvious and "Reject All" nearly impossible to find is an example. In Europe, this is actually illegal — privacy laws say that choosing NO must be just as easy as choosing YES. Tip: always look for the option to reject non-essential cookies before clicking anything.',
    },
    {
        title: 'The Hidden Information in Your Photos',
        scenario: 'Carlos takes a photo inside his bedroom and posts it on social media. He is careful — the photo only shows his face and a plain wall. No address visible, no street signs, nothing recognizable. A few days later, someone messages him saying they know exactly which neighborhood he lives in.\n\nWhat Carlos did not know is that every photo taken with a modern smartphone automatically saves hidden data called "EXIF metadata." This hidden data can include the exact GPS coordinates (latitude and longitude) of where the photo was taken — pointing directly to his home.',
        question: 'What hidden information in Carlos\'s photo allowed someone to figure out where he lives?',
        options: [
            'The colors and lighting patterns in the photo can be analyzed to recognize specific neighborhoods',
            'EXIF metadata automatically saved inside the photo file includes the GPS coordinates of exactly where the photo was taken',
            'Social media platforms automatically add the user\'s home location to every photo they post',
            'The photo\'s file name was automatically generated with location information encoded in it',
        ],
        correct: 1,
        explanation: 'Every smartphone photo stores hidden "EXIF metadata" — invisible information including the exact GPS location where the photo was taken. If you post a photo taken at home, anyone can extract this data and find your address. To protect yourself: go to your camera app settings and turn off "location tagging" or "geotagging." This is an easy privacy step that many people overlook.',
    },
    {
        title: 'When Small Facts Become a Big Problem',
        scenario: 'Look at these four pieces of information about a student. Each one alone seems completely harmless:\n\n① She is a 15-year-old girl.\n② She lives in northern Bogotá.\n③ She goes to a private school.\n④ She practices volleyball on Tuesdays and Thursdays after school.\n\nNone of these facts are secret — she might mention any of them in a normal conversation. But what happens when all four are combined and shared publicly online?',
        question: 'Why does combining these four harmless facts create a real privacy and safety risk?',
        options: [
            'It does not create any risk — all of this information is normal to share publicly',
            'Together, these details could allow a stranger to identify this specific person, predict her exact location on certain days, and know when she might be alone or vulnerable',
            'The risk only exists if all four facts appear together in a single social media post — in separate posts they are completely safe',
            'Only law enforcement agencies have the tools to combine public information in a dangerous way',
        ],
        correct: 1,
        explanation: 'This is called the "data aggregation problem." Each fact is innocent on its own, but combined they create a detailed profile. A stranger now knows who she is, roughly where she lives, which school to look near, and that she will be at a volleyball practice Tuesday and Thursday afternoons. Privacy experts strongly recommend never posting combinations of your age, school name, neighborhood, daily schedule, and photos together — especially on public profiles.',
    },
    {
        title: 'Your Right to Be Forgotten',
        scenario: 'When Miguel was 12 years old, he posted something embarrassing on social media. He is now 15 and deeply regrets it. The post is still online and he wants it permanently deleted. His parents help him contact the platform to ask them to remove it.\n\nIn many countries, especially those with strong privacy laws, people — especially minors — have something called the "Right to Erasure," also known as the "Right to Be Forgotten." This means you can ask companies to permanently delete your personal information.',
        question: 'What right does Miguel have when asking the platform to delete his old post?',
        options: [
            'No right at all — once something is posted online, it becomes the platform\'s property and stays there forever',
            'The Right to Erasure — he can formally request that the platform permanently delete that post and any personal data connected to it',
            'Only his parents can legally submit a deletion request, and only through a court order',
            'He has to wait until he turns 18 before he can make any privacy-related requests to companies',
        ],
        correct: 1,
        explanation: 'The "Right to Erasure" (also called the Right to Be Forgotten) allows you to ask companies to delete your personal data. This right is especially strong for people under 18 — privacy laws give minors extra protections because young people should not be permanently defined by things they posted as children. If a platform refuses without a valid legal reason, you can report them to the government\'s data protection authority.',
    },
    {
        title: 'What Does Real Permission Look Like?',
        scenario: 'Luisa downloads a free music streaming app. Before she can use it, a pop-up appears:\n\n"By tapping Continue, you agree to our Terms of Service and Privacy Policy."\n\nThe Terms of Service are 42 pages long. The Privacy Policy is 18 pages long, written in legal language. Luisa taps Continue without reading either one.\n\nHidden on page 34 of the Terms, the app states it will track her listening habits, physical location, and share this data with "selected partners" for advertising purposes.',
        question: 'Has Luisa truly given meaningful, informed permission for the app to collect and share her data?',
        options: [
            'Yes — she tapped Continue, which legally counts as full consent for everything written in the Terms',
            'Not really — genuine informed permission means understanding what you agree to. Hiding important data practices in 60 pages of legal text is not considered valid or fair consent in many countries',
            'Yes — as long as she is over 13 years old, any click or tap on Continue counts as legal consent',
            'It depends on whether she is connected to WiFi or using mobile data when she tapped Continue',
        ],
        correct: 1,
        explanation: 'True "informed consent" means you actually understand what you are agreeing to. Many countries\' privacy laws say that hiding data collection inside pages of complicated legal text is NOT valid consent. Companies should ask for permission in clear, simple language — separately for each type of data use. When an app asks for unusual permissions (like access to your location, contacts, or camera) always ask: "Does this app actually need this to work properly?" If not, deny the permission.',
    },
    {
        title: 'The Real Price of "Free"',
        scenario: 'Think about all the completely free things you use every day: social media, search engines, messaging apps, video platforms. These companies pay thousands of engineers, rent massive server buildings around the world, and run expensive advertising campaigns. Yet they charge you absolutely nothing to use their services.\n\nIf you are not paying money for the product... how do these companies make billions of dollars every year?\n\nThe answer is simpler and more surprising than most people expect.',
        question: 'If users pay nothing to use these platforms, how do they generate billions of dollars in revenue?',
        options: [
            'They are funded entirely by government research grants and academic institutions',
            'They make money by collecting detailed data about every user\'s behavior, interests, relationships, and habits — then selling this knowledge to advertisers and other companies',
            'They charge businesses a small fee to list their products and services, similar to how a shopping mall charges store rent',
            'The "free" period is temporary — users will eventually be asked to pay once the platform has enough users',
        ],
        correct: 1,
        explanation: 'There is a famous saying in technology: "If the product is free, YOU are the product." Social media companies, search engines, and free apps earn money by learning everything about you — what you enjoy, what you fear, what you buy, who your friends are, and how you spend your time — and then selling this detailed knowledge to advertisers. The more they know about you, the more valuable that advertising space becomes. Understanding this business model helps you make smarter, more informed choices about which apps to use and what personal information to share.',
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
