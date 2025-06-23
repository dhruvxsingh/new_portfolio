// components/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Fix the TypeScript issue by using a different interface name
interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/dhruvxsingh/', icon: 'fab fa-github' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/dhruvxsingh', icon: 'fas fa-code' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dhruv-kumar-singh-031363289/', icon: 'fab fa-linkedin-in' },
  { name: 'Gmail', url: 'mailto:dhruv.competent@gmail.com', icon: 'fas fa-envelope' },
  { name: 'GFG', url: 'https://www.geeksforgeeks.org/user/dhruvxsingh/', icon: 'fas fa-laptop-code' }
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize EmailJS with your public key from env
  useState(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS with env variables
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'dhruv.competent@gmail.com', // Add this if your template needs it
        }
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id = "contact" className="min-h-screen relative">
      <div className="container mx-auto px-6 py-28 pb-0">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-silver-shiny">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Feel free to drop your message and I will get back to you soon!
            </p>
            <p className="text-gray-gradient">
              Whether you have a question, want to collaborate, or just want to say hi, 
              I'd love to hear from you. Fill out the form and I'll respond as quickly as possible.
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-silver-shiny transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-silver-shiny transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-silver-shiny transition-colors"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-silver-shiny transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-silver-shiny text-gray-400 font-semibold rounded-lg hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center"
                >
                  Failed to send message. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Social Links Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-md border-t border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-2">
            {/* Social Links */}
            <div className="flex items-center gap-10">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-silver-shiny transition-colors duration-200"
                  aria-label={link.name}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </motion.a>
              ))}
            </div>

            {/* Made with love text */}
            <div className="text-gray-400 text-sm">
              Made and designed with <span className="text-red-500">♥</span> by Dhruv
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;