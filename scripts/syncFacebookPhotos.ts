/**
 * Facebook Graph API → Cloudinary Image Sync Script
 *
 * Usage:
 *   FACEBOOK_TOKEN=<token> ALBUM_ID=<id> CLOUDINARY_CLOUD_NAME=<name> \
 *   CLOUDINARY_API_KEY=<key> CLOUDINARY_API_SECRET=<secret> \
 *   npx tsx scripts/syncFacebookPhotos.ts
 *
 * This script:
 * 1. Fetches all photos from a Facebook Page album via Graph API v19.0
 * 2. Handles cursor-based pagination (1000+ photos)
 * 3. Uploads each photo to Cloudinary
 * 4. Outputs a JSON mapping file for Next.js consumption
 */

import https from "https";
import fs from "fs";
import path from "path";

// ── Config ────────────────────────────────────────────────────────────────────

const FB_TOKEN = process.env.FACEBOOK_TOKEN || "";
const ALBUM_ID = process.env.ALBUM_ID || "";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUD_KEY = process.env.CLOUDINARY_API_KEY || "";
const CLOUD_SECRET = process.env.CLOUDINARY_API_SECRET || "";

const OUTPUT_FILE = path.resolve(__dirname, "../data/cloudinary-map.json");
const UPLOAD_FOLDER = "bode-gallery/products";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FbPhoto {
  id: string;
  source: string; // Full-res image URL
  name?: string;
}

interface FbPagingCursor {
  before: string;
  after: string;
}

interface FbApiResponse {
  data: FbPhoto[];
  paging?: {
    cursors: FbPagingCursor;
    next?: string;
  };
}

interface CloudinaryResult {
  fbId: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function httpGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(body));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function fetchAllPhotos(): Promise<FbPhoto[]> {
  const photos: FbPhoto[] = [];
  let url = `https://graph.facebook.com/v19.0/${ALBUM_ID}/photos?fields=source,name&limit=100&access_token=${FB_TOKEN}`;

  let page = 1;
  while (url) {
    console.log(`  📄 Page ${page}...`);
    const raw = await httpGet(url);
    const data: FbApiResponse = JSON.parse(raw);

    if (data.data) {
      photos.push(...data.data);
    }

    url = data.paging?.next || "";
    page++;
  }

  return photos;
}

async function uploadToCloudinary(
  imageUrl: string,
  publicId: string
): Promise<any> {
  // Using Cloudinary's upload API via fetch-based URL upload
  const timestamp = Math.round(Date.now() / 1000);

  // Build signature string
  const crypto = await import("crypto");
  const signStr = `folder=${UPLOAD_FOLDER}&public_id=${publicId}&timestamp=${timestamp}${CLOUD_SECRET}`;
  const signature = crypto
    .createHash("sha1")
    .update(signStr)
    .digest("hex");

  const formData = new URLSearchParams();
  formData.append("file", imageUrl);
  formData.append("public_id", publicId);
  formData.append("folder", UPLOAD_FOLDER);
  formData.append("timestamp", String(timestamp));
  formData.append("api_key", CLOUD_KEY);
  formData.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Validate env
  if (!FB_TOKEN || !ALBUM_ID) {
    console.error(
      "❌ Missing FACEBOOK_TOKEN or ALBUM_ID environment variables."
    );
    console.error("   Set them before running this script.");
    process.exit(1);
  }

  if (!CLOUD_NAME || !CLOUD_KEY || !CLOUD_SECRET) {
    console.error(
      "❌ Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET."
    );
    process.exit(1);
  }

  console.log("🔍 Fetching photos from Facebook album...");
  const photos = await fetchAllPhotos();
  console.log(`✅ Found ${photos.length} photos.`);

  const results: CloudinaryResult[] = [];
  let uploaded = 0;
  let failed = 0;

  for (const photo of photos) {
    try {
      const publicId = `fb-${photo.id}`;
      console.log(
        `  ⬆️  [${uploaded + failed + 1}/${photos.length}] Uploading ${publicId}...`
      );

      const result = await uploadToCloudinary(photo.source, publicId);

      results.push({
        fbId: photo.id,
        publicId: result.public_id,
        secureUrl: result.secure_url,
        width: result.width,
        height: result.height,
      });

      uploaded++;
    } catch (err) {
      console.error(`  ❌ Failed to upload ${photo.id}:`, err);
      failed++;
    }

    // Rate-limit: small delay between uploads
    await new Promise((r) => setTimeout(r, 200));
  }

  // Write output
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n🎉 Done!`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
