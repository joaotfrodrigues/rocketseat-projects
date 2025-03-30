// Adds modal toggle
const newAppointmentBtn = document.getElementById("new-appointment");
const newAppointmentModal = document.getElementById("schedule-modal");

/**
 * Event listener for showing the modal when the "newAppointmentBtn" is clicked.
 * 
 * - Listens for a click event on the "newAppointmentBtn".
 * - When clicked, it shows the modal by calling `toggleModal` with type "show".
 * 
 * @param {Event} event - The click event triggered by the user.
 */
newAppointmentBtn.addEventListener("click", () => {
    toggleModal({ type: "show" });
});

/**
 * Event listener for closing the modal when a click occurs on an element with the "fixed" class.
 * 
 * - Listens for a click event on the document.
 * - If the clicked element has the class "fixed", it hides the modal by calling `toggleModal` with type "hide".
 * 
 * @param {Event} event - The click event triggered by the user.
 */
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("fixed")) toggleModal({ type: "hide" });
});

/**
 * Toggles the visibility of the appointment modal.
 *
 * @param {Object} options - The options object.
 * @param {string} options.type - The action type, either "show" or "hide".
 */
export function toggleModal({ type }) {
    newAppointmentModal.classList.remove(type === "show" ? "none" : "flex");
    newAppointmentModal.classList.add(type === "show" ? "flex" : "none");

    // Toggles the visibility of the appointment button
    newAppointmentBtn.classList.toggle("none");

    // Prevents scrolling when the modal is open
    document.body.classList.toggle("overflow-y-hidden");
}