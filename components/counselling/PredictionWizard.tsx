"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Search, Sparkles } from "lucide-react";
import { getAllStates } from "@/data/counselling/colleges";
import { allIndiaCategories, stateReservations } from "@/data/counselling/categories";
import type { StudentProfile } from "@/lib/counselling/probability";

interface Props {
  onComplete: (profile: StudentProfile) => void;
}

const steps = ["Rank & Score", "Category & Domicile", "Preferences", "Choice Filling"];

export function PredictionWizard({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<StudentProfile>({
    rank: 0,
    score: 0,
    category: "General",
    state: "Telangana",
    gender: "male",
    domicile: "Telangana",
    preferredCourse: "MBBS",
    budget: 5000000,
    collegePreference: "any",
    preferredStates: [],
  });

  const states = getAllStates();
  const categories = allIndiaCategories;
  const stateCategories = stateReservations.find((r) => r.state === profile.state)?.categories || [];

  const update = (key: keyof StudentProfile, value: StudentProfile[keyof StudentProfile]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const toggleState = (state: string) => {
    setProfile((prev) => ({
      ...prev,
      preferredStates: prev.preferredStates.includes(state)
        ? prev.preferredStates.filter((s) => s !== state)
        : [...prev.preferredStates, state],
    }));
  };

  const canProceed = () => {
    if (step === 0) return profile.rank > 0;
    if (step === 1) return profile.category && profile.state;
    return true;
  };

  const handleSubmit = () => {
    onComplete(profile);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-2 mb-3">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                  i < step
                    ? "bg-emerald-500 text-white"
                    : i === step
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < step ? "bg-emerald-500" : "bg-zinc-200"}`} />
              )}
            </div>
          ))}
        </div>
        <h3 className="text-[15px] font-bold text-zinc-900">{steps[step]}</h3>
      </div>

      <div className="p-6 min-h-[280px]">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">NEET All India Rank</label>
              <input
                type="number"
                value={profile.rank || ""}
                onChange={(e) => update("rank", parseInt(e.target.value) || 0)}
                placeholder="e.g. 5000"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
              <p className="text-[11px] text-zinc-400 mt-1">Enter your All India Rank from NEET result</p>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">NEET Score (out of 720)</label>
              <input
                type="number"
                value={profile.score || ""}
                onChange={(e) => update("score", parseInt(e.target.value) || 0)}
                placeholder="e.g. 580"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => update("category", cat.id)}
                    className={`text-left p-3 rounded-xl border text-[12px] transition-all ${
                      profile.category === cat.id
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 hover:border-zinc-300 text-zinc-700"
                    }`}
                  >
                    <div className="font-semibold">{cat.name}</div>
                    <div className={`text-[10px] mt-0.5 ${profile.category === cat.id ? "text-zinc-300" : "text-zinc-400"}`}>
                      {cat.reservationPercentage}% reservation
                    </div>
                  </button>
                ))}
              </div>
              {stateCategories.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] text-zinc-400 mb-2">State-specific categories for {profile.state}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stateCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => update("category", cat.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                          profile.category === cat.id
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                        }`}
                      >
                        {cat.name} ({cat.reservationPercentage}%)
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Domicile State</label>
              <select
                value={profile.state}
                onChange={(e) => {
                  update("state", e.target.value);
                  update("domicile", e.target.value);
                }}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Gender</label>
              <div className="flex gap-2">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => update("gender", g)}
                    className={`flex-1 py-2.5 rounded-xl border text-[12px] font-medium transition-all ${
                      profile.gender === g
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Preferred Course</label>
              <div className="flex gap-2">
                {(["MBBS", "BDS", "both"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => update("preferredCourse", c)}
                    className={`flex-1 py-2.5 rounded-xl border text-[12px] font-medium transition-all ${
                      profile.preferredCourse === c
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {c === "both" ? "MBBS + BDS" : c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">College Type Preference</label>
              <div className="grid grid-cols-2 gap-2">
                {(["any", "government", "private", "deemed"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => update("collegePreference", t)}
                    className={`py-2.5 rounded-xl border text-[12px] font-medium transition-all ${
                      profile.collegePreference === t
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {t === "any" ? "Any" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">
                Annual Budget: ₹{(profile.budget / 100000).toFixed(0)} Lakh
              </label>
              <input
                type="range"
                min="0"
                max="25000000"
                step="500000"
                value={profile.budget}
                onChange={(e) => update("budget", parseInt(e.target.value))}
                className="w-full accent-zinc-900"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>₹0 (Govt only)</span>
                <span>₹25L+</span>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Preferred States</label>
              <p className="text-[11px] text-zinc-400 mb-2">Select states you prefer (leave empty for all)</p>
              <div className="flex flex-wrap gap-1.5">
                {states.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleState(s)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      profile.preferredStates.includes(s)
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <Sparkles className="h-10 w-10 text-zinc-300 mx-auto mb-4" />
            <h4 className="text-[16px] font-bold text-zinc-900 mb-2">Ready to Predict</h4>
            <p className="text-[13px] text-zinc-500 max-w-md mx-auto leading-relaxed">
              Based on your rank <strong>{profile.rank.toLocaleString()}</strong>, category <strong>{profile.category}</strong>, and preferences, we&apos;ll analyze your chances across all tracked medical colleges.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-zinc-500">
              <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Rank: {profile.rank.toLocaleString()}</span>
              <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Category: {profile.category}</span>
              <span className="bg-zinc-100 px-2.5 py-1 rounded-md">State: {profile.state}</span>
              <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Course: {profile.preferredCourse}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-1.5 bg-zinc-900 text-white text-[13px] font-semibold px-5 py-2 rounded-lg hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 bg-zinc-900 text-white text-[13px] font-semibold px-5 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Search className="h-4 w-4" />
            Predict My Colleges
          </button>
        )}
      </div>
    </div>
  );
}
