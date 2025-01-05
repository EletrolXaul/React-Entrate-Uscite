import { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthYearPicker } from './components/MonthYearPicker';
import { Summary } from './components/Summary';
import { useTransactions } from './hooks/useTransactions';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses
  } = useTransactions(month, year);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('loading')}</p>
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

        <div className="flex justify-end">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {t('addTransaction')}
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TransactionForm onSubmit={(data) => {
            addTransaction(data);
            closeModal();
          }} />
        </Modal>
      </div>
    </Layout>
  );
}