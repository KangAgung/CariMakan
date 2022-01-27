import FavoriteRestaurantIdb from '../../data/restaurant-idb';
import '../component/card-list';
import { errorMessageTemplate } from '../templates/template-creator';
import Loading from '../../utils/loading-initiator';

const Favorite = {
  async render() {
    return `
        <section class="hero">
        <div class="container">
            <div class="row">
                <h2 class="hero-text white-text">Favourite Restaurants</h2>
                <div>
                    <p class="grey-text">
                        Lihat kembali berbagai tempat kuliner yang telah anda simpan di sini.
                    </p>
                </div>
            </div>
        </div>
        </section>
        <section class="container">
            <card-list class="row" id="savedRestaurant"></card-list>
        </section>
    `;
  },

  async afterRender() {
    const restaurantListContainer = document.querySelector('#savedRestaurant');
    Loading.init({
      container: restaurantListContainer,
      contentBeforeLoading: restaurantListContainer.innerHTML,
    });

    const restaurantListElement = document.querySelector('card-list');
    try {
      const restaurantList = await FavoriteRestaurantIdb.getAllRestaurants();
      Loading.unsetAnimation();
      if (restaurantList.length < 1) {
        restaurantListElement.innerHTML = errorMessageTemplate('Tidak ada restoran yang disimpan.');
      } else {
        restaurantListElement.restaurants = restaurantList;
      }
    } catch (error) {
      restaurantListContainer.innerHTML = errorMessageTemplate(`Oops! ${error}, please refresh the page`);
      console.error(error);
    }
  },
};

export default Favorite;
