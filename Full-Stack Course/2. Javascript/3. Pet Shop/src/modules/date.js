import dayjs from "dayjs";

import { loadSchedules } from "./schedules/load.js";


/**
 * Initializes date and time input fields.
 * 
 * - Adds an event listener to all elements with the class "date" to open the date picker on click.
 * - Sets the current date as the default value for all date inputs and restricts past dates.
 * - Sets the current time as the default value for time inputs.
 */
export function loadDateInputs() {
    // Add event listener to all date inputs, to trigger opening the picker
    document.querySelectorAll(".date").forEach(dateElement => {
        dateElement.addEventListener("click", function () {
            this.showPicker()
        });
    });

    // Load the current date in the input's
    document.querySelectorAll("input[type='date']").forEach(dateElement => {
        const date = dayjs(new Date()).format("YYYY-MM-DD");

        dateElement.value = date;
        dateElement.min = date;
    });

    document.querySelector("input[type='time']").value = dayjs(new Date()).format("HH:mm");
}

document.getElementById("appointment-date").addEventListener("change", loadSchedules);

loadDateInputs();