export interface GlossaryTerm {
  term: string;
  en: string;
  category: "أساسيات" | "بنى البيانات" | "تحكم" | "دوال" | "كائنية" | "أخطاء" | "متقدم" | "وحدات";
  definition: string;
  example?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  // أساسيات
  { term: "متغيّر", en: "Variable", category: "أساسيات",
    definition: "اسم يربط قيمة في الذاكرة. في بايثون لا تحتاج لتعريف النوع مسبقاً.",
    example: "name = 'Ali'\nage = 22" },
  { term: "نوع البيانات", en: "Data Type", category: "أساسيات",
    definition: "صنف القيمة: int, float, str, bool, list, dict, tuple, set, None.",
    example: "type(3.14)  # <class 'float'>" },
  { term: "تحويل النوع", en: "Type Casting", category: "أساسيات",
    definition: "تحويل قيمة من نوع لآخر باستخدام دوال مثل int() و str() و float().",
    example: "int('42')  # 42" },
  { term: "المسافة البادئة", en: "Indentation", category: "أساسيات",
    definition: "بايثون تستخدم المسافات لتحديد الكتل البرمجية بدل الأقواس. المعيار 4 مسافات." },
  { term: "تعليق", en: "Comment", category: "أساسيات",
    definition: "نص يُتجاهل عند التنفيذ، يبدأ بـ #. يُستخدم للتوضيح.",
    example: "# هذا تعليق" },
  { term: "f-string", en: "f-string", category: "أساسيات",
    definition: "سلسلة نصية مُنسّقة تُضمّن قيم بين قوسين {}.",
    example: "f'مرحبا {name}, عمرك {age}'" },

  // تحكم
  { term: "if / elif / else", en: "Conditionals", category: "تحكم",
    definition: "تنفيذ كود مختلف حسب الشرط. elif لشرط ثانوي، else للحالة المتبقية.",
    example: "if x > 10:\n    print('كبير')\nelif x > 5:\n    print('متوسط')\nelse:\n    print('صغير')" },
  { term: "حلقة for", en: "for loop", category: "تحكم",
    definition: "تكرر كود لكل عنصر داخل تسلسل (قائمة، نص، range).",
    example: "for i in range(3):\n    print(i)" },
  { term: "حلقة while", en: "while loop", category: "تحكم",
    definition: "تكرر طالما الشرط صحيح. احذر الحلقة اللانهائية.",
    example: "n = 0\nwhile n < 3:\n    n += 1" },
  { term: "break / continue", en: "break / continue", category: "تحكم",
    definition: "break يخرج من الحلقة، continue يقفز للتكرار التالي.",
    example: "for x in nums:\n    if x < 0: continue\n    if x > 100: break" },
  { term: "Truthy / Falsy", en: "Truthiness", category: "تحكم",
    definition: "قيم تُعتبر False ضمنياً: 0, '', [], {}, None. غيرها True." },

  // بنى البيانات
  { term: "قائمة", en: "list", category: "بنى البيانات",
    definition: "تسلسل قابل للتعديل، يحوي عناصر بأي نوع. مفهرس من 0.",
    example: "nums = [1, 2, 3]\nnums.append(4)" },
  { term: "تابل", en: "tuple", category: "بنى البيانات",
    definition: "تسلسل غير قابل للتعديل (immutable). مناسب للقيم الثابتة.",
    example: "point = (3, 4)" },
  { term: "قاموس", en: "dict", category: "بنى البيانات",
    definition: "هيكل مفتاح/قيمة. الوصول O(1).",
    example: "user = {'name': 'Ali', 'age': 22}" },
  { term: "مجموعة", en: "set", category: "بنى البيانات",
    definition: "مجموعة من عناصر فريدة، غير مرتّبة، تدعم العمليات الرياضية.",
    example: "s = {1, 2, 3}\ns.add(2)  # لا يتكرر" },
  { term: "تقطيع", en: "Slicing", category: "بنى البيانات",
    definition: "استخراج جزء من تسلسل: seq[start:stop:step].",
    example: "[1,2,3,4,5][1:4]  # [2,3,4]" },
  { term: "List Comprehension", en: "List Comprehension", category: "بنى البيانات",
    definition: "إنشاء قائمة بصياغة موجزة من تكرار وشرط اختياري.",
    example: "[n*n for n in range(5) if n % 2 == 0]" },

  // دوال
  { term: "دالة", en: "Function", category: "دوال",
    definition: "كتلة كود قابلة لإعادة الاستخدام تُعرّف بـ def.",
    example: "def add(a, b):\n    return a + b" },
  { term: "وسائط", en: "Arguments", category: "دوال",
    definition: "القيم المُمرّرة للدالة. تشمل positional و keyword و default و *args و **kwargs." },
  { term: "lambda", en: "lambda", category: "دوال",
    definition: "دالة مجهولة الاسم، تعبير واحد فقط.",
    example: "square = lambda x: x * x" },
  { term: "Closure", en: "Closure", category: "دوال",
    definition: "دالة داخلية تحتفظ بمتغيرات النطاق الخارجي بعد انتهائه." },
  { term: "Decorator", en: "Decorator", category: "دوال",
    definition: "دالة تغلّف دالة أخرى لإضافة سلوك، تُطبّق بـ @name.",
    example: "@staticmethod\ndef greet(): ..." },

  // كائنية
  { term: "كلاس", en: "Class", category: "كائنية",
    definition: "قالب لإنشاء كائنات تجمع بيانات وسلوكاً.",
    example: "class Dog:\n    def __init__(self, name):\n        self.name = name" },
  { term: "كائن", en: "Object / Instance", category: "كائنية",
    definition: "نسخة من كلاس، تملك حالتها الخاصة." },
  { term: "self", en: "self", category: "كائنية",
    definition: "مرجع للكائن الحالي يُمرَّر تلقائياً كأول وسيط للميثود." },
  { term: "وراثة", en: "Inheritance", category: "كائنية",
    definition: "كلاس يرث صفات وميثودات من كلاس آخر.",
    example: "class Cat(Animal): ..." },
  { term: "تعدد الأشكال", en: "Polymorphism", category: "كائنية",
    definition: "نفس الاسم بسلوك مختلف حسب النوع — مثل إعادة تعريف __str__." },
  { term: "Dunder Methods", en: "Magic Methods", category: "كائنية",
    definition: "ميثودات خاصة تبدأ وتنتهي بـ __ مثل __init__ و __str__ و __len__." },

  // أخطاء
  { term: "Exception", en: "Exception", category: "أخطاء",
    definition: "خطأ في زمن التشغيل. يُلتقط بـ try/except لتجنّب توقف البرنامج.",
    example: "try:\n    int('x')\nexcept ValueError as e:\n    print(e)" },
  { term: "raise", en: "raise", category: "أخطاء",
    definition: "إطلاق استثناء يدوياً.",
    example: "raise ValueError('قيمة غير صالحة')" },
  { term: "finally", en: "finally", category: "أخطاء",
    definition: "كتلة تُنفَّذ دائماً سواء حدث استثناء أم لا — للتنظيف." },

  // متقدم
  { term: "Generator", en: "Generator", category: "متقدم",
    definition: "دالة تُنتج قيماً متدفقة باستخدام yield، توفر الذاكرة.",
    example: "def nums():\n    for i in range(3):\n        yield i" },
  { term: "Iterator", en: "Iterator", category: "متقدم",
    definition: "كائن يدعم __iter__ و __next__ — يُستخدم في حلقات for." },
  { term: "GIL", en: "Global Interpreter Lock", category: "متقدم",
    definition: "قفل في CPython يسمح بتنفيذ خيط بايثون واحد فقط في وقت واحد." },
  { term: "Context Manager", en: "Context Manager", category: "متقدم",
    definition: "كائن يُستخدم مع with لإدارة الموارد (فتح/إغلاق).",
    example: "with open('f.txt') as f:\n    data = f.read()" },
  { term: "async / await", en: "async / await", category: "متقدم",
    definition: "كتابة كود غير متزامن (Coroutines) لمهام I/O المتزامنة." },

  // وحدات
  { term: "Module", en: "Module", category: "وحدات",
    definition: "ملف .py يحوي كوداً قابلاً للاستيراد.",
    example: "import math\nmath.sqrt(9)" },
  { term: "Package", en: "Package", category: "وحدات",
    definition: "مجلد يحوي عدة modules مع __init__.py." },
  { term: "pip", en: "pip", category: "وحدات",
    definition: "أداة تثبيت الحزم الرسمية لبايثون.",
    example: "pip install requests" },
  { term: "Virtual Environment", en: "venv", category: "وحدات",
    definition: "بيئة معزولة لمكتبات مشروع معين دون التأثير على النظام.",
    example: "python -m venv .venv" },
];

export const GLOSSARY_CATEGORIES = [
  "أساسيات", "تحكم", "بنى البيانات", "دوال", "كائنية", "أخطاء", "متقدم", "وحدات",
] as const;
