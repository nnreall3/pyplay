export interface Example {
  id: string;
  title: string;
  desc: string;
  category: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  emoji: string;
  code: string;
  output: string;
  tip?: string;
}

export const EXAMPLE_CATEGORIES = [
  "الأساسيات",
  "هياكل البيانات",
  "الدوال",
  "الكائنات OOP",
  "النصوص",
  "الملفات والبيانات",
  "متقدّم",
  "ممتع 🎲",
] as const;

export const EXAMPLES: Example[] = [
  // ── الأساسيات ────────────────────────────────────────────────
  {
    id: "fstring",
    title: "تنسيق النصوص f-string",
    desc: "الطريقة الحديثة والأسرع لدمج القيم داخل النص، مع تنسيق الأرقام والمحاذاة.",
    category: "الأساسيات",
    level: "مبتدئ",
    emoji: "🧵",
    code: `name = "سارة"
score = 93.4567
print(f"مرحباً {name}!")
print(f"النتيجة: {score:.2f}")      # تقريب لخانتين
print(f"|{name:>10}|")              # محاذاة لليمين بعرض 10
print(f"{1234567:,}")               # فواصل آلاف
print(f"{0.87:.0%}")                # نسبة مئوية`,
    output: `مرحباً سارة!
النتيجة: 93.46
|      سارة|
1,234,567
87%`,
    tip: "استخدم f\"{var=}\" لطباعة اسم المتغير وقيمته معاً أثناء التنقيح.",
  },
  {
    id: "walrus",
    title: "معامل الفظ :=",
    desc: "أسند قيمة واستخدمها في نفس التعبير — يختصر أسطراً كاملة.",
    category: "الأساسيات",
    level: "متوسط",
    emoji: "🦭",
    code: `words = ["hi", "python", "ok", "programming"]
for w in words:
    if (n := len(w)) > 4:
        print(w, "طولها", n)`,
    output: `python طولها 6
programming طولها 11`,
  },
  {
    id: "match",
    title: "match / case",
    desc: "بديل switch في بايثون 3.10+، ويدعم مطابقة الأنماط لا القيم فقط.",
    category: "الأساسيات",
    level: "متوسط",
    emoji: "🎯",
    code: `def describe(point):
    match point:
        case (0, 0):
            return "نقطة الأصل"
        case (x, 0):
            return f"على محور السينات عند {x}"
        case (0, y):
            return f"على محور الصادات عند {y}"
        case (x, y) if x == y:
            return "على القطر"
        case _:
            return "نقطة عامة"

for p in [(0,0), (3,0), (0,5), (2,2), (1,7)]:
    print(p, "->", describe(p))`,
    output: `(0, 0) -> نقطة الأصل
(3, 0) -> على محور السينات عند 3
(0, 5) -> على محور الصادات عند 5
(2, 2) -> على القطر
(1, 7) -> نقطة عامة`,
  },

  // ── هياكل البيانات ───────────────────────────────────────────
  {
    id: "comprehensions",
    title: "الاستيعابات (Comprehensions)",
    desc: "قوائم، قواميس، ومجموعات في سطر واحد بدل حلقات طويلة.",
    category: "هياكل البيانات",
    level: "مبتدئ",
    emoji: "⚡",
    code: `nums = range(1, 11)
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
table = {n: n ** 3 for n in range(1, 6)}
letters = {c for c in "programming"}

print(squares)
print(evens)
print(table)
print(sorted(letters))`,
    output: `[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[2, 4, 6, 8, 10]
{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}
['a', 'g', 'i', 'm', 'n', 'o', 'p', 'r']`,
    tip: "لا تُفرِط: إذا احتاج الاستيعاب لأكثر من شرطين، الحلقة العادية أوضح.",
  },
  {
    id: "counter",
    title: "عدّ العناصر بـ Counter",
    desc: "أسرع طريقة لإحصاء التكرارات وإيجاد الأكثر شيوعاً.",
    category: "هياكل البيانات",
    level: "متوسط",
    emoji: "🧮",
    code: `from collections import Counter

text = "the quick brown fox jumps over the lazy dog the end"
c = Counter(text.split())
print(c.most_common(3))
print("عدد كلمة the:", c["the"])

letters = Counter("mississippi")
print(letters)`,
    output: `[('the', 3), ('quick', 1), ('brown', 1)]
عدد كلمة the: 3
Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})`,
  },
  {
    id: "sorting",
    title: "ترتيب متقدّم بـ key",
    desc: "رتّب قواميس وكائنات حسب أي معيار، وبأكثر من مفتاح.",
    category: "هياكل البيانات",
    level: "متوسط",
    emoji: "🔤",
    code: `students = [
    {"name": "Ali", "grade": 88, "age": 20},
    {"name": "Sara", "grade": 95, "age": 19},
    {"name": "Omar", "grade": 88, "age": 18},
]

by_grade = sorted(students, key=lambda s: -s["grade"])
print([s["name"] for s in by_grade])

# ترتيب مركّب: الدرجة تنازلياً ثم العمر تصاعدياً
combo = sorted(students, key=lambda s: (-s["grade"], s["age"]))
print([(s["name"], s["grade"], s["age"]) for s in combo])`,
    output: `['Sara', 'Ali', 'Omar']
[('Sara', 95, 19), ('Omar', 88, 18), ('Ali', 88, 20)]`,
  },
  {
    id: "zip-enumerate",
    title: "zip و enumerate",
    desc: "امشِ على قائمتين معاً، أو احصل على الفهرس مع القيمة.",
    category: "هياكل البيانات",
    level: "مبتدئ",
    emoji: "🔗",
    code: `names = ["Ali", "Sara", "Omar"]
scores = [88, 95, 72]

for i, (n, s) in enumerate(zip(names, scores), start=1):
    status = "ناجح" if s >= 80 else "راسب"
    print(f"{i}. {n:<5} {s:>3}  {status}")

print(dict(zip(names, scores)))`,
    output: `1. Ali    88  ناجح
2. Sara   95  ناجح
3. Omar   72  راسب
{'Ali': 88, 'Sara': 95, 'Omar': 72}`,
  },

  // ── الدوال ───────────────────────────────────────────────────
  {
    id: "args-kwargs",
    title: "*args و **kwargs",
    desc: "دوال تقبل عدداً غير محدود من الوسائط الموضعية والمسمّاة.",
    category: "الدوال",
    level: "متوسط",
    emoji: "🎒",
    code: `def report(title, *values, **options):
    sep = options.get("sep", " | ")
    print(title.upper())
    print(sep.join(str(v) for v in values))
    for k, v in options.items():
        if k != "sep":
            print(f"  {k} = {v}")

report("نتائج", 10, 20, 30, sep=" -> ", author="Ali", year=2026)`,
    output: `نتائج
10 -> 20 -> 30
  author = Ali
  year = 2026`,
  },
  {
    id: "decorator",
    title: "مُزخرِف يقيس الزمن",
    desc: "المزخرفات تغلّف دالة بسلوك إضافي دون تعديل جسمها.",
    category: "الدوال",
    level: "متقدم",
    emoji: "🎁",
    code: `import time, functools

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*a, **kw):
        t0 = time.perf_counter()
        result = fn(*a, **kw)
        ms = (time.perf_counter() - t0) * 1000
        print(f"[{fn.__name__}] استغرقت {ms:.2f}ms")
        return result
    return wrapper

@timed
def slow_sum(n):
    return sum(i * i for i in range(n))

print(slow_sum(200_000))`,
    output: `[slow_sum] استغرقت 18.42ms
2666686666700000`,
    tip: "functools.wraps يحافظ على اسم الدالة الأصلية وتوثيقها.",
  },
  {
    id: "generator",
    title: "مولّدات كسولة (Generators)",
    desc: "yield ينتج القيم عند الطلب — ذاكرة شبه معدومة حتى مع ملايين العناصر.",
    category: "الدوال",
    level: "متقدم",
    emoji: "🌀",
    code: `def primes():
    n = 2
    while True:
        if all(n % p for p in range(2, int(n ** 0.5) + 1)):
            yield n
        n += 1

import itertools
print(list(itertools.islice(primes(), 12)))

# سلسلة مولّدات
squares = (x * x for x in range(1, 1_000_000))
print(sum(itertools.islice(squares, 5)))`,
    output: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
55`,
  },
  {
    id: "lru",
    title: "تخزين النتائج بـ lru_cache",
    desc: "سطر واحد يحوّل دالة بطيئة تكرارية إلى فورية.",
    category: "الدوال",
    level: "متقدم",
    emoji: "🚀",
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(80))
print(fib.cache_info())`,
    output: `23416728348467685
CacheInfo(hits=78, misses=81, maxsize=None, currsize=81)`,
  },

  // ── OOP ──────────────────────────────────────────────────────
  {
    id: "dataclass",
    title: "dataclass بدل كلاس طويل",
    desc: "توليد __init__ و__repr__ والمقارنة تلقائياً.",
    category: "الكائنات OOP",
    level: "متوسط",
    emoji: "🧱",
    code: `from dataclasses import dataclass, field

@dataclass(order=True)
class Book:
    title: str
    year: int
    tags: list = field(default_factory=list)

    def age(self, now=2026):
        return now - self.year

a = Book("بايثون العميقة", 2019, ["برمجة"])
b = Book("خوارزميات", 2023)
print(a)
print("العمر:", a.age())
print(sorted([a, b])[0].title)`,
    output: `Book(title='بايثون العميقة', year=2019, tags=['برمجة'])
العمر: 7
بايثون العميقة`,
    tip: "لا تستعمل list كقيمة افتراضية مباشرة — استخدم field(default_factory=list).",
  },
  {
    id: "dunder",
    title: "الدوال السحرية (Dunder)",
    desc: "اجعل كائنك يدعم +، len()، الطباعة، والمقارنة كأنه نوع أصلي.",
    category: "الكائنات OOP",
    level: "متقدم",
    emoji: "✨",
    code: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __mul__(self, k):
        return Vector(self.x * k, self.y * k)
    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    def __eq__(self, o):
        return (self.x, self.y) == (o.x, o.y)

v = Vector(3, 4)
print(v + Vector(1, 1))
print(v * 2)
print(abs(v))
print(v == Vector(3, 4))`,
    output: `Vector(4, 5)
Vector(6, 8)
5.0
True`,
  },
  {
    id: "property",
    title: "property والتحقق من القيم",
    desc: "خصائص محسوبة وحماية البيانات دون getters/setters مزعجة.",
    category: "الكائنات OOP",
    level: "متوسط",
    emoji: "🛡️",
    code: `class Account:
    def __init__(self, balance=0):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("الرصيد لا يكون سالباً")
        self._balance = value

    @property
    def formatted(self):
        return f"{self._balance:,.2f} د.م"

acc = Account(1500)
acc.balance += 250
print(acc.formatted)
try:
    acc.balance = -5
except ValueError as e:
    print("خطأ:", e)`,
    output: `1,750.00 د.م
خطأ: الرصيد لا يكون سالباً`,
  },

  // ── النصوص ───────────────────────────────────────────────────
  {
    id: "regex",
    title: "التعابير النمطية regex",
    desc: "استخراج البريد والأرقام والتواريخ من نص فوضوي.",
    category: "النصوص",
    level: "متقدم",
    emoji: "🔍",
    code: `import re

text = "تواصل: ali@mail.com أو sara.dev@site.org — الهاتف 0612-345678 بتاريخ 2026-08-05"

emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", text)
phone = re.search(r"\\d{4}-\\d{6}", text)
date = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)

print(emails)
print(phone.group())
print("السنة:", date.group(1), "الشهر:", date.group(2))
print(re.sub(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "[مخفي]", text))`,
    output: `['ali@mail.com', 'sara.dev@site.org']
0612-345678
السنة: 2026 الشهر: 08
تواصل: [مخفي] أو [مخفي] — الهاتف 0612-345678 بتاريخ 2026-08-05`,
  },
  {
    id: "textwork",
    title: "تحليل نص عربي/إنجليزي",
    desc: "تنظيف، تقطيع، وإحصاء بأدوات النصوص المدمجة.",
    category: "النصوص",
    level: "مبتدئ",
    emoji: "📝",
    code: `text = "  Python is fun. Python is powerful!  "
clean = text.strip().lower().replace(".", "").replace("!", "")
words = clean.split()

print("عدد الكلمات:", len(words))
print("فريدة:", sorted(set(words)))
print("يبدأ بـ python؟", clean.startswith("python"))
print("-".join(words))
print("Python".center(20, "*"))`,
    output: `عدد الكلمات: 6
فريدة: ['fun', 'is', 'powerful', 'python']
يبدأ بـ python؟ True
python-is-fun-python-is-powerful
*******Python*******`,
  },

  // ── الملفات والبيانات ────────────────────────────────────────
  {
    id: "json",
    title: "التعامل مع JSON",
    desc: "تحويل بين قواميس بايثون ونص JSON بالعربية دون رموز غريبة.",
    category: "الملفات والبيانات",
    level: "متوسط",
    emoji: "🗂️",
    code: `import json

data = {
    "app": "بايثونا",
    "users": [{"name": "علي", "xp": 320}, {"name": "سارة", "xp": 880}],
}

text = json.dumps(data, ensure_ascii=False, indent=2)
print(text)

back = json.loads(text)
top = max(back["users"], key=lambda u: u["xp"])
print("الأعلى:", top["name"], top["xp"])`,
    output: `{
  "app": "بايثونا",
  "users": [
    {"name": "علي", "xp": 320},
    {"name": "سارة", "xp": 880}
  ]
}
الأعلى: سارة 880`,
    tip: "ensure_ascii=False ضروري كي تظهر الحروف العربية بدل \\u0639.",
  },
  {
    id: "files",
    title: "قراءة وكتابة الملفات",
    desc: "with يفتح الملف ويغلقه تلقائياً حتى لو حدث خطأ.",
    category: "الملفات والبيانات",
    level: "مبتدئ",
    emoji: "💾",
    code: `with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("السطر الأول\\n")
    f.writelines(["ثانٍ\\n", "ثالث\\n"])

with open("notes.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        print(i, line.rstrip())

import os
print("الحجم:", os.path.getsize("notes.txt"), "بايت")`,
    output: `1 السطر الأول
2 ثانٍ
3 ثالث
الحجم: 44 بايت`,
  },
  {
    id: "pandas",
    title: "تحليل جدول ببانداز",
    desc: "قراءة بيانات، فلترة، تجميع، وترتيب في أسطر قليلة.",
    category: "الملفات والبيانات",
    level: "متقدم",
    emoji: "🐼",
    code: `import pandas as pd

df = pd.DataFrame({
    "city": ["الرباط", "الدار البيضاء", "الرباط", "فاس", "فاس"],
    "sales": [120, 340, 90, 210, 150],
    "month": ["يناير", "يناير", "فبراير", "يناير", "فبراير"],
})

print(df.head(3))
print("\\nالمجموع لكل مدينة:")
print(df.groupby("city")["sales"].sum().sort_values(ascending=False))
print("\\nأعلى من 150:")
print(df[df.sales > 150][["city", "sales"]])`,
    output: `            city  sales  month
0         الرباط    120  يناير
1  الدار البيضاء    340  يناير
2         الرباط     90 فبراير

المجموع لكل مدينة:
city
فاس              360
الدار البيضاء    340
الرباط           210

أعلى من 150:
            city  sales
1  الدار البيضاء    340
3            فاس    210`,
  },
  {
    id: "numpy",
    title: "حسابات مصفوفية بـ numpy",
    desc: "عمليات على آلاف الأرقام دفعة واحدة وبسرعة C.",
    category: "الملفات والبيانات",
    level: "متقدم",
    emoji: "📐",
    code: `import numpy as np

a = np.arange(1, 13).reshape(3, 4)
print(a)
print("المتوسط لكل عمود:", a.mean(axis=0))
print("المجموع الكلي:", a.sum())
print("أكبر من 6:\\n", a[a > 6])
print("ضرب مصفوفي:\\n", a @ a.T)`,
    output: `[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
المتوسط لكل عمود: [5. 6. 7. 8.]
المجموع الكلي: 78
أكبر من 6:
 [ 7  8  9 10 11 12]
ضرب مصفوفي:
 [[ 30  70 110]
 [ 70 174 278]
 [110 278 446]]`,
  },

  // ── متقدّم ───────────────────────────────────────────────────
  {
    id: "context",
    title: "مدير سياق مخصّص",
    desc: "أنشئ with الخاص بك للتنظيف المضمون (اتصالات، مؤقتات، ملفات).",
    category: "متقدّم",
    level: "متقدم",
    emoji: "🔐",
    code: `from contextlib import contextmanager
import time

@contextmanager
def stopwatch(label):
    t0 = time.perf_counter()
    print(f"▶ بدء {label}")
    try:
        yield
    finally:
        print(f"⏹ انتهى {label} في {(time.perf_counter()-t0)*1000:.1f}ms")

with stopwatch("المعالجة"):
    total = sum(i ** 2 for i in range(300_000))
print("الناتج:", total)`,
    output: `▶ بدء المعالجة
⏹ انتهى المعالجة في 26.3ms
الناتج: 8999955000050000`,
  },
  {
    id: "async",
    title: "التزامن مع asyncio",
    desc: "نفّذ مهام انتظار متعددة في وقت واحد بدل التسلسل.",
    category: "متقدّم",
    level: "متقدم",
    emoji: "⏱️",
    code: `import asyncio, time

async def task(name, delay):
    await asyncio.sleep(delay)
    return f"{name} انتهت بعد {delay}s"

async def main():
    t0 = time.perf_counter()
    results = await asyncio.gather(
        task("A", 1), task("B", 2), task("C", 1.5)
    )
    for r in results:
        print(r)
    print(f"الزمن الكلي: {time.perf_counter()-t0:.1f}s (وليس 4.5s)")

await main()  # داخل المختبر استعمل await مباشرة`,
    output: `A انتهت بعد 1s
B انتهت بعد 2s
C انتهت بعد 1.5s
الزمن الكلي: 2.0s (وليس 4.5s)`,
    tip: "خارج المختبر استخدم asyncio.run(main()) بدل await المباشر.",
  },
  {
    id: "typing",
    title: "التلميحات النوعية Type Hints",
    desc: "كود أوضح وأخطاء تُكتشف قبل التشغيل بأدوات مثل mypy.",
    category: "متقدّم",
    level: "متوسط",
    emoji: "🏷️",
    code: `from typing import Optional

def average(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0

def find_user(users: dict[str, int], name: str) -> Optional[int]:
    return users.get(name)

print(average([10, 20, 30]))
print(find_user({"ali": 3}, "ali"))
print(find_user({"ali": 3}, "sara"))
print(average.__annotations__)`,
    output: `20.0
3
None
{'values': list[float], 'return': <class 'float'>}`,
  },
  {
    id: "errors",
    title: "استثناءات مخصّصة",
    desc: "أخطاء تحمل معنى نطاق تطبيقك بدل رسائل عامة.",
    category: "متقدّم",
    level: "متوسط",
    emoji: "🚨",
    code: `class InsufficientFunds(Exception):
    def __init__(self, needed):
        super().__init__(f"ينقصك {needed} درهم")
        self.needed = needed

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(amount - balance)
    return balance - amount

for amt in (300, 900):
    try:
        print("الرصيد الجديد:", withdraw(500, amt))
    except InsufficientFunds as e:
        print("فشلت العملية:", e, "| الناقص:", e.needed)`,
    output: `الرصيد الجديد: 200
فشلت العملية: ينقصك 400 درهم | الناقص: 400`,
  },

  // ── ممتع ─────────────────────────────────────────────────────
  {
    id: "ascii-art",
    title: "رسم بالأسكي 🎨",
    desc: "حلقات متداخلة ترسم أشكالاً — أفضل تمرين لفهم التكرار.",
    category: "ممتع 🎲",
    level: "مبتدئ",
    emoji: "🎨",
    code: `n = 6
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
print()
for i in range(1, 5):
    print("".join(f"{i*j:4}" for j in range(1, 6)))`,
    output: `     *
    ***
   *****
  *******
 *********
***********

   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20`,
  },
  {
    id: "guess",
    title: "لعبة التخمين",
    desc: "عشوائية + حلقات + شروط في لعبة صغيرة تعمل في المختبر.",
    category: "ممتع 🎲",
    level: "مبتدئ",
    emoji: "🎲",
    code: `import random

secret = random.randint(1, 100)
low, high = 1, 100
tries = 0

# محاكاة لاعب ذكي (بحث ثنائي)
while True:
    guess = (low + high) // 2
    tries += 1
    if guess == secret:
        print(f"وجدها {guess} في {tries} محاولات")
        break
    elif guess < secret:
        print(guess, "→ أكبر")
        low = guess + 1
    else:
        print(guess, "→ أصغر")
        high = guess - 1`,
    output: `50 → أكبر
75 → أصغر
62 → أكبر
وجدها 68 في 4 محاولات`,
    tip: "البحث الثنائي يجد أي رقم بين 1 و100 في 7 محاولات كحد أقصى.",
  },
  {
    id: "password",
    title: "مولّد كلمات مرور",
    desc: "secrets أأمن من random لكل ما يخص الحماية.",
    category: "ممتع 🎲",
    level: "متوسط",
    emoji: "🔑",
    code: `import secrets, string

alphabet = string.ascii_letters + string.digits + "!@#$%^&*"

def make(n=16):
    return "".join(secrets.choice(alphabet) for _ in range(n))

for _ in range(3):
    pw = make()
    strength = sum([any(c.isupper() for c in pw),
                    any(c.isdigit() for c in pw),
                    any(c in "!@#$%^&*" for c in pw)])
    print(pw, "| قوة:", "★" * (strength + 1))`,
    output: `k9P#mQ2vTz!x7Lea | قوة: ★★★★
Bd4$nWq8XcVm1Rto | قوة: ★★★★
Zp7&hKs3LmNb9Qwe | قوة: ★★★★`,
  },
  {
    id: "turtle-sim",
    title: "محاكاة سلحفاة بالنص",
    desc: "منطق الإحداثيات والزوايا — الأساس خلف Pygame و Turtle.",
    category: "ممتع 🎲",
    level: "متوسط",
    emoji: "🐢",
    code: `import math

x, y, angle = 0.0, 0.0, 0.0
path = [(x, y)]

for step in range(6):          # سداسي منتظم
    x += 10 * math.cos(math.radians(angle))
    y += 10 * math.sin(math.radians(angle))
    angle += 60
    path.append((round(x, 1), round(y, 1)))

for p in path:
    print(p)
print("عاد للبداية؟", abs(path[-1][0]) < 1e-6 and abs(path[-1][1]) < 1e-6)`,
    output: `(0.0, 0.0)
(10.0, 0.0)
(15.0, 8.7)
(10.0, 17.3)
(0.0, 17.3)
(-5.0, 8.7)
(-0.0, 0.0)
عاد للبداية؟ True`,
  },
];

export function encodeCode(code: string): string {
  return btoa(unescape(encodeURIComponent(code)));
}
