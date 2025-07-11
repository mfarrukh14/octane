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
    answer: "Octane is a revolutionary digital ecosystem built to empower brands in Pakistan. It’s a tailored platform that blends cutting-edge technology with deep market insights—meticulously customized to support your brand’s growth."
  },
  {
    id: 2,
    question: 'How does Octane ensure data privacy and security for my customers?',
    answer: 'Octane prioritizes data privacy and security through robust, enterprise-grade measures. Our technology stack is equipped with leading cybersecurity tools to protect customer data at every touchpoint.'
  },
  {
    id: 3,
    question: 'How quickly can a brand onboard and start using Octane?',
    answer: 'Brands can be fully onboarded and operational within 24 to 48 hours. Our streamlined process ensures a fast, hassle-free start—so you can begin selling without delay.'
  },
  {
    id: 4,
    question: 'How and when do i get paid?',
    answer: 'Sellers receive instant payments directly into their bank accounts. There are no delays or complicated payout schedules—just fast, transparent transactions.'
  },
  {
    id: 5,
    question: "What's the cost for using Octane's warehousing and shipping services?",
    answer: "There are no extra charges for warehousing, shipping, logistics, or inventory handling.With Octane, you don’t need to worry about hidden fees or deductions—just focus on growing your brand."
  },
  {
    id: 6,
    question: 'Do I have access to backend settings, reports, and analytics?',
    answer: 'Yes. Octane provides full access to backend controls, real-time reports, and advanced analytics through your dedicated vendor portal. You’ll have complete visibility and control to manage your brand and make data-driven decisions with confidence.'
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
