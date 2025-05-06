# Panduan Kontribusi untuk Signify Web

Berikut adalah panduan untuk berkontribusi pada repository `signify-web` - Aplikasi bahasa isyarat berbasis AI.

## Struktur Branch

- Gunakan format berikut untuk membuat branch baru: `feature/nama-fitur`
- Contoh: `feature/auth-page` atau `feature/landing-page`

# Panduan Pengembangan
## Setup Awal
1. Clone repository
   ```bash
   git clone https://github.com/signifyindonesia/signify-web.git
   cd signify-web
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Jalankan development server
   ```bash
   npm run dev
   ```

## Setup Awal
1. Buat branch baru dari `main`
   ```bash
   git checkout -b feature/nama-fitur
   ```
2. Lakukan perubahan dan commit dengan pesan yang deskriptif
   ```bash
   git add .
   git commit -m "feat: tambah halaman autentikasi"
   ```
3. Push branch ke remote
   ```bash
   git push origin feature/nama-fitur
   ```
4. Buat Pull Request ke branch `main`

## Konvensi Kode
1. Penamaan Komponen: Gunakan PascalCase untuk komponen React (contoh: `SignLanguageTranslator.jsx`)
2. Penamaan File: Gunakan kebab-case untuk file non-komponen (contoh: `auth-service.js`)
3. Styling: Gunakan TailwindCSS untuk styling utama. Buat file CSS terpisah hanya jika diperlukan.
4. ESLint: Pastikan kode lolos pengecekan ESLint (`npm run lint`)

## Script Penting
- `npm run dev`: Jalankan development server
- `npm run build`: Build untuk produksi
- `npm run lint`: Lint kode
- `npm run preview`: Preview build produksi

Teknologi Utama
1. **React v19**: Library UI utama
2. **Vite**: Build tool dan development server
3. **TailwindCSS**: Utility-first CSS framework
4. **React Router v7**: Client-side routing
5. **ESLint**: Linting tool untuk menjaga kualitas kode

# Panduan Commit
Gunakan <a href="https://www.conventionalcommits.org/" target=_blank>Conventional Commits</a> untuk pesan commit:
- feat: Untuk fitur baru
- fix: Untuk perbaikan bug
- docs: Untuk perubahan dokumentasi
- style: Untuk perubahan formatting
- refactor: Untuk perubahan kode yang bukan fitur atau bug fix
- test: Untuk menambah atau memperbaiki test
- chore: Untuk perubahan build process atau tools

Contoh:
```
feat: tambah halaman terjemahan bahasa isyarat
fix: perbaiki bug pada deteksi gesture
docs: update README dengan panduan kontribusi
```