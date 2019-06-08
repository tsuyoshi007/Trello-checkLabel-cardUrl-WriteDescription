'use strict';

/**
 * @fileOverview check_label.js
 *
 * @author tsuyoshi007
 * @version 1.0.0
 */

require('dotenv').config();
const Trello = require('trello');

const BOARD_ID = process.argv[2];
const CARD_ID = process.argv[3];

const trello = new Trello(
  process.env.APPLICATION_KEY,
  process.env.USER_TOKEN
);

trello.getBoards(process.env.MEMBER_ID).then(boards => {
  const BOARD = boards.filter((board, boardI, boards) => {
    return (board.shortLink === BOARD_ID);
  })[0];

  if (!BOARD) {
    console.log('board isn\'t found.');
    return;
  }

  trello.getCardsOnBoard(BOARD.id).then(cards => {
    const CARD = cards.filter((card, cardI, cards) => {
      return (card.shortLink === CARD_ID);
    })[0];

    if (!CARD) {
      console.log('card isn\'t found.');
      return;
    }

    console.log(CARD.labels.map((label, labelI, labels) => {
      return label.name;
    }));
  }).catch(getCardsErr => {
    console.log('getCardsErr', getCardsErr);
  });
}).catch(getBoardsErr => {
  console.error('getBoardsErr', getBoardsErr);
});
