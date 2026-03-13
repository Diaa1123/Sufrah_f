# 🔧 الحل البديل: الرفع اليدوي (بسبب Timeout)

## 🔴 المشكلة الحالية

```bash
salla theme push
↓
ERROR: The CLI failed to request preview for the Theme. Try again later.
AxiosError: timeout of 20000ms exceeded
```

**السبب:** مشكلة مؤقتة في Salla API أو اتصال الإنترنت.

---

## ✅ الحل: الرفع اليدوي عبر Salla Partners Portal

### طريقة 1: استخدام GitHub (الموصى بها - أسرع!)

القالب **مرفوع بالفعل على GitHub** ✅:
```
https://github.com/Diaa1123/Sufrah_f
Commit: c288f29
```

**الخطوات:**

1. **افتح Salla Partners Portal:**
   ```
   https://portal.salla.partners/themes/1872514480
   ```

2. **اذهب إلى تبويب "الكود" أو "Code"**

3. **اضغط "تحديث من GitHub" أو "Pull from GitHub"**
   - سيسحب آخر commit تلقائياً
   - يشمل جميع التغييرات الأخيرة

4. **انتظر حتى ينتهي التحديث** (1-2 دقيقة)

5. **افتح Preview وتحقق**

---

### طريقة 2: رفع ملف ZIP

إذا لم تعمل طريقة GitHub:

#### الخطوة 1: إنشاء ملف ZIP

```bash
cd C:\Users\diaal\Downloads\Sufrah#0001

# قم بضغط هذه المجلدات فقط:
# - assets/
# - src/
# - twilight.json
```

**أو استخدم PowerShell:**
```powershell
Compress-Archive -Path assets,src,twilight.json -DestinationPath sufrah-theme.zip -Force
```

#### الخطوة 2: رفع على Salla

1. افتح https://portal.salla.partners/themes/1872514480
2. اذهب إلى "رفع ملفات" أو "Upload Files"
3. ارفع `sufrah-theme.zip`
4. انتظر حتى يتم فك الضغط والمعالجة

---

### طريقة 3: استخدام Salla Dashboard مباشرة

#### الخطوة 1: افتح Theme Editor

```
https://s.salla.sa/dashboard
→ التصميم → محرر القوالب
```

#### الخطوة 2: رفع الملفات يدوياً

**A) رفع CSS:**
```
ملف محلي: assets/app.css
رفع إلى: assets/app.css في المحرر
```

**B) رفع JavaScript (بالترتيب):**
```
1. assets/runtime.js → رفع
2. assets/vendors.js → رفع
3. assets/app.js → رفع
4. assets/product-card.js → رفع
5. assets/main-menu.js → رفع
... (باقي الملفات)
```

**C) رفع الصور:**
```
assets/images/ → رفع كل الملفات إلى assets/images/
```

**⏱️ الوقت المتوقع:** 10-15 دقيقة

---

## 🔍 تشخيص مشكلة Timeout

### سبب المشكلة المحتمل:

1. **Salla API بطيء مؤقتاً**
   - الحل: انتظر 30 دقيقة وأعد المحاولة

2. **اتصال الإنترنت بطيء**
   - الحل: جرب من شبكة أسرع

3. **حجم الملفات كبير**
   - الحل: استخدم GitHub integration (أسرع)

4. **VPN أو Firewall**
   - الحل: أغلق VPN وأعد المحاولة

---

## 🚀 الطريقة الأسرع: GitHub Integration

بما أن القالب **مرفوع على GitHub**، استخدم هذه الطريقة:

### الخطوات:

1. **افتح Salla Partners Portal:**
   ```
   https://portal.salla.partners/themes/1872514480
   ```

2. **تحقق من اتصال GitHub:**
   - Settings → GitHub Integration
   - يجب أن ترى: ✅ Connected to `Diaa1123/Sufrah_f`

3. **اسحب آخر تحديث:**
   - Code → Pull from GitHub
   - أو اضغط "Sync" إذا كان متاحاً

4. **تحقق من الملفات:**
   - Files → assets/
   - يجب أن ترى جميع الملفات المحدثة

5. **افتح Preview:**
   - Preview URL → اختبر

---

## 🔧 حل مشكلة Timeout في المستقبل

### زيادة Timeout في Salla CLI:

قم بإنشاء ملف `.sallarc` في مجلد القالب:

```json
{
  "timeout": 60000,
  "retries": 3
}
```

ثم أعد المحاولة:
```bash
salla theme push --timeout 60000
```

---

## 📊 التحقق من نجاح الرفع

### بعد الرفع (بأي طريقة):

1. **افتح Preview في Salla**

2. **اضغط F12 → Console**

3. **تحقق من:**
   ```
   ✅ 0 errors
   ✅ app.css loaded (200 OK)
   ✅ app.js loaded (200 OK)
   ✅ vendors.js loaded (200 OK)
   ✅ runtime.js loaded (200 OK)
   ```

4. **اختبر الصفحات:**
   - ✅ الصفحة الرئيسية
   - ✅ صفحة المنتج
   - ✅ السلة
   - ✅ Checkout

---

## 🎯 الملخص

### المشكلة:
- ❌ `salla theme push` timeout
- ✅ لكن الملفات رُفعت على GitHub بنجاح!

### الحل الأسرع:
```
1. افتح: https://portal.salla.partners/themes/1872514480
2. اضغط: "Pull from GitHub" أو "Sync"
3. انتظر: 1-2 دقيقة
4. اختبر: افتح Preview
```

### البديل:
- رفع ZIP يدوياً
- أو رفع ملفات فردية في Theme Editor

---

## 📞 إذا استمرت المشكلة

### جرب هذا الأمر:

```bash
# مسح cache وإعادة المحاولة
salla logout
salla login
salla theme push --force
```

### أو:

```bash
# استخدام git push فقط
git add .
git commit -m "Update theme files"
git push

# ثم اسحب من Salla Portal
```

---

## ✅ الحالة الحالية

### ما تم بنجاح:

1. ✅ **تعديل twilight.json** - مسارات صحيحة
2. ✅ **تعديل webpack.config.js** - output صحيح
3. ✅ **بناء الملفات** - جميعها في `assets/`
4. ✅ **رفع على GitHub** - commit `c288f29`
5. ✅ **Salla CLI checks passed** - جميع الفحوصات نجحت

### الباقي:

- ⏳ مزامنة من GitHub إلى Salla Theme
- ⏳ اختبار Preview

---

**🎯 الخطوة التالية:**

افتح https://portal.salla.partners/themes/1872514480 واضغط "Pull from GitHub" أو "Sync"

**⏱️ الوقت المتوقع:** 1-2 دقيقة فقط!

🚀 **ستعمل!**
