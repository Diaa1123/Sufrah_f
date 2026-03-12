# 🔧 حل مشاكل CORS و Console Errors

**التاريخ:** 12 مارس 2026
**المشكلة:** أخطاء CORS عند تشغيل القالب في بيئة التطوير

---

## 🚨 الأخطاء الظاهرة في Console

### 1. خطأ MIME Type (الأهم)
```
Refused to apply style from 'dev-lgeeymgfcresnou8/?service=true1'
because its MIME type ('text/html') is not a supported stylesheet MIME type
```

**السبب:** السيرفر يرجع HTML (صفحة خطأ 404) بدلاً من ملف CSS
**الحل:** راجع القسم [الحل الكامل](#-الحل-الكامل) أدناه

---

### 2. خطأ 404 (موارد مفقودة)
```
Failed to load resource: the server responded with a status of 404 ()
- product-card.js:1
- app.js:1
```

**السبب:** الملفات غير موجودة في مجلد `public/`
**الحل:** قم ببناء القالب أولاً

---

### 3. خطأ Translations 500
```
cdn.translations.salla.network/v2/translations/ar/themes:1
Failed to load resource: the server responded with a status of 500 ()
```

**السبب:** مشكلة مؤقتة في CDN ترجمات Salla
**الحل:** ليس له تأثير على القالب، سيتم حله تلقائياً

---

### 4. تحذير Preload Resources
```
The resource <URL> was preloaded using link preload but not used within a few seconds
```

**السبب:** استخدام `preload` على موارد غير ضرورية
**الحل:** تم إصلاحه في master.twig

---

### 5. تحذير Meta Tag Deprecated
```
<meta name="apple-mobile-web-app-capable" content="yes"> is deprecated
```

**الحل:** ✅ تم إصلاحه (استخدام media queries)

---

## ✅ الحل الكامل (خطوة بخطوة)

### الخطوة 1: بناء القالب

```bash
cd "C:\Users\diaal\Downloads\Sufrah#0001"

# بناء الملفات
pnpm run build
```

**النتيجة المتوقعة:**
```
✅ public/app.css (تم إنشاؤه)
✅ public/app.js (تم إنشاؤه)
✅ public/product-card.js (تم إنشاؤه)
✅ public/vendors.js (تم إنشاؤه)
```

---

### الخطوة 2: تشغيل Salla CLI (الطريقة الرسمية)

```bash
# 1. تثبيت Salla CLI (إذا لم يكن مثبتاً)
npm install -g @salla.sa/cli

# 2. تسجيل الدخول
salla login

# 3. تشغيل القالب
salla theme serve

# 4. افتح الرابط الذي يظهر
# مثال: https://your-store.salla.sa/?preview=true&dev_mode=true
```

---

### الخطوة 3: حل بديل (إذا لم يعمل Salla CLI)

إذا واجهت مشاكل مع Salla CLI، استخدم هذا الحل:

#### أ) تشغيل Local Server مع CORS Headers

**إنشاء ملف `dev-server.js` في جذر المشروع:**

```javascript
// dev-server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Set correct MIME types
  const ext = path.extname(req.url);
  if (ext === '.css') {
    res.header('Content-Type', 'text/css; charset=utf-8');
  } else if (ext === '.js') {
    res.header('Content-Type', 'application/javascript; charset=utf-8');
  }

  next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Dev server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
  console.log(`\n🔧 CORS enabled - Safe to use with Salla Design\n`);
});
```

**تثبيت Express:**
```bash
pnpm add -D express
```

**إضافة script في package.json:**
```json
{
  "scripts": {
    "dev:server": "node dev-server.js",
    "dev:build": "webpack --mode development --watch",
    "dev": "concurrently \"pnpm run dev:build\" \"pnpm run dev:server\""
  }
}
```

**تثبيت concurrently:**
```bash
pnpm add -D concurrently
```

**تشغيل:**
```bash
pnpm run dev
```

---

#### ب) استخدام Chrome مع CORS Disabled (حل مؤقت)

⚠️ **تحذير:** للتطوير فقط!

**على Windows:**
```powershell
# أغلق Chrome تماماً أولاً، ثم:
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --disable-web-security `
  --user-data-dir="C:\chrome-dev" `
  --allow-insecure-localhost `
  --unsafely-treat-insecure-origin-as-secure="http://localhost:8000"
```

**على Mac:**
```bash
# أغلق Chrome تماماً أولاً، ثم:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --disable-web-security \
  --user-data-dir="/tmp/chrome-dev" \
  --allow-insecure-localhost \
  --unsafely-treat-insecure-origin-as-secure="http://localhost:8000"
```

**على Linux:**
```bash
# أغلق Chrome تماماً أولاً، ثم:
google-chrome \
  --disable-web-security \
  --user-data-dir="/tmp/chrome-dev" \
  --allow-insecure-localhost \
  --unsafely-treat-insecure-origin-as-secure="http://localhost:8000"
```

**ملاحظات:**
- ستظهر رسالة تحذير "You are using an unsupported command-line flag"
- **لا تستخدم** هذا Chrome للتصفح العادي
- أغلق Chrome وافتحه بشكل عادي بعد الانتهاء

---

## 🎯 الطريقة الموصى بها (الأفضل)

### استخدام Salla Theme Development Kit

```bash
# 1. بناء القالب
pnpm run build

# 2. رفع القالب لحساب Salla الخاص بك
salla theme publish

# 3. معاينة القالب في المتجر
# افتح: https://your-store.salla.sa/?preview=true
```

**مميزات هذه الطريقة:**
- ✅ لا مشاكل CORS
- ✅ بيئة تطوير حقيقية
- ✅ اختبار كامل للميزات
- ✅ دعم Hot Reload (مع Salla CLI)

---

## 📝 Quick Fix Checklist

عند ظهور أخطاء Console، اتبع هذه الخطوات:

- [ ] **1. بناء القالب:**
  ```bash
  pnpm run build
  ```

- [ ] **2. التحقق من وجود الملفات:**
  ```bash
  ls public/
  # يجب أن ترى: app.css, app.js, product-card.js, vendors.js
  ```

- [ ] **3. مسح الكاش:**
  ```bash
  # مسح كاش المتصفح (Ctrl+Shift+Delete)
  # أو Hard Reload (Ctrl+Shift+R / Cmd+Shift+R)
  ```

- [ ] **4. استخدام Salla CLI:**
  ```bash
  salla theme serve
  ```

- [ ] **5. إذا فشل كل شيء:**
  - استخدم الحل البديل (dev-server.js)
  - أو Chrome مع CORS disabled

---

## 🐛 مشاكل شائعة وحلولها

### المشكلة: "Failed to load resource: net::ERR_FAILED"

**السبب:** الملف غير موجود أو CORS
**الحل:**
```bash
# تأكد من بناء القالب
pnpm run build

# تحقق من وجود الملف
ls public/app.css
```

---

### المشكلة: "MIME type ('text/html') is not a supported stylesheet"

**السبب:** السيرفر يرجع HTML بدلاً من CSS (404 error)
**الحل:**
1. تأكد من بناء القالب (`pnpm run build`)
2. استخدم dev-server.js مع CORS headers
3. أو استخدم Salla CLI

---

### المشكلة: "Access to ... has been blocked by CORS policy"

**السبب:** قيود أمان المتصفح
**الحل:**
1. **الأفضل:** استخدم Salla CLI (`salla theme serve`)
2. **بديل:** استخدم dev-server.js مع CORS headers
3. **مؤقت:** Chrome مع CORS disabled

---

## 📚 موارد إضافية

### روابط مفيدة
- [Salla CLI Documentation](https://docs.salla.sa/docs/cli)
- [Theme Development Guide](https://docs.salla.sa/docs/themes)
- [CORS Explained (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### أوامر مفيدة

```bash
# بناء للإنتاج
pnpm run build

# بناء للتطوير مع watch
pnpm run dev
pnpm run watch

# تنظيف الملفات المبنية
pnpm run clean

# إعادة بناء كاملة
pnpm run rebuild

# تشغيل Salla dev server
salla theme serve

# رفع القالب
salla theme publish

# عرض إصدار Salla CLI
salla --version

# تسجيل دخول جديد
salla login

# عرض معلومات القالب
salla theme info
```

---

## ✅ ملخص الحل

| المشكلة | الحل السريع | الحل الكامل |
|---------|-------------|-------------|
| **404 Errors** | `pnpm run build` | بناء + dev server |
| **CORS Errors** | Salla CLI | dev-server.js مع CORS |
| **MIME Type** | التحقق من الملفات | dev-server.js |
| **Translations 500** | تجاهله | مؤقت من Salla |
| **Preload Warning** | ✅ تم الإصلاح | في master.twig |
| **Meta Deprecated** | ✅ تم الإصلاح | في master.twig |

---

**آخر تحديث:** 12 مارس 2026
**الحالة:** ✅ جميع الحلول متاحة ومختبرة

---

## 🆘 تحتاج مساعدة؟

إذا استمرت المشاكل:
1. تأكد من بناء القالب (`pnpm run build`)
2. جرب Salla CLI (`salla theme serve`)
3. راجع console للأخطاء الجديدة
4. تواصل مع دعم Salla الفني

**النهاية** 🎉
