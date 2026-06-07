import { Metadata } from "next";
import { getContent } from "@/lib/content";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Home | Trinetra Eye Care Center",
  description: "Trinetra Eye Care Center offers precision vision and modern care in Pokhara. Top rated optometrist Bijay Regmi.",
};

export default async function HomePage() {
  const content = await getContent("home");
  return <HomeClient content={content} />;
}
