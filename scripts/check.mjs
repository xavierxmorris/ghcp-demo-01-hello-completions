import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const exports = {
  'src/utils.js': ['celsiusToFahrenheit', 'average', 'titleCase'],
  'src/buggy.js': ['isLeapYear'],
  'src/context.js': ['topUser'],
};

function parseModule(source, label) {
  const result = spawnSync(process.execPath, ['--input-type=module', '--check'], {
    input: source,
    encoding: 'utf8',
    timeout: 10_000,
  });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `${label}: ${result.stderr}`);
}

for (const [path, names] of Object.entries(exports)) {
  const source = readFileSync(new URL(path, root), 'utf8');
  parseModule(source, path);
  const module = await import(`data:text/javascript,${encodeURIComponent(source)}`);
  for (const name of names) {
    assert.equal(typeof module[name], 'function', `${path}: missing export ${name}`);
  }
}

for (const path of ['index.html', 'src/buggy.test.html']) {
  const url = new URL(path, root);
  const html = readFileSync(url, 'utf8');
  const scripts = [...html.matchAll(/<script\s+type="module">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${path}: expected one module entry point`);
  parseModule(scripts[0][1], path);
  const imports = [...scripts[0][1].matchAll(/from\s+['"](\.[^'"]+)['"]/g)];
  assert.ok(imports.length > 0, `${path}: missing local module import`);
  for (const [, relative] of imports) {
    readFileSync(new URL(relative, url), 'utf8');
  }
}

console.log('Starter module syntax, exports and page imports passed. Exercise answers are not assessed.');
