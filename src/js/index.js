import '../css/style.css';
import { elements } from './base';
import Countries from './Countries';
import * as game from './game';

/** Global state of the app
 * - Game statut
 * - Number of moves
 * - Currently turned cards
 * - Matched cards
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
    // get input from form
    const settings = new FormData(event.target);
    state.settings = Object.fromEntries(settings);
    // reset the global state
    state.win = false;
    state.moves = 0;
    state.matched = [];
    state.turned = [];

    // fetch the data
    const data = await countriesApiService.getData(state.settings.continent);

    // pick the number of pairs based on chosen difficulty
    const cards = game.selectCards(data, Number(state.settings.difficulty));
    // copy cards array and store current deck in the state variable
    state.cardDeck = cards;
    const cardsToPick = cards.slice();
    // render cards, moves, matches
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
  // if game is on and there are not 2 turned cards yet, turn card
  if (state.turned.length < 2 && !state.win) currCard = game.flip(event);

  if (currCard) {
    // add card to currently turned cards
    state.turned ? state.turned.push(currCard) : (state.turned = [currCard]);
    if (state.turned.length === 2) {
      // two cards turned
      state.moves++;
      game.renderMoves(state.moves);
      if (
        // condition for match
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
