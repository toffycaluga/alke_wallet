const $ = window.jQuery;

const OVERLAY_ID = "page-loader";
const BUTTON_LABEL_KEY = "loaderOriginalLabel";

export function initPageTransition() {
  document.body?.classList.add("page-ready");
}

export function showPageLoader(message = "Cargando...") {
  const existingLoader = $(`#${OVERLAY_ID}`);

  if (existingLoader.length > 0) {
    existingLoader.find(".loader-message").text(message);
    existingLoader.addClass("is-visible");
    return;
  }

  const loader = $(`
    <div id="${OVERLAY_ID}" class="page-loader is-visible" role="status" aria-live="polite">
      <div class="page-loader__content">
        <div class="spinner-border text-primary" aria-hidden="true"></div>
        <p class="loader-message mb-0"></p>
      </div>
    </div>
  `);

  loader.find(".loader-message").text(message);
  $("body").append(loader);
}

export function hidePageLoader() {
  $(`#${OVERLAY_ID}`).removeClass("is-visible");
}

export function showButtonLoader(button, message = "Procesando...") {
  const buttonElement = $(button);

  if (buttonElement.length === 0 || buttonElement.prop("disabled")) {
    return;
  }

  buttonElement.data(BUTTON_LABEL_KEY, buttonElement.html());
  buttonElement.prop("disabled", true);
  buttonElement.html(`
    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
    <span>${message}</span>
  `);
}

export function restoreButton(button) {
  const buttonElement = $(button);
  const originalLabel = buttonElement.data(BUTTON_LABEL_KEY);

  if (buttonElement.length === 0 || originalLabel === undefined) {
    return;
  }

  buttonElement.html(originalLabel);
  buttonElement.prop("disabled", false);
  buttonElement.removeData(BUTTON_LABEL_KEY);
}
