let currentFamily = null;

let currentSlide = 0;

let carouselInterval = null;

function loadFamily() {
  const urlParams = new URLSearchParams(window.location.search);

  const familyId = urlParams.get("family");

  const productId = urlParams.get("product");

  if (!familyId || typeof families === "undefined") {
    window.location.href = "products.html";

    return;
  }

  currentFamily = families.find((f) => f.id == familyId);

  if (!currentFamily) {
    window.location.href = "products.html";

    return;
  }

  document.getElementById("family-title").textContent = currentFamily.name;

  document.getElementById("family-description").textContent =
    currentFamily.description;

  document.title = `${currentFamily.name} | مصنع عوافي للصناعات الغذائية`;

  renderCarousel();

  renderFamilyProducts();

  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  if (productId) {
    setTimeout(() => {
      const productElement = document.getElementById(`product-${productId}`);

      if (productElement) {
        productElement.scrollIntoView({
          behavior: "smooth",

          block: "center",
        });

        productElement.style.boxShadow = "0 0 20px rgba(204, 0, 0, 0.5)";

        productElement.style.transition = "box-shadow 3s ease-out";

        // إخفاء الـ boxShadow تدريجياً بعد 3 ثوانٍ

        setTimeout(() => {
          productElement.style.boxShadow = "none";
        }, 3000);
      }
    }, 500);
  }
}

function renderCarousel() {
  const carouselInner = document.getElementById("carousel-inner");

  const indicators = document.getElementById("carousel-indicators");

  if (!currentFamily.products || currentFamily.products.length === 0) {
    carouselInner.innerHTML =
      "<p class='text-white text-center w-full'>لا توجد منتجات للعرض حالياً.</p>";

    indicators.innerHTML = "";

    return;
  }

  carouselInner.innerHTML = currentFamily.products

    .map(
      (product) => `

      <div class="carousel-item" style="background-image: url('${product.image}')"></div>

      

      

    `,
    )

    .join("");

  indicators.innerHTML = currentFamily.products

    .map(
      (_, index) => `

      <div class="indicator ${index === 0 ? "active" : ""}" onclick="goToSlide(${index})" title="الانتقال إلى الصورة ${index + 1}" aria-label="الانتقال إلى الصورة ${index + 1}"></div>

    `,
    )

    .join("");

  startCarousel();
}

// دالة منفصلة لإنشاء بطاقة المنتج

function createProductCard(product, index) {
  return `

    <div id="product-${product.id}" data-aos="fade-up" data-aos-delay="${index * 100}" class="product-card bg-white rounded-2xl overflow-hidden shadow-lg border-t-4 ${product.borderClass || "border-red-600"}">

      <div class="h-48 bg-gray-50 flex items-center justify-center p-4">

        <img src="${product.image}" alt="${product.name}" class="h-full object-contain transition-transform duration-500" />

      </div>

      <div class="p-6 text-center">

        <h3 class="text-xl font-bold mb-2">${product.name}</h3>

        <p class="text-gray-500 text-sm mb-4 h-16">${product.description}</p>

        <div class="bg-red-50 py-1 px-3 rounded-full text-red-600 font-bold text-xs inline-block mb-4">

          ${product.tag}

        </div>

        ${
          product.sizes && product.sizes.length
            ? `<div class="text-right mb-4">

              <p class="font-semibold mb-3 text-sm text-gray-800">الأحجام والعبوات</p>

              <div class="grid grid-cols-1 gap-3">

                ${product.sizes.map((size) => createSizeItem(product, size)).join("")}

              </div>

            </div>`
            : ""
        }

      </div>

    </div>

  `;
}

// دالة منفصلة لإنشاء عنصر الحجم

function createSizeItem(product, size) {
  const safeProductName = product.name;

  const safeSizeLabel = size.label;

  const safeConcentration = size.concentration || "";

  const safeCartons = size.cartons || "";

  return `

    <div class="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-sm">

      <div class="grid grid-cols-1 sm:grid-cols-[1.4fr_0.8fr] gap-3 items-center">

        <div class="text-right">

          <p class="font-semibold text-sm text-gray-900">${size.label}</p>

          ${size.concentration ? `<p class="text-gray-600 text-xs mt-1">${size.concentration}</p>` : ""}

          ${size.cartons ? `<p class="text-gray-600 text-xs mt-1">${size.cartons}</p>` : ""}

        </div>

        ${
          size.image
            ? `<div class="h-24 w-full overflow-hidden rounded-2xl bg-white p-2 flex items-center justify-center">

              <img src="${size.image}" alt="${size.label}" class="h-full object-contain" />

            </div>`
            : ""
        }

      </div>

      <button onclick="sendOrder('${safeProductName}', '${safeSizeLabel}', '${safeConcentration}', '${safeCartons}')" class="mt-3 w-full bg-[#cc0000] text-white py-3 rounded-full font-bold hover:bg-red-800 transition shadow-sm text-xs min-h-[44px] touch-action: manipulation" title="طلب ${product.name} - ${size.label}" aria-label="طلب ${product.name} - ${size.label}">

        اطلب هذا الحجم

      </button>

    </div>

  `;
}

function renderFamilyProducts() {
  const grid = document.getElementById("products-grid");

  grid.innerHTML = currentFamily.products

    .map((product, index) => createProductCard(product, index))

    .join("");
}

function startCarousel() {
  if (!currentFamily.products || currentFamily.products.length === 0) return;

  carouselInterval = setInterval(() => {
    nextSlide();
  }, 3000);
}

function nextSlide() {
  if (!currentFamily.products || currentFamily.products.length === 0) return;

  clearInterval(carouselInterval); // إيقاف الحركة التلقائية

  currentSlide = (currentSlide + 1) % currentFamily.products.length;

  updateCarousel();

  startCarousel(); // إعادة تشغيل الحركة التلقائية
}

function prevSlide() {
  if (!currentFamily.products || currentFamily.products.length === 0) return;

  clearInterval(carouselInterval); // إيقاف الحركة التلقائية

  currentSlide =
    (currentSlide - 1 + currentFamily.products.length) %
    currentFamily.products.length;

  updateCarousel();

  startCarousel(); // إعادة تشغيل الحركة التلقائية
}

function goToSlide(index) {
  clearInterval(carouselInterval); // إيقاف الحركة التلقائية

  currentSlide = index;

  updateCarousel();

  startCarousel(); // إعادة تشغيل الحركة التلقائية
}

function updateCarousel() {
  const carouselInner = document.getElementById("carousel-inner");

  // تحسين التوافق مع RTL وإضافة transition ناعم

  carouselInner.style.transition = "transform 0.5s ease-in-out";

  carouselInner.style.transform = `translateX(${currentSlide * 100}%)`; // RTL: إزالة السالب

  const indicators = document.querySelectorAll(".indicator");

  indicators.forEach((ind, index) => {
    ind.classList.toggle("active", index === currentSlide);
  });
}

function sendOrder(
  productName,

  sizeLabel = "",

  concentration = "",

  cartons = "",
) {
  const phoneNumber = "967776360668";

  const now = new Date();

  const dateStr = now.toLocaleDateString("ar-YE");

  const timeStr = now.toLocaleTimeString("ar-YE", {
    hour: "2-digit",

    minute: "2-digit",
  });

  let message =
    `📦 *طلب  منتج*\n` +
    `--------------------------\n` +
    `🛍️ *المنتج:* ${productName}\n`;

  if (sizeLabel) {
    message += `📦 *الحجم:* ${sizeLabel}\n`;
  }

  if (concentration) {
    message += `🔬 *التركيز:* ${concentration}\n`;
  }

  if (cartons) {
    message += `📦 *الكراتين/العبوات:* ${cartons}\n`;
  }

  // إضافة وقت وتاريخ الطلب

  message += `\n⏰ *وقت الطلب:* ${timeStr}\n`;

  message += `📅 *تاريخ الطلب:* ${dateStr}\n`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "rel='noopener'");
}

window.addEventListener("beforeunload", () => {
  if (carouselInterval) clearInterval(carouselInterval);
});

document.addEventListener("DOMContentLoaded", () => {
  loadFamily();

  document.getElementById("prev-btn").addEventListener("click", prevSlide);

  document.getElementById("next-btn").addEventListener("click", nextSlide);
});
