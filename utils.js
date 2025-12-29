/* ==================================================
   WEATHER CODE MAPPER (Open-Meteo)
   https://open-meteo.com/en/docs
================================================== */

const WEATHER_MAP = {
    0:  { label: 'Cerah', type: 'clear' },

    1:  { label: 'Sebagian Cerah', type: 'cloudy' },
    2:  { label: 'Berawan', type: 'cloudy' },
    3:  { label: 'Mendung', type: 'cloudy' },

    45: { label: 'Berkabut', type: 'fog' },
    48: { label: 'Kabut Tebal', type: 'fog' },

    51: { label: 'Gerimis Ringan', type: 'rain' },
    53: { label: 'Gerimis', type: 'rain' },
    55: { label: 'Gerimis Lebat', type: 'rain' },

    61: { label: 'Hujan Ringan', type: 'rain' },
    63: { label: 'Hujan', type: 'rain' },
    65: { label: 'Hujan Lebat', type: 'rain' },

    80: { label: 'Hujan Lokal', type: 'rain' },
    81: { label: 'Hujan Lebat', type: 'rain' },
    82: { label: 'Hujan Ekstrem', type: 'storm' },

    95: { label: 'Badai Petir', type: 'storm' },
    96: { label: 'Badai Petir + Hujan Es', type: 'storm' },
    99: { label: 'Badai Ekstrem', type: 'storm' }
};

/* ==================================================
   PUBLIC FUNCTIONS
================================================== */

/**
 * Convert weather code to UI condition
 * @param {number} code
 * @returns {{label: string, type: string}}
 */
function mapWeatherCode(code) {
    return WEATHER_MAP[code] || {
        label: 'Cuaca Tidak Diketahui',
        type: 'cloudy'
    };
}

/**
 * Format date to localized day (ID)
 * @param {string} date
 * @returns {string}
 */
function formatDay(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'short'
    });
}

/**
 * Capitalize text (utility helper)
 * @param {string} str
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ==================================================
   FUTURE EXTENSIONS (READY)
--------------------------------------------------
 - mapAirQuality()
 - mapUVRisk()
 - weatherSeverityScore()
 - seasonalThemeMapper()
================================================== */
