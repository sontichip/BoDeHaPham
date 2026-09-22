"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Phone,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, getAssetUrl } from "@/lib/utils";

const HOTLINE = "0915.883.318";
const HOTLINE_TEL = "tel:0915883318";
const ZALO_URL = "https://zalo.me/0915883318";
const MESSENGER_URL = "https://m.me/tranhxuonglabodehapham";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } =
    useCartStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal());

  // Step state: 'items' (danh sách giỏ) hoặc 'contact' (chọn kênh liên hệ đặt hàng)
  const [step, setStep] = useState<"items" | "contact">("items");
  const [copied, setCopied] = useState(false);

  // Khóa cuộn trang nền khi mở giỏ hàng, mở khóa khi đóng
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStep("items");
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Tạo chuỗi tóm tắt đơn hàng để khách copy gửi shop
  const buildOrderSummary = () => {
    const list = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.name}\n   - Số lượng: ${it.quantity}\n   - Đơn giá: ${formatPrice(it.price)}\n   - Thành tiền: ${formatPrice(it.price * it.quantity)}`
      )
      .join("\n\n");

    return `🌸 ĐƠN HÀNG BỒ ĐỀ ART 🌸\n--------------------------------\n${list}\n--------------------------------\n👉 TỔNG CỘNG: ${formatPrice(
      subtotal
    )}\n(Quý khách vui lòng gửi thông báo này để shop xác nhận và giao hàng tận nơi)`;
  };

  const handleCopyOrder = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(buildOrderSummary());
      }
    } catch {
      // Ignored if clipboard blocked
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Xử lý khi bấm nút Zalo hoặc Facebook: sao chép đơn và đóng giỏ hàng
  // để khi khách quay lại tab web không bao giờ bị lớp phủ chặn click (frozen)
  const handleDirectContactClick = () => {
    handleCopyOrder();
    // Tự động đóng drawer để giải phóng giao diện web
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Không render bất kỳ thẻ fixed nào khi giỏ hàng đóng -> 100% không bao giờ chặn click web
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col border-l border-stone-200 transition-transform duration-200 ease-out">
          {/* ── HEADER ── */}
          <div className="px-6 py-4 border-b border-stone-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              {step === "contact" ? (
                <button
                  type="button"
                  onClick={() => setStep("items")}
                  className="p-1 -ml-1 text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
              ) : (
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="text-base font-bold tracking-tight text-stone-900">
                    Giỏ hàng ({totalItems})
                  </h2>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* ── NỘI DUNG CHÍNH (THEO BƯỚC) ── */}
          {step === "items" ? (
            /* ================= BƯỚC 1: DANH SÁCH SẢN PHẨM ================= */
            <>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                      <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-medium text-stone-800">
                        Giỏ hàng của bạn đang trống
                      </p>
                      <p className="text-xs text-stone-500">
                        Hãy chọn cho mình một tác phẩm lá bồ đề ý nghĩa
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-2 px-6 py-2.5 bg-accent text-white text-xs font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-sm cursor-pointer"
                    >
                      Khám phá bộ sưu tập
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/70 shadow-sm"
                      >
                        <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-stone-100 flex-none border border-stone-100">
                          <Image
                            src={getAssetUrl(item.imageUrls[0])}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={handleClose}
                                prefetch={false}
                                className="text-sm font-semibold text-stone-900 line-clamp-2 hover:text-accent transition-colors"
                              >
                                {item.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="flex-none p-1 text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
                                title="Xóa sản phẩm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-accent mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 bg-stone-100 border border-stone-200 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-semibold text-stone-900 tabular-nums w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 bg-stone-100 border border-stone-200 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Giỏ hàng */}
              {items.length > 0 && (
                <div className="px-6 py-5 bg-white border-t border-stone-200 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-stone-500">Tạm tính:</span>
                    <span className="text-xl font-bold text-accent">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center">
                    Miễn phí giao hàng toàn quốc • Kiểm tra trước khi nhận
                  </p>

                  {/* Nút Chuyển sang Thông tin Đặt hàng */}
                  <button
                    type="button"
                    onClick={() => setStep("contact")}
                    className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white text-sm font-bold tracking-wide uppercase rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Đặt hàng ngay
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors text-center cursor-pointer"
                  >
                    Tiếp tục chọn thêm tác phẩm
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ================= BƯỚC 2: LIÊN HỆ ĐẶT HÀNG (FACEBOOK / ZALO / SĐT) ================= */
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {/* Thông báo chính sách đặt hàng không cần thẻ */}
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>Phương thức đặt hàng & Thanh toán</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Bồ Đề Art <strong>không yêu cầu thanh toán thẻ trực tuyến</strong>. Để đảm bảo tư vấn đúng bản mệnh và kiểm tra tác phẩm thủ công nguyên bản, quý khách vui lòng chọn kênh liên hệ thuận tiện bên dưới để gửi đơn:
                </p>
              </div>

              {/* Tóm tắt đơn hàng */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Tóm tắt đơn hàng ({totalItems} món)
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 text-xs text-stone-700">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <span className="truncate">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold text-stone-900 flex-none">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Nút sao chép nội dung đơn */}
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="w-full mt-2 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 font-semibold">
                        Đã sao chép nội dung đơn hàng!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép thông tin đơn để tự gửi</span>
                    </>
                  )}
                </button>
              </div>

              {/* ── CÁC KÊNH LIÊN HỆ ĐẶT HÀNG ── */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Chọn kênh đặt hàng ưu tiên:
                </p>

                {/* 1. ZALO (Dùng thẻ <a> chuẩn, không dùng window.open, không popup blocker) */}
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectContactClick}
                  className="w-full p-4 bg-[#0068FF] hover:bg-[#0054cc] text-white rounded-xl shadow-md transition-all flex items-center justify-between group cursor-pointer block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-base">
                      Z
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold flex items-center gap-1.5">
                        Đặt hàng qua Zalo
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/30 rounded font-normal">
                          Khuyên dùng
                        </span>
                      </p>
                      <p className="text-xs text-white/80">
                        Tự copy đơn • Nhắn Zalo: {HOTLINE}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </a>

                {/* 2. FACEBOOK MESSENGER (Dùng thẻ <a> chuẩn) */}
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectContactClick}
                  className="w-full p-4 bg-[#0866FF] hover:bg-[#0052cc] text-white rounded-xl shadow-md transition-all flex items-center justify-between group cursor-pointer block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">
                        Nhắn tin Fanpage Facebook
                      </p>
                      <p className="text-xs text-white/80">
                        Fanpage: Tranh Xương Lá Bồ Đề
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </a>

                {/* 3. HOTLINE / GỌI ĐIỆN */}
                <a
                  href={HOTLINE_TEL}
                  onClick={() => setIsOpen(false)}
                  className="w-full p-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-md transition-all flex items-center justify-between group block cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-accent">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">
                        Gọi Hotline chốt đơn trực tiếp
                      </p>
                      <p className="text-xs text-accent font-semibold">
                        {HOTLINE} (Hỗ trợ 24/7)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-white/10 rounded-lg group-hover:bg-white/20 font-medium transition-colors">
                    Gọi ngay
                  </span>
                </a>
              </div>

              {/* Cam kết giao hàng & thanh toán */}
              <div className="pt-2 text-[11px] text-stone-500 space-y-1 text-center">
                <p>✓ Nhận hàng kiểm tra ưng ý mới thanh toán (COD toàn quốc)</p>
                <p>✓ Đóng gói bọc xốp chống sốc gỗ chuyên dụng</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
