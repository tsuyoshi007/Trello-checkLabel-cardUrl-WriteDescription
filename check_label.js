const Trello = require("trello");
const args = process.argv[2];


const trello = new Trello(
  "", //first argument: application key 
  "" //second arguemtn: user token
); 
const memberId = ""; //argument: id of member of the board

trello.getBoards(memberId, (error, board) => {
  if (error) {
    console.log(error);
  } else {
    trello.getCardsOnBoard(board[0].id, (error, cards) => {
      if (error) {
        console.log(error);
      } else {
        let resLabels=[];
        cards.forEach(card=>{
          if(card.url==args) {
            card.labels.forEach(label=>{
              resLabels.push(label.name);
            });
          }
        });
        console.log(resLabels);
      }
    });
  }
});
