// @/services/wallet.ts
import api from "./api";
import {
  fetchWalletStart,
  fetchWalletSuccess,
  fetchWalletFailure,
} from "../store/walletSlice";
import { store } from "../store/store";
import { Wallet } from "../types/wallet";

export const getWalletByUserId = async (userId: number) => {
  const dispatch = store.dispatch;

  dispatch(fetchWalletStart());

  try {
    const response = await api.get<Wallet>(`/wallets/user/${userId}`);
    dispatch(fetchWalletSuccess(response.data));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch wallet data:", error);
    dispatch(fetchWalletFailure("Failed to fetch wallet data"));
    throw error;
  }
};
