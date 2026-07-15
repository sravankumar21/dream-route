export interface RankTarget {
  rankRange: string;
  scoreRange: string;
  seatType: string;
  whatToFocus: string[];
}

export interface ExamTarget {
  id: string;
  name: string;
  fullName: string;
  conductedBy: string;
  pattern: string;
  totalMarks: string;
  duration: string;
  mode: string;
  eligibility: string;
  importantDates: { event: string; date: string }[];
  rankTargets: RankTarget[];
  preparationTips: string[];
  officialWebsite: string;
  applicationLink: string;
}

export const exams: ExamTarget[] = [
  {
    id: "ts-eamcet",
    name: "TS EAMCET",
    fullName: "Telangana State Engineering, Agriculture & Medical Common Entrance Test",
    conductedBy: "JNTU Hyderabad on behalf of TSCHE",
    pattern: "160 MCQs — 80 Maths, 40 Physics, 40 Chemistry",
    totalMarks: "160",
    duration: "3 hours",
    mode: "Computer-based (CBT)",
    eligibility: "60% in MPC (45% for reserved) + TS EAMCET qualifier",
    importantDates: [
      { event: "Application starts", date: "February (tentative)" },
      { event: "Application deadline", date: "March (tentative)" },
      { event: "Exam date", date: "May (tentative)" },
      { event: "Results", date: "June (tentative)" },
      { event: "Counselling starts", date: "July (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "1 — 2,000",
        scoreRange: "140 — 160",
        seatType: "Top branches (CSE, ECE) in JNTUH, OU, top private colleges — fully govt fee",
        whatToFocus: ["Maths — Coordinate geometry, Calculus, Algebra", "Physics — Modern physics, Electrostatics", "Chemistry — Organic reactions, Mole concept"],
      },
      {
        rankRange: "2,000 — 10,000",
        scoreRange: "100 — 140",
        seatType: "Good branches in reputed colleges — govt fee (₹10K—50K/yr)",
        whatToFocus: ["Maths — Definite integration, Probability, Vectors", "Physics — Magnetism, Current electricity", "Chemistry — Thermodynamics, Chemical bonding"],
      },
      {
        rankRange: "10,000 — 30,000",
        scoreRange: "70 — 100",
        seatType: "Core branches in mid-tier colleges — govt fee",
        whatToFocus: ["Maths — Focus on high-weightage chapters", "Physics — Optics, Waves", "Chemistry — p-block, d-block elements"],
      },
      {
        rankRange: "30,000 — 60,000",
        scoreRange: "45 — 70",
        seatType: "Available in private colleges — higher fee (₹1L—3L/yr)",
        whatToFocus: ["Maths — Practice previous year papers", "Physics — Revise formulas daily", "Chemistry — NCERT thoroughly"],
      },
      {
        rankRange: "60,000+",
        scoreRange: "Below 45",
        seatType: "Management quota in private colleges — ₹3L—8L/yr",
        whatToFocus: ["Revise basics from NCERT", "Focus on easy scoring topics", "Take mock tests weekly"],
      },
    ],
    preparationTips: [
      "Complete NCERT Maths, Physics, Chemistry textbooks first",
      "Solve previous 10 years TS EAMCET papers",
      "Take weekly mock tests on official CBT platform",
      "Focus on Maths — it carries 50% weightage",
      " revise formulas sheet daily (15 min)",
      "Join a test series for rank benchmarking",
    ],
    officialWebsite: "https://tseamcet.nic.in",
    applicationLink: "https://tseamcet.nic.in",
  },
  {
    id: "ap-eamcet",
    name: "AP EAMCET",
    fullName: "Andhra Pradesh Engineering, Agriculture & Medical Common Entrance Test",
    conductedBy: "JNTU Anantapur on behalf of APSCHE",
    pattern: "160 MCQs — 80 Maths, 40 Physics, 40 Chemistry",
    totalMarks: "160",
    duration: "3 hours",
    mode: "Computer-based (CBT)",
    eligibility: "60% in MPC (45% for reserved) + AP EAMCET qualifier",
    importantDates: [
      { event: "Application starts", date: "March (tentative)" },
      { event: "Application deadline", date: "April (tentative)" },
      { event: "Exam date", date: "May (tentative)" },
      { event: "Results", date: "June (tentative)" },
      { event: "Counselling starts", date: "July (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "1 — 2,000",
        scoreRange: "140 — 160",
        seatType: "Top branches in JNTUA, AU, SVU — fully govt fee",
        whatToFocus: ["Maths — Calculus, Coordinate geometry", "Physics — Semiconductors, Communication systems", "Chemistry — Organic chemistry mechanisms"],
      },
      {
        rankRange: "2,000 — 10,000",
        scoreRange: "100 — 140",
        seatType: "Good branches in reputed colleges — govt fee (₹10K—50K/yr)",
        whatToFocus: ["Maths — Differential equations, Probability", "Physics — Thermodynamics, Kinematics", "Chemistry — Equilibrium, Electrochemistry"],
      },
      {
        rankRange: "10,000 — 30,000",
        scoreRange: "70 — 100",
        seatType: "Core branches in mid-tier colleges — govt fee",
        whatToFocus: ["Maths — Practice speed & accuracy", "Physics — Revise numerical problems", "Chemistry — Inorganic revision"],
      },
      {
        rankRange: "30,000 — 60,000",
        scoreRange: "45 — 70",
        seatType: "Available in private colleges — higher fee (₹1L—3L/yr)",
        whatToFocus: ["Previous year papers", "Formula revision", "Mock tests"],
      },
      {
        rankRange: "60,000+",
        scoreRange: "Below 45",
        seatType: "Management quota — ₹3L—8L/yr",
        whatToFocus: ["NCERT basics", "Easy scoring chapters", "Consistent practice"],
      },
    ],
    preparationTips: [
      "NCERT textbooks are the foundation",
      "Solve AP EAMCET previous papers (2015—2024)",
      "Weekly mock tests on CBT platform",
      "Maths — 50% weightage, prioritize it",
      "Short formula notes for quick revision",
      "Focus on time management during exam",
    ],
    officialWebsite: "https://cets.apsche.ap.gov.in",
    applicationLink: "https://cets.apsche.ap.gov.in",
  },
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test (UG)",
    conductedBy: "National Testing Agency (NTA)",
    pattern: "180 MCQs — 45 Physics, 45 Chemistry, 90 Biology (Botany + Zoology)",
    totalMarks: "720",
    duration: "3 hours 20 minutes",
    mode: "Pen-and-paper (OMR based)",
    eligibility: "60% in PCB (40% for reserved) + 17 years age",
    importantDates: [
      { event: "Application starts", date: "February (tentative)" },
      { event: "Application deadline", date: "March (tentative)" },
      { event: "Exam date", date: "May (tentative)" },
      { event: "Results", date: "June (tentative)" },
      { event: "Counselling starts", date: "July (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "1 — 1,000",
        scoreRange: "680 — 720",
        seatType: "AIIMS, JIPMER, top govt medical colleges — fully funded",
        whatToFocus: ["Biology — NCERT line-by-line (50% marks)", "Physics — Mechanics, Thermodynamics", "Chemistry — Organic + Inorganic balanced"],
      },
      {
        rankRange: "1,000 — 10,000",
        scoreRange: "600 — 680",
        seatType: "Good govt medical colleges — ₹1K—10K/yr",
        whatToFocus: ["Biology — Genetics, Ecology, Human physiology", "Physics — Electrostatics, Magnetism", "Chemistry — Chemical bonding, Coordination compounds"],
      },
      {
        rankRange: "10,000 — 50,000",
        scoreRange: "500 — 600",
        seatType: "Private medical colleges — ₹10L—20L/yr",
        whatToFocus: ["Biology — Complete NCERT thoroughly", "Physics — Focus on high-weightage topics", "Chemistry — Physical chemistry numericals"],
      },
      {
        rankRange: "50,000 — 1,00,000",
        scoreRange: "400 — 500",
        seatType: "Deemed universities, private colleges — ₹15L—25L/yr",
        whatToFocus: ["Biology — Most scoring, focus here", "Physics — Formula-based questions", "Chemistry — NCERT-based questions"],
      },
      {
        rankRange: "1,00,000+",
        scoreRange: "Below 400",
        seatType: "Management quota — ₹20L—60L/yr",
        whatToFocus: ["NCERT Biology thoroughly", "Basic Physics formulas", "Inorganic Chemistry from NCERT"],
      },
    ],
    preparationTips: [
      "NCERT Biology is 80% of NEET — read it 3-4 times",
      "Physics needs conceptual clarity + numerical practice",
      "Chemistry — balance Organic, Inorganic, Physical",
      "Solve 10 years NEET papers",
      "Take weekly full-length mock tests (180 questions)",
      "Analyze mistakes — maintain an error notebook",
    ],
    officialWebsite: "https://neet.nta.nic.in",
    applicationLink: "https://neet.nta.nic.in",
  },
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    conductedBy: "National Testing Agency (NTA)",
    pattern: "Paper 1: 75 MCQs (25 each Physics, Chemistry, Maths) — 300 marks",
    totalMarks: "300",
    duration: "3 hours",
    mode: "Computer-based (CBT)",
    eligibility: "75% in PCM (60% for reserved) or top 20 percentile",
    importantDates: [
      { event: "Session 1 registration", date: "November (tentative)" },
      { event: "Session 1 exam", date: "January (tentative)" },
      { event: "Session 2 registration", date: "February (tentative)" },
      { event: "Session 2 exam", date: "April (tentative)" },
      { event: "Results", date: "April / June (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "1 — 1,000",
        scoreRange: "280 — 300",
        seatType: "Top NITs (Trichy, Warangal, Surathkal) — CSE, ECE — fully govt fee",
        whatToFocus: ["Maths — Calculus, Algebra, Coordinate geometry", "Physics — Mechanics, Electrostatics", "Chemistry — Organic mechanisms, Physical numericals"],
      },
      {
        rankRange: "1,000 — 10,000",
        scoreRange: "220 — 280",
        seatType: "Good NITs, IIITs — core branches — govt fee (₹1L—2L/yr)",
        whatToFocus: ["Maths — High-weightage chapters mastery", "Physics — Thermodynamics, Optics", "Chemistry — Chemical bonding, Equilibrium"],
      },
      {
        rankRange: "10,000 — 50,000",
        scoreRange: "150 — 220",
        seatType: "NITs — lower branches, good private colleges — mixed fee",
        whatToFocus: ["Maths — Coordinate geometry, Vectors", "Physics — Modern physics, Semiconductors", "Chemistry — p-block, d-block elements"],
      },
      {
        rankRange: "50,000 — 1,00,000",
        scoreRange: "100 — 150",
        seatType: "Lower NITs, private colleges — ₹2L—8L/yr",
        whatToFocus: ["Practice previous year papers", "Focus on scoring chapters", "Regular mock tests"],
      },
      {
        rankRange: "1,00,000+",
        scoreRange: "Below 100",
        seatType: "Private colleges — management quota — ₹8L—20L/yr",
        whatToFocus: ["NCERT fundamentals", "Easy scoring topics", "Consistent daily practice"],
      },
    ],
    preparationTips: [
      "NCERT is the base — complete it first",
      "Solve JEE Main previous 10 years papers",
      "Take NTA Abhyas app mock tests",
      "Maths — practice 30 problems daily",
      "Physics — focus on numerical problem-solving",
      "Chemistry — memorize Inorganic from NCERT",
    ],
    officialWebsite: "https://jeemain.nta.nic.in",
    applicationLink: "https://jeemain.nta.nic.in",
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    conductedBy: "IIT Roorkee (rotates annually)",
    pattern: "65 MCQs + NAT — 100 marks (15 general + 85 subject)",
    totalMarks: "100",
    duration: "3 hours",
    mode: "Computer-based (CBT)",
    eligibility: "Final year or completed B.Tech/B.E.",
    importantDates: [
      { event: "Application starts", date: "August (tentative)" },
      { event: "Application deadline", date: "September (tentative)" },
      { event: "Exam date", date: "February (tentative)" },
      { event: "Results", date: "March (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "1 — 100",
        scoreRange: "75 — 100",
        seatType: "PSUs (IOCL, NTPC, BHEL) — ₹10L—18L/yr package",
        whatToFocus: ["Core subject mastery", "General Aptitude (15 marks)", "Technical mathematics"],
      },
      {
        rankRange: "100 — 1,000",
        scoreRange: "55 — 75",
        seatType: "IIT M.Tech — fully funded + stipend ₹12,400/mo",
        whatToFocus: ["Previous year GATE papers (20 years)", "Core subject deep dive", "NAT problem practice"],
      },
      {
        rankRange: "1,000 — 5,000",
        scoreRange: "40 — 55",
        seatType: "NIT M.Tech, PSU interviews — stipend ₹12,400/mo",
        whatToFocus: ["High-weightage topics", "Formula sheets", "Mock tests"],
      },
      {
        rankRange: "5,000 — 10,000",
        scoreRange: "30 — 40",
        seatType: "Lower NITs, state engineering colleges",
        whatToFocus: ["Focus on scoring chapters", "General Aptitude easy marks", "Consistent practice"],
      },
    ],
    preparationTips: [
      "Start with previous 20 years GATE papers",
      "Focus on high-weightage topics (60% of marks from 40% syllabus)",
      "General Aptitude — easy 15 marks, don't skip",
      "NAT questions — practice numerical answer type",
      "Join a test series for benchmarking",
      "Revision cycles — short notes for quick recall",
    ],
    officialWebsite: "https://gate.iitd.ac.in",
    applicationLink: "https://gate.iitd.ac.in",
  },
  {
    id: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    conductedBy: "IIMs (rotates annually)",
    pattern: "66 MCQs + TITA — 3 sections: VARC, DILR, QA — 198 marks",
    totalMarks: "198",
    duration: "2 hours (40 min per section)",
    mode: "Computer-based (CBT)",
    eligibility: "50% in graduation (45% for reserved)",
    importantDates: [
      { event: "Application starts", date: "August (tentative)" },
      { event: "Application deadline", date: "September (tentative)" },
      { event: "Exam date", date: "November (tentative)" },
      { event: "Results", date: "January (tentative)" },
    ],
    rankTargets: [
      {
        rankRange: "99.5+ percentile",
        scoreRange: "130 — 150+",
        seatType: "IIM Ahmedabad, Bangalore, Calcutta — ₹15L—25L total",
        whatToFocus: ["VARC — Reading comprehension mastery", "DILR — Data interpretation speed", "QA — Arithmetic, Algebra, Geometry"],
      },
      {
        rankRange: "97 — 99.5 percentile",
        scoreRange: "100 — 130",
        seatType: "IIM Lucknow, Kozhikode, Indore — ₹12L—20L total",
        whatToFocus: ["VARC — Para jumbles, Para summary", "DILR — Caselets, Tables", "QA — Number systems, Modern math"],
      },
      {
        rankRange: "90 — 97 percentile",
        scoreRange: "70 — 100",
        seatType: "New IIMs, top private B-schools — ₹8L—15L total",
        whatToFocus: ["QA — Focus on easy-medium questions", "DILR — Practice 2 sets daily", "VARC — Daily reading habit"],
      },
      {
        rankRange: "80 — 90 percentile",
        scoreRange: "50 — 70",
        seatType: "Good private B-schools — ₹5L—12L total",
        whatToFocus: ["Sectional cutoffs — don't ignore any section", "Mock analysis", "Time management"],
      },
    ],
    preparationTips: [
      "Start with a diagnostic test to find weak areas",
      "Daily reading (30 min) — newspapers, editorials",
      "QA — focus on Arithmetic and Algebra first",
      "DILR — solve 2 sets daily under time pressure",
      "VARC — practice RC passages daily",
      "Take 1 full mock per week — analyze deeply",
    ],
    officialWebsite: "https://iimcat.ac.in",
    applicationLink: "https://iimcat.ac.in",
  },
];

export const getExamById = (id: string) => exams.find((e) => e.id === id);
