"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createFlock(formData: FormData) {
  const supabase = await createClient();

  const batch_name = formData.get("batch_name") as string;
  const flock_type = formData.get("flock_type") as string;
  const initial_count = parseInt(formData.get("initial_count") as string, 10);
  const arrival_date = formData.get("arrival_date") as string;

  const { error } = await supabase.from("flocks").insert({
    batch_name,
    flock_type,
    initial_count,
    current_count: initial_count,
    arrival_date,
    status: "active",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/flocks");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getActiveFlocks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("flocks")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching active flocks:", error);
    return [];
  }

  return data || [];
}
