"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-900/20 rounded-full blur-[128px] opacity-40 mix-blend-screen pointer-events-none" />

      <main className="z-10 flex flex-col items-center px-4 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full glass-green text-sm text-primary font-medium"
        >
          <Sparkles className="w-4 h-4" />
          <span>Welcome to the Future of Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-heading"
        >
          Elevate Your Mind with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
            RESNOR
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl"
        >
          Your personalized AI academic mentor. Master difficult concepts, generate quizzes from your materials, and track your learning progress seamlessly.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* AI Tutor Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Link href="/tutor" className="block h-full group">
              <div className="h-full glass p-8 rounded-3xl transition-all duration-300 group-hover:bg-card/80 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_oklch(0.65_0.25_150_/_15%)] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BrainCircuit className="w-24 h-24 text-primary" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 font-heading">AI Tutor</h2>
                <p className="text-muted-foreground mb-6">
                  Chat with your study materials. Ask questions, simplify topics, and get step-by-step explanations from your uploaded PDFs and lecture notes.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                  Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* AI Quiz Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/quiz" className="block h-full group">
              <div className="h-full glass p-8 rounded-3xl transition-all duration-300 group-hover:bg-card/80 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_oklch(0.65_0.25_150_/_15%)] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen className="w-24 h-24 text-primary" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 font-heading">AI Quiz Generator</h2>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge intelligently. Automatically generate MCQs and subjective quizzes from your notes and track your academic growth.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                  Generate Quiz <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
