"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Message from ${name || "Zyrocrafts website"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? `\n${email}` : ""}`
    );
    window.location.href = `mailto:info@zyrocrafts.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Heading + Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-tight">
              Need support?<br />
              Contact our team!
            </h1>
            <p className="mt-6 text-ink/60 text-base sm:text-lg leading-relaxed">
              Reach Out With Your Club Questions Or For Details About Our Programs. We&apos;re Glad To Help You Join Zyrocrafts.
            </p>

            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#2A1507]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-ink/70 leading-relaxed pt-2">
                  Defence Road, Sialkot,
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#2A1507]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a
                  href="mailto:info@zyrocrafts.com"
                  className="text-ink/70 hover:text-tan transition-colors pt-2"
                >
                  info@zyrocrafts.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EDE3D5] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#2A1507]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a
                  href="https://wa.me/923137521218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/70 hover:text-tan transition-colors pt-2"
                >
                  +92 313 7521218
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-saddle/10 rounded-lg p-8 sm:p-12 text-center h-full flex flex-col items-center justify-center">
                <p className="font-display text-xl text-ink">
                  Thank you for your message.
                </p>
                <p className="mt-2 text-ink/60">
                  We&apos;ll get back to you within a day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-ink/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-ink/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-ink/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-saddle/10 border border-saddle/30 rounded text-ink placeholder:text-ink/40 focus:outline-none focus:border-tan transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#E2D9C9] text-[#2A1507] font-semibold rounded-full hover:bg-[#C08552] transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
