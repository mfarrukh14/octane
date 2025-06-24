import React, { useState } from 'react';

// Animated stars background component
const StarsBackground = () => {
    // Generate random stars
    const stars = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 2 + 1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.animationDelay}s`,
                        opacity: 0.6,
                    }}
                />
            ))}
        </div>
    );
};

const faqs = [
  {
    id: 1,
    question: 'What is Octane?',
    answer: "Octane is a revolutionary digital ecosystem designed to empower brands in Pakistan. It's a tailored platform that merges cutting-edge technology with market insights, meticulously customized for your brand."
  },
  {
    id: 2,
    question: 'How does Octane ensure data privacy and security for my customers?',
    answer: 'Octane ensures data privacy and security for the customer through the security measures we have in place. Our technology stack offers the best cybersecurity tools to ensure the security of customer data.'
  },
  {
    id: 3,
    question: 'How quickly can a brand onboard and start using Octane?',
    answer: 'It takes a brand 24 to 48 hours to onboard and start using octane.'
  },
  {
    id: 4,
    question: 'How and when do i get paid?',
    answer: 'Sellers receive instant payments directly into their bank accounts.'
  },
  {
    id: 5,
    question: "What's the cost for using Octane's warehousing and shipping services?",
    answer: "There's no extra charges for warehousing, Shipping, logistics or any inventory handling process. We make sure that after opting this model you are not stressing about extra payment deductions or anything, just sit back and enjoy the growth."
  },
  {
    id: 6,
    question: 'Do I have access to backend settings, reports, and analytics?',
    answer: 'Yes, with Octane, you have full access to backend settings, detailed reports, and advanced analytics through the vendor portal. This gives you complete control over managing your brand, tracking performance, and making data-driven decisions.'
  }
];

export default function Section11() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-tl from-black via-black to-teal-900">
      {/* Animated Stars Background */}
      <StarsBackground />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about Octane and how it can transform your business
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="group"
            >
              {/* Glassmorphic Container */}
              <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between group-hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-lg md:text-xl font-medium text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-green-400 transition-transform duration-300 ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
