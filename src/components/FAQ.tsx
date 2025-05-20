import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "Is this course suitable for complete beginners?",
      answer: "Absolutely! The course is designed to cater to all levels, from complete beginners to intermediate investors. We start with the basics and gradually move to more advanced concepts."
    },
    {
      question: "Will I get lifetime access to the course material?",
      answer: "Yes, once you enroll, you get lifetime access to all course materials, including any future updates and improvements we make to the content."
    },
    {
      question: "How is this different from free content available online?",
      answer: "While free content is valuable, this course provides structured, comprehensive knowledge with practical insights from industry experience. You'll learn proven strategies and get exclusive tools that aren't available elsewhere."
    },
    {
      question: "Do I need to have a lot of money to start investing after this course?",
      answer: "No, you can start investing with as little as ₹500 per month through SIPs. The course will teach you how to make the most of your investments, regardless of the amount."
    },
    {
      question: "Will there be any support after the course?",
      answer: "Yes, you'll get access to all the bonus materials and tools. Plus, you can always revisit the course content to refresh your knowledge."
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer: "We offer a 7-day, no-questions-asked money-back guarantee. If you're not satisfied with the course content, you can request a full refund within 7 days of purchase."
    }
  ];

  return (
    <div className="mt-24 bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-left font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};