import axios from 'axios';
import API from '../globals/api';

const getRestaurants = async () => {
  const response = await axios.get(API.LIST);
  return response.data.restaurants;
};

const detailRestaurant = async (id) => {
  const response = await axios.get(API.DETAIL(id));
  return response.data.restaurant;
};

const postReview = async (data) => {
  const response = await axios.post(API.POST_REVIEW, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export {
  getRestaurants,
  detailRestaurant,
  postReview,
};
