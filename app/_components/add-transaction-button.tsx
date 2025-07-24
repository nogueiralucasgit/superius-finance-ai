"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertTransationDialog from "./upsert-trasactions-dialog";

function AddTransactionButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full text-slate-50"
        onClick={() => {
          setDialogIsOpen(true);
        }}
      >
        Adicionar transação
        <ArrowDownUpIcon className="ml-1" />
      </Button>
      <UpsertTransationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
}

export default AddTransactionButton;
