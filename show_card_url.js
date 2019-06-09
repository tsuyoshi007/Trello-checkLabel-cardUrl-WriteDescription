'use strict';

/**
 *
 * @author Hun Vikran
 * @version 1.0.0
 */

require('dotenv').config();
const Trello = require('trello');

const BOARD_ID = process.argv[2];
const LABEL = process.argv[3];

const trello = new Trello(process.env.APPLICATION_KEY, process.env.USER_TOKEN);
trello
  .getBoards(process.env.MEMBER_ID)
  .then(boards => {
    const BOARD = boards.filter(board => {
      return board.shortLink === BOARD_ID;
    })[0];

    if (!BOARD) {
      console.log("board isn't found.");
      return;
    }

    trello
      .getCardsOnBoard(BOARD.id)
      .then(cards => {
        let CARD_URL = [];
        cards.forEach(card => {
          card.labels.forEach(label => {
            if (label.name === LABEL) {
              CARD_URL.push(card.shortUrl);
            }
          });
        });
        console.log(CARD_URL);
      })
      .catch(getCardsErr => {
        console.log('getCardsErr', getCardsErr);
      });
  })
  .catch(getBoardsErr => {
    console.error('getBoardsErr', getBoardsErr);
  });
