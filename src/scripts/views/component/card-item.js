import { restaurantItemTemplate } from '../templates/template-creator';

class CardItem extends HTMLElement {
  set restaurant(data) {
    this._restaurant = data;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.innerHTML = restaurantItemTemplate(this._restaurant);
  }
}

customElements.define('card-item', CardItem);
