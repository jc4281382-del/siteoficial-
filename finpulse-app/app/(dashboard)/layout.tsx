import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-container-margin pt-6 safe-bottom">
        {children}
      </main>
      <BottomNavBar />
    </>
  );
}
