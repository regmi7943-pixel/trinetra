import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { AppointmentPopup } from "@/components/appointment-popup";
import { CurtainLoader } from "@/components/curtain-loader";
import { getContent } from "@/lib/content";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalContent = await getContent("global");

  return (
    <div className="flex flex-col min-h-screen">
      <CurtainLoader />
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer content={globalContent} />
      <WhatsAppFloat />
      <AppointmentPopup />
    </div>
  );
}
