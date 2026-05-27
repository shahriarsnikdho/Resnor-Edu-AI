"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, Settings2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function GenerateQuizPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState("10");

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock API Call delay
    setTimeout(() => {
      router.push("/quiz/attempt/123");
    }, 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Generate New Quiz</h1>
        <p className="text-muted-foreground">Configure your AI-generated assessment below.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Source Material Selection */}
        <Card className="bg-card/40 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-heading">
              <Upload className="w-5 h-5 mr-2 text-primary" /> Source Material
            </CardTitle>
            <CardDescription>Select documents to generate questions from.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-white">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX (Max 50MB)</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/40 px-2 text-muted-foreground">Or use recent</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/10 cursor-pointer">
                <FileText className="w-5 h-5 text-primary" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">Neural_Networks_Lec4.pdf</p>
                  <p className="text-xs text-muted-foreground">Uploaded yesterday</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-background" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Configuration */}
        <Card className="bg-card/40 border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-heading">
              <Settings2 className="w-5 h-5 mr-2 text-primary" /> Configuration
            </CardTitle>
            <CardDescription>Set the parameters for your assessment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Question Count</label>
              <div className="flex gap-2">
                {["5", "10", "20", "50"].map((num) => (
                  <Button
                    key={num}
                    variant={count === num ? "default" : "outline"}
                    className={count === num ? "bg-primary text-primary-foreground" : "border-white/10 bg-transparent text-muted-foreground"}
                    onClick={() => setCount(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">Difficulty Level</label>
              <div className="flex gap-2">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    className={difficulty === level ? "bg-primary text-primary-foreground" : "border-white/10 bg-transparent text-muted-foreground"}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Topic Focus (Optional)</label>
              <Input 
                placeholder="e.g. Backpropagation, Activation functions" 
                className="bg-background/50 border-white/10"
              />
            </div>

            <Button 
              className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Magic...
                </>
              ) : (
                "Generate Quiz Now"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
