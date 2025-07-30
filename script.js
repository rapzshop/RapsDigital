const data = {
  tiktok: {
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
  },
  instagram: {
    followers: {
      '100 FOLL': 3500,
      '200 FOLL': 7000,
      '300 FOLL': 10500,
      '400 FOLL': 13500,
      '500 FOLL': 17000,
      '600 FOLL': 20500,
      '700 FOLL': 23500,
      '800 FOLL': 27000,
      '900 FOLL': 30500,
      '1000 FOLL': 34000
    },
    likes: {
      '500 LIKE': 2000,
      '600 LIKE': 2500,
      '700 LIKE': 3000,
      '800 LIKE': 3500,
      '900 LIKE': 4000,
      '1000 LIKE': 4500
    },
    views: {
      '1000 VIEW': 2000,
      '2000 VIEW': 4000,
      '3000 VIEW': 6000,
      '4000 VIEW': 8000,
      '5000 VIEW': 10000,
      '6000 VIEW': 12000,
      '7000 VIEW': 14000,
      '8000 VIEW': 16000,
      '9000 VIEW': 17000,
      '10000 VIEW': 19000
    }
  },
  premium: {
    apps: {
      'YouTube Premium 1 Bulan': 4000,
      'CapCut Pro 1 Bulan': 20000,
      'ChatGPT Pro 1 Bulan': 20000,
      'AM Premium 1 Bulan Private': 8000,
      'Viu Premium 1 Bulan Private': 4000,
      'Canva 1 Bulan Private': 3000
    }
  },
  fyp: {
    paket: {
      'AA - 100 Like + 2000 View': 1500,
      'BB - 150 Like + 2000 View': 2000,
      'CC - 300 Like + 5000 View': 3500,
      'DD - 500 Like + 6500 View': 4000,
      'EE - 700 Like + 10000 View': 6000,
      '50 Foll Paket': 3000,
      '100 Foll Paket': 5000,
      '150 Foll Paket': 7000,
      '200 Foll Paket': 9000,
      '300 Foll Paket': 13000
    }
  }
};

const platform = document.getElementById('platform');
const category = document.getElementById('category');
const option = document.getElementById('option');
const priceOutput = document.getElementById('price');

function populateOptions() {
  option.innerHTML = '';
  const selectedPlatform = platform.value;
  const selectedCategory = category.value;

  if (selectedPlatform === 'premium') {
    Object.keys(data.premium.apps).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      option.appendChild(opt);
    });
  } else if (selectedPlatform === 'fyp') {
    Object.keys(data.fyp.paket).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      option.appendChild(opt);
    });
  } else {
    Object.keys(data[selectedPlatform][selectedCategory]).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      option.appendChild(opt);
    });
  }

  updatePrice();
}

function updatePrice() {
  const selectedPlatform = platform.value;
  const selectedCategory = category.value;
  const selectedOption = option.value;
  let harga = 0;
  if (selectedPlatform === 'premium') {
    harga = data.premium.apps[selectedOption];
  } else if (selectedPlatform === 'fyp') {
    harga = data.fyp.paket[selectedOption];
  } else {
    harga = data[selectedPlatform][selectedCategory][selectedOption];
  }
  priceOutput.textContent = `Total Harga: Rp. ${harga ? harga.toLocaleString('id-ID') : 0}`;
}

function isValidTiktokLink(link) {
  const akunRegex = /^https:\/\/www\.tiktok\.com\/@[\w._-]+$/;
  const videoRegex = /^https:\/\/vt\.tiktok\.com\/.+/;
  return akunRegex.test(link) || videoRegex.test(link);
}

function confirmOrder() {
  const produk = option.value;
  const metode = document.getElementById('payment').value;
  const selectedPlatform = platform.value;
  const harga = selectedPlatform === 'premium' ? data.premium.apps[produk] : selectedPlatform === 'fyp' ? data.fyp.paket[produk] : data[selectedPlatform][category.value][produk];
  const waktu = new Date().toLocaleString('id-ID');
  const link = document.getElementById('link').value.trim();

  if (selectedPlatform !== 'premium') {
    if (!link) {
      alert("Link wajib diisi!");
      return;
    }
    if (selectedPlatform === 'tiktok' || selectedPlatform === 'fyp') {
      if (!isValidTiktokLink(link)) {
        alert("Link TikTok tidak valid! Harus berupa link akun atau video TikTok.");
        return;
      }
    }
  }

  const pesan = `✨ Halo Digital Store!\n\nSaya mau pesan:\n📱 Platform: ${selectedPlatform}\n📦 Produk: ${produk}\n💸 Harga: Rp ${harga.toLocaleString('id-ID')}\n${selectedPlatform !== 'premium' ? `🔗 Link: ${link}\n` : ''}💳 Pembayaran: ${metode}\n⏰ Jam Pesan: ${waktu}\n\nTerima kasih 🙏🏻`;
  window.open(`https://wa.me/6289529592500?text=${encodeURIComponent(pesan)}`);
}

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

platform.addEventListener('change', () => {
  category.disabled = platform.value === 'premium' || platform.value === 'fyp';
  populateOptions();
});

category.addEventListener('change', populateOptions);
option.addEventListener('change', updatePrice);

populateOptions();
