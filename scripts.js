/* ===============================
   DOM ELEMENTS
================================ */
const scene = document.getElementById('weather-scene');

const cityEl = document.getElementById('city');
const tempEl = document.getElementById('temp');
const conditionEl = document.getElementById('condition');
const windEl = document.getElementById('wind');
const uvEl = document.getElementById('uv');
const aqiEl = document.getElementById('aqi');

const forecastContainer = document.getElementById('forecast');
const alertsContainer = document.getElementById('alerts');

/* ===============================
   INIT
================================ */
initWeather();
let currentAQI = null;

/* ===============================
   MAIN FLOW
================================ */
function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude, longitude } = pos.coords;
                fetchWeather(latitude, longitude);
                fetchLocationName(latitude, longitude);
                fetchAirQuality(latitude, longitude);
            },
            () => fallbackLocation()
        );
    } else {
        fallbackLocation();
    }
}

/* ===============================
   FETCH WEATHER
================================ */
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,wind_speed_10m,uv_index&daily=temperature_2m_max,weathercode&timezone=auto`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();
        renderCurrent(data.current);
        renderForecast(data.daily);
    } catch (err) {
        console.error(err);
    }
}

/* ===============================
   LOCATION NAME (REVERSE GEO)
================================ */
async function fetchLocationName(lat, lon) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        cityEl.textContent =
            data.address.city ||
            data.address.town ||
            data.address.state ||
            'Lokasi Anda';
    } catch {
        cityEl.textContent = 'Lokasi Anda';
    }
}

/* ===============================
   FALLBACK LOCATION (JAKARTA)
================================ */
function fallbackLocation() {
    const lat = -6.2;
    const lon = 106.816666;
    fetchWeather(lat, lon);
    fetchAirQuality(lat, lon);
    cityEl.textContent = 'Jakarta';
}

/* ===============================
   RENDER CURRENT WEATHER
================================ */
function renderCurrent(current) {
    tempEl.textContent = Math.round(current.temperature_2m);
    windEl.textContent = `${current.wind_speed_10m} km/j`;
    uvEl.textContent = current.uv_index ?? '--';

    const weather = mapWeatherCode(current.weathercode);
    conditionEl.textContent = weather.label;

    updateWeatherScene(weather.type);

    // INTELLIGENCE
    const uvRisk = mapUVRisk(current.uv_index);
    const severity = weatherSeverityScore({
        wind: current.wind_speed_10m,
        uv: current.uv_index,
        storm: weather.storm,
        rain: weather.type === 'rain'
    });

    renderAlerts({
        uvRisk,
        severity,
        weatherType: weather.type,
        airQuality: mapAirQuality(currentAQI || 50)
    });
}


/* ===============================
   FORECAST
================================ */
function renderForecast(daily) {
    forecastContainer.innerHTML = '';

    daily.time.slice(0, 7).forEach((date, i) => {
        const weather = mapWeatherCode(daily.weathercode[i]);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${formatDay(date)}</div>
            <div class="forecast-temp">${Math.round(
                daily.temperature_2m_max[i]
            )}°C</div>
            <div class="forecast-desc">${weather.label}</div>
        `;
        forecastContainer.appendChild(card);
    });
}

/* ===============================
   WEATHER SCENE HANDLER
================================ */
function updateWeatherScene(type) {
    scene.className = `weather-scene ${type}`;
    scene.innerHTML = '';

    if (type === 'cloudy') createClouds();
    if (type === 'rain' || type === 'storm') createRain();
    if (type === 'fog') createFog();
}

/* ===============================
   WEATHER ELEMENTS
================================ */
function createClouds() {
    for (let i = 0; i < 4; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = `${10 + i * 15}%`;
        cloud.style.animationDelay = `${i * 10}s`;
        scene.appendChild(cloud);
    }
}

function createRain() {
    const layer = document.createElement('div');
    layer.className = 'rain-layer';

    for (let i = 0; i < 120; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random()}s`;
        drop.style.animationDuration = `${0.5 + Math.random()}s`;
        layer.appendChild(drop);
    }

    scene.appendChild(layer);
}

function createFog() {
    const fog = document.createElement('div');
    fog.className = 'fog-layer';
    scene.appendChild(fog);
}

/* ===============================
   ALERTS (UX INTELLIGENCE)
================================ */
function renderAlerts({ uvRisk, severity, weatherType, airQuality }) {
    alertsContainer.innerHTML = '';
    alertsContainer.hidden = true;

    const messages = [];

    if (airQuality && airQuality.level !== 'good') {
        messages.push(`🌫️ Kualitas udara: ${airQuality.label}`);
    }

    if (uvRisk.level === 'Tinggi' || uvRisk.level === 'Ekstrem') {
        messages.push(`☀️ UV ${uvRisk.level}: ${uvRisk.advice}`);
    }

    if (weatherType === 'rain' || weatherType === 'storm') {
        messages.push('🌧️ Potensi hujan, siapkan payung.');
    }

    if (severity.level !== 'Aman') {
        messages.push(`⚠️ Tingkat cuaca: ${severity.level}`);
        alertsContainer.style.borderColor = severity.color;
    }

    if (messages.length) {
        alertsContainer.hidden = false;
        alertsContainer.innerHTML = messages.join('<br>');
    }
}

/* ===============================
   FETCH AIR QUALITY (OpenAQ)
================================ */
async function fetchAirQuality(lat, lon) {
    try {
        const res = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi&timezone=auto`
        );

        if (!res.ok) throw new Error('AQI API error');

        const data = await res.json();
        const aqi = data.hourly.us_aqi[0];

        currentAQI = aqi;
        renderAirQuality(aqi);

        return aqi;
    } catch {
        aqiEl.textContent = '--';
        return null;
    }
}

