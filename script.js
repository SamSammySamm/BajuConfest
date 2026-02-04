// Current Stock Data
const inventory = [
    { size: "S", stock: 5 },
    { size: "M", stock: 12 },
    { size: "L", stock: 0 }, // This will be greyed out
    { size: "XL", stock: 2 }
];

let selectedSize = null;

const sizeGrid = document.getElementById('sizeGrid');
const bookBtn = document.getElementById('bookBtn');
const summaryText = document.getElementById('summaryText');

// Render buttons based on inventory
function renderSizes() {
    sizeGrid.innerHTML = '';

    inventory.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';

        // Logic for Out of Stock
        if (item.stock <= 0) {
            btn.classList.add('disabled');
            btn.innerHTML = `<span>${item.size}</span><span class="stock-tag">Out of Stock</span>`;
        } else {
            btn.innerHTML = `<span>${item.size}</span><span class="stock-tag">${item.stock} available</span>`;
            btn.onclick = () => selectSize(item.size, btn);
        }

        sizeGrid.appendChild(btn);
    });
}

function selectSize(size, element) {
    // Remove selected class from all
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));

    // Select new size
    element.classList.add('selected');
    selectedSize = size;

    // Update UI
    bookBtn.disabled = false;
    summaryText.innerHTML = `Selected Size: <strong>${size}</strong>`;
}

bookBtn.onclick = () => {
    const hasLanyard = document.getElementById('lanyardToggle').checked;
    alert(`Success!\nBooking: Size ${selectedSize}\nLanyard: ${hasLanyard ? 'Added' : 'None'}`);
};

// Initialize the page
renderSizes();