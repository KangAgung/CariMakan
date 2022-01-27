/* eslint-disable no-undef */

const assert = require('assert');

Feature('Add and Remove Restaurants from Favored Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('show empty favored restaurants', async ({ I }) => {
  I.click(locate('li a').at(2));

  I.see('Tidak ada restoran yang disimpan.', '#errorMessage');
});

Scenario('Add a Restaurant into favoured restaurant', async ({ I }) => {
  I.seeElement('card-item');

  const firstRestaurant = locate('.card-title .resto-title').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(locate('.card-action a').first());

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('card-item');

  const savedRestaurantName = await I.grabTextFrom('.card-title .resto-title');

  assert.strictEqual(firstRestaurantName, savedRestaurantName);
});

Scenario('Delete a Restaurant from favoured restaurant', async ({ I }) => {
  I.seeElement('card-item');

  const firstRestaurant = locate('.card-title .resto-title').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(locate('.card-action a').first());

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('card-item');

  const savedRestaurantName = await I.grabTextFrom('.card-title .resto-title');

  assert.strictEqual(firstRestaurantName, savedRestaurantName);

  const firstFavoredRestaurant = locate('.card-action a').first();

  I.click(firstFavoredRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');

  I.see('Tidak ada restoran yang disimpan.', '#errorMessage');
});
