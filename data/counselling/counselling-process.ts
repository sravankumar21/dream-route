export interface CounsellingStep {
  id: string;
  step: number;
  title: string;
  description: string;
  details: string[];
  importantNotes: string[];
  officialLink?: string;
}

export interface CounsellingRound {
  id: string;
  name: string;
  description: string;
  timeline: string;
  keyActions: string[];
  rules: string[];
}

export interface CounsellingProcess {
  id: string;
  name: string;
  fullName: string;
  authority: string;
  quota: string;
  description: string;
  steps: CounsellingStep[];
  rounds: CounsellingRound[];
  faqs: { question: string; answer: string }[];
  officialWebsite: string;
}

export const mccCounselling: CounsellingProcess = {
  id: "mcc-aiq",
  name: "MCC AIQ Counselling",
  fullName: "Medical Counselling Committee — All India Quota Counselling",
  authority: "Medical Counselling Committee (MCC), Directorate General of Health Services (DGHS), Ministry of Health & Family Welfare, Government of India",
  quota: "15% All India Quota (AIQ) seats in all government medical colleges + 100% seats in deemed universities + central institutes (AIIMS, JIPMER, etc.)",
  description: "The MCC conducts counselling for 15% of seats in all government medical colleges across India (All India Quota), 100% seats in deemed universities, and seats in central institutes like AIIMS and JIPMER. This process is separate from state counselling which handles the remaining 85% state quota seats.",
  steps: [
    {
      id: "registration",
      step: 1,
      title: "Registration on MCC Portal",
      description: "Register on mcc.nic.in with your NEET Roll Number, score, and personal details. Pay the counselling fee (₹1,000 for General, ₹500 for SC/ST/PwD).",
      details: [
        "Visit mcc.nic.in and click on 'New Registration'",
        "Enter your NEET Roll Number, Application Number, and Date of Birth",
        "Verify your details — name, score, rank, category",
        "Pay counselling fee online (non-refundable)",
        "Print your registration confirmation",
      ],
      importantNotes: [
        "Registration is mandatory for each round — you must re-register for Round 2 if you didn't participate in Round 1",
        "Ensure your category certificate is valid and uploaded",
        "Keep your login credentials safe — you'll need them for choice filling",
      ],
      officialLink: "https://mcc.nic.in",
    },
    {
      id: "choice-filling",
      step: 2,
      title: "Choice Filling & Locking",
      description: "Select and rank your preferred colleges/courses in order of preference. You can add unlimited choices. Lock your choices before the deadline.",
      details: [
        "Log in to your MCC account during the choice filling window",
        "Browse available colleges and courses",
        "Add colleges to your preference list — drag to reorder",
        "You can add as many choices as you want (recommend 30+ choices)",
        "Fill choices from your dream college down to safe options",
        "Lock your choices before the deadline — choices cannot be changed after locking",
        "If you don't lock, your filled choices will be automatically locked at the deadline",
      ],
      importantNotes: [
        "Choice filling is the MOST IMPORTANT step — your seat depends entirely on your preferences",
        "Always include 'safe' choices at the bottom of your list",
        "You can unlock and re-lock choices unlimited times before the deadline",
        "After locking, NO changes are allowed",
        "Fill maximum choices — more choices = higher chance of getting a seat",
      ],
    },
    {
      id: "seat-allotment",
      step: 3,
      title: "Seat Allotment Result",
      description: "MCC allots seats based on your rank, choices, category, and availability. Results are published on mcc.nic.in.",
      details: [
        "MCC uses a computerized algorithm to allot seats",
        "The algorithm considers: your NEET rank, your locked choices, category reservation, seat availability",
        "Higher rank = better college (generally)",
        "Allotment is based on your first available choice that has vacant seats",
        "Results are published on the MCC portal on the announced date",
        "You can check your allotment status by logging in",
      ],
      importantNotes: [
        "If you get your first choice, you cannot upgrade in later rounds (you keep that seat)",
        "If you get a lower choice, you can accept AND opt for upgrade in Round 2",
        "If you don't get any seat, you're automatically eligible for Round 2",
        "Allotment is final for that round — but you can choose to accept, upgrade, or exit",
      ],
    },
    {
      id: "accept-upgrade-exit",
      step: 4,
      title: "Accept / Upgrade / Exit Decision",
      description: "After allotment, you have three options: Accept the seat (freeze), Accept and Upgrade (float), or Exit the counselling.",
      details: [
        "FREEZE (Accept): You accept the allotted seat. Report to the college. You will NOT participate in further rounds.",
        "FLOAT (Accept & Upgrade): You accept the current seat but want to try for a better choice in Round 2. If you get a better seat in Round 2, the old seat is vacated.",
        "EXIT: You don't want the allotted seat. You forfeit your security deposit and will NOT participate in further rounds.",
      ],
      importantNotes: [
        "FLOAT is the most common choice — allows you to keep your current seat while trying for better options",
        "If you FREEZE, you cannot change your mind later",
        "If you EXIT, you lose your security deposit (₹10,000 for General, ₹5,000 for SC/ST/PwD)",
        "Report to the allotted college within the specified timeframe or your seat may be cancelled",
      ],
    },
    {
      id: "reporting",
      step: 5,
      title: "Report to Allotted College",
      description: "Physically report to the allotted college with original documents and pay the admission fee within the deadline.",
      details: [
        "Carry ALL original documents (mark sheets, certificates, ID proof, photos)",
        "Pay the college admission fee (varies by college — ₹1,000 to ₹15,000 for govt colleges)",
        "Complete the admission formalities at the college",
        "Your documents will be verified by the college",
        "If you chose FLOAT, you must still report — your seat is confirmed until upgraded",
      ],
      importantNotes: [
        "Failure to report = seat cancellation + security deposit forfeiture",
        "Original documents are retained by the college for the duration of the course",
        "Get admission receipt and confirmation letter",
        "If upgraded in Round 2, your documents will be transferred to the new college",
      ],
    },
    {
      id: "round2",
      step: 6,
      title: "Round 2 — Upgrade & Fresh Allotment",
      description: "Round 2 includes: upgraded seats from float candidates, fresh seats from vacated/forfeited positions, and remaining unfilled seats.",
      details: [
        "Seats vacated by candidates who chose FLOAT and got better colleges are now available",
        "Seats vacated by candidates who didn't report are available",
        "Fresh candidates who didn't participate in Round 1 can register and participate",
        "If you chose FLOAT, your allotment is automatically considered for upgrade",
        "New choice filling is NOT required for FLOAT candidates (same choices used)",
        "New candidates must fill fresh choices",
      ],
      importantNotes: [
        "Round 2 allotment is FINAL for candidates who got upgraded",
        "If you don't get upgraded in Round 2, you keep your Round 1 seat",
        "If you get upgraded, the old seat is immediately vacated and available for others",
      ],
    },
    {
      id: "mop-up",
      step: 7,
      title: "Mop-Up Round",
      description: "Final round for remaining vacant seats. Stray vacancy counselling may follow after mop-up.",
      details: [
        "Only seats that remain vacant after Round 2 are available",
        "Candidates who didn't get any seat in Round 1 & 2 can participate",
        "Candidates who exited counselling CANNOT participate",
        "Fresh registration required for mop-up",
        "Choice filling is required",
        "Allotment in mop-up is FINAL — no further upgrades",
      ],
      importantNotes: [
        "Mop-up round has very limited seats",
        "Colleges report final vacant seats after mop-up",
        "Stray vacancy round may be conducted by individual colleges",
        "Security deposit is forfeited if you don't report after mop-up allotment",
      ],
    },
  ],
  rounds: [
    {
      id: "round1",
      name: "Round 1",
      description: "The first round of counselling. All registered candidates participate.",
      timeline: "Typically starts 2-3 weeks after NEET results. Choice filling window: 5-7 days. Results: 1-2 days after choice filling closes.",
      keyActions: ["Register", "Fill choices", "Lock choices", "Check allotment", "Accept/Float/Exit"],
      rules: [
        "All registered candidates are eligible",
        "Choice filling is mandatory",
        "After allotment: Freeze, Float, or Exit",
        "If you don't get any seat, you're auto-eligible for Round 2",
      ],
    },
    {
      id: "round2",
      name: "Round 2",
      description: "Second round includes upgraded seats and fresh vacancies.",
      timeline: "1-2 weeks after Round 1 reporting completes.",
      keyActions: ["Re-register (if not participated in Round 1)", "Choice filling for new candidates", "Auto-upgrade for float candidates", "Check new allotment", "Report to college"],
      rules: [
        "FLOAT candidates are automatically considered for upgrade",
        "New candidates must register and fill choices",
        "Allotment is final for upgraded candidates",
        "Document verification may be required",
      ],
    },
    {
      id: "mopUp",
      name: "Mop-Up Round",
      description: "Final round for remaining vacant seats.",
      timeline: "1-2 weeks after Round 2 reporting.",
      keyActions: ["Fresh registration", "Choice filling", "Final allotment", "Report to college"],
      rules: [
        "Only vacant seats after Round 2 are available",
        "Fresh registration required",
        "Allotment is absolutely final",
        "Security deposit forfeited for non-reporting",
      ],
    },
    {
      id: "stray",
      name: "Stray Vacancy Round",
      description: "Conducted by individual colleges for any remaining seats after mop-up.",
      timeline: "After mop-up results.",
      keyActions: ["College-level counselling", "Direct admission based on NEET rank"],
      rules: [
        "Conducted by individual colleges, not MCC",
        "Only for deemed universities and some private colleges",
        "Government colleges may not have stray rounds",
        "Fees may differ from regular counselling fees",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between AIQ and State Quota?",
      answer: "15% of seats in all government medical colleges are reserved for AIQ (All India Quota) — filled by MCC based on all-India rank. The remaining 85% are state quota — filled by individual state counselling authorities based on state rank and domicile.",
    },
    {
      question: "Can I participate in both AIQ and State Counselling?",
      answer: "Yes! You can participate in both simultaneously. However, if you get a seat in AIQ and choose to accept it, you may need to withdraw from state counselling. Each state has its own rules on this.",
    },
    {
      question: "What happens if I don't report to the allotted college?",
      answer: "Your seat is cancelled, and your security deposit is forfeited. The seat becomes available for the next round. You may still be eligible for subsequent rounds depending on the counselling authority's rules.",
    },
    {
      question: "How does FLOAT (upgrade) work exactly?",
      answer: "When you choose FLOAT, you accept your current seat but express willingness to be considered for better choices in subsequent rounds. If you get a better seat, the old seat is vacated and the new one is allotted. If you don't get upgraded, you keep your current seat.",
    },
    {
      question: "Is there any reservation for EWS in medical colleges?",
      answer: "Yes, 10% reservation for Economically Weaker Sections (family income below ₹8 LPA) in unreserved category. This is applicable in both AIQ and state quota seats.",
    },
    {
      question: "What documents do I need for counselling?",
      answer: "NEET Score Card, Class 10 & 12 Mark Sheets, Category Certificate (if applicable), Domicile Certificate, ID Proof (Aadhaar), Passport-size photographs, Transfer Certificate, Migration Certificate, and Medical Fitness Certificate.",
    },
    {
      question: "Can I change my choices after locking?",
      answer: "No. Once choices are locked, they cannot be changed for that round. You can unlock and re-lock before the deadline, but after the deadline, choices are final.",
    },
    {
      question: "What is the security deposit?",
      answer: "₹10,000 for General/OBC candidates, ₹5,000 for SC/ST/PwD candidates. This is refundable if you complete the admission process. It is forfeited if you exit counselling or fail to report.",
    },
  ],
  officialWebsite: "https://mcc.nic.in",
};

export const getCounsellingProcess = (id: string) =>
  id === "mcc-aiq" ? mccCounselling : null;

export const howSeatAllocationWorks = {
  title: "How Seat Allocation Actually Works",
  sections: [
    {
      title: "The Algorithm",
      content: "MCC uses a computerized allotment algorithm. For each seat, it considers all eligible candidates in rank order. The candidate with the best rank gets the first preference among available seats. This continues until all seats are filled or all candidates are processed.",
    },
    {
      title: "What Determines Your Seat",
      content: "Your NEET All India Rank is the primary factor. Within the same rank range, category reservation determines which pool of seats you compete for. Your choice filling order determines which specific college/course you get among available options.",
    },
    {
      title: "How Vacancies Move",
      content: "When a student upgrades (FLOAT), their previous seat becomes vacant. This vacancy is immediately available for candidates in the next round. The vacancy moves from the upgraded student down to the next eligible candidate in rank order.",
    },
    {
      title: "Why Closing Ranks Change",
      content: "Closing ranks change because: (1) Total applicants change each year, (2) Number of seats may increase or decrease, (3) Category-wise competition varies, (4) Student preference patterns shift, (5) Vacancies from upgrades affect availability.",
    },
    {
      title: "The Ripple Effect",
      content: "One student's decision affects multiple others. When Student A upgrades from College X to College Y, College X gets a vacant seat. Student B (next in rank) may then get College X. If Student B also upgrades, the ripple continues. This is why later rounds often see significant movement.",
    },
  ],
};
