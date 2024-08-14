// @/store/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "@/types/wallet";

interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    fetchWalletStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWalletSuccess(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
      state.loading = false;
    },
    fetchWalletFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchWalletStart, fetchWalletSuccess, fetchWalletFailure } =
  walletSlice.actions;
export default walletSlice.reducer;
