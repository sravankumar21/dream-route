export interface WorkplaceSection {
  heading: string;
  content: string[];
}

export interface WorkplaceLink {
  label: string;
  url: string;
}

export interface WorkplaceArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: WorkplaceSection[];
  links: WorkplaceLink[];
}

export interface WorkplaceCategory {
  id: string;
  name: string;
}

export const workplaceCategories: WorkplaceCategory[] = [
  { id: "salary", name: "Salary & Negotiation" },
  { id: "tax", name: "Tax & ITR" },
  { id: "insurance", name: "Insurance" },
  { id: "investing", name: "Investing" },
  { id: "rights", name: "Worker Rights" },
];

export const workplaceArticles: WorkplaceArticle[] = [
  {
    id: "salary-negotiation",
    title: "How to negotiate your first salary",
    description: "Never accept the first offer. Here's how to negotiate effectively.",
    category: "salary",
    sections: [
      {
        heading: "Before the negotiation",
        content: [
          "Research the market rate for your role on Glassdoor, AmbitionBox, or LinkedIn Salary.",
          "Know your minimum acceptable salary (walk-away number).",
          "Always negotiate — most companies expect it.",
          "Never give a number first. Let them make the offer.",
        ],
      },
      {
        heading: "During the negotiation",
        content: [
          "Express enthusiasm for the role first, then discuss compensation.",
          "Use phrases like: 'Based on my research, I was expecting something in the range of...'",
          "Negotiate beyond base salary — signing bonus, stock options, learning budget, remote work.",
          "Get the final offer in writing before resigning from your current job.",
        ],
      },
      {
        heading: "Common mistakes",
        content: [
          "Lying about your current salary (many companies verify).",
          "Negotiating too aggressively — be polite but firm.",
          "Not having a counter-offer ready.",
          "Accepting immediately without thinking.",
        ],
      },
    ],
    links: [
      { label: "Glassdoor India Salary Explorer", url: "https://www.glassdoor.co.in/Salaries/index.htm" },
      { label: "AmbitionBox Salary Explorer", url: "https://www.ambitionbox.com/salaries" },
    ],
  },
  {
    id: "pf-esi",
    title: "PF and ESI — what's deducted from your salary",
    description: "Understand EPF, EPS, and ESI — the mandatory deductions on your payslip.",
    category: "salary",
    sections: [
      {
        heading: "EPF (Employee Provident Fund)",
        content: [
          "Both you and your employer contribute 12% of basic salary to EPF.",
          "Your contribution: 12% of basic. Employer's 12% splits into EPF (3.67%) and EPS (8.33%).",
          "EPF earns ~8.15% interest (tax-free if withdrawn after 5 years).",
          "You can check your balance on the UMANG app or EPFO portal.",
        ],
      },
      {
        heading: "ESI (Employee State Insurance)",
        content: [
          "Applicable if your gross salary is ≤ ₹21,000/month.",
          "Employee contributes 0.75%, employer contributes 3.25%.",
          "Covers medical, maternity, disability, and dependent benefits.",
          "You get an ESI card — use it at ESI hospitals.",
        ],
      },
      {
        heading: "What you can do",
        content: [
          "Voluntarily increase EPF contribution via VPF (Voluntary Provident Fund).",
          "Don't withdraw PF prematurely — compound interest works in your favor.",
          "If switching jobs, transfer PF using the UAN portal.",
        ],
      },
    ],
    links: [
      { label: "EPFO Member Portal", url: "https://unifiedportal-mem.epfindia.gov.in/" },
      { label: "UMANG App (Check PF Balance)", url: "https://web.umang.gov.in/" },
    ],
  },
  {
    id: "itrfiling",
    title: "Income Tax Return (ITR) filing — a beginner's guide",
    description: "When to file, which form to use, and how to save tax legally.",
    category: "tax",
    sections: [
      {
        heading: "Do you need to file ITR?",
        content: [
          "Mandatory if your gross income exceeds ₹3,00,000 (new regime) or ₹2,50,000 (old regime).",
          "Required if you have foreign income or assets.",
          "Recommended even below the limit — helps with visa applications and loan approvals.",
          "Deadline: Usually July 31 for individuals.",
        ],
      },
      {
        heading: "Old vs New Tax Regime",
        content: [
          "New regime: Lower tax rates but no deductions (default from FY 2023-24).",
          "Old regime: Higher rates but allows 80C, 80D, HRA, LTA deductions.",
          "Choose based on your deductions — if you claim ₹1.5L+ in deductions, old regime may be better.",
          "Use the income tax department's comparison tool to decide.",
        ],
      },
      {
        heading: "Tax-saving sections",
        content: [
          "Section 80C: Up to ₹1.5L — PPF, ELSS, LIC, EPF, NSC, home loan principal.",
          "Section 80D: Up to ₹25,000 — health insurance premium (₹50,000 for parents).",
          "Section 24: Up to ₹2L — home loan interest.",
          "Section 80E: Full deduction — education loan interest (no upper limit, 8 years).",
        ],
      },
    ],
    links: [
      { label: "Income Tax E-Filing Portal", url: "https://www.incometax.gov.in/" },
      { label: "Tax Regime Comparison Calculator", url: "https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-702" },
    ],
  },
  {
    id: "health-insurance",
    title: "Health insurance — why you need it from day one",
    description: "A single hospitalization can wipe out your savings. Here's what to buy.",
    category: "insurance",
    sections: [
      {
        heading: "Why health insurance is non-negotiable",
        content: [
          "A 3-day hospital stay in a metro city can cost ₹50,000 — ₹3,00,000+.",
          "Employer insurance is not enough — it ends when you leave the job.",
          "Buy early — premiums are lower when you're young and healthy.",
          "A ₹10-15 lakh cover is the minimum for a single person.",
        ],
      },
      {
        heading: "What to look for",
        content: [
          "Sum insured: ₹10L minimum, ₹15-25L ideal for metro cities.",
          "Room rent: No capping preferred (or at least single private room).",
          "Pre-existing disease waiting period: Usually 2-4 years.",
          "No-claim bonus: Increases sum insured by 10-50% per claim-free year.",
          "Cashless network: Check if your preferred hospitals are covered.",
        ],
      },
      {
        heading: "Best plans (as of 2024)",
        content: [
          "HDFC Ergo Optima Restore — good balance of price and features.",
          "Star Health Young Health — for people under 30.",
          "Niva Bupa ReAssure — no room rent capping.",
          "Always compare on PolicyBazaar or Ditto Insurance before buying.",
        ],
      },
    ],
    links: [
      { label: "Ditto Insurance — Compare Plans", url: "https://www.dittoinsurance.com/" },
      { label: "PolicyBazaar — Health Insurance", url: "https://www.policybazaar.com/health-insurance/" },
    ],
  },
  {
    id: "investing-basics",
    title: "Investing for freshers — start with ₹500/month",
    description: "You don't need lakhs to start investing. Start small, stay consistent.",
    category: "investing",
    sections: [
      {
        heading: "The order of investing",
        content: [
          "Step 1: Emergency fund — 3-6 months of expenses in a savings account or liquid fund.",
          "Step 2: Health insurance — buy before you invest.",
          "Step 3: Start SIP in index funds (Nifty 50 or Nifty Next 50).",
          "Step 4: Increase SIP as your salary grows.",
        ],
      },
      {
        heading: "Where to invest",
        content: [
          "Index funds (SIP): Lowest cost, beats most active funds over 10+ years.",
          "PPF: 15-year lock-in, ~7.1% tax-free returns — great for long-term.",
          "ELSS: Tax-saving mutual funds, 3-year lock-in, equity returns.",
          "Fixed deposits: Safe but low returns (6-7%). Good for very short-term goals.",
        ],
      },
      {
        heading: "Common mistakes",
        content: [
          "Trying to time the market — just invest regularly via SIP.",
          "Putting all money in FDs — inflation eats your returns.",
          "Following tips from social media — stick to index funds.",
          "Stopping SIP during market crashes — that's when you should invest more.",
        ],
      },
    ],
    links: [
      { label: "Groww — Start SIP", url: "https://groww.in/" },
      { label: "Zerodha — Varsity (Free Investing Course)", url: "https://zerodha.com/varsity/" },
    ],
  },
  {
    id: "credit-score",
    title: "Credit score — what it is and why it matters",
    description: "Your credit score affects your loan interest rates, rentals, and even job prospects.",
    category: "salary",
    sections: [
      {
        heading: "What is a credit score?",
        content: [
          "A 3-digit number (300-900) that represents your creditworthiness.",
          "CIBIL is the most used credit bureau in India (TransUnion).",
          "Score above 750 is considered good — gets you lower interest rates.",
          "Score is based on: payment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), inquiries (10%).",
        ],
      },
      {
        heading: "How to check for free",
        content: [
          "CIBIL offers one free report per year at cibil.com.",
          "Check your score on Paytm, PhonePe, or BankBazaar for free.",
          "Don't pay for CIBIL reports — multiple free options exist.",
        ],
      },
      {
        heading: "How to improve your score",
        content: [
          "Pay credit card bills on time — never miss a payment.",
          "Keep credit utilization below 30% (ideally below 10%).",
          "Don't close old credit cards — they build credit history length.",
          "Don't apply for multiple loans/cards in a short period.",
        ],
      },
    ],
    links: [
      { label: "CIBIL — Free Annual Report", url: "https://www.cibil.com/free-cibil-score" },
    ],
  },
  {
    id: "labour-rights",
    title: "Your rights as an employee in India",
    description: "PF, gratuity, maternity leave, sexual harassment — know your legal rights.",
    category: "rights",
    sections: [
      {
        heading: "Maternity Benefit Act",
        content: [
          "26 weeks paid maternity leave for the first two children.",
          "12 weeks for third child onwards.",
          "Work from home option can be offered after maternity leave.",
          "No termination during pregnancy — it's illegal.",
        ],
      },
      {
        heading: "Payment of Gratuity Act",
        content: [
          "Applicable if you've worked for 5+ years at the same company.",
          "Gratuity = (Last drawn salary × 15 × years of service) / 26.",
          "Maximum exempt from tax: ₹20,00,000.",
          "Company must pay within 30 days of resignation.",
        ],
      },
      {
        heading: "Sexual Harassment (POSH Act)",
        content: [
          "Every company with 10+ employees must have an Internal Complaints Committee (ICC).",
          "You can file a complaint within 3 months of the incident.",
          "The company is legally bound to act — non-compliance can lead to fines.",
          "Anonymous complaints are also accepted in some companies.",
        ],
      },
      {
        heading: "Shops and Establishments Act",
        content: [
          "Regulates working hours, holidays, overtime, and leave for private employees.",
          "Maximum 9 hours/day, 48 hours/week.",
          "Overtime must be paid at double the normal rate.",
          "Earned leave: 15-21 days per year (varies by state).",
        ],
      },
    ],
    links: [
      { label: "Ministry of Labour — Employee Rights", url: "https://labour.gov.in/" },
      { label: "V-Know — Indian Labour Laws Explained", url: "https://v-know.com/" },
    ],
  },
];
