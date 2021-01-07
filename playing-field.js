window.onload = function () {
    let scoreCounter = document.querySelector('.score__counter'),
        displayController = document.querySelector('.control__display'),
        controlButtons = document.querySelectorAll('.control__button'),
        wave = document.querySelector('.wave'),
        rainDrop = document.getElementById('drop'),
        dropSymbol = document.querySelector('.symbol'),
        numberFirst = document.querySelector('.number__first'),
        numberSecond = document.querySelector('.number__second'),
        bonusDrop = document.querySelector('.bonus__drop'),
        bonusSymbol = document.querySelector('.bonus__symbol'),
        bonusNumberFirst = document.querySelector('.bonus__number__first'),
        bonusNumberSecond = document.querySelector('.bonus__number__second'),
        bonusDropSound = document.querySelector('bonus__drop__sound'),
        wrongAnswerCount = 0;

    displayController.textContent='';
    controlButtons.forEach( controlButtons=> {
        controlButtons.addEventListener('click', function () {
            if (controlButtons.textContent === "Del") {
                displayController.textContent ='';
            } else if (controlButtons.textContent === "Clear") {
                displayController.textContent = displayController.textContent.slice(0, -1);
            } else if (controlButtons.textContent === "Enter"){
                checkAnswer();
            } else {
                displayController.textContent += controlButtons.textContent;
            }
        })
    });

    document.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                checkAnswer();
            } else if((event.key).match(/[0-9%]/)) {
                displayController.textContent+= event.key;
            } else if (event.key === 'Backspace') {
                displayController.textContent ='';
            }
    })
    let baseScoreUp = 0;
    let waveLevel = 50;

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomPosition(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let newRandom =function () {
        if (scoreCounter.textContent>150) {
            numberFirst.textContent = getRandomIntInclusive(1, 20);
            numberSecond.textContent = getRandomIntInclusive(1, 19);
        } else {
            numberFirst.textContent = getRandomIntInclusive(1, 10);
            numberSecond.textContent = getRandomIntInclusive(1, 9);
        }
    }
    let randomSymbol = function () {
        newRandom();
        if (Number(numberFirst.textContent) >=  Number(numberSecond.textContent)) {
            dropSymbol.textContent ="-"
        } else {
            dropSymbol.textContent='+'
        }
    };
    let dropSound = document.querySelector('.drop__sound')
    randomSymbol();
    let dropResult = function ()  {
        if ( dropSymbol.textContent ==="-") {
            return Number(numberFirst.textContent) - Number(numberSecond.textContent);
        } else {
            return Number(numberFirst.textContent) + Number(numberSecond.textContent);
        }
    }

   let checkAnswer = function () {
        if (displayController.textContent===String(dropResult())) {
            baseScoreUp+=10;
            scoreCounter.textContent = baseScoreUp;
            newRandom();
            dropDown();
            randomSymbol();
            reset_animation();
            dropSound.play();
        }  else if ( displayController.textContent === String(dropBonusResult()) && !bonusDrop.classList.contains('hidden')) {
            baseScoreUp += 10;
            scoreCounter.textContent = baseScoreUp;
            waveLevel = 50;
            wave.style.height = waveLevel + "px";
            bonusDrop.classList.remove('dropAnimation');
            bonusDrop.classList.add('hidden')}
            else {
            wrongAnswerCount+=1;
            waveLevel+=50;
            wave.style.height=waveLevel+"px";
            newRandom();
            randomSymbol();
            reset_animation();
            dropDown();

        }
        displayController.textContent='';

   }
    function reset_animation() {
        rainDrop.classList.add('dropAnimation')
        rainDrop.style.animation = 'none';
        rainDrop.offsetTop; /* trigger reflow */
        rainDrop.style.animation = null;

    }

   let dropDown= function () {
       (()=> {
           if (wrongAnswerCount===3){
              rainDrop.classList.remove('dropAnimation');
              rainDrop.classList.add('hidden');
              bonusDrop.classList.remove('dropAnimation');
              alert(' Game Over! Your score '+`${scoreCounter.textContent}`);
           }
       })();
    let dropPosition = function () {
        rainDrop.style.right = getRandomPosition(10, 1014) + 'px';
    }
    dropPosition();
   }
   dropDown();

    let bonusDropPosition = ()=> {
        bonusDrop.style.right = getRandomPosition(10, 1014) + 'px';
    }
    let newDropSound = document.querySelector('.new__drop__sound');
    rainDrop.addEventListener('animationend', function () {
        reset_animation();
        checkAnswer();
        newDropSound.play();
    });

    let newBonusRandom =function () {
        bonusNumberFirst.textContent = getRandomIntInclusive(1, 10);
        bonusNumberSecond.textContent = getRandomIntInclusive(1, 9);
    }
    let randomBonusSymbol = function () {
        newBonusRandom();
        if ( Number(bonusNumberFirst.textContent) >=  Number(bonusNumberSecond.textContent)) {
            bonusSymbol.textContent ="-";
        } else {
            bonusSymbol.textContent='+';
        }}
        let dropBonusResult = function ()  {
            if (bonusSymbol.textContent ==="-") {
                return Number(bonusNumberFirst.textContent) - Number(bonusNumberSecond.textContent);
            } else {
                return Number(bonusNumberFirst.textContent) + Number(bonusNumberSecond.textContent);
            }
        }

    let bonusDropAppear = ()=> {
        bonusDrop.classList.remove('hidden');
        bonusDrop.classList.add('dropAnimation');
        bonusDropPosition();
        newBonusRandom();
        randomBonusSymbol();
    }
    bonusDropAppear();
    bonusDrop.addEventListener('animationend', function () {
        bonusDrop.classList.add('hidden');
    });



    setInterval(bonusDropAppear, 20000);




    }
