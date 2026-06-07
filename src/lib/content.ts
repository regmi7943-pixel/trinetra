import { supabase } from "./supabase";

export async function getContent(page: string): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("page", page);

  if (error) {
    console.error("Error fetching content:", error);
    return {};
  }

  const content: Record<string, string> = {};
  data?.forEach((row) => {
    content[row.key] = row.value || "";
  });

  return content;
}

export async function getAllContent(): Promise<Record<string, Record<string, string>>> {
  const { data, error } = await supabase
    .from("site_content")
    .select("page, key, value");

  if (error) {
    console.error("Error fetching all content:", error);
    return {};
  }

  const content: Record<string, Record<string, string>> = {};
  data?.forEach((row) => {
    if (!content[row.page]) {
      content[row.page] = {};
    }
    content[row.page][row.key] = row.value || "";
  });

  return content;
}
