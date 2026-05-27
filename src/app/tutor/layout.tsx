import { AppSidebar } from "@/components/layout/AppSidebar";

export default function TutorLayout({
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
