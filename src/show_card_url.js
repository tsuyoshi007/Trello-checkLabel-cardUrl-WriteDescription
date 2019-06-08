'use strict';

/**
 * @fileOverview check_label.js
 *
 * @author tsuyoshi007
 * @version 1.0.0
 */

const Trello = require('trello');
const args = process.argv[2];

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

    let resUrl = [];
    cards.forEach(card => {
      card.labels.forEach(label => {
        if (label.name === args) {
          resUrl.push(card.shortUrl);
        }
      });
    });

    if (!resUrl.length) {
      console.log("We can't find the card with the specified label!!!");
      return;
    }
    console.log(resUrl);
  });
});
