export default class Card {
  constructor() {}

  createClassElement(el, classNames) {
    const element = document.createElement(el);
    element.classList.add(...classNames);
    return element;
  }
  renderCard() {
    const card = this.createClassElement('div', ['card']);
    const cardInner = this.createClassElement('div', ['card-inner']);
    const cardFront = this.createClassElement('div', ['card-front']);
    const cardBack = this.createClassElement('div', ['card-back']);
    const img = document.createElement('img');
    img.setAttribute('src', '../images/error.jpg');
    const p = document.createElement('p');
    p.append('❤');
    cardFront.append(p);
    cardBack.append(img);
    cardInner.append(cardFront, cardBack);
    card.append(cardInner);

    return card;
  }
}
