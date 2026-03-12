# 🔴 حل عاجل: رفع القالب يدوياً على Salla

**المشكلة:** الملفات غير موجودة على Salla CDN → 404 errors

**السبب:** `salla theme push` timeout + GitHub sync لم يعمل

**الحل:** رفع يدوي عبر Salla Dashboard

---

## 📦 الملف الجاهز للرفع

✅ **تم إنشاء:** `sufrah-upload.zip` (427 KB)

**يحتوي على:**
```
sufrah-upload.zip
├── assets/                    ✅ جميع الملفات المبنية
│   ├── app.css (331 KB)
│   ├── restaurant-systems.js (27 KB)
│   └── ... (14 ملف آخر)
├── src/                       ✅ الكود المصدري
│   ├── views/
│   └── locales/
├── twilight.json              ✅ التكوين
└── README.md                  ✅ التوثيق
```

---

## 🚀 خطوات الرفع اليدوي

### الطريقة 1: عبر Salla Partners Portal (الأسرع)

#### الخطوة 1: افتح Theme Settings
```
https://portal.salla.partners/themes/1872514480
```

#### الخطوة 2: ابحث عن قسم "Upload" أو "رفع ملفات"

في الصفحة، ابحث عن:
- **"Upload Theme Package"**
- أو **"رفع حزمة القالب"**
- أو **"Import from ZIP"**

#### الخطوة 3: ارفع الملف
```
اسحب وأفلت:
C:\Users\diaal\Downloads\Sufrah#0001\sufrah-upload.zip

أو اضغط "Browse" واختر الملف
```

#### الخطوة 4: انتظر المعالجة
- سيفك الضغط تلقائياً
- سيتحقق من twilight.json
- سيرفع الملفات على CDN

**⏱️ الوقت المتوقع:** 2-3 دقائق

---

### الطريقة 2: عبر FTP/SFTP (إذا متاح)

إذا كان لديك وصول FTP:

```
Host: [salla ftp host]
User: [your username]
Pass: [your password]

ارفع:
assets/ → /assets/
src/views/ → /views/
twilight.json → /twilight.json
```

---

### الطريقة 3: رفع الملفات فردياً (آخر حل)

إذا لم تعمل الطرق السابقة:

#### 1. افتح Theme Editor
```
https://s.salla.sa/themes/editor/draft-409616126
```

#### 2. ارفع CSS:
```
File: assets/app.css
Upload to: assets/app.css في المحرر
```

#### 3. ارفع JavaScript (بالترتيب):
```
1. assets/runtime.js
2. assets/vendors.js
3. assets/app.js
4. assets/restaurant-systems.js  ⭐ مهم!
5. assets/common.js
6. assets/product-card.js
7. assets/main-menu.js
... (باقي الملفات)
```

#### 4. ارفع الصور:
```
assets/images/* → assets/images/
```

#### 5. حدّث twilight.json:
```
انسخ محتوى twilight.json
الصقه في المحرر
احفظ
```

**⏱️ الوقت المتوقع:** 15-20 دقيقة

---

## 🔍 التحقق من نجاح الرفع

### 1. افتح Preview:
```
https://salla.sa/dev-lgeeymgfcresnou8
```

### 2. اضغط F12 → Console

**قبل الرفع (الآن):**
```
❌ Failed to load: app.css (404)
❌ Failed to load: app.js (404)
❌ Failed to load: restaurant-systems.js (404)
❌ Failed to load: product-card.js (404)
❌ CORS errors
```

**بعد الرفع (المتوقع):**
```
✅ app.css → 200 OK (331 KB)
✅ app.js → 200 OK (24 KB)
✅ restaurant-systems.js → 200 OK (27 KB)
✅ vendors.js → 200 OK (144 KB)
✅ runtime.js → 200 OK (1.4 KB)
✅ common.js → 200 OK (12 KB)
✅ product-card.js → 200 OK (13 KB)
✅ 0 errors
```

### 3. تحقق من Network Tab:

اذهب إلى **Network** → فلتر **CSS**:
```
✅ app.css
   Status: 200 OK
   Size: 331 KB
   Type: text/css
```

فلتر **JS**:
```
✅ runtime.js → 200 OK
✅ vendors.js → 200 OK
✅ app.js → 200 OK
✅ restaurant-systems.js → 200 OK ⭐
✅ common.js → 200 OK
✅ product-card.js → 200 OK
```

### 4. اختبر الصفحة:

**الصفحة الرئيسية:**
- ✅ التصميم يظهر (ألوان، خطوط)
- ✅ القوائم تعمل
- ✅ الصور تحمل

**صفحة المنتج:**
- ✅ بطاقة المنتج تعمل
- ✅ إضافة للسلة تعمل
- ✅ نظام الإضافات (modifiers) يعمل ⭐

---

## 🔴 إذا استمرت المشاكل

### مشكلة: 404 بعد الرفع

**السبب المحتمل:**
- الملفات رُفعت في مجلد خاطئ
- twilight.json غير محدّث

**الحل:**
```
1. تحقق من twilight.json في المحرر:
   "assets": {
     "css": ["assets/app.css"],  ← يجب أن يكون "assets/" وليس "dist/assets/"
     "js": [
       "assets/runtime.js",
       "assets/vendors.js",
       "assets/app.js"
     ]
   }

2. تأكد أن الملفات في مجلد assets/ مباشرة
   ❌ خطأ: dist/assets/app.css
   ✅ صح: assets/app.css
```

---

### مشكلة: MIME type error

**الخطأ:**
```
Refused to apply style because MIME type ('text/html') is not a supported stylesheet
```

**السبب:**
- السيرفر يعيد HTML (صفحة 404) بدلاً من CSS

**الحل:**
```
1. تأكد أن app.css موجود في assets/
2. امسح cache المتصفح (Ctrl+Shift+Delete)
3. افتح Incognito mode وأعد المحاولة
```

---

### مشكلة: التصميم لا يظهر

**الحل:**
```
1. افتح Network Tab
2. ابحث عن app.css
3. إذا كان:
   - 404: الملف غير موجود → أعد الرفع
   - 200: الملف موجود → امسح cache
   - 500: خطأ سيرفر → انتظر وحاول مرة أخرى
```

---

## 🎯 الملخص السريع

### المشكلة:
```
الملفات على GitHub ✅
لكن ليست على Salla CDN ❌
النتيجة: 404 errors في Preview
```

### الحل:
```
1. استخدم sufrah-upload.zip (427 KB)
2. ارفعه على Salla Portal
3. انتظر 2-3 دقائق
4. افتح Preview
5. تحقق من Console = 0 errors ✅
```

---

## 📞 روابط مهمة

### Salla Portal:
```
https://portal.salla.partners/themes/1872514480
```

### Preview URL:
```
https://salla.sa/dev-lgeeymgfcresnou8
```

### Theme Editor:
```
https://s.salla.sa/themes/editor/draft-409616126
```

---

## ✅ بعد نجاح الرفع

### 1. اختبر جميع الميزات:

**ميزات المطاعم:**
- [ ] ساعات العمل (business-hours.js)
- [ ] مناطق التوصيل (delivery-zones.js)
- [ ] جدولة الطلبات (scheduling.js)
- [ ] نظام الإضافات (modifiers.js)

**الصفحات الأساسية:**
- [ ] الصفحة الرئيسية
- [ ] صفحة المنتج
- [ ] السلة
- [ ] Checkout
- [ ] صفحة الشكر

### 2. تحقق من الأداء:

```
افتح Lighthouse (F12 → Lighthouse)
Run audit:
  - Performance: 80+ ✅
  - Accessibility: 90+ ✅
  - SEO: 100 ✅
```

### 3. أرسل للمراجعة:

```
Salla Partners Portal
→ Submit for Review
→ انتظر موافقة Salla
```

---

**🎯 الملف جاهز: `sufrah-upload.zip` (427 KB)**

**📍 الموقع:**
```
C:\Users\diaal\Downloads\Sufrah#0001\sufrah-upload.zip
```

**🚀 ارفعه الآن على:**
```
https://portal.salla.partners/themes/1872514480
```

---

**⏱️ الوقت المتوقع للحل الكامل: 5 دقائق**

1. رفع ZIP: 2 دقيقة
2. معالجة Salla: 2 دقيقة
3. اختبار Preview: 1 دقيقة

**🎉 ستعمل بعدها بنسبة 100%!**
