import '../css/style.css';
import { PAUSE_SECONDS } from './config';
import { pause } from './helpers';
import * as game from './game';
import gameView from './views/gameView';
import runView from './views/runView';
import settingsView from './views/settingsView';

const controlGameReset = function () {
  gameView.clear();
  runView.hideContainer();
};
const controlShowCards = function () {
  gameView.removeWinner();
  runView.hideContainer();
};

const controlGameSetup = async function () {
  try {
    gameView.renderSpinner();
    game.resetState();
    game.state.settings = settingsView.getSettings();

    await game.loadCountries();
    game.createCardDeck();

    gameView.renderCards(game.state.cardDeck, game.state.settings.continent);
    runView.renderMoves(game.state.moves);
    runView.renderMatches(
      game.state.matched.length / 2,
      game.state.settings.difficulty
    );
    runView.showContainer();
  } catch (err) {
    console.error(err);
  }
};

const controlGame = async function (event) {
  const currCard = event.target.closest('.active');
  if (game.state.win || !currCard) return;

  if (game.state.turned.length < 2) {
    gameView.flip(currCard);

    if (currCard.id != game.state.turned[0]?.id) {
      game.state.turned.push(currCard);

      if (game.state.turned.length === 2) {
        game.state.moves++;
        runView.renderMoves(game.state.moves);

        if (game.isMatch()) {
          gameView.highlightCards(game.state.turned, 'match');
          await pause(PAUSE_SECONDS);
          gameView.hideMatched(game.state.turned);
          game.state.matched.push(...game.clearTurned());
          runView.renderMatches(
            game.state.matched.length / 2,
            game.state.settings.difficulty
          );

          if (game.isGameEnd()) {
            game.state.win = true;
            gameView.renderWinner(game.state.moves);
            gameView.addHandlerNewGame(controlGameReset);
            gameView.addHandlerShowCards(controlShowCards);
            gameView.showAllCards(game.state.matched);
          }
        } else {
          gameView.highlightCards(game.state.turned, 'no-match');
          await pause(PAUSE_SECONDS);
          gameView.turnBack(game.state.turned);
          game.clearTurned();
        }
      }
    }
  }
};
const init = function () {
  settingsView.addHandlerStartGame(controlGameSetup);
  gameView.addHandlerControlGame(controlGame);
};
init();
