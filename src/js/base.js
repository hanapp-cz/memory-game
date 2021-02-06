export const elements = {
  gameContainer: document.querySelector('.game-container'),
  headerContainer: document.querySelector('.header__container'),
  settings: document.querySelector('#game-settings'),
  runContainer: document.querySelector('.run-container'),
  moves: document.querySelector('.moves'),
  matches: document.querySelector('.matches'),
  newGameBtn: document.querySelector('.new-game'),
};

export const createClassElement = (el, classNames) => {
  const element = document.createElement(el);
  element.classList.add(...classNames);
  return element;
};

export const renderLoader = parent => {
  const loader = createClassElement('div', ['loader']);
  parent.insertAdjacentElement('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.loader`);
  if (loader) loader.remove();
};
