export const elements = {
  gameContainer: document.querySelector('.game-container'),
  headerContainer: document.querySelector('.header-container'),
  settings: document.querySelector('#game-settings'),
  runContainer: document.querySelector('.run-container'),
  moves: document.querySelector('.moves'),
  matches: document.querySelector('.matches'),
  newGameBtn: document.querySelector('.new-game'),
  winContainer: document.querySelector('.win'),
};

/* export const elementStrings = {
    loader: 'loader'
}; */

/* export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}; */
