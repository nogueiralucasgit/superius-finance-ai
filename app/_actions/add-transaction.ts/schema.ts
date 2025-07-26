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
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategoty, {
    required_error: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
});
