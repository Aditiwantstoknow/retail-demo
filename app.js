async function loadData() {
    const res = await fetch("YOUR_API_GATEWAY_URL");
    const data = await res.json();

    document.getElementById("output").innerText = data.message;
}

loadData();
