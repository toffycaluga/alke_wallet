
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


// Convierte un valor de formulario a monto numerico
export function parseAmount(value){
    return Number(value);
}

// Valida que un monto sea numerico y positivo

export function isValidAmount(amount){
    return Number.isFinite(amount) && amount > 0;
}


//  Valida que un cbu tenga exactamente 22 digitos
export function isValidCbu(cbu){
    return /^\d{22}$/.test(String(cbu ?? "").trim())
}

// valida que todos los campos indicados tengan contenido

export function validateRequiredFields(fields){
    const emptyFields = Object.entries(fields)
        .filter(([,value])=> isEmpty(value))
        .map(([fieldName])=> fieldName);

        return {
            isValid: emptyFields.length === 0,
            emptyFields,
        };
}