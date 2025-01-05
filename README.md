# Gestore Entrate/Uscite

Un'applicazione React per la gestione delle entrate e delle uscite personali con un'interfaccia pulita e intuitiva.

## Caratteristiche

- 💰 Gestione entrate e uscite
- 📅 Filtro transazioni per mese e anno
- 📊 Statistiche riassuntive (entrate totali, uscite e saldo)
- 🌓 Modalità chiara/scura
- 🌍 Supporto multilingua (Italiano/Inglese)
- ✨ Interfaccia pulita e reattiva
- 🔄 Aggiornamenti in tempo reale
- 📱 Design ottimizzato per dispositivi mobili

## Stack Tecnologico

- React con TypeScript
- Tailwind CSS per lo stile
- JSON Server per l'API backend
- date-fns per la formattazione delle date
- Lucide React per le icone
- i18next per l'internazionalizzazione
- React-i18next per la gestione delle traduzioni

## Iniziare

1. Clona il repository
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il JSON Server (API):
   ```bash
   npm run server
   ```
4. In un nuovo terminale, avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

## Endpoint API

L'applicazione utilizza JSON Server con i seguenti endpoint:

- GET `/transactions` - Ottieni tutte le transazioni
- POST `/transactions` - Crea una nuova transazione
- DELETE `/transactions/:id` - Elimina una transazione

## Struttura del Progetto

```
src/
├── api/
│   └── transactions.ts    # Integrazione API
├── components/
│   ├── MonthYearPicker.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── types/
│   └── index.ts          # Tipi TypeScript
└── App.tsx               # Componente principale dell'applicazione
```

## Caratteristiche in Dettaglio

### Gestione delle Transazioni
- Aggiungi nuove transazioni con titolo, importo, data e tipo (entrata/uscita)
- Elimina transazioni esistenti
- Visualizza le transazioni separate per tipo

### Filtraggio
- Filtra le transazioni per mese e anno
- La vista predefinita mostra le transazioni del mese corrente

### Statistiche Riassuntive
- Entrate totali per il periodo selezionato
- Uscite totali per il periodo selezionato
- Saldo corrente (entrate - uscite)

### Stati di Caricamento
- Indicatore di caricamento durante il recupero delle transazioni
- Stato vuoto quando non vengono trovate transazioni

## Contribuire

1. Fai un fork del repository
2. Crea il tuo branch per la funzionalità
3. Committa le tue modifiche
4. Fai push sul branch
5. Crea una nuova Pull Request