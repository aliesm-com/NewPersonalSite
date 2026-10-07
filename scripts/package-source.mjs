import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const output = path.resolve('deliverables/ali-esmaeili-astro-react.zip');
mkdirSync(path.dirname(output), { recursive: true });
const script = `import pathlib, zipfile, sys
root=pathlib.Path.cwd()
out=pathlib.Path(sys.argv[1])
allowed=['src','public','scripts','docs','package.json','package-lock.json','astro.config.mjs','tsconfig.json','README.md','README.fa.md','.env.example','.gitignore','.prettierrc.json']
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for item in allowed:
        p=root/item
        if not p.exists(): continue
        files=sorted(p.rglob('*')) if p.is_dir() else [p]
        for f in files:
            if not f.is_file() or 'downloads' in f.relative_to(root).parts: continue
            z.write(f,pathlib.Path('ali-esmaeili-portfolio')/f.relative_to(root))
print(str(out))
`;
const result = spawnSync('python3', ['-c', script, output], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);
