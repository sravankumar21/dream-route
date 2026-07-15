"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Lock,
  ArrowRight,
  ArrowLeft,
  Layers,
  ChevronRight,
  Clock,
  IndianRupee,
  Briefcase,
  GraduationCap,
  AlertCircle,
  ArrowUpRight,
  RotateCcw,
  ExternalLink,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { states, getStateData, type EducationNode } from "@/data/education";

const startingLevels = [
  { id: "class5", label: "Class 5", description: "Full school to career path", completed: null, next: "Choose your school type" },
  { id: "class10", label: "After Class 10", description: "Intermediate + Degree", completed: "Class 10 (SSC)", next: "Choose your Intermediate stream" },
  { id: "inter", label: "After Intermediate", description: "Degree + Career", completed: "Intermediate (11-12)", next: "Choose your degree program" },
  { id: "bachelors", label: "After Bachelor's", description: "PG + Career", completed: "Bachelor's Degree", next: "Choose your post-graduation path" },
];

export default function PathExplorer() {
  const [selectedState, setSelectedState] = useState("telangana");
  const [selectedLevel, setSelectedLevel] = useState("class5");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [path, setPath] = useState<EducationNode[]>([]);
  const [expandedKnowMore, setExpandedKnowMore] = useState<Set<string>>(new Set());

  const stateData = getStateData(selectedState);

  const getRootNodes = useMemo(() => {
    if (!stateData || !stateData.available) return [];
    const tree = stateData.tree;

    if (selectedLevel === "class10") {
      const nodes: EducationNode[] = [];
      for (const school of tree) {
        if (school.children) {
          for (const child of school.children) {
            if (!nodes.some((n) => n.id === child.id)) nodes.push(child);
          }
        }
      }
      return nodes;
    }

    if (selectedLevel === "inter") {
      const nodes: EducationNode[] = [];
      for (const school of tree) {
        if (school.children) {
          for (const inter of school.children) {
            if (inter.children) {
              for (const degree of inter.children) {
                if (!nodes.some((n) => n.id === degree.id)) nodes.push(degree);
              }
            }
          }
        }
      }
      return nodes;
    }

    if (selectedLevel === "bachelors") {
      const pgNodes: EducationNode[] = [];
      for (const school of tree) {
        if (school.children) {
          for (const inter of school.children) {
            if (inter.children) {
              for (const degree of inter.children) {
                if (degree.children) {
                  for (const pg of degree.children) {
                    if (!pgNodes.some((n) => n.id === pg.id)) pgNodes.push(pg);
                  }
                }
              }
            }
          }
        }
      }
      return pgNodes;
    }

    return tree;
  }, [stateData, selectedLevel]);

  const currentNode = path.length > 0 ? path[path.length - 1] : null;
  const children = currentNode?.children || [];
  const currentOptions = path.length === 0 ? getRootNodes : children;

  const handleSelect = (node: EducationNode) => {
    setPath((prev) => [...prev, node]);
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setPath([]);
  };

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setStateDropdownOpen(false);
    setPath([]);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setPath([]);
    setExpandedKnowMore(new Set());
  };

  const toggleKnowMore = (nodeId: string) => {
    setExpandedKnowMore((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const stepLabels = (() => {
    if (selectedLevel === "class5") return ["School", "Intermediate", "Degree", "Career"];
    if (selectedLevel === "class10") return ["Intermediate", "Degree", "Career"];
    if (selectedLevel === "inter") return ["Degree", "Career"];
    return ["Post-Graduation", "Career"];
  })();

  const currentLevel = startingLevels.find((l) => l.id === selectedLevel);

  const currentStep = path.length;
  const totalSteps = stepLabels.length;

  return (
    <div>
      {/* State Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <button
            onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-3 text-left hover:border-zinc-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-zinc-400" />
              <span className="text-[14px] font-medium text-zinc-900">
                {stateData?.label || "Select State"}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                stateDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {stateDropdownOpen && (
            <div className="absolute z-40 top-full mt-1 w-full bg-white border border-zinc-200 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-1.5 max-h-[320px] overflow-y-auto">
              {states.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStateChange(s.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-zinc-50 transition-colors ${
                    selectedState === s.id ? "bg-zinc-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-[14px] text-zinc-700 font-medium">{s.label}</span>
                  </div>
                  {!s.available && (
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Lock className="h-3 w-3" />
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-1.5 bg-zinc-100 rounded-xl p-1">
          {startingLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleLevelChange(level.id)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                selectedLevel === level.id
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Context Banner */}
      {currentLevel && currentLevel.completed && path.length === 0 && (
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center shrink-0">
            <GraduationCap className="h-4 w-4 text-zinc-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-zinc-500">
              <span className="font-semibold text-zinc-700">You&apos;ve completed {currentLevel.completed}</span>
              <span className="mx-1.5 text-zinc-300">→</span>
              {currentLevel.next}
            </p>
          </div>
        </div>
      )}

      {/* Unavailable State */}
      {stateData && !stateData.available && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-5">
            <Lock className="h-7 w-7 text-zinc-400" />
          </div>
          <h3 className="text-[18px] font-semibold text-zinc-900 mb-2">
            {stateData.label} — Coming Soon
          </h3>
          <p className="text-[14px] text-zinc-500 max-w-md leading-relaxed">
            We&apos;re building the complete education pathway for {stateData.label}.
            <br />
            Telangana and Andhra Pradesh are available now.
          </p>
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => handleStateChange("telangana")}
              className="flex items-center gap-2 bg-zinc-900 text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Explore Telangana
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => handleStateChange("andhra-pradesh")}
              className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 text-[13px] font-semibold px-4 py-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Explore Andhra Pradesh
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard */}
      {stateData && stateData.available && (
        <div>
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2 shrink-0">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                    i < currentStep
                      ? "bg-zinc-900 text-white"
                      : i === currentStep
                      ? "bg-zinc-200 text-zinc-900"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  {label}
                  {i < path.length && path[i] && (
                    <span className="max-w-[100px] truncate text-white/70">
                      — {path[i].label}
                    </span>
                  )}
                </div>
                {i < stepLabels.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Back + Breadcrumb */}
          {path.length > 0 && (
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-700 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Start Over
              </button>
              <div className="flex items-center gap-1 text-[13px] text-zinc-400 ml-auto">
                <Link href="/education" className="hover:text-zinc-700 transition-colors">
                  Education
                </Link>
                {path.map((p, i) => (
                  <span key={p.id} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    <button
                      onClick={() => setPath(path.slice(0, i + 1))}
                      className={`hover:text-zinc-700 transition-colors ${
                        i === path.length - 1 ? "text-zinc-700 font-medium" : ""
                      }`}
                    >
                      {p.label}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 mb-5 text-[13px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              {currentOptions.length} options
            </span>
            <Link
              href="/careers"
              className="flex items-center gap-1 ml-auto text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Browse all careers
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentOptions.map((node) => {
              const hasMore = node.children && node.children.length > 0;
              const isExpanded = expandedKnowMore.has(node.id);

              return (
                <div key={node.id} className="flex flex-col">
                  <button
                    onClick={() => hasMore && handleSelect(node)}
                    className={`flex-1 flex flex-col text-left rounded-xl border p-4 sm:p-5 transition-all duration-150 ${
                      hasMore
                        ? "bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-[0_2px_16px_rgba(0,0,0,0.06)] cursor-pointer"
                        : "bg-zinc-50/60 border-zinc-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-[15px] font-semibold text-zinc-900 tracking-[-0.01em] truncate">
                        {node.label}
                      </h3>
                    </div>

                    {node.subtitle && (
                      <p className="text-[13px] text-zinc-500 mb-2 leading-relaxed line-clamp-2">
                        {node.subtitle}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-zinc-500 mb-2">
                      {node.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-zinc-400" />
                          {node.duration}
                        </span>
                      )}
                      {node.eligibility && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3 text-zinc-400" />
                          {node.eligibility}
                        </span>
                      )}
                      {node.entranceExam && (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-zinc-400" />
                          {node.entranceExam}
                        </span>
                      )}
                    </div>

                    {node.fees && (node.fees.govt || node.fees.private) && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {node.fees.govt && node.fees.govt !== "—" && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-0.5">
                            <IndianRupee className="h-2.5 w-2.5" />
                            Govt: {node.fees.govt}
                          </span>
                        )}
                        {node.fees.private && node.fees.private !== "—" && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-2 py-0.5">
                            <IndianRupee className="h-2.5 w-2.5" />
                            Pvt: {node.fees.private}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto">
                      {node.careers && node.careers.length > 0 && !node.careerSlug && (
                        <div className="flex items-start gap-1 mt-2">
                          <Briefcase className="h-3 w-3 text-zinc-400 mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {node.careers.slice(0, 3).map((c) => (
                              <span key={c} className="text-[11px] font-medium bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                                {c}
                              </span>
                            ))}
                            {node.careers.length > 3 && (
                              <span className="text-[11px] text-zinc-400">+{node.careers.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {node.careerSlug && (
                        <div className="flex items-center gap-1 mt-2 text-[12px] font-semibold text-indigo-600">
                          <Briefcase className="h-3 w-3" />
                          View career details
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      )}

                      {node.note && (
                        <p className="text-[11px] text-zinc-400 italic mt-1.5">{node.note}</p>
                      )}
                    </div>
                  </button>

                  {node.links && node.links.length > 0 && (
                    <div className="mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleKnowMore(node.id);
                        }}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 hover:text-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors w-full"
                      >
                        <ChevronDownIcon
                          className={`h-3 w-3 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}
                        />
                        Know more
                      </button>

                      <div
                        className={`grid transition-all duration-200 ease-in-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg mt-1 space-y-1.5">
                            {node.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-[12px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
                              >
                                <ExternalLink className="h-3 w-3 shrink-0" />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
