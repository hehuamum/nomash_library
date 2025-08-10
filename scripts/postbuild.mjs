import { copyFileSync, existsSync } from 'node:fs'

const src = 'dist/index.html'
const dest = 'dist/404.html'

if (!existsSync(src)) {
  console.error('dist/index.html not found. Ensure `vite build` ran before postbuild.')
  process.exit(1)
}

copyFileSync(src, dest)
console.log(`Copied ${src} -> ${dest}`)


