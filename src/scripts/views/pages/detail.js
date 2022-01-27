import UrlParser from '../../routes/url-parser';
import { detailRestaurant } from '../../data/data-source';
import { errorMessageTemplate, restaurantDetailTemplate } from '../templates/template-creator';
import '../component/fav-button';
import FavoriteRestaurantIdb from '../../data/restaurant-idb';
import Loading from '../../utils/loading-initiator';
import ReviewInitiator from '../../utils/review-initiator';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="container"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#restaurant');

    Loading.init({
      container: restaurantContainer,
      contentBeforeLoading: restaurantContainer.innerHTML,
    });

    try {
      let restaurant = await FavoriteRestaurantIdb.getRestaurant(url.id);
      if (!restaurant) {
        restaurant = await detailRestaurant(url.id);
      }
      Loading.unsetAnimation();
      restaurantContainer.innerHTML = restaurantDetailTemplate(restaurant);

      const favoriteButton = document.querySelector('fav-button');
      const restaurantData = {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        address: restaurant.address,
        city: restaurant.city,
        categories: restaurant.categories,
        description: restaurant.description,
        menus: restaurant.menus,
        customerReviews: restaurant.customerReviews,
      };
      favoriteButton.init(restaurantData, FavoriteRestaurantIdb);

      await ReviewInitiator.init({
        dataRestaurant: restaurant,
      });
    } catch (error) {
      restaurantContainer.innerHTML = errorMessageTemplate(`Oops! ${error}, please refresh the page`);
      console.error(error);
    }
  },
};

export default Detail;
