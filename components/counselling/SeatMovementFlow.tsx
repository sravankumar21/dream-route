"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

interface SeatEvent {
  id: number;
  student: string;
  rank: number;
  action: "gets" | "upgrades" | "vacates" | "receives";
  college: string;
  fromCollege?: string;
  round: string;
}

const scenario: SeatEvent[] = [
  { id: 1, student: "Student A", rank: 100, action: "gets", college: "College X", round: "Round 1" },
  { id: 2, student: "Student A", rank: 100, action: "upgrades", college: "College Y", fromCollege: "College X", round: "Round 2" },
  { id: 3, student: "Student A", rank: 100, action: "vacates", college: "College X", round: "Round 2" },
  { id: 4, student: "Student B", rank: 250, action: "receives", college: "College X", round: "Round 2" },
  { id: 5, student: "Student B", rank: 250, action: "upgrades", college: "College Z", fromCollege: "College X", round: "Mop-Up" },
  { id: 6, student: "Student B", rank: 250, action: "vacates", college: "College X", round: "Mop-Up" },
  { id: 7, student: "Student C", rank: 400, action: "receives", college: "College X", round: "Mop-Up" },
];

export function SeatMovementFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const advance = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= scenario.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(advance, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, advance]);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const visibleEvents = scenario.slice(0, currentStep + 1);

  const getActionColor = (action: SeatEvent["action"]) => {
    switch (action) {
      case "gets":
        return "bg-emerald-50 border-emerald-200 text-emerald-800";
      case "upgrades":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "vacates":
        return "bg-red-50 border-red-200 text-red-800";
      case "receives":
        return "bg-purple-50 border-purple-200 text-purple-800";
    }
  };

  const getActionLabel = (action: SeatEvent["action"]) => {
    switch (action) {
      case "gets": return "Gets seat";
      case "upgrades": return "Upgrades";
      case "vacates": return "Vacates seat";
      case "receives": return "Receives seat";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-bold text-zinc-900">Seat Movement Simulator</h3>
          <p className="text-[12px] text-zinc-500 mt-1">Watch how one student&apos;s decision affects the next</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 bg-zinc-900 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 bg-zinc-100 text-zinc-700 text-[12px] font-semibold px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-zinc-200" />

        <div className="space-y-4">
          {visibleEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex items-start gap-4 pl-10 transition-all duration-500 ${
                index === currentStep ? "opacity-100" : "opacity-70"
              }`}
            >
              <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                event.action === "vacates" ? "border-red-400 bg-red-100" : "border-zinc-300 bg-white"
              } z-10`} />

              <div className={`flex-1 rounded-xl border p-4 ${getActionColor(event.action)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold">{event.student}</span>
                    <span className="text-[11px] opacity-70">Rank {event.rank}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-white/50 px-2 py-0.5 rounded-md">
                    {event.round}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[12px]">
                  <span className="font-semibold">{getActionLabel(event.action)}</span>
                  {event.fromCollege && (
                    <>
                      <span className="opacity-50">from</span>
                      <span className="font-medium">{event.fromCollege}</span>
                      <ChevronRight className="h-3 w-3 opacity-50" />
                    </>
                  )}
                  <span className="font-medium">{event.college}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentStep >= scenario.length - 1 && (
        <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <p className="text-[12px] text-zinc-600 leading-relaxed">
            <strong>Key insight:</strong> One student&apos;s upgrade decision created a chain reaction. Student A&apos;s upgrade from College X to College Y made College X available for Student B. Student B&apos;s subsequent upgrade made it available for Student C. This is how seats move between rounds in real counselling.
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2">
        {scenario.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i <= currentStep ? "bg-zinc-900" : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
