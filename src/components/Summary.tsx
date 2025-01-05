import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface SummaryProps {
  income: number;
  expenses: number;
}

export function Summary({ income, expenses }: SummaryProps) {
  const balance = income - expenses;
  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-full">
            <ArrowUpCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Income</p>
            <p className="text-lg font-semibold text-green-600">€{income.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 rounded-full">
            <ArrowDownCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="text-lg font-semibold text-red-600">€{expenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-full">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              €{balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}