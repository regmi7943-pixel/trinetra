import { getContent } from "@/lib/content";
import EyewearClient from "./EyewearClient";

export const metadata = {
  title: "Manage Eyewear | Trinetra Admin",
};

export default async function EyewearAdminPage() {
  const content = await getContent("global");
  const eyewearListString = content.eyewear_list || "[]";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Eyewear</h1>
        <p className="text-white/60">
          Add, edit, or remove eyewear products (Frames, Sunglasses, Contact Lenses).
        </p>
      </div>

      <EyewearClient initialEyewearList={eyewearListString} />
    </div>
  );
}
