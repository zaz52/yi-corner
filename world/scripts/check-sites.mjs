import assert from 'node:assert/strict'
import fs from 'node:fs'

const root = new URL('../', import.meta.url)
const catalog = JSON.parse(fs.readFileSync(new URL('sources/data/site-catalog.json', root), 'utf8'))
assert.equal(new Set(catalog.map(site => site.id)).size, catalog.length)
const urls = catalog.filter(site => site.url).map(site => site.url.replace(/\/$/, ''))
assert.equal(new Set(urls).size, urls.length)
for (const site of catalog) {
    assert.match(site.title, /[\u4e00-\u9fff]/)
    if (site.url) assert.equal(new URL(site.url).protocol, 'https:')
}
assert.equal(catalog.find(site => site.id === 'shop').url, 'https://999.lsrai.shop/')
assert.equal(new URL(catalog.find(site => site.id === 'cinema').url).hostname, 'weiyi.indevs.in')
const source = fs.readFileSync(new URL('sources/Game/SiteDirectory.js', root), 'utf8')
    .replace("import catalog from '../data/site-catalog.json'", `const catalog = ${JSON.stringify(catalog)}`)
const { filterSites } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'))
assert.equal(filterSites('苍柏').length, 1)
assert.equal(filterSites('  ZHITU  ')[0].title, '知图 · 知识图书馆')
assert.equal(filterSites('不存在的站点').length, 0)
for (const category of new Set(catalog.map(site => site.category))) {
    assert.ok(filterSites('', category).length > 0)
    assert.ok(filterSites('', category).every(site => site.category === category))
}
console.log(`PASS: ${catalog.length} entries, ${urls.length} source URLs; unique IDs, Chinese titles, search and categories`)
