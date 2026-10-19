import test from 'node:test';
import assert from 'node:assert/strict';
import {marketingPage, marketingTitle, websiteHeader} from '../public/marketing.js';
import {createHandler} from '../worker/index.js';

test('audience pages show distinct task displays instead of the homepage graph', () => {
  const expected = {'content-creators':'clip-timeline','for-businesses':'business-planner','for-ecommerce':'product-formats',agencies:'agency-deliverables'};
  for (const [page, display] of Object.entries(expected)) {
    const html = marketingPage(page);
    assert.ok(html.includes(`data-display="${display}"`), page);
    assert.ok(!html.includes('drop-connection-art'), page);
    assert.equal((html.match(/<h1>/g)||[]).length, 1);
    assert.ok(!html.includes('undefined'));
  }
});
test('account links distinguish sign-up and sign-in for anonymous and returning users', () => {
  for (const user of [null, {id:'u',name:'User'}]) {
    const html = websiteHeader('welcome', user);
    assert.match(html, /href="\/signup">Sign up/);
    assert.match(html, /href="\/signin">Sign in/);
    assert.ok(!html.includes('My account'));
    assert.ok(!html.includes('Plans &amp; availability'));
  }
  assert.equal(marketingTitle('pricing'), 'Drop · Pricing');
});
test('account entry pages use secure existing authentication without collecting passwords', () => {
  for (const page of ['signup','signin']) {
    const html = marketingPage(page);
    assert.ok(html.includes('/signin-with-chatgpt?return_to=%2Fworkspace'));
    assert.ok(!html.includes('type="password"'));
    assert.equal((html.match(/<h1>/g)||[]).length, 1);
  }
  assert.notEqual(marketingPage('signup'),marketingPage('signin'));
});
test('account entry routes are public while the workspace stays protected', async () => {
  const handler = createHandler({'/index.html':{data:btoa('<main>Drop</main>')}});
  for (const path of ['/signup','/signin','/pricing']) {
    const response = await handler(new Request('https://drop.test'+path));
    assert.equal(response.status,200,path);
    assert.equal(await response.text(),'<main>Drop</main>');
  }
  const response = await handler(new Request('https://drop.test/workspace'));
  assert.equal(response.status,303);
});
