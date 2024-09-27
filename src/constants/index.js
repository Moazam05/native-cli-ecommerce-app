import {
  Beauty,
  WelcomeOne,
  WelcomeThree,
  WelcomeTwo,
  Fashion,
  Kids,
  Mens,
  Womens,
  Banner1,
  Product1,
  Product2,
  Product4,
  Product3,
} from '../assets/images';

export const onboarding = [
  {
    id: 1,
    title: 'Choose Products',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeOne,
  },
  {
    id: 2,
    title: 'Make Payment',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeTwo,
  },
  {
    id: 3,
    title: 'Get Your Order',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    image: WelcomeThree,
  },
];

export const categoriesData = [
  {
    id: 1,
    name: 'Beauty',
    image: Beauty,
  },
  {
    id: 2,
    name: 'Fashion',
    image: Fashion,
  },
  {
    id: 3,
    name: 'Kids',
    image: Kids,
  },
  {
    id: 4,
    name: 'Mens',
    image: Mens,
  },
  {
    id: 5,
    name: 'Womens',
    image: Womens,
  },
];

export const bannersData = [
  {
    id: 1,
    textOne: '50-40% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
  {
    id: 2,
    textOne: '50-40% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
  {
    id: 3,
    textOne: '50-40% OFF',
    textTwo: 'Now in (product)',
    buttonText: 'Shop Now',
    image: Banner1,
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: 'Women Printed Kurta',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '1500',
    oldPrice: '2499',
    off: '40% OFF',
    rating: 4.5,
    ratingCount: 5680,
    image: Product1,
  },
  {
    id: 2,
    name: 'HRX by Hrithik Roshan',
    description: 'Neque porro quisquam est qui dolorem ipsum quia',
    price: '2499',
    oldPrice: '4999',
    off: '50% OFF',
    rating: 4.5,
    ratingCount: 3445,
    image: Product2,
  },
  {
    id: 3,
    name: 'IWC Schaffhausen',
    description: "2021 Pilot's Watch 'SIHH 2019' 44mm",
    price: '4999',
    oldPrice: '9999',
    off: '50% OFF',
    rating: 4.5,
    ratingCount: 3004,
    image: Product3,
  },
  {
    id: 4,
    name: 'Labbin White Sneakers',
    description: 'For Men and Female',
    price: '1650',
    oldPrice: '2499',
    off: '40% OFF',
    rating: 4,
    ratingCount: 1500,
    image: Product4,
  },
];
