// Quick-reference cards grouped by topic.
export interface CheatItem {
  label: string;
  code: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  emoji: string;
  items: CheatItem[];
}

export const CHEATSHEETS: CheatSheet[] = [
  {
    id: "syntax",
    title: "الأساسيات",
    emoji: "✨",
    items: [
      { label: "متغيّر", code: "x = 10\nname = \"علي\"" },
      { label: "طباعة بـ f-string", code: "print(f\"العمر: {x}\")" },
      { label: "تعليق", code: "# هذا تعليق\n\"\"\"تعليق متعدد الأسطر\"\"\"" },
      { label: "تحويل النوع", code: "int(\"5\"); float(\"3.14\"); str(10); bool(0)" },
    ],
  },
  {
    id: "control",
    title: "التحكم",
    emoji: "🔀",
    items: [
      { label: "if/elif/else", code: "if x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ..." },
      { label: "for", code: "for i in range(5):\n    print(i)" },
      { label: "while", code: "while cond:\n    ...\n    if stop: break" },
      { label: "تعبير شرطي", code: "y = 'موجب' if x > 0 else 'سالب'" },
    ],
  },
  {
    id: "collections",
    title: "المجموعات",
    emoji: "📦",
    items: [
      { label: "list", code: "a = [1, 2, 3]\na.append(4); a[0]; a[-1]; len(a)" },
      { label: "dict", code: "d = {'k': 1}\nd['k']; d.get('x', 0); d.items()" },
      { label: "set", code: "s = {1,2,3}\ns.add(4); 1 in s; s | {5}" },
      { label: "tuple", code: "t = (1, 2)\nx, y = t  # تفكيك" },
    ],
  },
  {
    id: "functions",
    title: "الدوال",
    emoji: "🧩",
    items: [
      { label: "تعريف", code: "def add(a, b=0):\n    return a + b" },
      { label: "lambda", code: "double = lambda x: x * 2" },
      { label: "*args/**kwargs", code: "def f(*args, **kw):\n    print(args, kw)" },
      { label: "Type hints", code: "def add(a: int, b: int) -> int:\n    return a + b" },
    ],
  },
  {
    id: "oop",
    title: "الكلاسات",
    emoji: "🏛️",
    items: [
      { label: "تعريف", code: "class Cat:\n    def __init__(self, name):\n        self.name = name" },
      { label: "وراثة", code: "class Kitten(Cat):\n    def play(self):\n        return f'{self.name} يلعب'" },
      { label: "@property", code: "class C:\n    @property\n    def x(self):\n        return self._x" },
      { label: "dataclass", code: "from dataclasses import dataclass\n@dataclass\nclass P: x: int; y: int" },
    ],
  },
  {
    id: "errors",
    title: "الاستثناءات",
    emoji: "🛡️",
    items: [
      { label: "try/except", code: "try:\n    risky()\nexcept ValueError as e:\n    print(e)" },
      { label: "raise", code: "raise ValueError('قيمة خاطئة')" },
      { label: "finally", code: "try: ...\nfinally:\n    cleanup()" },
      { label: "استثناء مخصّص", code: "class MyError(Exception):\n    pass" },
    ],
  },
  {
    id: "io",
    title: "الملفات والمدخلات",
    emoji: "💾",
    items: [
      { label: "قراءة", code: "with open('f.txt') as f:\n    text = f.read()" },
      { label: "كتابة", code: "with open('f.txt', 'w') as f:\n    f.write('hi')" },
      { label: "JSON", code: "import json\njson.dumps(obj); json.loads(s)" },
      { label: "input", code: "x = int(input('رقم: '))" },
    ],
  },
  {
    id: "advanced",
    title: "متقدم",
    emoji: "🚀",
    items: [
      { label: "list comprehension", code: "[x*x for x in range(10) if x % 2 == 0]" },
      { label: "generator", code: "def gen():\n    for i in range(3):\n        yield i" },
      { label: "decorator", code: "def log(f):\n    def w(*a, **k):\n        print('call'); return f(*a, **k)\n    return w" },
      { label: "async/await", code: "async def main():\n    await asyncio.sleep(1)" },
    ],
  },
];
