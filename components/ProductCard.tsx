"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setIsOpen = useCartStore((s) => s.setIsOpen);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsOpen(true);
  };

  return (
    <article className="group flex flex-col bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-stone-100 overflow-hidden will-change-transform">
      <Link
        href={`/product/${product.slug}`}
        prefetch={false}
        className="block relative aspect-[4/5] overflow-hidden bg-stone-100 cursor-pointer"
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.original_price && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-red-500 text-white rounded-sm shadow-sm">
              Giảm Giá
            </span>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-amber-500 text-white rounded-sm shadow-sm">
              Sắp hết
            </span>
          )}
        </div>

        {/* Add to Cart Overlay Button - Pure CSS Transition */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 z-10 transition-all duration-200 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/95 backdrop-blur-sm text-stone-900 font-semibold text-sm rounded-md shadow-md border border-stone-200 hover:bg-accent hover:text-white hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock > 0 ? "Thêm vào giỏ" : "Hết hàng"}
          </button>
        </div>
      </Link>

      {/* Info */}
      <Link
        href={`/product/${product.slug}`}
        prefetch={false}
        className="flex flex-col flex-1 p-4"
      >
        {/* Ratings */}
        <div className="flex items-center gap-1 mb-2 text-amber-500">
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs text-stone-400 ml-1">(5)</span>
        </div>

        <h3 className="text-sm font-medium text-stone-900 leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200 mb-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-end gap-2 mt-auto pt-2">
          <p className="text-base font-bold text-accent">
            {formatPrice(product.price)}
          </p>
          {product.original_price && (
            <p className="text-xs text-stone-400 line-through mb-0.5">
              {formatPrice(product.original_price)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
});
