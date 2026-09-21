export type Category = 'leaves' | 'wall-art' | 'desk-art' | 'zodiac' | 'calligraphy';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  category: Category;
  imageUrls: string[];
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'Tất cả',
  leaves: 'Lá Bồ Đề',
  'wall-art': 'Tranh Treo Tường',
  'desk-art': 'Tranh Để Bàn',
  zodiac: 'Con Giáp',
  calligraphy: 'Thư Pháp',
};
