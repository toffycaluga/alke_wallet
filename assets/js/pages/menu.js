import { logout } from "../auth.js";
import { getBalance } from "../wallet.js";
import { renderBalance, showMessage } from "../ui.js";
import { showPageLoader } from "../loader.js";

const $ = window.jQuery;

//Inicializa el menu principal.
 
export function initMenuPage() {
  renderBalance("#current-balance", getBalance());
  bindNavigationButtons();
  bindLogoutButton();
}

// Registra eventos de navegacion con mensajes previos.
 
function bindNavigationButtons() {
  $(".navigation-button").on("click", (event) => {
    const button = $(event.currentTarget);
    const url = button.data("url");
    const screen = button.data("screen");

    if (!url || !screen) {
      return;
    }

    showMessage(`Redirigiendo a ${screen}.`, "info");
    showPageLoader(`Cargando ${screen}...`);

    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  });
}

// Registra el cierre de sesion.
 
function bindLogoutButton() {
  const logoutButton = $("#logout-button");

  if (logoutButton.length === 0) {
    return;
  }

  logoutButton.on("click", () => {
    logout();
    showPageLoader("Cerrando sesión...");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 500);
  });
}
