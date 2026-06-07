import { getContent } from "@/lib/content";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Trinetra Eye Care",
  description: "Learn more about Trinetra Eye Care and our dedicated team.",
};

export default async function AboutPage() {
  const content = await getContent("about");

  return <AboutClient content={content} />;
}
