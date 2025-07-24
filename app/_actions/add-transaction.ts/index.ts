"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import {
  TransactionCategoty,
  TransactionType,
  TransactionPaymentMethod,
} from "@prisma/client";

interface TransactionUpsert {
  id?: string;
  name: string;
  type: TransactionType;
  amount: number;
  category?: TransactionCategoty;
  paymentMethod?: TransactionPaymentMethod;
  description?: string;
  date: Date;
}

export const AddTransaction = async (params: TransactionUpsert) => {
  console.log(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  AddTransactionSchema.parse(params);

  if (params.id) {
    await db.transaction.update({
      where: { id: params.id },
      data: { ...params, userId },
    });
  } else {
    await db.transaction.create({
      data: { ...params, userId },
    });
  }
  revalidatePath("/transactions");
};
