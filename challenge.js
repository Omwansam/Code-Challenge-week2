document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearButton = document.getElementById('clearButton');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            listItem.classList.toggle('purchased', item.purchased);

            
            listItem.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                updateLocalStorage();
                renderList();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newName = prompt('Edit item name:', item.name);
                if (newName) {
                    items[index].name = newName;
                    updateLocalStorage();
                    renderList();
                }
            });
            listItem.appendChild(editButton);

            shoppingList.appendChild(listItem);
        });
    };

    const updateLocalStorage = () => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    };

    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            updateLocalStorage();
            renderList();
            itemInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        updateLocalStorage();
        renderList();
    });

    renderList();
});