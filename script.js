const API_URL = "https://your-backend-url/api/stocks"; // 🔥 replace this

let chart;

async function loadStocks() {

    document.getElementById("loader").classList.remove("hidden");

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        displayStocks(data);
        drawChart(data);

    } catch (err) {
        alert("Error fetching data");
        console.error(err);
    }

    document.getElementById("loader").classList.add("hidden");
}

function displayStocks(data) {

    let container = document.getElementById("stockContainer");
    container.innerHTML = "";

    data.forEach(stock => {

        let trend = stock.openPrice < stock.closePrice ? "price-up" : "price-down";

        container.innerHTML += `
            <div class="card">
                <h3>${stock.symbol}</h3>
                <p>₹${stock.closePrice}</p>
                <p class="${trend}">
                    ${trend === "price-up" ? "▲ Up" : "▼ Down"}
                </p>
            </div>
        `;
    });
}

function drawChart(data) {

    const labels = data.map(s => s.symbol);
    const prices = data.map(s => s.closePrice);

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Prices",
                data: prices
            }]
        }
    });
}
