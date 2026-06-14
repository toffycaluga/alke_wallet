import {
  INITIAL_BALANCE,
  INITIAL_CONTACTS,
  STORAGE_KEYS,
} from "./config.js";
import { protectPage } from "./auth.js";
import { getString, setJson, setString } from "./storage.js";
import { createTransaction } from "./transactions.js";
import { initPageTransition } from "./loader.js";

const PAGE_MODULES = {
  "/": () => {
    window.location.href = "menu.html";
  },
  "index.html": () => {
    window.location.href = "menu.html";
  },
  "login.html": () =>
    import("./pages/login.js").then((module) => module.initLoginPage()),
  "menu.html": () =>
    import("./pages/menu.js").then((module) => module.initMenuPage()),
  "deposit.html": () =>
    import("./pages/deposit.js").then((module) => module.initDepositPage()),
  "sendmoney.html": () =>
    import("./pages/sendMoney.js").then((module) => module.initSendMoneyPage()),
  "transactions.html": () =>
    import("./pages/transactionList.js").then((module) =>
      module.initTransactionListPage(),
    ),
};

// Inicializa datos base sin sobrescribir informacion valida existente.
 
function initializeWalletData() {
  initializeBalance();
  initializeTransactions();
  initializeContacts();
}

// Crea el saldo inicial si no existe.
 
function initializeBalance() {
  if (getString(STORAGE_KEYS.balance) === null) {
    setString(STORAGE_KEYS.balance, INITIAL_BALANCE);
  }
}

// Crea el movimiento inicial si la lista no existe.
 
function initializeTransactions() {
  if (getString(STORAGE_KEYS.transactions) !== null) {
    return;
  }

  setJson(STORAGE_KEYS.transactions, [
    createTransaction({
      type: "deposit",
      description: "Saldo inicial",
      amount: INITIAL_BALANCE,
    }),
  ]);
}

// Crea contactos iniciales si no existe una agenda guardada.
 
function initializeContacts() {
  if (getString(STORAGE_KEYS.contacts) !== null) {
    return;
  }

  const contacts = INITIAL_CONTACTS.map((contact) => ({
    id: crypto.randomUUID(),
    ...contact,
  }));

  setJson(STORAGE_KEYS.contacts, contacts);
}

// Obtiene el nombre del archivo actual.
 
function getCurrentPage() {
  const currentPath = window.location.pathname;

  if (currentPath === "/" || currentPath.endsWith("/")) {
    return "/";
  }

  return currentPath.split("/").pop() || "/";
}

// Carga el modulo especifico de la pagina actual.
 
async function loadCurrentPage(currentPage) {
  const loadPage = PAGE_MODULES[currentPage];

  if (!loadPage) {
    return;
  }

  try {
    await loadPage();
  } catch (error) {
    console.error(`No se pudo cargar el modulo de ${currentPage}.`, error);
  }
}

initializeWalletData();
initPageTransition();

const currentPage = getCurrentPage();

if (protectPage(currentPage)) {
  loadCurrentPage(currentPage);
}
