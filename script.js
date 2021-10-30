async function game() {

    //set the game over switch
    var gameOver = false;

    //pinata image array
    const imgs = ["./assets/images/pinata1.png", "./assets/images/pinata2.png", "./assets/images/pinata3.png", "./assets/images/pinata4.png", "./assets/images/pinata5.png", "./assets/images/pinata6.png", "./assets/images/pinata7.png", "./assets/images/pinata8.png"];

    //fetch the dictionary and pick a random word
    const dict = await fetch("./dict.json").then(response => response.json())

    const target = dict.data[Math.floor(Math.random() * 2466)].split("");
    
    //create the decoy word with hyphens and display it
    const decoy = []; 
    target.map((l, i)=> {
        decoy.push("-");
    });

    var domDecoy = document.querySelector(".target")
    domDecoy.innerHTML = decoy.join(" "); 
    
    //set a variable to display wrong letters picked and another to count the errors committed
    var wrong = [];
    var errors = 0;

    //assign variables to the input box, pinata image and error list
    var letter = document.querySelector(".input")
    var pinata = document.querySelector(".pinata")
    var errorList = document.querySelector(".errorList")

    //set function to run at end game, regarless of result
    function endGame() {
        domDecoy.innerHTML = target.join(" ");
        domDecoy.style.animation = "endGame 3s";
    }

    //set keydown event listener. Activates when the user presses 'enter'
    document.querySelector(".input").addEventListener("keydown", (key) => {
        if (key.code === "Enter" && !gameOver) {
            //check if the letter is neither in the word nor in the error list
            if (!target.includes(letter.value) && !wrong.includes(letter.value)) {
                errors++;
                wrong.push(letter.value);
                errorList.innerHTML = wrong.join(" ");
            } else {
                //show the matching letters
                target.map((l, i)  => {
                    letter.value == l ? decoy[i] = letter.value : true;
                });
            }
            
            //refresh the decoy word display
            domDecoy.innerHTML = decoy.join(" ");
    
            //update pinata image and check if game has ended
            if (errors >= 6) {
                pinata.src = imgs[6];
                gameOver = true;
                endGame();
            } else {
                pinata.src = imgs[errors];
            }
    
            //check if player has guessed the word
            if (target.join(" ") == decoy.join(" ")) {
                gameOver = true;
                pinata.src = imgs[7];
                pinata.style.animation = "winDance 3s infinite"
                endGame();
            }
    
            //clear input box
            letter.value = ""; 
        }
    });

    //restart game function
    document.querySelector(".reload").addEventListener("click",() => {
        letter.value = "";
        window.location.reload();
        }); 
    }

//run the game
game();
