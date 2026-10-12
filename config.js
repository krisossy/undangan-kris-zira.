/**
 * CONFIGURASI UNDANGAN NIKAH DIGITAL
 * Kris Ossy Novian & Fazira Leonita Agustiningsih
 */

const WEDDING_CONFIG = {
  // Pasangan Mempelai
  couple: {
    groom: {
      fullName: "Kris Ossy Novian",
      shortName: "Kris",
      parents: "Putra dari Bapak Misran & Ibu Fitriya",
      image: "assets/images/groom.jpg"
    },
    bride: {
      fullName: "Fazira Leonita Agustiningsih",
      shortName: "Zira",
      parents: "Putri dari Bapak Toni Hariadi & Ibu Rosmawati Ritonga",
      image: "assets/images/bride.jpg"
    },
    heroImage: "assets/images/couple_clean.jpg?v=2"
  },

  // Tanggal & Waktu Acara (Format ISO untuk Countdown)
  eventDateISO: "2026-11-15T14:00:00+07:00",
  formattedDate: "Minggu, 15 November 2026",
  headerDate: "15.11.2026",

  // Detail Acara
  events: [
    {
      title: "Akad Nikah",
      icon: "fa-ring",
      day: "Minggu",
      date: "15 November 2026",
      time: "14.00 - 15.00 WIB",
      venue: "Grand Ballroom Tropical House",
      address: "Jl. Ir. Soekarno Hatta, Kutoanyar, Panggungrejo, Kec. Tulungagung, Kab. Tulungagung, Jawa Timur 66211",
      mapUrl: "https://www.google.com/maps/dir//Tropical+House,+Jl.+Ir.+Soekarno+Hatta,+Kutoanyar,+Panggungrejo,+Kec.+Tulungagung,+Kabupaten+Tulungagung,+Jawa+Timur+66211/@-7.3357132,112.7748002,3498m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x2e78e3002ea04369:0xd92f8ecebb871042!2m2!1d111.8790469!2d-8.0673395?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      title: "Resepsi Pernikahan",
      icon: "fa-glass-cheers",
      day: "Minggu",
      date: "15 November 2026",
      time: "15.00 - 17.00 WIB",
      venue: "Grand Ballroom Tropical House",
      address: "Jl. Ir. Soekarno Hatta, Kutoanyar, Panggungrejo, Kec. Tulungagung, Kab. Tulungagung, Jawa Timur 66211",
      mapUrl: "https://www.google.com/maps/dir//Tropical+House,+Jl.+Ir.+Soekarno+Hatta,+Kutoanyar,+Panggungrejo,+Kec.+Tulungagung,+Kabupaten+Tulungagung,+Jawa+Timur+66211/@-7.3357132,112.7748002,3498m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x2e78e3002ea04369:0xd92f8ecebb871042!2m2!1d111.8790469!2d-8.0673395?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D"
    }
  ],

  // Kisah Cinta (Perjalanan Kami)
  stories: [
    {
      year: "AGUSTUS 2025",
      title: "Pertama Kali Bertemu",
      description: "Agustus 2025 menjadi awal pertemuan Kris dan Zira. Dari perkenalan sederhana, kami mulai saling mengenal hingga akhirnya memutuskan untuk menjalani hubungan bersama."
    },
    {
      year: "AGUSTUS 2025",
      title: "Memulai Hubungan",
      description: "Sejak Agustus 2025, kami memulai perjalanan sebagai pasangan. Meski harus menjalani hubungan jarak jauh, kami belajar untuk saling memahami, menjaga kepercayaan, dan meluangkan waktu untuk satu sama lain."
    },
    {
      year: "AGUSTUS 2026",
      title: "Engagement",
      description: "Setelah setahun menjalani hubungan jarak jauh, kami sepakat untuk melangkah ke tahap yang lebih serius. Dengan restu kedua keluarga, Agustus 2026 menjadi awal dari komitmen kami untuk membangun kehidupan bersama."
    },
    {
      year: "NOVEMBER 2026",
      title: "Wedding Day",
      description: "Perjalanan yang kami mulai pada Agustus 2025 akan berlanjut ke babak baru. Pada November 2026, kami akan mengikat janji pernikahan dan memulai kehidupan bersama, dengan harapan dapat terus saling mendampingi dalam setiap langkah ke depan."
    }
  ],

  // Galeri Momen Indah (Our Moments)
  gallery: [
    { src: "assets/images/moments/moment_IMG_7701.jpg", caption: "Momen Lamaran (Engagement)" },
    { src: "assets/images/moments/moment_IMG_7727.jpg", caption: "Romantic Candlelight Dinner" },
    { src: "assets/images/moments/moment_IMG_4952.jpg", caption: "Sunset Manis di Pantai" },
    { src: "assets/images/moments/moment_IMG_2802.jpg", caption: "Kenangan Manis di Malioboro" },
    { src: "assets/images/moments/moment_IMG_3207.jpg", caption: "Bersama Menikmati Hari" },
    { src: "assets/images/moments/moment_IMG_7767.jpg", caption: "Piknik Ceria di Hutan Pinus" },
    { src: "assets/images/moments/moment_IMG_5051.jpg", caption: "Keseruan di Photobooth" },
    { src: "assets/images/moments/moment_IMG_2671.jpg", caption: "Keseruan Bermain E-Scooter" },
    { src: "assets/images/moments/moment_IMG_6296.jpg", caption: "Momen Asyik di Tepi Danau" },
    { src: "assets/images/moments/moment_IMG_5774.jpg", caption: "Berjalan di Hutan Trembesi" },
    { src: "assets/images/moments/moment_IMG_0658.jpg", caption: "Momen Berharga Bersama" },
    { src: "assets/images/moments/moment_IMG_9867.jpg", caption: "Kunjungan ke Galeri Seni" }
  ],

  // Amplop Digital & Send a Gift
  digitalGift: {
    qrisTitle: "Kedai Mama Ros",
    qrisImage: "assets/images/qris.jpg",
    physicalAddress: {
      title: "Kirim Hadiah Fisik (Send a Gift)",
      recipient: "Fazira Leonita",
      addressText: "Dusun Panjerejo Tengah RT 003 RW 008 Desa Panjerejo, Kec. Rejotangan, Kab.Tulungagung, 66293"
    }
  },

  // Audio Backsound Resmi: Sezairi - It's You (Official MV)
  youtubeAudio: {
    videoId: "QZng89VxKWg",
    title: "Sezairi - It's You (Official Music Video)",
    url: "https://www.youtube.com/watch?v=QZng89VxKWg"
  },

  // RSVP otomatis ke Google Sheets (via Google Apps Script Web App)
  // Setelah deploy Apps Script, ganti scriptUrl di bawah dengan URL deployment Anda.
  rsvp: {
    scriptUrl: "https://script.google.com/macros/s/AKfycbyE9d9lM4gHtZWhmtVbCAI51ghpCLlE5AOTlpp24VpzdGmaNLdwkH66gVWvHQbOsFCk/exec"
  },

  // Kutipan Pernikahan
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21"
  }
};
