import { apiConfig } from "./api-config.js";


/**
 * Deletes an appointment by sending a DELETE request to the server.
 * 
 * @param {Object} options - The appointment details.
 * @param {string} options.id - The ID of the appointment to delete.
 * @returns {Promise<void>} Resolves when the appointment is successfully deleted.
 */
export async function deleteAppointment({ id }) {
    try {
        await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
            method: "DELETE",
        });

        alert("Agendamento eliminado com sucesso!");
    } catch (error) {
        console.error("Error:", error);
        alert("Erro ao eliminar o agendamento");
    }
}