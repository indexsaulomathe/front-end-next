import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getWalletByUserId } from "@/services/wallet";
import {
  fetchWalletStart,
  fetchWalletSuccess,
  fetchWalletFailure,
} from "@/store/walletSlice";

const WalletBalance: React.FC = () => {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector(
    (state: RootState) => state.wallet
  );
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (userId) {
      const fetchWallet = async () => {
        dispatch(fetchWalletStart());
        try {
          const walletData = await getWalletByUserId(userId);
          dispatch(fetchWalletSuccess(walletData));
        } catch (error) {
          dispatch(fetchWalletFailure("Failed to fetch wallet data"));
        }
      };

      fetchWallet();
    }
  }, [dispatch, userId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Balance of Wallet</h2>
      {wallet ? (
        <p className="text-2xl text-green-600">
          ${parseFloat(wallet.balance).toFixed(2)}
        </p>
      ) : (
        <p className="text-gray-500">No balance available.</p>
      )}
    </div>
  );
};

export default WalletBalance;
