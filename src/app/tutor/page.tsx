"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Upload, MessageSquare, Plus, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TutorPage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-green p-10 md:p-16 text-center border border-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4 tracking-tight">
            Your Personalized AI Academic Mentor
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-8">
            Ask questions, understand concepts, and learn directly from your university course materials. Upload slides or notes to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tutor/chat/new">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <Plus className="w-4 h-4 mr-2" /> Start Learning
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full border-primary/50 text-primary hover:bg-primary/10 px-8">
              <Upload className="w-4 h-4 mr-2" /> Upload Materials
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Cards (Student Personalization) */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-6 font-heading flex items-center">
          <SparkleIcon /> Your Study Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Study Streak" value="5 Days" subtitle="Consistent Learner" />
          <StatCard title="Strongest Subject" value="Neural Networks" subtitle="Based on AI chats" />
          <StatCard title="Weakest Topic" value="Backpropagation" subtitle="Needs review" />
          <StatCard title="AI Interactions" value="128" subtitle="Total questions asked" />
        </div>
      </section>

      {/* Recent Chats & Uploads */}
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-6 font-heading flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-primary" /> Recent Chats
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/tutor/chat/${i}`}>
                <Card className="bg-card/40 hover:bg-card/80 transition-colors border-white/5 cursor-pointer group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1 group-hover:text-primary transition-colors">
                        Understanding Transformer Architecture
                      </h3>
                      <p className="text-xs text-muted-foreground">Yesterday • 14 messages</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-6 font-heading flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" /> Course Materials
          </h2>
          
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isHovering ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mx-auto mb-4 border border-white/5">
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">Upload New Material</h3>
            <p className="text-xs text-muted-foreground mb-4">PDF, PPTX, DOCX up to 50MB</p>
            <Button variant="secondary" size="sm" className="rounded-full">
              Browse Files
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card className="bg-card/40 border-white/5">
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-[10px] text-primary/80">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function SparkleIcon() {
  return (
    <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
