import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthYearPickerProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function MonthYearPicker({
  month,
  year,
  onMonthChange,
  onYearChange,
}: MonthYearPickerProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm px-3 py-2">
      <button
        onClick={handlePrevMonth}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <span className="text-sm font-medium text-gray-900">
        {months[month]} {year}
      </span>
      
      <button
        onClick={handleNextMonth}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}