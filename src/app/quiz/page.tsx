"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Brain, Target, Flame, Trophy, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

export default function QuizDashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden p-10 md:p-16 border border-primary/20 bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4 tracking-tight">
            Test Your Knowledge Intelligently
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mb-8">
            Generate AI-powered quizzes instantly from your study materials and track your academic growth.
          </p>
          <Link href="/quiz/generate">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              <Plus className="w-4 h-4 mr-2" /> Generate New Quiz
            </Button>
          </Link>
        </div>
      </section>

      {/* Gamification / Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Target} title="Average Accuracy" value="82%" subtitle="+5% from last week" />
        <StatCard icon={Flame} title="Study Streak" value="12 Days" subtitle="You're on fire!" />
        <StatCard icon={Brain} title="Quizzes Taken" value="24" subtitle="Total completed" />
        <StatCard icon={Trophy} title="Total XP" value="4,250" subtitle="Rank: Scholar" />
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="md:col-span-2">
          <Card className="bg-card/40 border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-xl font-heading text-white">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#333', borderRadius: '8px' }}
                      itemStyle={{ color: '#4ade80' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4ade80" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#4ade80', strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#4ade80', stroke: '#09090b', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 font-heading">Recent Quizzes</h2>
          {[
            { title: "Neural Networks Basics", score: "90%", date: "Today" },
            { title: "Calculus I - Integrals", score: "75%", date: "Yesterday" },
            { title: "Physics: Thermodynamics", score: "88%", date: "Oct 12" },
          ].map((quiz, i) => (
            <Link key={i} href={`/quiz/results/${i}`}>
              <Card className="bg-card/40 hover:bg-card/80 transition-colors border-white/5 cursor-pointer group mb-3">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1 group-hover:text-primary transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-bold text-primary">{quiz.score}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle }: { icon: any; title: string; value: string; subtitle: string }) {
  return (
    <Card className="bg-card/40 border-white/5 overflow-hidden relative group">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24 text-primary" />
      </div>
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-xs text-primary/80">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
