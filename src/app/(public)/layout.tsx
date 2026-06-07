import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { AppointmentPopup } from "@/components/appointment-popup";
import { CurtainLoader } from "@/components/curtain-loader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <CurtainLoader />
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <AppointmentPopup />
    </div>
  );
}
