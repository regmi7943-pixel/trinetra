"use server";

import { supabase as supabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function updateContent(page: string, key: string, value: string) {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // Ignored in server actions when session refreshing
        }
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabaseClient
    .from("site_content")
    .upsert(
      { page, key, value, updated_at: new Date().toISOString() },
      { onConflict: "page,key" }
    );

  if (error) {
    console.error("Error updating content:", error);
    return { success: false, error: error.message };
  }

  // Revalidate all paths since content could appear anywhere
  revalidatePath("/", "layout");

  return { success: true };
}
