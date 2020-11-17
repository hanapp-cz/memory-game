import '../css/style.css';
import Card from './Card';
import Countries from './Countries';

//https://restcountries.eu/rest/v2/region/europe

const countriesApiService = new Countries(
  'https://restcountries.eu/rest/v2/region/'
);
countriesApiService.getData('europe');
const gameContainer = document.querySelector('.game-container');
for (let i = 0; i < 56; i++) {
  gameContainer.append(new Card().renderCard());
}
