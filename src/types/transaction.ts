export interface TransactionResponse {
  id: number;
  amount: string;
  type: string;
  fromWalletId: number;
  toWalletId: number | null;
  status: string;
  reversalId: number | null;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
}
