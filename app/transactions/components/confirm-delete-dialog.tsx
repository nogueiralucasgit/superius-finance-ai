import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";
import { DeleteTransaction } from "@/app/_actions/add-transaction.ts";
import { transactionsType } from "@/app/_constants/transactions";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  transaction: Transaction;
}

const ConfirmDeleteDialog = ({
  isOpen,
  setIsOpen,
  transaction,
}: ConfirmDeleteDialogProps) => {
  const onSubmit = async (data: Transaction) => {
    try {
      await DeleteTransaction(data);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Ao deletar, essa operação não poderá ser desfeita. <br />A transação{" "}
            <strong>{transaction.name}</strong> foi realizada em{" "}
            <strong>{new Date(transaction.date).toLocaleDateString()}</strong>{" "}
            com o tipo <strong>{transactionsType[transaction.type]}</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-24 px-4 font-bold"
            onClick={() => {
              onSubmit(transaction);
            }}
          >
            Deletar
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
