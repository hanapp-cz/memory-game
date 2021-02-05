import { elements, createClassElement } from './base';
import Card from './Card';

export const selectCards = function (data, numPairs = 18) {
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

const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const renderCards = function (cardsToPick, continent) {
  const container = elements.gameContainer;
  container.innerHTML = '';
  shuffle(cardsToPick).forEach(card => {
    container.append(card.createCard(continent));
  });
};

export const flip = event => {
  //event.target.closest('.card')?.classList.add('flip');
  if (event.target.closest('.active')) {
    const cardElement = event.target.closest('.active');
    cardElement.classList.add('flip');
    return cardElement;
  }
};

const showCards = () => {
  document.querySelector('.win').remove();
};

export const hideMatched = function (el) {
  el.classList.remove('match', 'flip');
  el.classList.replace('active', 'hidden');
};

export const turnBack = function (el) {
  el.classList.remove('no-match');
  el.classList.remove('flip');
};

export const showAll = function (el) {
  el.classList.replace('hidden', 'flip');
};

export const renderMoves = function (moves) {
  const movesSpan = elements.moves;
  movesSpan.textContent = `moves: ${moves}`;
};

export const renderMatches = function (matches, max) {
  const matchesSpan = elements.matches;
  matchesSpan.textContent = `matches: ${matches}/${max}`;
};

export const loadGame = function () {
  document.querySelector('.win').remove();
  elements.gameContainer.innerHTML = '';
  elements.runContainer.style.opacity = 0;
};

export const winner = moves => {
  const div = createClassElement('div', ['win']);
  const box = createClassElement('div', ['win__box']);
  const btnNewGame = createClassElement('button', ['new-game', 'btn']);
  const btnNewGameLabel = document.createTextNode('new game');
  const btnShowCards = createClassElement('button', ['show-cards', 'btn']);
  const btnShowCardsLabel = document.createTextNode('show cards');
  const h2 = createClassElement('h2', [
    'heading-secondary',
    'win__heading',
    'u-margin-bottom-medium',
  ]);
  const text = document.createTextNode('Well done!');
  const pMoves = createClassElement('p', ['win__text', 'win__text--moves']);
  const textMoves = document.createTextNode(`moves: ${moves}`);
  h2.append(text);
  btnNewGame.append(btnNewGameLabel);
  btnShowCards.append(btnShowCardsLabel);
  pMoves.append(textMoves);
  box.append(h2, pMoves, btnShowCards, btnNewGame);
  div.append(box);
  btnNewGame.addEventListener('click', loadGame);
  btnShowCards.addEventListener('click', showCards);
  elements.gameContainer.append(div);
};
