// Current Stock Data
const inventory = [
    { size: "S", stock: 5 },
    { size: "M", stock: 12 },
    { size: "L", stock: 3 },
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
    if (!selectedSize) {
        alert('Please select a size before proceeding.');
        return;
    }
    const hasLanyard = document.getElementById('lanyardToggle').checked;
    // store booking so details page can read it if needed
    sessionStorage.setItem('booking', JSON.stringify({ size: selectedSize, lanyard: hasLanyard }));
    // redirect to details page
    window.location.href = 'details.html';
};

// Initialize the page
renderSizes();