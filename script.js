const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const dishCards = document.querySelectorAll(".dish-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    dishCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const reservationForm = document.querySelector(".booking-form");
const reservationDate = document.querySelector("#guest-date");
const reservationMessage = document.querySelector(".form-message");
const toast = document.querySelector(".toast");
let toastTimeout;
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10);

reservationDate.min = localToday;

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  reservationMessage.textContent = "";

  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const name = formData.get("name").trim();
  const date = new Date(`${formData.get("date")}T12:00:00`).toLocaleDateString(
    undefined,
    { dateStyle: "long" },
  );
  const partySize = formData.get("party");
  const time = formData.get("time");
  const confirmation = `Thanks, ${name}! Your table request for ${partySize} ${
    partySize === "1" ? "guest" : "guests"
  } on ${date} at ${time} is ready. Give us a call at (212) 555-0184 to confirm.`;

  reservationMessage.textContent =
    "Thanks! Your request is ready—call (212) 555-0184 and we'll confirm your table.";
  toast.textContent = confirmation;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 6000);
});