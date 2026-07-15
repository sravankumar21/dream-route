export interface FinanceArticle {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  sections: { heading: string; content: string[] }[];
  links: { label: string; url: string }[];
}

export const financeCategories = [
  { id: "pf", name: "Provident Fund & ESI", icon: "piggy-bank" },
  { id: "itr", name: "ITR Filing", icon: "file-text" },
  { id: "tax", name: "Tax & Investing", icon: "percent" },
  { id: "insurance", name: "Insurance & Credit", icon: "shield" },
  { id: "salary", name: "Salary & Workplace", icon: "wallet" },
];

export const financeArticles: FinanceArticle[] = [
  {
    id: "epf",
    title: "Employee Provident Fund (EPF)",
    category: "pf",
    icon: "piggy-bank",
    description: "A retirement savings scheme where both employer and employee contribute 12% of basic salary every month.",
    sections: [
      {
        heading: "What is EPF?",
        content: [
          "EPF is managed by the Employees' Provident Fund Organisation (EPFO).",
          "Both you and your employer contribute 12% of your basic salary + DA each month.",
          "Your contribution goes entirely to EPF account. Employer's 12% splits: 3.67% to EPF + 8.33% to EPS (pension).",
          "Current interest rate: ~8.25% per annum (announced annually by EPFO).",
        ],
      },
      {
        heading: "How much will you save?",
        content: [
          "Example: Basic ₹30,000 → Your contribution: ₹3,600/mo, Employer: ₹3,600/mo",
          "Total monthly: ₹7,200 → ₹86,400/yr",
          "In 5 years at 8.25% interest: ~₹5.2L",
          "In 10 years: ~₹13.5L",
          "In 20 years: ~₹44L",
          "In 30 years: ~₹1.1Cr (with compounding)",
        ],
      },
      {
        heading: "When can you withdraw?",
        content: [
          "Full withdrawal: After retirement (55 years) or 2 months of unemployment.",
          "Partial withdrawal: Housing, medical emergency, marriage, education (after 7 years of service).",
          "Partial withdrawal for housing: Up to 90% of balance after 5 years.",
          "Medical: Up to 6 times of salary for treatment of self/family.",
          "Note: Early withdrawal before 5 years attracts TDS (10% if > ₹50,000).",
        ],
      },
      {
        heading: "UAN — Universal Account Number",
        content: [
          "UAN is a 12-digit number assigned to every EPF member.",
          "Link all your PF accounts to one UAN.",
          "Check balance: Missed call to 011-22901406 or EPFO portal.",
          "Download passbook: https://www.epfindia.gov.in",
          "Link Aadhaar to UAN for seamless transfers.",
        ],
      },
    ],
    links: [
      { label: "EPFO Portal", url: "https://www.epfindia.gov.in" },
      { label: "UAN Member Portal", url: "https://unifiedportal-mem.epfindia.gov.in" },
      { label: "Check PF Balance", url: "https://www.epfindia.gov.in/site_en/check_balance.php" },
    ],
  },
  {
    id: "itr-filing",
    title: "Income Tax Return (ITR) Filing",
    category: "itr",
    icon: "file-text",
    description: "Complete guide to filing your ITR — which form to use, deadlines, and step-by-step process.",
    sections: [
      {
        heading: "What is ITR?",
        content: [
          "ITR is a form filed with the Income Tax Department declaring your income, deductions, and taxes paid.",
          "Filing is mandatory if your gross income exceeds the basic exemption limit (₹3L for <60 yrs, ₹5L under new regime).",
          "Even if income is below limit, file if TDS was deducted (to claim refund).",
          "Deadline: July 31 (non-audit cases), October 31 (audit cases).",
        ],
      },
      {
        heading: "Which ITR Form?",
        content: [
          "ITR-1 (Sahaj): Salaried individuals, income up to ₹50L, one house property, agricultural income up to ₹5K.",
          "ITR-2: Individuals/HUFs with capital gains, foreign income, multiple properties, income > ₹50L.",
          "ITR-3: Business/profession income, partners in firms.",
          "ITR-4 (Sugam): Presumptive business income (Section 44AD/44ADA).",
          "Most salaried people use ITR-1 or ITR-2.",
        ],
      },
      {
        heading: "Old vs New Tax Regime",
        content: [
          "New Regime (default from FY 2023-24): Lower rates but NO major deductions (80C, 80D, HRA, etc.).",
          "Old Regime: Higher rates but allows all deductions — 80C, 80D, HRA, LTA, home loan interest.",
          "If you have ₹1.5L+ in deductions → Old regime is better.",
          "If minimal deductions → New regime is better.",
          "New regime slabs: 0-3L: Nil, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, 15L+: 30%.",
          "Old regime slabs: 0-2.5L: Nil, 2.5-5L: 5%, 5-10L: 20%, 10L+: 30%.",
        ],
      },
      {
        heading: "Step-by-Step Filing",
        content: [
          "1. Gather documents: Form 16, bank statements, investment proofs, Form 26AS.",
          "2. Check Form 26AS / AIS for TDS details (https://www.incometax.gov.in).",
          "3. Choose correct ITR form.",
          "4. Calculate total income, apply deductions, compute tax.",
          "5. File online at https://incometax.gov.in or use ClearTax/Quicko.",
          "6. Verify ITR within 30 days (e-verify via Aadhaar OTP, bank, or Demat).",
          "7. Save ITR-V acknowledgment.",
        ],
      },
    ],
    links: [
      { label: "Income Tax e-Filing Portal", url: "https://www.incometax.gov.in" },
      { label: "Form 26AS / AIS", url: "https://www.incometax.gov.in/iec/foportal/help/individual/return-preparation-5" },
      { label: "ClearTax (Easy Filing)", url: "https://www.cleartax.in" },
      { label: "Quicko (Free Filing)", url: "https://www.qucko.com" },
    ],
  },
  {
    id: "tax-savings",
    title: "Tax Saving Options (Section 80C & Beyond)",
    category: "tax",
    icon: "percent",
    description: "Legal ways to reduce your taxable income and save taxes under various sections.",
    sections: [
      {
        heading: "Section 80C — ₹1.5L Limit",
        content: [
          "PPF (Public Provident Fund): 15-year lock-in, ~7.1% tax-free returns.",
          "ELSS (Equity Linked Savings Scheme): 3-year lock-in, ~12-15% returns, mutual fund.",
          "EPF/VPF: Employee contribution to provident fund.",
          "Life Insurance Premium: Premium paid for term insurance.",
          "NPS (National Pension System): Additional ₹50K under 80CCD(1B).",
          "Home Loan Principal: Repayment of housing loan principal.",
          "Sukanya Samriddhi: For girl child, ~8.2% returns.",
          "5-year FD with banks/post office.",
        ],
      },
      {
        heading: "Section 80D — Health Insurance",
        content: [
          "Self + Family: Up to ₹25,000 deduction.",
          "Parents: Additional ₹25,000 (₹50,000 if senior citizen).",
          "Total max: ₹1L per year.",
          "Includes preventive health check-up: ₹5,000 (within overall limit).",
          "Claim for parents even if they are not dependent.",
        ],
      },
      {
        heading: "Section 24 — Home Loan Interest",
        content: [
          "Self-occupied property: Up to ₹2L deduction on interest paid.",
          "Let-out property: No limit (set off against rental income).",
          "First-time buyers: Additional ₹50K under Section 80EEA (if stamp value ≤ ₹45L).",
        ],
      },
      {
        heading: "Section 10 — HRA Exemption",
        content: [
          "HRA is exempt up to the least of: Actual HRA, 50% of salary (metro) / 40% (non-metro), Rent paid minus 10% of salary.",
          "Must pay rent and have rental receipts.",
          "If living with parents, pay rent to them and claim HRA.",
        ],
      },
      {
        heading: "Section 80E — Education Loan Interest",
        content: [
          "Full deduction on education loan interest (no upper limit).",
          "Loan for self, spouse, children, or student you are legal guardian of.",
          "Deduction starts from the year you start repaying.",
          "Available for 8 years from start of repayment.",
        ],
      },
    ],
    links: [
      { label: "Income Tax Deductions Guide", url: "https://www.incometaxindia.gov.in/charts%20%20tables/deductions.htm" },
      { label: "ELSS Funds on Groww", url: "https://groww.in/mutual-funds/category/equity-linked-savings-scheme-elss" },
      { label: "PPF Calculator", url: "https://groww.in/calculators/ppf-calculator" },
    ],
  },
  {
    id: "insurance-info",
    title: "Insurance — Types & What You Need",
    category: "insurance",
    icon: "shield",
    description: "Essential insurance types every working professional should know about.",
    sections: [
      {
        heading: "Health Insurance (Must-Have)",
        content: [
          "Cover: Minimum ₹5L health cover (RBI mandate for credit cards, but recommended ₹10L+).",
          "Individual policy: ₹10L cover costs ~₹8,000—12,000/yr (age 25-30).",
          "Family floater: Covers entire family under one policy.",
          "Super top-up: Additional ₹10-50L cover at low cost (activated after base policy limit).",
          "Critical illness rider: Covers cancer, heart attack, stroke — lump sum payout.",
          "Cashless claim: Use network hospitals — no upfront payment needed.",
        ],
      },
      {
        heading: "Term Life Insurance (Must-Have)",
        content: [
          "Pure life cover — no maturity benefit — cheapest form of life insurance.",
          "Rule of thumb: Cover = 10-15x of annual income.",
          "₹1Cr cover for 30-year-old: ~₹8,000—12,000/yr (30-year term).",
          "Buy early — premiums are lower at younger age.",
          "Recommended: HDFC Life, ICICI Pru, Max Life, Tata AIA.",
          "Avoid ULIPs and endowment plans — poor returns.",
        ],
      },
      {
        heading: "Motor Insurance (Mandatory)",
        content: [
          "Third-party insurance: Mandatory by law for all vehicles.",
          "Comprehensive insurance: Covers own damage + third-party.",
          "Two-wheeler: ~₹700—1,500/yr (third-party), ~₹2,000—4,000/yr (comprehensive).",
          "Car: ~₹2,000—4,000/yr (third-party), ~₹8,000—15,000/yr (comprehensive).",
          "NCB (No Claim Bonus): Up to 50% discount for claim-free years.",
        ],
      },
      {
        heading: "Other Insurance to Consider",
        content: [
          "Personal accident cover: 100% of sum insured for accidental death/disability — ₹200-500/yr.",
          "Home insurance: Covers structure + contents against fire, theft, natural calamities.",
          "Travel insurance: Mandatory for international trips — covers medical, baggage, cancellation.",
          "Pet insurance: Emerging in India — covers vet bills for dogs/cats.",
        ],
      },
    ],
    links: [
      { label: "PolicyBazaar (Compare Plans)", url: "https://www.policybazaar.com" },
      { label: "IRDAI (Insurance Regulator)", url: "https://www.irdai.gov.in" },
      { label: "Term Insurance Calculator", url: "https://www.policybazaar.com/life-insurance/term-insurance/calculator/" },
    ],
  },
  {
    id: "salary-slip",
    title: "Understanding Your Salary Slip",
    category: "salary",
    icon: "wallet",
    description: "Decode every component of your monthly salary slip — what's earned, what's deducted, and what you take home.",
    sections: [
      {
        heading: "Earnings (What You Get)",
        content: [
          "Basic Salary: 40-50% of CTC — fully taxable.",
          "HRA (House Rent Allowance): Up to 50% of basic (metro) / 40% (non-metro) — exempt under Section 10.",
          "Special Allowance: Taxable — varies by company.",
          "Conveyance / Transport Allowance: Up to ₹1,600/mo exempt.",
          "Medical Allowance: ₹1,250/mo exempt (with bills).",
          "Food Coupons / Sodexo: Up to ₹50/mo tax-free.",
        ],
      },
      {
        heading: "Deductions (What's Taken Out)",
        content: [
          "PF (Provident Fund): 12% of basic — both employer + employee contribution.",
          "ESI: If basic < ₹21,000/mo — 0.75% employee + 3.25% employer.",
          "Professional Tax: ₹200/mo (max ₹2,500/yr) — varies by state.",
          "TDS (Tax Deducted at Source): Based on declared investments under Section 192.",
          "Income Tax: Calculated on annual income — deducted monthly via TDS.",
        ],
      },
      {
        heading: "CTC vs Take-Home",
        content: [
          "CTC (Cost to Company) = Basic + HRA + Allowances + Employer PF + Gratuity + Insurance.",
          "Take-home = Basic + HRA + Allowances - PF - ESI - Prof Tax - TDS.",
          "Rule of thumb: Take-home ≈ 65-75% of CTC (depends on declarations).",
          "Example: ₹10L CTC → ₹6.5-7.5L take-home annually → ₹54,000-62,500/mo.",
        ],
      },
      {
        heading: "Tips to Maximize Take-Home",
        content: [
          "Declare investments early in the financial year (Section 80C, 80D).",
          "Opt for HRA exemption — pay rent to parents (with rental agreement).",
          "Use food coupons (Sodexo/Zeta) for grocery/food — tax-free.",
          "Claim LTA for domestic travel (2 trips in a block of 4 years).",
          "Invest in NPS for additional ₹50K deduction under 80CCD(1B).",
          "Use flexi-ben plans if employer offers them.",
        ],
      },
    ],
    links: [
      { label: "Salary Calculator", url: "https://groww.in/calculators/salary-calculator" },
      { label: "Income Tax Calculator", url: "https://www.incometaxindia.gov.in/Pages/tools/tax-calculator.aspx" },
      { label: "HRA Calculator", url: "https://groww.in/calculators/hra-calculator" },
    ],
  },
  {
    id: "gratuity",
    title: "Gratuity — What You're Owed",
    category: "salary",
    icon: "wallet",
    description: "A lump-sum payment from your employer when you leave after 5+ years of continuous service.",
    sections: [
      {
        heading: "What is Gratuity?",
        content: [
          "Gratuity is a lump-sum payment given by employer to employee for long service.",
          "Mandatory under Payment of Gratuity Act, 1972 for establishments with 10+ employees.",
          "You're eligible after 5 years of continuous service with the same employer.",
          "Government employees: Eligible after 5 years (relaxation for disability cases).",
        ],
      },
      {
        heading: "How is it Calculated?",
        content: [
          "Formula: Last Drawn Salary × 15/26 × Number of Years of Service",
          "Last Drawn Salary = Basic + DA (dearness allowance)",
          "15/26 = 15 days out of 26 working days in a month",
          "Example: Basic ₹40,000 + DA ₹0, 7 years service",
          "Gratuity = 40,000 × 15/26 × 7 = ₹1,61,538",
          "For companies not covered under the Act: Employer may pay gratuity voluntarily (check your offer letter).",
        ],
      },
      {
        heading: "Tax on Gratuity",
        content: [
          "Government employees: Fully exempt from tax.",
          "Private sector: Exempt up to ₹20,00,000 (lifetime limit across employers).",
          "If gratuity exceeds ₹20L, the excess is taxed as per your income slab.",
          "If not covered under Gratuity Act: Exempt up to ₹10,00,000 or half month salary × years (whichever is less).",
        ],
      },
      {
        heading: "When Do You Get It?",
        content: [
          "Resignation after 5 years: Full gratuity payable.",
          "Retirement: Full gratuity payable.",
          "Death or disability: Gratuity payable to nominee/legal heir (no 5-year requirement).",
          "Termination due to accident/misconduct: Gratuity may be forfeited (partial or full).",
          "Withdrawal before 5 years: Not eligible (except death/disability).",
        ],
      },
    ],
    links: [
      { label: "Gratuity Calculator", url: "https://groww.in/calculators/gratuity-calculator" },
      { label: "Payment of Gratuity Act", url: "https://labour.gov.in/gratuity" },
    ],
  },
  {
    id: "leave-policy",
    title: "Leave Policies — What You're Entitled To",
    category: "salary",
    icon: "calendar",
    description: "Types of leave every Indian employee should know — earned, casual, sick, maternity, and more.",
    sections: [
      {
        heading: "Types of Leave",
        content: [
          "Earned Leave (EL) / Privilege Leave: 15-30 days/year (varies by company). Accumulates, can be encashed.",
          "Casual Leave (CL): 7-12 days/year. For short personal work. Doesn't carry forward.",
          "Sick Leave (SL): 7-12 days/year. For medical reasons. Some companies require medical certificate.",
          "Compensatory Off (Comp-Off): Earned by working on holidays/weekends. Use within 30-90 days.",
          "Maternity Leave: 26 weeks (paid) for first 2 children. 12 weeks for 3rd child. Applicable for 12 months continuous service.",
          "Paternity Leave: 5-15 days (company policy — no central law mandate for private sector).",
          "Bereavement Leave: 3-5 days (company policy).",
        ],
      },
      {
        heading: "Important Rules",
        content: [
          "Leave encashment: Some companies allow cash payment for unused EL at resignation/retirement.",
          "Leave without pay (LWP): If you exhaust all leaves, further absence is LWP — salary deducted.",
          "Leave travel allowance (LTA): Claim travel expenses for domestic travel (2 trips in 4 years). Tax-exempt under Section 10(5).",
          "Holidays: National holidays (Republic Day, Independence Day, Gandhi Jayanti) are mandatory paid holidays.",
          "Privilege leave in advance: Some companies allow taking EL in advance (check policy).",
        ],
      },
      {
        heading: "Work From Home (WFH)",
        content: [
          "No central law mandates WFH — it's entirely company policy.",
          "Most companies allow 1-3 WFH days per week (hybrid model).",
          "Full remote roles: Negotiate during offer stage.",
          "WFH may affect HRA claim if you move to a different city.",
        ],
      },
    ],
    links: [
      { label: "Maternity Benefit Act", url: "https://labour.gov.in/maternity-benefit-act" },
      { label: "Leave Policy Template", url: "https://www.kredhr.com/blog/leave-policy-india" },
    ],
  },
  {
    id: "credit-score",
    title: "Credit Score & Credit Cards",
    category: "insurance",
    icon: "shield",
    description: "CIBIL score, how credit cards work, and what to watch out for.",
    sections: [
      {
        heading: "What is Credit Score?",
        content: [
          "Credit score is a 3-digit number (300-900) that reflects your creditworthiness.",
          "CIBIL is the most widely used credit bureau in India (TransUnion CIBIL).",
          "Other bureaus: Experian, CRIF High Mark, Equifax.",
          "Score above 750 is considered good. Below 650 is risky for lenders.",
          "Your score is based on: repayment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), new inquiries (10%).",
        ],
      },
      {
        heading: "How to Check",
        content: [
          "Free once a year: https://www.cibil.com/free-credit-report",
          "Also available on: Bank apps, Paytm, PhonePe, CRED, Bajaj Finserv.",
          "Check regularly — no impact on your score (soft inquiry).",
          "Hard inquiry (by lender for loan approval) temporarily reduces score by 5-10 points.",
        ],
      },
      {
        heading: "Credit Cards — Dos and Don'ts",
        content: [
          "DO: Pay full bill before due date — never pay just minimum amount.",
          "DO: Keep credit utilization below 30% (ideally below 10%).",
          "DO: Use cards for regular expenses to build credit history.",
          "DON'T: Pay minimum amount — interest of 36-42% p.a. kicks in on outstanding balance.",
          "DON'T: Withdraw cash from credit card — 2.5-3% fee + interest from day 1.",
          "DON'T: Apply for multiple cards at once — each application is a hard inquiry.",
          "DON'T: Max out your credit limit — hurts credit utilization ratio.",
        ],
      },
      {
        heading: "Best Starter Cards",
        content: [
          "HDFC Millennia / Flipkart: Good for beginners, cashback on online spends.",
          "ICICI Amazon Pay: 5% back on Amazon, no annual fee.",
          "SBI SimplyCLICK: Online shopping cashback.",
          "OneCard: Metal card, good app, 1% fuel surcharge waiver.",
          "Apply when you have 6+ months salary account history with the bank.",
        ],
      },
    ],
    links: [
      { label: "Check CIBIL Score (Free)", url: "https://www.cibil.com/free-credit-report" },
      { label: "CRED (Track Bills)", url: "https://cred.club" },
      { label: "Credit Score Explained", url: "https://www.bankbazaar.com/credit-card/credit-score.html" },
    ],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund & Investing Basics",
    category: "tax",
    icon: "piggy-bank",
    description: "How much to save, where to keep it, and how to start investing with a salary.",
    sections: [
      {
        heading: "Emergency Fund",
        content: [
          "Rule: Save 6-12 months of monthly expenses (not salary — expenses).",
          "If monthly expenses = ₹30,000 → emergency fund = ₹1.8L to ₹3.6L.",
          "Where to keep: High-yield savings account or liquid mutual fund.",
          "NOT in FD (locked), NOT in stocks (volatile), NOT in real estate (illiquid).",
          "Build gradually: Start with ₹10,000, add ₹5,000/month until you hit the target.",
        ],
      },
      {
        heading: "Where to Invest (Order of Priority)",
        content: [
          "1. Emergency fund first — don't invest before this is ready.",
          "2. EPF/VPF — employer contributes, tax-free returns (~8.25%).",
          "3. PPF — 15-year lock-in, tax-free 7.1% returns, ₹1.5L/yr limit.",
          "4. ELSS mutual funds — 3-year lock-in, ~12-15% returns, tax-saving under 80C.",
          "5. NPS — additional ₹50K deduction under 80CCD(1B), long-term retirement.",
          "6. Index funds (Nifty 50 / Sensex) — low cost, market returns, no stock picking.",
          "7. Stocks — only after you understand fundamentals, start with small amounts.",
        ],
      },
      {
        heading: "SIP — Systematic Investment Plan",
        content: [
          "SIP = investing a fixed amount monthly in mutual funds.",
          "Start with ₹500-1,000/month. Increase by 10% every year.",
          "Benefits: Rupee cost averaging (buy more when market low, less when high).",
          "Best platforms: Groww, Zerodha Coin, Kuvera, Paytm Money.",
          "Don't stop SIP during market dips — that's when you get more units.",
        ],
      },
      {
        heading: "Common Mistakes",
        content: [
          "Investing without emergency fund = risky.",
          "Putting all money in one stock = gambling.",
          "Stopping SIP during market crash = locking in losses.",
          "Chasing 'hot tips' from social media = dangerous.",
          "Not reviewing portfolio annually = may underperform.",
          "Ignoring insurance before investing = financial risk.",
        ],
      },
    ],
    links: [
      { label: "Groww (Start SIP)", url: "https://groww.in" },
      { label: "Zerodha (Stocks + MF)", url: "https://zerodha.com" },
      { label: "PPF Calculator", url: "https://groww.in/calculators/ppf-calculator" },
      { label: "NPS Calculator", url: "https://www.pfrda.org.in" },
    ],
  },
  {
    id: "esi",
    title: "ESI — Employee State Insurance",
    category: "pf",
    icon: "shield",
    description: "Health insurance provided by the government for employees earning up to ₹21,000/month.",
    sections: [
      {
        heading: "What is ESI?",
        content: [
          "ESI is a self-financing social security scheme for workers earning ≤ ₹21,000/month.",
          "Managed by Employees' State Insurance Corporation (ESIC).",
          "Provides medical, sickness, maternity, disability, and dependent benefits.",
          "Applicable in factories/establishments with 10+ employees.",
        ],
      },
      {
        heading: "Contribution",
        content: [
          "Employee contribution: 0.75% of gross salary.",
          "Employer contribution: 3.25% of gross salary.",
          "Total: 4% of gross salary.",
          "Example: ₹15,000 salary → Employee: ₹112.50, Employer: ₹487.50.",
          "If salary > ₹21,000: ESI contribution stops (you're out of ESI cover).",
        ],
      },
      {
        heading: "Benefits",
        content: [
          "Medical: Free treatment at ESI hospitals/dispensaries for self + family.",
          "Sickness: 70% of wages for up to 91 days in two consecutive benefit periods.",
          "Maternity: 100% of wages for 26 weeks (same as Maternity Benefit Act).",
          "Disablement: 90% of wages during temporary disablement, 100% for permanent.",
          "Dependents: 75% of wages to dependents in case of employee's death due to employment injury.",
          "Confinement: ₹2,000 for insured women in case of miscarriage or medical termination.",
        ],
      },
      {
        heading: "How to Check & Use",
        content: [
          "Get ESI number (IP number) from your employer.",
          "Check status: https://www.esic.gov.in → Insured Person Portal.",
          "Download e-Pehchan card from ESIC portal.",
          "Visit ESI hospital/dispensary with IP card for free treatment.",
          "For sickness benefit: Apply through employer with medical certificate.",
        ],
      },
    ],
    links: [
      { label: "ESIC Portal", url: "https://www.esic.gov.in" },
      { label: "Check ESI Status", url: "https://www.esic.gov.in/employee" },
      { label: "ESI Hospital Locator", url: "https://www.esic.gov.in/hospital" },
    ],
  },
  {
    id: "switching-jobs",
    title: "Switching Jobs — What to Know",
    category: "salary",
    icon: "briefcase",
    description: "PF transfer, experience letter, relieving letter, and how to handle the transition smoothly.",
    sections: [
      {
        heading: "PF Transfer",
        content: [
          "When you switch, your PF account stays with EPFO (don't withdraw unless desperate).",
          "Transfer PF online: Login to UAN portal → One Member One EPF Account → Submit request.",
          "New employer needs to verify the transfer request.",
          "If you withdraw before 5 years: TDS deducted (10% if > ₹50,000).",
          "After 5 years: Tax-free withdrawal.",
        ],
      },
      {
        heading: "Experience & Relieving Letters",
        content: [
          "Experience letter: Certificate of your role, duration, and responsibilities at the company.",
          "Relieving letter: Confirms you've been relieved from duties (important for joining new company).",
          "Both are issued by HR on your last working day or within 1-2 weeks.",
          "If company refuses: Send legal notice or file complaint with labour commissioner.",
          "Keep soft copies — you may need them years later for background verification.",
        ],
      },
      {
        heading: "Notice Period",
        content: [
          "Most companies have 30-90 day notice period.",
          "You can: (a) serve full notice, (b) buy out (pay salary in lieu of notice), (c) negotiate early release.",
          "Buy-out: If notice is 60 days and you leave in 30 days, you pay 30 days' basic salary.",
          "If you abscond (leave without notice): Company may hold experience letter, mark as termination.",
          "Best practice: Serve notice, overlap new join date carefully.",
        ],
      },
      {
        heading: "Background Verification",
        content: [
          "New employer will verify: Employment history, education, criminal record, address.",
          "They may contact your previous HR/manager — leave on good terms.",
          "Keep all offer letters, payslips, and relieving letters safe.",
          "Any discrepancy = offer may be revoked (even after joining).",
          "Gap in employment: Be honest — most companies are fine with 1-3 month gaps.",
        ],
      },
      {
        heading: "Negotiating Your New Offer",
        content: [
          "Never reveal current salary (illegal to ask in some states, but still happens).",
          "Negotiate on: Base salary, joining bonus, retention bonus, stock options, variable pay.",
          "Ask about: PF contribution (basic vs CTC), gratuity, insurance, leave policy.",
          "Counter-offer: Ask for 20-30% higher than expected, settle in the middle.",
          "Get everything in writing — verbal promises mean nothing.",
        ],
      },
    ],
    links: [
      { label: "UAN Portal (PF Transfer)", url: "https://unifiedportal-mem.epfindia.gov.in" },
      { label: "PF Transfer Process", url: "https://www.epfindia.gov.in/site_en/transfer.php" },
    ],
  },
];

export const getFinanceArticleById = (id: string) => financeArticles.find((a) => a.id === id);
