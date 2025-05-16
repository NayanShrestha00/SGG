import React, { useState } from "react";
import { motion } from "framer-motion";

const Help = () => {
    const faqs = [
        {
            question: "How do I list my property?",
            answer: "To list your property, navigate to the 'Sell Property' section in the main menu, complete the required details, and submit your listing for review."
        },
        {
            question: "How long does it take for my property to be approved?",
            answer: "Our verification process generally takes 2-3 business days to ensure the accuracy and authenticity of each listing before it goes live."
        },
        {
            question: "Can I edit my property listing after submission?",
            answer: "Yes, you may request modifications to your listing by reaching out to our support team with the necessary updates."
        },
        {
            question: "What documents are required for listing a property?",
            answer: "To list a property, you must provide proof of ownership, a valid government-issued identification document, and recent high-quality property photographs."
        },
        {
            question: "Do you offer assistance with legal documentation?",
            answer: "Yes, our team of legal experts is available to guide you through the necessary documentation to facilitate a seamless transaction."
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="max-w-4xl mx-auto p-6 lg:pt-48 pt-32">
            <h1 className="text-3xl font-bold text-center mb-6">Help & Support</h1>

            {/* FAQ Section */}
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white shadow-md">
                        <button
                            className="flex justify-between w-full text-left text-lg font-semibold focus:outline-none"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            <span>{openIndex === index ? "▲" : "▼"}</span>
                        </button>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Contact Support */}
            <div className="mt-8 p-6 border rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
                <p className="text-gray-600 mb-4">Contact our support team for further assistance.</p>
                <a
                    href="mailto:gharghaderisulav@gmail.com"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-700 transition-all duration-300"
                >
                    Contact Support
                </a>
            </div>
        </div>
    );
};

export default Help;
