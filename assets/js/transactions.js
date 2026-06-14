import { STORAGE_KEYS } from "./config.js";
import { getJson, setJson } from "./storage.js";

// obtiene movimientos validos desde localStorage

export function getTransactions(){
    const transactions = getJson(STORAGE_KEYS.transactions,[]);
    return Array.isArray(transactions) ? transactions.filter(isValidTransaction):[];
}


// guarda movimientos en localStorage.


export function saveTransactions(transaction){
    if(!Array.isArray(transaction)){
        return false
    }
    return setJson(STORAGE_KEYS.transactions,transaction);
}

// Crea un movimiento normalizado
export function createTransaction(transaction){
    return {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...transaction,
    }
}

// Registra un deposito al inicio de la lista de movimientos

export function registerDeposit(amount, description = "Deposito de dinero"){
    const transaction = createTransaction({
        type:"deposit",
        description,
        amount,
    });

    saveTransactions([transaction, ...getTransactions()]);
    return transaction;
}

// registra una transferencia al inicio de la lista de movimientos

export function registerTransfer(contact, amount){
    const transaction = createTransaction({
        type: "transfer",
        description: `Transferencia a ${contact.fullName}`,
        contactAlias: contact.alias,
        bank: contact.bank,
        amount,
    });

    saveTransactions([transaction,...getTransactions()]);
    return transaction;
}

// comprueba la forma minima de un movimiento guardado
 function isValidTransaction(transaction){
    return Boolean(
        transaction && 
            typeof transaction.id === "string" &&
            typeof transaction.type === "string" &&
            typeof transaction.description === "string" && 
            Number.isFinite(Number(transaction.amount)),
    );
 }
