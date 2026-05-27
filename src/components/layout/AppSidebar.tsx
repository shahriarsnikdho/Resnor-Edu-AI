"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  BookOpen,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Tutor", href: "/tutor", icon: BrainCircuit },
  { name: "AI Quiz", href: "/quiz", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-border">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xl font-bold font-heading tracking-tight text-white">RESNOR</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass p-4 rounded-xl mb-4 text-sm">
          <p className="font-semibold text-white mb-1">Pro Plan</p>
          <p className="text-muted-foreground text-xs mb-3">You have 120 AI requests left.</p>
          <div className="w-full bg-background rounded-full h-1.5 mb-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border glass flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <span className="font-bold font-heading">RESNOR</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-border bg-background">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:pl-64 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
