// src/components/PrivacyPolicy.jsx

import React from 'react';

// A reusable component for section titles to keep the code clean
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-8 mb-4">
    {children}
  </h2>
);

// A reusable component for paragraphs for consistent styling
const Paragraph = ({ children }) => (
  <p className="text-gray-700 leading-relaxed mb-4">
    {children}
  </p>
);

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen ">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10 my-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-2">
            Last updated: September 19, 2025
          </p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-lg w-full ">
          <Paragraph>
            Welcome to Rajshaili: The Institute of Divine Knowledge ("Rajshaili," "we," "our," or "us"). As a sacred and scholarly sanctuary, we are deeply committed to protecting the privacy and sanctity of the information entrusted to us by our students, clients, and community members. This Privacy Policy explains how we collect, use, and safeguard your information across our educational programs, consultations, research activities, and website.
          </Paragraph>

          <SectionTitle>1. Information We Collect</SectionTitle>
          <Paragraph>
            To provide our holistic services, we collect information relevant to your engagement with us. The types of information may include:
          </Paragraph>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>
              <strong>Student & Applicant Information:</strong> Name, email address, contact details, and educational background when you apply for or enroll in our Certificate, Diploma, and other academic programs.
            </li>
            <li>
              <strong>Consultation & Client Data:</strong> Name, contact information, and sensitive Astrological/Vastu Data (date, time, and place of birth) required for personalized consultations and reports.
            </li>
            <li>
              <strong>Research & Community Data:</strong> Information you provide when participating in workshops, events, or research fellowships.
            </li>
            <li>
              <strong>Usage Data:</strong> Standard technical information when you visit our website, such as IP address, browser type, and pages visited, to help us improve our digital platform.
            </li>
            <li>
              <strong>Payment Information:</strong> Our third-party payment processors collect necessary payment details for services and tuition. Rajshaili does not store your full credit card information.
            </li>
          </ul>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <Paragraph>
            Your information is used to fulfill our mission with integrity and compassion. Key purposes include:
          </Paragraph>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>To Provide Educational Services: To process applications, manage enrollment, deliver course content, and support your academic journey.</li>
            <li>To Deliver Personalized Consultations: To generate accurate birth charts, horoscopes, Vastu analyses, and mental health guidance.</li>
            <li>To Foster Scholarly Research: To conduct studies and publish scholarly works. All personal data used for research is anonymized to protect your identity.</li>
            <li>To Communicate with Our Community: To send newsletters, information about upcoming workshops, and updates relevant to our students and alumni network. You may opt out of promotional communications at any time.</li>
            <li>To Improve Our Offerings: To analyze how our services are used and enhance the experience for our entire community.</li>
          </ul>

          <SectionTitle>3. Data Sharing and Disclosure</SectionTitle>
          <Paragraph>
            We do not sell or rent your personal data. Your information is shared only in limited, necessary circumstances:
          </Paragraph>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>
              <strong>With Service Providers:</strong> With trusted third-party vendors for services like payment processing, website hosting, and email delivery, who are bound by confidentiality obligations.
            </li>
            <li>
              <strong>For Scholarly Collaboration:</strong> We may share anonymized or aggregated data with partner institutions or for publication in our academic journal.
            </li>
            <li>
              <strong>For Legal Reasons:</strong> If required by law or in response to valid requests by public authorities.
            </li>
          </ul>


          <SectionTitle>4. Data Security</SectionTitle>
          <Paragraph>
            We implement robust security measures, including Secure Socket Layer (SSL) encryption, to protect your sensitive personal and astrological data. We are committed to safeguarding your information, though no method of electronic storage is 100% secure.
          </Paragraph>

          <SectionTitle>5. Children's Privacy</SectionTitle>
          <Paragraph>
            Our academic programs and professional services are intended for adults (typically 18 years and older). Our website is not directed at children under the age of 13, and we do not knowingly collect information from them.
          </Paragraph>

          <SectionTitle>6. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update this policy to reflect changes in our practices. We will notify you by posting the new policy on this page and updating the "Last updated" date. We encourage you to review it periodically.
          </Paragraph>

          <SectionTitle>7. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions about this Privacy Policy or our practices, please contact us at:
            <br />
            <a href="mailto:privacy@rajshaili.institute" className="text-blue-600 hover:underline">
              privacy@rajshaili.institute
            </a>
          </Paragraph>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;