import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getProductBySlug, getProductsByCategory, PRODUCTS } from "@/lib/mock-data";
import { CATEGORY_LABELS } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductActions } from "@/components/ProductActions";
import { formatPrice } from "@/lib/utils";

// Hỗ trợ Static Export cho GitHub Pages
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export const revalidate = false; // Tắt ISR khi xuất static

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Không tìm thấy" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      images: product.imageUrls[0]
        ? [{ url: product.imageUrls[0], width: 1200, height: 630, alt: product.name }]
        : [],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* Breadcrumb */}
      <nav className="py-4 md:py-6 flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap scrollbar-none">
        <Link href="/" prefetch={false} className="hover:text-stone-900 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-stone-700">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-stone-900 truncate">
          {product.name}
        </span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pb-24">
        {/* Images Column */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200/60 shadow-sm">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Nhãn dán trên trang chi tiết */}
            {product.original_price && (
               <div className="absolute top-4 left-4">
                 <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1.5 bg-red-50 text-red-600 rounded-sm border border-red-100 shadow-sm">
                   Giảm Giá
                 </span>
               </div>
            )}
          </div>
          
          {product.imageUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.imageUrls.slice(1).map((url, i) => (
                <div key={i} className="relative aspect-square bg-stone-100 rounded-md overflow-hidden border border-stone-200/60 cursor-pointer hover:border-accent transition-colors">
                  <Image
                    src={url}
                    alt={`${product.name} - ảnh ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 25vw, 12vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
              {product.name}
            </h1>
            
            {/* Đánh giá giả (Fake Reviews) */}
            <div className="flex items-center gap-2 mt-2">
               <div className="flex items-center text-amber-500">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-4 h-4 fill-current" />
                 ))}
               </div>
               <span className="text-sm text-stone-500">(12 đánh giá)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 py-4 border-y border-stone-200/60">
            <span className="text-2xl sm:text-3xl font-semibold text-accent">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-base text-stone-400 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm font-medium">
             Tình trạng: 
             <span className={product.stock > 0 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
               {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
             </span>
          </p>

          {/* Nút hành động */}
          <div className="pt-2">
            <ProductActions product={product} />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-stone-200/60 text-sm text-stone-600">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-stone-900">📦 Giao hàng toàn quốc</span>
              <span className="text-xs">Nhận hàng trong 2-5 ngày</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-stone-900">🛡️ Bảo hành 5 năm</span>
              <span className="text-xs">Đổi mới nếu lỗi kỹ thuật</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-stone-900">✨ Chế tác thủ công</span>
              <span className="text-xs">Bởi nghệ nhân lành nghề</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-stone-900">💳 Đổi trả dễ dàng</span>
              <span className="text-xs">Trong vòng 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tác phẩm liên quan */}
      {related.length > 0 && (
        <section className="py-20 border-t border-stone-200/80">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
              Có thể bạn sẽ thích
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
