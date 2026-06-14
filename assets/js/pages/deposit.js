import { showMessage, formatCurrency, renderBalance } from "../ui.js";
import { parseAmount, isValidAmount } from "../validators.js";
import { depositMoney, getBalance } from "../wallet.js";
import { restoreButton, showButtonLoader, showPageLoader } from "../loader.js";

const $ = window.jQuery;

// Inicializa la pagina de deposito.
 
export function initDepositPage() {
  const balanceElement = $("#deposit-current-balance");
  const depositForm = $("#deposit-form");
  const amountInput = $("#deposit-amount");

  renderBalance(balanceElement, getBalance());

  if (
    depositForm.length === 0 ||
    amountInput.length === 0 ||
    balanceElement.length === 0
  ) {
    return;
  }

  depositForm.on("submit", (event) => {
    event.preventDefault();

    const amount = parseAmount(amountInput.val());
    const submitButton = depositForm.find('button[type="submit"]');

    if (!isValidAmount(amount)) {
      showMessage("Debes ingresar un monto válido mayor que cero.", "danger");
      return;
    }

    try {
      showButtonLoader(submitButton, "Depositando...");
      const newBalance = depositMoney(amount);
      renderBalance(balanceElement, newBalance);
      amountInput.val("");

      showMessage(
        `Depósito realizado correctamente. Nuevo saldo: ${formatCurrency(newBalance)}.`,
        "success",
      );

      setTimeout(() => {
        showPageLoader("Volviendo al menú...");
      }, 1400);

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1800);
    } catch (error) {
      console.error(error);
      restoreButton(submitButton);
      showMessage("No se pudo realizar el depósito.", "danger");
    }
  });
}
