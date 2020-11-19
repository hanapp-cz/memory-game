import '../css/style.css';
import Card from './Card';
import Countries from './Countries';

//https://restcountries.eu/rest/v2/region/europe
const gameContainer = document.querySelector('.game-container');
const startButton = document.querySelector('.start-btn');

const countriesApiService = new Countries(
  'https://restcountries.eu/rest/v2/region/'
);

const selectCards = function (data, numPairs = 20) {
  const cards = [];
  if (numPairs > data.length) {
    numPairs = data.length;
  }

  // pick  selected number (numPairs) of objects from fetched data randomly. Then add 2 cards from each data to the cards array.
  for (let i = 0; i < numPairs; i++) {
    const [cardData] = data.splice(Math.floor(Math.random() * data.length), 1);
    // Push 1 card with flag img and 1 card with country name as a text to the cards array
    cards.push(
      new Card(i + 1, cardData.name, cardData.flag),
      new Card(i + numPairs + 1, cardData.name, undefined, cardData.name)
    );
  }
  return cards;
};

const renderCards = function (cardsToPick) {
  const numCards = cardsToPick.length;
  // Pick a random card, take it out of the array and render it
  for (let i = 0; i < numCards; i++) {
    const [randomCard] = cardsToPick.splice(
      Math.floor(Math.random() * cardsToPick.length),
      1
    );

    gameContainer.append(randomCard.createCard());
  }
};

const flip = function (event) {
  const card = event.target.closest('.card');
  card.classList.toggle('flip');
};

startButton.addEventListener('click', async function () {
  const data = await countriesApiService.getData('europe');
  const cards = selectCards(data, 10);
  // Copy cards array
  const cardsToPick = cards.slice();
  renderCards(cardsToPick);
});

gameContainer.addEventListener('click', flip);
