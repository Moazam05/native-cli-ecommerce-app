import React from 'react';

import {FillStar, HalfStar} from '../assets/images';

export const thousandSeparator = price => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const renderStars = rating => {
  const stars = [];
  const fullStars = Math?.floor(rating);
  const isHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FillStar key={i} />);
  }

  // Add half star if necessary
  if (isHalfStar) {
    stars.push(<HalfStar key="half" />);
  }

  return stars;
};
