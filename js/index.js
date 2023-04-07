      // DOM elements
      const box = document.querySelector(".box"),
      boxBtns = document.querySelectorAll(".box-item"),
      icons = document.querySelectorAll('.xo'),
      reBtn = document.querySelector(".reset-Btn"),
      stop = document.querySelector(".stop-Btn"),
      players = document.querySelectorAll('header input'),
      player1TxtBox = document.getElementById('player1-Name'),
      player2TxtBox = document.getElementById('player2-Name')
    

      let assignedName1,
      assignedName2 

      // players.forEach((player) => {
      //   player.addEventListener("input", applyName)
      // })      // console.log(assignedName1, assignedName2)

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
        color: '#745DFF',
        score: 0,
        stamp: ["fa-solid", "fa-xmark", "fa-beat"],
      },
      // player 2 object
      player2 = {  
        name: `${assignedName2 ?? 'Player 2'}`,
        inputs: [],
        color: '#24D24A',
        score: 0,
        stamp: ["fa-regular", "fa-circle", "fa-beat-fade"],
      },
      btnsDefColor = 'white',
      btnsDisColor = '#cbd5e1'

      addBtnEvent()// adding event listener to each box item
      
      // Other InGame Elements  
      let whosturn = "player1", // dictates who's turn
      ingame = true, //for disabling the whole game
      turncounter = 0, // counter for draw
      pN = 1, // player Number
      history = [],
      historyCounter = 1,
      winner

      // //default name
      // players.forEach((player) => {
      // let thisPlayer = player.value ?? undefined
      // player.textContent = thisPlayer ?? `Player ${pN}` 
      // pN++
      // })

      // validate inputs when box item is clicked
      function pushValidate() {
        console.log(` ${turncounter + 1 }nth is from: ${whosturn}`) // log turncounts and player who click

        let targetVal = this.getAttribute('value') // getting the value of the event clicked
        this.disabled = true // disable button so it can't be clicked again
        let icon = this.querySelector('i') // use the clicked item to set the target icon
        
        // validate which player is the source of input
        if (whosturn === "player1") {
          player1.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
          this.style.background = player1.color
          // loop to add class in target icon
          player1.stamp.forEach(stmp => {
            icon.classList.add(stmp) //addiing class for X icon
          });

          // evaluate if array of entries match with winning pattern
          if (checkPattern(player1.inputs, pattern)) {
            console.log("Player 1 wins!")   // player1 wins
                                // whosturn = "player2" //lose are first turn
            winner = 'player 1'
            console.log(`${historyCounter} | ${player1.inputs} | ${player2.inputs} | ${winner} `)
            removerIconCLass() // remove the X/O icons classes
            hasWinner() // apply ingame resets
            return ; //return use to end the whole validate function // result winner still first try turn
            
          }//end checkpattern
          whosturn = "player2"// set other player for the next turn 
          //end win player 1
        } else if (whosturn === "player2") {
          this.style.background = player2.color
          player2.inputs.push(targetVal) // add the inputs as entry to the array for pattern validation
          // loop to add class in target icon
          player2.stamp.forEach(stmp => {
            icon.classList.add(stmp)  //addiing class for O icon
          });

          // evaluate if array of entries match with winning pattern
          if (checkPattern(player2.inputs, pattern)) {
            console.log("Player 2 wins!") // player2 wins
                              // whosturn = "player1" //lose are first turn
            winner = 'player 2'
            console.log(`${historyCounter} | ${player1.inputs} | ${player2.inputs} | ${winner} `)
            removerIconCLass() // remove the X/O icons classes
            hasWinner() // apply ingame resets
            return; //return use to end the whole validate function // result winner still first turn

          } //end checkpattern 
          whosturn = "player1" // set other player for the next turn 

        } //end win player 2
          turncounter++; // increment if noone wins
        // check if game ended in a draw
        if (turncounter >= 9) {
          console.log("Game ended in a draw!")
          winner = 'draw'
          console.log(`${historyCounter} | ${player1.inputs} | ${player2.inputs} | ${winner} `)
          removerIconCLass()  // remove the X/O icons classes
          itsDraw() // apply ingame resets
          
        }//end draw
    }//end validate
      // add event listener to buttons
      function addBtnEvent() {
        for (let boxBtn of boxBtns) {
          boxBtn.addEventListener("click", pushValidate)
          boxBtn.style.background = btnsDefColor
          boxBtn.disabled = false
        }
      }
      // check in every pattern if some inputs are  included and match with some pattern 
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
      // apply ingame resets if there's a winner
      function hasWinner() {
        reBtn.style.display = "block"
        stop.style.display = 'block'
        player1.inputs = []
        player2.inputs = []
        turncounter = 0
        addBtnEvent()
      }
      // apply ingame resets if it's a draw
      function itsDraw() {
        player1.inputs = []
        player2.inputs = []
        console.log( player1.inputs)
        console.log( player2.inputs)
        turncounter = 0
        addBtnEvent()
      }
      // reset the game elements
      reBtn.addEventListener("click", () => {
        if (ingame){
          player1.inputs = []
          player2.inputs = []
          turncounter = 0
          addBtnEvent()
          removerIconCLass()
        }else{
          ingame = true; 
          reBtn.textContent = 'restart'
          player1.inputs = []
          player2.inputs = []
          turncounter = 0
          addBtnEvent()
          removerIconCLass()
        }
      });
      // stop or disable the game
      stop.addEventListener('click', () => {
            // loop to disable buttons
              for (let boxBtn of boxBtns) {
                let status = boxBtn.hasAttribute('disabled', false) // its true
                if (!status){
                  boxBtn.style.background = btnsDisColor
                  boxBtn.disabled = true
                }
              }
              reBtn.textContent = 'Reset'
              ingame = false; // intended for stop button
      })
      // remover classes in icons
    function removerIconCLass(){
      let iconClassResets = [...player1.stamp, ...player2.stamp] // merge to arrays 
      // loop each icon
      icons.forEach((icn) => {
        //loop each class to be removed in icons
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

    ///ne