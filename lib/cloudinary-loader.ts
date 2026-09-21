/**
 * Cloudinary Custom Loader for next/image.
 *
 * If `src` is already a full URL (Unsplash, etc.), it passes through unchanged.
 * If `src` is a Cloudinary public_id, constructs an optimized delivery URL.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const q = quality || 'auto';
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}
