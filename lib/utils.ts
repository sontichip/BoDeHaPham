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

// Sử dụng domain GitHub Pages trực tiếp thay vì raw.githubusercontent.com
// vì raw.githubusercontent.com bị một số nhà mạng tại Việt Nam (Viettel, VNPT) chặn DNS/IP
const GITHUB_PAGES_BASE = 'https://sontichip.github.io/BoDeHaPham';

export function getAssetUrl(src: string): string {
  if (!src) return '';
  
  // Nếu là ảnh ngoài Unsplash thì giữ nguyên
  if (src.startsWith('https://images.unsplash.com')) {
    return src;
  }

  // Nếu là link raw.githubusercontent.com bị chặn ở VN, chuyển sang GitHub Pages
  if (src.includes('raw.githubusercontent.com/sontichip/BoDeHaPham/main/public')) {
    return src.replace(
      'https://raw.githubusercontent.com/sontichip/BoDeHaPham/main/public',
      GITHUB_PAGES_BASE
    );
  }

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  
  // Khi build production cho GitHub Pages
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS) {
    return `${GITHUB_PAGES_BASE}${cleanPath}`;
  }

  return cleanPath;
}
