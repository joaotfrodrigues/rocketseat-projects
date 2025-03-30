import { loadDateInputs } from "./date.js";


const modalInputs = [
    document.getElementById("owner-name"),
    document.getElementById("pet-name"),
    document.getElementById("owner-phone"),
    document.getElementById("appointment-description")
];

/**
 * Resets the modal by clearing all input fields and reloading date inputs.
 *
 * - Calls `loadDateInputs()` to reset date and time fields.
 * - Clears the values of all modal input fields.
 */
export function resetModal() {
    loadDateInputs();

    modalInputs.forEach(input => input.value = '');
}