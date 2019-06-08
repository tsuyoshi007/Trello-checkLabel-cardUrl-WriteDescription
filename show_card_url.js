const Trello = require("trello");
const args = process.argv[2];

const trello = new Trello("", ""); //first argument: application key //second arguemtn: user token
const memberId = ""; //argument: id of member of the board

trello.getBoards(memberId, function(error, board) {
  if (error) {
    console.log(error);
  } else {
    trello.getListsOnBoard(board[0].id, function(error, list) { //you can specify a specific board here by changing the index of board !!!
      if (error) {
        console.log(error);
      } else {
        trello.getCardsOnList(list[0].id, function(error, card) { //you can specify a specific list here by change the index of list
          if (error) {
            console.log(error);
          } else {
            let resUrl = [];
            card.forEach(element1 => {
              element1.labels.forEach(element2 => {
                if (element2.name == args) {
                  resUrl.push(element1.shortUrl);
                }
              });
            });
            console.log(resUrl); //result will be return here
          }
        });
      }
    });
  }
});
