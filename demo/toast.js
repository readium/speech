// Live regions announce only what is added after they are in the DOM, so both are in each page's markup.
const regions = {
  status: document.getElementById("toast-status"),
  alert: document.getElementById("toast-alert")
};

// Errors (`urgent`) interrupt the screen reader, engine switches wait for it. Toasts stay until dismissed.
export function showToast(message, { urgent = false } = {}) {
  const toast = document.createElement("div");
  toast.className = urgent ? "toast toast-error" : "toast";

  const text = document.createElement("p");
  text.textContent = message;

  const close = document.createElement("button");
  close.type = "button";
  close.className = "toast-close";
  close.setAttribute("aria-label", "Dismiss notification");
  close.textContent = "×";
  close.addEventListener("click", () => toast.remove());

  toast.append(text, close);
  regions[urgent ? "alert" : "status"].append(toast);
}
