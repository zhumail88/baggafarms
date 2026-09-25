"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createDailyLog(formData: FormData) {
  const supabase = await createClient();

  const flock_id = formData.get("flock_id") as string;
  const mortality_count = parseInt(formData.get("mortality_count") as string, 10) || 0;
  const feed_bags_consumed = parseFloat(formData.get("feed_bags_consumed") as string) || 0;
  const average_weight_kg = formData.get("average_weight_kg") ? parseFloat(formData.get("average_weight_kg") as string) : null;
  const eggs_collected = parseInt(formData.get("eggs_collected") as string, 10) || 0;
  const notes = formData.get("notes") as string;
  const medicine_name = formData.get("medicine_name") as string;
  const medicine_quantity = formData.get("medicine_quantity") as string;

  // Insert the daily log
  const { error: logError } = await supabase.from("daily_logs").insert({
    flock_id,
    mortality_count,
    feed_bags_consumed,
    average_weight_kg,
    eggs_collected,
    notes,
    medicine_name,
    medicine_quantity
  });

  if (logError) {
    return { error: logError.message };
  }

  // Auto-deduct mortality from the current_count of the flock
  if (mortality_count > 0) {
    // We need to fetch current count first to deduct
    const { data: flockData, error: flockFetchError } = await supabase
      .from("flocks")
      .select("current_count")
      .eq("id", flock_id)
      .single();

    if (!flockFetchError && flockData) {
      const newCount = flockData.current_count - mortality_count;
      await supabase
        .from("flocks")
        .update({ current_count: newCount })
        .eq("id", flock_id);
    }
  }

  revalidatePath("/logs");
  revalidatePath("/flocks");
  revalidatePath("/dashboard");
  return { success: true };
}
