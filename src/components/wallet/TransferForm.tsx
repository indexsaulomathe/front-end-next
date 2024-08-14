import React, { useState } from "react";

interface TransferFormProps {
  onTransfer: (recipient: string, amount: number) => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransfer(recipient, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-4">Transferir</h3>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Destinatário"
        className="border rounded w-full p-2 mb-4"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="border rounded w-full p-2 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Transferir
      </button>
    </form>
  );
};

export default TransferForm;
