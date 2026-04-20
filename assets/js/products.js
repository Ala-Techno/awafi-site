/**
 * الملف: products.js
 * الوظيفة: بناء صفحة المنتجات ديناميكياً مع ربط ذكي بصفحة التفاصيل
 */

// 1. وظيفة الانتقال لصفحة العائلة مع تحديد المنتج المختار (الإضاءة)
function exploreFamily(familyId, productId) {
  // إرسال المعرفات عبر الرابط لتمكين خاصية الـ Highlight في الصفحة التالية
  window.location.href = `family.html?family=${familyId}&product=${productId}`;
}

// 2. مكون "كرت المنتج" (القطعة البرمجية الأصغر)
const ProductCard = (product, family, index) => `
    <article 
        data-aos="fade-up" 
        data-aos-delay="${index * 80}" 
        class="family-small-card rounded-3xl border bg-white p-4 text-center shadow-sm hover:shadow-xl transition-all group cursor-pointer" 
        style="border-color: ${family.accentColor || "#e5e7eb"};"
        onclick="exploreFamily('${family.id}', ${product.id})" title="استكشف عائلة ${family.name} - ${product.name}" aria-label="استكشف عائلة ${family.name} - ${product.name}"
    >
        <div class="h-28 bg-gray-50 rounded-3xl flex items-center justify-center p-4 mb-4 overflow-hidden">
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
        </div>
        <h3 class="text-sm font-bold text-gray-900 mb-2">${product.name}</h3>
        <p class="text-gray-500 text-xs mb-4 h-12 line-clamp-2">${product.tag}</p>
        <button 
            style="background: ${family.accentColor || "#cc0000"};" 
            class="w-full text-white py-2 rounded-full text-xs font-bold transition hover:brightness-110"
        >
            عرض التفاصيل
        </button>
    </article>
`;

// 3. مكون "قسم العائلة" (الحاوية الكبيرة لكل مجموعة)
const FamilySection = (family) => `
    <section class="family-section rounded-[32px] overflow-hidden shadow-sm mb-20 bg-white border border-gray-100" data-aos="fade-up">
        <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 p-8 lg:p-12">
            <div class="flex flex-col justify-center text-right">
                <span class="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                    <i class="fas fa-seedling" style="color: ${family.accentColor};"></i>
                    عائلة منتجات عوافي
                </span>
                <h2 class="text-4xl font-extrabold text-gray-900 mb-5">${family.name}</h2>
                <p class="text-gray-600 text-lg leading-relaxed max-w-2xl">${family.description}</p>
                <div class="mt-8 flex flex-col items-center gap-4 ">
                    <a href="family.html?family=${family.id}" 
                       style="background: ${family.accentColor};" 
                       class="inline-flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold shadow-lg transition hover:scale-105 active:scale-95">
                        <i class="fas fa-eye"></i> استكشف كامل العائلة
                    </a>
                    <span class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-700">
                        ${family.products.length} منتجات فريدة
                    </span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                ${family.products
                  .slice(0, 4)
                  .map((p, i) => ProductCard(p, family, i))
                  .join("")}
            </div>
        </div>
    </section>
`;

// 4. المحرك الرئيسي لتشغيل الصفحة
function initProductsPage(customConfig = null) {
  // 1. تعريف دالة الرسم (داخلية) - ركز هنا
  function renderHero(config) {
    const container = document.getElementById("hero-content");
    if (!container) return;

    const formattedTitle = config.title.replace(
      /عوافي/g,
      '<span class="text-[#cc0000]">عوافي</span>',
    );

    if (!config.image) {
      container.innerHTML = `
        <div data-aos="fade-up" class="w-full text-center flex flex-col items-center justify-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-8 leading-[1.4] ">${formattedTitle}</h1>
          <p class="text-gray-400 text-lg leading-[1.8] max-w-2xl">${config.description}</p>
          ${config.extraHTML || ""}
        </div>`;
    } else {
      container.innerHTML = `
        <div data-aos="fade-left" class="md:w-1/2 text-right">
          <h1 class="text-4xl md:text-6xl font-bold mb-8 leading-[1.4]">${formattedTitle}</h1>
          <p class="text-gray-400 text-lg leading-[1.8] max-w-xl">${config.description}</p>
          ${config.extraHTML || ""}
        </div>
        <div data-aos="fade-right" class="md:w-1/2 relative">
          <div class="absolute -inset-4 bg-red-600/10 rounded-3xl blur-3xl"></div>
          <img src="${config.image}" 
               onerror="this.src='assets/images/factor.jpg'" 
               class="relative rounded-3xl shadow-2xl border-2 border-gray-700 w-full object-cover h-[280px] md:h-[350px]" 
               alt="Awafi">
        </div>`;
    }

    if (window.AOS) {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  // 2. البيانات الافتراضية
  const defaultConfig = {
    title:
      "<span class='text-white leading-tight '>عوافي : تليق بالمائده اليمنية</span>",
    description:
      "من قلب صنعاء، انطلق مصنع عوافي ليضع معايير جديدة في الصناعات الغذائية. نحن لا نصنع مجرد مقبلات، بل نقدم طعماً يجمع بين الأصالة والجودة.",
    image: "assets/images/products-hero.jpg",
    extraHTML: `<div class="mt-10"><a href="#families-sections" class="bg-[#cc0000] text-white px-8 py-4 rounded-xl font-bold">استكشف منتجاتنا</a></div>`,
  };

  // 3. دمج البيانات (الممررة مع الافتراضية)
  // الدمج الذكي: إذا أرسلت صورة "فارغة" عمداً، سيتم اعتبارها غير موجودة
  const finalConfig = customConfig
    ? { ...defaultConfig, ...customConfig }
    : defaultConfig;

  // إذا كان المستخدم أرسل image: "" أو لم يرسلها وأردنا إلغاء الافتراضية
  if (customConfig && customConfig.image === "") {
    finalConfig.image = null;
  } else if (customConfig && customConfig.extraHTML === "") {
    finalConfig.extraHTML = null;
  }

  // 4. تنفيذ الدالة الداخلية
  renderHero(finalConfig);

  // 5. رسم العوائل (تكملة الكود الخاص بك)
  const familiesContainer = document.getElementById("families-sections");
  if (familiesContainer && typeof families !== "undefined") {
    familiesContainer.innerHTML = families
      .map((f) => FamilySection(f))
      .join("");
  }

  // 6. تهيئة الأنميشن
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }
}
// 5. نقطة الانطلاق الموحدة
document.addEventListener("DOMContentLoaded", initProductsPage);
