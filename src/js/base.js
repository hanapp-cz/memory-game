export const elements = {
  gameContainer: document.querySelector('.game-container'),
  startButton: document.querySelector('.start-btn'),
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