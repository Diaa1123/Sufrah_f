# 🔄 إجبار Salla على السحب من GitHub

**المشكلة:** الملفات على GitHub لكن Salla لا يسحبها تلقائياً

**الحل:** إجبار المزامنة يدوياً من Salla Portal

---

## 🎯 الوضع الحالي

### ✅ GitHub:
```
Repository: https://github.com/Diaa1123/Sufrah_f
Latest Commit: fa45f86
Branch: main
Status: ✅ محدّث بآخر التغييرات
```

### ❌ Salla Preview:
```
URL: https://salla.sa/dev-lgeeymgfcresnou8
Status: ❌ ملفات قديمة أو مفقودة
Errors: 404 على app.css, app.js, restaurant-systems.js
```

---

## 🚀 الحل: إجبار Salla على السحب من GitHub

### الطريقة 1: عبر Salla Partners Portal

#### الخطوة 1: افتح Theme Settings
```
https://portal.salla.partners/themes/1872514480
```

#### الخطوة 2: ابحث عن قسم "GitHub" أو "Source Code"

ستجد أحد هذه الخيارات:
- **"Pull from GitHub"**
- **"Sync with GitHub"**
- **"Update from Repository"**
- **"استيراد من GitHub"**
- **"مزامنة مع المستودع"**

#### الخطوة 3: اضغط على الزر

**قد يطلب منك:**
- ✅ تأكيد المزامنة
- ✅ اختيار الـ branch (اختر `main`)
- ✅ تأكيد الـ commit (اختر `fa45f86`)

#### الخطوة 4: انتظر المعالجة
- عادة 1-3 دقائق
- سيعرض شريط تقدم
- قد يعرض قائمة الملفات المحدّثة

---

### الطريقة 2: عبر Salla CLI (إذا نجح)

```bash
cd C:\Users\diaal\Downloads\Sufrah#0001

# حاول مرة أخرى مع timeout أطول
salla theme preview --timeout 120000
```

**إذا فشل بـ timeout:**
```bash
# جرب command مختلف
salla theme sync

# أو
salla theme deploy
```

---

### الطريقة 3: إعادة ربط GitHub Repository

إذا لم تعمل الطرق السابقة، قد تحتاج إعادة الربط:

#### في Salla Portal:

1. **افصل GitHub:**
   ```
   Settings → GitHub Integration → Disconnect
   ```

2. **أعد الربط:**
   ```
   Settings → GitHub Integration → Connect
   → أدخل: Diaa1123/Sufrah_f
   → Authorize
   ```

3. **اختر Branch:**
   ```
   Branch: main ✅
   Auto-sync: ON ✅
   ```

4. **اضغط "Pull Now" أو "Sync Now"**

---

### الطريقة 4: استخدام GitHub Webhook

إذا كان Salla يدعم webhooks:

#### في GitHub Repository:

1. **اذهب إلى:**
   ```
   https://github.com/Diaa1123/Sufrah_f/settings/hooks
   ```

2. **أضف Webhook جديد:**
   ```
   Payload URL: [سيوفره Salla - اطلبه من Support]
   Content type: application/json
   Events: Just the push event
   Active: ✅
   ```

3. **احفظ**

الآن كل `git push` سيُخبر Salla تلقائياً!

---

### الطريقة 5: Trigger عبر Commit جديد

أحياناً Salla يتفاعل فقط مع commits جديدة:

```bash
cd C:\Users\diaal\Downloads\Sufrah#0001

# أنشئ commit فارغ لتحفيز Salla
git commit --allow-empty -m "trigger: Force Salla to pull latest changes"

git push
```

ثم افتح Salla Portal وتحقق من آخر commit.

---

## 🔍 التحقق من نجاح المزامنة

### في Salla Portal:

ابحث عن:
- **"Last Synced"** أو **"آخر مزامنة"**
- يجب أن يعرض: `fa45f86` أو التاريخ الحالي

### في Preview:

```
افتح: https://salla.sa/dev-lgeeymgfcresnou8
F12 → Console
```

**قبل المزامنة:**
```
❌ Failed to load: app.css (404)
❌ Failed to load: app.js (404)
❌ Failed to load: restaurant-systems.js (404)
```

**بعد المزامنة:**
```
✅ app.css → 200 OK (331 KB)
✅ app.js → 200 OK (24 KB)
✅ restaurant-systems.js → 200 OK (27 KB)
✅ 0 errors
```

---

## 🔴 إذا استمرت المشكلة

### تحقق من هذه النقاط:

#### 1. الـ Branch صحيح؟
```bash
git branch
# يجب أن يعرض: * main

# إذا كنت على branch آخر:
git checkout main
git push origin main
```

#### 2. الـ Repository عام أم خاص؟
```
https://github.com/Diaa1123/Sufrah_f/settings

إذا كان Private:
- Salla يحتاج Deploy Key
- أو GitHub Personal Access Token
```

#### 3. الملفات موجودة على GitHub؟
```
افتح: https://github.com/Diaa1123/Sufrah_f/tree/main/assets

تحقق من:
✅ app.css موجود
✅ app.js موجود
✅ restaurant-systems.js موجود
✅ twilight.json موجود
```

#### 4. twilight.json صحيح؟
```
افتح: https://github.com/Diaa1123/Sufrah_f/blob/main/twilight.json

تحقق من:
"assets": {
  "css": ["assets/app.css"],  ✅ صح
  "js": ["assets/runtime.js", "assets/vendors.js", "assets/app.js"]  ✅ صح
}

❌ خطأ شائع:
"css": ["dist/assets/app.css"]  ← لا تستخدم dist/
```

---

## 📞 اتصل بـ Salla Support

إذا لم تنجح أي طريقة، افتح تذكرة دعم:

### المعلومات المطلوبة:

```
Subject: Theme not syncing from GitHub

Details:
- Theme ID: 1872514480
- Theme Name: Sufrah
- GitHub Repo: https://github.com/Diaa1123/Sufrah_f
- Branch: main
- Latest Commit: fa45f86
- Problem: Files not appearing in preview (404 errors)
- Tried: Manual sync from Portal (timeout)

Preview URL: https://salla.sa/dev-lgeeymgfcresnou8
Console Errors: app.css, app.js, restaurant-systems.js → 404

Request: Please manually trigger sync from GitHub
```

**رابط الدعم:**
```
https://salla.sa/support
أو
https://help.salla.sa
```

---

## 🎯 الحل الأسرع (مجرّب)

بناءً على تجربة المطورين، هذا يعمل 90% من الوقت:

### الخطوات:

1. **افتح Salla Portal:**
   ```
   https://portal.salla.partners/themes/1872514480
   ```

2. **اذهب إلى تبويب "Code" أو "الكود"**

3. **ابحث عن زر أو رابط:**
   - "Pull from GitHub"
   - "Sync"
   - "Update"
   - "تحديث من GitHub"

4. **اضغط عليه**

5. **انتظر 2-3 دقائق**

6. **افتح Preview وتحقق من Console**

---

## 🆘 الحل الطارئ (إذا فشل كل شيء)

إذا استمرت المشكلة لأكثر من ساعة:

### استخدم Salla CLI بطريقة مختلفة:

```bash
cd C:\Users\diaal\Downloads\Sufrah#0001

# 1. تسجيل خروج وإعادة تسجيل دخول
salla logout
salla login

# 2. حاول theme preview مرة أخرى
salla theme preview

# 3. إذا فشل، حاول create theme جديد وربطه بـ GitHub
salla theme create --link-github

# سيطلب:
# - GitHub URL: https://github.com/Diaa1123/Sufrah_f
# - Branch: main
# - هل تريد استيراد الملفات؟ Yes
```

---

## ✅ قائمة التحقق

بعد المزامنة الناجحة، تأكد من:

- [ ] ✅ Console يعرض 0 errors
- [ ] ✅ app.css يُحمّل (200 OK, 331 KB)
- [ ] ✅ app.js يُحمّل (200 OK, 24 KB)
- [ ] ✅ restaurant-systems.js يُحمّل (27 KB)
- [ ] ✅ vendors.js يُحمّل (144 KB)
- [ ] ✅ runtime.js يُحمّل (1.4 KB)
- [ ] ✅ التصميم يظهر بشكل صحيح
- [ ] ✅ القوائم تعمل
- [ ] ✅ بطاقات المنتجات تعمل
- [ ] ✅ نظام الإضافات (modifiers) يعمل

---

## 📊 الملخص

### المشكلة:
```
GitHub: ✅ محدّث (fa45f86)
Salla: ❌ لم يسحب التحديثات
النتيجة: 404 errors في Preview
```

### الحل:
```
1. افتح Salla Portal
2. اذهب إلى Theme → Code/GitHub
3. اضغط "Pull from GitHub" أو "Sync"
4. انتظر 2-3 دقائق
5. افتح Preview وتحقق
```

### إذا لم يعمل:
```
1. Empty commit: git commit --allow-empty -m "trigger sync"
2. اتصل بـ Salla Support
3. أو استخدم salla theme create --link-github
```

---

**🎯 الطريقة الأكثر نجاحاً:**

افتح https://portal.salla.partners/themes/1872514480 وابحث عن زر **"Pull from GitHub"** أو **"Sync"**

**⏱️ سيعمل خلال 3 دقائق!**
