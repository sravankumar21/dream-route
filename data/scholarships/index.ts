export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  benefits: string[];
  applicationLink: string;
  description: string;
}

export const scholarshipCategories = [
  { id: "central", name: "Central Government", icon: "landmark" },
  { id: "state", name: "State Government", icon: "building-2" },
  { id: "minority", name: "Minority & SC/ST/OBC", icon: "users" },
  { id: "merit", name: "Merit-based", icon: "award" },
  { id: "need", name: "Need-based", icon: "heart" },
  { id: "women", name: "Women & Special", icon: "star" },
];

export const scholarships: Scholarship[] = [
  {
    id: "pmss",
    name: "Post-Matric Scholarship (PMS)",
    provider: "Ministry of Social Justice & Empowerment",
    category: "minority",
    amount: "₹1,000 — ₹5,000/yr + maintenance allowance",
    deadline: "Rolling (apply through state portal)",
    eligibility: [
      "SC/ST/OBC/Minority students",
      "Family income < ₹2.5L/yr (SC/ST) or < ₹1.5L/yr (OBC)",
      "Post-matriculation courses (Class 11 onwards)",
      "Must be studying in recognized institution",
    ],
    benefits: [
      "Full tuition fee for govt institutions",
      "Maintenance allowance: ₹550 — ₹1,200/mo",
      "Book grant: ₹1,000 — ₹2,000/yr",
      "Non-refundable charges covered",
    ],
    applicationLink: "https://scholarships.gov.in",
    description: "Central sector scheme for SC/ST/OBC students pursuing post-matric education. Covers tuition, maintenance, and book grants.",
  },
  {
    id: "nsp-pre",
    name: "Pre-Matric Scholarship",
    provider: "Ministry of Minority Affairs",
    category: "minority",
    amount: "₹500 — ₹1,500/yr",
    deadline: "Rolling (apply through state portal)",
    eligibility: [
      "Students from Muslim, Christian, Sikh, Buddhist, Jain, Parsi communities",
      "Family income < ₹2L/yr",
      "Studying in Class 1—10 in recognized school",
      "Minimum 50% marks in previous exam",
    ],
    benefits: [
      "Admission fee: ₹500/yr",
      "Tuition fee: ₹500 — ₹1,500/yr",
      "Maintenance allowance: ₹100 — ₹600/mo",
    ],
    applicationLink: "https://scholarships.gov.in",
    description: "For minority community students from Class 1 to 10. Encourages continuation of education at school level.",
  },
  {
    id: "aicte-scholarship",
    name: "AICTE Pragati Scholarship",
    provider: "AICTE",
    category: "women",
    amount: "₹50,000/yr (tuition + ₹2,000/mo contingency)",
    deadline: "October — November (tentative)",
    eligibility: [
      "Girl students admitted to AICTE-approved institutions",
      "Pursuing technical education (B.Tech, B.E., B.Arch, MBA, MCA)",
      "Family income < ₹8L/yr",
      "Only child / 2 sisters max per family",
    ],
    benefits: [
      "Tuition fee: up to ₹30,000/yr or actual",
      "Contingency: ₹2,000/mo for 10 months",
      "Total: ₹50,000/yr",
    ],
    applicationLink: "https://scholarships.gov.in",
    description: "Empowering girl students in technical education. Covers tuition and provides monthly contingency for expenses.",
  },
  {
    id: "telangana-bridges",
    name: "Telangana eKalyana / Ambedkar Overseas Vidya Nidhi",
    provider: "Telangana Social Welfare Dept",
    category: "state",
    amount: "₹10L — ₹20L for overseas studies",
    deadline: "Varies (check telangana.gov.in)",
    eligibility: [
      "SC/ST/BC/EBC students from Telangana",
      "Admitted to foreign universities for PG/PhD",
      "Family income < ₹5L/yr",
      "GRE/GMAT/GATE score required",
    ],
    benefits: [
      "Tuition fee: up to ₹10L",
      "Living expenses: ₹5L/yr",
      "Travel: ₹1L one-time",
      "Visa fee reimbursement",
    ],
    applicationLink: "https://telangana.gov.in",
    description: "Supports Telangana students from reserved categories to pursue higher education abroad.",
  },
  {
    id: "ap-ambedkar",
    name: "AP Ambedkar Foundation Scholarship",
    provider: "AP Social Welfare Dept",
    category: "state",
    amount: "₹20,000 — ₹1,00,000/yr",
    deadline: "Varies (check ap.gov.in)",
    eligibility: [
      "SC/ST/BC students from Andhra Pradesh",
      "Studying in recognized institutions",
      "Family income < ₹3L/yr",
      "Minimum 60% attendance",
    ],
    benefits: [
      "Tuition fee reimbursement",
      "Maintenance: ₹3,000 — ₹5,000/mo",
      "Book allowance: ₹5,000/yr",
    ],
    applicationLink: "https://ap.gov.in",
    description: "Government of AP scholarship for reserved category students in higher education.",
  },
  {
    id: "inspira",
    name: "INSPIRE Scholarship (SHE)",
    provider: "Department of Science & Technology",
    category: "merit",
    amount: "₹80,000/yr (5 years)",
    deadline: "October — November (through INSPIRE portal)",
    eligibility: [
      "Top 1% in Class 12 board exams OR",
      "JEE Main rank 1—10,000 or NEET rank 1—10,000",
      "Pursuing B.Sc/B.S/Int.M.S in natural sciences",
      "Age < 22 years",
    ],
    benefits: [
      "₹60,000/yr mentorship contingency",
      "₹20,000/yr summer research project",
      "Total: ₹80,000/yr for 5 years",
      "Access to INSPIRE alumni network",
    ],
    applicationLink: "https://www.online-inspire.gov.in",
    description: "India's largest scholarship for S&T students. Identifies top talent and nurtures them with funding and mentorship.",
  },
  {
    id: "kvp",
    name: "KVPY (Kishore Vaigyanik Protsahan Yojana)",
    provider: "Department of Science & Technology",
    category: "merit",
    amount: "₹84,000 — ₹1,12,000/yr",
    deadline: "September — October (tentative)",
    eligibility: [
      "Class 11 or 12 students with science subjects",
      "KVPY aptitude test qualifier",
      "Minimum 60% in Class 10 maths & science",
    ],
    benefits: [
      "Annual contingency: ₹20,000 — ₹28,000",
      "Monthly fellowship: ₹5,000 — ₹7,000",
      "Total: ₹84,000 — ₹1,12,000/yr",
      "Summer camp at IISc/IISERs",
    ],
    applicationLink: "https://www.kvpy.iisc.ac.in",
    description: "Fellowship for bright science students. Provides financial support and research exposure from Class 11 onwards.",
  },
  {
    id: "cbse-single-girl",
    name: "CBSE Single Girl Child Scholarship",
    provider: "CBSE",
    category: "women",
    amount: "₹6,000/yr (5 years)",
    deadline: "November — December (through CBSE portal)",
    eligibility: [
      "Single girl child in family",
      "Passed Class 10 with 60%+ marks",
      "Studying in Class 11—12 in CBSE school",
      "Tuition fee < ₹1,500/mo",
    ],
    benefits: [
      "₹500/mo = ₹6,000/yr",
      "Renewable for Class 11 and 12",
    ],
    applicationLink: "https://cbse.gov.in",
    description: "Encourages education of single girl child. Merit-based scholarship from CBSE.",
  },
  {
    id: "tatkal",
    name: "Central Sector Scheme of Scholarship",
    provider: "Ministry of Education",
    category: "merit",
    amount: "₹10,000 — ₹20,000/yr",
    deadline: "October — December (through NSP)",
    eligibility: [
      "Top 20% in Class 12 board exams",
      "Family income < ₹8L/yr",
      "Pursuing regular degree courses",
      "Not receiving any other scholarship",
    ],
    benefits: [
      "UG: ₹10,000/yr (3 years)",
      "PG: ₹20,000/yr (2 years)",
      "Professional: ₹20,000/yr (remaining years)",
    ],
    applicationLink: "https://scholarships.gov.in",
    description: "Merit-cum-means scholarship for top board exam performers from economically weaker sections.",
  },
  {
    id: "hdfc-edu",
    name: "HDFC Bank Educational Crisis Scholarship",
    provider: "HDFC Bank Parivartan",
    category: "need",
    amount: "₹10,000 — ₹75,000",
    deadline: "Rolling (apply through Buddy4Study)",
    eligibility: [
      "Students facing financial crisis (death of breadwinner, accident, etc.)",
      "Studying Class 1 — Post-graduation",
      "Family income < ₹3L/yr",
      "Verified through NGO/institution",
    ],
    benefits: [
      "School: up to ₹10,000",
      "Undergraduate: up to ₹25,000",
      "Postgraduate: up to ₹75,000",
    ],
    applicationLink: "https://www.buddy4study.com/scholarship/hdfc-bank-educational-crisis-scholarship",
    description: "Emergency scholarship for students who have faced sudden financial crisis affecting their education.",
  },
  {
    id: "fair-lovely-career",
    name: "Glow & Lovely Careers Scholarship",
    provider: "Hindustan Unilever",
    category: "women",
    amount: "₹2,50,000",
    deadline: "Rolling (apply through website)",
    eligibility: [
      "Women aged 15—30 years",
      "Pursuing or planning higher education",
      "No income restriction",
      "Indian citizens",
    ],
    benefits: [
      "One-time grant of ₹2,50,000",
      "Mentorship from industry leaders",
      "Career guidance sessions",
    ],
    applicationLink: "https://www.glowandlovelycareers.in",
    description: "Empowering women through education funding and mentorship. For women aged 15-30 pursuing higher education.",
  },
  {
    id: "fair-lovely-career",
    name: "Begum Hazrat Mahal National Scholarship",
    provider: "Maulana Azad Education Foundation",
    category: "minority",
    amount: "₹5,000 — ₹12,000/yr",
    deadline: "September — October (through NSP)",
    eligibility: [
      "Girl students from Muslim community",
      "Studying in Class 9—12",
      "Family income < ₹2L/yr",
      "Minimum 50% marks in previous exam",
    ],
    benefits: [
      "Class 9—10: ₹5,000/yr",
      "Class 11—12: ₹6,000/yr",
    ],
    applicationLink: "https://scholarships.gov.in",
    description: "National scholarship for Muslim girls from Class 9 to 12. Promotes education among minority girls.",
  },
];

export const getScholarshipsByCategory = (category: string) =>
  scholarships.filter((s) => s.category === category);
