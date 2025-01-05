import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const months = t('months', { returnObjects: true }) as string[];

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

  const handleCurrentMonth = () => {
    const now = new Date();
    onMonthChange(now.getMonth());
    onYearChange(now.getFullYear());
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleCurrentMonth}
        title={t('currentMonth')}
        className="px-3 py-1.5 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
      >
        <Calendar className="w-4 h-4" />
      </button>
      
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm px-3 py-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {months[month]} {year}
        </span>
        
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}