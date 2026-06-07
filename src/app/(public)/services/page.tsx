import { Metadata } from "next";
import { getContent } from "@/lib/content";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Trinetra Eye Care Center",
  description: "Comprehensive eye exams, computerized power checks, optical sales, and more at Trinetra Eye Care Center.",
};

export default async function ServicesPage() {
  const content = await getContent("services");
  return <ServicesClient content={content} />;
}
