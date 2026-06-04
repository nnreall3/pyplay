export type ChallengeType = "arrange" | "fill" | "mcq" | "output";

export interface Challenge {
  type: ChallengeType;
  prompt: string;
  blocks?: string[];
  template?: string;
  answers?: string[];
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface LessonExample {
  code: string;
  caption?: string;
}

export interface Lesson {
  id: string;
  title: string;
  intro: string;
  sections?: LessonSection[];
  code?: string;
  notes?: string[];
  examples?: LessonExample[];
  tip?: string;
  pitfalls?: string[];
  challenges: Challenge[];
  xp: number;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  level: "مبتدئ" | "متوسط" | "متقدم" | "احترافي";
  lessons: Lesson[];
}

export const MODULES: Module[] = [
  {
    id: "intro",
    title: "مقدمة في بايثون",
    icon: "Sparkles",
    description: "ابدأ من الصفر: ما هي بايثون وكيف تكتب أول برنامج لك.",
    level: "مبتدئ",
    lessons: [
      {
        id: "intro-1",
        title: "أول برنامج: Hello World",
        intro:
          "بايثون لغة عالية المستوى تتميز ببساطة كتابتها وقربها من اللغة الإنجليزية. أول خطوة دائماً هي طباعة نص على الشاشة باستخدام الامر print().",
        sections: [
          {
            heading: "لماذا بايثون؟",
            body:
              "تُستخدم بايثون في كل المجالات تقريباً: تحليل البيانات، الذكاء الاصطناعي، تطوير الويب وصناعة الألعاب. كتابتها مرنة ومجتمعها ضخم، لذا ستجد دائماً مكتبة جاهزة لما تريد.",
          },
          {
            heading: "كيف يعمل print؟",
            body:
              "print() دالة مدمجة تأخذ ما بداخل القوسين وتحوّله إلى نص ثم تطبعه في الطرفية متبوعاً بسطر جديد. النصوص توضع بين علامتي اقتباس مفردة '' أو مزدوجة \"\".",
          },
        ],
        code: 'print("Hello World")\nprint("Nizar", "and the queen")',
        notes: [
          "print تقبل عدة قيم مفصولة بفواصل وتطبعها بمسافة بينها.",
          "يمكنك تغيير الفاصل عبر sep=' - ' وإلغاء سطر جديد عبر end=''.",
          'النصوص بين "" و \'\' متكافئة طالما تطابقت البداية والنهاية.',
        ],
        examples: [
          { code: 'print("a", "b", sep="-")', caption: "يطبع: a-b" },
          { code: 'print("سطر1", end=" | ")\nprint("سطر2")', caption: "يطبع كلاهما في سطر واحد." },
        ],
        pitfalls: [
          "نسيان القوسين: print 'hi' خطأ في بايثون 3.",
          "خلط الاقتباسات: \"hi' يعطي SyntaxError.",
        ],
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب الكود ليطبع كلمة Python",
            blocks: ["print(", '"Python"', ")"],
            explanation: "نستدعي print ثم نمرّر النص بين القوسين.",
          },
          {
            type: "fill",
            prompt: "اطبع كلمة hello مع مسافة قبل نهاية السطر بدل سطر جديد",
            template: 'print("hello", ___="")',
            answers: ["end"],
          },
          {
            type: "output",
            prompt: 'ما ناتج: print("a", "b", "c", sep="*")',
            options: ["a b c", "a*b*c", "abc", "a, b, c"],
            correctIndex: 1,
          },
        ],
        xp: 15,
      },
      {
        id: "intro-2",
        title: "التعليقات والتوثيق",
        intro:
          "التعليقات هي ملاحظات للمبرمج تتجاهلها بايثون أثناء التشغيل. تساعدك على شرح نواياك، إيقاف كود مؤقتاً، وشرح جزئية من الكود.",
        sections: [
          {
            heading: "تعليق سطر واحد",
            body: "يبدأ بعلامة # ويمتد إلى نهاية السطر.",
          },
          {
            heading: "تعليق متعدد الأسطر",
            body:
              "لا توجد علامة خاصة، لكن نستخدم سلسلة نصية ثلاثية الاقتباس \"\"\" ... \"\"\" كـ docstring لتوثيق الدوال والكلاسات.",
          },
        ],
        code: '# هذا تعليق قصير\n"""\nهذا توثيق متعدد الأسطر\nيُستخدم عادة لشرح الدوال\n"""\nprint("hi")',
        notes: [
          " التعليقات ليست الا نص بهدف ما وليست امر.",
        ],
        challenges: [
          {
            type: "mcq",
            prompt: "أي رمز يُستخدم للتعليقات في بايثون؟",
            options: ["//", "#", "/* */", "--"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "أكمل: اجعل السطر تعليقاً",
            template: "___ print('ignored')",
            answers: ["#"],
          },
          {
            type: "output",
            prompt: 'ما ناتج:\n# print("a")\nprint("b")',
            options: ["a", "b", "a\\nb", "لا شيء"],
            correctIndex: 1,
          },
        ],
        xp: 15,
      },
    ],
  },
  {
    id: "syntax",
    title: "المتغيرات والأنواع",
    icon: "Variable",
    description: "تعلّم المتغيرات، الأرقام، النصوص، والأنواع الأساسية.",
    level: "مبتدئ",
    lessons: [
      {
        id: "var-1",
        title: "تعريف متغير",
        intro:
          "المتغير اسم نخزّن فيه قيمة باستخدام علامة =. اسم المتغير في بايثون يجب أن يبدأ بحرف أو شرطة سفلية ولا يحتوي على مسافات.",
        sections: [
          {
            heading: "قواعد التسمية",
            body:
              "استخدم snake_case (مثل user_name). الأسماء حساسة لحالة الأحرف: name و Name مختلفان. تجنّب الكلمات المحجوزة مثل if, for, class.",
          },
          {
            heading: "إعادة الإسناد",
            body:
              "يمكن إعادة إسناد المتغير لقيمة من نوع آخر تماماً — بايثون لغة ديناميكية.",
          },
        ],
        code: 'name = "علي"\nage = 25\nage = "خمسة وعشرون"  # مسموح',
        examples: [
          { code: "x, y = 1, 2\nprint(x, y)", caption: "إسناد متعدد في سطر واحد." },
          { code: "a = b = 0\nprint(a, b)", caption: "نفس القيمة لعدة متغيرات." },
        ],
        pitfalls: ["1name = 5 خطأ — لا يبدأ الاسم برقم.", "class = 1 خطأ — class كلمة محجوزة."],
        challenges: [
          {
            type: "fill",
            prompt: "أنشئ متغير اسمه x وقيمته 10",
            template: "___ = ___",
            answers: ["x", "10"],
          },
          {
            type: "arrange",
            prompt: "رتّب: عيّن قيمتين معاً ثم اطبعهما",
            blocks: ["a, b = 1, 2", "print(a, b)"],
          },
          {
            type: "mcq",
            prompt: "أي اسم متغير غير صحيح؟",
            options: ["user_name", "_count", "2nd_user", "user2"],
            correctIndex: 2,
          },
        ],
        xp: 20,
      },
      {
        id: "var-2",
        title: "أنواع البيانات الأساسية",
        intro:
          "بايثون توفر أنواعاً جاهزة:",
        notes: [
          "int: لأعداد صحيحة مثل 1، -5، 0.",
          "float: لأعداد عشرية مثل 3.14، -2.5.",
          "str: لنصوص مثل مرحبا، باي.",
          "bool: للقيم المنطقية :True, False."
        ],
        sections: [
          {
            heading: "type()",
            body: "للتحقق من نوع أي قيمة استخدم type(value). يفيد في التشخيص.",
          },
        ],
        code: 'print(type(3))      # int\nprint(type(3.14))   # float\nprint(type("hi"))   # str\nprint(type(True))   # bool',
        challenges: [
          {
            type: "mcq",
            prompt: "ما نوع القيمة 3.14؟",
            options: ["int", "float", "str", "bool"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "ما نوع None؟",
            options: ["null", "NoneType", "int", "bool"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(type(True) == bool)",
            options: ["True", "False", "خطأ", "None"],
            correctIndex: 0,
          },
        ],
        xp: 20,
      },
      {
        id: "var-3",
        title: "تحويل الأنواع",
        intro:
          "نستخدم int() و str() و float() و bool() للتحويل بين الأنواع. هذا ضروري عند قراءة المدخلات أو دمج النصوص بالأرقام.",
        code: 'x = int("5")        # 5\ny = str(10)         # "10"\nz = float("3.14")   # 3.14\nprint(x + 1, y + "0", z * 2)',
        notes: [
          'int("abc") يرمي ValueError.',
          "bool(0) و bool('') و bool([]) كلها False.",
        ],
        challenges: [
          {
            type: "output",
            prompt: 'ما ناتج: print(int("7") + 3)',
            options: ["10", '"73"', "خطأ", "73"],
            correctIndex: 0,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(bool(''))",
            options: ["True", "False", "None", "خطأ"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: 'حوّل النص "3.5" إلى رقم عشري',
            template: "x = ___('3.5')",
            answers: ["float"],
          },
        ],
        xp: 20,
      },
    ],
  },
  {
    id: "operators",
    title: "العمليات والمدخلات",
    icon: "Calculator",
    description: "العمليات الحسابية والمنطقية وقراءة المدخلات.",
    level: "مبتدئ",
    lessons: [
      {
        id: "op-1",
        title: "العمليات الحسابية",
        intro:
          "بايثون تدعم + - * / إضافة إلى // (قسمة صحيحة)، % (باقي القسمة)، و ** (الأس). ترتيب الأولوية كما في الرياضيات، والأقواس تتجاوز كل شيء.",
        notes:[
          "+ : الجمع أو دمج النصوص.",
          "- : الطرح أو عكس النصوص.",
          "* : الضرب أو تكرار النصوص.",
          "/ : القسمة العشرية، النتيجة دائماً float.",
          "//: القسمة الصحيحة، النتيجة دائماً int.",
          "% : باقي القسمة.",
          "**: الأس، 2 ** 3 يعني 2 مرفوعاً للقوة 3 أي 8.",
        ],
        sections: [
          {
            heading: "/ مقابل //",
            body: "/ تُرجع دائماً float، أما // فترجع جزء صحيح من القسمة.",
          },
        ],
        code: "print(7 / 2)    # 3.5\nprint(7 // 2)   # 3\nprint(7 % 2)    # 1\nprint(2 ** 10)  # 1024",
        challenges: [
          {
            type: "output",
            prompt: "ما ناتج: print(10 // 3)",
            options: ["3.33", "3", "4", "1"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(2 ** 5)",
            options: ["10", "25", "32", "7"],
            correctIndex: 2,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(17 % 5)",
            options: ["2", "3", "4", "5"],
            correctIndex: 0,
          },
          {
            type: "fill",
            prompt: "اطبع جمع رقمين a و b",
            template: "print((a ___ b) / 2)",
            answers: ["+"],
          },
        ],
        xp: 20,
      },
      {
        id: "op-2",
        title: "المعاملات المنطقية والمقارنة",
        intro:
          "نستخدم and, or, not للقيم المنطقية، و == != < <= > >= للمقارنة. النتيجة دائماً True أو False.",
        code: 'x = 10\nprint(x > 5 and x < 20)   # True\nprint(not (x == 10))      # False',
        notes: [
          "and تُرجع أول قيمة falsy أو الأخيرة truthy.",
          "or تُرجع أول قيمة truthy أو الأخيرة.",
        ],
        challenges: [
          {
            type: "mcq",
            prompt: "ما قيمة: True and False",
            options: ["True", "False", "None", "خطأ"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(5 == '5')",
            options: ["True", "False", "خطأ", "None"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "أكمل: تحقق أن x بين 1 و 9",
            template: "1 ___ x ___ 9",
            answers: ["<", "<"],
          },
        ],
        xp: 20,
      },
      {
        id: "op-3",
        title: "قراءة المدخلات",
        intro:
          "input() تقرأ سطراً من المستخدم وتُرجعه كنص دائماً. لتحويله لرقم نستخدم int() أو float().",
        code: 'name = input("اسمك: ")\nage = int(input("عمرك: "))\nprint(f"أهلاً {name}، بعد سنة ستكون {age + 1}")',
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب الكود ليقرأ اسماً ويطبع تحية",
            blocks: ["name = input()", "print('hi', name)"],
          },
          {
            type: "fill",
            prompt: "اقرأ عدداً صحيحاً من المستخدم",
            template: "n = ___(input())",
            answers: ["int"],
          },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: "control",
    title: "الجمل الشرطية والحلقات",
    icon: "GitBranch",
    description: "if/else وحلقات for و while للتحكم في تدفق البرنامج.",
    level: "مبتدئ",
    lessons: [
      {
        id: "if-1",
        title: "if / elif / else",
        intro:
          "نستخدم الشرط لتنفيذ كود مختلف حسب الحالة. بايثون تعتمد على المسافات البادئة (Indentation) لتحديد الكتلة، عادة 4 مسافات.",
        sections: [
          {
            heading: "elif",
            body: "تمكّن من فحص عدة شروط بالتسلسل بدون تداخل عميق.",
          },
        ],
        code: 'x = 7\nif x > 10:\n    print("كبير")\nelif x > 5:\n    print("متوسط")\nelse:\n    print("صغير")',
        pitfalls: ["نسيان النقطتين : بعد الشرط.", "خلط tabs مع spaces في نفس الكتلة."],
        challenges: [
          {
            type: "fill",
            prompt: "اطبع 'كبير' إذا كان x أكبر من 100",
            template: "___ x ___ 100:\n    print('كبير')",
            answers: ["if", ">"],
          },
          {
            type: "arrange",
            prompt: "رتّب: إذا كان n زوجي اطبع even وإلا odd",
            blocks: ["if n % 2 == 0:", "    print('even')", "else:", "    print('odd')"],
          },
          {
            type: "output",
            prompt: "ما ناتج:\nx=5\nif x>3: print('a')\nelif x>4: print('b')",
            options: ["a", "b", "a\\nb", "لا شيء"],
            correctIndex: 0,
          },
        ],
        xp: 25,
      },
      {
        id: "for-1",
        title: "حلقة for و range",
        intro:
          "نكرر تنفيذ كود لكل عنصر داخل تسلسل. range(n) تنتج 0..n-1، و range(a,b) تنتج a..b-1، و range(a,b,step) تتحكم بالخطوة.",
        notes: [
          "for: هي أداة التكرار (Loop) المسؤولة عن تنفيذ الكود عدة مرات.",
          "​range(): هي دالة تقوم بتوليد سلسلة من الأرقام لتحديد عدد مرات التكرار.",
          "​مع بعض: تقوم range() بتحديد عدد المرات، بينما تقوم for بالمرور على الأرقام وتنفيذ التكرار فعلياً.",
        ],
        code: "for i in range(5):\n    print(i)\n\nfor ch in 'abc':\n    print(ch)\n\nfor i in range(10, 0, -2):\n    print(i)",
        challenges: [
          {
            type: "output",
            prompt: "ما عدد مرات طباعة 'hi':\nfor i in range(3): print('hi')",
            options: ["2", "3", "4", "0"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج: list(range(1, 6, 2))",
            options: ["[1,2,3,4,5]", "[1,3,5]", "[2,4,6]", "[1,3,5,7]"],
            correctIndex: 1,
          },
          {
            type: "arrange",
            prompt: "رتّب: اطبع مربعات الأعداد 1..3",
            blocks: ["for i in range(1, 4):", "    print(i * i)"],
          },
        ],
        xp: 25,
      },
      {
        id: "while-1",
        title: "حلقة while و break/continue",
        intro:
          "while تستمر طالما الشرط محقق. break تخرج فوراً من الحلقة، continue تتجاوز بقية التكرار الحالي.",
        code: "i = 0\nwhile i < 10:\n    if i == 5:\n        break\n    if i % 2 == 0:\n        i += 1\n        continue\n    print(i)\n    i += 1",
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب حلقة تطبع الأرقام من 0 حتى 2",
            blocks: ["i = 0", "while i < 3:", "    print(i)", "    i += 1"],
          },
          {
            type: "mcq",
            prompt: "أي كلمة تتخطى التكرار الحالي وتنتقل للتالي؟",
            options: ["pass", "break", "continue", "skip"],
            correctIndex: 2,
          },
          {
            type: "output",
            prompt: "ما ناتج:\nfor i in range(5):\n    if i==3: break\n    print(i)",
            options: ["0 1 2", "0 1 2 3", "0 1 2 3 4", "1 2 3"],
            correctIndex: 0,
          },
        ],
        xp: 30,
      },
    ],
  },
  {
    id: "data-structures",
    title: "هياكل البيانات",
    icon: "Boxes",
    description: "القوائم، التابلز، القواميس، والمجموعات.",
    level: "متوسط",
    lessons: [
      {
        id: "list-1",
        title: "القوائم List",
        intro:
          "القائمة تخزّن عناصر مرتّبة وقابلة للتعديل. أهم العمليات: append, insert, remove, pop, len, sort, reverse، إضافة إلى الفهرسة والتقطيع slicing.",
        code: "nums = [1, 2, 3]\nnums.append(4)\nnums.insert(0, 0)\nprint(nums)        # [0,1,2,3,4]\nprint(nums[1:4])   # [1,2,3]\nprint(nums[-1])    # 4",
        notes: [
          "list[-1] هو آخر عنصر، و list[::-1] يعكس القائمة.",
          "sort() يعدّل القائمة، sorted() يُرجع نسخة جديدة.",
        ],
        challenges: [
          {
            type: "output",
            prompt: "ما ناتج: print(len([1,2,3,4]))",
            options: ["3", "4", "5", "خطأ"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "أضف 5 إلى نهاية القائمة nums",
            template: "nums.___(5)",
            answers: ["append"],
          },
          {
            type: "output",
            prompt: "ما ناتج: print([1,2,3,4,5][1:4])",
            options: ["[1,2,3]", "[2,3,4]", "[2,3,4,5]", "[1,2,3,4]"],
            correctIndex: 1,
          },
          {
            type: "arrange",
            prompt: "رتّب: قائمة ثم اعكسها ثم اطبعها",
            blocks: ["a = [1, 2, 3]", "a.reverse()", "print(a)"],
          },
        ],
        xp: 25,
      },
      {
        id: "dict-1",
        title: "القواميس Dict",
        intro:
          "Dict تخزّن أزواج مفتاح/قيمة. المفاتيح فريدة وغير قابلة للتغيير (نص، رقم، tuple). الوصول سريع جداً بالاسم.",
        code: 'user = {"name": "ali", "age": 20}\nprint(user["name"])\nuser["email"] = "a@b.com"\nfor k, v in user.items():\n    print(k, "=", v)',
        notes: [
          "user.get('x', 0) لا يرمي خطأً إذا غاب المفتاح.",
          "in تفحص المفاتيح فقط: 'name' in user.",
        ],
        challenges: [
          {
            type: "fill",
            prompt: "اطبع قيمة المفتاح name من user",
            template: "print(user[___])",
            answers: ['"name"'],
          },
          {
            type: "mcq",
            prompt: "أي طريقة لا ترمي خطأً إذا غاب المفتاح؟",
            options: ["d[key]", "d.get(key)", "d.find(key)", "d.read(key)"],
            correctIndex: 1,
          },
          {
            type: "arrange",
            prompt: "رتّب: مرّ على عناصر القاموس واطبع المفاتيح",
            blocks: ["for k in user:", "    print(k)"],
          },
        ],
        xp: 25,
      },
      {
        id: "tuple-1",
        title: "التابلز Tuple",
        intro:
          "Tuple يشبه القائمة لكنه غير قابل للتعديل (immutable). يُستخدم للقيم الثابتة، الإحداثيات، أو لإرجاع عدة قيم من دالة.",
        code: "point = (3, 4)\nx, y = point   # unpacking\nprint(x, y)",
        challenges: [
          {
            type: "mcq",
            prompt: "أي مما يلي tuple؟",
            options: ["[1,2]", "(1,2)", "{1,2}", '"1,2"'],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أيٌّ مما يلي يرمي خطأً؟",
            options: ["t = (1,2); print(t[0])", "t = (1,2); t[0] = 5", "t = (1,)", "len((1,2,3))"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "فكّ tuple إلى متغيرين a و b",
            template: "___, ___ = (10, 20)",
            answers: ["a", "b"],
          },
        ],
        xp: 20,
      },
      {
        id: "set-1",
        title: "المجموعات Set",
        intro:
          "Set مجموعة من العناصر الفريدة بدون ترتيب. سريعة جداً في فحص العضوية وعمليات الاتحاد والتقاطع.",
        code: "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)   # union\nprint(a & b)   # intersection\nprint(a - b)   # difference",
        challenges: [
          {
            type: "output",
            prompt: "ما ناتج: print(len({1,2,2,3}))",
            options: ["2", "3", "4", "1"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أي عملية تُرجع التقاطع؟",
            options: ["a + b", "a & b", "a | b", "a * b"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج: print(3 in {1,2,3})",
            options: ["True", "False", "خطأ", "None"],
            correctIndex: 0,
          },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: "functions",
    title: "الدوال",
    icon: "FunctionSquare",
    description: "تعريف الدوال، المعاملات، القيم المرجعة، ولامبدا.",
    level: "متوسط",
    lessons: [
      {
        id: "fn-1",
        title: "تعريف دالة و return",
        intro:
          "نستخدم def لتعريف دالة. return تُرجع قيمة وتنهي التنفيذ. إذا لم نكتب return تُرجع الدالة None ضمنياً.",
        code: "def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)",
        sections: [
          {
            heading: "Type hints",
            body: "يمكنك توثيق الأنواع: def add(a: int, b: int) -> int: ...",
          },
        ],
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب دالة تجمع رقمين",
            blocks: ["def add(a, b):", "    return a + b"],
          },
          {
            type: "fill",
            prompt: "أكمل: دالة square تُرجع مربع n",
            template: "def square(n):\n    ___ n * n",
            answers: ["return"],
          },
          {
            type: "output",
            prompt: "ما ناتج:\ndef f(): pass\nprint(f())",
            options: ["0", "''", "None", "خطأ"],
            correctIndex: 2,
          },
        ],
        xp: 30,
      },
      {
        id: "fn-2",
        title: "المعاملات الافتراضية وkwargs",
        intro:
          "يمكن إعطاء قيم افتراضية للمعاملات، وتمرير المعاملات بالاسم. *args يجمع معاملات إضافية في tuple، و**kwargs في dict.",
        code: 'def greet(name="صديق", lang="ar"):\n    print(name, lang)\n\ngreet()\ngreet(lang="en", name="Ali")\n\ndef summary(*args, **kwargs):\n    print(args, kwargs)\nsummary(1, 2, x=10)',
        challenges: [
          {
            type: "fill",
            prompt: "دالة greet مع قيمة افتراضية 'صديق'",
            template: "def greet(name=___):\n    print(name)",
            answers: ["'صديق'"],
          },
          {
            type: "mcq",
            prompt: "ماذا يجمع *args؟",
            options: ["dict", "tuple", "list", "set"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: "ما ناتج:\ndef f(a, b=2): return a+b\nprint(f(3))",
            options: ["3", "5", "خطأ", "None"],
            correctIndex: 1,
          },
        ],
        xp: 30,
      },
      {
        id: "fn-3",
        title: "Lambda والنطاق Scope",
        intro:
          "lambda دالة قصيرة بسطر واحد بدون اسم، تفيد مع map/filter/sorted. أما النطاق (Scope) فيحدد أين يمكن الوصول للمتغيرات: المحلي، المغلق، العام، المدمج (LEGB).",
        code: "square = lambda x: x*x\nprint(square(4))\n\nnums = [1,2,3,4]\nprint(list(map(lambda x: x*2, nums)))",
        challenges: [
          {
            type: "mcq",
            prompt: "أي تعبير لامبدا صحيح لجمع رقمين؟",
            options: ["lambda a,b: a+b", "def(a,b): a+b", "lambda a,b => a+b", "fn a,b: a+b"],
            correctIndex: 0,
          },
          {
            type: "output",
            prompt: "ما ناتج: print((lambda x: x+10)(5))",
            options: ["5", "10", "15", "خطأ"],
            correctIndex: 2,
          },
          {
            type: "fill",
            prompt: "رتّب القائمة nums حسب القيمة المطلقة",
            template: "sorted(nums, key=___ x: abs(x))",
            answers: ["lambda"],
          },
        ],
        xp: 30,
      },
    ],
  },
  {
    id: "strings",
    title: "النصوص المتقدمة",
    icon: "Type",
    description: "معالجة النصوص، f-strings، والدوال المساعدة.",
    level: "متوسط",
    lessons: [
      {
        id: "str-1",
        title: "f-strings والتنسيق",
        intro:
          "f-strings (منذ Python 3.6) أسرع وأوضح طريقة لدمج القيم في النصوص. يمكن داخلها كتابة أي تعبير، والتحكم في عدد الأرقام العشرية والمحاذاة.",
        code: 'name = "Ali"\nage = 25\nprint(f"{name} عمره {age} وبعد 5 سنوات {age + 5}")\npi = 3.14159\nprint(f"{pi:.2f}")   # 3.14',
        challenges: [
          {
            type: "fill",
            prompt: "استخدم f-string لطباعة قيمة x",
            template: 'print(f"value={___}")',
            answers: ["x"],
          },
          {
            type: "mcq",
            prompt: "كيف نطبع pi بدقة رقمين عشريين عبر f-string؟",
            options: ["f'{pi:2f}'", "f'{pi:.2f}'", "f'{pi,2}'", "f'%.2f' % pi"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: 'ما ناتج: print(f"{2+3=}")',
            options: ["5", "2+3=5", "{2+3=}", "خطأ"],
            correctIndex: 1,
          },
        ],
        xp: 25,
      },
      {
        id: "str-2",
        title: "دوال النصوص",
        intro:
          "النصوص تأتي مع عشرات الميثودز: upper, lower, title, strip, split, join, replace, startswith, endswith, find, count.",
        code: 's = "  Hello Python  "\nprint(s.strip().upper())          # HELLO PYTHON\nprint("a,b,c".split(","))         # [\'a\',\'b\',\'c\']\nprint("-".join(["x","y","z"]))    # x-y-z',
        challenges: [
          {
            type: "output",
            prompt: 'ما ناتج: print("Python".upper())',
            options: ["python", "PYTHON", "Python", "خطأ"],
            correctIndex: 1,
          },
          {
            type: "output",
            prompt: 'ما ناتج: print(",".join(["a","b","c"]))',
            options: ["abc", "a b c", "a,b,c", "[a,b,c]"],
            correctIndex: 2,
          },
          {
            type: "fill",
            prompt: "احذف المسافات من حول النص s",
            template: "s.___()",
            answers: ["strip"],
          },
          {
            type: "mcq",
            prompt: "أي ميثود يفحص بداية النص؟",
            options: ["starts", "startswith", "begin", "head"],
            correctIndex: 1,
          },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: "oop",
    title: "البرمجة الكائنية OOP",
    icon: "Layers",
    description: "الكلاسات، الكائنات، الوراثة، التغليف.",
    level: "متقدم",
    lessons: [
      {
        id: "oop-1",
        title: "تعريف كلاس و __init__",
        intro:
          "الكلاس قالب لإنشاء كائنات. __init__ هي الدالة البانية التي تُستدعى عند إنشاء الكائن وتُهيّئ خصائصه عبر self.",
        code: 'class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    def bark(self):\n        print(f"{self.name} يقول هاو!")\n\nd = Dog("Rex", 3)\nd.bark()',
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب تعريف كلاس Cat باسم",
            blocks: ["class Cat:", "    def __init__(self, name):", "        self.name = name"],
          },
          {
            type: "fill",
            prompt: "أنشئ كائن Dog باسم Rex",
            template: "d = ___('Rex', 3)",
            answers: ["Dog"],
          },
          {
            type: "mcq",
            prompt: "ما هي الكلمة المستخدمة للإشارة إلى الكائن نفسه؟",
            options: ["this", "self", "me", "obj"],
            correctIndex: 1,
          },
        ],
        xp: 35,
      },
      {
        id: "oop-2",
        title: "الميثودز والخصائص",
        intro:
          "الميثودز دوال تنتمي للكلاس. يمكن أن تكون instance methods (تأخذ self)، أو classmethod، أو staticmethod.",
        code: "class Counter:\n    total = 0\n    def __init__(self):\n        Counter.total += 1\n    @classmethod\n    def count(cls):\n        return cls.total",
        challenges: [
          {
            type: "mcq",
            prompt: "أي ديكوريتر يجعل الميثود لا يحتاج self أو cls؟",
            options: ["@classmethod", "@staticmethod", "@property", "@method"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "حوّل ميثود إلى classmethod",
            template: "___\ndef create(cls): ...",
            answers: ["@classmethod"],
          },
        ],
        xp: 30,
      },
      {
        id: "oop-3",
        title: "الوراثة و super()",
        intro:
          "كلاس يرث من آخر يكتسب كل ميثوداته. super() تستدعي ميثود الأب. يمكن إعادة تعريف (override) الميثودز في الابن.",
        code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print("...")\n\nclass Dog(Animal):\n    def speak(self):\n        super().speak()\n        print(self.name, "هاو")',
        challenges: [
          {
            type: "fill",
            prompt: "عرّف كلاس Bird يرث من Animal",
            template: "class Bird(___):\n    pass",
            answers: ["Animal"],
          },
          {
            type: "mcq",
            prompt: "كيف نستدعي بانٍ من الكلاس الأب؟",
            options: ["parent.__init__()", "super().__init__()", "base()", "this.parent()"],
            correctIndex: 1,
          },
        ],
        xp: 35,
      },
      {
        id: "oop-4",
        title: "Dunder methods والخصائص",
        intro:
          "Dunder methods مثل __str__, __repr__, __len__, __eq__, __add__ تعطي الكائن سلوكاً مع print، len، ==، +. @property يجعل الميثود يُستدعى كخاصية.",
        code: "class Vec:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, o):\n        return Vec(self.x+o.x, self.y+o.y)\n    def __str__(self):\n        return f\"({self.x},{self.y})\"\n\nprint(Vec(1,2) + Vec(3,4))",
        challenges: [
          {
            type: "mcq",
            prompt: "أي ميثود يُستدعى عند print(obj)؟",
            options: ["__init__", "__str__", "__repr__", "__call__"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أي ميثود يُستدعى عند a + b؟",
            options: ["__plus__", "__add__", "__sum__", "__concat__"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "اجعل len(obj) ممكناً",
            template: "def ___(self):\n    return 5",
            answers: ["__len__"],
          },
        ],
        xp: 35,
      },
    ],
  },
  {
    id: "errors",
    title: "معالجة الأخطاء",
    icon: "AlertTriangle",
    description: "try/except، raise، والاستثناءات المخصصة.",
    level: "متقدم",
    lessons: [
      {
        id: "err-1",
        title: "try / except / else / finally",
        intro:
          "نلتقط الأخطاء حتى لا يتوقف البرنامج. else يُنفّذ إذا لم يحدث استثناء، finally يُنفّذ دائماً (مفيد لإغلاق الموارد).",
        code: "try:\n    x = int(input())\nexcept ValueError:\n    print('ليس رقماً')\nexcept ZeroDivisionError as e:\n    print('قسمة على صفر:', e)\nelse:\n    print('تم بنجاح')\nfinally:\n    print('انتهى')",
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب كود يعالج خطأ القسمة على صفر",
            blocks: ["try:", "    x = 1/0", "except ZeroDivisionError:", "    print('err')"],
          },
          {
            type: "mcq",
            prompt: "أي كتلة تعمل دائماً سواء حدث خطأ أم لا؟",
            options: ["else", "except", "finally", "raise"],
            correctIndex: 2,
          },
          {
            type: "fill",
            prompt: "احصل على رسالة الاستثناء في متغير e",
            template: "except ValueError ___ e:\n    print(e)",
            answers: ["as"],
          },
        ],
        xp: 30,
      },
      {
        id: "err-2",
        title: "raise واستثناءات مخصصة",
        intro:
          "raise يطلق استثناءً يدوياً. يمكن إنشاء استثناءات مخصصة بوراثة Exception لتمييز أخطاء التطبيق.",
        code: "class NotEnoughBalance(Exception):\n    pass\n\ndef withdraw(amount, balance):\n    if amount > balance:\n        raise NotEnoughBalance('رصيد غير كافٍ')",
        challenges: [
          {
            type: "fill",
            prompt: "ارمِ ValueError برسالة 'bad'",
            template: "___ ValueError('bad')",
            answers: ["raise"],
          },
          {
            type: "mcq",
            prompt: "من أي كلاس نرث لإنشاء استثناء مخصص؟",
            options: ["Error", "Exception", "Throwable", "BaseError"],
            correctIndex: 1,
          },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: "files",
    title: "ملفات الإدخال والإخراج",
    icon: "FileText",
    description: "قراءة وكتابة الملفات بأمان.",
    level: "متقدم",
    lessons: [
      {
        id: "file-1",
        title: "قراءة وكتابة الملفات",
        intro:
          "open يفتح ملفاً بأوضاع مختلفة: 'r' للقراءة، 'w' للكتابة (يمسح المحتوى)، 'a' للإلحاق، 'b' للوضع الثنائي. with تضمن إغلاق الملف تلقائياً.",
        code: "with open('a.txt', 'w', encoding='utf-8') as f:\n    f.write('سطر 1\\n')\n    f.write('سطر 2\\n')\n\nwith open('a.txt', encoding='utf-8') as f:\n    for line in f:\n        print(line.strip())",
        challenges: [
          {
            type: "fill",
            prompt: "افتح الملف للكتابة",
            template: "open('a.txt', ___)",
            answers: ["'w'"],
          },
          {
            type: "mcq",
            prompt: "أي وضع يلحق بدون مسح المحتوى؟",
            options: ["'r'", "'w'", "'a'", "'x'"],
            correctIndex: 2,
          },
          {
            type: "arrange",
            prompt: "رتّب: اقرأ كل أسطر الملف بأمان",
            blocks: ["with open('a.txt') as f:", "    for line in f:", "        print(line)"],
          },
        ],
        xp: 30,
      },
      {
        id: "file-2",
        title: "JSON و CSV",
        intro:
          "json.dumps يحوّل قاموس إلى نص JSON، json.loads يفعل العكس. csv module يقرأ ويكتب CSV بسهولة.",
        code: "import json\ndata = {'name':'ali','age':20}\ntext = json.dumps(data, ensure_ascii=False)\nparsed = json.loads(text)\nprint(parsed['name'])",
        challenges: [
          {
            type: "mcq",
            prompt: "أي دالة تحوّل قاموس إلى نص JSON؟",
            options: ["json.parse", "json.dumps", "json.loads", "json.read"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أي دالة تحوّل نص JSON إلى قاموس؟",
            options: ["json.dumps", "json.loads", "json.toObject", "json.from"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "حافظ على الحروف العربية في JSON",
            template: "json.dumps(d, ensure_ascii=___)",
            answers: ["False"],
          },
        ],
        xp: 30,
      },
    ],
  },
  {
    id: "advanced",
    title: "ميزات متقدمة",
    icon: "Zap",
    description: "Comprehensions، المولدات، الـ decorators.",
    level: "احترافي",
    lessons: [
      {
        id: "adv-1",
        title: "Comprehensions",
        intro:
          "طريقة موجزة وسريعة لبناء قوائم/قواميس/مجموعات: [expr for x in iter if cond]. توفر سطوراً مقارنة بالحلقات التقليدية.",
        code: "sq = [x*x for x in range(5)]\nevens = [x for x in range(10) if x % 2 == 0]\ngrid = [(i,j) for i in range(2) for j in range(2)]\nd = {x: x*x for x in range(4)}\nprint(sq, evens, grid, d)",
        challenges: [
          {
            type: "fill",
            prompt: "قائمة بمربعات الأرقام 0..4",
            template: "[x*x for x in ___(5)]",
            answers: ["range"],
          },
          {
            type: "output",
            prompt: "ما ناتج: print([x for x in range(6) if x%2])",
            options: ["[0,2,4]", "[1,3,5]", "[0,1,2,3,4,5]", "[2,4]"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "قاموس يربط كل عدد بمربعه 0..3",
            template: "{x: x*x for x in ___(4)}",
            answers: ["range"],
          },
        ],
        xp: 35,
      },
      {
        id: "adv-2",
        title: "Generators و yield",
        intro:
          "yield يجعل الدالة generator تنتج قيمة في كل استدعاء بدون تخزين الكل في الذاكرة. مثالي للبيانات الكبيرة أو اللانهائية.",
        code: "def squares(n):\n    for i in range(n):\n        yield i*i\n\nfor s in squares(5):\n    print(s)",
        challenges: [
          {
            type: "mcq",
            prompt: "أي كلمة تجعل الدالة مولّداً؟",
            options: ["return", "yield", "gen", "next"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "ما الفائدة الأساسية للمولّدات؟",
            options: ["أسرع تنفيذ", "استهلاك ذاكرة أقل", "كتابة أقصر", "تشغيل متوازي"],
            correctIndex: 1,
          },
        ],
        xp: 35,
      },
      {
        id: "adv-3",
        title: "Decorators",
        intro:
          "Decorator دالة تأخذ دالة وتُرجع دالة جديدة. تُستخدم للتسجيل، الكاش، التحقق، قياس الزمن. تُطبّق بالرمز @ فوق الدالة.",
        code: "def logger(fn):\n    def wrapper(*a, **k):\n        print('استدعاء', fn.__name__)\n        return fn(*a, **k)\n    return wrapper\n\n@logger\ndef hi(name):\n    print('hi', name)\n\nhi('Ali')",
        challenges: [
          {
            type: "mcq",
            prompt: "ما الرمز المستخدم لتطبيق decorator؟",
            options: ["#", "@", "$", "!"],
            correctIndex: 1,
          },
          {
            type: "arrange",
            prompt: "رتّب: تطبيق decorator اسمه cache على دالة slow",
            blocks: ["@cache", "def slow(n):", "    return n * n"],
          },
          {
            type: "fill",
            prompt: "أكمل: decorator يأخذ دالة fn ويُرجع wrapper",
            template: "def deco(fn):\n    def wrapper(*a, **k):\n        return ___(*a, **k)\n    return wrapper",
            answers: ["fn"],
          },
        ],
        xp: 40,
      },
    ],
  },
  {
    id: "modules-pkgs",
    title: "الموديولات والباكدجات",
    icon: "Package",
    description: "import، pip، وتنظيم المشاريع.",
    level: "متقدم",
    lessons: [
      {
        id: "mod-1",
        title: "import وأشكاله",
        intro:
          "import يستورد موديولاً كاملاً. from X import Y يستورد عنصراً محدداً. as يعيد التسمية لاختصار.",
        code: "import math\nfrom math import sqrt, pi\nimport numpy as np  # لو كانت مثبتة\nprint(math.pi, sqrt(16))",
        challenges: [
          {
            type: "fill",
            prompt: "استورد مكتبة random",
            template: "___ random",
            answers: ["import"],
          },
          {
            type: "fill",
            prompt: "استورد sqrt فقط من math",
            template: "___ math ___ sqrt",
            answers: ["from", "import"],
          },
          {
            type: "mcq",
            prompt: "أي صيغة تختصر اسم numpy إلى np؟",
            options: ["import numpy to np", "import numpy as np", "from numpy as np", "alias numpy np"],
            correctIndex: 1,
          },
        ],
        xp: 25,
      },
      {
        id: "mod-2",
        title: "pip وإدارة الحزم",
        intro:
          "pip أداة سطر أوامر لتثبيت الحزم من PyPI. يُنصح باستخدام بيئات افتراضية (venv) لكل مشروع لتجنب التعارض.",
        code: "# في الطرفية:\n# python -m venv .venv\n# source .venv/bin/activate\n# pip install requests pandas",
        challenges: [
          {
            type: "mcq",
            prompt: "ما الأمر لتثبيت حزمة requests؟",
            options: ["pip install requests", "pip add requests", "install requests", "py get requests"],
            correctIndex: 0,
          },
          {
            type: "mcq",
            prompt: "أي أمر ينشئ بيئة افتراضية؟",
            options: ["pip venv", "python -m venv .venv", "py env new", "virtualenv start"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "اعرض قائمة الحزم المثبتة",
            template: "pip ___",
            answers: ["list"],
          },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: "requests",
    title: "مكتبة Requests",
    icon: "Globe",
    description: "التواصل مع APIs والإنترنت.",
    level: "احترافي",
    lessons: [
      {
        id: "req-1",
        title: "طلبات GET و JSON",
        intro:
          "requests مكتبة بسيطة وقوية لإجراء طلبات HTTP. r.status_code يعطي الحالة، r.json() يحوّل الاستجابة JSON إلى dict.",
        code: "import requests\nr = requests.get('https://api.github.com')\nprint(r.status_code)\ndata = r.json()\nprint(list(data.keys())[:3])",
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب جلب JSON من url",
            blocks: ["import requests", "r = requests.get(url)", "data = r.json()"],
          },
          {
            type: "mcq",
            prompt: "ماذا يعني status_code = 404؟",
            options: ["نجاح", "غير موجود", "خطأ سيرفر", "إعادة توجيه"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "أرسل GET مع باراميتر q=python",
            template: "requests.get(url, ___={'q':'python'})",
            answers: ["params"],
          },
        ],
        xp: 35,
      },
      {
        id: "req-2",
        title: "POST و Headers",
        intro:
          "POST يرسل بيانات للخادم. نستخدم json= لإرسال JSON تلقائياً، و headers= للتحكم في الترويسات مثل Authorization.",
        code: "import requests\nr = requests.post(url,\n    json={'name': 'ali'},\n    headers={'Authorization': 'Bearer TOKEN'})\nprint(r.status_code)",
        challenges: [
          {
            type: "fill",
            prompt: "أرسل بيانات JSON",
            template: "requests.___(url, json=data)",
            answers: ["post"],
          },
          {
            type: "mcq",
            prompt: "أين نضع توكن المصادقة عادة؟",
            options: ["في URL", "في params", "في headers", "في cookies"],
            correctIndex: 2,
          },
        ],
        xp: 35,
      },
    ],
  },
  {
    id: "pandas",
    title: "تحليل البيانات Pandas",
    icon: "BarChart3",
    description: "التعامل مع DataFrame وتحليل البيانات.",
    level: "احترافي",
    lessons: [
      {
        id: "pd-1",
        title: "Series و DataFrame",
        intro:
          "Series عمود واحد، DataFrame جدول. أهم العمليات: head, tail, info, describe, shape, dtypes.",
        code: "import pandas as pd\ndf = pd.DataFrame({\n    'name': ['ali','sara','omar'],\n    'age':  [20, 25, 30]\n})\nprint(df.head())\nprint(df.describe())",
        challenges: [
          {
            type: "mcq",
            prompt: "أي مكتبة تُستخدم لـ DataFrame؟",
            options: ["numpy", "pandas", "matplotlib", "scipy"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "اعرض أول 5 صفوف من df",
            template: "df.___()",
            answers: ["head"],
          },
          {
            type: "mcq",
            prompt: "ماذا تُرجع df.shape؟",
            options: ["عدد الأعمدة", "tuple (صفوف، أعمدة)", "حجم الذاكرة", "أسماء الأعمدة"],
            correctIndex: 1,
          },
        ],
        xp: 30,
      },
      {
        id: "pd-2",
        title: "قراءة CSV والكتابة",
        intro:
          "pd.read_csv ينشئ DataFrame من ملف CSV. to_csv تكتبه. تدعم العديد من الخيارات: encoding, sep, header, index_col.",
        code: "df = pd.read_csv('data.csv')\nprint(df.shape)\ndf.to_csv('out.csv', index=False)",
        challenges: [
          {
            type: "fill",
            prompt: "اقرأ ملف data.csv",
            template: "df = pd.___('data.csv')",
            answers: ["read_csv"],
          },
          {
            type: "fill",
            prompt: "اكتب df إلى csv بدون فهرس",
            template: "df.to_csv('o.csv', index=___)",
            answers: ["False"],
          },
        ],
        xp: 30,
      },
      {
        id: "pd-3",
        title: "الفلترة والتجميع",
        intro:
          "نختار صفوفاً بالشروط داخل []، ونجمّع بـ groupby. agg تطبق عدة دوال تجميع.",
        code: "young = df[df.age < 25]\nby_city = df.groupby('city')['age'].mean()\nstats = df.groupby('city').agg({'age':['mean','max']})",
        challenges: [
          {
            type: "mcq",
            prompt: "كيف نختار الصفوف التي age>18؟",
            options: ["df[df.age>18]", "df.where(age>18)", "df.age>18", "filter(df, age>18)"],
            correctIndex: 0,
          },
          {
            type: "fill",
            prompt: "متوسط الأعمار حسب المدينة",
            template: "df.___('city')['age'].mean()",
            answers: ["groupby"],
          },
          {
            type: "mcq",
            prompt: "أي ميثود يطبّق عدة دوال تجميع؟",
            options: ["apply", "agg", "map", "reduce"],
            correctIndex: 1,
          },
        ],
        xp: 35,
      },
    ],
  },
  {
    id: "numpy",
    title: "الحوسبة العددية NumPy",
    icon: "Calculator",
    description: "مصفوفات سريعة وحسابات علمية.",
    level: "احترافي",
    lessons: [
      {
        id: "np-1",
        title: "إنشاء مصفوفات",
        intro:
          "NumPy يوفّر ndarray سريع جداً للعمليات الرياضية المتجهة. أهم منشئاتها: array, zeros, ones, arange, linspace.",
        code: "import numpy as np\na = np.array([1,2,3,4])\nprint(a * 2)        # [2 4 6 8]\nprint(np.zeros((2,3)))\nprint(np.arange(0, 10, 2))",
        challenges: [
          {
            type: "fill",
            prompt: "أنشئ مصفوفة من 5 أصفار",
            template: "np.___(5)",
            answers: ["zeros"],
          },
          {
            type: "output",
            prompt: "ما ناتج: np.array([1,2,3]) * 2",
            options: ["[1,2,3,1,2,3]", "[2,4,6]", "خطأ", "6"],
            correctIndex: 1,
          },
        ],
        xp: 30,
      },
    ],
  },
  {
    id: "tkinter",
    title: "واجهات Tkinter",
    icon: "MonitorSmartphone",
    description: "بناء تطبيقات سطح المكتب.",
    level: "احترافي",
    lessons: [
      {
        id: "tk-1",
        title: "نافذة وWidgets",
        intro:
          "Tkinter مدمجة مع بايثون. ننشئ نافذة tk.Tk()، نضيف widgets (Label, Button, Entry)، ثم mainloop لبدء حلقة الأحداث.",
        code: "import tkinter as tk\nroot = tk.Tk()\nroot.title('تطبيقي')\ntk.Label(root, text='مرحبا').pack()\ntk.Button(root, text='ابدأ', command=lambda: print('clicked')).pack()\nroot.mainloop()",
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب إنشاء نافذة Tkinter",
            blocks: ["import tkinter as tk", "root = tk.Tk()", "root.mainloop()"],
          },
          {
            type: "fill",
            prompt: "أنشئ زراً مكتوب عليه 'ابدأ'",
            template: "tk.Button(root, text=___)",
            answers: ["'ابدأ'"],
          },
          {
            type: "mcq",
            prompt: "أي دالة تشغّل حلقة الأحداث؟",
            options: ["root.start()", "root.run()", "root.mainloop()", "tk.loop()"],
            correctIndex: 2,
          },
        ],
        xp: 35,
      },
    ],
  },
  {
    id: "pygame",
    title: "ألعاب Pygame",
    icon: "Gamepad2",
    description: "صناعة ألعاب ثنائية الأبعاد.",
    level: "احترافي",
    lessons: [
      {
        id: "pg-1",
        title: "تهيئة Pygame",
        intro:
          "نستدعي pygame.init()، ننشئ سطح العرض display.set_mode، ثم نبني حلقة اللعبة الرئيسية التي تعالج الأحداث وتُحدّث الشاشة.",
        code: "import pygame\npygame.init()\nscreen = pygame.display.set_mode((400, 300))\npygame.display.set_caption('My Game')\nrunning = True\nwhile running:\n    for e in pygame.event.get():\n        if e.type == pygame.QUIT:\n            running = False\n    pygame.display.flip()\npygame.quit()",
        challenges: [
          {
            type: "arrange",
            prompt: "رتّب تهيئة لعبة بسيطة",
            blocks: ["import pygame", "pygame.init()", "screen = pygame.display.set_mode((400,300))"],
          },
          {
            type: "mcq",
            prompt: "أي دالة تُحدّث الشاشة؟",
            options: ["pygame.update()", "pygame.display.flip()", "screen.show()", "pygame.draw()"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أي حدث يدل على الإغلاق؟",
            options: ["pygame.EXIT", "pygame.QUIT", "pygame.CLOSE", "pygame.END"],
            correctIndex: 1,
          },
        ],
        xp: 40,
      },
    ],
  },
  {
    id: "async",
    title: "البرمجة غير المتزامنة",
    icon: "Workflow",
    description: "async/await لكتابة كود سريع وغير حاجب.",
    level: "احترافي",
    lessons: [
      {
        id: "async-1",
        title: "async / await و asyncio",
        intro:
          "async تعرّف coroutine، await ينتظر coroutine آخر. asyncio.run يشغّل البرنامج، gather يشغّل عدة مهام بالتوازي.",
        code: "import asyncio\nasync def task(n):\n    await asyncio.sleep(1)\n    return n*2\n\nasync def main():\n    results = await asyncio.gather(task(1), task(2), task(3))\n    print(results)\n\nasyncio.run(main())",
        challenges: [
          {
            type: "fill",
            prompt: "عرّف دالة async اسمها run",
            template: "___ def run():\n    pass",
            answers: ["async"],
          },
          {
            type: "mcq",
            prompt: "أي دالة تشغّل عدة مهام بالتوازي؟",
            options: ["asyncio.run", "asyncio.gather", "asyncio.wait", "asyncio.do"],
            correctIndex: 1,
          },
          {
            type: "fill",
            prompt: "انتظر coroutine اسمه t",
            template: "result = ___ t",
            answers: ["await"],
          },
        ],
        xp: 40,
      },
    ],
  },
  {
    id: "testing",
    title: "الاختبارات",
    icon: "ShieldCheck",
    description: "كتابة اختبارات unittest و pytest.",
    level: "احترافي",
    lessons: [
      {
        id: "test-1",
        title: "assert و unittest",
        intro:
          "assert يتأكد أن شرطاً صحيح، يرمي AssertionError إذا فشل. unittest إطار مدمج يضع كل اختبار في كلاس يرث TestCase.",
        code: "import unittest\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(1+1, 2)\n        self.assertTrue(2 > 1)\n\nif __name__ == '__main__':\n    unittest.main()",
        challenges: [
          {
            type: "fill",
            prompt: "تأكد أن 1+1==2",
            template: "___ 1+1 == 2",
            answers: ["assert"],
          },
          {
            type: "mcq",
            prompt: "ما الكلاس الأساس لاختبارات unittest؟",
            options: ["TestCase", "BaseTest", "Test", "TestSuite"],
            correctIndex: 0,
          },
        ],
        xp: 30,
      },
      {
        id: "test-2",
        title: "pytest و fixtures",
        intro:
          "pytest أبسط: ضع الاختبارات في دوال تبدأ بـ test_، استخدم assert عادي. Fixtures توفر بيانات أو موارد لاختبارات متعددة.",
        code: "import pytest\n\n@pytest.fixture\ndef sample():\n    return [1,2,3]\n\ndef test_sum(sample):\n    assert sum(sample) == 6",
        challenges: [
          {
            type: "mcq",
            prompt: "ما البادئة المعتادة لأسماء دوال الاختبار؟",
            options: ["check_", "test_", "spec_", "it_"],
            correctIndex: 1,
          },
          {
            type: "mcq",
            prompt: "أي ديكوريتر يعرّف fixture؟",
            options: ["@pytest.fixture", "@pytest.test", "@fixture", "@setUp"],
            correctIndex: 0,
          },
          {
            type: "fill",
            prompt: "أكمل: ديكوريتر fixture",
            template: "___\ndef data():\n    return 42",
            answers: ["@pytest.fixture"],
          },
        ],
        xp: 35,
      },
    ],
  },
];

export const ALL_LESSONS = MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
);

export function getLesson(id: string) {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getNextLessonId(id: string) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  return idx >= 0 && idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1].id : null;
}

export function getModule(id: string) {
  return MODULES.find((m) => m.id === id);
}

export const TOTAL_LESSONS = ALL_LESSONS.length;
export const TOTAL_XP = ALL_LESSONS.reduce((s, l) => s + l.xp, 0);
