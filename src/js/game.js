import Card from './Card';

import { API_URL } from './config';
import { getData } from './helpers';

/** Global state of the app
 * - Game settings
 * - Fetched countries data
 * - Cards picked for game
 * - Game status
 * - Number of moves
 * - Currently turned cards
 * - Matched cards
 */
export const state = {
  settings: {},
  countries: [],
  cardDeck: [],
  win: false,
  moves: 0,
  turned: [],
  matched: [],
};

export const resetState = function () {
  state.settings = {};
  state.countries = [];
  state.cardDeck = [];
  state.win = false;
  state.moves = 0;
  state.matched = [];
  state.turned = [];
};

export const loadCountries = async function () {
  const url = `${API_URL}${state.settings.continent}`;
  state.countries = await getData(url);
};

const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const createCardDeck = function () {
  const numCountries = state.countries.length;
  const numPairs = Number(state.settings.difficulty);
  if (numPairs > numCountries) {
    numPairs = numCountries;
  }
  // Pick random card
  for (let i = 0; i < numPairs; i++) {
    const randomNumber = Math.floor(Math.random() * state.countries.length);
    const [cardData] = state.countries.splice(randomNumber, 1);

    // Push 1 card with flag img and 1 card with country name as a text to the cardDeck
    state.cardDeck.push(
      new Card(i + 1, cardData.name, cardData.flag),
      new Card(i + numPairs + 1, cardData.name, undefined, cardData.name)
    );
  }
  shuffle(state.cardDeck);
};

export const isMatch = function () {
  return (
    Math.abs(state.turned[0].id - state.turned[1].id) ===
    state.cardDeck.length / 2
  );
};

export const isGameEnd = function () {
  return state.matched.length >= state.cardDeck.length;
};

export const clearTurned = function () {
  return state.turned.splice(0);
};
