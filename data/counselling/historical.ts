export interface ClosingRankEntry {
  collegeId: string;
  year: number;
  round: "round1" | "round2" | "mopUp" | "stray";
  category: string;
  quota: "aiq" | "state";
  closingRank: number;
  seats: number;
  source: "estimated" | "estimated";
}

export interface SeatMatrix {
  collegeId: string;
  year: number;
  category: string;
  quota: "aiq" | "state";
  totalSeats: number;
  occupied: number;
  vacant: number;
  source: "estimated" | "estimated";
}

export interface SeatMovement {
  collegeId: string;
  year: number;
  fromRound: string;
  toRound: string;
  seatsVacated: number;
  seatsFilled: number;
  category: string;
  reason: "upgrade" | "rejection" | "non-reporting" | "withdrawal" | "other";
  source: "estimated" | "estimated";
}

export const closingRanks: ClosingRankEntry[] = [
  // AIIMS Delhi — the gold standard
  { collegeId: "dl-central-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 55, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 65, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "mopUp", category: "General", quota: "aiq", closingRank: 80, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round1", category: "OBC-NCL", quota: "aiq", closingRank: 180, seats: 25, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round2", category: "OBC-NCL", quota: "aiq", closingRank: 210, seats: 25, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round1", category: "SC", quota: "aiq", closingRank: 1200, seats: 15, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round2", category: "SC", quota: "aiq", closingRank: 1400, seats: 15, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round1", category: "ST", quota: "aiq", closingRank: 3500, seats: 8, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round2", category: "ST", quota: "aiq", closingRank: 4000, seats: 8, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round1", category: "EWS", quota: "aiq", closingRank: 120, seats: 9, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, round: "round2", category: "EWS", quota: "aiq", closingRank: 150, seats: 9, source: "estimated" },

  { collegeId: "dl-central-001", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 52, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2024, round: "round2", category: "General", quota: "aiq", closingRank: 62, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2024, round: "round1", category: "OBC-NCL", quota: "aiq", closingRank: 175, seats: 25, source: "estimated" },
  { collegeId: "dl-central-001", year: 2024, round: "round1", category: "SC", quota: "aiq", closingRank: 1150, seats: 15, source: "estimated" },
  { collegeId: "dl-central-001", year: 2024, round: "round1", category: "ST", quota: "aiq", closingRank: 3400, seats: 8, source: "estimated" },
  { collegeId: "dl-central-001", year: 2024, round: "round1", category: "EWS", quota: "aiq", closingRank: 110, seats: 9, source: "estimated" },

  { collegeId: "dl-central-001", year: 2023, round: "round1", category: "General", quota: "aiq", closingRank: 48, seats: 37, source: "estimated" },
  { collegeId: "dl-central-001", year: 2023, round: "round1", category: "OBC-NCL", quota: "aiq", closingRank: 165, seats: 25, source: "estimated" },
  { collegeId: "dl-central-001", year: 2023, round: "round1", category: "SC", quota: "aiq", closingRank: 1100, seats: 15, source: "estimated" },
  { collegeId: "dl-central-001", year: 2023, round: "round1", category: "ST", quota: "aiq", closingRank: 3200, seats: 8, source: "estimated" },

  // LHMC Delhi
  { collegeId: "dl-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2200, seats: 30, source: "estimated" },
  { collegeId: "dl-govt-medical-002", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 2600, seats: 30, source: "estimated" },
  { collegeId: "dl-govt-medical-002", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 2100, seats: 30, source: "estimated" },
  { collegeId: "dl-govt-medical-002", year: 2023, round: "round1", category: "General", quota: "aiq", closingRank: 2000, seats: 30, source: "estimated" },

  // VMMC Delhi
  { collegeId: "dl-govt-medical-003", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 1800, seats: 22, source: "estimated" },
  { collegeId: "dl-govt-medical-003", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 2100, seats: 22, source: "estimated" },
  { collegeId: "dl-govt-medical-003", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 1700, seats: 22, source: "estimated" },

  // MAMC Delhi (State Quota)
  { collegeId: "dl-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 120, seats: 212, source: "estimated" },
  { collegeId: "dl-govt-medical-001", year: 2025, round: "round2", category: "General", quota: "state", closingRank: 150, seats: 212, source: "estimated" },
  { collegeId: "dl-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 110, seats: 212, source: "estimated" },

  // Seth GS Medical College (KEM) — Maharashtra
  { collegeId: "mh-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 800, seats: 37, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 950, seats: 37, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, round: "round1", category: "OBC-NCL", quota: "aiq", closingRank: 3200, seats: 25, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, round: "round1", category: "SC", quota: "aiq", closingRank: 12000, seats: 15, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, round: "round1", category: "ST", quota: "aiq", closingRank: 28000, seats: 8, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 750, seats: 37, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2023, round: "round1", category: "General", quota: "aiq", closingRank: 700, seats: 37, source: "estimated" },

  // BJMC Pune
  { collegeId: "mh-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 3500, seats: 30, source: "estimated" },
  { collegeId: "mh-govt-medical-002", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 4200, seats: 30, source: "estimated" },
  { collegeId: "mh-govt-medical-002", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 3200, seats: 30, source: "estimated" },

  // Grant Medical College
  { collegeId: "mh-govt-medical-003", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 4000, seats: 30, source: "estimated" },
  { collegeId: "mh-govt-medical-003", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 3800, seats: 30, source: "estimated" },

  // Osmania Medical College — Telangana
  { collegeId: "ts-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 1500, seats: 37, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2025, round: "round2", category: "General", quota: "aiq", closingRank: 1800, seats: 37, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 2500, seats: 212, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2025, round: "round2", category: "General", quota: "state", closingRank: 3000, seats: 212, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "aiq", closingRank: 1400, seats: 37, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 2300, seats: 212, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2023, round: "round1", category: "General", quota: "state", closingRank: 2100, seats: 212, source: "estimated" },

  // Gandhi Medical College
  { collegeId: "ts-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 4500, seats: 30, source: "estimated" },
  { collegeId: "ts-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 5500, seats: 170, source: "estimated" },
  { collegeId: "ts-govt-medical-002", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 5200, seats: 170, source: "estimated" },

  // Kakatiya Medical College
  { collegeId: "ts-govt-medical-003", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 7000, seats: 170, source: "estimated" },
  { collegeId: "ts-govt-medical-003", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 6500, seats: 170, source: "estimated" },

  // Andhra Medical College
  { collegeId: "ap-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2000, seats: 37, source: "estimated" },
  { collegeId: "ap-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3500, seats: 212, source: "estimated" },
  { collegeId: "ap-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 3200, seats: 212, source: "estimated" },

  // Siddhartha Medical College
  { collegeId: "ap-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 6000, seats: 170, source: "estimated" },
  { collegeId: "ap-govt-medical-002", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 5600, seats: 170, source: "estimated" },

  // Guntur Medical College
  { collegeId: "ap-govt-medical-003", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 5000, seats: 170, source: "estimated" },
  { collegeId: "ap-govt-medical-003", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 4700, seats: 170, source: "estimated" },

  // Bangalore Medical College
  { collegeId: "ka-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 1200, seats: 37, source: "estimated" },
  { collegeId: "ka-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 1800, seats: 212, source: "estimated" },
  { collegeId: "ka-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 1700, seats: 212, source: "estimated" },

  // Mysore Medical College
  { collegeId: "ka-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 4000, seats: 170, source: "estimated" },

  // Madras Medical College
  { collegeId: "tn-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 900, seats: 37, source: "estimated" },
  { collegeId: "tn-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 1500, seats: 212, source: "estimated" },
  { collegeId: "tn-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 1400, seats: 212, source: "estimated" },

  // Stanley Medical College
  { collegeId: "tn-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3000, seats: 170, source: "estimated" },

  // KGMU Lucknow
  { collegeId: "up-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 1800, seats: 37, source: "estimated" },
  { collegeId: "up-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3000, seats: 212, source: "estimated" },
  { collegeId: "up-govt-medical-001", year: 2024, round: "round1", category: "General", quota: "state", closingRank: 2800, seats: 212, source: "estimated" },

  // BHU Varanasi
  { collegeId: "up-govt-medical-002", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2500, seats: 15, source: "estimated" },

  // Medical College Kolkata
  { collegeId: "wb-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 3000, seats: 37, source: "estimated" },
  { collegeId: "wb-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 4500, seats: 212, source: "estimated" },

  // SMS Jaipur
  { collegeId: "rj-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2200, seats: 37, source: "estimated" },
  { collegeId: "rj-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3200, seats: 212, source: "estimated" },

  // BJMC Ahmedabad
  { collegeId: "gj-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2800, seats: 37, source: "estimated" },
  { collegeId: "gj-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3800, seats: 212, source: "estimated" },

  // PMC Patna
  { collegeId: "br-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 5000, seats: 170, source: "estimated" },

  // NSCB Jabalpur
  { collegeId: "mp-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 5500, seats: 170, source: "estimated" },

  // MCT Thiruvananthapuram
  { collegeId: "kl-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 3500, seats: 170, source: "estimated" },

  // AMC Dibrugarh
  { collegeId: "as-govt-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 8000, seats: 170, source: "estimated" },

  // Private colleges — generally higher closing ranks
  { collegeId: "ap-private-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 50000, seats: 127, source: "estimated" },
  { collegeId: "ap-private-medical-002", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 45000, seats: 170, source: "estimated" },
  { collegeId: "ts-private-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 40000, seats: 170, source: "estimated" },
  { collegeId: "ka-private-medical-001", year: 2025, round: "round1", category: "General", quota: "state", closingRank: 35000, seats: 212, source: "estimated" },

  // Deemed universities — AIQ only
  { collegeId: "deemed-001", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 60000, seats: 150, source: "estimated" },
  { collegeId: "deemed-002", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 45000, seats: 250, source: "estimated" },
  { collegeId: "deemed-003", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 40000, seats: 250, source: "estimated" },
  { collegeId: "deemed-004", year: 2025, round: "round1", category: "General", quota: "aiq", closingRank: 2000, seats: 100, source: "estimated" },
];

export const seatMatrices: SeatMatrix[] = [
  // 2025 seat matrices for key colleges
  // AIIMS Delhi seat matrix
  { collegeId: "dl-central-001", year: 2025, category: "General", quota: "aiq", totalSeats: 37, occupied: 35, vacant: 2, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, category: "OBC-NCL", quota: "aiq", totalSeats: 25, occupied: 24, vacant: 1, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, category: "SC", quota: "aiq", totalSeats: 15, occupied: 14, vacant: 1, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, category: "ST", quota: "aiq", totalSeats: 8, occupied: 7, vacant: 1, source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, category: "EWS", quota: "aiq", totalSeats: 9, occupied: 8, vacant: 1, source: "estimated" },

  { collegeId: "mh-govt-medical-001", year: 2025, category: "General", quota: "aiq", totalSeats: 37, occupied: 33, vacant: 4, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, category: "OBC-NCL", quota: "aiq", totalSeats: 25, occupied: 22, vacant: 3, source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, category: "SC", quota: "aiq", totalSeats: 15, occupied: 13, vacant: 2, source: "estimated" },

  { collegeId: "ts-govt-medical-001", year: 2025, category: "General", quota: "aiq", totalSeats: 37, occupied: 34, vacant: 3, source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2025, category: "General", quota: "state", totalSeats: 212, occupied: 200, vacant: 12, source: "estimated" },
];

export const seatMovements: SeatMovement[] = [
  { collegeId: "dl-central-001", year: 2025, fromRound: "round1", toRound: "round2", seatsVacated: 2, seatsFilled: 2, category: "General", reason: "upgrade", source: "estimated" },
  { collegeId: "dl-central-001", year: 2025, fromRound: "round2", toRound: "mopUp", seatsVacated: 1, seatsFilled: 1, category: "General", reason: "non-reporting", source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, fromRound: "round1", toRound: "round2", seatsVacated: 4, seatsFilled: 4, category: "General", reason: "upgrade", source: "estimated" },
  { collegeId: "mh-govt-medical-001", year: 2025, fromRound: "round1", toRound: "round2", seatsVacated: 3, seatsFilled: 2, category: "OBC-NCL", reason: "non-reporting", source: "estimated" },
  { collegeId: "ts-govt-medical-001", year: 2025, fromRound: "round1", toRound: "round2", seatsVacated: 12, seatsFilled: 10, category: "General", reason: "upgrade", source: "estimated" },
];

export const getClosingRanks = (
  collegeId: string,
  category?: string,
  year?: number,
  round?: string,
  quota?: "aiq" | "state"
) =>
  closingRanks.filter(
    (r) =>
      r.collegeId === collegeId &&
      (!category || r.category === category) &&
      (!year || r.year === year) &&
      (!round || r.round === round) &&
      (!quota || r.quota === quota)
  );

export const getClosingRankTrend = (
  collegeId: string,
  category: string,
  quota: "aiq" | "state",
  rounds: string[] = ["round1"]
) => {
  const years = [2023, 2024, 2025];
  return years
    .map((year) => {
      const entry = closingRanks.find(
        (r) =>
          r.collegeId === collegeId &&
          r.category === category &&
          r.year === year &&
          rounds.includes(r.round) &&
          r.quota === quota
      );
      return entry ? { year, closingRank: entry.closingRank } : null;
    })
    .filter(Boolean) as { year: number; closingRank: number }[];
};

export const getSeatMatrix = (collegeId: string, year: number) =>
  seatMatrices.filter(
    (s) => s.collegeId === collegeId && s.year === year
  );

export const getSeatMovements = (collegeId: string, year: number) =>
  seatMovements.filter(
    (m) => m.collegeId === collegeId && m.year === year
  );
