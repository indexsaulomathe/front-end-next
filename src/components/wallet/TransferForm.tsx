import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  initiateTransfer,
  resetTransactionState,
} from "@/store/transactionSlice";
import { TransactionResponse } from "@/types/transaction";
import TransactionDetail from "@/components/wallet/TransactionDetail";
import { toast } from "react-toastify";
import { getWalletByUserId } from "@/services/wallet";
import { revertTransaction } from "@/services/revert";

const TransferForm: React.FC = () => {
  const [recipient, setRecipient] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [transfer, setTransfer] = useState<TransactionResponse | null>(null);
  const walletId =
    useSelector((state: RootState) => state.wallet.wallet?.id) || 0;
  const userId = useSelector((state: RootState) => state.user.id);

  const dispatch = useDispatch<AppDispatch>();
  const { transaction, loading, error } = useSelector(
    (state: RootState) => state.transaction
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação para garantir que fromWalletId e toWalletId não são iguais
    if (walletId === recipient) {
      toast.error("Sender and recipient wallets cannot be the same.");
      return;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }

    try {
      const response = await dispatch(
        initiateTransfer({
          fromWalletId: walletId,
          toWalletId: recipient,
          amount,
        })
      ).unwrap();

      setTransfer(response);

      if (userId) {
        await getWalletByUserId(userId);
      }

      toast.success("Transfer successful");
    } catch (error) {
      console.error("Failed to make transfer in form:", error);
      toast.error("Failed to make transfer");
    }
  };

  const handleRevert = async () => {
    if (transaction) {
      try {
        await revertTransaction(transaction.id);
        toast.info("Transaction reverted");
        dispatch(resetTransactionState());
        setTransfer(null);

        if (userId) {
          await getWalletByUserId(userId);
        }
      } catch (error) {
        console.error("Failed to revert transaction:", error);
        toast.error("Failed to revert transaction");
      }
    } else {
      console.error("No transaction to revert");
      toast.error("No transaction to revert");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-bold mb-4">Transfer</h3>
        <input
          type="number"
          value={recipient}
          onChange={(e) => setRecipient(parseInt(e.target.value, 10) || 0)}
          placeholder="Recipient Wallet ID"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          placeholder="Amount"
          className="border rounded w-full p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Transfer"}
        </button>
      </form>

      {transfer && (
        <TransactionDetail transaction={transfer} onRevert={handleRevert} />
      )}
    </div>
  );
};

export default TransferForm;
