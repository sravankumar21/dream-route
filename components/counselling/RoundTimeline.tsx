"use client";

import { mccCounselling } from "@/data/counselling/counselling-process";
import { CheckCircle, Circle, FileText, Lock, Award, UserCheck, RotateCcw, Target } from "lucide-react";

interface Props {
  currentStep?: number;
  interactive?: boolean;
  onStepClick?: (step: number) => void;
}

const stepIcons = [FileText, Lock, Award, UserCheck, CheckCircle, RotateCcw, Target];

export function RoundTimeline({ currentStep = -1, interactive = false, onStepClick }: Props) {
  const { steps } = mccCounselling;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6">
      <h3 className="text-[15px] font-bold text-zinc-900 mb-6">MCC AIQ Counselling Process</h3>

      <div className="relative">
        <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-zinc-200" />

        <div className="space-y-1">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] || Circle;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={`relative pl-12 pb-6 ${interactive ? "cursor-pointer" : ""}`}
                onClick={() => interactive && onStepClick?.(index)}
              >
                <div
                  className={`absolute left-2.5 w-[18px] h-[18px] rounded-full flex items-center justify-center z-10 transition-colors ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isActive
                      ? "bg-zinc-900 text-white"
                      : "bg-white border-2 border-zinc-300 text-zinc-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <Icon className="h-3 w-3" />
                  )}
                </div>

                <div
                  className={`rounded-xl border p-4 transition-all ${
                    isActive
                      ? "border-zinc-900 bg-zinc-50 shadow-sm"
                      : isCompleted
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-zinc-100 hover:border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Step {step.step}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-zinc-900">{step.title}</h4>
                  <p className="text-[12px] text-zinc-600 mt-1 leading-relaxed">{step.description}</p>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-zinc-200">
                      <ul className="space-y-1.5">
                        {step.details.slice(0, 3).map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-600">
                            <span className="text-zinc-300 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      {step.importantNotes.length > 0 && (
                        <div className="mt-3 bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                          <p className="text-[11px] text-amber-700 font-medium">⚠ {step.importantNotes[0]}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
