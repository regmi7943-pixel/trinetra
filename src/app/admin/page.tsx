import { getAllContent } from "@/lib/content";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const allContent = await getAllContent();
  
  let totalServices = 0;
  let totalEyewear = 0;

  try {
    const servicesStr = allContent["services"]?.["services_list"];
    if (servicesStr) {
      const parsed = JSON.parse(servicesStr);
      if (Array.isArray(parsed)) totalServices = parsed.length;
    }
  } catch (e) {
    console.error("Failed to parse services_list", e);
  }

  try {
    const eyewearStr = allContent["eyewear"]?.["eyewear_list"];
    if (eyewearStr) {
      const parsed = JSON.parse(eyewearStr);
      if (Array.isArray(parsed)) totalEyewear = parsed.length;
    }
  } catch (e) {
    console.error("Failed to parse eyewear_list", e);
  }

  return <AdminDashboardClient totalServices={totalServices} totalEyewear={totalEyewear} />;
}
