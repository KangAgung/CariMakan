import { favButtonTemplate, unfavButtonTemplate } from '../templates/template-creator';

class FavoriteButton extends HTMLElement {
  async init(data, favoriteRestaurants) {
    this._restaurant = data;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._render();
  }

  async _render() {
    if (await this._isRestaurantExist()) {
      this._renderAddFavorite();
    } else {
      this._renderRemoveFavorite();
    }
  }

  async _isRestaurantExist() {
    const { id } = this._restaurant;
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  }

  _renderRemoveFavorite() {
    this.innerHTML = favButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      await this._render();
    });
  }

  _renderAddFavorite() {
    this.innerHTML = unfavButtonTemplate();

    const favoriteButton = this.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      await this._render();
    });
  }
}

// eslint-disable-next-line no-unused-expressions
customElements.get('fav-button') || customElements.define('fav-button', FavoriteButton);
