import { z } from "zod";
import {
  TransactionCategoty,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const AddTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategoty),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});
