import React from "react";
import { TransactionResponse } from "@/types/transaction";

interface TransactionDetailProps {
  transaction: TransactionResponse;
  onRevert: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onRevert,
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
      <h4 className="text-lg font-bold mb-2">Recent Transaction</h4>
      <p>
        <strong>Amount:</strong> ${transaction.amount}
      </p>
      <p>
        <strong>Type:</strong> {transaction.type}
      </p>
      <p>
        <strong>Status:</strong> {transaction.status}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(transaction.createdAt).toLocaleString()}
      </p>
      <button
        onClick={onRevert}
        className="bg-red-600 text-white py-2 px-4 rounded mt-2"
      >
        Revert
      </button>
    </div>
  );
};

export default TransactionDetail;
