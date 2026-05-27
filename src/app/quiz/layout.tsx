import { AppSidebar } from "@/components/layout/AppSidebar";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppSidebar>
      {children}
    </AppSidebar>
  );
}
