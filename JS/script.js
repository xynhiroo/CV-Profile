document.addEventListener('DOMContentLoaded', () => {
    
    // Ambil elemen-elemen yang mau dianimasi
    const card = document.querySelector('.pirate-card');
    const form = document.querySelector('.contact-form');

    // Tampilkan kartu profil dulu
    setTimeout(() => {
        card.classList.add('fade-in');
    }, 300); // Muncul setelah 0.3 detik

    // Tampilkan form kontak setelahnya
    setTimeout(() => {
        form.classList.add('fade-in');
    }, 600); // Muncul setelah 0.6 detik
});