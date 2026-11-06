import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTornPath, VARIANT_Y_VALUES } from './tornPath.js';
import { images } from '../data/images.js';
import { services } from '../data/services.js';
import { artists } from '../data/artists.js';
import { reviews } from '../data/reviews.js';
import { galleryItems } from '../data/gallery.js';

test('Torn path generates valid SVG path data', () => {
  const path1 = buildTornPath(1, false);
  assert.ok(path1.startsWith('M 0'), 'Torn bottom path should start with M 0');
  assert.ok(path1.includes('Z'), 'Torn path should be closed with Z');

  const pathTop = buildTornPath(2, true);
  assert.ok(pathTop.startsWith('M 0 0 L 1440 0'), 'Torn top path should start at origin');
  assert.ok(pathTop.endsWith('Z'), 'Torn top path should close with Z');

  assert.equal(VARIANT_Y_VALUES[1].length, 48, 'Variant 1 should contain 48 hand-tuned points');
  assert.equal(VARIANT_Y_VALUES[2].length, 48, 'Variant 2 should contain 48 hand-tuned points');
  assert.equal(VARIANT_Y_VALUES[3].length, 48, 'Variant 3 should contain 48 hand-tuned points');
});

test('Image manifest integrity and public path references', () => {
  assert.ok(images.hero, 'hero image must exist');
  assert.ok(images.about01, 'about01 image must exist');
  assert.ok(images.aboutHero, 'aboutHero image must exist');
  assert.ok(images.contact, 'contact image must exist');

  // Verify all image URLs reference Unsplash or /temp/
  for (const [key, val] of Object.entries(images)) {
    assert.ok(val.src.startsWith('https://') || val.src.startsWith('/temp/'), `Image ${key} src must be a valid URL or path`);
    assert.ok(val.alt && val.alt.length > 5, `Image ${key} must have descriptive alt text`);
  }
});

test('Services dataset meets criteria', () => {
  assert.equal(services.length, 6, 'Must have exactly 6 services');
  const imgDict = images as Record<string, { src: string; alt: string }>;
  for (const s of services) {
    assert.ok(s.id, 'Service must have an id');
    assert.ok(s.title, 'Service must have a title');
    assert.ok(s.meta, 'Service must have timing & pricing metadata');
    assert.ok(imgDict[s.imageKey], `Service ${s.id} imageKey must exist in images.js`);
  }
});

test('Artists dataset meets criteria', () => {
  assert.equal(artists.length, 4, 'Must have exactly 4 resident artists');
  const names = artists.map((a) => a.name);
  assert.deepEqual(names, ['RUDRA', 'ZOYA', 'KABIR', 'MIRA']);
});

test('Reviews dataset meets exact copy guidelines', () => {
  assert.equal(reviews.length, 6, 'Must have exactly 6 customer reviews');
  assert.equal(reviews[0].name, 'ISHITA K.');
  assert.equal(reviews[1].name, 'ROHAN M.');
  assert.equal(reviews[2].name, 'MEERA S.');
  assert.equal(reviews[3].name, 'KABIR A.');
  assert.equal(reviews[4].name, 'AANYA P.');
  assert.equal(reviews[5].name, 'DEV R.');
});

test('Gallery items map to valid categories and images', () => {
  assert.ok(galleryItems.length >= 10, 'Gallery must have at least 10 items');
  const imgDict = images as Record<string, { src: string; alt: string }>;
  for (const item of galleryItems) {
    assert.ok(imgDict[item.imageKey], `Gallery item ${item.id} imageKey must exist in images`);
    assert.ok(item.category, `Gallery item ${item.id} must have a category`);
  }
});
