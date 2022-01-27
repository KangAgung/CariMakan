import saveButtonPresenterWithRestaurant from './helpers/testFactories';
import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-idb';

describe('Delete a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<fav-button></fav-button>';
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show unfavored button when the restaurant has been saved', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="remove from favorite"]'))
      .toBeTruthy();
  });

  it('should not show favorite button when the restaurant has been saved', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="add to favorite"]'))
      .toBeFalsy();
  });

  it('should be able to remove saved restaurant from the list', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="remove from favorite"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unsaved restaurant is not in the list', async () => {
    await saveButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="remove from favorite"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not delete a restaurant when it has no id', async () => {
    await saveButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteButton')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
  });
});
