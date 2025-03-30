import dayjs from "dayjs";

import { apiConfig } from "./api-config.js";


/**
 * Fetches the schedules from the server and filters them by the selected date.
 * 
 * @param {Object} options - The filter options.
 * @param {string} options.date - The selected date to filter schedules.
 * @returns {Promise<Array>} A promise that resolves to an array of filtered schedules for the selected date.
 */
export async function fetchSchedulesByDay({ date }) {
    try {
        const schedules = await fetch(`${apiConfig.baseUrl}/schedules`);

        const data = await schedules.json();

        return data.filter(schedule => dayjs(date).isSame(schedule.date, "day"));
    } catch (error) {
        console.error("Error:", error);
        alert("Erro ao carregar os agendamentos");
    }
}