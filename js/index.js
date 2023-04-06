      // DOM elements
      const box = document.querySelector(".box"),
      boxBtns = document.querySelectorAll(".box-item"),
      icons = document.querySelectorAll('.xo'),
      resetBtn = document.querySelector(".reset-Btn"),
      stop = document.querySelector(".stop-Btn"),
      players = document.querySelectorAll('header input'),
      player1TxtBox = document.getElementById('player1-Name'),
      player2TxtBox = document.getElementById('player2-Name')

      let assignedName1,
      assignedName2 

      // players.forEach((player) => {
      //   player.addEventListener("input", applyName)
      // })

      addBtnEvent()

      // console.log(assignedName1, assignedName2)
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
        stamp: ["fa-solid", "fa-xmark", "fa-beat"],
      },
      // player 2 object
      player2 = {  
        name: `${assignedName2 ?? 'Player 2'}`,
        inputs: [],
        score: 0,
        stamp: ["fa-regular", "fa-circle", "fa-beat-fade"]
      }
      // Other Game Elements  
      let whosturn = "player1",
      ingame = true,
      turncounter = 0,
      pN = 1

      //default name
      players.forEach((player) => {
      let thisPlayer = player.value ?? undefined
      player.textContent = thisPlayer ?? `Player ${pN}` 
      pN++
      })
      // validate inputs
      function pushValidate(event) { 
        console.log(this)
        // check if game is still ongoing
        // if (!ingame) {
        //   return; //return nothing
        // }
        // getting the value of the event clicked
        targetVal = event.target.getAttribute('value')
        console.log(targetVal)
        // disable button so it can't be clicked again
        event.target.disabled = true
        let icon = this.querySelector('i')
        console.log(` ${turncounter + 1 }nth is from: ${whosturn}`)
        
        // validate which player is the source of input
        if (whosturn === "player1") {
          player1.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
          //addiing class for X icon
          player1.stamp.forEach(stmp => {
            icon.classList.add(stmp)
          });
          console.log(player1.inputs)
          // evaluate entries
          if (checkPattern(player1.inputs, pattern)) {
            // player1 wins
            console.log("Player 1 wins!")
            // whosturn = "player2" //lose are first turn
            removerIconCLass()
            hasWinner()
            return;
          }
          whosturn = "player2" // set other player for the next turn
        } else if (whosturn === "player2") {
          player2.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
            //addiing class for X icon
          player2.stamp.forEach(stmp => {
            icon.classList.add(stmp)
          });
          console.log(player2.inputs)
          // evaluate entries
          if (checkPattern(player2.inputs, pattern)) {
            // player2 wins
            console.log("Player 2 wins!")
            // whosturn = "player1" //lose are first turn
            removerIconCLass()
            hasWinner()
            return;
          }
          whosturn = "player1" // set other player for the next turn // also winner still 1st turn
        }
                // increment turn counter
                turncounter++;
        // check if game ended in a draw
        if (turncounter >= 9) {
          console.log("Game ended in a draw!")
          removerIconCLass()
          itsDraw()
        }
      }

      // add event listener to buttons
      function addBtnEvent() {
        for (let boxBtn of boxBtns) {
          boxBtn.addEventListener("click", pushValidate)
          boxBtn.disabled = false
        }
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
        player1.inputs = []
        player2.inputs = []
        console.log( player1.inputs)
        console.log( player2.inputs)
        turncounter = 0
        addBtnEvent()
      }

      resetBtn.addEventListener("click", () => {
        player1.inputs = []
        player2.inputs = []
        turncounter = 0
        addBtnEvent()
        removerIconCLass()
      });
      
      stop.addEventListener('click', () => {
              ingame = false; // intended for stop button
              for (let boxBtn of boxBtns) {
                boxBtn.disabled = true
              }
      })

    function removerIconCLass(){
      let iconClassResets = [...player1.stamp, ...player2.stamp]
      console.log(iconClassResets)
      console.log(icons)
      icons.forEach((icn) => {
        iconClassResets.forEach((clssrst) => {
          if(icn.classList.contains(clssrst)){
            icn.classList.remove(clssrst)
          }
        })
      })
    }

        // function applyName(){
    // // if (this.id === "player1-Name") { 
    // //   assignedName1 = this.value 
    // //   player1Lbl.textContent = assignedName1
    // //   console.log(player1Lbl)
    // // }else{
    // //   assignedName2 = this.value
    // //   player2Lbl.textContent = assignedName2
    // //   console.log(player2Lbl)
    // // }
    // }