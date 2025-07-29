"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { Transaction } from "@prisma/client";
import { transactionCategoryMap } from "@/app/_constants/transactions";
import {
  TransactionCategoty,
  TransactionType,
  TransactionPaymentMethod,
} from "@prisma/client";

const usuarioAutenticado = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
};

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

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}

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

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const where = {
    userId,
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  )
    .filter((category) => category.category !== null)
    .map((category) => ({
      category:
        transactionCategoryMap[category.category as TransactionCategoty],
      totalAmount: Number(category._sum.amount),
      percentageOfTotal: Math.round(
        (Number(category._sum.amount) / Number(expensesTotal)) * 100,
      ),
    }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
