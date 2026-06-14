import { STORAGE_KEYS } from "./config.js";
import { getJson, setJson } from "./storage.js";
import { isValidCbu, normalizeText, validateRequiredFields } from "./validators.js";

// Obtiene contactos validos desde localStorage.
 
export function getContacts() {
  const contacts = getJson(STORAGE_KEYS.contacts, []);
  return Array.isArray(contacts) ? contacts.filter(isValidContact) : [];
}

// Guarda contactos en localStorage.
 
export function saveContacts(contacts) {
  if (!Array.isArray(contacts)) {
    return false;
  }

  return setJson(STORAGE_KEYS.contacts, contacts);
}

// Busca contactos por nombre o alias.
 
export function searchContacts(searchTerm = "") {
  const normalizedSearch = normalizeText(searchTerm);

  return getContacts().filter((contact) => {
    return (
      normalizeText(contact.fullName).includes(normalizedSearch) ||
      normalizeText(contact.alias).includes(normalizedSearch)
    );
  });
}

// Busca un contacto por id.
 
export function findContactById(contactId) {
  return getContacts().find((contact) => contact.id === contactId) ?? null;
}

// Comprueba duplicados por CBU o alias.
 
export function contactExists(cbu, alias) {
  const normalizedAlias = normalizeText(alias);

  return getContacts().some((contact) => {
    return contact.cbu === cbu || normalizeText(contact.alias) === normalizedAlias;
  });
}

// Crea y guarda un nuevo contacto.
 
export function createContact(contactData) {
  const contact = normalizeContact(contactData);
  const requiredValidation = validateRequiredFields(contact);

  if (!requiredValidation.isValid) {
    return {
      ok: false,
      message: "Debes completar todos los datos del contacto.",
    };
  }

  if (!isValidCbu(contact.cbu)) {
    return {
      ok: false,
      message: "El CBU debe contener exactamente 22 números.",
    };
  }

  if (contactExists(contact.cbu, contact.alias)) {
    return {
      ok: false,
      message: "Ya existe un contacto con ese CBU o alias.",
    };
  }

  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
  };

  saveContacts([...getContacts(), newContact]);

  return {
    ok: true,
    message: "Contacto agregado correctamente.",
    contact: newContact,
  };
}

// Normaliza datos ingresados en el formulario.
 
function normalizeContact(contactData) {
  return {
    fullName: String(contactData.fullName ?? "").trim(),
    cbu: String(contactData.cbu ?? "").trim(),
    alias: String(contactData.alias ?? "").trim(),
    bank: String(contactData.bank ?? "").trim(),
  };
}

// Comprueba la forma minima de un contacto guardado.
 
function isValidContact(contact) {
  return Boolean(
    contact &&
      typeof contact.id === "string" &&
      typeof contact.fullName === "string" &&
      typeof contact.cbu === "string" &&
      typeof contact.alias === "string" &&
      typeof contact.bank === "string",
  );
}
