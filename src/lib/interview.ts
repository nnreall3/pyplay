export interface QA {
  q: string;
  a: string;
  code?: string;
}

export interface InterviewSection {
  id: string;
  title: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  questions: QA[];
}

export const INTERVIEW: InterviewSection[] = [
  {
    id: "basics",
    title: "الأساسيات",
    level: "مبتدئ",
    questions: [
      {
        q: "ما الفرق بين list و tuple؟",
        a: "list قابلة للتعديل (mutable) ويمكن إضافة وحذف عناصرها. tuple ثابتة (immutable) وأسرع وأخفّ ذاكرة، وتُستخدم كمفاتيح dict.",
      },
      {
        q: "ما الفرق بين is و ==؟",
        a: "== يقارن القيم. is يقارن هويّة الكائن في الذاكرة (نفس المرجع).",
        code: "a = [1,2]; b = [1,2]\nprint(a == b)  # True\nprint(a is b)  # False",
      },
      {
        q: "ما هي None؟",
        a: "قيمة فريدة تمثّل 'لا شيء'. نوعها NoneType. تُستخدم كقيمة افتراضية للدوال.",
      },
      {
        q: "كيف تتحقق من نوع متغيّر؟",
        a: "استخدم isinstance(x, int) — أفضل من type(x) == int لأنّها تدعم الوراثة.",
      },
    ],
  },
  {
    id: "data",
    title: "هياكل البيانات",
    level: "متوسط",
    questions: [
      {
        q: "كيف تعكس قائمة بأكثر من طريقة؟",
        a: "ثلاث طرق: a[::-1] (شريحة)، list(reversed(a))، أو a.reverse() (يعدّل القائمة).",
      },
      {
        q: "ما الفرق بين shallow و deep copy؟",
        a: "shallow ينسخ الطبقة الأولى فقط (copy.copy). deep ينسخ كل العناصر المتداخلة (copy.deepcopy).",
      },
      {
        q: "كيف تدمج قاموسين؟",
        a: "في 3.9+: d1 | d2. أو {**d1, **d2}. أو d1.update(d2).",
      },
      {
        q: "متى تستخدم set بدلاً من list؟",
        a: "عندما تحتاج فحص العضوية (in) بسرعة O(1)، أو لإزالة المكرّرات.",
      },
    ],
  },
  {
    id: "functions",
    title: "الدوال والـ OOP",
    level: "متوسط",
    questions: [
      {
        q: "ما الفرق بين *args و **kwargs؟",
        a: "*args يجمع المعاملات الموضعية في tuple. **kwargs يجمع المعاملات المُسمّاة في dict.",
      },
      {
        q: "ما الـ decorator؟",
        a: "دالة تأخذ دالة وتُرجع دالة معدّلة. تُستخدم لإضافة سلوك (تسجيل، تخزين مؤقت، تحقّق) دون تعديل الأصل.",
        code: "@functools.lru_cache\ndef fib(n):\n    return n if n < 2 else fib(n-1)+fib(n-2)",
      },
      {
        q: "الفرق بين @staticmethod و @classmethod؟",
        a: "staticmethod لا يأخذ self ولا cls. classmethod يأخذ cls (الكلاس) ويصلح كـ factory.",
      },
    ],
  },
  {
    id: "advanced",
    title: "متقدم",
    level: "متقدم",
    questions: [
      {
        q: "ما الـ GIL؟",
        a: "Global Interpreter Lock في CPython يمنع تنفيذ أكثر من thread بايثون في وقت واحد. لذا threading جيّد للإدخال/الإخراج، و multiprocessing للحساب الثقيل.",
      },
      {
        q: "ما الفرق بين yield و return؟",
        a: "return ينهي الدالة ويُرجع قيمة. yield يُنتج قيمة ويحفظ الحالة (generator) ليُستأنف لاحقاً.",
      },
      {
        q: "ما الـ context manager؟",
        a: "كائن يدعم __enter__ و __exit__، يُستخدم مع with لإدارة الموارد (ملفات، اتصالات). يضمن التنظيف حتى مع الاستثناءات.",
      },
      {
        q: "كيف تجعل كلاس قابلاً للتكرار (iterable)؟",
        a: "نفّذ __iter__ يُرجع iterator، و __next__ يُرجع العنصر التالي أو يرفع StopIteration.",
      },
      {
        q: "async/await مقابل threading؟",
        a: "async تعاوني (single-thread، يبدّل عند await). threading قسري (OS). asyncio أكفأ لآلاف الاتصالات الشبكية.",
      },
    ],
  },
];
