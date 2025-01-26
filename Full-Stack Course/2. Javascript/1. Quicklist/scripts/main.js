const addItemForm = document.getElementById('add-item-form');
const addItemInput = document.getElementById('new-item-name');
const itemsList = document.querySelector('.items-list');
const removedWarning = document.querySelector('.removed-warning');

var itemsCount = 0;

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (addItemInput.value == '') {
        return;
    }

    createListItem(addItemInput.value);

    addItemInput.value = '';
});

function createListItem(text) {
    itemsCount++;

    const li = document.createElement('li');
    const checkbox = createCheckbox(itemsCount);
    const span = document.createElement('span');
    const removeBtn = createRemoveBtn(itemsCount);

    span.textContent = text;

    li.id = `checkbox-${itemsCount}`;

    li.append(checkbox);
    li.append(span);
    li.append(removeBtn);

    itemsList.append(li);
}

function createCheckbox(itemNumber) {
    const checkboxDiv = document.createElement('div');
    const checkboxInput = document.createElement('input');
    const checkboxLabel = document.createElement('label');

    checkboxDiv.classList.add('checkbox');

    checkboxInput.type = 'checkbox';
    checkboxInput.id = `checkbox-${itemNumber}`;

    checkboxLabel.id = id = `checkbox-${itemNumber}`;

    checkboxDiv.append(checkboxInput);
    checkboxDiv.append(checkboxLabel);

    return checkboxDiv;
}

function createRemoveBtn(itemNumber) {
    const btn = document.createElement('button');
    const img = document.createElement('img');

    btn.dataset.itemNumber = itemNumber;

    img.src = 'assets/icons/trash.svg';
    img.alt = 'Remover item';

    btn.append(img);

    addRemoveEventToItem(btn);

    return btn;
}

function addRemoveEventToItem(element) {
    element.addEventListener('click', (e) => {
        const itemNumber = e.currentTarget.dataset.itemNumber;
        
        document.getElementById(`checkbox-${itemNumber}`).remove();

        removedWarning.classList.remove('none');
    });
}

document.getElementById('close-warning').addEventListener('click', () => removedWarning.classList.add('none'));