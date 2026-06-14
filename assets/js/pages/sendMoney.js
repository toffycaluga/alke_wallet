import { createContact, findContactById, searchContacts } from "../contacts.js";
import {
  showMessage,
  renderBalance,
  clearContainer,
  createElement,
  formatCurrency,
} from "../ui.js";
import { isValidAmount, parseAmount } from "../validators.js";
import { getBalance, hasEnoughBalance, sendMoney } from "../wallet.js";
import { restoreButton, showButtonLoader } from "../loader.js";

const $ = window.jQuery;

// Inicializa la pagina de envio de dinero.
 
export function initSendMoneyPage() {
  const elements = getSendMoneyElements();

  renderBalance(elements.balance, getBalance());
  renderContacts(elements.contactSelect);
  bindContactSearch(elements);
  bindContactForm(elements);
  bindSendMoneyForm(elements);
}

// Obtiene referencias DOM de la pagina.
 
function getSendMoneyElements() {
  return {
    balance: $("#send-current-balance"),
    contactSearch: $("#contact-search"),
    contactSelect: $("#contact-select"),
    sendMoneyForm: $("#send-money-form"),
    sendAmount: $("#send-amount"),
    contactForm: $("#contact-form"),
    contactName: $("#contact-name"),
    contactCbu: $("#contact-cbu"),
    contactAlias: $("#contact-alias"),
    contactBank: $("#contact-bank"),
    contactModal: $("#contactModal"),
    contactMessage: $("#contact-message-container"),
  };
}

// Renderiza opciones de contactos.
 
function renderContacts(contactSelect, searchTerm = "") {
  if (contactSelect.length === 0) {
    return;
  }

  clearContainer(contactSelect);

  contactSelect.append(
    createElement("option", {
      textContent: "Selecciona un contacto",
      attributes: { value: "" },
    }),
  );

  searchContacts(searchTerm).forEach((contact) => {
    contactSelect.append(
      createElement("option", {
        textContent: `${contact.fullName} - ${contact.alias}`,
        attributes: { value: contact.id },
      }),
    );
  });
}

// Registra busqueda de contactos.
 
function bindContactSearch(elements) {
  if (
    elements.contactSearch.length === 0 ||
    elements.contactSelect.length === 0
  ) {
    return;
  }

  elements.contactSearch.on("input", () => {
    renderContacts(elements.contactSelect, elements.contactSearch.val());
  });
}

// Registra alta de contactos desde el modal.
 
function bindContactForm(elements) {
  if (elements.contactForm.length === 0) {
    return;
  }

  elements.contactForm.on("submit", (event) => {
    event.preventDefault();

    const result = createContact({
      fullName: elements.contactName.val(),
      cbu: elements.contactCbu.val(),
      alias: elements.contactAlias.val(),
      bank: elements.contactBank.val(),
    });

    if (!result.ok) {
      showMessage(
        result.message,
        result.message.includes("Ya existe") ? "warning" : "danger",
        "#contact-message-container",
      );
      return;
    }

    elements.contactForm.trigger("reset");
    clearContainer(elements.contactMessage);
    renderContacts(elements.contactSelect, elements.contactSearch.val() ?? "");
    hideContactModal(elements.contactModal);
    showMessage(result.message, "success");
  });
}

// Cierra el modal de Bootstrap si la libreria esta disponible.
 
function hideContactModal(modalElement) {
  if (modalElement.length === 0 || !window.bootstrap?.Modal) {
    return;
  }

  window.bootstrap.Modal.getOrCreateInstance(modalElement[0]).hide();
}

// Registra envio de dinero.
 
function bindSendMoneyForm(elements) {
  if (
    elements.sendMoneyForm.length === 0 ||
    elements.contactSelect.length === 0 ||
    elements.sendAmount.length === 0
  ) {
    return;
  }

  elements.sendMoneyForm.on("submit", (event) => {
    event.preventDefault();

    const contactId = elements.contactSelect.val();
    const amount = parseAmount(elements.sendAmount.val());
    const selectedContact = findContactById(contactId);
    const submitButton = elements.sendMoneyForm.find('button[type="submit"]');

    if (!contactId) {
      showMessage("Debes seleccionar un contacto.", "warning");
      return;
    }

    if (!isValidAmount(amount)) {
      showMessage("Debes ingresar un monto válido.", "danger");
      return;
    }

    if (!selectedContact) {
      showMessage("El contacto seleccionado no existe.", "danger");
      return;
    }

    if (!hasEnoughBalance(amount)) {
      showMessage("No tienes saldo suficiente para realizar el envío.", "danger");
      return;
    }

    sendMoneyAfterConfirmation(elements, selectedContact, amount, submitButton);
  });
}

// Confirma, ejecuta y renderiza una transferencia.
 
function sendMoneyAfterConfirmation(elements, selectedContact, amount, submitButton) {
  const confirmed = window.confirm(
    `¿Confirmas el envío de ${formatCurrency(amount)} a ${selectedContact.fullName}?`,
  );

  if (!confirmed) {
    return;
  }

  try {
    showButtonLoader(submitButton, "Enviando...");
    const newBalance = sendMoney(selectedContact, amount);
    renderBalance(elements.balance, newBalance);
    elements.sendMoneyForm.trigger("reset");
    renderContacts(elements.contactSelect);
    restoreButton(submitButton);

    showMessage(
      `Dinero enviado correctamente a ${selectedContact.fullName}.`,
      "success",
    );
  } catch (error) {
    console.error(error);
    restoreButton(submitButton);
    showMessage("No se pudo realizar el envío de dinero.", "danger");
  }
}
