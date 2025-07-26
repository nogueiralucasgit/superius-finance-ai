"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { Transaction } from "@prisma/client";
import {
  TransactionCategoty,
  TransactionType,
  TransactionPaymentMethod,
} from "@prisma/client";
import { id } from "date-fns/locale";

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

const usuarioAutenticado = async () => {
  if (!userId) {
    throw new Error("Unauthorized");
  }
};

export const AddTransaction = async (params: TransactionUpsert) => {
  const { userId } = await auth();
  usuarioAutenticado();

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

export const DeleteTransaction = async (params: Transaction) => {
  usuarioAutenticado();
  if (params.id) {
    await db.transaction.delete({
      where: {
        id: params.id,
      },
    });
  }
  revalidatePath("/transactions");
};
