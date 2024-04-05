const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('checks normalized url of https://blog.boot.dev/path/', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('checks normalized url of https://blog.boot.dev/path/another', () => {
  expect(normalizeURL('https://blog.boot.dev/path/another')).toBe('blog.boot.dev/path/another');
});

test('checks normalized url of http://blog.boot.dev/path/another', () => {
  expect(normalizeURL('http://boot.dev/path/another')).toBe('boot.dev/path/another');
});
