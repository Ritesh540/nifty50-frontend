body {
    margin: 0;
    font-family: Arial;
    background: #0f172a;
    color: white;
}

header {
    background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
    text-align: center;
    padding: 15px;
}

.container {
    padding: 20px;
}

.controls {
    text-align: center;
    margin-bottom: 20px;
}

.controls input {
    padding: 8px;
    width: 200px;
}

button {
    padding: 8px 12px;
    margin: 5px;
    background: #0ea5e9;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.kpis {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.kpi {
    background: #1e293b;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    width: 30%;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
}

.card {
    background: #1e293b;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
}

.price-up {
    color: #22c55e;
}

.price-down {
    color: #ef4444;
}

.chart-container {
    margin-top: 30px;
}

footer {
    text-align: center;
    padding: 10px;
    background: #020617;
}
