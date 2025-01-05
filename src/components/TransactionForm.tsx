import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { TransactionType } from '../types';
import { useTranslation } from 'react-i18next';

interface TransactionFormProps {
  onSubmit: (data: {
    type: TransactionType;
    title: string;
    amount: number;
    date: string;
  }) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<TransactionType>('income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      title,
      amount: Number(amount),
      date,
    });
    setTitle('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-medium text-gray-900">{t('addTransaction')}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('type')}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="income">{t('income')}</option>
              <option value="expense">{t('expense')}</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('titleLabel')}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder={t('titleLabel')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('amount')}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('date')}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              {t('add')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}