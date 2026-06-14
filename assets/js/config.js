// Valores compratidos de la configuración de la wallet.
export const INITIAL_BALANCE = 850000;

export const VALID_USER = {
  email: "usuario@alkewallet.cl",
  password: "123456",
};

export const STORAGE_KEYS = {
  balance: "walletBalance",
  transactions: "walletTransactions",
  contacts: "walletContacts",
};

export const SESSIONS_KEYS = {
  authenticated: "walletAuthenticated",
};

export const PROTECTED_PAGES = [
  "/",
  "index.html",
  "menu.html",
  "deposit.html",
  "sendmoney.html",
  "transactions.html",
];

export const INITIAL_CONTACTS = [
  {
    fullName: "María González",
    cbu: "1234567890123456789012",
    alias: "maria.wallet",
    bank: "Banco Nacional",
  },
  {
    fullName: "Juan Pérez",
    cbu: "9876543210987654321098",
    alias: "juan.wallet",
    bank: "Banco Central",
  },
];
