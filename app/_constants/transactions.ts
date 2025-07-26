import {
  TransactionPaymentMethod,
  TransactionType,
  TransactionCategoty,
} from "@prisma/client";

const transactionCategoryMap = {
  FOOD: "Alimentação",
  TRANSPORT: "Transporte",
  ENTERTAINMENT: "Entretenimento",
  HOUSING: "Moradia",
  HEALTH: "Saúde",
  SALARY: "Salário",
  UTILITIES: "Utilidades",
  HEALTHCARE: "Cuidados com a saúde",
  SHOPPING: "Compras",
  TRAVEL: "Viagem",
  OTHER: "Outro",
};

const transactionsPaymentMethodMap = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  MOBILE_PAYMENT: "Pagamento Mobile",
  PIX: "Pix",
  CRYPTOCURRENCY: "Criptomoeda",
  OTHER: "Outro",
};

const transactionsType = {
  DEPOSIT: "Depósito",
  EXPENSE: "Despesa",
  INVESTMENT: "Investimento",
};

// OPTIONS

const TRANSACTIONS_TYPE_OPTIONS = [
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

const TRANSACTIONS_PAYMENT_METHOD_OPTIONS = [
  { value: TransactionPaymentMethod.CASH, label: "Dinheiro" },
  { value: TransactionPaymentMethod.CREDIT_CARD, label: "Cartão de Crédito" },
  { value: TransactionPaymentMethod.DEBIT_CARD, label: "Cartão de Débito" },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: "Transferência Bancária",
  },
  { value: TransactionPaymentMethod.BANK_SLIP, label: "Boleto Bancário" },
  { value: TransactionPaymentMethod.MOBILE_PAYMENT, label: "Pagamento Mobile" },
  { value: TransactionPaymentMethod.PIX, label: "Pix" },
  { value: TransactionPaymentMethod.CRYPTOCURRENCY, label: "Criptomoeda" },
  { value: TransactionPaymentMethod.OTHER, label: "Outro" },
];

const TRANSACTIONS_CATEGORY_OPTIONS = [
  { value: TransactionCategoty.FOOD, label: "Alimentação" },
  { value: TransactionCategoty.TRANSPORT, label: "Transporte" },
  { value: TransactionCategoty.ENTERTAINMENT, label: "Entretenimento" },
  { value: TransactionCategoty.HOUSING, label: "Moradia" },
  { value: TransactionCategoty.HEALTH, label: "Saúde" },
  { value: TransactionCategoty.SALARY, label: "Salário" },
  { value: TransactionCategoty.UTILITIES, label: "Utilidades" },
  { value: TransactionCategoty.HEALTHCARE, label: "Cuidados com a saúde" },
  { value: TransactionCategoty.SHOPPING, label: "Compras" },
  { value: TransactionCategoty.TRAVEL, label: "Viagem" },
  { value: TransactionCategoty.OTHER, label: "Outro" },
];

export {
  transactionCategoryMap,
  transactionsPaymentMethodMap,
  transactionsType,
  TRANSACTIONS_TYPE_OPTIONS,
  TRANSACTIONS_PAYMENT_METHOD_OPTIONS,
  TRANSACTIONS_CATEGORY_OPTIONS,
};
