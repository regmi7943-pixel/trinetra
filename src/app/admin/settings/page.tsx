import { getContent } from "@/lib/content";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const content = await getContent("global");

  return <SettingsClient initialContent={content} />;
}
