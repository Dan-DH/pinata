async function game() {
    //clear the input form on page refresh
    document.querySelector(".input").value = "";

    //set the game over switch
    var gameOver = false;

    //pinata image array
    const imgs = ["./assets/images/pinata1.webp", "./assets/images/pinata2.webp", "./assets/images/pinata3.webp", "./assets/images/pinata4.webp", "./assets/images/pinata5.webp", "./assets/images/pinata6.webp", "./assets/images/pinata7.webp", "./assets/images/pinata8.webp"];

    //fetch the dictionary, pick a random word and turn it into an array
    const dict = await fetch("./dict.json").then(response => response.json());
    const target = dict.data[Math.floor(Math.random() * 2466)].split("");
    
    //create the decoy word array with hyphens and display it
    const decoy = [];

    target.map((l)=> {
        decoy.push("-");
    });

    var domDecoy = document.querySelector(".target");
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

    //set keyup event listener
    document.querySelector(".input").addEventListener("keydown", (key) => {

        //enforcing 1 char limit for mobile phones
        letter.value.length > 1 ? letter.value = letter.value.substring(0, 1) : true;

        //check if key pressed was 'enter' to submit the letter. keyCode works on mobile as well
        if (key.keyCode == "13" && !gameOver) {
            //check if the letter is neither in the word nor in the error list
            if (!letter.value == "" && !target.includes(letter.value) && !wrong.includes(letter.value)) {
                errors++;
                wrong.push(letter.value);
                errorList.innerHTML = wrong.join(" ");
            } else {
                //if the letter is in the word, show the matching letters
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