import api from "./api";
import { TransactionResponse } from "@/types/transaction";

interface TransferParams {
  fromWalletId: number;
  toWalletId: number;
  amount: number;
}

export const makeTransaction = async ({
  fromWalletId,
  toWalletId,
  amount,
}: TransferParams): Promise<TransactionResponse> => {
  try {
    const response = await api.post<TransactionResponse>("/transactions", {
      type: "TRANSFER",
      amount: amount.toFixed(2),
      fromWalletId,
      toWalletId,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to make transfer in service:", error);
    throw new Error("Failed to make transfer");
  }
};
