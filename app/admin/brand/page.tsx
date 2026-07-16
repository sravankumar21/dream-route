"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Palette,
  Type,
  MessageSquare,
  Image,
  Check,
  RotateCcw,
} from "lucide-react";

interface BrandData {
  colors: { name: string; hex: string }[];
  typography: { fontFamily: string; weights: string[]; sizes: { label: string; value: string }[] };
  voice: { description: string; dos: string; donts: string };
  logo: { guidelines: string; uploadPlaceholder: string };
}

const defaultBrand: BrandData = {
  colors: [
    { name: "Primary", hex: "#18181b" },
    { name: "Accent", hex: "#8b5cf6" },
    { name: "Background", hex: "#0a0a0b" },
    { name: "Surface", hex: "#111113" },
    { name: "Muted", hex: "#71717a" },
    { name: "Success", hex: "#10b981" },
  ],
  typography: {
    fontFamily: "Plus Jakarta Sans",
    weights: ["400", "500", "600", "700", "800"],
    sizes: [
      { label: "Display", value: "48px / 1.1" },
      { label: "H1", value: "36px / 1.15" },
      { label: "H2", value: "28px / 1.2" },
      { label: "H3", value: "22px / 1.25" },
      { label: "Body", value: "14px / 1.6" },
      { label: "Caption", value: "12px / 1.5" },
      { label: "Micro", value: "10px / 1.4" },
    ],
  },
  voice: {
    description: "DreamRoute speaks with clarity and confidence. We are direct, informative, and approachable -- never corporate or stiff. Our tone adapts to context: technical precision when explaining features, warm encouragement when guiding users.",
    dos: "Be concise and direct. Use active voice. Lead with value. Break complex ideas into clear steps. Use real examples from the product.",
    donts: "Don't use jargon without explanation. Don't be overly casual or use slang. Don't make promises we can't keep. Don't use passive voice excessively. Don't over-explain simple things.",
  },
  logo: {
    guidelines: "Use the DreamRoute logo with adequate spacing. Minimum size: 24px height. Never stretch, rotate, or alter the logo. Use the light version on dark backgrounds and the dark version on light backgrounds.",
    uploadPlaceholder: "Drop logo files here or click to upload",
  },
};

export default function BrandPage() {
  const [brand, setBrand] = useState<BrandData>(defaultBrand);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("dreamroute-brand");
    if (stored) {
      try {
        setBrand(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      localStorage.setItem("dreamroute-brand", JSON.stringify(brand));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setBrand(defaultBrand);
    localStorage.removeItem("dreamroute-brand");
  };

  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const updated = [...brand.colors];
    updated[index] = { ...updated[index], [field]: value };
    setBrand({ ...brand, colors: updated });
  };

  const removeColor = (index: number) => {
    setBrand({ ...brand, colors: brand.colors.filter((_, i) => i !== index) });
  };

  const addColor = () => {
    if (!newColorName.trim() || !newColorHex.trim()) return;
    const hex = newColorHex.startsWith("#") ? newColorHex : `#${newColorHex}`;
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    setBrand({
      ...brand,
      colors: [...brand.colors, { name: newColorName.trim(), hex }],
    });
    setNewColorName("");
    setNewColorHex("");
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">Brand Center</h2>
          <p className="text-[14px] text-zinc-500 mt-1">Manage brand identity, tone, and guidelines.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Brand Colors */}
        <section className="bg-[#111113] rounded-xl border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            <h3 className="text-[14px] font-semibold text-white">Brand Colors</h3>
          </div>
          <div className="space-y-2">
            {brand.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border border-white/[0.1] shrink-0 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.hex}
                  onClick={() => removeColor(i)}
                />
                <input
                  value={color.name}
                  onChange={(e) => updateColor(i, "name", e.target.value)}
                  className="w-32 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
                />
                <input
                  value={color.hex}
                  onChange={(e) => updateColor(i, "hex", e.target.value)}
                  className="w-24 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[13px] text-zinc-400 font-mono focus:outline-none focus:border-white/[0.12]"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
            <input
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Name"
              className="w-32 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
            <input
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addColor()}
              placeholder="#000000"
              className="w-24 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[13px] text-zinc-400 font-mono placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
            <button
              onClick={addColor}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              Add Color
            </button>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-[#111113] rounded-xl border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-4 w-4 text-zinc-500" />
            <h3 className="text-[14px] font-semibold text-white">Typography</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Font Family</label>
              <input
                value={brand.typography.fontFamily}
                onChange={(e) => setBrand({ ...brand, typography: { ...brand.typography, fontFamily: e.target.value } })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              />
              <p className="text-[24px] font-bold text-white mt-2" style={{ fontFamily: brand.typography.fontFamily }}>
                {brand.typography.fontFamily}
              </p>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">Weights</label>
              <div className="flex flex-wrap gap-2">
                {brand.typography.weights.map((w) => (
                  <span key={w} className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-zinc-300 bg-white/[0.04] border border-white/[0.06]">
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">Type Scale</label>
              <div className="space-y-1.5">
                {brand.typography.sizes.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]">
                    <span className="text-[13px] font-medium text-zinc-400">{s.label}</span>
                    <span className="text-[12px] text-zinc-600 font-mono">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="bg-[#111113] rounded-xl border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-zinc-500" />
            <h3 className="text-[14px] font-semibold text-white">Voice &amp; Tone</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Brand Voice</label>
              <textarea
                value={brand.voice.description}
                onChange={(e) => setBrand({ ...brand, voice: { ...brand.voice, description: e.target.value } })}
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-emerald-500 uppercase tracking-wider block mb-1">Do&apos;s</label>
                <textarea
                  value={brand.voice.dos}
                  onChange={(e) => setBrand({ ...brand, voice: { ...brand.voice, dos: e.target.value } })}
                  rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-red-400 uppercase tracking-wider block mb-1">Don&apos;ts</label>
                <textarea
                  value={brand.voice.donts}
                  onChange={(e) => setBrand({ ...brand, voice: { ...brand.voice, donts: e.target.value } })}
                  rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Logo Usage */}
        <section className="bg-[#111113] rounded-xl border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Image className="h-4 w-4 text-zinc-500" aria-hidden="true" />
            <h3 className="text-[14px] font-semibold text-white">Logo Usage</h3>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-8 text-center hover:border-white/[0.15] transition-colors cursor-pointer">
              <Image className="h-8 w-8 text-zinc-700 mx-auto mb-2" aria-hidden="true" />
              <p className="text-[13px] text-zinc-500">{brand.logo.uploadPlaceholder}</p>
              <p className="text-[11px] text-zinc-600 mt-1">SVG, PNG, or PDF up to 10MB</p>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Guidelines</label>
              <textarea
                value={brand.logo.guidelines}
                onChange={(e) => setBrand({ ...brand, logo: { ...brand.logo, guidelines: e.target.value } })}
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
