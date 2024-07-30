if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            (registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            },
            (error) => {
                console.log('Service Worker registration failed:', error);
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const countryInfo = {
        name: 'USA',
        armyStrength: 100,
        economy: 50
    };

    const countryNameElem = document.getElementById('country-name');
    const armyStrengthElem = document.getElementById('army-strength');
    const economyElem = document.getElementById('economy');

    function updateDisplay() {
        countryNameElem.textContent = countryInfo.name;
        armyStrengthElem.textContent = countryInfo.armyStrength;
        economyElem.textContent = countryInfo.economy;
    }

    document.getElementById('increase-army').addEventListener('click', () => {
        countryInfo.armyStrength += 10;
        updateDisplay();
    });

    document.getElementById('decrease-army').addEventListener('click', () => {
        countryInfo.armyStrength = Math.max(0, countryInfo.armyStrength - 10);
        updateDisplay();
    });

    document.getElementById('increase-economy').addEventListener('click', () => {
        countryInfo.economy += 10;
        updateDisplay();
    });

    document.getElementById('decrease-economy').addEventListener('click', () => {
        countryInfo.economy = Math.max(0, countryInfo.economy - 10);
        updateDisplay();
    });

    updateDisplay();
});
