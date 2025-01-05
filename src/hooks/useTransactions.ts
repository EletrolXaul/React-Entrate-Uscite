import { useState, useEffect } from 'react';
import { fetchTransactions, addTransaction as apiAddTransaction, deleteTransaction as apiDeleteTransaction } from '../api/transactions';
import type { Transaction } from '../types';

export function useTransactions(month: number, year: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [month, year]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions(month, year);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (data: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await apiAddTransaction(data);
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await apiDeleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses
  };
}