export interface Wallet {
  id: number;
  balance: string;
  userId: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
}
