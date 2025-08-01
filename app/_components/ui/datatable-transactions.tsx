import { Transaction } from "@prisma/client";
import TypeBadge from "@/app/transactions/components/type-badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  transactionCategoryMap,
  transactionsPaymentMethodMap,
} from "@/app/_constants/transactions";
import EditTransactionsButton from "@/app/transactions/components/edit-transactions-button";
import DeleteTransactionButton from "@/app/transactions/components/delete-transactions-button";

interface DataTableTransactionsProps {
  transactions: Transaction[];
}

const DataTableTransactions = ({
  transactions,
}: DataTableTransactionsProps) => {
  return (
    <Table>
      <TableCaption>Lista das suas transações recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Forma de Pagamento</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.name}</TableCell>
            <TableCell>
              <TypeBadge transaction={transaction} />
            </TableCell>
            <TableCell>
              {Number(transaction.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              {transaction.category
                ? transactionCategoryMap[transaction.category]
                : "-"}
            </TableCell>
            <TableCell>
              {transaction.paymentMethod
                ? transactionsPaymentMethodMap[transaction.paymentMethod]
                : "-"}
            </TableCell>
            <TableCell>{transaction.description ?? "-"}</TableCell>
            <TableCell>
              {new Date(transaction.date).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <EditTransactionsButton transaction={transaction} />
              <DeleteTransactionButton transaction={transaction} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right" colSpan={6}>
            {transactions
              .reduce((acc, t) => acc + Number(t.amount), 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DataTableTransactions;
