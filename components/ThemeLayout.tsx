import React, { useState } from 'react';

type ModalType = 'About' | 'Contact' | 'Guide' | 'ReadMe' | 'Privacy' | 'Terms' | 'DMCA';

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-gray-900/95 border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col relative" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md px-6 py-4 z-10 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto p-6 md:p-8 space-y-4 custom-scrollbar">
                    <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-cyan-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Modal Contents ---

const AboutContent = () => (
    <div className="space-y-4">
        <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to the <strong>AI Sentiment Analyzer</strong>. This state-of-the-art application leverages the immense computational power of Google's Gemini 2.5 Flash model to deconstruct and understand the emotional nuances of human language.
        </p>
        <p>
            Whether you are a market researcher, a social media manager, or a developer interested in NLP, this tool provides instant, accurate classification of text into Positive, Negative, or Neutral sentiments, complete with confidence scoring.
        </p>
    </div>
);

const ContactContent = () => (
    <div className="space-y-4 text-center">
        <p className="text-xl">We'd love to hear from you!</p>
        <div className="flex flex-col items-center gap-4 mt-6">
            <a href="mailto:hsini.web@gmail.com" className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>hsini.web@gmail.com</span>
            </a>
            <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-3 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                <span>Visit doodax.com</span>
            </a>
        </div>
    </div>
);

const GuideContent = () => (
    <div>
        <h3>How to Use the Analyzer</h3>
        <ol className="space-y-2">
            <li><strong>Input Text:</strong> Copy and paste the text (reviews, comments, emails) you want to analyze into the main text area.</li>
            <li><strong>Analyze:</strong> Click the vibrant "Analyze Sentiment" button.</li>
            <li><strong>Interpret Results:</strong> 
                <ul className="pl-5 list-disc mt-1 text-gray-400">
                    <li><span className="text-green-400">Positive</span>: Good news, happiness, approval.</li>
                    <li><span className="text-red-400">Negative</span>: Complaints, anger, sadness.</li>
                    <li><span className="text-yellow-400">Neutral</span>: Facts, objective statements, lack of strong emotion.</li>
                </ul>
            </li>
            <li><strong>Confidence Score:</strong> The percentage shows how certain the AI is about its conclusion.</li>
        </ol>
    </div>
);

const PrivacyContent = () => (
    <div className="text-sm text-gray-400">
        <h3>Privacy Policy</h3>
        <p><strong>Last Updated: October 2023</strong></p>
        <p>At AI Sentiment Analyzer (accessible from doodax.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>
        
        <h4>Data Processing</h4>
        <p>This application operates primarily as a client-side interface. The text you input for analysis is transmitted directly from your browser to Google's Gemini API for processing. We (doodax.com) do not store, archive, or sell your input text on our own servers.</p>

        <h4>Third-Party Services</h4>
        <p>We use Google's Generative AI services. Their use of data is governed by the Google Privacy Policy and Google API Terms of Service. We encourage you to review these documents to understand how your data is handled by the AI provider.</p>
        
        <h4>Log Files</h4>
        <p>Like many other Web sites, doodax.com makes use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information.</p>
    </div>
);

const TermsContent = () => (
    <div className="text-sm text-gray-400">
        <h3>Terms of Service</h3>
        <p><strong>1. Acceptance of Terms</strong><br/>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <p><strong>2. Use License</strong><br/>Permission is granted to temporarily use the materials (information or software) on AI Sentiment Analyzer's website for personal, non-commercial transitory viewing only.</p>
        <p><strong>3. Disclaimer</strong><br/>The materials on this website are provided "as is". AI Sentiment Analyzer makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <p><strong>4. Limitations</strong><br/>In no event shall AI Sentiment Analyzer or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this site.</p>
    </div>
);

const DMCAContent = () => (
    <div className="text-sm text-gray-400">
        <h3>DMCA Copyright Policy</h3>
        <p>We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes the copyright or other intellectual property infringement of any person.</p>
        <p>If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, you must submit your notice in writing to the attention of "Copyright Infringement" via email to <strong>hsini.web@gmail.com</strong>.</p>
        <p>You must include in your notice a detailed description of the alleged Infringement.</p>
    </div>
);


const ThemeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const getModalContent = (modal: ModalType) => {
    switch(modal) {
        case 'About': return <AboutContent />;
        case 'Contact': return <ContactContent />;
        case 'Guide': return <GuideContent />;
        case 'Privacy': return <PrivacyContent />;
        case 'Terms': return <TermsContent />;
        case 'DMCA': return <DMCAContent />;
        case 'ReadMe': return <div className="text-center">Please visit our GitHub repository for the full README.</div>;
        default: return null;
    }
  };

  const navLinks: { name: ModalType, label: string }[] = [
    { name: 'About', label: 'About' },
    { name: 'Guide', label: 'Guide' },
    { name: 'Contact', label: 'Contact' },
    { name: 'Privacy', label: 'Privacy' },
    { name: 'Terms', label: 'Terms' },
    { name: 'DMCA', label: 'DMCA' }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-inter selection:bg-purple-500 selection:text-white">
        
        {/* Galaxy Background */}
        <div className="fixed inset-0 z-0 bg-[#0f172a]">
            {/* Stars Layer 1 */}
            <div className="absolute inset-0 opacity-40" 
                 style={{backgroundImage: 'radial-gradient(1px 1px at 10% 10%, #fff 1px, transparent 0), radial-gradient(1px 1px at 20% 20%, #fff 1px, transparent 0), radial-gradient(2px 2px at 30% 30%, #fff 1px, transparent 0), radial-gradient(1px 1px at 40% 40%, #fff 1px, transparent 0)', backgroundSize: '550px 550px'}}></div>
             {/* Stars Layer 2 */}
            <div className="absolute inset-0 opacity-60" 
                 style={{backgroundImage: 'radial-gradient(1px 1px at 50% 50%, #fff 1px, transparent 0), radial-gradient(2px 2px at 60% 60%, #fff 1px, transparent 0), radial-gradient(1px 1px at 70% 70%, #fff 1px, transparent 0), radial-gradient(1px 1px at 80% 80%, #fff 1px, transparent 0)', backgroundSize: '350px 350px'}}></div>
            
            {/* Nebula Clouds */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/30 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-indigo-900/30 blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-pink-900/20 blur-[130px] animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header */}
            <header className="py-5 px-6 lg:px-12 bg-gray-900/50 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            AI Sentiment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Analyzer</span>
                        </h1>
                    </div>
                    
                    <nav className="hidden md:flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        {navLinks.map(link => (
                            <button 
                                key={link.name} 
                                onClick={() => setActiveModal(link.name)} 
                                className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                     {/* Mobile Menu Icon (Placeholder) */}
                     <button className="md:hidden text-gray-300" onClick={() => setActiveModal('About')}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                     </button>
                </div>
            </header>
            
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/5 bg-gray-900/60 backdrop-blur-xl">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Doodax. All rights reserved.</span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                        <button onClick={() => setActiveModal('Privacy')} className="hover:text-white transition-colors">Privacy</button>
                        <button onClick={() => setActiveModal('Terms')} className="hover:text-white transition-colors">Terms</button>
                        <button onClick={() => setActiveModal('Contact')} className="hover:text-white transition-colors">Contact</button>
                    </div>

                    <div className="text-right flex flex-col items-end">
                         <div className="text-sm text-gray-400 mb-1">
                            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">HSINI MOHAMED</a>
                         </div>
                         <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                            doodax.com <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                         </a>
                    </div>
                </div>
            </footer>
        </div>
        
        {activeModal && (
            <Modal title={activeModal === 'ReadMe' ? 'Documentation' : activeModal} onClose={() => setActiveModal(null)}>
                {getModalContent(activeModal)}
            </Modal>
        )}
    </div>
  );
};

export default ThemeLayout;