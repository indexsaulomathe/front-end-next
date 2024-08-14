import { useState } from "react";

export const useWallet = () => {
  const [balance, setBalance] = useState<number>(1000);

  const deposit = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const transfer = (recipient: string, amount: number) => {
    setBalance((prev) => prev - amount);
  };

  return {
    wallet: { balance },
    deposit,
    transfer,
  };
};
