export interface CounselingStep {
  step: string;
  description: string;
}

export interface ExamLink {
  label: string;
  url: string;
  description: string;
}

export interface WebOptions {
  process: CounselingStep[];
  links: ExamLink[];
}

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
  webOptions: WebOptions;
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
    webOptions: {
      process: [
        { step: "1. Result & Rank Card", description: "Download rank card from tseamcet.nic.in after results are declared." },
        { step: "2. Certificate Verification", description: "Visit designated help-line centres with all original certificates for document verification." },
        { step: "3. Web Options Entry", description: "Login to tseamcet.nic.in and fill preferred college + branch combinations (unlimited options)." },
        { step: "4. First Round Allotment", description: "Seat allotment based on rank, preferences, and availability. Accept or reject." },
        { step: "5. Self-Reporting / College Reporting", description: "If satisfied, report to allotted college with fee. If not, opt for second round." },
        { step: "6. Second Round (if needed)", description: "Fill fresh web options. Final allotment — no further rounds after this." },
      ],
      links: [
        { label: "TS EAMCET Official", url: "https://tseamcet.nic.in", description: "Results, rank card, web options portal" },
        { label: "College Predictor — CollegePranav", url: "https://www.collegepranav.com/ts-eamcet-college-predictor/", description: "Enter your rank to see which colleges you can get" },
        { label: "College Predictor — Careers360", url: "https://engineering.careers360.com/tseamcet-college-predictor", description: "Rank-based college prediction with cutoff trends" },
        { label: "College Predictor — Shiksha", url: "https://www.shiksha.com/engineering/tseamcet-college-predictor", description: "Predict colleges from your TS EAMCET rank" },
        { label: "TSCHE Colleges List", url: "https://tscche.coe.telangana.gov.in/", description: "Official list of all affiliated colleges in Telangana" },
      ],
    },
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
    webOptions: {
      process: [
        { step: "1. Result & Rank Card", description: "Download rank card from cets.apsche.ap.gov.in after results." },
        { step: "2. Certificate Verification", description: "Report to helpline centres with originals for document verification." },
        { step: "3. Web Options Entry", description: "Login and fill preferred colleges + branches in order of priority." },
        { step: "4. First Round Allotment", description: "Seat allotment based on rank and preferences. Accept or skip to next round." },
        { step: "5. Self-Reporting", description: "Report to allotted college with fee if accepting the seat." },
        { step: "6. Second Round (if needed)", description: "Final round — fill fresh options. No further rounds after this." },
      ],
      links: [
        { label: "AP EAMCET Official", url: "https://cets.apsche.ap.gov.in", description: "Results, rank card, web options portal" },
        { label: "College Predictor — CollegePranav", url: "https://www.collegepranav.com/ap-eamcet-college-predictor/", description: "Enter rank to see probable colleges" },
        { label: "College Predictor — Careers360", url: "https://engineering.careers360.com/apeamcet-college-predictor", description: "Rank-based college prediction with cutoff data" },
        { label: "College Predictor — Shiksha", url: "https://www.shiksha.com/engineering/ap-eamcet-college-predictor", description: "Predict colleges from your AP EAMCET rank" },
        { label: "APSCHE Colleges List", url: "https://cets.apsche.ap.gov.in/APEAMCET/", description: "Official list of affiliated colleges in Andhra Pradesh" },
      ],
    },
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
    webOptions: {
      process: [
        { step: "1. Result & Score Card", description: "Download score card from neet.nta.nic.in. All-India rank is declared." },
        { step: "2. MCC Counselling (All India Quota)", description: "Register on mcc.nic.in for 15% All India Quota seats in govt colleges." },
        { step: "3. State Counselling", description: "Register on your state's medical counselling website for 85% state quota seats." },
        { step: "4. Choice Filling", description: "Fill preferred colleges in order of priority on the counselling portal." },
        { step: "5. Seat Allotment — Round 1", description: "Allotment based on All-India rank + preferences. Accept or float to next round." },
        { step: "6. Mop-Up Round (if seats remain)", description: "Final round for vacant seats. Report to college after allotment." },
      ],
      links: [
        { label: "NEET NTA Official", url: "https://neet.nta.nic.in", description: "Results, score card, rank list" },
        { label: "MCC Counselling (AIQ)", url: "https://mcc.nic.in", description: "15% All India Quota counselling — register here" },
        { label: "College Predictor — CollegePranav", url: "https://www.collegepranav.com/neet-college-predictor/", description: "Enter NEET rank to predict medical colleges" },
        { label: "College Predictor — Careers360", url: "https://medicine.careers360.com/neet-college-predictor", description: "NEET rank-based college prediction with cutoff trends" },
        { label: "College Predictor — Shiksha", url: "https://www.shiksha.com/medical/neet-college-predictor", description: "Predict MBBS/BDS colleges from your NEET rank" },
        { label: "List of Medical Colleges — NMC", url: "https://www.nmc.org.in/information-centre/", description: "Official list of recognised medical colleges in India" },
      ],
    },
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
    webOptions: {
      process: [
        { step: "1. JEE Main Result", description: "NTA score + All-India rank declared on jeemain.nta.nic.in." },
        { step: "2. JEE Advanced (if eligible)", description: "Top 2,50,000 qualify. Register for JEE Advanced at jeeadv.ac.in for IIT admissions." },
        { step: "3. JoSAA Counselling", description: "Register on josaa.nic.in for IITs, NITs, IIITs, and GFTIs (6 rounds)." },
        { step: "4. Choice Filling", description: "Fill institute + branch preferences in order. JoSAA uses a centralised allotment." },
        { step: "5. Seat Allotment — Round 1 to 6", description: "Based on JEE rank + preferences. Accept, freeze, float, or slide between rounds." },
        { step: "6. CSAB (if seats remain)", description: "Special round counselling for vacant NIT/IIIT seats at csab.nic.in." },
      ],
      links: [
        { label: "JEE Main NTA Official", url: "https://jeemain.nta.nic.in", description: "Results, rank, score card" },
        { label: "JEE Advanced Official", url: "https://jeeadv.ac.in", description: "IIT entrance — only for JEE Main qualifiers" },
        { label: "JoSAA Counselling", url: "https://josaa.nic.in", description: "IITs, NITs, IIITs counselling — 6 rounds" },
        { label: "CSAB Special Round", url: "https://csab.nic.in", description: "Special round for vacant NIT/IIIT seats" },
        { label: "College Predictor — CollegePranav", url: "https://www.collegepranav.com/jee-main-college-predictor/", description: "Enter rank to predict NITs/IIITs you can get" },
        { label: "College Predictor — Careers360", url: "https://engineering.careers360.com/jee-main-college-predictor", description: "JEE Main rank-based prediction with cutoff data" },
        { label: "College Predictor — Shiksha", url: "https://www.shiksha.com/engineering/jee-main-college-predictor", description: "Predict colleges from your JEE Main rank" },
      ],
    },
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
    webOptions: {
      process: [
        { step: "1. GATE Result", description: "Score + All-India rank declared on the official GATE website." },
        { step: "2. COAP (IIT M.Tech)", description: "Register on coap.iitd.ac.in for IIT M.Tech/MS admissions (common offer acceptance portal)." },
        { step: "3. CCMT (NIT M.Tech)", description: "Register on ccmt.nic.in for NITs, IIITs, GFTIs M.Tech admissions." },
        { step: "4. Choice Filling", description: "Fill preferred institute + specialisation. Multiple rounds of allotment." },
        { step: "5. PSU Recruitment", description: "PSUs like IOCL, NTPC, BHEL shortlist via GATE score — apply individually on their websites." },
        { step: "6. Spot Round (if applicable)", description: "Vacant seats filled via spot round at individual institutes." },
      ],
      links: [
        { label: "GATE Official", url: "https://gate.iitd.ac.in", description: "Results, score card, answer keys" },
        { label: "COAP — IIT M.Tech", url: "https://coap.iitd.ac.in", description: "Common offer acceptance portal for IIT M.Tech admissions" },
        { label: "CCMT — NIT M.Tech", url: "https://ccmt.nic.in", description: "Centralised counselling for NITs, IIITs, GFTIs" },
        { label: "PSU Recruitment via GATE", url: "https://www.gate2026.iitg.ac.in/", description: "Check individual PSU notifications for GATE-based recruitment" },
        { label: "College Predictor — Careers360", url: "https://engineering.careers360.com/gate-college-predictor", description: "GATE score-based M.Tech college prediction" },
      ],
    },
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
    webOptions: {
      process: [
        { step: "1. CAT Result", description: "Score + percentile declared on iimcat.ac.in. Sectional + overall percentile given." },
        { step: "2. IIM Shortlists", description: "Each IIM releases its own shortlist based on CAT score, academics, work ex, diversity." },
        { step: "3. WAT / PI Rounds", description: "Shortlisted candidates appear for Written Ability Test + Personal Interview at each IIM." },
        { step: "4. Final Merit List", description: "Based on CAT score, WAT, PI, academics, and diversity — each IIM releases final list." },
        { step: "5. Non-IIM Applications", description: "Apply separately to FMS, MDI, SPJIMR, XLRI (via XAT), NMAT, SNAP, CMAT colleges." },
        { step: "6. Admission Acceptance", description: "Accept offer, pay seat acceptance fee, complete admission formalities." },
      ],
      links: [
        { label: "CAT Official", url: "https://iimcat.ac.in", description: "Results, score card, official notifications" },
        { label: "IIM Admission Processes", url: "https://www.iimcat.ac.in/other-iim-admission-process", description: "Check individual IIM shortlisting criteria" },
        { label: "College Predictor — Careers360", url: "https://www.careers360.com/cat-college-predictor", description: "CAT percentile-based B-school prediction" },
        { label: "College Predictor — Shiksha", url: "https://www.shiksha.com/management/cat-college-predictor", description: "Predict MBA colleges from your CAT percentile" },
        { label: "Top MBA Colleges List", url: "https://www.shiksha.com/mba/colleges/top-mba-colleges-in-india", description: "Ranking of top B-schools in India" },
        { label: "XAT (XLRI & more)", url: "https://xatonline.in", description: "XAT exam for XLRI, XIMB, and other top B-schools" },
      ],
    },
  },
];

export const getExamById = (id: string) => exams.find((e) => e.id === id);
