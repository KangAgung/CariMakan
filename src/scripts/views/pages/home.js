import { getRestaurants } from '../../data/data-source';
import '../component/card-list';
import { errorMessageTemplate, restaurantSkeletonTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <section class="hero">
        <div class="container">
            <div class="row">
                <h2 class="hero-text white-text">Cari Makanan?</h2>
                <div>
                    <p class="grey-text">
                        Jelajahi berbagai jenis tempat kuliner yang tersedia dari berbagai macam daerah
                        hanya dengan satu klik saja.
                    </p>
                </div>
            </div>
        </div>
        </section>
        <section class="container">
            <card-list class="row" id="restaurant">
                ${restaurantSkeletonTemplate(20)}
            </card-list>
        </section>
      `;
  },

  async afterRender() {
    const restaurantList = document.querySelector('#restaurant');

    const restaurantListElement = document.querySelector('card-list');
    try {
      restaurantListElement.restaurants = await getRestaurants();
    } catch (error) {
      restaurantList.innerHTML = errorMessageTemplate(`Oops! ${error}, please refresh the page`);
      console.error(error);
    }
  },
};

export default Home;
