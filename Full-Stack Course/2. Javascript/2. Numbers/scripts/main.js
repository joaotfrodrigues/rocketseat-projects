/**
 * DOM Elements
 */
const results = document.getElementById("results");
const form = document.getElementById("raffle");

const quantity = document.getElementById("numbers-quantity");
const from = document.getElementById("numbers-from");
const to = document.getElementById("numbers-to");
const repeat = document.getElementById("numbers-repeat");

const raffleAgain = document.getElementById("raffle-again");
const raffleAgainIcon = document.querySelector("#raffle-again img");

const resultNumbers = document.getElementById("result-numbers");
const numberRetries = document.getElementById("number-retries");
var reloads = 0;

var values = [];

/**
 * Form submission event listener.
 * Prevents form default behavior, hides the form, and shows results.
 * Validates input and runs the raffle function.
 * @param {Event} event - The form submission event
 */
form.onsubmit = (event) => {
    event.preventDefault();

    updateClass(form, "flex", "none");
    updateClass(results, "none", "flex");

    if (parseInt(quantity.value) < 1) {
        return;
    }    

    if (parseInt(to.value) - parseInt(from.value) < parseInt(quantity.value)) {
        quantity.value = parseInt(to.value) - parseInt(from.value);
    }

    updateRetries();
    raffle();
};

/**
 * Generates a random number in the specified range with options to allow or disallow repeats.
 * @param {number} min - The lower bound of the range
 * @param {number} max - The upper bound of the range
 * @returns {number} - A random number within the specified range
 */
function getRandomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (repeat.checked) {
        let value;
        // Ensure no duplicate numbers when repeat is checked
        while (true) {
            value = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!values.includes(value)) {
                values.push(value);
                break;
            }
        }
        return value;
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

/**
 * Creates a new span element to display a randomly generated number.
 * @param {number} number - The number to display
 */
function addNumber(number) {
    const span = document.createElement("span");

    span.classList.add("flex");
    span.classList.add("align-center");
    span.classList.add("justify-center");

    span.textContent = number;

    resultNumbers.append(span);
}

/**
 * Main raffle function that generates the random numbers and displays them with delays.
 */
function raffle() {
    for (let i = 0; i < quantity.value; i++) {
        setTimeout(() => {
            addNumber(getRandomInRange(from.value, to.value));
        }, 3250 * i);

        if (i === parseInt(quantity.value) - 1) {
            setTimeout(() => {
                updateClass(raffleAgain, "none", "flex");
            }, (3250 * parseInt(quantity.value)) + 250);
        }
    }
}

/**
 * Updates the class list of an element, removing the old display style and adding the new one.
 * @param {Element} element - The DOM element to update
 * @param {string} oldDisplay - The display style to remove
 * @param {string} newDisplay - The display style to add
 */
function updateClass(element, oldDisplay, newDisplay) {
    element.classList.remove(oldDisplay);
    element.classList.add(newDisplay);
}

/**
 * Increments the retry counter and updates the displayed number of retries.
 */
function updateRetries() {
    reloads++;
    numberRetries.textContent = reloads;
}

/**
 * Event listener for the "raffle again" button.
 * Resets the raffle, increments the retry counter, and reruns the raffle.
 */
raffleAgain.onclick = () => {
    updateClass(raffleAgain, "flex", "none");

    updateRetries();

    resultNumbers.innerHTML = "";

    raffle();
}
