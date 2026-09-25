"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createDispatch(formData: FormData) {
  const supabase = await createClient();

  const flock_id = formData.get("flock_id") as string;
  const driver_name = formData.get("driver_name") as string;
  const driver_phone = formData.get("driver_phone") as string;
  const vehicle_number = formData.get("vehicle_number") as string;
  const birds_loaded = parseInt(formData.get("birds_loaded") as string, 10);
  const crates_count = formData.get("crates_count") ? parseInt(formData.get("crates_count") as string, 10) : null;
  const gross_weight_kg = formData.get("gross_weight_kg") ? parseFloat(formData.get("gross_weight_kg") as string) : null;
  const buyer_name = formData.get("buyer_name") as string;

  const { data, error } = await supabase.from("dispatches").insert({
    flock_id,
    driver_name,
    driver_phone,
    vehicle_number,
    birds_loaded,
    crates_count,
    gross_weight_kg,
    buyer_name,
  }).select().single();

  if (error) {
    return { error: error.message };
  }

  // Record an automatic Credit transaction for the buyer if this is a sale.
  // Wait, we can let them handle the transaction separately, or automatically log a pending income.
  // Since we only know weight and bird count, we don't know the exact PKR amount here.
  // So we just log the dispatch and they can link a payment or invoice later.

  revalidatePath("/dispatch");
  revalidatePath("/ledger");
  return { success: true, dispatch_id: data.id };
}
