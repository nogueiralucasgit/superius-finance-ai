"use client";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { PenBoxIcon } from "lucide-react";
import UpsertTransationDialog from "@/app/_components/upsert-trasactions-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionsButtonProps {
  transaction: Transaction;
}
const EditTransactionsButton = ({
  transaction,
}: EditTransactionsButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full text-slate-50"
        onClick={() => {
          setDialogIsOpen(true);
        }}
      >
        <PenBoxIcon />
      </Button>
      <UpsertTransationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValue={transaction}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionsButton;
