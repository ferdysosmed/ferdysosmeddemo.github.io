// Fungsi untuk menampilkan notifikasi toast
function showToast(message) {
  const toast = document.createElement("div");
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
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Fungsi untuk memperbarui ikon keranjang
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;
  const badge = document.getElementById("cart-count");
  if (badge) {
    if (count > 0) {
      badge.style.display = "block";
      badge.textContent = count;
    } else {
      badge.style.display = "none";
    }
  }
}

/**
 * Fungsi utama untuk menambahkan item ke keranjang.
 * Sekarang menerima 'link' sebagai parameter ketiga.
 */
function addToCart(product, price, link) {
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
  showToast("Produk berhasil ditambahkan!");
}

// Panggil updateCartIcon saat halaman dimuat untuk memastikan jumlahnya akurat
document.addEventListener("DOMContentLoaded", function () {
  updateCartIcon();
});
