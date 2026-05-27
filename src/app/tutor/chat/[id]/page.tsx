"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, BrainCircuit, Sparkles, RefreshCcw, 
  Copy, CheckCheck, Lightbulb, FileText,
  List, AlertCircle, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const MOCK_MESSAGES = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Academic Mentor. I've processed your uploaded materials on **Neural Networks**.\n\nWhat would you like to learn today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    citations: []
  },
  {
    id: "2",
    role: "user",
    content: "Can you explain backpropagation simply?",
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: "3",
    role: "assistant",
    content: "Absolutely. Think of **backpropagation** like a student taking a practice test.\n\n1. The student answers questions (forward pass).\n2. The teacher grades the test and points out mistakes (calculating loss).\n3. The student reviews the mistakes and adjusts their understanding so they do better next time (backward pass).\n\nIn neural networks, backpropagation calculates the gradient of the loss function and updates the weights in the network to minimize errors.",
    timestamp: new Date(Date.now() - 3490000).toISOString(),
    citations: ["Lecture 4, Slide 12", "Chapter 3, Page 45"]
  }
];

const SUGGESTIONS = [
  { icon: Lightbulb, label: "Explain Simply" },
  { icon: FileText, label: "Summarize Topic" },
  { icon: List, label: "Generate Notes" },
  { icon: AlertCircle, label: "Common Mistakes" },
];

export default function ChatPage() {
  const params = useParams();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const newUserMsg = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Mock streaming response
    setTimeout(() => {
      setIsTyping(false);
      const newAssistantMsg = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${text}". Based on your course materials, here is what you need to know. This is a mocked streaming response to demonstrate the UI capabilities.`,
        timestamp: new Date().toISOString(),
        citations: ["Slide 14"]
      };
      setMessages(prev => [...prev, newAssistantMsg]);
    }, 1500);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border glass-green flex items-center px-6 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-white font-heading text-sm md:text-base">Understanding Neural Networks</h1>
            <p className="text-xs text-primary">Context: Lecture 4, Chapter 3</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${
                msg.role === "user" ? "bg-secondary" : "bg-primary/20"
              }`}>
                {msg.role === "user" ? <span className="text-xs font-bold">ME</span> : <BrainCircuit className="w-4 h-4 text-primary" />}
              </div>

              <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-secondary/50 text-white rounded-tr-sm" 
                    : "glass border-white/5 rounded-tl-sm"
                }`}>
                  <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 max-w-none text-sm md:text-base">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Message Actions & Citations */}
                <div className="flex items-center gap-3 mt-2 px-1">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {msg.role === "assistant" && (
                    <>
                      <button 
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? <CheckCheck className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button className="text-muted-foreground hover:text-white transition-colors">
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                      
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="flex gap-2 ml-2">
                          {msg.citations.map((cite, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 cursor-help" title="Source Material">
                              {cite}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4 text-primary" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/80 backdrop-blur-xl border-t border-border shrink-0">
        <div className="max-w-3xl mx-auto">
          {/* Smart Study Buttons */}
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-3 scrollbar-hide hide-scrollbar">
            {SUGGESTIONS.map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="rounded-full bg-card/50 border-white/5 hover:bg-primary/10 hover:border-primary/30 text-xs shrink-0"
                onClick={() => handleSend(`${suggestion.label} `)}
              >
                <suggestion.icon className="w-3 h-3 mr-1.5 text-primary" />
                {suggestion.label}
              </Button>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-emerald-400/50 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
            <div className="relative flex items-end gap-2 bg-card border border-white/10 rounded-2xl p-2 focus-within:border-primary/50 transition-colors">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask your AI tutor..."
                className="min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 p-3 shadow-none scrollbar-hide text-base"
                rows={1}
              />
              <Button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                size="icon" 
                className="h-10 w-10 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mb-0.5 mr-0.5"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">AI can make mistakes. Check your course materials for accuracy.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
