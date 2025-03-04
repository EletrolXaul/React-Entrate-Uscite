import React, { useState, useEffect } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';
import { useTranslation } from 'react-i18next';

interface TransactionFormProps {
  onSubmit: (data: {
    id?: number; // Opzionale per nuove transazioni
    type: TransactionType;
    title: string;
    amount: number;
    date: string;
    category: string;
  }) => void;
  initialData?: Transaction; // Per la modifica
  isEdit?: boolean; // Indica se stiamo modificando
  onCancel?: () => void; // Per annullare la modifica
}

export function TransactionForm({ onSubmit, initialData, isEdit = false, onCancel }: TransactionFormProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<TransactionType>('income');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('General');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  // Popoliamo il form con i dati esistenti quando è in modalità modifica
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setAmount(initialData.amount.toString());
      setDate(initialData.date);
      
      // Gestione categoria
      if (initialData.category) {
        const isPredefined = predefinedCategories.includes(initialData.category);
        if (isPredefined) {
          setCategory(initialData.category);
          setIsCustomCategory(false);
        } else {
          setCustomCategory(initialData.category);
          setIsCustomCategory(true);
        }
      }
    }
  }, [initialData]);

  // Definisci alcune categorie predefinite
  const predefinedCategories = ['General', 'Casa', 'Lavoro', 'Salute', 'Trasporti', 'Svago'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...(initialData && { id: initialData.id }), // Include l'ID se stiamo modificando
      type,
      title,
      amount: Number(amount),
      date,
      category: isCustomCategory ? customCategory : category,
    });
    
    // Resettiamo solo se non stiamo modificando
    if (!isEdit) {
      setTitle('');
      setAmount('');
      setCategory('General');
      setCustomCategory('');
      setIsCustomCategory(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {isEdit ? t('editTransaction') : t('addTransaction')}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('type')}</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="income">{t('income')}</option>
            <option value="expense">{t('expense')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('titleLabel')}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={t('titleLabel')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('amount')}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('date')}</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('category')}</label>
          
          {!isCustomCategory ? (
            <div className="space-y-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {predefinedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={() => setIsCustomCategory(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('useCustomCategory')}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder={t('customCategory')}
              />
              <button 
                type="button" 
                onClick={() => setIsCustomCategory(false)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('usePredefinedCategory')}
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          {isEdit && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('cancel')}
            </button>
          )}
          <button
            type="submit"
            className="flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {isEdit ? (
              <Save className="w-5 h-5 mr-2" />
            ) : (
              <PlusCircle className="w-5 h-5 mr-2" />
            )}
            {isEdit ? t('update') : t('add')}
          </button>
        </div>
      </form>
    </div>
  );
}