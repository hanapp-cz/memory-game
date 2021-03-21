import View from './View';

class settingsView extends View {
  constructor(parentElement) {
    super(parentElement);
  }

  getSettings() {
    return Object.fromEntries(new FormData(this._parentElement));
  }

  addHandlerStartGame(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new settingsView(document.querySelector('#game-settings'));
