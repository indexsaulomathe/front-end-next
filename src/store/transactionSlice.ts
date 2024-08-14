import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TransactionResponse } from "@/types/transaction";
import { makeTransaction } from "@/services/transaction";

interface TransactionState {
  transaction: TransactionResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transaction: null,
  loading: false,
  error: null,
};

export const initiateTransfer = createAsyncThunk<
  TransactionResponse,
  { fromWalletId: number; toWalletId: number; amount: number }
>("transaction/initiate", async (transferParams) => {
  return await makeTransaction(transferParams);
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransactionState(state) {
      state.transaction = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initiateTransfer.fulfilled,
        (state, action: PayloadAction<TransactionResponse>) => {
          state.transaction = action.payload;
          state.loading = false;
        }
      )
      .addCase(initiateTransfer.rejected, (state, action) => {
        state.error = action.error.message || "Failed to make transfer";
        state.loading = false;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
