async function loadData() {
    const res = await fetch("https://bb0kg06t4g.execute-api.us-east-1.amazonaws.com/content");
    const data = await res.json();

    document.getElementById("output").innerText = data.message;
}

loadData();
