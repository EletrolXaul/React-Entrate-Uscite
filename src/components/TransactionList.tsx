import { format } from 'date-fns';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { Transaction } from '../types';
import { useTranslation } from 'react-i18next';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  type: 'income' | 'expense';
}

export function TransactionList({ transactions, onDelete, type }: TransactionListProps) {
  const { t } = useTranslation();
  const filteredTransactions = transactions.filter((t) => t.type === type);
  const Icon = type === 'income' ? ArrowUpCircle : ArrowDownCircle;
  const iconColor = type === 'income' 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400';
  const bgColor = type === 'income' 
    ? 'bg-green-50 dark:bg-green-900/20' 
    : 'bg-red-50 dark:bg-red-900/20';

  if (filteredTransactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className={`flex items-center space-x-3 p-4 border-b dark:border-gray-700 ${bgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">{t(type)}</h2>
        </div>
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {t('noTransactions', { type: t(type) })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className={`flex items-center space-x-3 p-4 border-b dark:border-gray-700 ${bgColor}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">{t(type)}</h2>
      </div>
      
      <div className="divide-y dark:divide-gray-700">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{transaction.title}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </p>
                {transaction.category && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {transaction.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-medium ${iconColor}`}>
                {type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
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