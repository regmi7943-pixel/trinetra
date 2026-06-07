import { getContent } from "@/lib/content";
import EyewearClient from "./EyewearClient";

export default async function EyewearPage() {
  const content = await getContent("eyewear");
  const globalContent = await getContent("global");
  const initialEyewearList = globalContent?.eyewear_list || "[]";
  return <EyewearClient content={content} initialEyewearList={initialEyewearList} />;
}
