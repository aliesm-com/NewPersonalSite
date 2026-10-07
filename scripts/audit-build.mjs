import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('dist');
async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      items.map((i) => (i.isDirectory() ? walk(path.join(dir, i.name)) : path.join(dir, i.name))),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const errors = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<h1[\s>]/.test(html)) errors.push(`Missing h1: ${file}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`Missing title: ${file}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const href = decodeURI(match[1]);
    if (href.startsWith('//')) continue;
    const target = path.join(root, href);
    const exists = files.includes(target) || files.includes(path.join(target, 'index.html'));
    if (!exists) errors.push(`Broken local link in ${path.relative(root, file)}: ${href}`);
  }
}
const sizes = await Promise.all(
  files
    .filter((f) => /\.(js|css|avif|webp|woff2)$/.test(f))
    .map(async (f) => {
      const b = await readFile(f);
      return {
        path: path.relative(root, f),
        bytes: b.length,
        gzipBytes: /\.(js|css)$/.test(f) ? gzipSync(b).length : undefined,
      };
    }),
);
for (const f of sizes.filter((f) => /\.(avif|webp)$/.test(f.path)))
  if (f.bytes > 220 * 1024) errors.push(`Image exceeds 220 KiB: ${f.path}`);
const home = await readFile(path.join(root, 'index.html'), 'utf8');
if (home.includes('astro-island')) errors.push('Home should not hydrate React.');
const report = {
  generatedAt: new Date().toISOString(),
  htmlPages: htmlFiles.length,
  errors,
  totalPublicAssetBytes: sizes.reduce((n, f) => n + f.bytes, 0),
  largestImage: sizes
    .filter((f) => /\.(avif|webp)$/.test(f.path))
    .sort((a, b) => b.bytes - a.bytes)[0],
  javascriptGzipBytes: sizes
    .filter((f) => f.path.endsWith('.js'))
    .reduce((n, f) => n + (f.gzipBytes || 0), 0),
  assets: sizes,
};
await writeFile('docs/build-report.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, assets: undefined }, null, 2));
if (errors.length) process.exit(1);
