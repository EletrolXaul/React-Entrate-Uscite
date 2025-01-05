const API_URL = 'http://localhost:3001';

export async function fetchTransactions(month: number, year: number) {
  const response = await fetch(`${API_URL}/transactions`);
  const transactions = await response.json();
  
  return transactions.filter((transaction: any) => {
    const date = new Date(transaction.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  return response.json();
}

export async function deleteTransaction(id: number) {
  await fetch(`${API_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
}