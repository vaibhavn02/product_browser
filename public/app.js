let cursor = null;
let category = "";

async function loadProducts(reset = false) {
    if (reset) {
        cursor = null;
        document.getElementById("products").innerHTML = "";
    }

    category = document.getElementById("category").value;

    let url = `/products?limit=20`;

    if (cursor) url += `&cursor=${cursor}`;
    if (category) url += `&category=${category}`;

    const res = await fetch(url);
    const data = await res.json();

    data.data.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>Category: ${p.category}</p>
            <p>Price: ₹${p.price}</p>
        `;
        document.getElementById("products").appendChild(div);
    });

    cursor = data.nextCursor;
}

function loadMore() {
    loadProducts(false);
}

// initial load
loadProducts(true);
