import { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthYearPicker } from './components/MonthYearPicker';
import { Summary } from './components/Summary';
import { useTransactions } from './hooks/useTransactions';
import { Layout } from './components/Layout';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  const {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses
  } = useTransactions(month, year);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <MonthYearPicker
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
          />
        </div>

        <Summary income={totalIncome} expenses={totalExpenses} />

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">{t('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              type="income"
            />
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              type="expense"
            />
          </div>
        )}

        <TransactionForm onSubmit={addTransaction} />
      </div>
    </Layout>
  );
}