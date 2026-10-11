# Undangan Pernikahan Digital — Kris & Zira

Catatan lengkap tentang struktur proyek ini dan semua yang sudah di-setup, supaya mudah diedit atau dijadikan dasar versi baru nanti.

## 1. Struktur File

| File | Fungsi |
|---|---|
| [index.html](index.html) | Struktur halaman (section hero, acara, cerita, galeri, RSVP, dll) |
| [config.js](config.js) | **Satu-satunya file yang perlu diedit** untuk ganti isi: nama mempelai, tanggal, lokasi acara, cerita cinta, galeri foto, info hadiah, musik, kutipan, dan URL Google Sheets RSVP |
| [script.js](script.js) | Logic: render konten dari `config.js`, parse nama tamu dari URL, countdown, RSVP, dll — biasanya tidak perlu diubah kecuali menambah fitur |
| [style.css](style.css) | Semua styling/tampilan |
| `assets/images/` | Foto mempelai, galeri "Our Moments", QRIS |
| [apps-script/Code.gs](apps-script/Code.gs) | Kode Google Apps Script untuk terima data RSVP dan simpan ke Google Sheets |
| [.claude/launch.json](.claude/launch.json) | Konfigurasi server lokal (`python -m http.server 8080`) untuk testing di komputer ini |

## 2. Cara Mengedit Isi Undangan

Edit [config.js](config.js) — semua teks, tanggal, lokasi, galeri, dll ada di objek `WEDDING_CONFIG`. Tidak perlu sentuh `index.html`/`script.js` untuk perubahan konten biasa.

Setelah edit, naikkan versi cache di [index.html:260-261](index.html:260) (`config.js?v=3` → `v=4`, dst) supaya browser tamu tidak memakai file lama yang ter-cache.

## 3. Link Personalisasi per Tamu

Situs membaca parameter URL `?to=Nama` untuk menampilkan nama tamu (lihat `initGuestName()` di [script.js](script.js)). Format link:
```
https://krisossy.github.io/undangan-kris-zira./?to=Nama%20Tamu
```
Spasi di nama di-encode jadi `%20`.

## 4. Daftar Tamu & Link (Excel)

File: `C:\Users\krisn\Downloads\daftar nama undangan.xlsx`, sheet "Daftar Nama", kolom:
- **Undangan** — nama tamu
- **Link** — link personal undangan (auto-generate dari nama)
- **Konfirmasi Kehadiran** — status kehadiran (placeholder "Belum Konfirmasi", bukan live-sync dari Google Sheets — lihat bagian 6)

Script Python untuk generate ulang semua link kalau ada tamu baru atau domain berubah:
```python
import openpyxl, urllib.parse
wb = openpyxl.load_workbook('daftar nama undangan.xlsx')
ws = wb['Daftar Nama']
BASE = 'https://krisossy.github.io/undangan-kris-zira./'
for row in range(2, ws.max_row+1):
    name = ws.cell(row=row, column=2).value
    if not name:
        continue
    ws.cell(row=row, column=3).value = BASE + '?to=' + urllib.parse.quote(name)
wb.save('daftar nama undangan.xlsx')
```
(Pastikan file Excel ditutup dulu sebelum dijalankan, kalau tidak akan gagal "Permission denied".)

## 5. Testing Lokal

Jalankan server lokal dari folder proyek:
```bash
python -m http.server 8080
```
Lalu buka `http://localhost:8080/?to=Nama%20Tes` di browser.

## 6. RSVP Otomatis → Google Sheets

- Spreadsheet Google Sheets dengan Apps Script di-deploy sebagai Web App (akun: `krisnovian09@gmail.com`), menerima POST dan menulis baris baru ke sheet "RSVP".
- URL Web App disimpan di `WEDDING_CONFIG.rsvp.scriptUrl` dalam [config.js](config.js).
- Saat tamu submit form RSVP di situs, `sendRSVPToSheet()` di [script.js](script.js) mengirim: nama tamu (dari link `?to=`), nama pengisi form, status kehadiran, dan ucapan.
- **Catatan:** ini sheet terpisah dari Excel `daftar nama undangan.xlsx` — tidak otomatis sinkron balik ke kolom "Konfirmasi Kehadiran" di Excel. Untuk memantau kehadiran real-time, cek langsung Google Sheet "RSVP".
- Kalau kode Apps Script perlu diubah/redeploy: buka Google Sheets → Extensions → Apps Script, edit, lalu **Deploy → Manage deployments → Edit (pensil) → Deploy** (pakai deployment yang sama supaya URL tidak berubah).

## 7. Hosting (GitHub Pages)

- Repo: `https://github.com/krisossy/undangan-kris-zira.` (perhatikan ada titik di akhir nama repo — bukan typo, nama repo-nya memang begitu)
- Branch: `main`, GitHub Pages source: root folder
- URL live: `https://krisossy.github.io/undangan-kris-zira./`
- Folder `assets/images/Our Moments/` (foto mentah HEIC, tidak dipakai situs) di-exclude lewat `.gitignore` supaya repo ringan.

### Cara deploy ulang setelah edit:
```bash
cd "C:\Users\krisn\Documents\wedding-invitation"
git add -A
git commit -m "Update: <deskripsi perubahan>"
git push
```
GitHub Pages otomatis rebuild ~1-2 menit setelah push.

## 8. Membuat Versi Baru (acara lain / pasangan lain)

1. Copy seluruh folder ini ke folder baru.
2. Edit [config.js](config.js) — ganti semua data mempelai, tanggal, lokasi, galeri, dll.
3. Ganti foto di `assets/images/`.
4. Buat Google Sheet + Apps Script baru (ulangi langkah di bagian 6) kalau mau RSVP terpisah, lalu update `rsvp.scriptUrl`.
5. Buat repo GitHub baru, push, aktifkan Pages (ulangi langkah bagian 7).
6. Generate ulang daftar tamu & link dengan script di bagian 4, ganti `BASE` ke domain baru.
