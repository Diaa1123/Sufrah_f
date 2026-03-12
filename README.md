<div id="top"></div>
<br />
<div align="center">
  <h1>🍽️ Sufrah - قالب سلة المتخصص للمطاعم</h1>
  <p align="center">
    <strong>أول قالب متخصص على منصة سلة لقطاع المطاعم والمطابخ السحابية</strong>
    <br />
    First specialized Salla theme for restaurants and cloud kitchens
    <br />
    <br />
    <a href="https://salla.dev/"><strong>استكشف مدونة سلة »</strong></a>
    <br />
    <a href="https://github.com/[your-repo]/sufrah/issues/new">الإبلاغ عن مشكلة</a> ·
    <a href="https://github.com/[your-repo]/sufrah/discussions/new">طلب ميزة</a> ·
    <a href="https://docs.salla.dev/">التوثيق الرسمي</a>
  </p>
</div>

---

## 📋 جدول المحتويات

<details open>
  <summary>المحتويات</summary>
  <ol>
    <li><a href="#overview">نظرة عامة</a></li>
    <li><a href="#unique-features">الميزات الفريدة</a></li>
    <li><a href="#getting-started">البدء السريع</a>
      <ul>
        <li><a href="#prerequisites">المتطلبات</a></li>
        <li><a href="#installation">التثبيت</a></li>
      </ul>
    </li>
    <li><a href="#directory-structure">هيكل المشروع</a></li>
    <li><a href="#development">التطوير</a></li>
    <li><a href="#restaurant-features">ميزات المطاعم المتخصصة</a></li>
    <li><a href="#customization">التخصيص</a></li>
    <li><a href="#deployment">النشر</a></li>
    <li><a href="#support">الدعم</a></li>
    <li><a href="#roadmap">خارطة الطريق</a></li>
    <li><a href="#license">الترخيص</a></li>
  </ol>
</details>

---

<h2 id="overview">🌟 نظرة عامة</h2>

**Sufrah** هو قالب متخصص مبني على قالب **Theme Raed** من سلة، مصمم خصيصاً لتلبية احتياجات:

- 🍕 **المطاعم التقليدية**
- 🥡 **المطابخ السحابية (Cloud Kitchens)**
- 🚚 **خدمات توصيل الطعام**
- ☕ **المقاهي والكافيهات**

تم بناء Sufrah باستخدام [Twilight Themes Engine](https://docs.salla.dev/?nav=01HNFTD5Y5ESFQS3P9MJ0721VM) ويحتوي على ميزات متقدمة مصممة خصيصاً لقطاع الأغذية والمشروبات.

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="unique-features">✨ الميزات الفريدة</h2>

### 🎯 ميزات مخصصة للمطاعم

| الميزة | الوصف | الحالة |
|--------|--------|--------|
| **نظام الإضافات والتعديلات** | إدارة إضافات المنتجات (صوصات، مشروبات، إضافات) مع التحكم بالأسعار | 🔄 قيد التطوير |
| **مناطق التوصيل الديناميكية** | إدارة مناطق التوصيل ورسومها بناءً على الموقع الجغرافي | 🔄 قيد التطوير |
| **جدولة الطلبات المسبقة** | السماح للعملاء بجدولة طلباتهم مسبقاً | 📋 مخطط |
| **ساعات العمل الحية** | عرض حالة المطعم (مفتوح/مغلق) بناءً على ساعات العمل | 📋 مخطط |
| **بطاقات المنتجات المحسّنة** | تصميم مخصص لعرض الأطباق مع الصور والأسعار والوصف | 📋 مخطط |
| **قائمة طعام بالفئات** | تنظيم المنتجات في فئات (مقبلات، أطباق رئيسية، حلويات...) | 📋 مخطط |

### 🛠️ ميزات تقنية

- ✅ **متوافق 100% مع Salla API**
- ✅ **مبني على TailwindCSS** للتخصيص السهل
- ✅ **دعم كامل للغتين** (العربية والإنجليزية)
- ✅ **تصميم متجاوب** لجميع الأجهزة
- ✅ **أداء محسّن** لتحميل سريع

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="getting-started">🚀 البدء السريع</h2>

<h3 id="prerequisites">📦 المتطلبات</h3>

قبل البدء، تأكد من توفر:

- **Node.js** >= 16.0.0
- **pnpm** (مدير الحزم المفضل)
- **حساب شريك** على [Salla Partners Portal](https://salla.partners/)
- **متجر تجريبي** لاختبار القالب
- **معرفة أساسية** بـ HTML, CSS, JavaScript و [Twig Template Engine](https://twig.symfony.com/)
- **Salla CLI** مثبت عالمياً:
  ```bash
  npm install -g @salla.sa/cli
  ```

<h3 id="installation">⚡ التثبيت</h3>

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/[your-repo]/sufrah.git
   cd sufrah
   ```

2. **تثبيت التبعيات**
   ```bash
   pnpm install
   ```

3. **تكوين إعدادات سلة**
   ```bash
   # ربط القالب بمتجرك التجريبي
   salla theme link
   ```

4. **بدء التطوير**
   ```bash
   pnpm run dev
   ```

5. **معاينة القالب**
   ```bash
   # في نافذة طرفية منفصلة
   salla theme preview
   ```

الآن يمكنك فتح المتجر التجريبي في المتصفح ومشاهدة التغييرات مباشرة!

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="directory-structure">📁 هيكل المشروع</h2>

```
sufrah/
├── src/
│   ├── assets/
│   │   ├── js/
│   │   │   ├── [...theme-raed original files]
│   │   │   └── restaurant/              # ⭐ ميزات المطاعم المخصصة
│   │   │       ├── modifiers.js         # نظام الإضافات والتعديلات
│   │   │       ├── delivery-zones.js    # إدارة مناطق التوصيل
│   │   │       ├── scheduling.js        # جدولة الطلبات
│   │   │       └── business-hours.js    # ساعات العمل
│   │   │
│   │   ├── styles/
│   │   │   ├── [...theme-raed original structure]
│   │   │   └── restaurant/              # ⭐ تنسيقات المطاعم المخصصة
│   │   │       ├── _variables.scss      # متغيرات المطاعم
│   │   │       ├── _menu-card.scss      # بطاقات قائمة الطعام
│   │   │       ├── _modifiers-ui.scss   # واجهة الإضافات
│   │   │       └── _restaurant-theme.scss
│   │   │
│   │   └── images/
│   │       └── restaurant/              # صور وأيقونات المطاعم
│   │
│   ├── views/
│   │   ├── components/
│   │   │   ├── [...theme-raed original]
│   │   │   └── restaurant/              # ⭐ مكونات المطاعم المخصصة
│   │   │       ├── menu-nav.twig
│   │   │       ├── dish-card.twig
│   │   │       ├── modifiers-modal.twig
│   │   │       ├── business-hours-widget.twig
│   │   │       └── delivery-zone-selector.twig
│   │   │
│   │   ├── layouts/
│   │   │   └── master.twig
│   │   │
│   │   └── pages/
│   │       ├── index.twig               # الصفحة الرئيسية
│   │       ├── product/
│   │       ├── cart.twig
│   │       └── ...
│   │
│   └── locales/
│       ├── ar.json                      # الترجمة العربية
│       └── en.json                      # الترجمة الإنجليزية
│
├── docs/                                # 📚 التوثيق
│   ├── API-GUIDE.md
│   ├── COMPONENTS.md
│   └── CUSTOMIZATION.md
│
├── tests/                               # 🧪 الاختبارات
│
├── public/                              # الملفات المُنتَجة (auto-generated)
│
├── twilight.json                        # إعدادات القالب
├── package.json
├── webpack.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="development">💻 التطوير</h2>

### الأوامر المتاحة

```bash
# تشغيل بيئة التطوير مع المراقبة التلقائية
pnpm run dev

# البناء للإنتاج
pnpm run build

# معاينة القالب في المتصفح
salla theme preview

# رفع القالب إلى سلة
salla theme publish
```

### سير العمل المقترح

1. **قم بإنشاء فرع جديد** لكل ميزة
   ```bash
   git checkout -b feature/modifier-system
   ```

2. **قم بالتطوير** مع المراقبة التلقائية
   ```bash
   pnpm run dev
   ```

3. **اختبر التغييرات** باستخدام `salla theme preview`

4. **ابنِ للإنتاج** وتأكد من عدم وجود أخطاء
   ```bash
   pnpm run build
   ```

5. **قم بعمل commit ورفع التغييرات**
   ```bash
   git add .
   git commit -m "Add: modifier system basic structure"
   git push origin feature/modifier-system
   ```

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="restaurant-features">🍽️ ميزات المطاعم المتخصصة</h2>

### 1️⃣ نظام الإضافات والتعديلات (Modifiers)

يسمح للعملاء بتخصيص طلباتهم:
- اختيار الصوصات
- إضافة مكونات إضافية
- تعديل مستوى الحرارة (حار، متوسط، خفيف)
- تحديد حجم الوجبة

📄 **الملفات المرتبطة:**
- [src/assets/js/restaurant/modifiers.js](src/assets/js/restaurant/modifiers.js)
- [src/views/components/restaurant/modifiers-modal.twig](src/views/components/restaurant/modifiers-modal.twig)

### 2️⃣ مناطق التوصيل الديناميكية

إدارة تلقائية لمناطق التوصيل:
- حساب رسوم التوصيل بناءً على المنطقة
- تحديد المناطق المتاحة للتوصيل
- عرض وقت التوصيل المتوقع

📄 **الملفات المرتبطة:**
- [src/assets/js/restaurant/delivery-zones.js](src/assets/js/restaurant/delivery-zones.js)

### 3️⃣ جدولة الطلبات المسبقة

يسمح للعملاء بطلب الطعام لوقت محدد مستقبلاً:
- اختيار التاريخ والوقت
- التحقق من التوفر
- إشعارات تذكيرية

📄 **الملفات المرتبطة:**
- [src/assets/js/restaurant/scheduling.js](src/assets/js/restaurant/scheduling.js)

### 4️⃣ ساعات العمل الحية

عرض حالة المطعم الحالية:
- عرض "مفتوح الآن" أو "مغلق"
- عرض الوقت المتبقي حتى الإغلاق/الافتتاح
- تكامل مع نظام الطلبات

📄 **الملفات المرتبطة:**
- [src/assets/js/restaurant/business-hours.js](src/assets/js/restaurant/business-hours.js)
- [src/views/components/restaurant/business-hours-widget.twig](src/views/components/restaurant/business-hours-widget.twig)

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="customization">🎨 التخصيص</h2>

### تخصيص الألوان والخطوط

استخدم ملف [tailwind.config.js](tailwind.config.js) لتخصيص الألوان:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'restaurant-primary': '#FF6B35',
        'restaurant-secondary': '#F7931E',
        // أضف ألوانك المخصصة
      }
    }
  }
}
```

### تخصيص المتغيرات

عدّل [src/assets/styles/restaurant/_variables.scss](src/assets/styles/restaurant/_variables.scss):

```scss
$restaurant-primary-color: #FF6B35;
$restaurant-card-radius: 12px;
$restaurant-spacing: 1.5rem;
```

### تخصيص المكونات

جميع مكونات المطاعم قابلة للتعديل في:
- `src/views/components/restaurant/`

راجع [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) لمزيد من التفاصيل.

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="deployment">🚀 النشر</h2>

### النشر على سلة

1. **تأكد من اكتمال البناء**
   ```bash
   pnpm run build
   ```

2. **ارفع القالب**
   ```bash
   salla theme publish
   ```

3. **قم بتفعيل القالب** من لوحة التحكم في سلة

### قائمة المراجعة قبل النشر

- [ ] اختبار جميع الميزات على متجر تجريبي
- [ ] التأكد من عمل الترجمات (العربية والإنجليزية)
- [ ] اختبار التوافق مع جميع المتصفحات
- [ ] اختبار الاستجابة على جميع الأجهزة
- [ ] مراجعة الأداء (PageSpeed, GTmetrix)
- [ ] التأكد من عدم وجود أخطاء في Console

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="support">🆘 الدعم</h2>

### واجهت مشكلة؟

- 🐛 [افتح Issue](https://github.com/[your-repo]/sufrah/issues/new) على GitHub
- 💬 انضم إلى [مجتمع مطوري سلة على Telegram](https://t.me/salladev)
- 📧 تواصل عبر [Salla Support Bot](https://t.me/SallaSupportBot)

### الموارد المفيدة

- [توثيق Salla الرسمي](https://docs.salla.dev/)
- [توثيق Twilight Themes](https://docs.salla.dev/?nav=01HNFTD5Y5ESFQS3P9MJ0721VM)
- [Salla Partners Portal](https://salla.partners/)

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="roadmap">🗓️ خارطة الطريق</h2>

### Phase 1: الأساسيات (الحالية)
- [x] إعداد بنية المشروع
- [ ] نظام الإضافات والتعديلات
- [ ] مناطق التوصيل الديناميكية

### Phase 2: الميزات المتقدمة
- [ ] جدولة الطلبات المسبقة
- [ ] ساعات العمل الحية
- [ ] تحسينات UX للمطاعم

### Phase 3: التحسينات
- [ ] تحسين الأداء
- [ ] إضافة اختبارات تلقائية
- [ ] توثيق شامل

### Phase 4: الميزات الإضافية
- [ ] نظام الولاء للمطاعم
- [ ] تكامل مع أنظمة نقاط البيع
- [ ] تقارير وتحليلات متقدمة

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>

---

<h2 id="license">📄 الترخيص</h2>

هذا المشروع مرخص بموجب **MIT License** - راجع ملف [LICENSE.md](LICENSE.md) لمزيد من التفاصيل.

---

<div align="center">
  <p>
    صُنع بـ ❤️ بواسطة <a href="https://github.com/[your-username]">Diaa</a>
  </p>
  <p>
    مبني على <a href="https://github.com/SallaApp/theme-raed">Theme Raed</a> من <a href="https://salla.sa">Salla</a>
  </p>
</div>

<p align="right">(<a href="#top">العودة للأعلى</a>)</p>
"# Sufrah_f" 
