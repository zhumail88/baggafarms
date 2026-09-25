"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createTransaction(formData: FormData) {
  const supabase = await createClient();

  const type = formData.get("type") as string; // 'income' or 'expense'
  const category = formData.get("category") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const buyer_name = formData.get("buyer_name") as string;
  const dispatch_id = formData.get("dispatch_id") as string;
  const notes = formData.get("notes") as string;

  const insertData: any = {
    type,
    category,
    amount,
    notes,
    payment_status: "paid", // Simplify to paid immediately for income/expense
  };

  // Associate flock if provided (not strictly required by UI right now, but optional)
  if (buyer_name) insertData.buyer_name = buyer_name;
  if (dispatch_id) insertData.dispatch_id = dispatch_id;

  const { error } = await supabase.from("transactions").insert(insertData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/ledger");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getBuyersLedger() {
  const supabase = await createClient();
  
  // We need to calculate running balances. 
  // Normally, a buyer gets 'expense' or 'debt' when we dispatch birds to them.
  // However, the schema says: transactions can be 'income' or 'expense'.
  // If we sell birds, it's technically an income (payment received) or pending income (credit).
  // Let's query all transactions grouped by buyer_name.

  const { data, error } = await supabase
    .from("transactions")
    .select("type, amount, buyer_name, category")
    .not("buyer_name", "is", null);

  if (error || !data) return [];

  const ledgerMap: Record<string, { totalCredit: number; totalPaid: number; balance: number }> = {};

  data.forEach((txn) => {
    if (!ledgerMap[txn.buyer_name]) {
      ledgerMap[txn.buyer_name] = { totalCredit: 0, totalPaid: 0, balance: 0 };
    }
    
    // If it's a Credit Sale (Category: Credit Dispatch), add to Total Credit
    if (txn.type === "expense" && txn.category === "Credit Dispatch") {
       ledgerMap[txn.buyer_name].totalCredit += txn.amount;
    }
    // If it's a Payment Received (Category: Payment), add to Total Paid
    if (txn.type === "income" && txn.category === "Payment") {
       ledgerMap[txn.buyer_name].totalPaid += txn.amount;
    }
  });

  return Object.keys(ledgerMap).map((name) => ({
    name,
    totalCredit: ledgerMap[name].totalCredit,
    totalPaid: ledgerMap[name].totalPaid,
    balance: ledgerMap[name].totalCredit - ledgerMap[name].totalPaid,
  }));
}

export async function getTransactions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return [];
  return data;
}
