import { elements } from './base';
import Card from './Card';
export const selectCards = function (data, numPairs = 20) {
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

export const renderCards = function (cardsToPick) {
  const numCards = cardsToPick.length;
  // Pick a random card, take it out of the array and render it
  for (let i = 0; i < numCards; i++) {
    const [randomCard] = cardsToPick.splice(
      Math.floor(Math.random() * cardsToPick.length),
      1
    );

    elements.gameContainer.append(randomCard.createCard());
  }
};

export const flip = event => {
  //event.target.closest('.card')?.classList.add('flip');
  if (event.target.closest('.active')) {
    const cardElement = event.target.closest('.active');
    cardElement.classList.add('flip');
    return cardElement;
  }
};

const createClassElement = (el, classNames) => {
  const element = document.createElement(el);
  element.classList.add(...classNames);
  return element;
};

export const winner = () => {
  const div = createClassElement('div', ['win']);
  const p = document.createElement('p');
  const text = document.createTextNode('Well done!');
  p.append(text);
  div.append(p);
  console.log(div);
  elements.gameContainer.append(div);
};
