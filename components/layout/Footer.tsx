export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/60 py-12 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Bồ Đề Art. Thủ công · Độc bản · Vĩnh cửu.</p>
        <div className="flex items-center gap-6">
          <a href="tel:0915883318" className="hover:text-stone-900 transition-colors">
            Hotline: 0915.883.318
          </a>
          <a
            href="https://zalo.me/0915883318"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 transition-colors"
          >
            Zalo: 0915.883.318
          </a>
          <a
            href="https://www.facebook.com/tranhxuonglabodehapham"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 transition-colors"
          >
            Facebook: Tranh Xương Lá Bồ Đề
          </a>
        </div>
      </div>
    </footer>
  );
}
