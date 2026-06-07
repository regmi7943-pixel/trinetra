import { getContent } from "@/lib/content";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Manage Services | Trinetra Admin",
};

export default async function ServicesAdminPage() {
  const content = await getContent("global");
  const servicesListString = content.services_list || "[]";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
        <p className="text-white/60">
          Add, edit, or remove services offered by Trinetra Eye Care.
        </p>
      </div>

      <ServicesClient initialServicesString={servicesListString} />
    </div>
  );
}
