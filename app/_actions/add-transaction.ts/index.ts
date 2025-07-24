"use server";
import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const AddTransaction = async (
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  AddTransactionSchema.parse(params);

  await db.transaction.create({
    data: { ...params, userId },
  });

  revalidatePath("/transactions");
};
