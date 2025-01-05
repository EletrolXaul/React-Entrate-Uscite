import React from 'react';
import { format } from 'date-fns';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  type: 'income' | 'expense';
}

export function TransactionList({ transactions, onDelete, type }: TransactionListProps) {
  const filteredTransactions = transactions.filter((t) => t.type === type);
  const Icon = type === 'income' ? ArrowUpCircle : ArrowDownCircle;
  const iconColor = type === 'income' ? 'text-green-600' : 'text-red-600';
  const bgColor = type === 'income' ? 'bg-green-50' : 'bg-red-50';

  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className={`flex items-center space-x-3 p-4 border-b ${bgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h2 className="text-lg font-medium text-gray-900 capitalize">{type}s</h2>
        </div>
        <div className="p-4 text-center text-sm text-gray-500">
          No {type}s found for this period
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className={`flex items-center space-x-3 p-4 border-b ${bgColor}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h2 className="text-lg font-medium text-gray-900 capitalize">{type}s</h2>
      </div>
      
      <div className="divide-y">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900">{transaction.title}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(transaction.date), 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-medium ${iconColor}`}>
                {type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}