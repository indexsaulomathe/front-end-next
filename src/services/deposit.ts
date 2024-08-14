import api from "./api";
import { TransactionResponse } from "@/types/transaction";

export const makeDeposit = async (
  amount: number,
  fromWalletId: number
): Promise<TransactionResponse> => {
  try {
    const response = await api.post<TransactionResponse>("/transactions", {
      type: "DEPOSIT",
      amount: amount.toFixed(2),
      fromWalletId,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to make deposit:", error);
    throw new Error("Failed to make deposit");
  }
};
