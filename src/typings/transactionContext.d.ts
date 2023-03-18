export interface TransactionsContextProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}