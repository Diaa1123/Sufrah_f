# 🎯 دليل المزامنة مع Salla - خطوة بخطوة

**الهدف:** سحب الملفات من GitHub إلى Salla Preview

**الوقت المتوقع:** 5 دقائق

---

## 📌 معلومات مهمة

### GitHub Repository:
```
URL: https://github.com/Diaa1123/Sufrah_f
Branch: main
Latest Commit: b46d521 ⭐ جديد - تم إنشاؤه الآن لتحفيز Salla
```

### Salla Theme:
```
Portal: https://portal.salla.partners/themes/1872514480
Preview: https://salla.sa/dev-lgeeymgfcresnou8
Status: ❌ يحتاج مزامنة
```

---

## 🚀 الخطوات البسيطة

### الخطوة 1️⃣: افتح Salla Partners Portal

```
https://portal.salla.partners/themes/1872514480
```

أو:
1. اذهب إلى https://portal.salla.partners
2. تسجيل الدخول
3. Themes → Sufrah (ID: 1872514480)

---

### الخطوة 2️⃣: ابحث عن قسم GitHub

في صفحة القالب، ابحث عن أحد هذه التبويبات:
- **"Code"** تبويب الكود
- **"Source"** المصدر
- **"GitHub"** جيت هب
- **"Settings"** الإعدادات

---

### الخطوة 3️⃣: اضغط زر المزامنة

ستجد أحد هذه الأزرار:

**بالإنجليزية:**
- 🔄 **Pull from GitHub**
- 🔄 **Sync with GitHub**
- 🔄 **Update from Repository**
- 🔄 **Refresh**

**بالعربية:**
- 🔄 **سحب من GitHub**
- 🔄 **مزامنة مع GitHub**
- 🔄 **تحديث من المستودع**
- 🔄 **تحديث**

**اضغط عليه!**

---

### الخطوة 4️⃣: انتظر المعالجة

سيحدث ما يلي:
1. ✅ Salla يتصل بـ GitHub
2. ✅ يسحب أحدث commit (`b46d521`)
3. ✅ ينسخ جميع الملفات من `assets/`
4. ✅ يرفعها على CDN
5. ✅ يُحدّث Preview

**⏱️ الوقت:** 1-3 دقائق عادة

**شاهد:**
- شريط تقدم
- قائمة الملفات المحدّثة
- رسالة نجاح

---

### الخطوة 5️⃣: تحقق من النجاح

#### أ) في Salla Portal:

ابحث عن:
```
Last Synced: [اليوم] ✅
Latest Commit: b46d521 ✅
Status: Active ✅
```

#### ب) افتح Preview:

```
https://salla.sa/dev-lgeeymgfcresnou8
```

#### ج) اضغط F12 → Console:

**قبل المزامنة (الآن):**
```
❌ Failed to load: https://cdn.salla.sa/.../app.css (404)
❌ Failed to load: https://cdn.salla.sa/.../app.js (404)
❌ Failed to load: https://cdn.salla.sa/.../restaurant-systems.js (404)
```

**بعد المزامنة (المتوقع):**
```
✅ app.css → 200 OK, 331 KB
✅ app.js → 200 OK, 24 KB
✅ restaurant-systems.js → 200 OK, 27 KB
✅ vendors.js → 200 OK, 144 KB
✅ runtime.js → 200 OK, 1.4 KB
✅ common.js → 200 OK, 12 KB

Console Errors: 0 ✅
```

#### د) تحقق من التصميم:

- ✅ الألوان تظهر (برتقالي/أخضر)
- ✅ الخطوط واضحة
- ✅ القوائم تعمل
- ✅ الصور تحمل
- ✅ الأزرار تتفاعل

---

## 🔍 إذا لم تجد زر المزامنة

### ابحث في هذه الأماكن:

#### 1. تبويب "Code" أو "الكود":
```
Portal → Themes → Sufrah → Code
→ ابحث عن: "Pull from GitHub" في الأعلى
```

#### 2. تبويب "Settings" أو "الإعدادات":
```
Portal → Themes → Sufrah → Settings → GitHub Integration
→ ابحث عن: "Sync Now" أو "Update"
```

#### 3. القائمة المنسدلة:
```
Portal → Themes → Sufrah → ⋮ (نقاط ثلاث)
→ ابحث عن: "Sync with GitHub"
```

#### 4. Dashboard الرئيسي:
```
Portal → Themes → (على بطاقة Sufrah مباشرة)
→ ابحث عن أيقونة 🔄
```

---

## 🆘 إذا لم تعمل المزامنة

### الحل أ) انتظر 5 دقائق وحاول مرة أخرى

أحياناً Salla يحتاج وقت لمعالجة webhook من GitHub.

---

### الحل ب) افصل وأعد الربط

1. **في Salla Portal:**
   ```
   Settings → GitHub Integration → Disconnect
   ```

2. **انتظر 30 ثانية**

3. **أعد الربط:**
   ```
   Settings → GitHub Integration → Connect to GitHub
   → Repository: Diaa1123/Sufrah_f
   → Branch: main
   → Authorize ✅
   ```

4. **اضغط "Sync Now"**

---

### الحل ج) استخدم Salla CLI

```bash
cd C:\Users\diaal\Downloads\Sufrah#0001

# حاول preview مرة أخرى
salla theme preview --timeout 180000
```

**إذا فشل:**
```bash
salla logout
salla login
salla theme preview
```

---

### الحل د) اتصل بالدعم الفني

**افتح تذكرة:**
```
https://salla.sa/support

الموضوع: Theme not syncing from GitHub
Theme ID: 1872514480
GitHub Repo: https://github.com/Diaa1123/Sufrah_f
Latest Commit: b46d521

المشكلة: الملفات على GitHub لكن لا تظهر في Preview
الخطأ: 404 errors على app.css, app.js, restaurant-systems.js

الطلب: يرجى تحفيز المزامنة يدوياً من GitHub
```

---

## ✅ بعد نجاح المزامنة

### اختبر هذه الميزات:

#### 🍽️ ميزات المطاعم:
```
1. ساعات العمل → افتح الصفحة الرئيسية
   ✅ يجب أن ترى widget ساعات العمل

2. نظام الإضافات → افتح أي صفحة منتج
   ✅ يجب أن ترى خيارات الإضافات (modifiers)

3. مناطق التوصيل → اذهب للسلة
   ✅ يجب أن ترى حاسبة رسوم التوصيل

4. جدولة الطلبات → في Checkout
   ✅ يجب أن ترى خيار "جدولة الطلب لوقت لاحق"
```

#### 📱 الصفحات الأساسية:
```
✅ الصفحة الرئيسية
✅ قائمة المنتجات
✅ صفحة المنتج
✅ السلة
✅ Checkout
✅ Thank You Page
```

---

## 📊 الملفات التي سيتم سحبها

```
من GitHub → إلى Salla CDN:

assets/
├── app.css (331 KB)              → cdn.salla.sa/[store]/assets/app.css
├── runtime.js (1.4 KB)           → cdn.salla.sa/[store]/assets/runtime.js
├── vendors.js (144 KB)           → cdn.salla.sa/[store]/assets/vendors.js
├── app.js (24 KB)                → cdn.salla.sa/[store]/assets/app.js
├── common.js (12 KB)             → cdn.salla.sa/[store]/assets/common.js
├── restaurant-systems.js (27 KB) → cdn.salla.sa/[store]/assets/restaurant-systems.js
├── product-card.js (13 KB)       → ...
├── main-menu.js (6.2 KB)         → ...
├── checkout.js (11 KB)           → ...
└── ... (7 ملفات أخرى)

src/views/
└── ... (جميع ملفات Twig)       → Salla theme files

twilight.json                      → Theme configuration
```

**المجموع:** ~1.2 MB

---

## 🎯 الملخص السريع

### ما تحتاج فعله:

1. ✅ افتح https://portal.salla.partners/themes/1872514480
2. ✅ ابحث عن زر "Pull from GitHub" أو "Sync"
3. ✅ اضغط عليه
4. ✅ انتظر 2-3 دقائق
5. ✅ افتح Preview وتحقق من Console = 0 errors

---

### المتوقع بعد المزامنة:

```
✅ التصميم يظهر بالكامل
✅ جميع الألوان والخطوط صحيحة
✅ القوائم والأزرار تعمل
✅ ميزات المطاعم كلها تعمل
✅ 0 أخطاء في Console
✅ جاهز للإطلاق!
```

---

**📍 الخطوة التالية:**

افتح https://portal.salla.partners/themes/1872514480 **الآن** وابحث عن زر المزامنة!

**⏱️ خلال 5 دقائق ستعمل 100%!**

---

## 📞 روابط سريعة

| الرابط | الاستخدام |
|--------|-----------|
| https://portal.salla.partners/themes/1872514480 | Salla Portal (للمزامنة) |
| https://salla.sa/dev-lgeeymgfcresnou8 | Preview (للاختبار) |
| https://github.com/Diaa1123/Sufrah_f | GitHub Repo |
| https://salla.sa/support | الدعم الفني |

---

**🎉 الملفات جاهزة على GitHub - فقط اسحبها من Salla Portal!**

**Commit الجديد:** `b46d521` (تم إنشاؤه لتحفيز المزامنة)
