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

const countriesApiService = new Countries(
  'https://restcountries.eu/rest/v2/region/'
);

elements.settings.addEventListener('submit', async function (event) {
  try {
    event.preventDefault();
    const settings = new FormData(event.target);
    state.settings = Object.fromEntries(settings);
    state.win = false;
    state.moves = 0;
    state.matched = [];
    state.turned = [];

    const data = await countriesApiService.getData(state.settings.continent);
    const cards = game.selectCards(data, Number(state.settings.difficulty));
    // Copy cards array
    state.cardDeck = cards;
    const cardsToPick = cards.slice();
    game.renderCards(cardsToPick, state.settings.continent);
    game.renderMoves(state.moves);
    game.renderMatches(state.matched.length / 2, state.settings.difficulty);
    elements.runContainer.style.opacity = 1;
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
      // two cards turned
      state.moves++;
      game.renderMoves(state.moves);
      if (
        Math.abs(state.turned[0].id - state.turned[1].id) ==
        state.cardDeck.length / 2
      ) {
        // matched cards - green border for 2 seconds and hide matched cards
        state.turned.forEach(el => {
          el.classList.add('match');
        });
        setTimeout(() => {
          state.turned.forEach(game.hideMatched);
          state.matched.push(...state.turned.splice(0));
          game.renderMatches(
            state.matched.length / 2,
            state.settings.difficulty
          );
          // if all cards are matched, end of the game - turn all cards to review and display win screen
          if (state.matched.length >= state.cardDeck.length) {
            state.win = true;
            game.winner();
            state.matched.forEach(game.showAll);
            state.matched = [];
            state.moves = 0;
          }
        }, 2000);
      } else {
        // two cards were turned, but they do not match - add red border for 2 seconds then turn them back
        state.turned.forEach(el => {
          el.classList.add('no-match');
        });
        setTimeout(() => {
          state.turned.forEach(game.turnBack);
          state.turned.splice(0);
        }, 2000);
      }
    }
  }
});
