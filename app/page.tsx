import { HeroSection } from "@/components/HeroSection";
import { GallerySection } from "@/components/GallerySection";
import { PRODUCTS } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      {/* ── Hero: Full-screen split layout with parallax ────────── */}
      <HeroSection />

      {/* ── Gallery: Category filter + Product grid ─────────────── */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase text-neutral-400">
            Bộ sưu tập
          </p>
          <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-neutral-900">
            Tác Phẩm
          </h2>
        </div>

        <GallerySection products={PRODUCTS} />
      </section>
    </>
  );
}
