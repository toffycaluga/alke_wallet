const $ = window.jQuery;

//  Crea un elemento HTML con jQuery y asigna propiedades seguras
 
export function createElement(tagName, options = {}) {
  const element = $(`<${tagName}>`);

  if (options.className) {
    element.addClass(options.className);
  }

  if (options.textContent !== undefined) {
    element.text(options.textContent);
  }

  Object.entries(options.attributes ?? {}).forEach(([name, value]) => {
    element.attr(name, value);
  });

  return element;
}

// Limpia el contenido de un contenedor.
 
export function clearContainer(container) {
  const element = $(container);

  if (element.length === 0) {
    return;
  }

  element.empty();
}

// Muestra una alerta de Bootstrap en el contenedor indicado.
 
export function showMessage(
  message,
  type = "success",
  containerSelector = "#message-container",
) {
  const messageContainer = $(containerSelector);

  if (messageContainer.length === 0) {
    console.warn(message);
    return;
  }

  const alertElement = createElement("div", {
    className: `alert alert-${type} alert-dismissible fade show`,
    attributes: { role: "alert" },
  });

  const messageText = document.createTextNode(message);
  const closeButton = createElement("button", {
    className: "btn-close",
    attributes: {
      type: "button",
      "data-bs-dismiss": "alert",
      "aria-label": "Cerrar",
    },
  });

  alertElement.append(messageText, closeButton);
  messageContainer.empty().append(alertElement);
}

// Formatea un monto en pesos chilenos.
 
export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

// Formatea una fecha ISO para mostrarla al usuario.
 
export function formatDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

// Renderiza el saldo en un elemento si existe.
 
export function renderBalance(element, balance) {
  const balanceElement = $(element);

  if (balanceElement.length === 0) {
    return;
  }

  balanceElement.text(formatCurrency(balance));
}
