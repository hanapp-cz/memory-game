export default class Card {
  constructor(id, name, img = '', text = '') {
    this._id = id;
    this._name = name;
    this._img = img;
    this._text = text;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get img() {
    return this._img;
  }
  get text() {
    return this._text;
  }

  createClassElement(el, classNames) {
    const element = document.createElement(el);
    element.classList.add(...classNames);
    return element;
  }

  createCard(frontTextStr = '❤') {
    const card = this.createClassElement('div', ['card']);
    card.setAttribute('id', this._id);
    const cardInner = this.createClassElement('div', ['card-inner']);
    const cardFront = this.createClassElement('div', ['card-front']);
    const cardBack = this.createClassElement('div', ['card-back']);
    const frontText = document.createElement('p');
    frontText.append(frontTextStr);
    cardFront.append(frontText);
    if (this._img) {
      const img = document.createElement('img');
      img.src = this._img;
      cardBack.append(img);
    }
    if (this._text) {
      const cardText = document.createElement('p');
      cardText.append(this._text);
      cardBack.append(cardText);
    }
    cardInner.append(cardFront, cardBack);
    card.append(cardInner);
    console.log(card);
    return card;
  }
}
