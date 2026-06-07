import { Metadata } from "next";
import { getContent } from "@/lib/content";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Trinetra Eye Care Center",
  description: "Read the latest news, eye care tips, and updates from Trinetra Eye Care Center.",
};

export default async function BlogPage() {
  const content = await getContent("blog");
  return <BlogClient content={content} />;
}
