"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft, BrainCircuit, CheckCircle2, XCircle, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const RESULTS_DATA = {
  score: 8,
  total: 10,
  percentage: 80,
  xpEarned: 120,
  weakTopics: ["Activation Functions", "Optimization Algorithms"],
  answers: [
    {
      id: 1,
      question: "In a neural network, what is the primary purpose of an activation function?",
      userAnswer: "To introduce non-linearity into the output of a neuron",
      correctAnswer: "To introduce non-linearity into the output of a neuron",
      isCorrect: true,
      topic: "Network Basics"
    },
    {
      id: 2,
      question: "Which algorithm is used to calculate gradients in a feedforward neural network?",
      userAnswer: "Support Vector Machines",
      correctAnswer: "Backpropagation",
      isCorrect: false,
      topic: "Optimization Algorithms"
    }
  ]
};

export default function QuizResultsPage() {
  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [selectedMistake, setSelectedMistake] = useState<any>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handleExplainMistake = (answer: any) => {
    setSelectedMistake(answer);
    setExplainModalOpen(true);
    setIsExplaining(true);
    setExplanation("");

    // Mock AI Explanation generation
    setTimeout(() => {
      setIsExplaining(false);
      setExplanation(`You chose **${answer.userAnswer}**, which is incorrect.\n\n**Support Vector Machines (SVM)** are a completely different class of machine learning models used for classification and regression.\n\n**Backpropagation** is the correct answer because it is the specific mathematical algorithm used to efficiently compute the gradient of the loss function with respect to the weights of the network, which is required for training neural networks.`);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <Link href="/quiz" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      {/* Score Header */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-3xl border-primary/20 text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">Quiz Completed!</h1>
          <p className="text-muted-foreground text-lg mb-8">You scored {RESULTS_DATA.percentage}% on Neural Networks Basics</p>
          
          <div className="flex gap-8 justify-center mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{RESULTS_DATA.score}<span className="text-muted-foreground text-lg">/{RESULTS_DATA.total}</span></p>
              <p className="text-xs text-primary font-medium uppercase tracking-wider">Correct</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">+{RESULTS_DATA.xpEarned}</p>
              <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">XP Earned</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link href="/quiz/generate">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <RefreshCcw className="w-4 h-4 mr-2" /> Retake Quiz
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Detailed Review */}
      <section>
        <h2 className="text-2xl font-bold text-white font-heading mb-6">Detailed Review</h2>
        <div className="space-y-4">
          {RESULTS_DATA.answers.map((ans, idx) => (
            <Card key={ans.id} className="bg-card/40 border-white/5 overflow-hidden">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="shrink-0 pt-1">
                  {ans.isCorrect ? (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-4">{ans.question}</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Your Answer: </span>
                      <span className={ans.isCorrect ? "text-primary font-medium" : "text-destructive font-medium"}>{ans.userAnswer}</span>
                    </p>
                    {!ans.isCorrect && (
                      <p>
                        <span className="text-muted-foreground">Correct Answer: </span>
                        <span className="text-primary font-medium">{ans.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                </div>
                {!ans.isCorrect && (
                  <div className="shrink-0 flex items-end md:items-start mt-4 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
                      onClick={() => handleExplainMistake(ans)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" /> Explain Mistake
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Explain Mistake Dialog */}
      <Dialog open={explainModalOpen} onOpenChange={setExplainModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-heading text-primary">
              <BrainCircuit className="w-5 h-5" /> AI Explanation
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Understanding why you got it wrong.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[200px] p-4 glass rounded-xl border-white/5 mt-4">
            {isExplaining ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
                <BrainCircuit className="w-8 h-8 animate-pulse text-primary" />
                <p>Analyzing your mistake...</p>
              </div>
            ) : (
              <div className="prose prose-invert prose-p:leading-relaxed max-w-none text-sm whitespace-pre-wrap">
                {explanation}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
