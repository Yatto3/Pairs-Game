(function(){
    "use strict"

    const cardsContainerElem = document.querySelector("[data-cards]");
    const secondsTextElem = document.querySelector('[data-seconds]');
    const millisecondsTextElem = document.querySelector("[data-milliseconds]")
    
    let userSequence = [];
    let cardContainer = [];
    let matchedCards = [];
    let timer = null;
    
    const imgSRC = [
        `./img/poker-dob.svg`,
        `./img/poker-christ.svg`,
        `./img/poker-red.svg`,
        `./img/poker-black.svg`,
        `./img/poker-none.svg`,
    ]
    
    function initCards(cardsContainer){
        let cards = cardsContainer.querySelectorAll(".card");
        shuffleImages(imgSRC);
        for ( let i = 0 ; i < cards.length ; i++){
            
            let img = new Image();
            img.src = imgSRC[i];
            cards[i].append(img);
            if ( i == 4) break;
        }
    
        let j = 0;
        shuffleImages(imgSRC);
        for ( let i = 5 ; i < cards.length ; i++){
            
            let img = new Image();
            img.src = imgSRC[j];
            cards[i].append(img);
            j++;
        }
    }
    
    function shuffleImages(imgArray){
        for (let i = imgArray.length - 1  ; i >= 0 ; i--){
            let tempIndex = imgArray[i];
            let randomIndex = Math.floor( Math.random() * imgArray.length );
            
            imgArray[i] = imgArray[randomIndex];
            imgArray[randomIndex] = tempIndex;
        }
        
    }
    
    function flip(card){
        if(!card.isFlipped){
            let img = card.querySelector("img");
            img.classList.toggle("flipped");
            card.classList.replace("pattern","backside");
            card.isFlipped = true ;
            return;
        }
        let img = card.querySelector("img");
        img.classList.remove("flipped");
        card.classList.replace("backside","pattern");
        card.isFlipped = false;
        return;
     }
    
    function checkResult(){
        if ( userSequence[0] === userSequence[1]){
            matchedCards.push(userSequence[0],userSequence[1]);
            if(matchedCards.length === 10){
                endGame();
                
            }
            userSequence.length = 0;
            cardContainer.forEach(card => {
                card.classList.toggle("match");
            })
            cardContainer.length = 0;
            return;
        }
        cardContainer.forEach(card => {
            setTimeout(() => {
                flip(card);
            },500);
        })
    
        cardContainer.length = 0;
        userSequence.length = 0;
        return;
    }
    
    function startTimer(){
        let s = 0;
        let ms = 0;
        timer = setInterval(() => {
            ms+=1 ;
            (ms < 9) ? millisecondsTextElem.innerHTML = ms : millisecondsTextElem.innerHTML = ms;
            if (ms > 99){
            s ++ ;
            ms = 0 ;
           (s <= 9) ? secondsTextElem.innerHTML = "0" + s : secondsTextElem.innerHTML = s ;
           }
        },10);
    }
    
    function endGame(){
      clearInterval(timer);
    }
    
    window.onload = function(){
        cardsContainerElem.querySelectorAll(".card").forEach(card => {
            card.isFlipped = false;
        })
        initCards(cardsContainerElem);
    }
    let clicks = 0;
    cardsContainerElem.addEventListener("click" ,(e) => {
        let card = e.target;
        
        let img = card.querySelector("img");
        if (card.classList[0] === "main-container") return;
        
        card.addEventListener("click", flip.call(null,card));
        if (clicks === 0){
            startTimer();
            clicks++;
        }
        
        if (userSequence.length < 2){
            cardContainer.push(card);
            userSequence.push(img.src);
    
            if ( userSequence.length === 2){checkResult();}
        }
        
    })
})()