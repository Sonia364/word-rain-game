(function () {
    'use strict'

    class WordArrays {
        constructor() {
          this.array1 = ["Bed","Ice","Jar","Key","Pen","Leg","Top","Lid","Den","Gun","Bid","Bib","Pin","Hug","Sun"];
          this.array2 = ["Able","Acid","Game","Care","Dare","Back","Date","Find","Like","Help","Size","Shop","Text","Lamp","Step"];
          this.array3 = ["Blame","Faith","Blood","Apply","Admit","Black","Gray","Afore","Angry","Drive","Award","Dress","Earth","Birth","Dream"];
          this.array4 = ["Better","Bottle","Breath","Couple","Create","Expect","Handle","Fabric","Health","Mainly","Manual","Border","County","Export","Height"];
        }
      }
      
      class Game {
        constructor() {
          this.wordArrays = new WordArrays();
          this.level = 1;
          this.currentArray = this.wordArrays.array1;
          this.lives = 3;
          this.points = 0;
          this.speed = 50;
          this.topScores = [];
          this.successfulWords = 0; 
        }
      
        start() {
            this.points = 0;
            const playerName = prompt("Enter your name:");
            if (playerName) {
            this.playerName = playerName;
            const welcomeText = document.querySelector('.welcome-text');
            welcomeText.innerHTML = `Hello, ${playerName}! Let's start the game!`;
            this.playLevel();
            } else {
            console.log("Invalid name. Please try again.");
            }

        }

        level1() {
            this.currentArray = this.wordArrays.array1;
            this.speed = 50;
          }
        
          level2() {
            this.currentArray = this.wordArrays.array1.concat(this.wordArrays.array2);
            this.speed *= 0.9;
          }
        
          level3() {
            this.currentArray = this.wordArrays.array1.concat(this.wordArrays.array2, this.wordArrays.array3);
            this.speed *= 0.9;
          }
        
          level4() {
            this.currentArray = this.wordArrays.array1.concat(this.wordArrays.array2, this.wordArrays.array3, this.wordArrays.array4);
            this.speed *= 0.9;
          }

        playLevel() {
            
            const wordDisplay = document.querySelector('#wordDisplay');
            const userInput = document.querySelector('#userInput');
        
            let word = this.getRandomWord();
            wordDisplay.innerText = word;
        
            userInput.addEventListener('input', (event) => {
              const typedWord = event.target.value;
              if (typedWord === word) {
                this.updateScore(typedWord.length);
                word = this.getRandomWord();
                wordDisplay.innerText = word;
                wordDisplay.style.top = '0px';
                userInput.value = '';
                this.successfulWords++;
              }
            });
        
            const fallInterval = setInterval(() => {
              const topPos = parseInt(window.getComputedStyle(wordDisplay).top, 10);
              wordDisplay.style.top = topPos + 5 + 'px';
        
              if (topPos > 420) {
                this.successfulWords++;
                console.log(this.successfulWords);
                userInput.value = ''; // Clear entered value
                word = this.getRandomWord();
                wordDisplay.innerText = word;
                wordDisplay.style.top = '0px';
                this.updateLives()
              }
        
              if (this.lives === 0) {
                clearInterval(fallInterval);
                this.gameOver();
              }

              if (this.successfulWords === 10) {
                this.level++;
                alert(`Wohooo! You've reached at Level ${this.level}.`);
                const levelText = document.querySelector('.level-text');
                levelText.innerHTML = `Level: ${this.level}`;
                this.successfulWords = 0;
      
                if (this.level === 2) {
                  this.level2();
                } else if (this.level === 3) {
                  this.level3();
                } else if (this.level === 4) {
                  this.level4();
                }
      
            }
          

            }, this.speed);

           

          }
        
          updateScore(wordLength) {
            this.points += wordLength;
            const scoreElement = document.querySelector('#score');
            scoreElement.innerText = `Score: ${this.points}`;
          }
        
          getRandomWord() {
            const randomIndex = Math.floor(Math.random() * this.currentArray.length);
            return this.currentArray[randomIndex];
          }
        
        
          updateLives() {
            this.lives--;
            const livesElement = document.querySelector('#lives-count');
            livesElement.innerText = `${this.lives}`;
        
            if (this.lives === 0) {
              this.gameOver();
            }else{
               alert("Oops! You lost a live");
            }
          }
        
          gameOver() {
            const gameZone = document.querySelector('.game-over-wrap');
            const mainCont = document.querySelector('.main-wrap');
            mainCont.style.display = 'none';
            gameZone.innerHTML = `<p>Game over! Final score: ${this.points}</p><button id="restart-game">Restart</button>`;
            const restartBtn = document.querySelector('#restart-game');
            restartBtn.addEventListener('click', (event) => {
                this.restart();
                mainCont.style.display = 'block';
                gameZone.innerHTML = '';
            });
          }
      
          recordScore(playerName) {
            this.topScores.push({ name: playerName, score: this.points });
          }
        
          displayTopScores() {
            const sortedScores = this.topScores.sort((a, b) => b.score - a.score);
            const top5 = sortedScores.slice(0, 5);
            const topScoresCont = document.querySelector('#topScores');
            var inHtml = '';
            top5.forEach((score, index) => {
              inHtml += `${index + 1}. ${score.name}: ${score.score}<br>`;
            });
            topScoresCont.innerHTML = inHtml;
          }

          restart() {
            this.level = 1;
            this.currentArray = this.wordArrays.array1;
            this.lives = 3;
            this.successfulWords = 0;
            this.speed = 50;
            const userInput = document.querySelector('#userInput');
            //userInput.focus();
            this.recordScore(this.playerName);
            this.displayTopScores();
            this.start();
          }
      }
      
      const game = new Game();
    game.start();

      
}())