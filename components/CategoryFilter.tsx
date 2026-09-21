"use client";

import React from "react";
import type { Category } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<Category | 'all'> = [
  'all',
  'leaves',
  'wall-art',
  'desk-art',
  'zodiac',
  'calligraphy',
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "px-5 py-2 text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 rounded-full border cursor-pointer select-none",
            active === cat
              ? "bg-accent text-white border-accent shadow-sm scale-[1.02]"
              : "text-stone-600 bg-white border-stone-200 hover:text-stone-900 hover:border-stone-300 shadow-sm hover:bg-stone-50"
          )}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
