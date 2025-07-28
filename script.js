const data = {
  followers: {
    '100 FOLL': 4000,
    '200 FOLL': 8000,
    '300 FOLL': 12000,
    '400 FOLL': 16000,
    '500 FOLL': 20000,
    '600 FOLL': 24000,
    '700 FOLL': 28000,
    '800 FOLL': 32000,
    '900 FOLL': 36000,
    '1000 FOLL': 40000
  },
  likes: {
    '500 LIKE': 2000,
    '600 LIKE': 3000,
    '700 LIKE': 4000,
    '800 LIKE': 5000,
    '900 LIKE': 6000,
    '1000 LIKE': 7000
  },
  views: {
    '1000 VIEW': 400,
    '2000 VIEW': 800,
    '3000 VIEW': 1200,
    '4000 VIEW': 1600,
    '5000 VIEW': 2000,
    '6000 VIEW': 2400,
    '7000 VIEW': 2800,
    '8000 VIEW': 3000,
    '9000 VIEW': 3500,
    '10000 VIEW': 3800,
    '15000 VIEW': 4000,
    '20000 VIEW': 4500,
    '25000 VIEW': 4800
  }
};

const category = document.getElementById('category');
const option = document.getElementById('option');
const priceOutput = document.getElementById('price');

function populateOptions() {
  option.innerHTML = '';
  const selected = category.value;
  Object.keys(data[selected]).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    option.appendChild(opt);
  });
  updatePrice();
}

function updatePrice() {
  const selectedCategory = category.value;
  const selectedOption = option.value;
  const harga = data[selectedCategory][selectedOption];
  priceOutput.textContent = `Total Harga: Rp. ${harga.toLocaleString('id-ID')}`;
}

function isValidTiktokLink(link) {
  const akunRegex = /^https:\/\/www\.tiktok\.com\/@[\w._-]+$/;
  const videoRegex = /^https:\/\/vt\.tiktok\.com\/.+/;
  return akunRegex.test(link) || videoRegex.test(link);
}

function confirmOrder() {
  const produk = option.value;
  const metode = document.getElementById('payment').value;
  const harga = data[category.value][produk];
  const waktu = new Date().toLocaleString('id-ID');
  const link = document.getElementById('link').value.trim();

  if (!link) {
    alert("Link untuk suntik wajib diisi!");
    return;
  }

  if (!isValidTiktokLink(link)) {
    alert("Link tidak valid! Harus berupa link akun TikTok (https://www.tiktok.com/@...) atau link video TikTok (https://vt.tiktok.com/...)");
    return;
  }

  const pesan = `✨ Halo Digital Store!\n\nSaya mau pesan:\n📦 Produk: ${produk}\n💸 Harga: Rp ${harga.toLocaleString('id-ID')}\n💳 Pembayaran: ${metode}\n🔗 Link Suntik: ${link}\n⏰ Jam Pesan: ${waktu}\n\nTerima kasih 🙏🏻`;
  const encoded = encodeURIComponent(pesan);
  window.open(`https://wa.me/6289529592500?text=${encoded}`);
}

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

category.addEventListener('change', populateOptions);
option.addEventListener('change', updatePrice);

populateOptions();
