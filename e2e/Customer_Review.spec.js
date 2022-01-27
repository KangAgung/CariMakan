/* eslint-disable no-undef */

const assert = require('assert');

Feature('Show and Add a Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('show customer review', async ({ I }) => {
  I.seeElement('card-item');
  I.click(locate('.card-action a').first());

  I.seeElement('#customerReview');
  I.scrollTo('#customerReview');

  I.see('Customer Reviews', '.card-title');
  I.see('Ahmad', '.card-title');
  I.see('13 November 2019', 'small');
  I.see('Tidak rekomendasi untuk pelajar!', '.card-action p');
});

Scenario('Add a review', async ({ I }) => {
  I.seeElement('card-item');
  I.click(locate('.card-action a').first());

  I.seeElement('#reviewForm');
  I.scrollTo('#reviewForm');

  I.see('Add Review', '.card-title');
  I.seeElement('form');
  I.seeElement('input[name="name"]');
  I.seeElement('textarea[name="review"]');
  I.seeElement('input[type="submit"]');
  I.scrollPageToBottom();

  const name = 'Tester';
  const review = 'Cobain aja dulu, nanti juga ketagihan';
  I.fillField('input[name="name"]', name);
  I.fillField('textarea[name="review"]', review);

  I.seeInField('input[name="name"]', name);
  I.seeInField('textarea[name="review"]', review);

  I.click('input[type="submit"]');

  I.seeInField('input[name="name"]', '');
  I.seeInField('textarea[name="review"]', '');

  const lastReviewerName = locate('.card-content .card-title').at(-2);
  const lastReview = locate('.card-action p').last();

  const textLastReviewerName = await I.grabTextFrom(lastReviewerName);
  const textLastReview = await I.grabTextFrom(lastReview);

  assert.strictEqual(`${name}`, textLastReviewerName);
  assert.strictEqual(`${review}`, textLastReview);
});
