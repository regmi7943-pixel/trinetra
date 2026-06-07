import { getContent } from "@/lib/content";
import DoctorClient from "./DoctorClient";

export const metadata = {
  title: "Doctor | Trinetra Eye Care",
  description: "Meet our dedicated doctor at Trinetra Eye Care.",
};

export default async function DoctorPage() {
  const content = await getContent("doctor");

  return <DoctorClient content={content} />;
}
