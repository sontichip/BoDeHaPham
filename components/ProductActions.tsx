"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check, MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-stone-700">
          Số lượng
        </span>
        <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-lg"
          >
            −
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold text-stone-900 border-x border-stone-200 tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.max(1, Math.min(product.stock, q + 1)))}
            className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          disabled={product.stock <= 0}
          className={`flex-1 py-3.5 text-sm font-bold tracking-wide flex items-center justify-center gap-2 rounded-lg shadow-md transition-colors ${
            added
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-accent text-white hover:bg-accent-dark"
          } disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed disabled:shadow-none`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Đã thêm vào giỏ
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </>
          )}
        </motion.button>

        <a
          href={`https://zalo.me/0915883318?text=${encodeURIComponent(
            `Tôi cần tư vấn thêm về sản phẩm: ${product.name}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-blue-500 text-blue-600 font-bold text-sm rounded-lg hover:bg-blue-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Chat Zalo
        </a>
      </div>
    </div>
  );
}
