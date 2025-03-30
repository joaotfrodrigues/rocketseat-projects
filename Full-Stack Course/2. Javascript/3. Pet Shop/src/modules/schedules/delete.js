import { deleteAppointment } from "../../services/schedule-delete.js";
import { loadSchedules } from "./load.js";


/**
 * Event listener for removing an appointment when the remove button is clicked.
 * 
 * - Listens for a click event on the document.
 * - If the clicked element has the class "appointment-remove", it will:
 *   - Find the closest list item (`<li>`) element.
 *   - Extract the appointment ID from the data attribute.
 *   - Call `deleteAppointment` to remove the appointment.
 *   - Reload the schedules by calling `loadSchedules`.
 * 
 * @param {Event} event - The click event.
 */
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("appointment-remove")) {
        const item = event.target.closest("li");
        
        const { id } = item.dataset;

        await deleteAppointment({ id });

        await loadSchedules();
    }
});