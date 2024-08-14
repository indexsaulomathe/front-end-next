import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { makeDeposit } from "@/services/deposit";
import { TransactionResponse } from "@/types/transaction";

interface DepositState {
  deposit: TransactionResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepositState = {
  deposit: null,
  loading: false,
  error: null,
};

export const initiateDeposit = createAsyncThunk(
  "deposit/initiate",
  async ({
    amount,
    fromWalletId,
  }: {
    amount: number;
    fromWalletId: number;
  }) => {
    const response = await makeDeposit(amount, fromWalletId);
    return response;
  }
);

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDepositState: (state) => {
      state.deposit = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initiateDeposit.fulfilled,
        (state, action: PayloadAction<TransactionResponse>) => {
          state.loading = false;
          state.deposit = action.payload;
        }
      )
      .addCase(initiateDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to make deposit";
      });
  },
});

export const { resetDepositState } = depositSlice.actions;
export default depositSlice.reducer;
