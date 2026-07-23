export interface CounsellingCategory {
  id: string;
  name: string;
  reservationPercentage: number;
  description: string;
  eligibility: string;
  documents: string[];
}

export interface StateReservation {
  state: string;
  categories: CounsellingCategory[];
  domicileRules: string;
  specialReservations: string;
}

export const allIndiaCategories: CounsellingCategory[] = [
  {
    id: "General",
    name: "General (Unreserved)",
    reservationPercentage: 40.5,
    description: "Open to all candidates. No reservation.",
    eligibility: "All candidates meeting NEET eligibility criteria.",
    documents: ["NEET Score Card", "Class 10 & 12 Mark Sheets", "Identity Proof"],
  },
  {
    id: "OBC-NCL",
    name: "Other Backward Classes (Non-Creamy Layer)",
    reservationPercentage: 27,
    description: "For candidates belonging to OBC communities in the Central OBC list, with family income below ₹8 LPA.",
    eligibility: "Must have valid OBC-NCL certificate issued by competent authority.",
    documents: ["OBC-NCL Certificate (Central List)", "Income Certificate", "Caste Certificate", "NEET Score Card"],
  },
  {
    id: "SC",
    name: "Scheduled Caste",
    reservationPercentage: 15,
    description: "For candidates belonging to Scheduled Castes as per the Constitution of India.",
    eligibility: "Must have valid SC certificate.",
    documents: ["SC Certificate", "NEET Score Card", "Class 10 & 12 Mark Sheets"],
  },
  {
    id: "ST",
    name: "Scheduled Tribe",
    reservationPercentage: 7.5,
    description: "For candidates belonging to Scheduled Tribes as per the Constitution of India.",
    eligibility: "Must have valid ST certificate.",
    documents: ["ST Certificate", "NEET Score Card", "Class 10 & 12 Mark Sheets"],
  },
  {
    id: "EWS",
    name: "Economically Weaker Section",
    reservationPercentage: 10,
    description: "For candidates from economically weaker sections with family income below ₹8 LPA (unreserved category).",
    eligibility: "Must have valid EWS certificate. Not applicable for reserved category candidates.",
    documents: ["EWS Certificate", "Income Certificate", "NEET Score Card"],
  },
  {
    id: "PwD",
    name: "Persons with Disability",
    reservationPercentage: 5,
    description: "Horizontal reservation across all categories for candidates with 40% or more disability.",
    eligibility: "Must have valid disability certificate from designated medical board.",
    documents: ["Disability Certificate (40%+)", "NEET Score Card", "Medical Board Report"],
  },
];

export const stateReservations: StateReservation[] = [
  {
    state: "Telangana",
    categories: [
      { id: "BC-A", name: "Backward Class A", reservationPercentage: 7, description: "Velama community", eligibility: "Telangana domicile + valid BC-A certificate", documents: ["TS BC Certificate", "Domicile Certificate"] },
      { id: "BC-B", name: "Backward Class B", reservationPercentage: 10, description: "Reddy community", eligibility: "Telangana domicile + valid BC-B certificate", documents: ["TS BC Certificate", "Domicile Certificate"] },
      { id: "BC-C", name: "Backward Class C", reservationPercentage: 1, description: "Yadav community", eligibility: "Telangana domicile + valid BC-C certificate", documents: ["TS BC Certificate", "Domicile Certificate"] },
      { id: "BC-D", name: "Backward Class D", reservationPercentage: 7, description: "Mala community", eligibility: "Telangana domicile + valid BC-D certificate", documents: ["TS BC Certificate", "Domicile Certificate"] },
      { id: "BC-E", name: "Backward Class E", reservationPercentage: 4, description: "Scheduled Tribe (Vaddi)", eligibility: "Telangana domicile + valid BC-E certificate", documents: ["TS BC Certificate", "Domicile Certificate"] },
      { id: "EWS-TS", name: "Economically Weaker Section (Telangana)", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "Telangana domicile + valid EWS certificate", documents: ["TS EWS Certificate", "Income Certificate"] },
    ],
    domicileRules: "Candidate must have studied in Telangana for minimum 4 years in the last 7 years, or one of the parents must have been a resident of Telangana for 10 years.",
    specialReservations: "Local/Non-local quota in state counselling. 15% seats for local candidates in each university area.",
  },
  {
    state: "Andhra Pradesh",
    categories: [
      { id: "BC-A", name: "Backward Class A", reservationPercentage: 7, description: "Padmashali, etc.", eligibility: "AP domicile + valid BC-A certificate", documents: ["AP BC Certificate", "Domicile Certificate"] },
      { id: "BC-B", name: "Backward Class B", reservationPercentage: 10, description: "Reddy, etc.", eligibility: "AP domicile + valid BC-B certificate", documents: ["AP BC Certificate", "Domicile Certificate"] },
      { id: "BC-C", name: "Backward Class C", reservationPercentage: 1, description: "Yadav, etc.", eligibility: "AP domicile + valid BC-C certificate", documents: ["AP BC Certificate", "Domicile Certificate"] },
      { id: "BC-D", name: "Backward Class D", reservationPercentage: 7, description: "Mala community", eligibility: "AP domicile + valid BC-D certificate", documents: ["AP BC Certificate", "Domicile Certificate"] },
      { id: "BC-E", name: "Backward Class E", reservationPercentage: 4, description: "Scheduled Tribe (Vaddi)", eligibility: "AP domicile + valid BC-E certificate", documents: ["AP BC Certificate", "Domicile Certificate"] },
    ],
    domicileRules: "Candidate must have studied in Andhra Pradesh for minimum 4 consecutive years ending with the qualifying examination, or local status as per AP Education Act.",
    specialReservations: "Local/Non-local quota based on university area. 85% state quota seats reserved for local candidates.",
  },
  {
    state: "Maharashtra",
    categories: [
      { id: "OBC", name: "Other Backward Classes", reservationPercentage: 19, description: "Various OBC communities in Maharashtra state list", eligibility: "Maharashtra domicile + valid OBC certificate", documents: ["Maharashtra OBC Certificate", "Domicile Certificate"] },
      { id: "VJ/NT", name: "Vimukta Jati / Nomadic Tribes", reservationPercentage: 3, description: "Denotified and Nomadic Tribes", eligibility: "Valid VJ/NT certificate", documents: ["VJ/NT Certificate"] },
      { id: "SBC", name: "Special Backward Class", reservationPercentage: 2, description: "Maratha-Kunbi and related communities", eligibility: "Valid SBC certificate", documents: ["SBC Certificate"] },
      { id: "EWS-MH", name: "Economically Weaker Section", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "Maharashtra domicile + valid EWS certificate", documents: ["Maharashtra EWS Certificate", "Income Certificate"] },
    ],
    domicileRules: "Candidate must have domicile of Maharashtra. Born in Maharashtra or have resided in Maharashtra for 10+ years.",
    specialReservations: "Maratha reservation (16%) under SEBC category — subject to court orders.",
  },
  {
    state: "Karnataka",
    categories: [
      { id: "2A", name: "Category 2A", reservationPercentage: 15, description: "OBC communities in Karnataka", eligibility: "Karnataka domicile + valid Category 2A certificate", documents: ["Karnataka Caste Certificate", "Income Certificate"] },
      { id: "2B", name: "Category 2B", reservationPercentage: 4, description: "Muslim OBC communities", eligibility: "Karnataka domicile + valid Category 2B certificate", documents: ["Karnataka Caste Certificate"] },
      { id: "3A", name: "Category 3A", reservationPercentage: 5, description: "OBC communities", eligibility: "Karnataka domicile + valid Category 3A certificate", documents: ["Karnataka Caste Certificate"] },
      { id: "GMK", name: "General Merit - Kannada", reservationPercentage: 0, description: "Kannada medium candidates in general merit", eligibility: "Studied in Kannada medium", documents: ["Kannada Medium Certificate"] },
    ],
    domicileRules: "Candidate must have studied in Karnataka for minimum 7 years, or studied in Karnataka from Class 1 to Class 12.",
    specialReservations: "Hyderabad-Karnataka region reservation under Article 371J.",
  },
  {
    state: "Tamil Nadu",
    categories: [
      { id: "BC", name: "Backward Classes", reservationPercentage: 30, description: "Various BC communities in Tamil Nadu", eligibility: "Tamil Nadu domicile + valid BC certificate", documents: ["TN BC Certificate", "Domicile Certificate"] },
      { id: "MBC", name: "Most Backward Classes", reservationPercentage: 20, description: "Most Backward Communities", eligibility: "Tamil Nadu domicile + valid MBC certificate", documents: ["TN MBC Certificate", "Domicile Certificate"] },
      { id: "DNC", name: "Denotified Communities", reservationPercentage: 3, description: "Denotified Communities", eligibility: "Valid DNC certificate", documents: ["TN DNC Certificate"] },
    ],
    domicileRules: "Candidate must have studied in Tamil Nadu for minimum 5 years, or one parent must have been a resident of Tamil Nadu for 5 years.",
    specialReservations: "7.5% horizontal reservation for government school students.",
  },
  {
    state: "Delhi",
    categories: [
      { id: "EWS-DL", name: "Economically Weaker Section", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "Delhi domicile + valid EWS certificate", documents: ["Delhi EWS Certificate", "Income Certificate"] },
    ],
    domicileRules: "Candidate must have passed Class 10 and 12 from schools in Delhi, or one parent must be a resident of Delhi for 10 years.",
    specialReservations: "EWS reservation under GNCT of Delhi rules.",
  },
  {
    state: "Uttar Pradesh",
    categories: [
      { id: "OBC-UP", name: "Other Backward Classes", reservationPercentage: 27, description: "OBC communities in UP state list", eligibility: "UP domicile + valid OBC-NCL certificate", documents: ["UP OBC Certificate", "Domicile Certificate"] },
      { id: "EWS-UP", name: "Economically Weaker Section", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "UP domicile + valid EWS certificate", documents: ["UP EWS Certificate", "Income Certificate"] },
    ],
    domicileRules: "Candidate must have domicile of Uttar Pradesh. Resident for 7+ years or studied in UP for 7+ years.",
    specialReservations: "Freedom fighter quota, ex-servicemen quota.",
  },
  {
    state: "Rajasthan",
    categories: [
      { id: "OBC-RJ", name: "Other Backward Classes", reservationPercentage: 21, description: "OBC communities in Rajasthan", eligibility: "Rajasthan domicile + valid OBC-NCL certificate", documents: ["Rajasthan OBC Certificate", "Domicile Certificate"] },
      { id: "MBC-RJ", name: "More Backward Classes", reservationPercentage: 5, description: "More Backward Communities", eligibility: "Valid MBC certificate", documents: ["Rajasthan MBC Certificate"] },
      { id: "EWS-RJ", name: "Economically Weaker Section", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "Rajasthan domicile + valid EWS certificate", documents: ["Rajasthan EWS Certificate"] },
    ],
    domicileRules: "Candidate must have domicile of Rajasthan. Born in Rajasthan or studied in Rajasthan for 5+ years.",
    specialReservations: "MBC quota added recently. Special provisions for tribal areas.",
  },
  {
    state: "West Bengal",
    categories: [
      { id: "OBC-WB", name: "Other Backward Classes", reservationPercentage: 10, description: "OBC-A and OBC-B categories", eligibility: "West Bengal domicile + valid OBC certificate", documents: ["WB OBC Certificate", "Domicile Certificate"] },
      { id: "EWS-WB", name: "Economically Weaker Section", reservationPercentage: 10, description: "For unreserved candidates with income below ₹8 LPA", eligibility: "WB domicile + valid EWS certificate", documents: ["WB EWS Certificate"] },
    ],
    domicileRules: "Candidate must have been a resident of West Bengal for 10+ years.",
    specialReservations: "Tribal area reservation for ST candidates.",
  },
];

export const getCategoryById = (id: string) =>
  allIndiaCategories.find((c) => c.id === id);

export const getStateReservation = (state: string) =>
  stateReservations.find((r) => r.state === state);

export const getAllCategoriesForState = (state: string) => {
  const stateRes = getStateReservation(state);
  return [...allIndiaCategories, ...(stateRes?.categories || [])];
};
