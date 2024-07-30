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

function classifyLandWater(imageData) {
    const threshold = 128; // Adjust threshold as needed
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const isLand = value > threshold;
        data[i] = isLand ? 0 : 0; // Red
        data[i + 1] = isLand ? 255 : 0; // Green
        data[i + 2] = isLand ? 0 : 255; // Blue
        data[i + 3] = 255; // Alpha
    }
    return imageData;
}

const imageData = ctx.getImageData(0, 0, width, height);
const classifiedData = classifyLandWater(imageData);
ctx.putImageData(classifiedData, 0, 0);

function generateCountries(imageData, numCountries) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const countries = new Array(numCountries).fill(0).map((_, i) => i + 1);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            if (data[index] === 0) { // Land
                const country = countries[Math.floor(Math.random() * countries.length)];
                data[index] = country * 20; // Assign random country ID
                data[index + 1] = country * 20;
                data[index + 2] = country * 20;
            }
        }
    }
    return imageData;
}

const numCountries = Math.random(2, 8); // Number of countries
const countryData = generateCountries(classifiedData, numCountries);
ctx.putImageData(countryData, 0, 0);
