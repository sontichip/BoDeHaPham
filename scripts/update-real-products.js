const fs = require('fs');

// 5 Sản phẩm thật từ ảnh người dùng tải lên
const realProducts = [
  {
    id: 1,
    name: "Lá Bồ Đề Mạ Vàng Quán Thế Âm - Vạn Sự Bình An",
    slug: "la-bo-de-quan-the-am-van-su-binh-an",
    price: 150000,
    original_price: 200000,
    category: "leaves",
    imageUrls: [
      "/images/products/la-bo-de-van-su-binh-an.jpg",
      "/images/products/la-bo-de-loi-phat-day-tua-rua.jpg"
    ],
    description: "Lá bồ đề mạ vàng ép plastic cao cấp in hình Phật Bà Quan Âm và thư pháp Vạn Sự Bình An. Thích hợp để ốp lưng điện thoại, ví tiền, bàn thờ hoặc mang theo bên mình cầu bình an, may mắn và hộ mệnh.",
    stock: 88
  },
  {
    id: 2,
    name: "Lá Bồ Đề Thư Pháp Cha - Kèm Hộp Gấm Cao Cấp",
    slug: "la-bo-de-thu-phap-cha",
    price: 250000,
    original_price: 300000,
    category: "calligraphy",
    imageUrls: [
      "/images/products/la-bo-de-thu-phap-cha.jpg",
      "/images/products/la-bo-de-thu-phap-me.jpg"
    ],
    description: "Thư pháp chữ Cha nghệ thuật trên xương lá bồ đề mạ vàng: 'Cha là Bầu trời, Con là Hạt Bụi / Con lăn vào Cha từ bé đến muôn đời!'. Đựng trong hộp gấm nhung sang trọng, món quà báo hiếu ý nghĩa và thiêng liêng.",
    stock: 35
  },
  {
    id: 3,
    name: "Lá Bồ Đề Thư Pháp Mẹ - Kèm Hộp Gấm Cao Cấp",
    slug: "la-bo-de-thu-phap-me",
    price: 250000,
    original_price: 300000,
    category: "calligraphy",
    imageUrls: [
      "/images/products/la-bo-de-thu-phap-me.jpg",
      "/images/products/la-bo-de-thu-phap-cha.jpg"
    ],
    description: "Thư pháp chữ Mẹ dáng gánh gồng trên xương lá bồ đề mạ vàng: 'Đường đời sương gió ngút ngàn / Vì con hạnh phúc chẳng từ gian nan'. Món quà tri ân đấng sinh thành sâu sắc.",
    stock: 42
  },
  {
    id: 4,
    name: "Lá Bồ Đề Treo Xe Lời Phật Dạy - Tua Rua Vàng Phong Thủy",
    slug: "la-bo-de-treo-xe-loi-phat-day",
    price: 180000,
    original_price: 220000,
    category: "leaves",
    imageUrls: [
      "/images/products/la-bo-de-loi-phat-day-tua-rua.jpg",
      "/images/products/la-bo-de-van-su-binh-an.jpg"
    ],
    description: "Lá bồ đề mạ vàng in kinh Phật: 'Không làm các việc ác - Chăm làm các việc lành - Giữ tâm ý trong sạch - Là lời chư Phật dạy'. Kèm dây thắt cát tường tua rua vàng phong thủy treo ô tô, góc học tập hoặc góc làm việc.",
    stock: 50
  },
  {
    id: 5,
    name: "Đại Tranh Mandala Xương Lá Bồ Đề Chữ Phúc Đỏ Khổ Lớn",
    slug: "dai-tranh-mandala-xuong-la-bo-de-chu-phuc",
    price: 4500000,
    original_price: 5200000,
    category: "wall-art",
    imageUrls: [
      "/images/products/tranh-treo-tuong-mandala-chu-phuc.jpg"
    ],
    description: "Kiệt tác tranh treo tường khổ lớn được kết thủ công tỉ mỉ từ hàng trăm phiến lá bồ đề vàng tự nhiên tỏa tròn đối xứng Mandala, điểm xuyết chữ Phúc thư pháp nhung đỏ nổi 3D ở tâm. Khung gỗ cao cấp viền chỉ vàng.",
    stock: 3
  }
];

const otherProductsTemplate = [
  { name: 'Lá Con Giáp Giáp Thìn Mạ Vàng', cat: 'zodiac', price: 3200000, old: 3500000 },
  { name: 'Tranh Để Bàn Mandala Xương Lá', cat: 'desk-art', price: 1850000, old: null },
  { name: 'Thư Pháp An Nhiên Trên Lá Cổ', cat: 'calligraphy', price: 1650000, old: null },
  { name: 'Tranh Lá Bồ Đề Khổ Lớn A2', cat: 'wall-art', price: 2800000, old: null },
  { name: 'Lá Bồ Đề Skeleton Nguyên Bản', cat: 'leaves', price: 850000, old: 1100000 },
  { name: 'Lá Con Giáp Ất Tỵ Mạ Vàng 24K', cat: 'zodiac', price: 2900000, old: null },
  { name: 'Khung Để Bàn Xương Lá Zen', cat: 'desk-art', price: 1200000, old: null },
  { name: 'Bộ Tranh Tứ Quý Tùng Trúc Cúc Mai', cat: 'wall-art', price: 3100000, old: null },
  { name: 'Hộp Quà 3 Phiến Xương Lá May Mắn', cat: 'leaves', price: 250000, old: null }
];

const fallbackImages = [
  '/images/products/la-bo-de-van-su-binh-an.jpg',
  '/images/products/la-bo-de-thu-phap-cha.jpg',
  '/images/products/la-bo-de-thu-phap-me.jpg',
  '/images/products/la-bo-de-loi-phat-day-tua-rua.jpg',
  '/images/products/tranh-treo-tuong-mandala-chu-phuc.jpg',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop'
];

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

let products = [...realProducts];

for (let i = 6; i <= 40; i++) {
  const base = otherProductsTemplate[(i - 6) % otherProductsTemplate.length];
  const cleanName = removeAccents(base.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = cleanName + '-' + i;
  const img1 = fallbackImages[(i - 6) % fallbackImages.length];
  const img2 = fallbackImages[(i - 5) % fallbackImages.length];
  
  const price = base.price + ((i % 4) * 50000);
  const original_price = base.old ? base.old + ((i % 4) * 50000) : undefined;
  
  products.push({
    id: i,
    name: base.name + ' (Mẫu ' + i + ')',
    slug: slug,
    price: price,
    original_price: original_price,
    category: base.cat,
    imageUrls: [img1, img2],
    description: 'Tác phẩm nghệ thuật Bồ Đề thủ công cao cấp (' + i + '/40). Chế tác tỉ mỉ từ xương lá bồ đề tự nhiên, mang lại năng lượng an lành và phúc khí.',
    stock: Math.floor(Math.random() * 8)
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
console.log('Updated mock-data.ts with real 5 products at top!');
