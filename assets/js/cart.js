/**
 * file: assets/js/cart.js
 * Deskripsi: Logika untuk mengelola keranjang belanja.
 */

// Fungsi untuk menampilkan notifikasi sementara (toast)
function showToast(message) {
  // Hapus toast yang mungkin sudah ada untuk menghindari tumpukan
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = 'toast-notification'; // Tambahkan class untuk identifikasi
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "#28a745"; /* Warna hijau */
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "bold";
  toast.style.zIndex = 10001; // Pastikan di atas segalanya
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Fungsi untuk memperbarui ikon jumlah item di keranjang
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.style.display = count > 0 ? "block" : "none";
    badge.textContent = count;
  }
}

/**
 * Fungsi utama untuk menambahkan item ke keranjang.
 * Sekarang menerima 'link' sebagai parameter ketiga.
 */
function addToCart(product, price, link) {
  if (!product || !price || !link) {
    console.error("addToCart requires product, price, and link.");
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Buat objek item baru yang menyertakan link
  const newItem = {
    product: product,
    price: parseInt(price),
    link: link // Menyimpan link target
  };

  cart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  
  updateCartIcon();
  showToast(`"${product}" ditambahkan!`);
}

// Panggil updateCartIcon saat halaman dimuat untuk memastikan jumlahnya akurat
// Ini akan berjalan di setiap halaman yang memuat cart.js
document.addEventListener("DOMContentLoaded", function () {
  updateCartIcon();
});
