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

function generateHeightmap(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const value = Math.random() * 255;
            data[index] = value;      // Red
            data[index + 1] = value;  // Green
            data[index + 2] = value;  // Blue
            data[index + 3] = 255;    // Alpha
        }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
}


const heightmapCanvas = document.getElementById('heightmap');
const width = 256;
const height = 256;

const heightmap = generateHeightmap(width, height);
heightmapCanvas.width = width;
heightmapCanvas.height = height;
const ctx = heightmapCanvas.getContext('2d');
ctx.drawImage(heightmap, 0, 0);

