import dayjs from "dayjs";

import { toggleModal } from "../modal.js";
import { resetModal } from "../modal-reset.js";
import { newSchedule } from "../../services/schedule-new.js";
import { loadSchedules } from "./load.js";


const petOwner = document.getElementById("owner-name");
const petName = document.getElementById("pet-name");
const ownerContact = document.getElementById("owner-phone");
const appointmentDescription = document.getElementById("appointment-description");
const appointmentDate = document.getElementById("appointment-day");
const appointmentHour = document.getElementById("appointment-hour");

const newAppointmentForm = document.querySelector("#schedule-modal form");


/**
 * Handles the form submission for scheduling a new appointment.
 *
 * @param {Event} e - The form submit event.
 */
newAppointmentForm.onsubmit = async (e) => {
    // Prevent the default behavior from the form (refreshing)
    e.preventDefault();

    try {
        // Verify is owner input is invalid
        const owner = petOwner.value.trim();
        if (!owner) {
            return alert("Informe o nome do tutor");
        }

        // Verify is pet input is invalid
        const pet = petName.value.trim();
        if (!pet) {
            return alert("Informe o nome do animal");
        }

        // Verify is contact input is invalid
        const contact = ownerContact.value.trim();
        if (!validatePhoneNumber({ number: contact })) {
            return alert("Adicione um número de telemóvel válido (com espaços a cada 3 dígitos)");
        }

        // Verify is description textarea is invalid
        const description = appointmentDescription.value.trim();
        if (!description) {
            return alert("Adicione uma descrição");
        }

        // Split the hours and minutes from hour input
        const [hours, minutes] = appointmentHour.value.split(":");

        // Add hour and minute to date to verify if is valid
        const date = dayjs.tz(appointmentDate.value, "Europe/Lisbon")
                  .add(hours, "hour")
                  .add(minutes, "minute");

        if (!validateDate({ date })) {
            return alert("Adicione um horário válido");
        }

        // Create new appointment by request
        await newSchedule({ owner, pet, contact, description, date });

        // Reset modal inputs
        resetModal();

        // Hide modal
        toggleModal({ type: "hide" });

        // Load schedules
        loadSchedules();
    } catch (error) {
        console.error(error);
        alert("Erro a criar um novo agendamento");
    }
}

/**
 * Validates a phone number format (XXX XXX XXX).
 *
 * @param {Object} options - The options object.
 * @param {string} options.number - The phone number to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validatePhoneNumber({ number }) {
    const phonePattern = /^\d{3} \d{3} \d{3}$/;

    if (phonePattern.test(number)) return true
    else return false;
}

/**
 * Checks if the given date is in the future.
 *
 * @param {Object} options - The options object.
 * @param {dayjs.Dayjs} options.date - The date to validate.
 * @returns {boolean} True if the date is in the future, false otherwise.
 */
function validateDate({ date }) {
    return dayjs(date).isAfter(dayjs());
}