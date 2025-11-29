const fs = require('fs')
const path = require('path')

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

const iconDir = path.join(__dirname, '../public/icons')

// Create a simple SVG for each size
sizes.forEach(size => {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="64" fill="#0d4a4a"/>
  <rect x="32" y="32" width="448" height="448" rx="32" stroke="#d4a055" stroke-width="8" fill="none"/>
  <text x="256" y="280" font-family="Arial, sans-serif" font-weight="bold" font-size="180" fill="#d4a055" text-anchor="middle" dominant-baseline="middle">TV</text>
  <text x="256" y="380" font-family="Arial, sans-serif" font-weight="600" font-size="32" fill="#d4a055" text-anchor="middle" letter-spacing="8">MERCH</text>
</svg>`

  fs.writeFileSync(
    path.join(iconDir, `icon-${size}x${size}.svg`),
    svg
  )

  console.log(`Created icon-${size}x${size}.svg`)
})

console.log('\n✅ Icon generation complete!')
console.log('📝 Note: SVG icons created. For production, convert to PNG using:')
console.log('   - Online converter like cloudconvert.com')
console.log('   - Or use ImageMagick: convert icon.svg -resize 512x512 icon-512x512.png')
