import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://psh0135-arch.github.io/AI-Edu_tech'

function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const today = new Date().toISOString().split('T')[0]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
      const distPath = path.resolve('dist', 'sitemap.xml')
      fs.writeFileSync(distPath, xml, 'utf-8')
      console.log('✅ sitemap.xml 생성 완료:', distPath)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  base: '/AI-Edu_tech/',
})
