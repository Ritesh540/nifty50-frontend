// 🔥 Demo NIFTY 50-like data (no backend needed)

const demoData = [
    { symbol: "RELIANCE", openPrice: 2480, closePrice: 2505 },
    { symbol: "TCS", openPrice: 3750, closePrice: 3810 },
    { symbol: "INFY", openPrice: 1490, closePrice: 1475 },
    { symbol: "HDFCBANK", openPrice: 1620, closePrice: 1640 },
    { symbol: "ICICIBANK", openPrice: 980, closePrice: 965 },
    { symbol: "SBIN", openPrice: 610, closePrice: 625 },
    { symbol: "LT", openPrice: 3400, closePrice: 3450 },
    { symbol: "ITC", openPrice: 420, closePrice: 415 }
];

let chart;

function loadStocks() {

    displayStocks(demoData);
    drawChart(demoData);
    showInsights(demoData);
}

function displayStocks(data) {

    let container = document.getElementById("stockContainer");
    container.innerHTML = "";

    data.forEach(stock => {

        let isUp = stock.closePrice > stock.openPrice;
        let change = (stock.closePrice - stock.openPrice).toFixed(2);

        container.innerHTML += `
            <div class="card">
                <h3>${stock.symbol}</h3>
                <p>₹${stock.closePrice}</p>
                <p class="${isUp ? 'price-up' : 'price-down'}">
                    ${isUp ? "▲ +" : "▼ "}${change}
                </p>
            </div>
        `;
    });
}

function drawChart(data) {

    const labels = data.map(s => s.symbol);
    const prices = data.map(s => s.closePrice);

    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Closing Prices",
                data: prices
            }]
        }
    });
}

function showInsights(data) {

    let topGainer = data.reduce((a, b) =>
        (b.closePrice - b.openPrice) > (a.closePrice - a.openPrice) ? b : a
    );

    let topLoser = data.reduce((a, b) =>
        (b.closePrice - b.openPrice) < (a.closePrice - a.openPrice) ? b : a
    );

    let insightHTML = `
        <div class="card">
            <h2>📊 Insights</h2>
            <p>🚀 Top Gainer: <b>${topGainer.symbol}</b></p>
            <p>📉 Top Loser: <b>${topLoser.symbol}</b></p>
        </div>
    `;

    document.getElementById("stockContainer").innerHTML += insightHTML;
}
