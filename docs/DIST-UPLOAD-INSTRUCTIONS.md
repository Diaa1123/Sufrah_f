# 📦 Salla Theme Upload Instructions - Sufrah Theme

**تاريخ:** 2026-03-12
**الحالة:** ✅ جاهز للرفع على Salla Theme Editor

---

## ✅ تم إنجازه بنجاح

### 1. بناء الملفات في المسار الصحيح
```bash
✅ webpack.config.js - تم تعديل output path من public/ إلى dist/assets/
✅ pnpm run build - تم البناء بنجاح
✅ جميع الملفات موجودة في dist/assets/
```

### 2. الملفات المُنتَجة والأحجام

#### ملفات CSS:
- **app.css** - 331 KB (330 KB بعد التحسين)

#### ملفات JavaScript:
- **runtime.js** - 1.1 KB (Webpack runtime)
- **vendors.js** - 144 KB (مكتبات خارجية)
- **app.js** - 25 KB (التطبيق الرئيسي)
- **product-card.js** - 14 KB (بطاقة المنتج)
- **checkout.js** - 11 KB
- **add-product-toast.js** - 9 KB
- **main-menu.js** - 6.1 KB
- **product.js** - 6.9 KB
- **digital-files.js** - 3.4 KB
- **pages.js** - 2.9 KB
- **wishlist-card.js** - 2.8 KB
- **home.js** - 2.1 KB
- **testimonials.js** - 2.0 KB
- **order.js** - 2.0 KB

#### ملفات الصور (dist/images/):
- placeholder.png
- check.svg
- delivery-bro.svg
- s-empty.png
- s-empty-small.png
- s-empty-square.png
- s-empty-wide.png

---

## 📋 twilight.json - تم التحديث

تم إضافة قسم `assets` إلى ملف twilight.json:

```json
{
  "assets": {
    "css": [
      "dist/assets/app.css"
    ],
    "js": [
      "dist/assets/runtime.js",
      "dist/assets/vendors.js",
      "dist/assets/app.js"
    ]
  }
}
```

**ملاحظة مهمة:** الملفات الأخرى (product-card.js, main-menu.js, إلخ) يتم تحميلها عبر `{{ 'filename.js'|asset }}` في ملفات Twig، لذا لا تحتاج لإضافتها في twilight.json.

---

## 🚀 خطوات الرفع على Salla

### الطريقة 1: استخدام Salla CLI (الموصى بها)

#### 1. تسجيل الدخول إلى Salla CLI
```bash
salla login
```

#### 2. رفع القالب
```bash
cd C:\Users\diaal\Downloads\Sufrah#0001
salla theme push
```

سيقوم Salla CLI بـ:
- ✅ رفع جميع ملفات dist/
- ✅ رفع ملفات src/views/
- ✅ تطبيق twilight.json
- ✅ تحديث القالب في Salla Theme Editor

#### 3. التحقق من الرفع
```bash
salla theme list
```

---

### الطريقة 2: الرفع اليدوي عبر Salla Theme Editor

#### الخطوات:

1. **الدخول إلى Salla Merchant Dashboard**
   - افتح https://s.salla.sa/dashboard
   - اذهب إلى: **التصميم > محرر القوالب** (Theme Editor)

2. **اختيار قالب Sufrah**
   - اختر القالب من القائمة
   - اضغط على **تحرير** (Edit)

3. **رفع الملفات:**

   #### أ) رفع ملفات CSS:
   ```
   المسار: dist/assets/app.css
   الرفع إلى: assets/app.css في محرر القوالب
   ```

   #### ب) رفع ملفات JavaScript (بالترتيب):
   ```
   1. dist/assets/runtime.js     → assets/runtime.js
   2. dist/assets/vendors.js     → assets/vendors.js
   3. dist/assets/app.js         → assets/app.js
   4. dist/assets/product-card.js → assets/product-card.js
   5. dist/assets/main-menu.js   → assets/main-menu.js
   6. dist/assets/add-product-toast.js → assets/add-product-toast.js
   7. dist/assets/checkout.js    → assets/checkout.js
   8. dist/assets/product.js     → assets/product.js
   ... (رفع باقي الملفات حسب الحاجة)
   ```

   #### ج) رفع ملفات الصور:
   ```
   المسار: dist/images/*
   الرفع إلى: assets/images/ في محرر القوالب
   ```

4. **تحديث twilight.json:**
   - افتح ملف twilight.json في محرر القوالب
   - تأكد من وجود قسم `assets` كما هو موضح أعلاه
   - احفظ التغييرات

5. **حفظ ونشر:**
   - اضغط على **حفظ** (Save)
   - اضغط على **نشر** (Publish) لتفعيل التغييرات

---

## 🧪 التحقق من نجاح الرفع

### 1. افتح Preview في Salla Theme Editor
```
https://salla.design/preview/your-store-id
```

### 2. افتح Console في المتصفح (F12)
تحقق من:
- ✅ **0 أخطاء CORS**
- ✅ **0 أخطاء 404**
- ✅ **app.css loaded (200 OK)**
- ✅ **app.js loaded (200 OK)**
- ✅ **runtime.js loaded (200 OK)**
- ✅ **vendors.js loaded (200 OK)**
- ✅ **product-card.js loaded (200 OK)**

### 3. تحقق من Network Tab
```
Filter: CSS
✅ app.css - 200 OK - ~330 KB

Filter: JS
✅ runtime.js - 200 OK - ~1 KB
✅ vendors.js - 200 OK - ~144 KB
✅ app.js - 200 OK - ~25 KB
✅ product-card.js - 200 OK - ~14 KB
```

### 4. تحقق من التصميم
- ✅ الألوان تظهر بشكل صحيح
- ✅ الخطوط تعمل
- ✅ التفاعلات (Hover, Click) تعمل
- ✅ بطاقات المنتجات تعمل
- ✅ القائمة الرئيسية تعمل
- ✅ سلة الشراء تعمل

---

## 🔍 استكشاف الأخطاء

### إذا ظهرت أخطاء 404:

1. **تحقق من مسارات الملفات في twilight.json:**
   ```json
   "assets": {
     "css": ["dist/assets/app.css"],  // تأكد من المسار الصحيح
     "js": [
       "dist/assets/runtime.js",
       "dist/assets/vendors.js",
       "dist/assets/app.js"
     ]
   }
   ```

2. **تحقق من رفع الملفات:**
   - افتح Salla Theme Editor
   - تحقق من وجود المجلد `assets/`
   - تحقق من وجود جميع الملفات داخله

3. **امسح Cache المتصفح:**
   ```
   Ctrl + Shift + Delete (Chrome/Edge)
   أو استخدم Incognito Mode
   ```

### إذا لم تظهر التصميمات:

1. **تحقق من تحميل app.css:**
   - افتح Network Tab
   - ابحث عن app.css
   - تأكد من أنه يعود 200 OK وليس 404

2. **تحقق من MIME Type:**
   - Content-Type يجب أن يكون `text/css`
   - إذا كان `text/html` معناه الملف غير موجود

3. **تحقق من Tailwind CSS:**
   - افتح Console
   - اكتب: `document.querySelector('link[href*="app.css"]')`
   - يجب أن يعرض عنصر `<link>` صحيح

---

## 📊 الخطوات التالية بعد الرفع

### بعد نجاح الرفع والتحقق:

1. **Task 4.6: Lighthouse Audit (النهائي)**
   - الآن يمكن تشغيل Lighthouse على Preview URL الحقيقي
   - المتوقع: Performance 90+, Accessibility 95+, SEO 100

2. **Task 4.7: Cross-Browser Testing**
   - اختبار على Chrome, Safari, Firefox, Edge
   - اختبار على iOS Safari و Android Chrome

3. **Task 4.8: Final UAT (User Acceptance Testing)**
   - اختبار تدفقات المستخدم كاملة
   - اختبار جميع الصفحات والمكونات

4. **Task 5.1: Documentation**
   - توثيق ميزات القالب
   - دليل الاستخدام للتجار
   - دليل المطور للتخصيص

---

## 🎯 ملخص الحالة

### ✅ تم إنجازه:
- [x] إصلاح webpack.config.js للإخراج في dist/assets/
- [x] بناء جميع الملفات بنجاح
- [x] تحديث twilight.json بقسم assets
- [x] التحقق من وجود جميع الملفات المطلوبة
- [x] التحقق من أحجام الملفات
- [x] التحقق من استخدام asset filter في master.twig

### 🔄 الخطوة الحالية:
- [ ] **رفع الملفات على Salla Theme Editor**
  - استخدم `salla theme push` (الموصى به)
  - أو الرفع اليدوي عبر Dashboard

### ⏭️ الخطوات التالية:
- [ ] التحقق من نجاح الرفع في Preview
- [ ] إصلاح أي أخطاء Console
- [ ] بدء Task 4.6 - Lighthouse Audit النهائي

---

## 📝 ملاحظات مهمة

### 1. الملفات الإضافية:
ملفات مثل `checkout.js`, `product.js`, `main-menu.js` لا تحتاج لإضافتها في `twilight.json` لأنها يتم تحميلها مباشرة عبر:
```twig
<script defer src="{{ 'main-menu.js'|asset }}"></script>
```

### 2. Code Splitting:
Webpack يقسم الكود إلى:
- **runtime.js** - Webpack runtime (يجب تحميله أولاً)
- **vendors.js** - المكتبات الخارجية (React, lodash, إلخ)
- **app.js** - كود التطبيق الرئيسي
- **[page].js** - أكواد الصفحات المحددة (lazy loading)

### 3. حجم CSS:
- **app.css = 331 KB** أكبر من التوصية (244 KB)
- السبب: Tailwind CSS + مكونات مخصصة كثيرة
- **الحل المُنفَّذ:** PurgeCSS تم تفعيله في الإنتاج
- **التحسين المستقبلي:** Critical CSS extraction

### 4. أمان الملفات:
جميع الملفات في `dist/` آمنة للرفع، تم فحصها من:
- ✅ Security Audit (Task 4.5)
- ✅ Dependency Updates (glob, lodash)
- ✅ XSS Prevention في Twig templates
- ✅ No sensitive data في الكود

---

## 🆘 الدعم

### إذا واجهت مشاكل:

1. **راجع:** `docs/TROUBLESHOOTING-CORS-ISSUES.md`
2. **راجع:** `QUICK-START.md`
3. **راجع:** `docs/TASK-4.5-SECURITY-AUDIT-REPORT.md`

### الأوامر المفيدة:
```bash
# إعادة البناء
pnpm run build

# تشغيل Dev Server المحلي
pnpm run serve

# البناء + التشغيل
pnpm start

# فحص الحالة
salla theme list

# معاينة محلية
salla theme serve
```

---

**آخر تحديث:** 2026-03-12 16:58
**الحالة:** ✅ جاهز للرفع
**الإصدار:** 1.0.0

🎉 **القالب جاهز للنشر على Salla!**
