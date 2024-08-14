import React from "react";

interface WalletBalanceProps {
  balance: number;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Saldo da Wallet</h2>
      <p className="text-2xl text-green-600">${balance.toFixed(2)}</p>
    </div>
  );
};

export default WalletBalance;
