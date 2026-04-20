// ابحث عن هذا الجزء في بداية ملف components.js واجعله هكذا:
const style = document.createElement("style");
style.textContent = `
  html {
    scroll-behavior: smooth; /* تفعيل التمرير السلس من المتصفح مباشرة */
     scroll-padding-top: 90px; /* هذا هو السطر السحري! يحل مشكلة تغطية الهيدر للعنوان */
  }

  html, body {
    overflow-x: hidden !important;
    width: 100% !important;
    position: relative !important;
    margin: 0;
    padding: 0;
  }

  /* تنسيق الهيدر الثابت */
  #main-header {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100% !important;
    z-index: 9999 !important;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  body {
    padding-top: 85px !important; /* لكي لا يختفي أول جزء من الهيرو تحت الهيدر */
  }

  @media (max-width: 768px) {
    body { padding-top: 75px !important; }
    html { scroll-padding-top: 80px; }
  }

  :root { --awafi-red: #cc0000; }
  .text-awafi-red { color: var(--awafi-red) !important; }
  .bg-awafi-red { background-color: var(--awafi-red) !important; }
`;
document.head.appendChild(style);
// 2. تحديث إعدادات AOS لتعمل بسلاسة أكبر في الجوال
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disableMutationObserver: false,
  });
} // 1. كود النافبار (Navbar) - تأكدنا من وجود sticky top-0 للثبات
const navbarHTML = `
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="assets/images/awafi_logo.jpg" alt="Logo" class="h-12 md:h-14 w-auto object-contain rounded-lg border border-gray-100 p-1 shadow-sm" />
        <div class="flex flex-col leading-tight border-r-2 border-gray-200 pr-3">
          <span class="text-lg md:text-xl font-bold text-[#cc0000] mb-1">مصنع عوافي</span>
          <span class="text-[9px] md:text-[10px] text-gray-500 font-medium text-center">للصناعات الغذائية - اليمن</span>
        </div>
      </div>
      <div id="nav-links-container" class="hidden md:flex space-x-reverse space-x-8 font-bold text-gray-700">
        <a href="index.html" class="hover:text-[#cc0000] transition px-1">الرئيسية</a>
        <a href="products.html" class="hover:text-[#cc0000] transition px-1">منتجاتنا</a>
        <a href="about.html" class="hover:text-[#cc0000] transition px-1">عن عوافي</a>
        <a href="events.html" class="hover:text-[#cc0000] transition px-1 text-sm lg:text-base">الفعاليات والمشاركات</a>
        <a href="contact.html" class="hover:text-[#cc0000] transition px-1">اتصل بنا</a>
      </div>
      <div class="md:hidden">
        <button id="hamburger-btn" class="text-gray-700 focus:outline-none p-2" title="فتح القائمة" aria-label="فتح القائمة"><i class="fas fa-bars text-2xl"></i></button>
      </div>
      <a href="contact.html" class="hidden md:block bg-[#cc0000] text-white px-5 py-2 rounded-lg hover:bg-red-800 transition shadow-md font-bold text-sm">اطلب عرض سعر</a>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 shadow-xl">
      <div class="flex flex-col p-6 space-y-4 font-bold text-center">
        <a href="index.html" class="text-gray-700 hover:text-[#cc0000]">الرئيسية</a>
        <hr class="border-gray-50" />
        <a href="products.html" class="text-gray-700 hover:text-[#cc0000]">منتجاتنا</a>
        <hr class="border-gray-50" />
        <a href="about.html" class="text-gray-700 hover:text-[#cc0000]">عن عوافي</a>
        <hr class="border-gray-50" />
        <a href="events.html" class="text-gray-700 hover:text-[#cc0000]">الفعاليات والمشاركات</a>
        <hr class="border-gray-50" />
        <a href="contact.html" class="text-gray-700 hover:text-[#cc0000]">اتصل بنا</a>
      </div>
    </div>
  </nav>
`;
// 2. كود الفوتر (Footer)
const footerHTML = `
  <footer class="bg-gray-900 text-white py-8 border-t border-gray-800 mt-20"      dir="rtl">
    <div class="container mx-auto px-20">
      <div class="flex flex-col items-center mb-8 text-center">
        <p class="text-xl font-bold mb-2 tracking-wide">شركة عوافي للصناعات الغذائية - صنعاء</p>
        <p class="text-gray-500 text-sm">الجودة التي تستحقها ثقتكم</p>
      </div>

       <div class="border-t border-gray-800/50 my-6"></div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] md:text-xs tracking-wider">
        
        <div class="text-gray-500 order-2 md:order-1">
          © 2026 جميع الحقوق محفوظة <span class="text-gray-400">لمصنع عوافي المحدود</span>
        </div>

        <div class="flex items-center gap-2 text-gray-500 order-1 md:order-2" dir="ltr">
          <span>Digital Engineering & Development by:</span>
          <a href="https://wa.me/967776360668" target="_blank" rel="noopener noreferrer"
             class="text-white hover:text-[#cc0000] transition-all duration-300 font-bold border-b border-gray-700 hover:border-[#cc0000] pb-0.5">
            Ala Al-Sharai
          </a>
        </div>

      </div>
    </div>
  </footer>
`;

// وظيفة لحقن المكونات في الصفحة
function injectComponents() {
  const headerTag = document.getElementById("main-header");
  const footerTag = document.getElementById("main-footer");

  if (headerTag) {
    headerTag.innerHTML = navbarHTML;

    // سطر إضافي لضمان ثبات الحاوية نفسها في أعلى الشاشة
    // headerTag.className = "fixed top-0 left-0 right-0 z-[9999]";
    // --- إضافة الخط الأحمر تحت الصفحة النشطة تلقائياً ---
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = headerTag.querySelectorAll("#nav-links-container a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("text-[#cc0000]", "border-b-2", "border-[#cc0000]");
      }
    });

    // إعادة ربط زر الجوال بعد الحقن
    const btn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("mobile-menu");
    if (btn && menu) {
      btn.onclick = () => menu.classList.toggle("hidden");
    }
  }

  if (footerTag) {
    footerTag.innerHTML = footerHTML;
  }
}

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", injectComponents);

// كود زر الواتساب الثابت
const whatsappBtn = `
  <a href="https://wa.me/967776360668" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-[999] group flex items-center shadow-2xl transition-all duration-300" dir="ltr" title="تواصل معنا عبر واتساب" aria-label="تواصل معنا عبر واتساب">
    <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out bg-white text-gray-800 font-bold py-2 px-0 group-hover:px-4 rounded-l-full shadow-sm text-sm whitespace-nowrap">
      تواصل معنا عبر واتساب
    </span>
    <div class="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform active:scale-95">
      <i class="fab fa-whatsapp"></i>
    </div>
    <span class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
  </a>
`;

// حقن الزر في الصفحة عند تحميلها
document.body.insertAdjacentHTML("beforeend", whatsappBtn);

const scrollCounters = () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // كلما قل الرقم زادت السرعة

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // حساب مقدار الزيادة في كل خطوة
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15); // سرعة التحديث بالملي ثانية
      } else {
        counter.innerText = target;
      }
    };

    // تفعيل العداد عند ظهور العنصر على الشاشة فقط
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(counter); // يعمل مرة واحدة فقط عند الظهور
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
};

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", scrollCounters);
// هذا الكود يكرر الصور تلقائياً لضمان استمرار الحركة بدون انقطاع
// const track = document.getElementById("track");
// if (track) {
//   const content = track.innerHTML;
//   // سنضيف المحتوى مرتين إضافيتين ليصبح المجموع 3 مجموعات متصلة
//   track.innerHTML = content + content + content;
// }

// وظيفة ذكية لبناء الهيرو الموحد
// function
//  renderHero(config) {
//   const container = document.getElementById("hero-content");
//   if (!container) return;

//   const formattedTitle = config.title.replace(
//     /عوافي/g,
//     '<span class="text-[#cc0000]">عوافي</span>',
//   );

//   // إذا لم توجد صورة، سنجعل النص يأخذ كامل العرض ويكون في المنتصف
//   if (!config.image) {
//     container.innerHTML = `
//       <div data-aos="fade-up" class="w-full text-center flex flex-col items-center justify-center">
//         <h1 class="text-4xl md:text-6xl font-bold mb-8 leading-[1.4] md:leading-[1.5] max-w-4xl">${formattedTitle}</h1>
//         <p class="text-gray-400 text-lg leading-[1.8] max-w-2xl">${config.description}</p>
//         ${config.extraHTML || ""}
//       </div>
//     `;
//   } else {
//     // التنسيق العادي (نص وصورة) إذا وجدت الصورة
//     container.innerHTML = `
//       <div data-aos="fade-left" class="md:w-1/2 text-right">
//         <h1 class="text-4xl md:text-6xl font-bold mb-8 leading-[1.4] md:leading-[1.5]">${formattedTitle}</h1>
//         <p class="text-gray-400 text-lg leading-[1.8] max-w-xl">${config.description}</p>
//         ${config.extraHTML || ""}
//       </div>
//       <div data-aos="fade-right" class="md:w-1/2 relative">
//         <div class="absolute -inset-4 bg-red-600/10 rounded-3xl blur-3xl"></div>
//         <img src="${config.image}"
//              onerror="this.src='assets/images/factor.jpg'"
//              class="relative rounded-3xl shadow-2xl border-2 border-gray-700 w-full object-cover h-[280px] md:h-[350px]"
//              alt="Awafi">
//       </div>
//     `;
//   }

//   if (window.AOS) {
//     setTimeout(() => {
//       AOS.refresh();
//     }, 100);
//   }
// }
