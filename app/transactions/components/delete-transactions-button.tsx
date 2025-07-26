"use client";
import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import ConfirmDeleteDialog from "./confirm-delete-dialog";
import { useState } from "react";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

const DeleteTransactionButton = ({
  transaction,
}: DeleteTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setDialogIsOpen(true);
        }}
      >
        <TrashIcon />
      </Button>
      <ConfirmDeleteDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transaction={transaction}
      />
    </>
  );
};

export default DeleteTransactionButton;
