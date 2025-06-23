Aplikasi Kalkulator & Pengelola Tugas Sekolah
Aplikasi CLI sederhana berbasis Node.js yang menggabungkan kalkulator dengan tampilan kotak ASCII dan sistem pengelolaan tugas sekolah dengan penyimpanan data lokal.

Fitur
Kalkulator Sederhana

* ✨ Tampilan grafis berbasis ASCII yang menyerupai kalkulator fisik
* 🧮 Operasi matematika dasar: penjumlahan, pengurangan, perkalian, pembagian
* ⚠️ Validasi input dan penanganan error (pembagian dengan nol, input bukan angka)
* 🔄 Opsi untuk melakukan perhitungan berulang

Pengelola Tugas Sekolah

* ✏️ Menambahkan tugas baru dengan tenggat waktu opsional
* 📋 Melihat daftar semua tugas tersimpan
* ✅ Menandai tugas sebagai "Selesai"
* 🗑️ Menghapus tugas yang tidak diperlukan
* 💾 Penyimpanan data persistensi menggunakan JSON lokal
* 🔄 Animasi loading saat memuat/menyimpan data

Prasyarat
Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:

* Node.js (v12.0.0 atau lebih baru)
* Terminal/Command Prompt yang mendukung karakter Unicode dan ANSI escape codes

Instalasi

1. Klon Repositori
```bash
git clone https://github.com/siyoell12/tugas-sekolah.git
cd aplikasi-sekolah
```
2. Instal Dependensi
```bash
npm install
```
3. Jalankan Aplikasi
```bash
node tugasssekolah.js
```

Menu Utama
Aplikasi akan menampilkan menu utama dengan tiga opsi:
--- APLIKASI SEKOLAH ---
1. Kalkulator Sederhana
2. Pengelola Tugas Sekolah
3. Keluar
------------------------------

Kalkulator
Pilih opsi 1 untuk mengakses kalkulator. Anda akan melihat tampilan kalkulator dengan "layar" dan "tombol" yang dibuat menggunakan karakter ASCII:

Ikuti petunjuk untuk memasukkan angka dan operator. Hasil perhitungan akan ditampilkan di "layar" kalkulator.
Pengelola Tugas
Pilih opsi 2 untuk mengakses pengelola tugas. Submenu akan ditampilkan:
--- PENGELOLA TUGAS SEKOLAH ---
1. Tambah Tugas Baru
2. Lihat Semua Tugas
3. Tandai Tugas Selesai
4. Hapus Tugas
5. Kembali ke Menu Utama
------------------------------

Tambah Tugas Baru

* Masukkan nama tugas (wajib)
* Masukkan tenggat waktu (opsional, format: YYYY-MM-DD)

Lihat Semua Tugas
Menampilkan daftar tugas dengan format:
--- DAFTAR TUGAS ---
1. ID: 1 | Nama: Matematika PR Bab 3 | Tenggat: 2025-06-30 | Status: [BELUM SELESAI]
2. ID: 2 | Nama: Fisika Laporan Praktikum | Tenggat: 2025-07-05 | Status: [SELESAI]
--------------------

Tandai Tugas Selesai / Hapus Tugas

* Pilih tugas berdasarkan ID
* Konfirmasi perubahan

Struktur Data
Tugas disimpan dalam file assignments.json dengan struktur:
```bash
[
  {
    "id": 1,
    "name": "Matematika PR Bab 3",
    "dueDate": "2025-06-30",
    "completed": false,
    "createdAt": "2023-06-23T12:34:56.789Z"
  },
  {
    "id": 2,
    "name": "Fisika Laporan Praktikum",
    "dueDate": "2025-07-05",
    "completed": true,
    "createdAt": "2023-06-24T09:12:34.567Z"
  }
]
```
Kustomisasi
Mengubah Tampilan Kalkulator
Edit fungsi drawCalculatorScreen() dan drawCalculatorButtons() untuk mengubah tampilan kalkulator.
Menambahkan Operasi Matematika
Tambahkan case baru di switch statement dalam fungsi askCalculatorInput().
Ubah Animasi Loading
Modifikasi array frames di bagian atas file untuk menggunakan karakter Unicode yang berbeda.
Pemecahan Masalah
Karakter Unicode Tidak Tampil Dengan Benar
Pastikan terminal Anda mendukung Unicode dan menggunakan font yang kompatibel (seperti Consolas, DejaVu Sans Mono, atau Source Code Pro).
Animasi Loading Tidak Berfungsi
Beberapa terminal (terutama Command Prompt Windows lama) mungkin tidak mendukung ANSI escape codes. Coba gunakan terminal alternatif seperti Windows Terminal, PowerShell, atau WSL.
Node.js Tidak Ditemukan
Pastikan Node.js terinstal dengan benar dan ada dalam PATH sistem Anda. Verifikasi dengan menjalankan node -v di terminal.


Pengembangan Mendatang
Fitur yang direncanakan untuk versi mendatang:

* Kalkulator: Menambahkan operasi matematika lebih kompleks (sin, cos, log, dll.)
* Pengelola Tugas: Sistem pengingat untuk tugas yang mendekati tenggat waktu
* UI: Versi GUI menggunakan Electron
* Database: Opsi untuk sinkronisasi dengan layanan cloud


Catatan: Aplikasi ini dikembangkan sebagai proyek pendidikan dan dapat digunakan sebagai contoh pengembangan aplikasi CLI sederhana dengan Node.js.# Aplikasi Kalkulator & Pengelola Tugas Sekolah
Aplikasi CLI sederhana berbasis Node.js yang menggabungkan kalkulator dengan tampilan kotak ASCII dan sistem pengelolaan tugas sekolah dengan penyimpanan data lokal.

## Buy Me a Coffee

- **EVM:** 0x905d0505Ec007C9aDb5CF005535bfcC5E43c0B66
- **TON:** UQCFO7vVP0N8_K4JUCfqlK6tsofOF4KEhpahEEdXBMQ-MVQL
- **SOL:** BmqfjRHAKXUSKATuhbjPZfcNciN3J2DA1tqMgw9aGMdj

Thank you for visiting this repository, don't forget to contribute in the form of follows and stars.
If you have questions, find an issue, or have suggestions for improvement, feel free to contact me or open an *issue* in this GitHub repository.


