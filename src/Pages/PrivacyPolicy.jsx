import React from 'react';
import { Database, Cog, Share2, Shield, Archive, UserCheck, Cookie, Link as LinkIcon, PersonStanding, FilePenLine, Phone } from 'lucide-react';

// Section Title ke liye ek reusable component
const SectionTitle = ({ icon, title }) => (
    <div className="flex items-center mt-8 mb-4 border-b border-blue-800/50 pb-2">
        {React.cloneElement(icon, { className: "w-6 h-6 mr-4 text-yellow-400 flex-shrink-0" })}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
);

// Paragraph ke liye ek reusable component
const Paragraph = ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
);

// List item ke liye ek reusable component
const ListItem = ({ children }) => (
     <li className="flex items-start mb-2">
        <span className="text-yellow-400 mr-3 mt-1">◆</span>
        <span className="text-gray-300">{children}</span>
    </li>
);

export default function PrivacyPolicy() {
    return (
        <div className="bg-[#192A41] min-h-screen text-white">
            <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                {/* Page Header */}
                <header className="mb-12 text-center pt-20">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white pb-2">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-400">Rajshaili: The Institute of Divine Knowledge</p>
                </header>

                <main className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-blue-800/50 shadow-lg">
                    <Paragraph>
                        Welcome to Rajshaili: The Institute of Divine Knowledge ("Rajshaili," "we," "our," or "us"). As a sacred and scholarly sanctuary, we are deeply committed to protecting the privacy and sanctity of the information entrusted to us by our students, clients, and community members. This Privacy Policy explains how we collect, use, and safeguard your information across our educational programs, consultations, research activities, and website.
                    </Paragraph>

                    <section>
                        <SectionTitle icon={<Database />} title="1. Information We Collect" />
                        <Paragraph>To provide our holistic services, we collect information relevant to your engagement with us. The types of information may include:</Paragraph>
                        <ul>
                            <ListItem><strong>Student & Applicant Information:</strong> Name, email address, contact details, and educational background when you apply for or enroll in our Certificate, Diploma, and other academic programs.</ListItem>
                            <ListItem><strong>Consultation & Client Data:</strong> Name, contact information, and sensitive Astrological/Vastu Data (date, time, and place of birth) required for personalized consultations and reports.</ListItem>
                            <ListItem><strong>Technical & Usage Data:</strong> IP addresses, browser type, and pages visited to help us improve our digital platform.</ListItem>
                            <ListItem><strong>Payment Information:</strong> Our third-party payment processors collect necessary payment details. Rajshaili does not store your full credit card information.</ListItem>
                        </ul>
                    </section>

                    <section>
                        <SectionTitle icon={<Cog />} title="2. How We Use Your Information" />
                        <Paragraph>Your information is used to fulfill our mission with integrity and compassion. Key purposes include:</Paragraph>
                        <ul>
                            <ListItem>To provide educational services, process applications, and manage enrollment.</ListItem>
                            <ListItem>To deliver personalized consultations and generate accurate astrological reports.</ListItem>
                            <ListItem>To foster scholarly research (all data used is anonymized).</ListItem>
                            <ListItem>To communicate with our community via newsletters and updates (you can opt-out).</ListItem>
                        </ul>
                    </section>

                    <section>
                        <SectionTitle icon={<Share2 />} title="3. Data Sharing and Disclosure" />
                        <Paragraph>We do not sell or rent your personal data. Your information is shared only in limited, necessary circumstances:</Paragraph>
                        <ul>
                           <ListItem><strong>With Service Providers:</strong> With trusted vendors for services like payment processing and website hosting.</ListItem>
                           <ListItem><strong>For Legal Reasons:</strong> If required by law or in response to valid requests by public authorities.</ListItem>
                        </ul>
                    </section>
                    
                    <section>
                        <SectionTitle icon={<Shield />} title="4. Data Security" />
                        <Paragraph>We implement robust security measures, including Secure Socket Layer (SSL) encryption, to protect your sensitive personal and astrological data. We are committed to safeguarding your information, though no method of electronic storage is 100% secure.</Paragraph>
                    </section>
                    
                    <section>
                        <SectionTitle icon={<PersonStanding />} title="5. Children's Privacy" />
                        <Paragraph>Our academic programs and professional services are intended for adults. Our website is not directed at children under the age of 13, and we do not knowingly collect information from them.</Paragraph>
                    </section>
                    
                    <section>
                        <SectionTitle icon={<FilePenLine />} title="6. Changes to This Policy" />
                        <Paragraph>We may update this policy to reflect changes in our practices. We will notify you by posting the new policy on this page and updating the "Last updated" date.</Paragraph>
                    </section>

                    <section>
                        <SectionTitle icon={<Phone />} title="7. Contact Us" />
                         <Paragraph>If you have any questions about this Privacy Policy or our practices, please contact us at:</Paragraph>
                        <a href="mailto:privacy@rajshaili.institute" className="text-yellow-400 font-semibold hover:underline text-lg">
                            privacy@rajshaili.institute
                        </a>
                    </section>
                </main>
                
                <footer className="mt-12 pt-6 border-t border-blue-800/30 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Rajshaili: The Institute of Divine Knowledge. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
}
