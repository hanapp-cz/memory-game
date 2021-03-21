import View from './View';

class runView extends View {
  constructor(parentElement) {
    super(parentElement);
    this._moves = this._parentElement.querySelector('.moves');
    this._matches = this._parentElement.querySelector('.matches');
  }

  renderMoves(moves) {
    this._moves.textContent = `moves: ${moves}`;
  }

  renderMatches(matches, max) {
    this._matches.textContent = `matches: ${matches}/${max}`;
  }
}

export default new runView(document.querySelector('.run-container'));
