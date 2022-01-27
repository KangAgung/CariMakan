import { postReview } from '../data/data-source';
import FavoriteRestaurantIdb from '../data/restaurant-idb';
import { customerReviewTemplate, errorMessageTemplate, formReviewTemplate } from '../views/templates/template-creator';
import Loading from './loading-initiator';

const ReviewInitiator = {
  async init({ dataRestaurant }) {
    this._restaurant = dataRestaurant;

    await this._renderReviews(dataRestaurant);
  },

  async _renderReviews(data) {
    await this._renderCustomerReviews(data);
    await this._renderFormReview();
  },

  async _renderCustomerReviews(data) {
    this._renderReviewContainer = document.querySelector('#customerReview');

    this._renderReviewContainer.innerHTML = customerReviewTemplate(data);
  },

  async _renderFormReview() {
    this._reviewFormContainer = document.querySelector('#reviewForm');

    this._reviewFormContainer.innerHTML = formReviewTemplate(this._restaurant.id);

    const formAddReview = document.querySelector('#formAddReview');
    formAddReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formDataElement = formAddReview.elements;
      const formData = {
        id: formDataElement.namedItem('id').value,
        name: formDataElement.namedItem('name').value,
        review: formDataElement.namedItem('review').value,
      };

      Loading.init({
        container: this._reviewFormContainer,
        contentBeforeLoading: this._reviewFormContainer.innerHTML,
      });
      try {
        const response = await postReview(formData);
        if (!response.error) {
          this._favRestaurant = await FavoriteRestaurantIdb.getRestaurant(this._restaurant.id);
          if (this._favRestaurant) {
            this._restaurant.customerReviews = response.customerReviews;
            await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
          }
          await this._renderReviews(response);
        }
      } catch (error) {
        this._reviewFormContainer.innerHTML = errorMessageTemplate(`Oops! ${error}, please refresh the page`);
        console.error(error);
      }
    });
  },
};

export default ReviewInitiator;
