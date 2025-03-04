import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Aggiungi questa importazione

interface SummaryProps {
  income: number;
  expenses: number;
}

export function Summary({ income, expenses }: SummaryProps) {
  const { t } = useTranslation(); // Aggiungi questa riga
  const balance = income - expenses;
  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
            <ArrowUpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('income')}</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">€{income.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full">
            <ArrowDownCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('expense')}</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">€{expenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('balance')}</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              €{balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}