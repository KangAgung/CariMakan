import API from '../../globals/api';

const restaurantItemTemplate = (restaurant) => `
    <div id="${restaurant.id}" class="card hoverable">
        <div class="card-image">
            <div class="round" aria-label="rating : ${restaurant.rating || 'Tidak ada'}.">${restaurant.rating || '-'}</div>
            <img class="thumbnail lazyload" data-src="${API.IMAGE(restaurant.pictureId, 'small')}" onerror="this.src='/images/homepage-image.jpg'" 
                 alt="${restaurant.name || 'Foto tempat kuliner'}" loading="lazy" crossorigin="anonymous" width="100%" height="12rem">
            <span class="card-title">
                <span class="resto-title">
                    ${restaurant.name}.
                </span>
            </span>
        </div>
        <div class="card-content">
            <p class="lokasi">${restaurant.city || '-'}.</p>
            <p>
                ${restaurant.description.substring(0, 160) || '-'}...
            </p>
        </div>
        <div class="card-action">
            <a href="#/detail/${restaurant.id}" class="btn white-text">Lihat Detail</a>
        </div>
    </div>
  `;

const restaurantSkeletonTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
            <div class="card">
                <div class="card-image">
                    <img class="skeleton thumbnail" src="images/placeholder.png" width="100%" height="12rem" alt="skeleton">
                </div>
                <div class="card-content">
                    <p class="skeleton">Lorem ipsum</p>
                    <p class="skeleton">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dol...
                    </p>
                </div>
                <div class="card-action">
                    <a class="skeleton" >Lihat Detail</a>
                </div>
            </div>
      `;
  }
  return template;
};

const restaurantDetailTemplate = (restaurant) => `
    <div id="content">
        <div class="card">
            <div class="card-image">
                <img src="${API.IMAGE(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                <span class="card-title">
                    <span class="resto-title">
                        <i class="fas fa-star"></i> ${restaurant.rating}
                    </span>
                </span>
            </div>
            <div class="card-content">
                <p class="card-title">${restaurant.name || '-'}.</p>
                <p>
                    ${restaurant.address}, ${restaurant.city}
                </p>
            </div>
            <div class="card-content">
                <span class="card-title">Description.</span>
                <p>
                    ${restaurant.description || '-'}
                </p>
            </div>
            <div class="card-content">
                <span class="card-title">Categories.</span>
                <p>
                    <ul>
                        ${restaurant.categories.map((category) => `<li>${category.name}.</li>`).join('')}
                    </ul>
                </p>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <div class="card-title">Menu.</div>
            </div>
            <div class="card-action">
                    <div class="row">
                    <div>
                        <span class="card-title"><i class="fa fa-utensils"></i> Foods.</span>
                        <ul>
                        ${restaurant.menus.foods.map((food) => `<li>${food.name}.</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <span class="card-title"><i class="fa fa-coffee"></i> Drinks.</span>
                        <ul>
                        ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}.</li>`).join('')}
                        </ul>
                    </div>
                    </div>
            </div>
        </div>
        <div id="customerReview"></div>
        <div id="reviewForm"></div>
        <fav-button></fav-button>
    </div>
    `;

const favButtonTemplate = () => `
    <button aria-label="add to favorite" id="favoriteButton" class="btn fav-button">
       <i class="far fa-heart" aria-hidden="true"></i>
    </button>
  `;

const unfavButtonTemplate = () => `
    <button aria-label="remove from favorite" id="favoriteButton" class="btn fav-button">
      <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
  `;

const customerReviewTemplate = (restaurant) => `
    <div class="card">
        <div class="card-content">
            <span class="card-title">Customer Reviews</span>
        </div>
        <div class="card-action">
        ${restaurant.customerReviews.map((review) => `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${review.name}</span>
                    <small>${review.date}</small>
                </div>
                <div class="card-action">
                    <p>${review.review}</p>
                </div>
            </div>
        `).join('')}
        </div>
    </div>
`;

const formReviewTemplate = (id) => `
    <div class="card">
        <div class="card-content">
            <span class="card-title">Add Review</span>
        </div>
        <form id="formAddReview" method="POST">
            <div class="card-action">
                <input type="hidden" name="id" value="${id}">
                <label for="name">Name</label>
                <input class="input-control" type="text" name="name">
                <label for="review">Review</label>
                <textarea class="input-control" name="review"></textarea>
            </div>
            <div class="card-action">
                <input class="btn" type="submit" value="Add Review">
            </div>
        </form>
    </div>
`;

const loadingTemplate = () => `
    <div class="loader-container">
        <div class="loader"></div>
        <p>Please Wait...</p>
    </div>
`;

const errorMessageTemplate = (message) => `
    <div class="card">
        <div class="card-content">
            <p class="card-title" id="errorMessage">${message}</p>
        </div>
    </div>
  `;

export {
  restaurantItemTemplate,
  restaurantDetailTemplate,
  restaurantSkeletonTemplate,
  favButtonTemplate,
  unfavButtonTemplate,
  customerReviewTemplate,
  formReviewTemplate,
  loadingTemplate,
  errorMessageTemplate,
};
