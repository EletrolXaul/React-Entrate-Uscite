// Importiamo il tipo Transaction dagli stessi tipi usati nel resto dell'app
import type { Transaction } from '../types';

// Quando usiamo un proxy, possiamo usare path relativi
const API_URL = 'http://localhost:3000/api';

// Definire un'interfaccia per la risposta dell'API
interface TransactionResponse {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: string | number;
  date: string;
  category: string; // Rimuovi l'opzionale per renderlo obbligatorio
}

export async function fetchTransactions(month: number, year: number) {
  try {
    // Utilizziamo i parametri di query per filtrare direttamente sul server
    const response = await fetch(`${API_URL}/transactions?month=${month}&year=${year}`);
    
    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }
    
    // Mappare i campi del backend ai campi del frontend
    const data = await response.json() as TransactionResponse[];
    return data.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.description, // Mappare description a title
      amount: parseFloat(item.amount.toString()),
      date: item.date,
      category: item.category || 'General' // Valore predefinito se manca
    }));
  } catch (error) {
    console.error('Errore nel recupero delle transazioni:', error);
    return [];
  }
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: transaction.title, // Mappare title a description
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        category: transaction.category || 'General' // Usa la categoria fornita o un valore predefinito
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }
    
    const data = await response.json() as TransactionResponse;
    // Mappare i campi della risposta ai campi del frontend
    return {
      id: data.id,
      type: data.type,
      title: data.description,
      amount: parseFloat(data.amount.toString()),
      date: data.date,
      category: data.category
    };
  } catch (error) {
    console.error('Errore nell\'aggiunta della transazione:', error);
    throw error;
  }
}

export async function deleteTransaction(id: number) {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Errore nella cancellazione della transazione:', error);
    throw error;
  }
}

// Per l'aggiornamento, definiamo un'interfaccia per i dati della richiesta
interface UpdateTransactionRequest {
  description?: string;
  amount?: number;
  date?: string;
  type?: 'income' | 'expense';
  category?: string;
}

export async function updateTransaction(id: number, transaction: Partial<Omit<Transaction, 'id'>>) {
  try {
    const requestData: UpdateTransactionRequest = {};
    
    if (transaction.title) {
      requestData.description = transaction.title;
    }
    if (transaction.amount !== undefined) {
      requestData.amount = transaction.amount;
    }
    if (transaction.date) {
      requestData.date = transaction.date;
    }
    if (transaction.type) {
      requestData.type = transaction.type;
    }
    if (transaction.category) {
      requestData.category = transaction.category;
    }
    
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }
    
    const data = await response.json() as TransactionResponse;
    return {
      id: data.id,
      type: data.type,
      title: data.description,
      amount: parseFloat(data.amount.toString()),
      date: data.date,
      category: data.category
    };
  } catch (error) {
    console.error('Errore nell\'aggiornamento della transazione:', error);
    throw error;
  }
}