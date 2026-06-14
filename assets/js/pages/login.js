import { login, validateCredentials } from "../auth.js";
import { showMessage } from "../ui.js";
import { showButtonLoader, showPageLoader } from "../loader.js";

const $ = window.jQuery;

// Inicializa la pagina de login.
 
export function initLoginPage() {
  const loginForm = $("#login-form");
  const emailInput = $("#email");
  const passwordInput = $("#password");

  if (
    loginForm.length === 0 ||
    emailInput.length === 0 ||
    passwordInput.length === 0
  ) {
    return;
  }

  loginForm.on("submit", (event) => {
    event.preventDefault();

    const result = validateCredentials(emailInput.val(), passwordInput.val());
    const submitButton = loginForm.find('button[type="submit"]');

    if (!result.ok) {
      showMessage(result.message, "danger");
      return;
    }

    showButtonLoader(submitButton, "Ingresando...");
    login();
    showMessage(result.message, "success");

    setTimeout(() => {
      showPageLoader("Cargando menú...");
    }, 900);

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1200);
  });
}
