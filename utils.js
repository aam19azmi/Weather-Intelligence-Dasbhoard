/* ==================================================
   WEATHER CODE MAPPER (Open-Meteo)
================================================== */

const WEATHER_MAP = {
    0:  { label: 'Cerah', type: 'clear', storm: false },

    1:  { label: 'Sebagian Cerah', type: 'cloudy', storm: false },
    2:  { label: 'Berawan', type: 'cloudy', storm: false },
    3:  { label: 'Mendung', type: 'cloudy', storm: false },

    45: { label: 'Berkabut', type: 'fog', storm: false },
    48: { label: 'Kabut Tebal', type: 'fog', storm: false },

    51: { label: 'Gerimis Ringan', type: 'rain', storm: false },
    53: { label: 'Gerimis', type: 'rain', storm: false },
    55: { label: 'Gerimis Lebat', type: 'rain', storm: false },

    61: { label: 'Hujan Ringan', type: 'rain', storm: false },
    63: { label: 'Hujan', type: 'rain', storm: false },
    65: { label: 'Hujan Lebat', type: 'rain', storm: false },

    80: { label: 'Hujan Lokal', type: 'rain', storm: false },
    81: { label: 'Hujan Lebat', type: 'rain', storm: false },
    82: { label: 'Hujan Ekstrem', type: 'storm', storm: true },

    95: { label: 'Badai Petir', type: 'storm', storm: true },
    96: { label: 'Badai + Hujan Es', type: 'storm', storm: true },
    99: { label: 'Badai Ekstrem', type: 'storm', storm: true }
};

/* ==================================================
   CORE MAPPERS
================================================== */

function mapWeatherCode(code) {
    return WEATHER_MAP[code] || {
        label: 'Cuaca Tidak Diketahui',
        type: 'cloudy',
        storm: false
    };
}

/* ==================================================
   AIR QUALITY (SIMULATED INTELLIGENCE)
   (Ready when AQI API is added)
================================================== */
function mapAirQuality(aqi) {
    if (aqi <= 50) return { label: 'Baik', level: 'good', color: '#22c55e' };
    if (aqi <= 100) return { label: 'Sedang', level: 'moderate', color: '#eab308' };
    if (aqi <= 150) return { label: 'Tidak Sehat', level: 'unhealthy', color: '#f97316' };
    return { label: 'Berbahaya', level: 'danger', color: '#ef4444' };
}

/* ==================================================
   UV RISK
================================================== */
function mapUVRisk(uv) {
    if (uv < 3) return { level: 'Rendah', advice: 'Aman beraktivitas.' };
    if (uv < 6) return { level: 'Sedang', advice: 'Gunakan topi atau kacamata.' };
    if (uv < 8) return { level: 'Tinggi', advice: 'Gunakan tabir surya.' };
    return { level: 'Ekstrem', advice: 'Hindari matahari langsung.' };
}

/* ==================================================
   WEATHER SEVERITY SCORE
================================================== */
function weatherSeverityScore({ wind, uv, storm, rain }) {
    let score = 0;

    if (wind >= 40) score += 2;
    if (rain) score += 2;
    if (uv >= 8) score += 1;
    if (storm) score += 3;

    if (score <= 2) return { level: 'Aman', color: '#22c55e' };
    if (score <= 4) return { level: 'Waspada', color: '#facc15' };
    return { level: 'Bahaya', color: '#ef4444' };
}

/* ==================================================
   SEASONAL THEME
================================================== */
function seasonalThemeMapper() {
    const month = new Date().getMonth() + 1;

    if ([11,12,1,2,3].includes(month)) return 'rainy';
    if ([6,7,8].includes(month)) return 'dry';
    return 'normal';
}

/* ==================================================
   DATE FORMAT
================================================== */
function formatDay(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'short'
    });
}

/* ===============================
   FETCH AIR QUALITY (OpenAQ)
================================ */
function estimateAQI(pm25, pm10) {
    if (pm25 == null && pm10 == null) return null;
    if (pm25 >= 150 || pm10 >= 250) return 200;
    if (pm25 >= 55 || pm10 >= 150) return 150;
    if (pm25 >= 35 || pm10 >= 100) return 100;
    if (pm25 >= 12 || pm10 >= 50) return 75;
    return 40;
}

function renderAirQuality(aqi) {
    if (!aqi) {
        aqiEl.textContent = '--';
        return;
    }

    const air = mapAirQuality(aqi);
    aqiEl.textContent = air.label;
    aqiEl.style.color = air.color;
}
