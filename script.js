let carsManaged = 0;
let trafficPower = 1;
let officers = 0;

let lightUpgradeCost = 10;
let officerCost = 50;

function saveGame() {
    localStorage.setItem("trafficClickerSave", JSON.stringify({
        carsManaged,
        trafficPower,
        officers,
        lightUpgradeCost,
        officerCost
    }));
}

function loadGame() {
    let save = JSON.parse(localStorage.getItem("trafficClickerSave"));
    if (save) {
        carsManaged = save.carsManaged;
        trafficPower = save.trafficPower;
        officers = save.officers;
        lightUpgradeCost = save.lightUpgradeCost;
        officerCost = save.officerCost;
    }
    updateUI();
}

function updateUI() {
    document.getElementById("coins").innerText = carsManaged;
    document.getElementById("cpc").innerText = trafficPower;
    document.getElementById("auto").innerText = officers;
    document.getElementById("clickCost").innerText = lightUpgradeCost;
    document.getElementById("autoCost").innerText = officerCost;
}

function clickCoin() {
    carsManaged += trafficPower;
    updateUI();
    saveGame();
}

function buyUpgrade(type) {
    if (type === "click" && carsManaged >= lightUpgradeCost) {
        carsManaged -= lightUpgradeCost;
        trafficPower++;
        lightUpgradeCost = Math.floor(lightUpgradeCost * 1.5);
    }

    if (type === "auto" && carsManaged >= officerCost) {
        carsManaged -= officerCost;
        officers++;
        officerCost = Math.floor(officerCost * 1.7);
    }

    updateUI();
    saveGame();
}

function autoLoop() {
    carsManaged += officers;
    updateUI();
    saveGame();
}

setInterval(autoLoop, 1000);

function startGame() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
}

function openSettings() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("settingsScreen").classList.remove("hidden");
}

function goToMenu() {
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("settingsScreen").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");
}

function resetGame() {
    localStorage.removeItem("trafficClickerSave");
    carsManaged = 0;
    trafficPower = 1;
    officers = 0;
    lightUpgradeCost = 10;
    officerCost = 50;
    updateUI();
}

loadGame();
