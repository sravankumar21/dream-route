import { medicalColleges, type MedicalCollege } from "@/data/counselling/colleges";
import {
  closingRanks,
  getClosingRankTrend,
  getSeatMatrix,
} from "@/data/counselling/historical";

export type ProbabilityLevel = "high" | "medium" | "low";

export interface CollegeProbability {
  college: MedicalCollege;
  level: ProbabilityLevel;
  score: number;
  closingRank2025: number;
  rankGap: number;
  trend: "increasing" | "stable" | "decreasing";
  trendDescription: string;
  reasons: string[];
  availableSeats: number;
  category: string;
  quota: "aiq" | "state";
  round: string;
}

export interface StudentProfile {
  rank: number;
  score: number;
  category: string;
  state: string;
  gender: "male" | "female" | "other";
  domicile: string;
  preferredCourse: "MBBS" | "BDS" | "both";
  budget: number;
  collegePreference: "government" | "private" | "deemed" | "any";
  preferredStates: string[];
}

export interface AllocationExplanation {
  studentRank: number;
  collegeName: string;
  closingRank: number;
  rankGap: number;
  totalSeats: number;
  categorySeats: number;
  category: string;
  round: string;
  explanation: string;
  details: string[];
  possibleInLaterRounds: boolean;
  laterRoundAnalysis: string;
}

const calculateTrend = (
  collegeId: string,
  category: string,
  quota: "aiq" | "state"
): { trend: "increasing" | "stable" | "decreasing"; description: string; changePercent: number } => {
  const trendData = getClosingRankTrend(collegeId, category, quota);
  if (trendData.length < 2) {
    return { trend: "stable", description: "Insufficient historical data to determine trend.", changePercent: 0 };
  }

  const latest = trendData[trendData.length - 1];
  const previous = trendData[trendData.length - 2];
  const changePercent = ((latest.closingRank - previous.closingRank) / previous.closingRank) * 100;

  if (changePercent > 5) {
    return {
      trend: "increasing",
      description: `Closing rank increased by ${Math.abs(changePercent).toFixed(1)}% from ${previous.year} to ${latest.year}. Competition is easing slightly.`,
      changePercent,
    };
  } else if (changePercent < -5) {
    return {
      trend: "decreasing",
      description: `Closing rank decreased by ${Math.abs(changePercent).toFixed(1)}% from ${previous.year} to ${latest.year}. Competition is increasing.`,
      changePercent,
    };
  }
  return {
    trend: "stable",
    description: `Closing rank has been relatively stable between ${previous.year} and ${latest.year}.`,
    changePercent,
  };
};

const getClosingRank = (
  collegeId: string,
  category: string,
  quota: "aiq" | "state",
  round: string = "round1"
): number => {
  const entry = closingRanks.find(
    (r) =>
      r.collegeId === collegeId &&
      r.category === category &&
      r.year === 2025 &&
      r.round === round &&
      r.quota === quota
  );
  if (entry) return entry.closingRank;

  const fallbackEntry = closingRanks.find(
    (r) =>
      r.collegeId === collegeId &&
      r.category === category &&
      r.year === 2025 &&
      r.quota === quota
  );
  return fallbackEntry?.closingRank ?? Infinity;
};

const calculateScore = (
  rank: number,
  closingRank: number,
  trend: "increasing" | "stable" | "decreasing",
  availableSeats: number
): number => {
  if (closingRank === Infinity) return 0;

  const rankRatio = rank / closingRank;

  let baseScore: number;
  if (rankRatio <= 0.5) {
    baseScore = 95;
  } else if (rankRatio <= 0.7) {
    baseScore = 85 + (0.7 - rankRatio) * 33.33;
  } else if (rankRatio <= 0.85) {
    baseScore = 70 + (0.85 - rankRatio) * 100;
  } else if (rankRatio <= 1.0) {
    baseScore = 50 + (1.0 - rankRatio) * 133.33;
  } else if (rankRatio <= 1.15) {
    baseScore = 30 + (1.15 - rankRatio) * 133.33;
  } else if (rankRatio <= 1.3) {
    baseScore = 15 + (1.3 - rankRatio) * 100;
  } else {
    baseScore = Math.max(0, 15 - (rankRatio - 1.3) * 30);
  }

  let trendModifier = 0;
  if (trend === "increasing") trendModifier = 5;
  else if (trend === "decreasing") trendModifier = -5;

  let seatModifier = 0;
  if (availableSeats > 200) seatModifier = 3;
  else if (availableSeats > 100) seatModifier = 2;
  else if (availableSeats > 50) seatModifier = 1;

  return Math.min(100, Math.max(0, baseScore + trendModifier + seatModifier));
};

const getLevel = (score: number): ProbabilityLevel => {
  if (score >= 65) return "high";
  if (score >= 35) return "medium";
  return "low";
};

const buildReasons = (
  rank: number,
  closingRank: number,
  score: number,
  trend: ReturnType<typeof calculateTrend>,
  availableSeats: number,
  category: string,
  collegeType: string
): string[] => {
  const reasons: string[] = [];
  const rankGap = closingRank - rank;

  if (closingRank === Infinity) {
    reasons.push("No historical closing rank data available for this college/category combination.");
    return reasons;
  }

  if (score >= 65) {
    reasons.push(`Your rank (${rank.toLocaleString()}) is ${Math.abs(rankGap).toLocaleString()} positions ${rankGap > 0 ? "above" : "below"} the 2025 closing rank (${closingRank.toLocaleString()}).`);
    if (rankGap > 500) {
      reasons.push("You have a strong buffer — historically, students with your rank range have consistently secured seats here.");
    }
  } else if (score >= 35) {
    reasons.push(`Your rank (${rank.toLocaleString()}) is ${Math.abs(rankGap).toLocaleString()} positions ${rankGap > 0 ? "above" : "below"} the 2025 closing rank (${closingRank.toLocaleString()}).`);
    reasons.push("Your rank is near the borderline. Allotment depends on seat vacancies, category reservation, and competition in your category.");
  } else {
    reasons.push(`Your rank (${rank.toLocaleString()}) is ${Math.abs(rankGap).toLocaleString()} positions below the 2025 closing rank (${closingRank.toLocaleString()}).`);
    reasons.push("Getting a seat at this college is unlikely based on historical data, but vacancies in later rounds could create opportunities.");
  }

  if (trend.trend === "increasing") {
    reasons.push(`Closing rank has been trending upward — competition may be slightly lower this year.`);
  } else if (trend.trend === "decreasing") {
    reasons.push(`Closing rank has been trending downward — competition is increasing year-over-year.`);
  }

  if (availableSeats > 0) {
    reasons.push(`${availableSeats} seats available in your category/quota combination.`);
  } else {
    reasons.push("No seats currently available in your specific category/quota. Consider other categories or quotas.");
  }

  if (category !== "General") {
    reasons.push(`${category} category reservation gives you a competitive advantage — closing ranks are typically higher for reserved categories.`);
  }

  if (collegeType === "government") {
    reasons.push("Government colleges have the most competitive closing ranks but offer the best education-to-cost ratio.");
  } else if (collegeType === "private") {
    reasons.push("Private colleges generally have higher closing ranks, making them accessible at moderate ranks.");
  } else if (collegeType === "deemed") {
    reasons.push("Deemed universities have the highest closing ranks but typically charge significantly higher fees.");
  }

  return reasons;
};

export function calculateProbability(
  rank: number,
  score: number,
  college: MedicalCollege,
  category: string,
  state: string,
  quota: "aiq" | "state",
  round: string = "round1"
): CollegeProbability {
  const closingRank2025 = getClosingRank(college.id, category, quota, round);
  const trend = calculateTrend(college.id, category, quota);
  const seatMatrix = getSeatMatrix(college.id, 2025);
  const categorySeat = seatMatrix.find(
    (s) => s.category === category && s.quota === quota
  );
  const availableSeats = categorySeat ? categorySeat.vacant : Math.round(college.totalSeats * 0.15);
  const rankGap = closingRank2025 - rank;
  const scoreValue = calculateScore(rank, closingRank2025, trend.trend, availableSeats);
  const level = getLevel(scoreValue);
  const reasons = buildReasons(rank, closingRank2025, scoreValue, trend, availableSeats, category, college.type);

  return {
    college,
    level,
    score: Math.round(scoreValue),
    closingRank2025,
    rankGap,
    trend: trend.trend,
    trendDescription: trend.description,
    reasons,
    availableSeats,
    category,
    quota,
    round,
  };
}

export function getEligibleColleges(
  profile: StudentProfile,
  round: string = "round1"
): CollegeProbability[] {
  let filteredColleges = [...medicalColleges];

  if (profile.collegePreference !== "any") {
    filteredColleges = filteredColleges.filter((c) => c.type === profile.collegePreference);
  }

  if (profile.preferredStates.length > 0) {
    filteredColleges = filteredColleges.filter(
      (c) => profile.preferredStates.includes(c.state) || c.type === "deemed"
    );
  }

  if (profile.preferredCourse !== "both") {
    filteredColleges = filteredColleges.filter((c) => c.courses.includes(profile.preferredCourse as "MBBS" | "BDS"));
  }

  if (profile.budget > 0) {
    filteredColleges = filteredColleges.filter(
      (c) => c.feesRange.min <= profile.budget || c.type === "government"
    );
  }

  return filteredColleges
    .map((college) => {
      const collegeQuota: "aiq" | "state" =
        college.state === profile.state && college.type !== "deemed" ? "state" : "aiq";

      return calculateProbability(
        profile.rank,
        profile.score,
        college,
        profile.category,
        profile.state,
        collegeQuota,
        round
      );
    })
    .sort((a, b) => b.score - a.score);
}

export function explainAllocation(
  rank: number,
  collegeId: string,
  category: string,
  quota: "aiq" | "state",
  round: string = "round1"
): AllocationExplanation {
  const college = medicalColleges.find((c) => c.id === collegeId);
  if (!college) {
    return {
      studentRank: rank,
      collegeName: "Unknown College",
      closingRank: 0,
      rankGap: 0,
      totalSeats: 0,
      categorySeats: 0,
      category,
      round,
      explanation: "College not found in our database.",
      details: [],
      possibleInLaterRounds: false,
      laterRoundAnalysis: "",
    };
  }

  const closingRank = getClosingRank(collegeId, category, quota, round);
  const rankGap = closingRank - rank;
  const seatMatrix = getSeatMatrix(collegeId, 2025);
  const categorySeat = seatMatrix.find(
    (s) => s.category === category && s.quota === quota
  );
  const totalSeats = college.totalSeats;
  const categorySeats = categorySeat ? categorySeat.totalSeats : Math.round(totalSeats * 0.15);
  const availableSeats = categorySeat ? categorySeat.vacant : 0;

  const details: string[] = [];
  let explanation: string;
  let possibleInLaterRounds = false;
  let laterRoundAnalysis = "";

  if (closingRank === Infinity) {
    explanation = `No closing rank data available for ${college.name} in ${category} category (${quota.toUpperCase()} quota) for ${round}. This may be a new college or the data is not yet available.`;
    details.push("Check official MCC/state counselling portal for the latest data.");
  } else if (rankGap > 0) {
    explanation = `Your rank (${rank.toLocaleString()}) is ${rankGap.toLocaleString()} positions above the closing rank (${closingRank.toLocaleString()}) for ${college.name} in Round ${round}. Based on historical data, you have a strong chance of getting this seat.`;
    details.push(`Closing rank for ${category} category (${quota.toUpperCase()}): ${closingRank.toLocaleString()}`);
    details.push(`Your rank is ${((rankGap / closingRank) * 100).toFixed(1)}% better than the closing rank.`);
    if (availableSeats > 0) {
      details.push(`${availableSeats} seats are currently available in this category/quota.`);
    }
    details.push("However, actual allotment depends on your choice filling order and competition from other candidates.");
  } else if (rankGap >= -500) {
    explanation = `Your rank (${rank.toLocaleString()}) is ${Math.abs(rankGap).toLocaleString()} positions below the closing rank (${closingRank.toLocaleString()}) for ${college.name}. This is close to the borderline.`;
    details.push(`Closing rank for ${category} category (${quota.toUpperCase()}): ${closingRank.toLocaleString()}`);
    details.push(`You are ${Math.abs(rankGap).toLocaleString()} ranks below — this is within the typical fluctuation range.`);
    possibleInLaterRounds = true;
    laterRoundAnalysis = "Closing ranks typically increase by 5-15% in Round 2 due to upgrades and vacancies. You may have a chance in Round 2 or Mop-Up if vacancies emerge.";
  } else {
    explanation = `Your rank (${rank.toLocaleString()}) is ${Math.abs(rankGap).toLocaleString()} positions below the closing rank (${closingRank.toLocaleString()}) for ${college.name}. Getting a seat here is unlikely in the current round.`;
    details.push(`Closing rank for ${category} category (${quota.toUpperCase()}): ${closingRank.toLocaleString()}`);
    details.push(`You would need the closing rank to increase by ${((Math.abs(rankGap) / closingRank) * 100).toFixed(1)}% to have a chance.`);
    possibleInLaterRounds = Math.abs(rankGap) < closingRank * 0.3;
    if (possibleInLaterRounds) {
      laterRoundAnalysis = "While unlikely in Round 1, significant vacancies in later rounds (especially Mop-Up) could bring the effective closing rank closer to your rank. Consider this college as a stretch option in your choice filling.";
    } else {
      laterRoundAnalysis = "The rank gap is too large for later rounds to realistically close. Focus on colleges with closing ranks closer to your rank range.";
    }
  }

  if (availableSeats > 0) {
    details.push(`Current vacant seats: ${availableSeats}`);
  }

  const closingRankRound2 = getClosingRank(collegeId, category, quota, "round2");
  if (closingRankRound2 !== Infinity && closingRankRound2 !== closingRank) {
    details.push(`Round 2 closing rank: ${closingRankRound2.toLocaleString()} (${closingRankRound2 > closingRank ? "increased" : "decreased"} by ${Math.abs(closingRankRound2 - closingRank).toLocaleString()})`);
  }

  return {
    studentRank: rank,
    collegeName: college.name,
    closingRank,
    rankGap,
    totalSeats,
    categorySeats,
    category,
    round,
    explanation,
    details,
    possibleInLaterRounds,
    laterRoundAnalysis,
  };
}

export function getProbabilityColor(level: ProbabilityLevel): string {
  switch (level) {
    case "high":
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "medium":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "low":
      return "text-red-600 bg-red-50 border-red-200";
  }
}

export function getProbabilityLabel(level: ProbabilityLevel): string {
  switch (level) {
    case "high":
      return "High Probability";
    case "medium":
      return "Possible";
    case "low":
      return "Low Probability";
  }
}

export function getTrendIcon(trend: "increasing" | "stable" | "decreasing"): string {
  switch (trend) {
    case "increasing":
      return "↗";
    case "stable":
      return "→";
    case "decreasing":
      return "↘";
  }
}
