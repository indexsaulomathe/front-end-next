// components/DepositForm.tsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { initiateDeposit, resetDepositState } from "@/store/depositSlice";
import { getWalletByUserId } from "@/services/wallet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionDetail from "./TransactionDetail";
import { revertTransaction } from "@/services/revert";

const DepositForm: React.FC = () => {
  const [amount, setAmount] = React.useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const walletId = useSelector((state: RootState) => state.wallet.wallet?.id);
  const userId = useSelector((state: RootState) => state.user.id);
  const deposit = useSelector((state: RootState) => state.deposit.deposit);
  const loading = useSelector((state: RootState) => state.deposit.loading);
  const error = useSelector((state: RootState) => state.deposit.error);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (walletId) {
      try {
        await dispatch(
          initiateDeposit({ amount, fromWalletId: walletId })
        ).unwrap();
        toast.success("Deposit successful");
        if (userId) {
          await getWalletByUserId(userId);
        }
      } catch (error) {
        console.error("Failed to make deposit:", error);
        toast.error("Failed to make deposit");
      }
    } else {
      console.error("Wallet ID not available");
      toast.error("Wallet ID not available");
    }
  };

  const handleRevert = async () => {
    if (deposit) {
      try {
        await revertTransaction(deposit.id);
        toast.info("Deposit reverted");

        dispatch(resetDepositState());
        if (userId) {
          await getWalletByUserId(userId);
        }
      } catch (error) {
        console.error("Failed to revert deposit:", error);
        toast.error("Failed to revert deposit");
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetDepositState());
    };
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-bold mb-4">Deposit</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          className="border rounded w-full p-2 mb-4"
          min="0"
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>

      {deposit && (
        <TransactionDetail transaction={deposit} onRevert={handleRevert} />
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default DepositForm;
