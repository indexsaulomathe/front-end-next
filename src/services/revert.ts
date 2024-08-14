import api from "./api";

export const revertTransaction = async (
  transactionId: number
): Promise<void> => {
  try {
    await api.post(`/transactions/reverse/${transactionId}`);
  } catch (error) {
    console.error("Failed to revert transaction:", error);
    throw new Error("Failed to revert transaction");
  }
};
