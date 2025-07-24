import { db } from "@/app/_lib/prisma";
import DataTableTransactions from "../_components/ui/datatable-transactions";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="mx-auto space-y-6 p-6 px-8 py-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <div>
        <DataTableTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;
