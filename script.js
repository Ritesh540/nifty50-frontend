let originalData = [
    { symbol: "RELIANCE", openPrice: 2480, closePrice: 2505 },
    { symbol: "TCS", openPrice: 3750, closePrice: 3810 },
    { symbol: "INFY", openPrice: 1490, closePrice: 1475 },
    { symbol: "HDFCBANK", openPrice: 1620, closePrice: 1640 },
    { symbol: "ICICIBANK", openPrice: 980, closePrice: 965 },
    { symbol: "SBIN", openPrice: 610, closePrice: 625 },
    { symbol: "LT", openPrice: 3400, closePrice: 3450 },
    { symbol: "ITC", openPrice: 420, closePrice: 415 }
];

let currentData = [...originalData];
let chart;

window.onload = () => loadDashboard(currentData);

function loadDashboard(data) {
    displayStocks(data);
    updateKPIs(data);
    drawChart(data);
}

function displayStocks(data) {
    let container = document.getElementById("stockContainer");
    container.innerHTML = "";

    data.forEach(stock => {
        let change = stock.closePrice - stock.openPrice;
        let isUp = change > 0;

        container.innerHTML += `
        <div class="card">
            <h3>${stock.symbol}</h3>
            <p>₹${stock.closePrice}</p>
            <p class="${isUp ? 'price-up' : 'price-down'}">
                ${isUp ? "▲" : "▼"} ${change}
            </p>
        </div>`;
    });
}

function updateKPIs(data) {
    let avg = (data.reduce((sum, s) => sum + s.closePrice, 0) / data.length).toFixed(2);

    let topG = data.reduce((a,b)=> (b.closePrice-b.openPrice) > (a.closePrice-a.openPrice) ? b : a);
    let topL = data.reduce((a,b)=> (b.closePrice-b.openPrice) < (a.closePrice-a.openPrice) ? b : a);

    document.getElementById("avgPrice").innerText = "₹" + avg;
    document.getElementById("topGainer").innerText = topG.symbol;
    document.getElementById("topLoser").innerText = topL.symbol;
}

function drawChart(data) {
    let ctx = document.getElementById("chart");

    if(chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.map(d=>d.symbol),
            datasets: [{
                label: "Stock Prices",
                data: data.map(d=>d.closePrice)
            }]
        }
    });
}

function filterStocks() {
    let value = document.getElementById("search").value.toUpperCase();
    let filtered = originalData.filter(s => s.symbol.includes(value));
    currentData = filtered;
    loadDashboard(filtered);
}

function sortGainers() {
    currentData.sort((a,b)=> (b.closePrice-b.openPrice) - (a.closePrice-a.openPrice));
    loadDashboard(currentData);
}

function sortLosers() {
    currentData.sort((a,b)=> (a.closePrice-a.openPrice) - (b.closePrice-b.openPrice));
    loadDashboard(currentData);
}

function resetData() {
    currentData = [...originalData];
    loadDashboard(currentData);
}
