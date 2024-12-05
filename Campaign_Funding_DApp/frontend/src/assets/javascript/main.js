window.onload = function () {
  // Enable Bootstrap tooltips
  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
};
