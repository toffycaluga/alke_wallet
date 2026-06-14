
// normaliza texto para busquedas y comparaciones no sensibles a mayusculas

export function normalizeText(value){
    return String(value ?? "").trim().toLowerCase();
}



// Verifica si un valor esta vacío
export function isEmpty(value){
    return String(value ?? "").trim() === "";
}

// Valida formato básico de email

export function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? "").trim());
}

