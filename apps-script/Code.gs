/**
 * Google Apps Script - Web App untuk menerima RSVP dari Undangan Digital
 * Kris Ossy Novian & Fazira Leonita Agustiningsih
 *
 * CARA PAKAI:
 * 1. Buka https://sheets.google.com, buat Spreadsheet baru (misal: "RSVP Kris & Zira").
 * 2. Di spreadsheet itu, buka menu Extensions > Apps Script.
 * 3. Hapus kode default di editor, lalu tempel (paste) seluruh isi file ini.
 * 4. Klik Deploy > New deployment.
 *    - Pilih tipe: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, izinkan (Authorize access) dengan akun Google Anda.
 * 6. Copy URL deployment yang muncul (bentuknya seperti
 *    https://script.google.com/macros/s/XXXXXXXX/exec)
 * 7. Tempel URL itu ke file config.js, pada bagian:
 *    rsvp: { scriptUrl: "URL_ANDA_DI_SINI" }
 *
 * Setiap tamu mengisi RSVP di undangan, datanya otomatis masuk sebagai baris baru
 * di sheet "RSVP" pada spreadsheet ini.
 *
 * Semua tamu juga bisa saling melihat Ucapan & Doa: saat halaman undangan dibuka,
 * script.js memanggil endpoint ini (doGet) untuk mengambil seluruh ucapan yang
 * tersimpan di sheet, lalu menampilkannya sebagai buku tamu bersama.
 */

const SHEET_NAME = "RSVP";
const HEADERS = ["Timestamp", "Nama Tamu (dari Link)", "Nama Pengisi Form", "Konfirmasi Kehadiran", "Ucapan & Doa"];

function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.guestName || "",
    data.name || "",
    data.status || "",
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  let comments = [];

  if (lastRow > 1) {
    const rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    comments = rows
      .map(row => ({
        timestamp: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
        guestName: row[1] || "",
        name: row[2] || "",
        status: row[3] || "",
        message: row[4] || ""
      }))
      .filter(c => c.name && c.message)
      .reverse(); // newest first
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok", comments: comments }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}
