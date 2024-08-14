import React, { useState } from "react";

interface DepositFormProps {
  onDeposit: (amount: number) => void;
}

const DepositForm: React.FC<DepositFormProps> = ({ onDeposit }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeposit(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-4">Depositar</h3>
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
        Depositar
      </button>
    </form>
  );
};

export default DepositForm;
