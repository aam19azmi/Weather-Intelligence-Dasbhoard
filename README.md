# 🌦️ Weather Intelligence Dashboard

![Project Banner](https://sourcecodejournal.dev/assets/projects/Weather_Intelligence.png)
**Weather Intelligence Dashboard** adalah aplikasi web statis yang menampilkan informasi cuaca **real-time** dan **forecast 7 hari** dengan visualisasi **animasi cuaca murni CSS** (tanpa gambar, tanpa canvas, tanpa library eksternal).

Proyek ini dibangun sebagai **open-source showcase** dengan fokus pada:
- UI/UX modern
- Performance
- SEO (GitHub Pages + subdomain)
- Public API tanpa login

🌐 **Live Demo**  
👉 https://weather.sourcecodejournal.dev/

---

## ✨ Fitur Utama

- 📍 **Deteksi lokasi otomatis** (Geolocation API)
- 🌡️ **Cuaca real-time** (suhu, angin, UV)
- 📅 **Forecast 7 hari**
- ☁️🌧️🌫️ **Animasi cuaca murni CSS**
  - Awan bergerak
  - Hujan dinamis
  - Kabut
- ⚠️ **Weather Intelligence Alerts**
  - UV tinggi
  - Angin kencang
  - Potensi hujan
- 🚀 **Tanpa API Key / Login**
- 📱 **Responsive Design**
- 🔍 **SEO-ready** (sitemap, robots, schema)

---

## 🧠 Teknologi yang Digunakan

- **HTML5** (Semantic & Accessibility)
- **CSS3**
  - CSS Variables
  - Keyframes Animation
  - Glassmorphism
- **Vanilla JavaScript (ES6+)**
- **Open-Meteo API** (Weather data)
- **OpenStreetMap Nominatim** (Reverse geocoding)
- **GitHub Pages** (Hosting)

> ❌ Tidak menggunakan framework  
> ❌ Tidak menggunakan gambar cuaca  
> ❌ Tidak memerlukan backend

---

## 📂 Struktur Proyek

```txt
/
├── index.html        # Main HTML (SEO optimized)
├── style.css         # Global layout & base theme
├── weather.css       # Animated weather scenes (CSS-only)
├── scripts.js        # Weather logic & UI control
├── utils.js          # Weather code mapping & helpers
├── sitemap.xml       # SEO sitemap
├── robots.txt        # Search engine rules
└── README.md
🔌 API yang Digunakan (Public & Gratis)
🌦️ Open-Meteo
Website: https://open-meteo.com

Tanpa API key

Data cuaca real-time & forecast

🌍 OpenStreetMap Nominatim
Reverse geocoding lokasi

Tanpa login

🎨 Konsep UI/UX
Scene-based UI
Tampilan berubah sesuai kondisi cuaca (clear, cloudy, rain, fog, storm)

CSS-first animation
Semua efek visual dibuat dengan CSS → ringan & cepat

Human-readable weather
Weather code API diterjemahkan ke istilah manusia

⚙️ Cara Menjalankan Secara Lokal
git clone https://github.com/aam19azmi/weather-intelligence-dashboard.git
cd weather-intelligence-dashboard
Buka index.html langsung di browser
atau gunakan Live Server (VS Code).

📈 SEO & Deployment
Optimized untuk GitHub Pages

Mendukung custom subdomain

Sudah dilengkapi:

Meta tags

Open Graph

Schema.org

sitemap.xml

robots.txt

👨‍💻 Author
Azmi Jalaluddin Amron
🌐 https://sourcecodejournal.dev

Jika kamu suka proyek ini:

⭐ Star repo ini

🍴 Fork & modifikasi

🧠 Gunakan sebagai referensi belajar

📜 Lisensi
MIT License
Bebas digunakan untuk personal & komersial dengan atribusi.
