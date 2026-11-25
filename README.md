# ElectroMonitor — Starter v0.1

Website awal untuk project monitoring energi listrik.

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka folder `ElectroMonitor_Starter` di VS Code, atau buka `index.html` langsung di browser.
3. Pastikan internet aktif untuk memuat Chart.js dari CDN.
4. Isi tegangan, arus, dan durasi, lalu tekan **Simpan pengukuran**.

## Fitur saat ini
- Input manual tegangan, arus, dan durasi.
- Perhitungan daya dan energi.
- Grafik daya.
- Riwayat di LocalStorage browser.
- Layout responsif.

## Rumus
- Daya sederhana: P = V × I
- Energi: E (kWh) = P (W) × waktu (jam) / 1000

Catatan: Untuk sistem AC nyata, daya aktif umumnya P = V × I × faktor daya (untuk kondisi sinusoidal dan nilai RMS). Jangan sambungkan rangkaian listrik bertegangan tinggi untuk pengujian project pemula; gunakan data simulasi atau pengukuran yang dilakukan dengan pengawasan dan alat yang sesuai.

## Roadmap
1. Rapikan dashboard dan validasi input.
2. Tambahkan tarif listrik yang bisa diatur.
3. Export CSV.
4. Tambahkan database online dan autentikasi.
5. Integrasikan sensor/ESP32 atau sumber data lain.
