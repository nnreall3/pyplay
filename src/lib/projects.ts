
export interface ProjectStep {
  title: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  emoji: string;
  summary: string;
  goals: string[];
  steps: ProjectStep[];
  starter: string;
  hints?: string[];
  xp: number;
}

export const PROJECTS: Project[] = [
  {
    id: "calculator",
    title: "آلة حاسبة طرفية",
    level: "مبتدئ",
    emoji: "🧮",
    summary:
      "أنشئ آلة حاسبة تستقبل عمليتين ومُعامل (+, -, *, /) وتطبع النتيجة مع معالجة القسمة على صفر.",
    goals: [
      "استخدام input() لقراءة الأرقام والمُعامل",
      "التحقق من صحة المدخلات",
      "معالجة الاستثناءات (ZeroDivisionError, ValueError)",
      "تنسيق المخرجات",
    ],
    steps: [
      { title: "قراءة المدخلات", detail: "اطلب من المستخدم رقمين ورمز العملية." },
      { title: "تنفيذ العملية", detail: "استخدم if/elif/else لاختيار العملية." },
      { title: "حماية القسمة", detail: "إن كان المقام صفراً اطبع رسالة ولا تنهر البرنامج." },
      { title: "تنسيق الناتج", detail: "اطبع مثل: 10 + 5 = 15" },
    ],
    starter:
      '# آلة حاسبة بسيطة\na = float(input("الرقم الأول: "))\nop = input("العملية (+ - * /): ")\nb = float(input("الرقم الثاني: "))\n\n# TODO: نفّذ العملية واطبع الناتج\n',
    hints: ["جرّب استخدام try/except لتحويل النص إلى عدد بأمان."],
    xp: 30,
  },
  {
    id: "todo",
    title: "قائمة مهام (To-Do)",
    level: "مبتدئ",
    emoji: "📝",
    summary:
      "ابنِ قائمة مهام تفاعلية: إضافة، حذف، تعليم كمكتمل، عرض كل المهام.",
    goals: [
      "العمل مع القوائم list",
      "حلقة while للقائمة الرئيسية",
      "استخدام القواميس dict لتخزين حالة كل مهمة",
    ],
    steps: [
      { title: "هيكل البيانات", detail: "قائمة من القواميس: {title, done}." },
      { title: "قائمة الأوامر", detail: "اعرض: 1) إضافة 2) عرض 3) إكمال 4) حذف 5) خروج." },
      { title: "تكرار حتى الخروج", detail: "استخدم while True مع break." },
    ],
    starter:
      'tasks = []\n\nwhile True:\n    print("\\n1) إضافة  2) عرض  3) إكمال  4) حذف  5) خروج")\n    choice = input("اختيارك: ")\n    # TODO: نفّذ الاختيارات\n    if choice == "5":\n        break\n',
    xp: 40,
  },
  {
    id: "guess",
    title: "لعبة تخمين الرقم",
    level: "مبتدئ",
    emoji: "🎯",
    summary:
      "الحاسوب يختار رقماً سرياً بين 1 و 100، واللاعب يخمّن مع تلميحات أعلى/أقل.",
    goals: [
      "استخدام مكتبة random",
      "حلقات while + break",
      "عدّ المحاولات",
    ],
    steps: [
      { title: "توليد الرقم", detail: "import random; secret = random.randint(1, 100)." },
      { title: "حلقة التخمين", detail: "اقرأ رقماً وقارنه. أعطِ تلميحاً." },
      { title: "النهاية", detail: "اطبع عدد المحاولات عند النجاح." },
    ],
    starter:
      'import random\n\nsecret = random.randint(1, 100)\ntries = 0\n\nwhile True:\n    g = int(input("خمّن (1-100): "))\n    tries += 1\n    # TODO: قارن واعرض تلميحاً\n',
    xp: 40,
  },
  {
    id: "text-analyzer",
    title: "محلّل نصوص",
    level: "متوسط",
    emoji: "🔍",
    summary:
      "حلّل نصاً: عدد الكلمات، الأحرف، الجمل، وأكثر 5 كلمات تكراراً.",
    goals: [
      "split / strip / lower",
      "القواميس لعدّ التكرار",
      "ترتيب باستخدام sorted + key",
      "تنسيق f-strings",
    ],
    steps: [
      { title: "قراءة النص", detail: "استخدم input() متعدد الأسطر أو نص ثابت للاختبار." },
      { title: "إحصاء", detail: "احسب الكلمات والأحرف بدون مسافات." },
      { title: "أكثر تكراراً", detail: "استخدم dict ثم sorted(items, key=lambda x: -x[1])." },
    ],
    starter:
      'text = """بايثون لغة قوية. بايثون سهلة وممتعة.\nبايثون تستخدم في كل مكان."""\n\nwords = text.lower().split()\n# TODO: احسب التكرار ورتّب\n',
    xp: 60,
  },
  {
    id: "csv-stats",
    title: "تحليل ملف CSV",
    level: "متقدم",
    emoji: "📊",
    summary:
      "اقرأ ملف CSV من نص داخلي، واستخرج إحصائيات: مجموع، متوسط، أعلى/أقل قيمة، باستخدام pandas.",
    goals: [
      "استخدام pandas (يُحمَّل تلقائياً في Pyodide)",
      "DataFrame.describe()",
      "groupby",
    ],
    steps: [
      { title: "تحضير CSV", detail: "ضع البيانات في متغيّر نصّي ثم io.StringIO." },
      { title: "قراءة", detail: "pd.read_csv(StringIO(data))." },
      { title: "تحليل", detail: "df.describe() و df.groupby('city')['sales'].sum()." },
    ],
    starter:
      'import pandas as pd\nfrom io import StringIO\n\ndata = """city,sales\nريا,120\nجدة,200\nريا,80\nالدمام,150\nجدة,90"""\n\ndf = pd.read_csv(StringIO(data))\n# TODO: اطبع describe و groupby\n',
    hints: ["pandas تأخذ بضع ثوانٍ في أول تحميل داخل المتصفح."],
    xp: 80,
  },
  {
    id: "bank",
    title: "نظام بنك OOP",
    level: "متقدم",
    emoji: "🏦",
    summary:
      "صمّم كلاسات Account و Bank مع عمليات إيداع، سحب، تحويل، وتاريخ معاملات.",
    goals: [
      "الكلاسات والوراثة",
      "خصائص private (_balance)",
      "الاستثناءات المخصّصة",
      "@property و @classmethod",
    ],
    steps: [
      { title: "Account", detail: "أنشئ كلاس مع id, owner, balance وعمليات deposit/withdraw." },
      { title: "استثناءات", detail: "أنشئ InsufficientFunds(Exception)." },
      { title: "Bank", detail: "كلاس يحفظ القائمة ويسمح بالتحويل بين حسابين." },
      { title: "اختبار", detail: "نفّذ سيناريو كامل واطبع كشف الحساب." },
    ],
    starter:
      'class InsufficientFunds(Exception):\n    pass\n\nclass Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self._balance = balance\n        self.history = []\n\n    # TODO: deposit, withdraw, __repr__\n\nclass Bank:\n    def __init__(self):\n        self.accounts = []\n    # TODO: open_account, transfer\n',
    xp: 100,
  },
];

export const TOTAL_PROJECTS = PROJECTS.length;
