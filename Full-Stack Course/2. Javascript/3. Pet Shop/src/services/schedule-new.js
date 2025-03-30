import { apiConfig } from "./api-config.js";


/**
 * Creates a new appointment by sending a request to the server.
 *
 * @param {Object} options - The appointment details.
 * @param {string} options.owner - The owner's name.
 * @param {string} options.pet - The pet's name.
 * @param {string} options.contact - The owner's contact number.
 * @param {string} options.description - The appointment description.
 * @param {string} options.date - The appointment date in ISO format.
 * @returns {Promise<void>} Resolves when the request is completed.
 */
export async function newSchedule({ owner, pet, contact, description, date }) {
    try {
        const id = String(new Date().getTime());

        await fetch(`${apiConfig.baseUrl}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, owner, pet, contact, description, date })
        });

        alert("Agendamento realizado com sucesso!");
    } catch (error) {
        console.error("Error:", error);
        alert("Erro ao criar um novo agendamento");
    }
}