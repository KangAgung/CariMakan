import { loadingTemplate } from '../views/templates/template-creator';

const Loading = {
  init({ container, contentBeforeLoading = '' }) {
    this._container = container;
    this._contentBeforeLoading = contentBeforeLoading;

    this.setAnimation();
  },

  setAnimation() {
    this._container.innerHTML = loadingTemplate();
  },

  unsetAnimation() {
    this._container.innerHTML = this._contentBeforeLoading;
  },

};

export default Loading;
