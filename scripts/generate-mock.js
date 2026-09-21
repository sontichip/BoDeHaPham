const fs = require('fs');

const baseProducts = [
  { name: 'Lá Thư Pháp Chữ Tâm', cat: 'calligraphy', price: 2450000, old: 2800000 },
  { name: 'Lá Con Giáp Giáp Thìn Mạ Vàng', cat: 'zodiac', price: 3200000, old: null },
  { name: 'Tranh Để Bàn Mandala Xương Lá', cat: 'desk-art', price: 1850000, old: null },
  { name: 'Thư Pháp An Nhiên Trên Lá Cổ', cat: 'calligraphy', price: 1650000, old: null },
  { name: 'Tranh Lá Bồ Đề Khổ Lớn A2', cat: 'wall-art', price: 2800000, old: null },
  { name: 'Lá Bồ Đề Skeleton Nguyên Bản', cat: 'leaves', price: 850000, old: 1100000 },
  { name: 'Lá Con Giáp Ất Tỵ Mạ Vàng 24K', cat: 'zodiac', price: 2900000, old: null },
  { name: 'Khung Để Bàn Xương Lá Zen', cat: 'desk-art', price: 1200000, old: null },
  { name: 'Bộ Tranh Tứ Quý Tùng Trúc Cúc Mai', cat: 'wall-art', price: 3100000, old: null },
  { name: 'Hộp Quà 3 Phiến Xương Lá May Mắn', cat: 'leaves', price: 250000, old: null }
];

const images = [
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop'
];

// Helper to remove accents for slug
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

let products = [];
for (let i = 1; i <= 40; i++) {
  const base = baseProducts[i % baseProducts.length];
  const cleanName = removeAccents(base.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = cleanName + '-' + i;
  const img1 = images[i % images.length];
  const img2 = images[(i + 3) % images.length];
  
  const price = base.price + ((i%5) * 50000);
  const original_price = base.old ? base.old + ((i%5) * 50000) : undefined;
  
  products.push({
    id: i,
    name: base.name + (i > 10 ? ' (Bản ' + i + ')' : ''),
    slug: slug,
    price: price,
    original_price: original_price,
    category: base.cat,
    imageUrls: [img1, img2],
    description: 'Tác phẩm nghệ thuật Bồ Đề phiên bản giới hạn (' + i + '/40). Chế tác thủ công tinh xảo, giữ nguyên đường gân tự nhiên mang lại bình an. Thích hợp làm quà tặng cao cấp hoặc trang trí không gian thiền định.',
    stock: Math.floor(Math.random() * 8) // 0 to 7
  });
}

const fileContent = `import type { Product } from '@/types';

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.slice(0, limit);
}
`;

fs.writeFileSync('C:/BoDe/lib/mock-data.ts', fileContent);
console.log('Generated 40 products');
