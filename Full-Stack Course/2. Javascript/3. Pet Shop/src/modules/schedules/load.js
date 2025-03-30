import dayjs from "dayjs";

import { fetchSchedulesByDay } from "../../services/schedule-fetch.js";
import { createAppointmentItem } from "./constructor.js";


const selectedDate = document.getElementById("appointment-date");

const morningAppointments = document.querySelector("#morning-appointments ul");
const afternoonAppointments = document.querySelector("#afternoon-appointments ul");
const nightAppointments = document.querySelector("#night-appointments ul");

/**
 * Loads the schedules for the selected date and categorizes them by time of day (morning, afternoon, night).
 * 
 * - Clears the current lists of appointments for each time slot.
 * - Fetches the schedules for the selected date.
 * - For each schedule:
 *   - Formats the appointment time.
 *   - Creates a new appointment item element.
 *   - Categorizes the appointment into the correct time slot (morning, afternoon, night).
 * 
 * @returns {Promise<void>} Resolves when the schedules have been loaded and displayed.
 */
export async function loadSchedules() {
    morningAppointments.innerHTML = "";
    afternoonAppointments.innerHTML = "";
    nightAppointments.innerHTML = "";

    const schedules = await fetchSchedulesByDay({ date: selectedDate.value });

    schedules.forEach(schedule => {
        const hours = dayjs(schedule.date).format("HH:mm");

        const appointmentItem = createAppointmentItem({
            id: schedule.id,
            hour: hours,
            pet: schedule.pet,
            owner: schedule.owner,
            description: schedule.description
        });

        const [hour] = hours.split(":");
        if (hour <= 12) {
            morningAppointments.append(appointmentItem);
        } else if (hour <= 18) {
            afternoonAppointments.append(appointmentItem);
        } else {
            nightAppointments.append(appointmentItem);
        }
    });
}

loadSchedules();