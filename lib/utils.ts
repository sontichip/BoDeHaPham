import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

const GITHUB_CDN_BASE = 'https://raw.githubusercontent.com/sontichip/BoDeHaPham/main/public';

/**
 * Chuyển đổi đường dẫn ảnh:
 * - Ảnh ngoài (Unsplash): giữ nguyên
 * - Ảnh nội bộ (/images/products/...):
 *   + Khi deploy production: tải trực tiếp từ GitHub CDN (raw.githubusercontent.com)
 *     giúp tải mượt mà, siêu tốc, không bao giờ bị lỗi 404 do đường dẫn con của GitHub Pages
 *   + Khi chạy dev local: dùng đường dẫn tĩnh gốc
 */
export function getAssetUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS) {
    return `${GITHUB_CDN_BASE}${cleanPath}`;
  }

  return cleanPath;
}
