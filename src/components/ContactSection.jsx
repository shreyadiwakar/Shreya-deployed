import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Internship / Full-Time',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#fbcfe8', '#bae6fd', '#bbf7d0', '#fef08a', '#ddd6fe'],
    });
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#f472b6', '#4ade80', '#facc15'],
      });
    }, 600);
  };

  return (
    <section id="contact-section" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-pink-600" />
          Get In Touch
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Let's Build Something <span className="text-pink-600">Extraordinary</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Whether you're looking for a software engineering intern, discussing an open-source project, or just want to chat about CS systems, my inbox is always open!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left Column: Direct Info & Socials in Soft Pastels */}
        <div className="lg:col-span-5 space-y-5">
          {/* Email & Phone Card with Copy */}
          <div className="p-6 rounded-3xl bg-pink-50/90 border-2 border-pink-200/90 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-pink-700 uppercase tracking-wider">
                Direct Inquiries
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">Contact Shreya</h4>
              <p className="text-xs text-slate-600 mt-1">
                Fastest response for software internships and projects.
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white border border-pink-200">
              <span className="text-xs sm:text-sm font-mono text-slate-800 truncate select-all">
                {profile.email}
              </span>
              <button
                onClick={copyEmail}
                className="px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white border border-pink-200">
              <span className="text-xs sm:text-sm font-mono text-slate-800 truncate select-all">
                +91-8851493754
              </span>
              <a
                href="tel:+918851493754"
                className="px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-semibold transition-colors shrink-0"
              >
                Call
              </a>
            </div>
          </div>

          {/* Connect on Networks Card */}
          <div className="p-6 rounded-3xl bg-sky-50/90 border-2 border-sky-200/90 shadow-xs space-y-3">
            <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
              Developer Profiles
            </span>
            <h4 className="text-lg font-bold text-slate-900">Explore My Repos & Activity</h4>

            <div className="space-y-2 pt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-sky-100/50 border border-sky-200 transition-colors text-slate-800 text-sm font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-700" />
                  <span>GitHub (@shreyadiwakar)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-sky-100/50 border border-sky-200 transition-colors text-slate-800 text-sm font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-sky-600" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              {profile.leetcode && (
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-amber-100/50 border border-amber-200 transition-colors text-slate-800 text-sm font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold font-mono text-amber-600">[LC]</span>
                    <span>LeetCode Rank (Top 5%)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out, <strong>{formState.name}</strong>. I have received your note and will reply to <strong>{formState.email}</strong> shortly!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', email: '', topic: 'Internship / Full-Time', message: '' });
                }}
                className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Drop Me a Note
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Fill in the details below to start a conversation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Conversation Topic</label>
                <select
                  value={formState.topic}
                  onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-400 outline-none text-sm"
                >
                  <option value="Internship / Full-Time">Software Internship / Opportunity</option>
                  <option value="Open Source Collaboration">Open Source / Technical Collaboration</option>
                  <option value="Mentorship & Tech Talk">Tech Chat & Networking</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your team, problem, or idea..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-2xl font-bold text-sm text-slate-900 bg-gradient-to-r from-yellow-200 via-pink-200 to-sky-200 hover:from-yellow-300 hover:to-sky-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 border border-pink-200"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-pink-600" />
                    <span>Send Message to Shreya</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
