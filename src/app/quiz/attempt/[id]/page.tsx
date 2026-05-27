"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertCircle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "In a neural network, what is the primary purpose of an activation function?",
    options: [
      "To calculate the final loss of the model",
      "To introduce non-linearity into the output of a neuron",
      "To normalize the input data",
      "To randomly drop out neurons during training"
    ],
    correct: 1
  },
  {
    id: 2,
    text: "Which algorithm is used to calculate gradients in a feedforward neural network?",
    options: [
      "K-Means Clustering",
      "Principal Component Analysis",
      "Backpropagation",
      "Support Vector Machines"
    ],
    correct: 2
  },
  {
    id: 3,
    text: "What problem does the ReLU activation function help mitigate compared to Sigmoid?",
    options: [
      "Overfitting",
      "Vanishing gradient problem",
      "High computational cost",
      "Exploding gradients"
    ],
    correct: 1
  }
];

export default function QuizAttemptPage() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins

  const question = MOCK_QUESTIONS[currentIdx];
  const progress = ((currentIdx) / MOCK_QUESTIONS.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    
    if (idx === question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finish Quiz
      router.push("/quiz/results/123");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* Header: Progress and Timer */}
        <div className="glass p-4 rounded-2xl mb-8 flex items-center justify-between border-white/5">
          <div className="flex-1 mr-8">
            <div className="flex justify-between text-sm mb-2 text-muted-foreground font-medium">
              <span>Question {currentIdx + 1} of {MOCK_QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 60 ? 'text-destructive' : 'text-white'}`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white leading-tight">
              {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = isAnswered && idx === question.correct;
                const isWrongSelected = isAnswered && isSelected && idx !== question.correct;
                
                let btnStyle = "border-white/10 bg-card/40 hover:bg-card hover:border-primary/50 text-white";
                if (isAnswered) {
                  if (isCorrect) btnStyle = "border-primary bg-primary/20 text-white";
                  else if (isWrongSelected) btnStyle = "border-destructive bg-destructive/20 text-white";
                  else btnStyle = "border-white/5 bg-background/50 text-muted-foreground opacity-50";
                } else if (isSelected) {
                  btnStyle = "border-primary bg-primary/10 text-white shadow-[0_0_15px_oklch(0.65_0.25_150_/_20%)]";
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex justify-between items-center ${btnStyle}`}
                  >
                    <span className="text-base md:text-lg">{opt}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    {isWrongSelected && <XCircle className="w-5 h-5 text-destructive" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button Footer */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-end"
            >
              <Button size="lg" onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 rounded-full">
                {currentIdx < MOCK_QUESTIONS.length - 1 ? (
                  <>Next Question <ArrowRight className="w-4 h-4 ml-2" /></>
                ) : (
                  "Finish Quiz"
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
