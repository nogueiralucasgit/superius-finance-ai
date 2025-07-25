import { db } from "@/app/_lib/prisma";
import DataTableTransactions from "../_components/ui/datatable-transactions";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

const TransactionsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(transactions);

  return (
    <>
      <NavBar />
      <div className="mx-auto space-y-6 p-6 px-8 py-8">
        <div className="mb-6 flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <div>
          <DataTableTransactions transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
