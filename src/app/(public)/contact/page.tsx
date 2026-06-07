import { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Trinetra Eye Care Center",
  description: "Get in touch with Trinetra Eye Care Center in Pokhara. Find our location, opening hours, and contact details.",
};

export default async function ContactPage() {
  const content = await getContent("contact");
  return <ContactClient content={content} />;
}
