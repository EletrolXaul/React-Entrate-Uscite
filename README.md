# Income/Expense Manager

A React-based application for managing personal income and expenses with a clean and intuitive interface.

## Features

- 💰 Track both income and expenses
- 📅 Filter transactions by month and year
- 📊 View summary statistics (total income, expenses, and balance)
- ✨ Clean and responsive UI
- 🔄 Real-time updates
- 📱 Mobile-friendly design

## Technical Stack

- React with TypeScript
- Tailwind CSS for styling
- JSON Server for backend API
- date-fns for date formatting
- Lucide React for icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON Server (API):
   ```bash
   npm run server
   ```
4. In a new terminal, start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

The application uses JSON Server with the following endpoints:

- GET `/transactions` - Get all transactions
- POST `/transactions` - Create a new transaction
- DELETE `/transactions/:id` - Delete a transaction

## Project Structure

```
src/
├── api/
│   └── transactions.ts    # API integration
├── components/
│   ├── MonthYearPicker.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── types/
│   └── index.ts          # TypeScript types
└── App.tsx               # Main application component
```

## Features in Detail

### Transaction Management
- Add new transactions with title, amount, date, and type (income/expense)
- Delete existing transactions
- View transactions separated by type

### Filtering
- Filter transactions by month and year
- Default view shows current month's transactions

### Summary Statistics
- Total income for the selected period
- Total expenses for the selected period
- Current balance (income - expenses)

### Loading States
- Loading indicator while fetching transactions
- Empty state when no transactions are found

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request