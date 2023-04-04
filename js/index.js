const box = document.querySelector(".box");
      const boxBtns = document.querySelectorAll(".box-item");
      const resetBtn = document.querySelector(".reset-Btn");
      let targetVal;
      let ingame = true; // game is running
      addBtnEvent();
      //patterns for winning
      const pattern = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
      ];

      let player1input = [];
      let player2input = [];
      let whosturn = "player1";
      let turncounter = 0;

      // validate inputs
      function pushValidate(event) {
        // check if game is still ongoing
        // if (!ingame) {
        //   return; //return nothing
        // }

        // getting the value of the event clicked
        targetVal = event.target.getAttribute("value");
        // disable button so it can't be clicked again
        event.target.disabled = true;

        // validate which player is the source of input
        if (whosturn === "player1") {
          player1input.push(targetVal); // add the inputs as entry to the array for pattern validation
          // evaluate entries
          if (checkPattern(player1input, pattern)) {
            // player1 wins
            console.log("Player 1 wins!");
            hasWinner();
            // ingame = false;
            return;
          }
          whosturn = "player2"; // set other player for the next turn
        } else if (whosturn === "player2") {
          player2input.push(targetVal); // add the inputs as entry to the array for pattern validation
          // evaluate entries
          if (checkPattern(player2input, pattern)) {
            // player2 wins
            console.log("Player 2 wins!");
            hasWinner();

            return;
          }
          whosturn = "player1"; // set other player for the next turn
        }

        // increment turn counter
        turncounter++;

        // check if game ended in a draw
        if (turncounter >= 9) {
          console.log("Game ended in a draw!");
          // ingame = false;
          return;
        }

        console.log(`Turn ${turncounter}: ${whosturn}`);
      }

      function checkPattern(inputArray, patternsArray) {
        //accepet two params the array of users input and array patterns
        // using someMethod that return true if condition is satisfied atleast once
        // it can be read as on eachpattern inside the patterns array
        return patternsArray.some((eachPatternFromPatternsArr) => {
          // on eachpattern it will test every value if it exist inside the users array
          return eachPatternFromPatternsArr.every((everyValuesIneachPattern) =>
            inputArray.includes(everyValuesIneachPattern)
          );
        });
      }

      function hasWinner() {
        resetBtn.style.display = "block";
        player1input = [];
        player2input = [];
        turncounter = 0;
        addBtnEvent();
      }

      resetBtn.addEventListener("click", () => {
        player1input = [];
        player2input = [];
        whosturn = "player1";
        turncounter = 0;
        addBtnEvent();
      });
      // add event listener to buttons
      function addBtnEvent() {
        for (let boxBtn of boxBtns) {
          boxBtn.addEventListener("click", pushValidate);
          boxBtn.disabled = false;
        }
      }