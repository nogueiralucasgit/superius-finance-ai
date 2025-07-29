import { Transaction } from "@prisma/client";
import { transactionCategoryMap } from "@/app/_constants/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Card, CardContent } from "@/app/_components/ui/card";

interface DataTableLastTransactionsProps {
  transactions: Transaction[];
}

const typeColorMap: Record<string, string> = {
  DEPOSIT: "text-green-400",
  EXPENSE: "text-red-400",
  INVESTMENT: "text-indigo-400",
};

const typeLabelMap: Record<string, string> = {
  DEPOSIT: "Depósito",
  EXPENSE: "Despesa",
  INVESTMENT: "Investimento",
};

const DataTableLastTransactions = ({
  transactions,
}: DataTableLastTransactionsProps) => {
  return (
    <Card className="border border-neutral-800">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-800">
              <TableHead className="text-neutral-400">Nome</TableHead>
              <TableHead className="text-neutral-400">Tipo</TableHead>
              <TableHead className="text-neutral-400">Valor</TableHead>
              <TableHead className="text-neutral-400">Categoria</TableHead>
              <TableHead className="text-neutral-400">Data</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[665px] overflow-y-auto">
          <Table>
            <TableBody>
              {transactions.map((transaction) => {
                const type = transaction.type;
                const typeColor = typeColorMap[type] || "text-neutral-200";
                const typeLabel = typeLabelMap[type] || type;
                return (
                  <TableRow
                    key={transaction.id}
                    className="border-b border-neutral-800 transition-colors hover:bg-white/5"
                  >
                    {/* Nome com cor clara */}
                    <TableCell className="py-3 text-neutral-100">
                      {transaction.name}
                    </TableCell>
                    {/* Tipo com cor específica (verde/vermelho/índigo) */}
                    <TableCell className={`text-sm ${typeColor}`}>
                      {typeLabel}
                    </TableCell>
                    {/* Valor com cor específica e negrito */}
                    <TableCell className={`font-medium ${typeColor}`}>
                      {Number(transaction.amount).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    {/* Categoria com cinza mais claro */}
                    <TableCell className="text-neutral-400">
                      {transaction.category
                        ? transactionCategoryMap[transaction.category]
                        : "-"}
                    </TableCell>
                    {/* Data com cinza médio */}
                    <TableCell className="text-sm text-neutral-500">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTableLastTransactions;
