import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
const input = process.argv[2] || 'assets-originals';
const output = 'public/images';
await mkdir(output, { recursive: true });
const files = (await readdir(input)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const report = [];
for (const file of files) {
  const name = path.parse(file).name;
  const source = path.join(input, file);
  const sourceBytes = (await stat(source)).size;
  for (const width of [640, 1024, 1600]) {
    for (const format of ['avif', 'webp']) {
      const target = path.join(output, `${name}-${width}.${format}`);
      let pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true });
      pipeline =
        format === 'avif'
          ? pipeline.avif({ quality: 47, effort: 6 })
          : pipeline.webp({ quality: 73, effort: 5 });
      await pipeline.toFile(target);
      const bytes = (await stat(target)).size;
      report.push({
        asset: name,
        width,
        format,
        bytes,
        sourceBytes,
        savedPercent: Number(((1 - bytes / sourceBytes) * 100).toFixed(1)),
      });
    }
  }
}
await mkdir('docs', { recursive: true });
await writeFile('docs/image-budget.json', JSON.stringify(report, null, 2) + '\n');
console.table(
  report.map(({ asset, width, format, bytes, savedPercent }) => ({
    asset,
    width,
    format,
    kB: Math.round(bytes / 1024),
    savedPercent,
  })),
);
