// scripts/compress-peta.mjs
// Jalankan: node scripts/compress-peta.mjs
// Mengompres public/images/peta.jpg ke public/images/peta.webp (<300KB)

import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath  = join(__dirname, '../public/images/peta.jpg');
const outputPath = join(__dirname, '../public/images/peta.webp');

if (!existsSync(inputPath)) {
  console.error('❌ File tidak ditemukan:', inputPath);
  process.exit(1);
}

const originalSize = statSync(inputPath).size;
console.log(`📁 Input:  ${inputPath}`);
console.log(`📦 Ukuran asli: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

await sharp(inputPath)
  .resize({ width: 1920, withoutEnlargement: true }) // cap resolusi di 1920px wide
  .webp({ quality: 72, effort: 6 })                   // quality 72 = good balance visually
  .toFile(outputPath);

const newSize = statSync(outputPath).size;
console.log(`\n✅ Output: ${outputPath}`);
console.log(`📦 Ukuran baru: ${(newSize / 1024).toFixed(1)} KB  (${Math.round((1 - newSize / originalSize) * 100)}% lebih kecil)`);

if (newSize > 300 * 1024) {
  console.warn(`⚠️  Masih di atas 300KB, mencoba quality 55...`);
  await sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 55, effort: 6 })
    .toFile(outputPath);
  const recompressedSize = statSync(outputPath).size;
  console.log(`📦 Ukuran setelah rekompresi: ${(recompressedSize / 1024).toFixed(1)} KB`);
}

console.log('\n✨ Selesai! Update src/components/Hero.jsx untuk pakai peta.webp');
