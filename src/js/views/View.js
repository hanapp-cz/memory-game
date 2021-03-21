export default class View {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  _createClassElement(elSelector, classNames) {
    const element = document.createElement(elSelector);
    element.classList.add(...classNames);
    return element;
  }

  renderSpinner() {
    const spinner = this._createClassElement('div', ['spinner']);
    this.clear();
    this._parentElement.insertAdjacentElement('afterbegin', spinner);
  }

  showContainer() {
    this._parentElement.style.opacity = 1;
  }
  hideContainer() {
    this._parentElement.style.opacity = 0;
  }
}
