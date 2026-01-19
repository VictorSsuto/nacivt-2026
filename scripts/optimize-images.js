import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const srcDir = path.resolve('src/assets')
const outDir = path.resolve('src/assets/optimized')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png)$/i.test(f))

async function run() {
  for (const file of files) {
    const input = path.join(srcDir, file)
    const name = path.parse(file).name
    try {
      await sharp(input)
        .resize({ width: 1600 })
        .webp({ quality: 80 })
        .toFile(path.join(outDir, `${name}.webp`))

      await sharp(input)
        .resize({ width: 1600 })
        .avif({ quality: 50 })
        .toFile(path.join(outDir, `${name}.avif`))

      console.log(`Optimized ${file} → ${name}.webp, ${name}.avif`)
    } catch (err) {
      console.error(`Failed to optimize ${file}:`, err.message)
    }
  }
}

run().catch(err => console.error(err))
