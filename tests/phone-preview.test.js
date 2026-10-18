import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {iphonePreviewHTML,phoneShowcase,PHONE_PLATFORMS} from '../public/phone-preview.js';
test('each phone channel has its own layout and all preview assets exist',()=>{const markers=['d-reel-content','d-feed-image','d-youtube-player'];for(const [i,platform] of PHONE_PLATFORMS.entries()){const html=iphonePreviewHTML('creator','An example',platform);assert.ok(html.includes(markers[i]),platform);assert.ok(html.includes('d-island'));for(const [,src] of html.matchAll(/src="(\/[^"\s]+)"/g))assert.ok(fs.existsSync(new URL('../public'+src,import.meta.url)),src);}});
test('phone previews escape caption text and reject unknown assets and channels',()=>{const html=iphonePreviewHTML('../private','<img src=x onerror=alert(1)>','Untrusted');assert.ok(!html.includes('../private'));assert.ok(!html.includes('<img src=x'));assert.match(html,/&lt;img/);assert.match(html,/d-reel-content/);});
test('showcase starts with one selected channel and discloses illustrative status',()=>{const html=phoneShowcase();assert.equal((html.match(/aria-pressed="true"/g)||[]).length,1);assert.equal((html.match(/data-action="phone-platform"/g)||[]).length,3);assert.match(html,/Not published or connected/);assert.match(html,/interfaces and device displays can vary/);});
