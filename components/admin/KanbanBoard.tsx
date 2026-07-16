"use client";

import { useState } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
} from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  FileText,
  Film,
  PenTool,
  Sparkles,
  GripVertical,
} from "lucide-react";

interface KanbanCard {
  _id: string;
  title: string;
  type: string;
  category: string;
  platform: string;
  status: string;
  wordCount: number;
  aiAssisted: boolean;
  updatedAt: string;
}

interface Column {
  id: string;
  label: string;
  color: string;
  accent: string;
}

const columns: Column[] = [
  { id: "draft", label: "Drafts", color: "bg-zinc-500", accent: "border-zinc-500/30" },
  { id: "review", label: "In Review", color: "bg-amber-500", accent: "border-amber-500/30" },
  { id: "ready", label: "Ready", color: "bg-sky-500", accent: "border-sky-500/30" },
  { id: "published", label: "Published", color: "bg-emerald-500", accent: "border-emerald-500/30" },
  { id: "archived", label: "Archived", color: "bg-zinc-600", accent: "border-zinc-600/30" },
];

const typeIcons: Record<string, any> = {
  blog: FileText,
  "reel-script": Film,
  "short-script": Film,
  "long-form-script": PenTool,
  "instagram-caption": FileText,
};

function KanbanCardInner({ card, overlay }: { card: KanbanCard; overlay?: boolean }) {
  const TypeIcon = typeIcons[card.type] || FileText;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card._id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#161618] border border-white/[0.06] rounded-xl p-3.5 group transition-colors hover:border-white/[0.12] ${
        overlay ? "shadow-2xl rotate-2 opacity-95" : ""
      }`}
    >
      <div className="flex items-start gap-2.5">
        <button
          {...listeners}
          {...attributes}
          className="mt-0.5 text-zinc-700 hover:text-zinc-400 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <TypeIcon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <p className="text-[13px] font-semibold text-white truncate">
              {card.title || "Untitled"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider">
              {card.type.replace("-", " ")}
            </span>
            <span className="text-[10px] text-zinc-700">·</span>
            <span className="text-[10px] text-zinc-600">
              {card.wordCount} words
            </span>
            {card.aiAssisted && (
              <>
                <span className="text-[10px] text-zinc-700">·</span>
                <Sparkles className="h-2.5 w-2.5 text-violet-400" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  column,
  cards,
  count,
}: {
  column: Column;
  cards: KanbanCard[];
  count: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex-1 min-w-[240px] max-w-[300px]">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`w-2 h-2 rounded-full ${column.color}`} />
        <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
          {column.label}
        </h3>
        <span className="text-[11px] text-zinc-600 bg-white/[0.04] px-1.5 py-0.5 rounded-md">
          {count}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[200px] rounded-xl p-2 space-y-2 transition-colors ${
          isOver ? "bg-white/[0.04] ring-1 ring-white/[0.08]" : "bg-white/[0.01]"
        }`}
      >
        {cards.map((card) => (
          <KanbanCardInner key={card._id} card={card} />
        ))}
        {cards.length === 0 && (
          <div className="flex items-center justify-center h-24 text-[12px] text-zinc-700">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  items: KanbanCard[];
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function KanbanBoard({ items, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const grouped = columns.reduce(
    (acc, col) => {
      acc[col.id] = items.filter((item) => item.status === col.id);
      return acc;
    },
    {} as Record<string, KanbanCard[]>
  );

  const findColumn = (id: string): string | null => {
    if (columns.some((c) => c.id === id)) return id;
    const item = items.find((i) => i._id === id);
    return item?.status || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumn = findColumn(String(active.id));
    const overColumn = findColumn(String(over.id));

    if (activeColumn && overColumn && activeColumn !== overColumn) {
      onStatusChange(String(active.id), overColumn);
    }
  };

  const activeCard = items.find((i) => i._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={grouped[col.id] || []}
            count={(grouped[col.id] || []).length}
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard ? <KanbanCardInner card={activeCard} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
