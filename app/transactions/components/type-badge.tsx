import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";
import { Transaction, TransactionType } from "@prisma/client";

interface TypeBadgeProps {
  transaction: Transaction;
}

const TypeBadge = ({ transaction }: TypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge variant="default">
        <CircleIcon className="mr-1 h-4 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge variant="destructive">
        <CircleIcon className="mr-1 h-4 fill-destructive" size={10} />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge variant="secondary">
        <CircleIcon className="mr-1 h-4 fill-secondary" size={10} />
        Investimento
      </Badge>
    );
  }
  return <span>{transaction.type}</span>;
};

export default TypeBadge;
