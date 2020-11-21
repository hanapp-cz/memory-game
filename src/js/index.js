import '../css/style.css';
import { elements } from './base';
import Countries from './Countries';
import * as game from './game';

/** Global state of the app
 * - Currently turned cards
 * - Matched (permanetly turned) cards
 * - Rendered cards array cardDeck
 * - Number of moves
 */
const state = {
  win: false,
  moves: 0,
  turned: [],
  matched: [],
};

const gameContainer = elements.gameContainer;
const startButton = elements.startButton;

const countriesApiService = new Countries(
  'https://restcountries.eu/rest/v2/region/'
);

elements.settings.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();
    const settings = new FormData(event.target);
    state.settings = Object.fromEntries(settings);
    const data = await countriesApiService.getData(state.settings.continent);
    const cards = game.selectCards(data, Number(state.settings.difficulty));
    // Copy cards array
    state.cardDeck = cards;
    const cardsToPick = cards.slice();
    game.renderCards(cardsToPick, state.settings.continent);
  } catch (err) {
    console.error(err);
  }
});

gameContainer.addEventListener('click', event => {
  let currCard;
  if (state.turned.length < 2 && !state.win) currCard = game.flip(event);

  if (currCard) {
    state.turned ? state.turned.push(currCard) : (state.turned = [currCard]);

    if (state.turned.length === 2) {
      state.moves++;
      if (
        Math.abs(state.turned[0].id - state.turned[1].id) ==
        state.cardDeck.length / 2
      ) {
        state.turned.forEach(el => {
          el.classList.add('match');
        });
        setTimeout(() => {
          state.turned.forEach(el => {
            el.classList.remove('match', 'flip');
            el.classList.replace('active', 'hidden');
          });
          state.matched.push(...state.turned.splice(0));

          console.log(state.matched);
          if (state.matched.length >= state.cardDeck.length) {
            state.win = true;
            game.winner();
            state.matched.forEach(el => {
              el.classList.replace('hidden', 'flip');
            });
          }
        }, 2000);
      } else {
        state.turned.forEach(el => {
          el.classList.add('no-match');
        });
        setTimeout(() => {
          state.turned.forEach(el => {
            el.classList.remove('no-match');
            el.classList.remove('flip');
          });
          state.turned.splice(0);
        }, 2000);
      }
    }
  }
});
