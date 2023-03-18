import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

import { Transaction } from "../typings/transaction";
import { TransactionsContextProps } from "../typings/transactionContext";
import { TransactionInput } from "../typings/transactionInput";
import { TransactionsProviderProps } from "../typings/transactionProvider";


const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(TransactionInput: TransactionInput) {
    const response = await api.post('transactions', {
      ...TransactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionsContext);

  return context
}