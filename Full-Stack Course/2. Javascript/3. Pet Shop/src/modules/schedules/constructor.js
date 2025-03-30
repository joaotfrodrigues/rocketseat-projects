/**
 * Creates an appointment list item element.
 *
 * @param {Object} options - The appointment details.
 * @param {string} options.id - The appointment ID.
 * @param {string} options.hour - The appointment hour.
 * @param {string} options.pet - The pet's name.
 * @param {string} options.owner - The owner's name.
 * @param {string} options.description - The appointment description.
 * @returns {HTMLElement} The created list item element.
 */
export function createAppointmentItem({ id, hour, pet, owner, description }) {
    const item = createElement({ tag: "li", className: "item"});
    item.setAttribute("data-id", id);

    const itemHour = createElement({ tag: "span", className: "hour", content: hour});

    const p = createElement({ tag: "p" });
    const petName = createElement({ tag: "span", className: "name", content: pet});
    const ownerName = createElement({ tag: "span", className: "owner", content: `/ ${owner}`});

    p.append(petName, ownerName);

    const itemDescription = createElement({ tag: "p", className: "description", content: description });
    const removeButton = createElement({ tag: "button", className: "remove", content: "Remover agendamento", type: "button" })

    item.append(itemHour, p, itemDescription, removeButton);

    return item;
}

/**
 * Creates an HTML element with specified properties.
 *
 * @param {Object} options - The element properties.
 * @param {string} options.tag - The HTML tag name.
 * @param {string} [options.className] - The optional class name.
 * @param {string} [options.content] - The optional text content.
 * @param {string} [options.type] - The optional button type.
 * @returns {HTMLElement} The created HTML element.
 */
function createElement({ tag, className, content, type }) {
    const element = document.createElement(tag);

    if (className) element.classList.add(`appointment-${className}`);

    if (content) element.textContent = content;

    if (type) element.type = type;

    return element;
}