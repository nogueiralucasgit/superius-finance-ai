import { db } from "@/app/_lib/prisma";
import { Button } from "../_components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import DataTableTransactions from "../_components/ui/datatable-transactions";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="mx-auto space-y-6 p-6 px-8 py-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full text-slate-50">
          Adicionar transação
          <ArrowDownUpIcon className="ml-1" />
        </Button>
      </div>
      <div>
        <DataTableTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;
