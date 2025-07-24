import { z } from "zod";
import {
  TransactionCategoty,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const AddTransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategoty),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});

export const TransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.replace(/[^\d,.-]/g, "").replace(",", ".");
        return Number(cleaned);
      }
      return val;
    },
    z
      .number({ error: "O valor é obrigatório." })
      .positive({ message: "O valor deve ser positivo." }),
  ),
  type: z.nativeEnum(TransactionType, {
    error: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategoty, {
    error: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    error: "O método de pagamento é obrigatório.",
  }),
  date: z.date({
    error: "A data é obrigatória.",
  }),
});
