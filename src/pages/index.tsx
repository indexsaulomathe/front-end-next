import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import WalletBalance from "@/components/wallet/WalletBalance";
import DepositForm from "@/components/wallet/DepositForm";
import TransferForm from "@/components/wallet/TransferForm";
import { useWallet } from "@/hooks/useWallet";

const WalletPage: React.FC = () => {
  const { wallet, deposit, transfer } = useWallet();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 mt-5">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Wallet
        </h1>
        <div className="mb-8">
          <WalletBalance />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <DepositForm onDeposit={deposit} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <TransferForm onTransfer={transfer} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
