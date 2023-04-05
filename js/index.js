      // DOM elements
      const box = document.querySelector(".box"),
      boxBtns = document.querySelectorAll(".box-item"),
      resetBtn = document.querySelector(".reset-Btn"),
      stop = document.querySelector(".stop-Btn"),
      player1TextBox = document.getElementById('player1-Name'),
      player2TextBox = document.getElementById('player2-Name'),
      assignedName1 = player1TextBox,
      assignedName2 = player2TextBox
      addBtnEvent()
      
      //Game Elements
      const pattern = [    //patterns for winning
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
      ],
       // player 1 object
      player1 = {
        name: `${assignedName1 ?? 'Player 1'}`,
        inputs: [],
        score: 0,
      },
      // player 2 object
      player2 = {  
        name: `${assignedName2 ?? 'Player 2'}`,
        inputs: [],
        score: 0,
      }
      // Other Game Elements
      let whosturn = "player1",
      ingame = true,
      turncounter = 0


      // validate inputs
      function pushValidate(event) {
        // check if game is still ongoing
        // if (!ingame) {
        //   return; //return nothing
        // }

        // getting the value of the event clicked
        targetVal = event.target.getAttribute("value")
        // disable button so it can't be clicked again
        event.target.disabled = true

        // validate which player is the source of input
        if (whosturn === "player1") {
          player1.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
          // evaluate entries
          if (checkPattern(player1.inputs, pattern)) {
            // player1 wins
            console.log("Player 1 wins!")
            hasWinner()
            return;
          }
          whosturn = "player2" // set other player for the next turn
        } else if (whosturn === "player2") {
          player2.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
          // evaluate entries
          if (checkPattern(player2.inputs, pattern)) {
            // player2 wins
            console.log("Player 2 wins!")
            hasWinner()
            return;
          }
          whosturn = "player1" // set other player for the next turn
        }

        // increment turn counter
        turncounter++;

        // check if game ended in a draw
        if (turncounter >= 9) {
          console.log("Game ended in a draw!")
          itsDraw()
        }

        console.log(`Turn ${turncounter}: ${whosturn}`)
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
        resetBtn.style.display = "block"
        stop.style.display = 'block'
        player1.inputs = []
        player2.inputs = []
        turncounter = 0
        addBtnEvent()
      }
      function itsDraw() {
        for (let boxBtn of boxBtns) {
          boxBtn.disabled = false
        }
        player1.inputs = []
        player2.inputs = []
      }

      resetBtn.addEventListener("click", () => {
        player1.inputs = []
        player2.inputs = []
        turncounter = 0
        addBtnEvent()
      });
      
      stop.addEventListener('click', () => {
              ingame = false; // intended for stop button
              for (let boxBtn of boxBtns) {
                boxBtn.disabled = true
              }
      })
      
      // add event listener to buttons
      function addBtnEvent() {
        for (let boxBtn of boxBtns) {
          boxBtn.addEventListener("click", pushValidate)
          boxBtn.disabled = false
        }
      }