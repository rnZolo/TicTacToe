      // DOM elements
      const box = document.querySelector(".box"),
      boxBtns = document.querySelectorAll(".box-item"),
      icons = document.querySelectorAll('.xo'),
      reBtn = document.querySelector(".reset-Btn"),
      stop = document.querySelector(".stop-Btn"),
      players = document.querySelectorAll('header input'),
      player1TxtBox = document.getElementById('player1-Name'),
      player2TxtBox = document.getElementById('player2-Name'),
      player1Lbl = document.getElementById('p1-label'),
      player2Lbl = document.getElementById('p2-label'),
      p1Score = document.querySelector('.sc1'),
      p2Score = document.querySelector('.sc2')
    

      let assignedName1,
      assignedName2 

      players.forEach((player) => {
        player.addEventListener("input", applyName)
      })      // console.log(assignedName1, assignedName2)

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
        stamp: ["fa-regular", "fa-circle", "fa-beat-fade"]
      },
      // player 2 object
      player2 = {  
        name: `${assignedName2 ?? 'Player 2'}`,
        inputs: [],
        color: '#24D24A',
        score: 0,
        stamp: ["fa-solid", "fa-xmark", "fa-beat"]
      },
      btnsDefColor = 'white',
      btnsDisColor = '#cbd5e1'

      addBtnEvent()// adding event listener to each box item
      
      // Other InGame Elements  
      let whosturn = "player1", // dictates who's turn
      ingame = true, //for disabling the whole game
      turncounter = 0, // counter for draw
      history = [],
      historyCounter = 1,
      winner,
      matchedPattern = []

      // default name
      players.forEach((plyr) =>{
        defaultNaming()
        plyr.addEventListener('beforeinput', defaultNaming)
      })
      itsFocused(player1TxtBox, player1Lbl)
      blurrIt(player1TxtBox, player1Lbl)
      itsFocused(player2TxtBox, player2Lbl)
      blurrIt(player2TxtBox, player2Lbl)

      // validate inputs when box item is clicked
      function pushValidate() { console.log(player1.score)
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
            disableBtn(btnsDefColor)
            popOutAnim(player1.inputs, pattern)
            add1Pts(player1)
            showScore(player1 , p1Score, player2, p2Score)
            console.log("Player 1 wins!")   // player1 wins
            // whosturn = "player2" //lose are first turn
            winner = 'player 1'
            console.log(`${historyCounter} | ${player1.inputs} | ${player2.inputs} | ${winner} `)
                        setTimeout(function(){
                            popOutRemove(player1.inputs, pattern)
                            removerIconCLass() // remove the X/O icons classes
                            hasWinner() // apply ingame resets
                        },1000)
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
            disableBtn(btnsDefColor)
            add1Pts(player2)
            showScore(player1 , p1Score, player2, p2Score)
            popOutAnim(player2.inputs, pattern)
            
            console.log("Player 2 wins!") // player2 wins
                              // whosturn = "player1" //lose are first turn
            winner = 'player 2'
            console.log(`${historyCounter} | ${player1.inputs} | ${player2.inputs} | ${winner} `)
            setTimeout(function(){
              popOutRemove(player2.inputs, pattern)
              removerIconCLass() // remove the X/O icons classes
              hasWinner() // apply ingame resets
            },1000)
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
            setTimeout(function(){
              removerIconCLass() // remove the X/O icons classes
              itsDraw() // apply ingame resets
            },500)
          
        }//end draw
    }//end validate


      // giving default name
      function defaultNaming(){
        players.forEach((player, index) => {
          const thisHeader = player.parentNode.querySelector('.name-header');
          let thisPlayer = player.value.trim();
          if (!thisPlayer) {
            thisPlayer = `Player ${index + 1}`;
          }
          thisHeader.textContent = thisPlayer;
        });
      }
      
      // add event listener to buttons
      function addBtnEvent() {
        for (let boxBtn of boxBtns) {
          boxBtn.addEventListener("click", pushValidate)
          boxBtn.style.background = btnsDefColor
          boxBtn.disabled = false
        }
      }
      // check in every pattern if some inputs are  included and match with some pattern 
      function checkPattern(userInputs, winningPattensGroup) {
        //accepet two params the array of users input and array patterns
        // using someMethod that return true if condition is satisfied atleast once
        // it can be read as on eachpattern inside the patterns array
        return winningPattensGroup.some((eachWinningPattern) => {
          // on eachpattern it will test every value if it exist inside the users array
          // using everyMethod that return true 
          return eachWinningPattern.every((itsNumbers) => 
            userInputs.includes(itsNumbers)
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
        matchedPattern = []
        addBtnEvent()
      }
      // apply ingame resets if it's a draw
      function itsDraw() {
        player1.inputs = []
        player2.inputs = []
        turncounter = 0
        matchedPattern = []
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
          whosturn = "player1"
          turncounter = 0
          addBtnEvent()
          removerIconCLass()
        }
      });
      // stop or disable the game
      stop.addEventListener('click', () => {
            // loop to disable buttons
              disableBtn(btnsDisColor)
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

      function applyName(){
      if (this.id === "player1-Name") { 
        assignedName1 = this.value 
        player1Lbl.textContent = assignedName1
      }else{
        assignedName2 = this.value
        player2Lbl.textContent = assignedName2
      }
      }

      function itsFocused(txtBox, itsLbl){
        txtBox.addEventListener('focus', () => {
          txtBox.style.opacity = 1;
          itsLbl.style.opacity = 0;
          });

      }

      function blurrIt(txtBox, itsLbl){
        txtBox.addEventListener('blur', () => {
          txtBox.style.opacity = 0;
          itsLbl.style.opacity = 1;
      });
      }

      function disableBtn(color){
        for (let boxBtn of boxBtns) {
          let status = boxBtn.hasAttribute('disabled', false) // its true
          if (!status){
            boxBtn.style.background = color
            boxBtn.disabled = true
          }
        }
      }

      function toPop(userInputs, winningPatterns){
        //from the inputs check the values find the winning pattern
        winningPatterns.some((pattern) => {
          const patternMatchesInput = pattern.every((number) => userInputs.includes(number));
          if (patternMatchesInput){
            matchedPattern.push(...pattern);
          }
        })
              return matchedPattern;
      }

      function popOutAnim(inputs, pattern){
        let pop = toPop(inputs, pattern)
        pop.forEach((item) => {
            boxBtns.forEach((box) =>{
              if (item === box.value){
                  box.classList.add('animate-popout')
              }
          })
        })
      }

      function popOutRemove(inputs, pattern){
        let pop = toPop(inputs, pattern)
        pop.forEach((item) => {
        boxBtns.forEach((box) =>{
            if (item === box.value){
              box.classList.remove('animate-popout')
            }
          })
        })
      }

      function add1Pts(hepts){
        hepts.score++
      }

      function showScore(plyr1, sB1, plyr2, sB2){
          sB1.textContent = plyr1.score
          sB2.textContent = plyr2.score
      }