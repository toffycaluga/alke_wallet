import { INITIAL_BALANCE, STORAGE_KEYS } from "./config.js";
import { getString, setString } from "./storage.js";
import { isValidAmount } from "./validators.js";
import { registerDeposit, registerTransfer } from "./transactions.js";

// Obtiene el saldo actual de la billetera.
 
export function getBalance() {
  const balance = Number(getString(STORAGE_KEYS.balance, INITIAL_BALANCE));
  return Number.isFinite(balance) && balance >= 0 ? balance : INITIAL_BALANCE;
}

// Guarda un nuevo saldo si es valido.
 
export function saveBalance(balance) {
  if (!Number.isFinite(balance) || balance < 0) {
    return false;
  }

  return setString(STORAGE_KEYS.balance, balance);
}

// Valida si el saldo disponible alcanza para un monto.
 
export function hasEnoughBalance(amount) {
  return isValidAmount(amount) && amount <= getBalance();
}

// Deposita dinero y registra el movimiento.
 
export function depositMoney(amount) {
  if (!isValidAmount(amount)) {
    throw new Error("Monto de depósito inválido.");
  }

  const newBalance = getBalance() + amount;
  saveBalance(newBalance);
  registerDeposit(amount);
  return newBalance;
}

// Envia dinero a un contacto y registra la transferencia.
 
export function sendMoney(contact, amount) {
  if (!contact) {
    throw new Error("Contacto inexistente.");
  }

  if (!isValidAmount(amount)) {
    throw new Error("Monto de transferencia inválido.");
  }

  if (!hasEnoughBalance(amount)) {
    throw new Error("Saldo insuficiente.");
  }

  const newBalance = getBalance() - amount;
  saveBalance(newBalance);
  registerTransfer(contact, amount);
  return newBalance;
}
