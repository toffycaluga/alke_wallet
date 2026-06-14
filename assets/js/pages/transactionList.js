import { getTransactions } from "../transactions.js";
import { clearContainer, createElement, formatCurrency, formatDate } from "../ui.js";

const $ = window.jQuery;

// Inicializa la pagina de ultimos movimientos.
 
export function initTransactionListPage() {
  const transactionsList = $("#transactions-list");

  if (transactionsList.length === 0) {
    return;
  }

  renderTransactions(transactionsList, getTransactions());
}

// Renderiza la lista de movimientos.
 
function renderTransactions(transactionsList, transactions) {
  clearContainer(transactionsList);

  if (transactions.length === 0) {
    transactionsList.append(
      createElement("div", {
        className: "alert alert-info",
        textContent: "Todavía no tienes movimientos registrados.",
      }),
    );
    return;
  }

  transactions.forEach((transaction) => {
    transactionsList.append(createTransactionElement(transaction));
  });
}

// Crea un elemento visual para un movimiento sin insertar HTML de usuario.
 
function createTransactionElement(transaction) {
  const isDeposit = transaction.type === "deposit";
  const article = createElement("article", { className: "list-group-item" });
  const row = createElement("div", { className: "d-flex justify-content-between gap-3" });
  const content = createElement("div");
  const title = createElement("h3", {
    className: "fs-6 mb-1",
    textContent: transaction.description,
  });
  const date = createElement("small", {
    className: "text-secondary",
    textContent: formatDate(transaction.date),
  });
  const amount = createElement("span", {
    className: `${isDeposit ? "transaction-positive" : "transaction-negative"} text-nowrap`,
    textContent: `${isDeposit ? "+" : "-"} ${formatCurrency(transaction.amount)}`,
  });

  content.append(title);
  appendOptionalDetail(content, "Alias", transaction.contactAlias);
  appendOptionalDetail(content, "Banco", transaction.bank);
  content.append(date);
  row.append(content, amount);
  article.append(row);

  return article;
}

// Agrega un detalle opcional del movimiento.
 
function appendOptionalDetail(container, label, value) {
  if (!value) {
    return;
  }

  container.append(
    createElement("p", {
      className: "small text-secondary mb-1",
      textContent: `${label}: ${value}`,
    }),
  );
}
