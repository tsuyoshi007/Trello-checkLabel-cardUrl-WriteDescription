const Trello = require("trello");
const args = process.argv.slice(2);


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
        cards.forEach(card=>{
            if(card.url==args[0]) {
                trello.updateCardDescription(card.id,args[1],error=>{
                    if(error) {
                        console.log(error)
                    }else {
                        console.log("Description Updated")
                    }

                })
            }
        })
      }
    });
  }
});
