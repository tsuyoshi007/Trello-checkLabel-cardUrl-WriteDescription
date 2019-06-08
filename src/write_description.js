'use strict';

/**
 * @fileOverview check_label.js
 *
 * @author tsuyoshi007
 * @version 1.0.0
 */

const Trello = require('trello');
const args = process.argv.slice(2);

const trello = new Trello(
  '', // first argument: application key
  '' // second arguemtn: user token
);

/**
 * Member ID
 * argument: id of member of the board
 * @type {string}
 */
const memberId = '';

trello.getBoards(memberId, (getBoardErr, board) => {
  if (getBoardErr) {
    console.error(getBoardErr);
    return;
  }
  trello.getCardsOnBoard(board[0].id, (getCardsErr, cards) => { // you can specify a specific board here !!!
    if (getCardsErr) {
      console.error(getCardsErr);
      return;
    }

    cards.forEach(card => {
      if (card.url === args[0]) {
        trello.updateCardDescription(card.id, args[1], error => {
          if (error) {
            console.log(error);
          } else {
            console.log('Description Updated');
          }
        });
      }
    });
  });
});
