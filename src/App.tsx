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
import type { Transaction, TransactionType } from './types';

// Definisci un'interfaccia per i dati del form
interface FormData {
  id?: number;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export default function App() {
  const { t } = useTranslation();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | undefined>(undefined);

  const {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses
  } = useTransactions(month, year);

  const openAddModal = () => {
    setCurrentTransaction(undefined);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTransaction(undefined);
    setIsEditMode(false);
  };

  const handleSubmit = (data: FormData) => {
    if (isEditMode && data.id) {
      updateTransaction(data as Transaction); // Il cast è sicuro perché in modalità edit l'id è presente
    } else {
      // Omettiamo l'id per l'aggiunta di una nuova transazione
      // Usa la sintassi di rest senza assegnare l'id a una variabile
      const { id, ...newTransactionData } = data;
      addTransaction(newTransactionData);
    }
    closeModal();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header più responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>
          <div className="w-full sm:w-auto">
            <MonthYearPicker
              month={month}
              year={year}
              onMonthChange={setMonth}
              onYearChange={setYear}
            />
          </div>
        </div>

        <Summary income={totalIncome} expenses={totalExpenses} />

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onEdit={openEditModal}
              type="income"
            />
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onEdit={openEditModal}
              type="expense"
            />
          </div>
        )}

        {/* Bottone fisso in basso su mobile */}
        <div className="fixed bottom-4 right-4 sm:relative sm:bottom-auto sm:right-auto sm:flex sm:justify-end">
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg sm:shadow-none"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {t('addTransaction')}
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TransactionForm 
            onSubmit={handleSubmit}
            initialData={currentTransaction}
            isEdit={isEditMode}
            onCancel={closeModal}
          />
        </Modal>
      </div>
    </Layout>
  );
}