import React from 'react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-end space-x-2 mb-4">
        <button onClick={() => changeLanguage('en')} className="px-2 py-1 border rounded">EN</button>
        <button onClick={() => changeLanguage('it')} className="px-2 py-1 border rounded">IT</button>
      </div>
      {children}
    </div>
  );
}