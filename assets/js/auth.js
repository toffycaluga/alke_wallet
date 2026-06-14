import { PROTECTED_PAGES, SESSIONS_KEYS, VALID_USER } from "./config.js";
import { isEmpty, isValidEmail } from "./validators.js";

// valida credenciales contra el usuario de prueba

export function validateCredentials(email, password) {
  const normalizedEmail = String(email ?? "").trim();
  const normalizedPassword = String(password ?? "").trim();

  if (isEmpty(normalizedEmail) || isEmpty(normalizedPassword)) {
    return {
      ok: false,
      message: "Debes completar todos los campos.",
    };
  }

  if (!isValidEmail(normalizedEmail)) {
    return {
      ok: false,
      message: "Debes ingresar un email valido.",
    };
  }

  if (
    normalizedEmail !== VALID_USER.email ||
    normalizedPassword !== VALID_USER.password
  ) {
    return {
      ok: false,
      message: "El email o la contraseña son incorrectos.",
    };
  }

  return {
    ok: true,
    message: "Inicio de sesión exitoso. Redirigiendo al menú principal.",
  };
}

// inicia sesion en sessionStorage.
export function login() {
  sessionStorage.setItem(SESSIONS_KEYS.authenticated, "true");
}

// Cierra sesion sin borrar datos persistidos

export function logout() {
  sessionStorage.removeItem(SESSIONS_KEYS.authenticated);
}

// comprueba si existe sesion activa
export function isAuthenticated() {
  return sessionStorage.getItem(SESSIONS_KEYS.authenticated) === "true";
}

export function protectPage(currentPage){
    const needsAuthentication = PROTECTED_PAGES.includes(currentPage);

    if (needsAuthentication && !isAuthenticated()){
        window.location.href="login.html";
        return false
    }
    return true;
}
