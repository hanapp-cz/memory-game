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
    const card = this.createClassElement('div', ['card', 'active']);
    card.setAttribute('id', this._id);

    const cardFront = this.createClassElement('div', [
      'card__side',
      'card__side--front',
    ]);
    const cardBack = this.createClassElement('div', [
      'card__side',
      'card__side--back',
    ]);
    const frontText = this.createClassElement('p', ['card__front-text']);
    frontText.append(
      frontTextStr.replace(frontTextStr[0], frontTextStr[0].toUpperCase())
    );
    cardFront.append(frontText);
    if (this._img) {
      const img = document.createElement('img');
      img.src = this._img;
      cardBack.append(img);
    }
    if (this._text) {
      const cardText = this.createClassElement('p', ['card__back-text']);
      cardText.append(this._text);
      cardBack.append(cardText);
    }

    card.append(cardFront, cardBack);

    return card;
  }
}
