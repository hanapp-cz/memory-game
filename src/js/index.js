import '../css/style.css';
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

const controlGame = function (event) {
  // TODO refactor -------------------------------------------------------------------//
  let currCard = event.target.closest('.active');
  if (game.state.win || !currCard) return;

  // if there are not 2 turned cards yet, turn card
  if (game.state.turned.length < 2) {
    gameView.flip(currCard);
  }

  if (currCard.id != game.state.turned[0]?.id) {
    // add card to currently turned cards
    game.state.turned.push(currCard);

    if (game.state.turned.length === 2) {
      // two cards turned
      game.state.moves++;
      runView.renderMoves(game.state.moves);

      if (
        // condition for match
        Math.abs(game.state.turned[0].id - game.state.turned[1].id) ==
        game.state.cardDeck.length / 2
      ) {
        // matched cards - green border for 2 seconds and hide matched cards

        game.state.turned.forEach(el => {
          el.classList.add('match');
        });
        setTimeout(() => {
          game.state.turned.forEach(game.hideMatched);
          game.state.matched.push(...game.state.turned.splice(0));
          runView.renderMatches(
            game.state.matched.length / 2,
            game.state.settings.difficulty
          );
          // if all cards are matched, end of the game - turn all cards to review and display win screen
          if (game.state.matched.length >= game.state.cardDeck.length) {
            game.state.win = true;
            gameView.renderWinner(game.state.moves);
            gameView.addHandlerNewGame(controlGameReset);
            gameView.addHandlerShowCards(controlShowCards);
            gameView.showAllCards(game.state.matched);
          }
        }, 2000);
      } else {
        // two cards were turned, but they do not match - add red border for 2 seconds then turn them back
        game.state.turned.forEach(el => {
          el.classList.add('no-match');
        });
        setTimeout(() => {
          game.state.turned.forEach(game.turnBack);
          game.state.turned.splice(0);
        }, 2000);
      }
    }
  }
};
const init = function () {
  settingsView.addHandlerStartGame(controlGameSetup);
  gameView.addHandlerControlGame(controlGame);
};
init();
