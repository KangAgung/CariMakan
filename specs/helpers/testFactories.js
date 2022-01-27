import '../../src/scripts/views/component/fav-button';
import FavoriteRestaurantIdb from '../../src/scripts/data/restaurant-idb';

const saveButtonPresenterWithRestaurant = async (restaurant) => {
  const favoriteButton = document.querySelector('fav-button');
  await favoriteButton.init(restaurant, FavoriteRestaurantIdb);
};

export default saveButtonPresenterWithRestaurant;
