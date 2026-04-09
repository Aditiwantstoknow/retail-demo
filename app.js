let expenses = [];
let budgets = {};

function showTab(tab) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(tab).classList.add("active");

    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
}

/* ADD EXPENSE */
function addExpense() {
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let note = document.getElementById("note").value;

    let date = new Date().toLocaleString();

    let expense = { amount, category, note, date };
    expenses.push(expense);

    renderTable();
    updateStats();
    updateCharts();
}

/* TABLE */
function renderTable() {
    let table = document.getElementById("recordsTable");
    table.innerHTML = "";

    expenses.forEach(e => {
        table.innerHTML += `
        <tr>
            <td>${e.category}</td>
            <td>${e.note}</td>
            <td>${e.date}</td>
            <td>₹${e.amount}</td>
        </tr>`;
    });
}

/* BUDGET */
function setBudget(category, value) {
    budgets[category] = parseFloat(value);
    updateStats();
}

/* STATS */
function updateStats() {
    let total = expenses.reduce((a, b) => a + b.amount, 0);
    let totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

    document.getElementById("totalSpent").innerText = "₹" + total;
    document.getElementById("totalBudget").innerText = "₹" + totalBudget;
    document.getElementById("remaining").innerText = "₹" + (totalBudget - total);

    updateTimeline(total, totalBudget);
}

/* TIMELINE */
function updateTimeline(total, budget) {
    let days = new Date().getDate();
    let percent = (days / 30) * 100;

    document.getElementById("timelineFill").style.width = percent + "%";
    document.getElementById("timelineText").innerText =
        "Day " + days + "/30 | Budget Used: ₹" + total;
}

/* CHART */
let chart = new Chart(document.getElementById("chart"), {
    type: 'doughnut',
    data: {
        labels: ["Food", "Transport", "Entertainment"],
        datasets: [{
            data: [0,0,0],
            backgroundColor: ["#ff6384","#36a2eb","#ffce56"]
        }]
    }
});

function updateCharts() {
    let data = { Food:0, Transport:0, Entertainment:0 };

    expenses.forEach(e => {
        data[e.category] += e.amount;
    });

    chart.data.datasets[0].data = Object.values(data);
    chart.update();
}
