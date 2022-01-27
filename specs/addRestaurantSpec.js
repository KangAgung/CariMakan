import saveButtonPresenterWithRestaurant from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-idb';

describe('Adding a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<fav-button></fav-button>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show favorite button when the restaurant has not been saved', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]'))
      .toBeTruthy();
  });

  it('should not show unfavored button when the restaurant has not been saved', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]'))
      .toBeFalsy();
  });

  it('should be able to save the restaurant', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it\'s already saved', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await saveButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
