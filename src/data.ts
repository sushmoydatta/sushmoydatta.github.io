// Single source of truth for the site. Mirrors the "Master Profile" doc.
// Edit text here; components read from this file only.

export const profile = {
  name: "Sushmoy Datta",
  first: "Sushmoy",
  last: "Datta",
  title: "Telecom & network engineer",
  tagline:
    "I build tools that turn network data into decisions: root causes engineers trust, spectrum views planners use, and costs management can trace.",
  location: "Dhaka, Bangladesh",
  coords: "23.81°N 90.41°E",
  email: "sushmoi007@gmail.com",
  linkedin: "https://www.linkedin.com/in/sushmoydatta",
  github: "https://github.com/sushmoydatta",
  status: "Open to network analytics & telecom automation roles",
};

export const metaTags = [
  "Network analytics",
  "RCA · Automation",
  "5G / RAN",
  "M.Tech ECE · IIT (ISM)",
];

export const marquee = [
  "Root cause analysis",
  "Spectrum intelligence",
  "Cost governance",
  "5G NR",
  "RAN · Transmission · Core",
  "Online learning",
  "Intelligent reflecting surfaces",
  "Python · SQL · LLMs",
];

export const stats = [
  { value: "17.7M+", label: "network records processed by the Root Cause Analyser" },
  { value: "6.3M+", label: "alarms grouped into 119K+ incidents" },
  { value: "16K+", label: "recurring root causes, validated by GP engineers" },
  { value: "99.9%+", label: "uptime across 300+ devices in NOC operations" },
];

export const about = {
  lead:
    "I'm a telecom and network engineer working where radio networks meet data.",
  body: [
    "I'm an Executive in Network Site Operations & Analytics at Searchlite Communications, working on Grameenphone technology projects. My current work is a cost governance platform for Grameenphone's Technology Division.",
    "Before this I interned in Radio Platform Operation at Grameenphone and worked 24/7 NOC support at Chittagong Online. I hold an M.Tech in Electronics & Communication Engineering from IIT (ISM) Dhanbad, where my thesis used online learning to control intelligent reflecting surfaces for energy-efficient 5G/6G access.",
  ],
};

export type Project = {
  id: string;
  kind: "Work" | "Personal" | "Research";
  title: string;
  summary: string;
  stack: string[];
  figures?: { v: string; l: string }[];
  link?: string;
  span: string; // Tailwind grid classes for the 12-col bento
  art: "chain" | "spectrum" | "ledger" | "rag" | "vectors" | "triage" | "irs" | "antenna" | "pipeline";
  note?: string;
};

export const projects: Project[] = [
  {
    id: "rca",
    kind: "Work",
    title: "Root Cause Analyser",
    summary:
      "Processes millions of network records and alarms, links them into mother–child alarm chains, groups them into incidents and surfaces recurring root causes. Senior Grameenphone engineers reviewed the chains and validated its root causes. Results are shown in a Flask dashboard.",
    stack: ["Python", "Pandas", "SQL", "Flask", "Alarm correlation"],
    figures: [
      { v: "17.7M+", l: "records" },
      { v: "6.3M+", l: "alarms" },
      { v: "119K+", l: "incidents" },
      { v: "16K+", l: "root causes" },
    ],
    span: "md:col-span-2 lg:col-span-7 lg:row-span-2",
    art: "chain",
    note: "Grameenphone · 2026",
  },
  {
    id: "spectrum",
    kind: "Work",
    title: "Spectrum Intelligence Dashboard",
    summary:
      "A market-wide view of spectrum across all four Bangladesh mobile operators, reconciled against BTRC gazette data, with scenario modelling and an executive Present Mode for planning and refarming decisions.",
    stack: ["Python", "Dashboards", "Scenario modelling"],
    span: "lg:col-span-5",
    art: "spectrum",
    note: "Grameenphone · 2026",
  },
  {
    id: "cost",
    kind: "Work",
    title: "Cost Governance Platform",
    summary:
      "One reliable view of technology spending for Grameenphone's Technology Division, built from 2 years of PR, PO and BOQ data across 37 vendors and 7 Central Operations teams. Every figure traces back to its source.",
    stack: ["Python", "SQL", "ETL", "CapEx / OpEx"],
    span: "lg:col-span-5",
    art: "ledger",
    note: "Searchlite · in progress",
  },
  {
    id: "cover",
    kind: "Personal",
    title: "Cover Letter Generator",
    summary:
      "Turns a job posting URL into a tailored cover letter. An LLM extracts the role and skills, the pipeline retrieves the matching parts of your background from a vector store, and the letter is written only from those parts.",
    stack: ["LangChain", "Llama 3.3 70B", "ChromaDB", "RAG"],
    link: "https://github.com/sushmoydatta/Cover-Letter-Generator",
    span: "lg:col-span-4",
    art: "rag",
  },
  {
    id: "recommend",
    kind: "Personal",
    title: "Recommend-It",
    summary:
      "Content-based movie recommender. It combines genres, keywords, tagline, cast and director, ranks films by TF-IDF cosine similarity, and fuzzy-matches misspelled titles.",
    stack: ["Python", "scikit-learn", "TF-IDF", "CLI"],
    link: "https://github.com/sushmoydatta/Recommend-It",
    span: "lg:col-span-4",
    art: "vectors",
  },
  {
    id: "wellbeing",
    kind: "Personal",
    title: "Student Wellbeing Assistant",
    summary:
      "Prototype campus support chatbot. A crisis check routes flagged messages to a safety response; other questions are answered from campus wellbeing documents through embedding search and an LLM.",
    stack: ["FastAPI", "sentence-transformers", "Groq", "JS"],
    link: "https://github.com/sushmoydatta/IIT-ISM-Student-Wellbeing-Assistant",
    span: "lg:col-span-4",
    art: "triage",
  },
  {
    id: "irs",
    kind: "Research",
    title: "Online Caching Policies for Control of Intelligent Reflecting Surfaces",
    summary:
      "M.Tech thesis, IIT (ISM) Dhanbad, under Prof. Samrat Mukhopadhyay. FTRL-based online-learning control for IRS with 250+ reflecting elements, for energy-efficient access in dense 5G/6G networks.",
    stack: ["Online learning", "FTRL", "IRS", "MATLAB"],
    figures: [
      { v: "−30%", l: "power" },
      { v: "−40%", l: "active elements" },
      { v: ">15 dB", l: "SNR held" },
      { v: "<10⁻³", l: "BER" },
    ],
    span: "md:col-span-2 lg:col-span-7",
    art: "irs",
    note: "Jul 2024 – May 2025",
  },
  {
    id: "antenna",
    kind: "Research",
    title: "2.4 GHz Patch Antenna for Heart Rate Monitoring",
    summary:
      "B.Sc thesis, IIUC. A miniaturised FR-4 patch antenna designed in CST Microwave Studio as the core of a simple wearable for elderly heart care.",
    stack: ["CST Microwave Studio", "RF design"],
    figures: [
      { v: "−28 dB", l: "return loss" },
      { v: "6.2 dBi", l: "gain" },
      { v: "90%", l: "efficiency" },
    ],
    span: "lg:col-span-5",
    art: "antenna",
    note: "Aug 2022 – Sep 2023",
  },
];

export type Role = {
  when: string;
  title: string;
  org: string;
  place: string;
  current?: boolean;
  points: string[];
};

export const experience: Role[] = [
  {
    when: "Sep 2026 — Now",
    title: "Executive, Network Site Operations & Analytics",
    org: "Searchlite Communications Ltd. · Grameenphone Technology Projects",
    place: "Dhaka",
    current: true,
    points: [
      "Developing a cost governance platform that gives Grameenphone's Technology Division management one reliable view of technology spending.",
      "Automating CapEx, OpEx and vendor cost analysis over 2 years of PR, PO and BOQ data across 37 vendors and 7 Central Operations teams.",
      "Building backend and frontend parts of automation tools, dashboards and reporting workflows.",
    ],
  },
  {
    when: "Jun — Sep 2026",
    title: "Intern, Radio Platform Operation, Technology Division",
    org: "Grameenphone Ltd",
    place: "Dhaka",
    points: [
      "Built the Root Cause Analyser: 17.7M+ records and 6.3M+ alarms grouped into 119K+ incidents and 16K+ recurring root causes, validated by senior GP engineers.",
      "Built a telecom log processing pipeline and a Spectrum Intelligence Dashboard covering all four Bangladesh operators.",
      "Worked across RAN, Transmission and Core in a multivendor network (Ericsson, Huawei, ZTE).",
    ],
  },
  {
    when: "Mar — May 2026",
    title: "Technical Support Executive (NOC)",
    org: "Chittagong Online Limited",
    place: "Chattogram",
    points: [
      "Kept 300+ network devices at 99.9%+ uptime and cut average fault-resolution time by 30% through proactive monitoring with Zabbix and MRTG.",
      "Resolved 15+ incidents a day across backbone, fiber and wireless networks for enterprise clients including banks.",
    ],
  },
  {
    when: "Jan — Dec 2025",
    title: "Teaching Assistant",
    org: "IIT (ISM) Dhanbad",
    place: "Dhanbad, India",
    points: ["Assisted in teaching Basic Electronics and mentored 50+ students."],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Telecom", items: ["5G NR", "LTE", "RAN", "Transmission", "Core Network", "Microwave", "Alarm Correlation", "Fault Management"] },
  { group: "Programming & data", items: ["Python", "SQL", "C", "MATLAB", "Pandas", "scikit-learn", "ETL", "FastAPI", "Flask", "React"] },
  { group: "AI / LLM", items: ["Machine Learning", "NLP", "RAG", "LangChain", "ChromaDB", "sentence-transformers"] },
  { group: "VLSI", items: ["Verilog", "SystemVerilog", "Cadence Virtuoso", "Xilinx Vivado", "FPGA"] },
  { group: "Analytics", items: ["KPI Reporting", "Cost Analytics", "Dashboarding", "Statistical Analysis", "Root Cause Analysis"] },
  { group: "Networking & tools", items: ["TCP/IP", "VLAN", "GPON", "DWDM", "MikroTik", "Zabbix", "MySQL", "Git", "Linux", "CST Microwave Studio"] },
];

export const education = [
  { degree: "M.Tech, Electronics & Communication Engineering", school: "IIT (Indian School of Mines), Dhanbad", when: "2024 — 2025", result: "CGPA 7.17 / 10" },
  { degree: "B.Sc, Electronic & Telecommunication Engineering", school: "International Islamic University Chittagong", when: "2018 — 2023", result: "CGPA 3.19 / 4" },
];

export const leadership = [
  { title: "President, Hostel Executive Committee", detail: "International Hostel, IIT (ISM) Dhanbad. Led the committee serving 45 residents from 11 countries." },
  { title: "Organizer, Concetto'24", detail: "IIT (ISM) Dhanbad. Managed logistics and volunteer teams for a techno-management fest with 20,000+ participants." },
  { title: "Institute Merit Scholarship", detail: "75% tuition fee waiver, IIT (ISM) Dhanbad." },
];

export const certifications = [
  { name: "21st Century Technologies", by: "Ericsson", year: "2026" },
  { name: "VLSI Design Flow", by: "ChipXpert", year: "2025" },
  { name: "VLSI for Beginners", by: "NIELIT", year: "2025" },
  { name: "Sensor Technology and System Integration", by: "IIT (ISM)", year: "2024" },
  { name: "CCNA: Introduction to Networks", by: "Cisco", year: "2023" },
];
