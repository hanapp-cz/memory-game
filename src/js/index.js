import '../css/style.css';
import Card from './Card';
import Countries from './Countries';

//https://restcountries.eu/rest/v2/region/europe
const gameContainer = document.querySelector('.game-container');

const countriesApiService = new Countries(
  'https://restcountries.eu/rest/v2/region/'
);
(async function () {
  const data = await countriesApiService.getData('europe');
  //console.log(data);

  for (let i = 0; i < 28; i++) {
    console.log(data[i]);
    gameContainer.append(new Card(i, data[i].name, data[i].flag).createCard());
    gameContainer.append(
      new Card(i * 2, data[i].name, undefined, data[i].name).createCard()
    );
  }
})();

const flip = function (event) {
  const card = event.target.closest('.card');
  card.classList.toggle('flip');
};

gameContainer.addEventListener('click', flip);
