import { Metadata } from "next";
import { getContent } from "@/lib/content";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Patient Reviews | Trinetra Eye Care Center",
  description: "Read reviews and testimonials from our satisfied patients at Trinetra Eye Care Center in Pokhara.",
};

export default async function ReviewsPage() {
  const content = await getContent("reviews");
  return <ReviewsClient content={content} />;
}
