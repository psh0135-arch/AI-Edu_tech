import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://psh0135-arch.github.io/AI-Edu_tech').replace(/\/$/, '')

const PAGES = [
  { loc: '/',        changefreq: 'weekly', priority: '1.0' },
  { loc: '/#webinar', changefreq: 'weekly', priority: '0.8' },
]

function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const today = new Date().toISOString().split('T')[0]

      const urls = PAGES.map(p => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml`

      fs.writeFileSync(path.resolve('dist', 'sitemap.xml'), xml, 'utf-8')
      fs.writeFileSync(path.resolve('dist', 'robots.txt'), robots, 'utf-8')
      console.log('✅ sitemap.xml + robots.txt 생성 완료 →', SITE_URL)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  base: process.env.VITE_BASE_PATH ?? '/AI-Edu_tech/',
})
