"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Truck, ShieldCheck, Sparkles } from "lucide-react";

const HERO_IMAGE =
  "/images/products/tranh-treo-tuong-mandala-chu-phuc.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-stone-50 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-16 pb-16 lg:py-0">
        {/* Text Column */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bộ sưu tập nghệ thuật mới</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1]">
            Tinh Hoa <br className="hidden sm:block" />
            <span className="text-accent font-serif font-medium">Lá Bồ Đề</span>
          </h1>

          <p className="text-base text-stone-600 leading-relaxed max-w-lg">
            Mỗi đường gân là một kiệt tác thiên nhiên. Tác phẩm thủ công độc bản mang lại bình an, may mắn và thịnh vượng cho không gian sống của bạn.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#gallery"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark hover:shadow-lg transition-all duration-300 w-full sm:w-auto text-center shadow-md"
            >
              Khám Phá Ngay
            </a>
            <p className="text-sm text-stone-500 hidden sm:block">
              Hơn 1.000+ tác phẩm đã được bán.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-200 mt-8">
            <div className="flex items-center gap-2.5 text-sm text-stone-700">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-accent">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-medium">Freeship toàn quốc</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-stone-700">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-accent">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-medium">Bảo hành trọn đời</span>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-float border border-stone-200/60 bg-stone-100">
          <Image
            src={HERO_IMAGE}
            alt="Xương lá bồ đề nghệ thuật"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Scroll indicator - Pure CSS animation, zero CPU usage */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium">Cuộn xuống</span>
        <div className="animate-bounce">
          <ArrowDown className="w-4 h-4 text-stone-400" />
        </div>
      </div>
    </section>
  );
}
