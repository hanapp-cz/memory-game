import '../css/style.css';
import Card from './Card';
import Countries from './Countries';

/** Global state of the app
 * - Rendered cards array cardDeck
 * - Currently turned cards
 * - Matched (permanetly turned) cards
 */
const state = {};

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
  const cardElement = event.target.closest('.card');
  cardElement.classList.toggle('flip');
  const currId = cardElement.id;
  console.log(currId);

  const currCard = state.cardDeck.find(el => {
    if (el._id == currId) {
      return true;
    }
  });
  console.log(currCard);

  // state.turned = [state.cardDeck[]]
};

startButton.addEventListener('click', async function () {
  try {
    const data = await countriesApiService.getData('europe');
    const cards = selectCards(data, 10);
    // Copy cards array
    state.cardDeck = cards;
    const cardsToPick = cards.slice();
    renderCards(cardsToPick);
  } catch (err) {
    console.error(err);
  }
});

gameContainer.addEventListener('click', flip);
