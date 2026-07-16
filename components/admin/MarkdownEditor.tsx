"use client";

import { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Minus,
  Eye,
  Edit3,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "400px",
}: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insert = useCallback(
    (before: string, after: string = "") => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.substring(start, end);
      const newText =
        value.substring(0, start) + before + selected + after + value.substring(end);
      onChange(newText);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(
          start + before.length,
          start + before.length + selected.length
        );
      }, 0);
    },
    [value, onChange]
  );

  const toolbar = [
    { icon: Bold, action: () => insert("**", "**"), title: "Bold" },
    { icon: Italic, action: () => insert("*", "*"), title: "Italic" },
    { icon: Heading1, action: () => insert("\n# "), title: "H1" },
    { icon: Heading2, action: () => insert("\n## "), title: "H2" },
    { icon: List, action: () => insert("\n- "), title: "Bullet List" },
    { icon: ListOrdered, action: () => insert("\n1. "), title: "Numbered List" },
    { icon: Quote, action: () => insert("\n> "), title: "Quote" },
    { icon: Code, action: () => insert("`", "`"), title: "Code" },
    { icon: Link, action: () => insert("[", "](url)"), title: "Link" },
    { icon: Image, action: () => insert("![alt](", ")"), title: "Image" },
    { icon: Minus, action: () => insert("\n---\n"), title: "Divider" },
  ];

  const renderMarkdown = (md: string) => {
    let html = md
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="text-zinc-300">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-zinc-800 text-violet-400 px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-zinc-600 pl-4 text-zinc-400 italic">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="text-zinc-300 ml-4 list-disc">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="text-zinc-300 ml-4 list-decimal">$2</li>')
      .replace(/---/g, '<hr class="border-zinc-700 my-4" />')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-violet-400 hover:underline">$1</a>'
      );
    return html;
  };

  const wordCount = value.split(/\s+/).filter(Boolean).length;
  const charCount = value.length;

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden bg-[#111113]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <div className="flex items-center gap-0.5">
          {toolbar.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.title}
                onClick={t.action}
                title={t.title}
                className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-600">
            {wordCount} words · {charCount} chars
          </span>
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[12px] font-medium text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {preview ? <Edit3 className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div
          className="p-5 prose prose-invert max-w-none text-[14px] leading-relaxed text-zinc-300"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-zinc-300 text-[14px] leading-relaxed p-5 resize-none focus:outline-none placeholder-zinc-700"
          style={{ minHeight }}
        />
      )}
    </div>
  );
}
