import View from './View';

class gameView extends View {
  constructor(parentElement) {
    super(parentElement);
  }

  renderCards(cards, continent) {
    this.clear();
    cards.forEach(card => {
      this._parentElement.append(card.createCard(continent));
    });
  }

  addHandlerControlGame(handler) {
    this._parentElement.addEventListener('click', function (event) {
      handler(event);
    });
  }

  addHandlerNewGame(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.new-game');
      if (!btn) return;
      handler();
    });
  }
  addHandlerShowCards(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.show-cards');
      if (!btn) return;
      handler();
    });
  }

  renderWinner(moves) {
    const div = this._createClassElement('div', ['win']);
    const box = this._createClassElement('div', ['win__box']);
    const btnNewGame = this._createClassElement('button', ['new-game', 'btn']);
    const btnNewGameLabel = document.createTextNode('new game');
    const btnShowCards = this._createClassElement('button', [
      'show-cards',
      'btn',
    ]);
    const btnShowCardsLabel = document.createTextNode('show cards');
    const h2 = this._createClassElement('h2', [
      'heading-secondary',
      'win__heading',
      'u-margin-bottom-medium',
    ]);
    const text = document.createTextNode('Well done!');
    const pMoves = this._createClassElement('p', [
      'win__text',
      'win__text--moves',
    ]);
    const textMoves = document.createTextNode(`moves: ${moves}`);
    h2.append(text);
    btnNewGame.append(btnNewGameLabel);
    btnShowCards.append(btnShowCardsLabel);
    pMoves.append(textMoves);
    box.append(h2, pMoves, btnShowCards, btnNewGame);
    div.append(box);
    this._parentElement.append(div);
  }

  removeWinner() {
    this._parentElement.querySelector('.win').remove();
  }

  flip(cardElement) {
    cardElement.classList.add('flip');
  }

  highlightCards(cards, className) {
    cards.forEach(card => {
      card.classList.add(className);
    });
  }

  showAllCards(cards) {
    cards.forEach(card => card.classList.replace('hidden', 'flip'));
  }

  hideMatched(cards) {
    cards.forEach(card => {
      card.classList.remove('match', 'flip');
      card.classList.replace('active', 'hidden');
    });
  }

  turnBack(cards) {
    cards.forEach(card => {
      card.classList.remove('no-match', 'flip');
    });
  }
}
export default new gameView(document.querySelector('.game-container'));
