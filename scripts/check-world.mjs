import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import worker from '../worker/index.js';

const assetRequests = [];
const env = {
  ASSETS: { fetch: async request => {
    assetRequests.push(new URL(request.url).pathname);
    return new Response('<html>world asset</html>', { headers: { 'Content-Type': 'text/html' } });
  } },
  PROJECTS_KV: { get: async () => null }
};
const scene = await worker.fetch(new Request('https://weiyiai.top/world/'), env, {});
assert.equal(await scene.text(), '<html>world asset</html>');
assert.deepEqual(assetRequests, ['/world/']);
const redirect = await worker.fetch(new Request('https://weiyiai.top/world'), env, {});
assert.equal(redirect.status, 302);
assert.equal(redirect.headers.get('location'), 'https://weiyiai.top/world/');
const projects = await worker.fetch(new Request('https://weiyiai.top/api/projects'), env, {});
assert.equal(projects.status, 200);
assert.match(projects.headers.get('content-type'), /json/);
const projectData = await projects.json();
assert.ok(Array.isArray(projectData));
assert.ok(projectData.length > 0);
const manifest = JSON.parse(await readFile(new URL('../world/asset-manifest.json', import.meta.url)));
assert.ok(manifest.files.every(file => file.size < 25 * 1024 * 1024 && !file.path.endsWith('.wav')));
for (const file of manifest.files) {
  assert.equal((await stat(new URL(`../dist/world/${file.path}`, import.meta.url))).size, file.size, file.path);
}
const html = await readFile(new URL('../dist/world/index.html', import.meta.url), 'utf8');
assert.match(html, /lang="zh-CN"/);
assert.match(html, /壹隅/);
console.log(`PASS: world routing, classic API, ${manifest.files.length} deployment assets and Chinese entry`);
