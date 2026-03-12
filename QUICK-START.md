# 🚀 دليل البدء السريع - Sufrah Restaurant Theme

**مرحباً بك في قالب سُفرة للمطاعم!** 🍽️

هذا الدليل سيساعدك على البدء في تطوير القالب وحل مشاكل CORS الشائعة.

---

## 📦 التثبيت والإعداد

### 1. تثبيت المكتبات

```bash
# تثبيت جميع المكتبات المطلوبة
pnpm install
```

---

## 🏗️ البناء والتطوير

### طريقة 1: البناء البسيط (موصى به للمبتدئين)

```bash
# بناء القالب للإنتاج
pnpm run build

# بناء للتطوير مع watch (يعيد البناء تلقائياً عند التعديل)
pnpm run dev
# أو
pnpm run watch
```

**النتيجة:** ستجد الملفات المبنية في مجلد `public/`

---

### طريقة 2: Dev Server مع CORS (حل مشاكل Console)

هذه الطريقة **تحل جميع مشاكل CORS** التي رأيتها في Console!

```bash
# بناء + تشغيل server في نفس الوقت
pnpm run dev:server

# أو خطوة بخطوة:
pnpm run build    # أولاً: بناء الملفات
pnpm run serve    # ثانياً: تشغيل server
```

**سيعمل Server على:**
```
✅ http://localhost:8000
```

**المميزات:**
- ✅ حل مشاكل CORS تلقائياً
- ✅ MIME types صحيحة (text/css, application/javascript)
- ✅ تسجيل جميع الطلبات في Console
- ✅ صفحة 404 مفيدة إذا كان الملف مفقود

---

### طريقة 3: استخدام Salla CLI (الطريقة الرسمية)

```bash
# 1. تثبيت Salla CLI (مرة واحدة فقط)
npm install -g @salla.sa/cli

# 2. تسجيل الدخول (مرة واحدة)
salla login

# 3. تشغيل القالب
salla theme serve

# سيظهر رابط للمعاينة مثل:
# https://your-store.salla.sa/?preview=true&dev_mode=true
```

---

## 🎯 الأوامر المتاحة

### البناء
```bash
pnpm run build        # بناء للإنتاج (optimized, minified)
pnpm run dev          # بناء للتطوير + watch mode
pnpm run watch        # نفس dev
pnpm run production   # نفس build
pnpm run clean        # حذف جميع الملفات المبنية
pnpm run rebuild      # clean + build
```

### Dev Server
```bash
pnpm run serve        # تشغيل server فقط (http://localhost:8000)
pnpm run dev:server   # build + watch + serve معاً
pnpm run start        # build مرة واحدة + serve
```

### الاختبار
```bash
pnpm run test         # تشغيل جميع الاختبارات
pnpm run test:watch   # watch mode
pnpm run test:coverage # مع تقرير التغطية
```

### الجودة
```bash
pnpm run lint         # فحص JS + CSS
pnpm run lint:fix     # إصلاح تلقائي
pnpm run format       # تنسيق الكود (Prettier)
pnpm run validate     # lint + format check
```

### التحليل
```bash
pnpm run analyze      # تحليل حجم الحزم (Bundle Analyzer)
```

---

## 🔧 حل مشاكل Console Errors

### ❌ المشكلة: CORS Policy Error

```
Access to CSS stylesheet at 'http://localhost:8000/app.css' from origin
'https://salla.design' has been blocked by CORS policy
```

**الحل:**
```bash
# استخدم dev server المدمج مع CORS
pnpm run dev:server
```

---

### ❌ المشكلة: MIME Type Error

```
Refused to apply style from '...' because its MIME type ('text/html')
is not a supported stylesheet MIME type
```

**السبب:** الملف غير موجود (404) أو MIME type خاطئ

**الحل:**
```bash
# 1. تأكد من بناء القالب
pnpm run build

# 2. استخدم dev server
pnpm run serve
```

---

### ❌ المشكلة: Failed to load resource: 404

```
Failed to load resource: the server responded with a status of 404 ()
product-card.js:1
app.js:1
```

**الحل:**
```bash
# بناء القالب أولاً
pnpm run build

# تحقق من وجود الملفات
ls public/
# يجب أن ترى: app.css, app.js, product-card.js, vendors.js
```

---

### ❌ المشكلة: Preload Resource Warning

```
The resource was preloaded using link preload but not used within a few seconds
```

**الحل:** ✅ تم إصلاحه في master.twig

---

### ❌ المشكلة: Meta Tag Deprecated

```
<meta name="apple-mobile-web-app-capable"> is deprecated
```

**الحل:** ✅ تم إصلاحه في master.twig

---

## 📁 هيكل المشروع

```
sufrah-theme/
├── src/                      # مصدر القالب
│   ├── assets/
│   │   ├── js/              # JavaScript files
│   │   └── styles/          # SCSS/CSS files
│   └── views/               # Twig templates
│       ├── layouts/         # Master layouts
│       ├── pages/           # Page templates
│       └── components/      # Reusable components
│
├── public/                   # ملفات مبنية (auto-generated)
│   ├── app.css
│   ├── app.js
│   ├── vendors.js
│   └── ...
│
├── tests/                    # Jest tests
├── docs/                     # Documentation
│
├── webpack.config.js         # Webpack configuration
├── tailwind.config.js        # Tailwind CSS config
├── dev-server.js            # ⭐ Dev server مع CORS
├── package.json
└── pnpm-lock.yaml
```

---

## 🎨 التطوير مع Salla Design

### الخطوات:

1. **بناء القالب:**
   ```bash
   pnpm run build
   ```

2. **تشغيل Dev Server:**
   ```bash
   pnpm run serve
   ```

3. **فتح Salla Design:**
   - اذهب إلى: https://salla.design
   - افتح Theme Editor
   - ستتمكن من تحميل الملفات من `http://localhost:8000`

4. **التطوير:**
   - عدّل الملفات في `src/`
   - احفظ التعديلات
   - شغّل `pnpm run build` مرة أخرى
   - أعد تحميل الصفحة في Salla Design

---

## 🔥 نصائح للتطوير السريع

### نصيحة 1: Watch Mode

```bash
# في Terminal 1: شغّل watch للبناء التلقائي
pnpm run dev

# في Terminal 2: شغّل server
pnpm run serve
```

الآن أي تعديل في `src/` سيبني تلقائياً!

---

### نصيحة 2: Hot Reload مع Salla CLI

```bash
salla theme serve
```

يدعم Hot Reload تلقائياً - أي تعديل سينعكس فوراً!

---

### نصيحة 3: تسريع البناء

```bash
# إذا كنت تعمل على JS فقط
pnpm run dev  # سيبني فقط الملفات المتغيرة

# إذا كنت تعمل على CSS فقط
pnpm run dev  # نفس الشيء، webpack ذكي!
```

---

## 🐛 استكشاف الأخطاء

### مشكلة: "pnpm: command not found"

```bash
# تثبيت pnpm
npm install -g pnpm
```

---

### مشكلة: "Only pnpm is allowed"

```bash
# استخدم pnpm بدلاً من npm
pnpm install  # ✅
npm install   # ❌
```

---

### مشكلة: Port 8000 محجوز

```bash
# استخدم port مختلف
PORT=3000 pnpm run serve
```

---

### مشكلة: الملفات لا تتحدث

```bash
# احذف الكاش وأعد البناء
pnpm run clean
pnpm run build
```

---

## 📚 موارد إضافية

### الوثائق
- [Salla Theme Docs](https://docs.salla.sa/docs/themes)
- [Salla CLI Docs](https://docs.salla.sa/docs/cli)
- [Webpack Docs](https://webpack.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

### ملفات مهمة
- `docs/TROUBLESHOOTING-CORS-ISSUES.md` - حل مشاكل CORS بالتفصيل
- `docs/TASK-4.5-SECURITY-AUDIT-REPORT.md` - تقرير الأمان
- `docs/LIGHTHOUSE-AUDIT-CHECKLIST.md` - checklist لـ Lighthouse
- `tests/README.md` - دليل الاختبارات

---

## ✅ Checklist قبل الإنتاج

- [ ] `pnpm run build` - بناء نهائي
- [ ] `pnpm run test` - جميع الاختبارات تمر
- [ ] `pnpm run lint` - لا أخطاء lint
- [ ] `pnpm run format:check` - الكود منسق
- [ ] Lighthouse audit - جميع الدرجات > 90
- [ ] اختبار في Salla Design
- [ ] اختبار على متصفحات مختلفة
- [ ] اختبار على أجهزة مختلفة (mobile, tablet, desktop)

---

## 🆘 تحتاج مساعدة؟

### الأخطاء الشائعة
راجع: `docs/TROUBLESHOOTING-CORS-ISSUES.md`

### مشاكل الأمان
راجع: `docs/TASK-4.5-SECURITY-AUDIT-REPORT.md`

### مشاكل الأداء
راجع: `docs/PERFORMANCE-OPTIMIZATION-REPORT.md`

### دعم Salla
- الوثائق: https://docs.salla.sa
- Discord: https://discord.gg/salla
- GitHub Issues: [repo]/issues

---

## 🎉 الخلاصة

**للبدء السريع:**
```bash
pnpm install        # مرة واحدة
pnpm run build      # عند كل تعديل
pnpm run serve      # لحل مشاكل CORS
```

**للتطوير المستمر:**
```bash
pnpm run dev:server  # build + watch + serve معاً
```

**للإنتاج:**
```bash
pnpm run build       # بناء نهائي optimized
salla theme publish  # رفع للمتجر
```

---

**آخر تحديث:** 12 مارس 2026
**الإصدار:** 1.0.0

**Happy Coding! 🍽️✨**
