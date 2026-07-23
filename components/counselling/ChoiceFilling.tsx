"use client";

import { useState } from "react";
import { GripVertical, X, ArrowUp, ArrowDown } from "lucide-react";
import type { MedicalCollege } from "@/data/counselling/colleges";

interface Props {
  colleges: MedicalCollege[];
  onOrderChange: (ordered: MedicalCollege[]) => void;
}

export function ChoiceFilling({ colleges, onOrderChange }: Props) {
  const [choices, setChoices] = useState<MedicalCollege[]>(colleges.slice(0, 10));
  const [available, setAvailable] = useState<MedicalCollege[]>(
    colleges.slice(10).slice(0, 20)
  );

  const addCollege = (college: MedicalCollege) => {
    const newChoices = [...choices, college];
    setChoices(newChoices);
    setAvailable(available.filter((c) => c.id !== college.id));
    onOrderChange(newChoices);
  };

  const removeCollege = (collegeId: string) => {
    const college = choices.find((c) => c.id === collegeId);
    if (college) {
      setAvailable([college, ...available]);
      const newChoices = choices.filter((c) => c.id !== collegeId);
      setChoices(newChoices);
      onOrderChange(newChoices);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newChoices = [...choices];
    [newChoices[index - 1], newChoices[index]] = [newChoices[index], newChoices[index - 1]];
    setChoices(newChoices);
    onOrderChange(newChoices);
  };

  const moveDown = (index: number) => {
    if (index === choices.length - 1) return;
    const newChoices = [...choices];
    [newChoices[index], newChoices[index + 1]] = [newChoices[index + 1], newChoices[index]];
    setChoices(newChoices);
    onOrderChange(newChoices);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-zinc-200 p-5">
        <h4 className="text-[14px] font-bold text-zinc-900 mb-3">
          Your Choices ({choices.length})
        </h4>
        <p className="text-[11px] text-zinc-500 mb-3">Arrange in order of preference. 1 = most preferred.</p>
        {choices.length === 0 ? (
          <div className="text-[13px] text-zinc-400 text-center py-8 border-2 border-dashed border-zinc-200 rounded-xl">
            Add colleges from the available list →
          </div>
        ) : (
          <div className="space-y-2">
            {choices.map((college, index) => (
              <div
                key={college.id}
                className="flex items-center gap-3 bg-zinc-50 rounded-xl p-3 border border-zinc-100"
              >
                <span className="text-[11px] font-bold text-zinc-400 w-5 text-center">
                  {index + 1}
                </span>
                <GripVertical className="h-3.5 w-3.5 text-zinc-300" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-zinc-900 truncate">{college.name}</div>
                  <div className="text-[10px] text-zinc-500">{college.city} • {college.type}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveUp(index)} className="p-1 hover:bg-zinc-200 rounded transition-colors" disabled={index === 0}>
                    <ArrowUp className="h-3 w-3 text-zinc-500" />
                  </button>
                  <button onClick={() => moveDown(index)} className="p-1 hover:bg-zinc-200 rounded transition-colors" disabled={index === choices.length - 1}>
                    <ArrowDown className="h-3 w-3 text-zinc-500" />
                  </button>
                  <button onClick={() => removeCollege(college.id)} className="p-1 hover:bg-red-100 rounded transition-colors">
                    <X className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-5">
        <h4 className="text-[14px] font-bold text-zinc-900 mb-3">Available Colleges</h4>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {available.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all cursor-pointer"
              onClick={() => addCollege(college)}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-zinc-900 truncate">{college.name}</div>
                <div className="text-[10px] text-zinc-500">{college.city} • {college.type} • {college.totalSeats} seats</div>
              </div>
              <span className="text-[11px] text-blue-600 font-medium">+ Add</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
