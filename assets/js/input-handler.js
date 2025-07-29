
// Menunggu hingga seluruh halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen dari halaman
    const productNameEl = document.getElementById('product-name');
    const targetLinkInput = document.getElementById('target-link');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');

    // 1. Mengambil data dari URL
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    const price = params.get('price');
    const action = params.get('action'); // 'order' atau 'cart'
    const whatsappText = params.get('whatsappText');
    const sourcePage = params.get('source'); // Halaman asal

    // 2. Memvalidasi data dan menampilkan di halaman
    if (!product || !price || !action || !sourcePage) {
        alert('Terjadi kesalahan. Informasi produk tidak lengkap. Anda akan diarahkan ke halaman utama.');
        window.location.href = '/index.html';
        return;
    }

    // Tampilkan nama produk dan harga di halaman
    productNameEl.textContent = `${product.replace(/\+/g, ' ')} - Rp ${parseInt(price).toLocaleString('id-ID')}`;

    // 3. Menambahkan fungsi pada tombol
    cancelButton.addEventListener('click', () => {
        window.location.href = sourcePage;
    });

    confirmButton.addEventListener('click', () => {
        const targetLink = targetLinkInput.value.trim();

        if (!targetLink || !targetLink.startsWith('http')) {
            alert('Harap masukkan link target yang valid (harus diawali dengan http atau https).');
            return;
        }

        // 4. Menjalankan aksi berdasarkan parameter 'action'
        if (action === 'order') {
            const fullWhatsappText = `${whatsappText.replace(/\+/g, ' ')}\n\nLink Target: ${targetLink}`;
            const whatsappUrl = `https://wa.me/6289676930992?text=${encodeURIComponent(fullWhatsappText)}`;
            window.open(whatsappUrl, '_blank');
            setTimeout(() => {
                window.location.href = sourcePage;
            }, 500);

        } else if (action === 'cart') {
            if (typeof addToCart === 'function') {
                addToCart(product.replace(/\+/g, ' '), price, targetLink);
                // Pesan toast sudah ada di dalam fungsi addToCart
                // Arahkan pengguna kembali ke halaman produk setelah menambahkan ke keranjang
                setTimeout(() => {
                    window.location.href = sourcePage;
                }, 300); // Beri sedikit waktu agar toast terlihat
            } else {
                alert('Error: Fungsi keranjang tidak ditemukan. Hubungi administrator.');
                console.error('Fungsi addToCart(product, price, link) tidak ditemukan di cart.js');
            }
        }
    });
});
