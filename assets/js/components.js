// 1. كود النافبار (Navbar) - تأكدنا من وجود sticky top-0 للثبات
const navbarHTML = `
  <nav class="bg-white shadow-md">
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
        <button id="hamburger-btn" class="text-gray-700 focus:outline-none p-3 min-w-[44px] min-h-[44px] touch-action: manipulation" title="فتح القائمة" aria-label="فتح القائمة"><i class="fas fa-bars text-2xl"></i></button>
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
  <footer class="bg-gray-900 text-white py-8 border-t border-gray-800 mt-20" dir="rtl">
    <div class="container mx-auto px-6 md:px-20">
      <div class="flex flex-col items-center mb-8 text-center">
        <p class="text-lg md:text-xl font-bold mb-2 tracking-wide">شركة عوافي للصناعات الغذائية - صنعاء</p>
        <p class="text-gray-500 text-sm">الجودة التي تستحقها ثقتكم</p>
      </div>

      <div class="border-t border-gray-800/50 my-6"></div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[10px] md:text-xs tracking-wider">
        
        <div class="text-gray-500 order-2 md:order-1 text-center md:text-right">
          © 2026 جميع الحقوق محفوظة <span class="text-gray-400">لمصنع عوافي المحدود</span>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-2 text-gray-500 order-1 md:order-2 text-center md:text-left" dir="ltr">
          <span class="text-center">Digital Engineering & Development by:</span>
          <a href="https://wa.me/967776360668" target="_blank" rel="noopener noreferrer"
             class="text-white hover:text-[#cc0000] transition-all duration-300 font-bold border-b border-gray-700 hover:border-[#cc0000] pb-0.5 text-center">
            Ala Al-Sharai
          </a>
        </div>

      </div>
    </div>
  </footer>
`;

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
// 1. الدالة الرئيسية (المدير)
function init() {
  injectComponents(); // أولاً: ابنِ الهيكل
  highlightActiveLink(); // ثانياً: لوّن الرابط
  setupMobileMenu(); // ثالثاً: شغّل الأزرار
}
// 2. دالة الحقن (مهمتها وضع HTML للهيدر والفوتر)
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

// 3. دالة التلوين (مهمتها منطقية وبصرية)
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  // ابحث فقط عن الرابط الذي يطابق الصفحة الحالية بدلاً من المرور على الكل
  const activeLink = document.querySelector(
    `#nav-links-container a[href="${currentPage}"]`,
  );

  if (activeLink) {
    activeLink.classList.add(
      "text-[#cc0000]",
      "border-b-2",
      "border-[#cc0000]",
    );
  }
}

// 4. دالة التفاعل (مهمتها الوظيفية)
function setupMobileMenu() {
  const btn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.onclick = () => menu.classList.toggle("hidden");
  }
}

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  injectComponents();
  highlightActiveLink();
  setupMobileMenu();

  // تهيئة AOS محسنة للعمل مع الهيدر الثابت
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120, // زيادة الـ offset لتعويض الهيدر الثابت
      disableMutationObserver: false,
      delay: 0,
      easing: "ease-out-cubic",
      mirror: false,
    });

    // تحديث AOS بعد تحميل المكونات
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }

  if (document.querySelectorAll(".counter").length > 0) {
    scrollCounters(); // تشغيل العداد فقط لو وجد في الصفحة
  }
});
// document.addEventListener("DOMContentLoaded", injectComponents);
document.body.insertAdjacentHTML("beforeend", whatsappBtn);

// كود زر الواتساب الثابت

const scrollCounters = () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // كلما قل الرقم زادت السرعة

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        // بدلاً من setTimeout
        requestAnimationFrame(updateCount);
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

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // جلب البيانات
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // جلب عناصر الخطأ
    const nameErr = document.getElementById("nameError");
    const phoneErr = document.getElementById("phoneError");
    const msgErr = document.getElementById("messageError");

    // تصغير كل الأخطاء أولاً
    [nameErr, phoneErr, msgErr].forEach((el) => (el.style.display = "none"));

    let isValid = true;

    // التحقق من الاسم (فراغ أو أقل من 3)
    if (name === "" || name.length < 3) {
      nameErr.style.display = "block";
      isValid = false;
    }

    // التحقق من الهاتف (يمني 9 أرقام)
    const phoneRegex = /^(77|78|73|71|70)\d{7}$/;
    if (!phoneRegex.test(phone)) {
      phoneErr.style.display = "block";
      isValid = false;
    }

    // التحقق من الرسالة
    if (message === "") {
      msgErr.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // إذا البيانات صحيحة، نجهز الوقت والتاريخ والرسالة
    const now = new Date();
    const dateStr = now.toLocaleDateString("ar-YE");
    const timeStr = now.toLocaleTimeString("ar-YE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const fullMsg =
      `🧾 *طلب تواصل جديد - مصنع عوافي* \n` +
      `👤 *الاسم:* ${name}\n` +
      `📞 *الهاتف:* ${phone}\n` +
      `📅 *التاريخ:* ${dateStr}\n` +
      `⏰ *الوقت:* ${timeStr}\n` +
      `✉️ *الرسالة:* ${message}`;

    const myWhatsappNumber = "967776360668";
    window.open(
      `https://api.whatsapp.com/send?phone=${myWhatsappNumber}&text=${encodeURIComponent(fullMsg)}`,
      "_blank",
    );

    window.location.href = "thanks.html";
    contactForm.reset();
  });
}
