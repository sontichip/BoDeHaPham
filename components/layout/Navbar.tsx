"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-stone-900 text-stone-100 py-1.5 px-4 text-center text-xs font-medium tracking-wide">
        Miễn phí giao hàng toàn quốc cho mọi đơn hàng từ <span className="text-accent-light">1.000.000đ</span>
      </div>

      {/* Main Nav */}
      <nav 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-stone-200 py-3 shadow-sm" 
            : "bg-stone-50 border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex flex-col items-start group">
            <span className="text-2xl font-bold tracking-tight text-stone-900 group-hover:text-accent transition-colors">
              Bồ Đề <span className="font-serif text-accent font-medium">Art</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-stone-400 uppercase">
              Thủ công & Độc bản
            </span>
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-stone-700 hover:text-accent hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-semibold hidden sm:block">Giỏ hàng</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
