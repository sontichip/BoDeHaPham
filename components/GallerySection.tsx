"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { Product } from "@/types";
import { CategoryFilter } from "./CategoryFilter";
import { ProductGrid } from "./ProductGrid";

interface GallerySectionProps {
  products: Product[];
}

export function GallerySection({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Đọc category từ URL lần đầu tiên tải trang
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get("category");
      if (cat) {
        setActiveCategory(cat);
      }
    }
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      // Cập nhật URL thanh địa chỉ mà không kích hoạt router reload
      window.history.replaceState({}, "", url.toString());
    }
  };

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="space-y-10">
      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-stone-200/60 p-8">
          <p className="text-sm text-stone-500">
            Hiện chưa có tác phẩm nào trong danh mục này.
          </p>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
