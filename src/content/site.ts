/**
 * All copy for the site, in English and Arabic.
 * Source of truth: the Engine Experts company profile (PDF). Wording is polished
 * for the web but keeps the original meaning — no invented facts or figures.
 */

export type Lang = "en" | "ar";

export type ServiceId =
  "firefighting" | "motors" | "pumps" | "transformers" | "generators" | "hvac" | "ducting";
export type WorkCategory = "pumps" | "generators" | "motors" | "transformers" | "hvac";
export type ClientSectorId =
  | "contracting"
  | "energy"
  | "industrial"
  | "hospitality"
  | "retail"
  | "food"
  | "agriculture"
  | "diversified";

/* Contact details exactly as printed in the profile. */
export const BRANCHES = [
  {
    id: "riyadh",
    phone: "0583454844",
    tel: "+966583454844",
    email: "Engine-expert@outlook.com",
  },
  {
    id: "dammam",
    phone: "0569316336",
    tel: "+966569316336",
    email: "Engine-expert@outlook.com",
  },
] as const;

export type BranchId = (typeof BRANCHES)[number]["id"];

const en = {
  meta: {
    dir: "ltr" as "ltr" | "rtl",
    switchLabel: "العربية",
    switchAria: "Switch to Arabic",
  },
  brand: {
    name: "Engine Experts",
    tagline: "for maintenance",
    legal: "Engine Experts Maintenance Establishment",
  },
  nav: {
    about: "About",
    vision: "Vision",
    values: "Values",
    services: "Services",
    clients: "Partners",
    projects: "Projects",
    contact: "Contact",
    cta: "Contact our team",
    menu: "Open menu",
    close: "Close menu",
  },
  hero: {
    eyebrow: "Engine Experts · Maintenance & Operations",
    line1: "Engineering reliability.",
    line2: "Powering performance.",
    body: "Integrated maintenance and operation solutions for electrical and mechanical equipment — delivered by skilled engineering teams, modern technology and a full commitment to international standards.",
    ctaPrimary: "Explore our services",
    ctaSecondary: "Contact our team",
    tags: ["Electric motors", "Pumps", "Transformers", "Generators & ATS", "HVAC"],
    branches: "Riyadh · Dammam",
    scroll: "Scroll",
  },
  about: {
    index: "01",
    label: "About us",
    statement:
      "We go beyond maintenance — we build integrated operating systems that keep equipment performing.",
    p1: "Engine Experts Maintenance Establishment is a specialized provider of comprehensive solutions in the maintenance and operation of electrical and mechanical equipment. Since its inception, the company has been committed to delivering reliable, integrated technical services that meet the needs of industrial and commercial sectors.",
    p2: "We rely on highly skilled engineering and technical teams and the latest global technologies to give our clients the highest standards of quality and efficiency, in full compliance with international benchmarks.",
    p3: "Our focus is to help clients enhance performance, minimize downtime and achieve long-term sustainability of their equipment and infrastructure.",
    pillars: [
      { title: "Electrical equipment", text: "Motors, transformers, generators and ATS panels." },
      { title: "Mechanical equipment", text: "Pumps of all types, cooling and heating systems." },
      { title: "Operations", text: "Integrated operating systems for business continuity." },
    ],
    caption: "Our team on site",
  },
  vision: {
    index: "02",
    label: "Our vision",
    title: "A leading, fully integrated establishment for specialized technical solutions.",
    body: "To lead in maintenance and operations, keeping pace with global developments in engineering technology and enhancing the sustainability and efficiency of electrical and mechanical infrastructure.",
    body2:
      "We strive to be the first choice for companies, factories and major institutions — through high quality, innovative services and full commitment to international standards.",
  },
  mission: {
    index: "03",
    label: "Our mission",
    title: "Our success is measured by our clients' satisfaction and trust.",
    intro: "We are committed to providing integrated maintenance and operation services built on:",
    points: [
      "The latest global technologies in diagnostics and repair.",
      "Highly skilled and experienced engineering and technical staff.",
      "Innovative solutions that ensure operational continuity and efficiency.",
      "Strategic partnerships that strengthen our position as a trusted provider in the technical services sector.",
    ],
    statement:
      "We deliver added value by improving the performance of our clients' equipment and systems, extending their operational life and minimizing unexpected breakdowns — ensuring business continuity and maximum productivity.",
  },
  values: {
    index: "04",
    label: "Our core values",
    title: "Principles that run through every job we take on.",
    items: [
      { title: "Quality First", text: "Delivering precise services with professional standards." },
      { title: "Integrity", text: "Building relationships based on transparency and trust." },
      {
        title: "Continuous Innovation",
        text: "Adopting the latest methods and technologies.",
      },
      { title: "Speed & Efficiency", text: "Immediate response with flawless execution." },
      {
        title: "Sustainability",
        text: "Ensuring continuous performance and enhancing equipment efficiency in the long term.",
      },
    ],
    goalsLabel: "Our goals",
    goals: [
      "Deliver integrated maintenance solutions that keep pace with technological advancement and meet client needs.",
      "Build long-term partnerships with leading companies and factories across sectors.",
      "Develop a specialized workforce that adopts the latest technologies and strengthens competitiveness.",
      "Enhance the efficiency of electrical and mechanical equipment while reducing failure rates.",
      "Expand our services to cover new industrial and commercial sectors.",
    ],
  },
  services: {
    index: "05",
    label: "Our services",
    title: "Seven disciplines. One accountable team.",
    body: "From diagnostics to installation, we maintain the equipment your operations depend on.",
    learnMore: "Learn more",
    request: "Request this service",
    fromField: "From the field",
    close: "Close",
    items: {
      firefighting: {
        title: "Firefighting Systems",
        short: "Installation, maintenance and repair of firefighting systems.",
        long: "We install, maintain and repair firefighting systems to help keep essential fire protection equipment ready for service.",
      },
      motors: {
        title: "Electric Motors Maintenance & Diagnostics",
        short:
          "Fault diagnosis, maintenance and repair of electric motors to restore reliable performance.",
        long: "We diagnose and maintain electric motors, identifying faults and carrying out the repairs needed to keep them running reliably and efficiently — reducing unexpected breakdowns and extending their operational life.",
      },
      pumps: {
        title: "Pumps Maintenance & Repair",
        short: "Maintenance and repair of all types of pumps.",
        long: "We maintain and repair pumps of all types — the equipment at the heart of water, firefighting and process systems — so they keep delivering with minimal downtime.",
      },
      transformers: {
        title: "Transformer Maintenance, Oil Filtration & Efficiency",
        short: "Transformer maintenance, oil filtration and efficiency improvement.",
        long: "We maintain transformers, filter their oil and work to raise their efficiency, protecting a critical part of your electrical infrastructure.",
      },
      generators: {
        title: "Generator Maintenance & ATS Panel Programming",
        short: "Generator maintenance and programming of automatic transfer switch (ATS) panels.",
        long: "We maintain generators and program ATS panels, keeping backup power ready to take over and supporting the continuity of your operations.",
      },
      hvac: {
        title: "Central Cooling & Heating Systems",
        short:
          "Installation and maintenance of central cooling and heating units, including water chillers.",
        long: "We install, operate and maintain central air cooling and heating units, including water chillers, for efficient and dependable climate control.",
      },
      ducting: {
        title: "Ducting & HVAC Foundation Works",
        short: "Execution and maintenance of ducting and HVAC foundation works.",
        long: "We execute and maintain ducting and HVAC foundation works, preparing and supporting the systems that move air through your facilities.",
      },
    } satisfies Record<ServiceId, { title: string; short: string; long: string }>,
  },
  why: {
    index: "06",
    label: "Why Engine Experts",
    title: "Engineering depth you can rely on.",
    body: "We combine expertise, people and technology to keep your equipment — and your business — running.",
    items: [
      {
        title: "Engineering expertise",
        text: "Specialized in the maintenance and operation of electrical and mechanical equipment.",
      },
      {
        title: "Skilled technical teams",
        text: "Highly skilled, experienced engineering and technical staff on every job.",
      },
      {
        title: "Modern technologies",
        text: "The latest global technologies in diagnostics and repair.",
      },
      {
        title: "Quality standards",
        text: "Precise work with full compliance to international benchmarks.",
      },
      {
        title: "Operational continuity",
        text: "Solutions that minimize downtime and unexpected breakdowns.",
      },
      {
        title: "Commitment to clients",
        text: "Long-term partnerships built on transparency and trust.",
      },
    ],
  },
  clients: {
    index: "07",
    label: "Our success partners",
    title: "Trusted by leading national and regional companies.",
    body: "We are proud to work with elite companies that have trusted our services and relied on us to ensure the continuity and efficiency of their operations.",
    all: "All sectors",
    partners: "partners",
  },
  projects: {
    index: "08",
    label: "Our work",
    title: "Real equipment. Real sites. Real work.",
    body: "A selection of photographs from our field teams across pumps, generators, motors, transformers and HVAC.",
    all: "All",
    open: "Open photo",
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",
    of: "of",
  },
  contact: {
    index: "09",
    label: "Contact us",
    title: "Let's keep your equipment running.",
    body: "Reach our engineers directly in Riyadh or Dammam, or send us the details of your request.",
    branch: "Branch",
    engineer: "Engineer",
    call: "Call",
    email: "Email",
    formTitle: "Send a request",
    formNote: "Sending opens your email app with your message addressed to the branch you choose.",
    fields: {
      name: "Full name",
      company: "Company (optional)",
      phone: "Phone",
      email: "Email",
      branch: "Branch",
      service: "Service",
      serviceAny: "General enquiry",
      message: "Message",
      messagePh: "Tell us about the equipment and what you need…",
    },
    submit: "Send request",
    sent: "Your email app is opening with the message ready to send.",
    errors: {
      name: "Please enter your name.",
      phone: "Please enter a valid phone number.",
      email: "Please enter a valid email address.",
      message: "Please add a short message (at least 10 characters).",
    },
  },
  branches: {
    riyadh: { city: "Riyadh", engineer: "Eng. Zain Al Abdeen" },
    dammam: { city: "Dammam", engineer: "Eng. Mohamed El Gendy" },
  } satisfies Record<BranchId, { city: string; engineer: string }>,
  workCategories: {
    pumps: "Pumps",
    generators: "Generators & ATS",
    motors: "Electric motors",
    transformers: "Transformers",
    hvac: "HVAC & chillers",
  } satisfies Record<WorkCategory, string>,
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export type Content = typeof en;

const ar: Content = {
  meta: {
    dir: "rtl",
    switchLabel: "English",
    switchAria: "التبديل إلى الإنجليزية",
  },
  brand: {
    name: "خبراء المحرك",
    tagline: "للصيانة",
    legal: "مؤسسة خبراء المحرك للصيانة",
  },
  nav: {
    about: "من نحن",
    vision: "رؤيتنا",
    values: "قيمنا",
    services: "خدماتنا",
    clients: "شركاء النجاح",
    projects: "أعمالنا",
    contact: "تواصل معنا",
    cta: "تواصل مع فريقنا",
    menu: "فتح القائمة",
    close: "إغلاق القائمة",
  },
  hero: {
    eyebrow: "خبراء المحرك · الصيانة والتشغيل",
    line1: "هندسة الموثوقية.",
    line2: "قوة الأداء.",
    body: "حلول متكاملة في صيانة وتشغيل المعدات الكهربائية والميكانيكية، بكوادر هندسية وفنية ذات خبرة عالية، وأحدث التقنيات، والتزام كامل بالمعايير الدولية.",
    ctaPrimary: "استكشف خدماتنا",
    ctaSecondary: "تواصل مع فريقنا",
    tags: ["المحركات الكهربائية", "المضخات", "المحولات", "المولدات ولوحات ATS", "التكييف والتبريد"],
    branches: "الرياض · الدمام",
    scroll: "مرّر",
  },
  about: {
    index: "01",
    label: "من نحن",
    statement: "نحن لا نكتفي بالصيانة فقط، بل نطوّر أنظمة عمل متكاملة تحافظ على أداء المعدات.",
    p1: "مؤسسة خبراء المحرك للصيانة هي مؤسسة متخصصة في تقديم حلول شاملة في مجالات الصيانة والتشغيل للمعدات الكهربائية والميكانيكية. منذ تأسيسها، وضعت المؤسسة نصب عينها تقديم خدمات فنية متكاملة وموثوقة تلبي احتياجات مختلف القطاعات الصناعية والتجارية.",
    p2: "نعتمد على كوادر هندسية وفنية ذات خبرة عالية، وأحدث التقنيات العالمية، لنضمن لعملائنا أعلى مستويات الجودة والكفاءة، مع التزام كامل بالمعايير الدولية.",
    p3: "نعمل على مساعدة عملائنا على رفع الأداء، وتقليل الأعطال، وتحقيق استدامة طويلة الأمد لمعداتهم وبيئتهم.",
    pillars: [
      { title: "المعدات الكهربائية", text: "المحركات والمحولات والمولدات ولوحات التحويل." },
      { title: "المعدات الميكانيكية", text: "المضخات بجميع أنواعها ووحدات التبريد والتدفئة." },
      { title: "التشغيل", text: "أنظمة عمل متكاملة تضمن استمرارية الأعمال." },
    ],
    caption: "فريقنا في الموقع",
  },
  vision: {
    index: "02",
    label: "رؤيتنا",
    title: "مؤسسة رائدة ومتكاملة في تقديم الحلول الفنية المتخصصة.",
    body: "أن تكون خبراء المحرك للصيانة رائدة في مجالات الصيانة والتشغيل، بما يواكب التطورات العالمية في التكنولوجيا الهندسية، ويعزز استدامة وكفاءة البنية التحتية الكهربائية والميكانيكية.",
    body2:
      "نسعى لأن نكون الخيار الأول للشركات والمصانع والمؤسسات الكبرى، من خلال الجودة العالية، والخدمات المبتكرة، والالتزام الكامل بالمعايير العالمية.",
  },
  mission: {
    index: "03",
    label: "رسالتنا",
    title: "نؤمن أن نجاحنا يقاس بمدى رضا عملائنا وثقتهم.",
    intro: "لذلك نلتزم بتقديم خدمات صيانة وتشغيل متكاملة تعتمد على:",
    points: [
      "أحدث التقنيات العالمية في التشخيص والإصلاح.",
      "كوادر هندسية وفنية متخصصة ذات خبرة وكفاءة عالية.",
      "حلول مبتكرة تضمن استمرارية التشغيل ورفع الكفاءة.",
      "شراكات استراتيجية تعزز موقعنا كمؤسسة موثوقة في سوق الخدمات الفنية.",
    ],
    statement:
      "رسالتنا هي أن نوفر لعملائنا قيمة مضافة عبر تحسين أداء معداتهم وأنظمتهم، وتمديد عمرها التشغيلي، وتقليل الأعطال المفاجئة، بما يضمن استمرارية الأعمال وتحقيق أعلى مستويات الكفاءة والإنتاجية.",
  },
  values: {
    index: "04",
    label: "قيمنا",
    title: "مبادئ نلتزم بها في كل عمل نقوم به.",
    items: [
      { title: "الجودة أولاً", text: "تقديم خدمات دقيقة بمعايير احترافية." },
      { title: "المصداقية", text: "بناء علاقة قائمة على الشفافية والثقة." },
      { title: "الابتكار المستمر", text: "اعتماد أحدث الأساليب والتقنيات." },
      { title: "السرعة والكفاءة", text: "الاستجابة الفورية مع التنفيذ المتقن." },
      {
        title: "الاستدامة",
        text: "ضمان استمرارية الأداء ورفع كفاءة المعدات على المدى الطويل.",
      },
    ],
    goalsLabel: "أهدافنا",
    goals: [
      "تقديم حلول صيانة متكاملة تواكب التطور التقني وتلبي احتياجات العملاء.",
      "بناء شراكات طويلة الأمد مع كبرى المؤسسات والمصانع في مختلف القطاعات.",
      "تطوير فريق عمل متخصص يواكب أحدث التقنيات ويعزز القدرة التنافسية.",
      "رفع كفاءة المعدات الكهربائية والميكانيكية وتقليل معدلات الأعطال.",
      "التوسع بخدماتنا لتغطية قطاعات صناعية وتجارية جديدة.",
    ],
  },
  services: {
    index: "05",
    label: "أعمالنا وخدماتنا",
    title: "سبعة تخصصات. فريق واحد مسؤول.",
    body: "من التشخيص إلى التركيب، نعتني بالمعدات التي تعتمد عليها عملياتك.",
    learnMore: "اعرف المزيد",
    request: "اطلب هذه الخدمة",
    fromField: "من الميدان",
    close: "إغلاق",
    items: {
      firefighting: {
        title: "أنظمة الحريق",
        short: "تركيب وصيانة وإصلاح أنظمة الحريق.",
        long: "نقوم بتركيب وصيانة وإصلاح أنظمة الحريق للمساعدة في الحفاظ على جاهزية معدات الحماية الأساسية.",
      },
      motors: {
        title: "صيانة وتشخيص أعطال المحركات الكهربائية",
        short: "تشخيص الأعطال وصيانة وإصلاح المحركات الكهربائية لاستعادة أدائها الموثوق.",
        long: "نقوم بتشخيص أعطال المحركات الكهربائية وصيانتها وتنفيذ الإصلاحات اللازمة لضمان تشغيلها بكفاءة وموثوقية، مع تقليل الأعطال المفاجئة وتمديد عمرها التشغيلي.",
      },
      pumps: {
        title: "صيانة وإصلاح المضخات بجميع أنواعها",
        short: "صيانة وإصلاح جميع أنواع المضخات.",
        long: "نقوم بصيانة وإصلاح المضخات بجميع أنواعها، وهي قلب أنظمة المياه والإطفاء والعمليات، لتستمر في العمل بأقل توقف ممكن.",
      },
      transformers: {
        title: "صيانة ورفع كفاءة المحولات وفلترة الزيت",
        short: "صيانة المحولات وفلترة الزيت ورفع الكفاءة.",
        long: "نقوم بصيانة المحولات وفلترة زيتها والعمل على رفع كفاءتها، حفاظاً على جزء حيوي من بنيتك التحتية الكهربائية.",
      },
      generators: {
        title: "صيانة وبرمجة المولدات ولوحات التحويل ATS",
        short: "صيانة المولدات وبرمجة لوحات التحويل التلقائي (ATS).",
        long: "نقوم بصيانة المولدات وبرمجة لوحات التحويل ATS، لتبقى الطاقة الاحتياطية جاهزة دائماً بما يدعم استمرارية عملياتك.",
      },
      hvac: {
        title: "تركيب وصيانة وحدات التبريد والتدفئة المركزية",
        short: "تركيب وتشغيل وصيانة وحدات التبريد والتدفئة المركزية بما فيها الـ Water chiller.",
        long: "نقوم بتركيب وتشغيل وصيانة وحدات تبريد وتدفئة الهواء المركزي، بما في ذلك وحدات Water chiller، لتحكم مناخي فعّال وموثوق.",
      },
      ducting: {
        title: "تنفيذ وصيانة أعمال الدكت والتأسيس",
        short: "تنفيذ وصيانة أعمال الدكت وتأسيس أنظمة التكييف.",
        long: "ننفذ ونصون أعمال الدكت والتأسيس لأنظمة التكييف، لتجهيز ودعم الأنظمة التي توزع الهواء في منشآتك.",
      },
    },
  },
  why: {
    index: "06",
    label: "لماذا خبراء المحرك؟",
    title: "عمق هندسي يمكنك الاعتماد عليه.",
    body: "نجمع بين الخبرة والكوادر والتقنية لنحافظ على تشغيل معداتك — واستمرارية أعمالك.",
    items: [
      {
        title: "خبرة هندسية",
        text: "تخصص في صيانة وتشغيل المعدات الكهربائية والميكانيكية.",
      },
      {
        title: "كوادر فنية ماهرة",
        text: "كوادر هندسية وفنية متخصصة ذات خبرة وكفاءة عالية في كل مشروع.",
      },
      {
        title: "تقنيات حديثة",
        text: "أحدث التقنيات العالمية في التشخيص والإصلاح.",
      },
      {
        title: "معايير الجودة",
        text: "عمل دقيق مع التزام كامل بالمعايير الدولية.",
      },
      {
        title: "استمرارية التشغيل",
        text: "حلول تقلل التوقف والأعطال المفاجئة.",
      },
      {
        title: "التزام تجاه العملاء",
        text: "شراكات طويلة الأمد قائمة على الشفافية والثقة.",
      },
    ],
  },
  clients: {
    index: "07",
    label: "شركاء النجاح",
    title: "موضع ثقة نخبة من الشركات الوطنية والإقليمية.",
    body: "نفخر في خبراء المحرك للصيانة بأننا نعمل مع نخبة من الشركات الوطنية والإقليمية الكبرى التي وثقت في خدماتنا واعتمدت علينا لضمان استمرارية وكفاءة عملياتها.",
    all: "جميع القطاعات",
    partners: "شركاء",
  },
  projects: {
    index: "08",
    label: "أعمالنا",
    title: "معدات حقيقية. مواقع حقيقية. عمل حقيقي.",
    body: "مختارات من صور فرقنا الميدانية في المضخات والمولدات والمحركات والمحولات وأنظمة التكييف.",
    all: "الكل",
    open: "عرض الصورة",
    prev: "الصورة السابقة",
    next: "الصورة التالية",
    close: "إغلاق",
    of: "من",
  },
  contact: {
    index: "09",
    label: "تواصل معنا",
    title: "لنحافظ على تشغيل معداتك.",
    body: "تواصل مباشرة مع مهندسينا في الرياض أو الدمام، أو أرسل لنا تفاصيل طلبك.",
    branch: "الفرع",
    engineer: "المهندس",
    call: "اتصال",
    email: "بريد إلكتروني",
    formTitle: "أرسل طلبك",
    formNote: "عند الإرسال يُفتح تطبيق البريد لديك برسالة موجهة إلى الفرع الذي تختاره.",
    fields: {
      name: "الاسم الكامل",
      company: "الشركة (اختياري)",
      phone: "رقم الجوال",
      email: "البريد الإلكتروني",
      branch: "الفرع",
      service: "الخدمة",
      serviceAny: "استفسار عام",
      message: "الرسالة",
      messagePh: "أخبرنا عن المعدات وما تحتاجه…",
    },
    submit: "إرسال الطلب",
    sent: "يتم فتح تطبيق البريد لديك والرسالة جاهزة للإرسال.",
    errors: {
      name: "يرجى إدخال الاسم.",
      phone: "يرجى إدخال رقم جوال صحيح.",
      email: "يرجى إدخال بريد إلكتروني صحيح.",
      message: "يرجى كتابة رسالة قصيرة (10 أحرف على الأقل).",
    },
  },
  branches: {
    riyadh: { city: "فرع الرياض", engineer: "المهندس زين العابدين" },
    dammam: { city: "فرع الدمام", engineer: "المهندس محمد الجندي" },
  },
  workCategories: {
    pumps: "المضخات",
    generators: "المولدات ولوحات ATS",
    motors: "المحركات الكهربائية",
    transformers: "المحولات",
    hvac: "التكييف والتبريد",
  },
  footer: {
    rights: "جميع الحقوق محفوظة.",
    backToTop: "العودة للأعلى",
  },
};

export const CONTENT: Record<Lang, Content> = { en, ar };

export const SERVICE_ORDER: ServiceId[] = [
  "firefighting",
  "motors",
  "pumps",
  "transformers",
  "generators",
  "hvac",
  "ducting",
];

/** Which gallery category illustrates each service. */
export const SERVICE_WORK: Record<ServiceId, WorkCategory> = {
  firefighting: "pumps",
  motors: "motors",
  pumps: "pumps",
  transformers: "transformers",
  generators: "generators",
  hvac: "hvac",
  ducting: "hvac",
};

type Bi = { en: string; ar: string };

/** Client and partner names, grouped by sector, as listed in the profile. */
export const CLIENT_SECTORS: { id: ClientSectorId; name: Bi; clients: Bi[] }[] = [
  {
    id: "contracting",
    name: { en: "Contracting, Operation & Maintenance", ar: "قطاع المقاولات والتشغيل والصيانة" },
    clients: [
      { en: "Al Yamama Trading & Contracting Co.", ar: "شركة اليمامة للتجارة والمقاولات" },
      { en: "Enova Energy & Maintenance", ar: "شركة إنوفا للطاقة والصيانة" },
      { en: "Initial Contracting Co.", ar: "شركة إنيشيال للمقاولات" },
      { en: "Al Qasi International Co.", ar: "شركة القسي العالمية" },
      { en: "Al Majal Al Arabi Group", ar: "شركة المجال العربي" },
      { en: "Saudi Golf", ar: "شركة سعودي جولف" },
      { en: "Al Suwaiket Contracting Co.", ar: "شركة السويكت للمقاولات" },
      { en: "HAM Contracting Co. Ltd.", ar: "شركة هام للمقاولات المحدودة" },
      { en: "Abdullah Ayed Al Anazi Contracting Co.", ar: "شركة عبدالله عائد العنزي للمقاولات" },
      {
        en: "Civil & Electrical Projects Contracting Co. (CEPCO)",
        ar: "شركة المشاريع المدنية والكهربائية للمقاولات (CEPCO)",
      },
    ],
  },
  {
    id: "energy",
    name: { en: "Energy, Water & Firefighting", ar: "قطاع الطاقة والمياه والإطفاء" },
    clients: [
      { en: "Aqua Trade for Water Treatment", ar: "شركة أكوا تريد لمعالجة المياه" },
      { en: "Saden Water & Energy Works Co.", ar: "شركة سدن لأعمال المياه والطاقة" },
      { en: "NAFFCO", ar: "شركة نافكو" },
      { en: "ITEX", ar: "شركة إيتكس" },
      { en: "Arab Fire & Safety Systems Co.", ar: "الشركة العربية لنظام الإطفاء والحريق" },
      { en: "SHAS Water Co.", ar: "شركة شاس للمياه" },
      { en: "Al Mumayaz Petroleum & Gas Works Co.", ar: "الشركة المميزة لأعمال البترول والغاز" },
    ],
  },
  {
    id: "industrial",
    name: { en: "Industry & Manufacturing", ar: "قطاع الصناعة والمصانع" },
    clients: [
      { en: "Al Jadawel Factory for Agricultural Machinery", ar: "مصنع الجدول للآلات الزراعية" },
      { en: "Al Maslak Al Watani for Trade & Industry", ar: "المسلك الوطني للتجارة والصناعة" },
      { en: "Abdulkarim Al Rajhi Iron Factory", ar: "مصنع عبدالكريم الراجحي للحديد" },
      { en: "Watani Steel Factory", ar: "مصنع حديد وطني" },
      { en: "Al Sharq Plastic Factory", ar: "مصنع الشرق للبلاستيك" },
      { en: "Al Othmania Dates Factory", ar: "مصنع نخيل العثمانية" },
      { en: "Saudi Mechanical Industries Co.", ar: "الشركة السعودية الميكانيكية" },
      { en: "SABIC Advanced Industries", ar: "سابك للصناعات المتطورة" },
    ],
  },
  {
    id: "hospitality",
    name: { en: "Hospitality & Real Estate", ar: "قطاع الضيافة والعقارات" },
    clients: [
      { en: "Al Hayat Regency Hotel", ar: "فندق الحياة ريجنسي" },
      { en: "Kingdom Holding Company", ar: "المملكة القابضة" },
    ],
  },
  {
    id: "retail",
    name: { en: "Commercial Centers & Retail", ar: "قطاع المراكز التجارية والتجزئة" },
    clients: [
      { en: "Riyadh Gallery Mall", ar: "رياض جاليري مول" },
      { en: "Al Salam Mall", ar: "السلام مول" },
      { en: "TALA Mall", ar: "تالا مول" },
      { en: "Granada Mall", ar: "غرناطة مول" },
      { en: "Arabian Centres", ar: "المراكز العربية" },
      { en: "Abdullah Al Othaim Group", ar: "مجموعة عبدالله العثيم" },
    ],
  },
  {
    id: "food",
    name: { en: "Food & Large-Scale Retail", ar: "قطاع الأغذية والتجزئة الكبرى" },
    clients: [
      { en: "Savola Group", ar: "مجموعة صافولا" },
      { en: "Dima Food Products Factory", ar: "مصنع ديمة للمنتجات الغذائية" },
      { en: "Al Rajhi Food Factory", ar: "مصنع الراجحي للمواد الغذائية" },
    ],
  },
  {
    id: "agriculture",
    name: { en: "Agriculture & Poultry Production", ar: "قطاع الزراعة والإنتاج الحيواني" },
    clients: [{ en: "Tanmia Poultry Farm", ar: "مزرعة دواجن التنمية" }],
  },
  {
    id: "diversified",
    name: { en: "Major Diversified Companies", ar: "شركات كبرى متنوعة" },
    clients: [{ en: "Al Jomaih Holding", ar: "شركة الجميح القابضة" }],
  },
];
