// 肖睿 1652772 脚本语言程序设计 todoMVC-Mobile todoMVC.js

"use strict";

( function() {
    var cardCount = 0;
    var selectedCardID = null;
    var tobedoneCount = 0;
    var editCardID = null;
    var totalCount = 0;

    var startx, starty;

    window.onload = function(){
        // bind the click events
        document.getElementById("all-button").onclick = allButton_click;
        document.getElementById("filter-all-button").onclick = filterAllButton_click;
        document.getElementById("filter-active-button").onclick = filterActiveButton_click;
        document.getElementById("filter-completed-button").onclick = filterCompletedButton_click;
        document.getElementById("clear-completed-button").onclick = clearCompletedButton_click;
        document.getElementById("write-button").onclick = writeButton_click;

        // load the storage
        loadStorage();

        // begin touch event, to calculate the slide direction
        document.addEventListener("touchstart", function(e){
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
        }, false);

        // end touch event
        document.addEventListener("touchend", function(e) {
            var endx, endy;
            endx = e.changedTouches[0].pageX;
            endy = e.changedTouches[0].pageY;
            var direction = getDirection(startx, starty, endx, endy);
            switch (direction) {
                case 1:
                    foldNav();
                    break;
                case 2:
                    unfoldNav();
                    break;
                default:
            }
        }, false);
    }


    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };

    /**
     * calculate the slide direction
     * @param {Number} startx - the start position in X axis
     * @param {Number} starty - the start position in Y axis
     * @param {Number} endx - the end position in X axis
     * @param {Number} endy - the end position in Y axis
     */
    function getDirection(startx, starty, endx, endy) {
        var movex = endx - startx;
        var movey = endy - starty;
        var result = 0;

        if (Math.abs(movex) < 2 && Math.abs(movey) < 2) {
            return result;
        }

        var angle = getAngle(movex, movey);
        if (angle >= -180 && angle <= 0) {
            result = 1;
        } else if (angle > 0 && angle < 180) {
            result = 2;
        }

        return result;
    }

    /**
     * get the card container
     * @return {Object} the card container
     */
    function getCardContainer(){
        return document.getElementById("card-container");
    }

    /**
     * load the localstorage if there is some
     */
    function loadStorage(){
        let cardListStr = localStorage.getItem("cardList");
        if(!cardListStr){
            return;
        }

        let cardList = cardListStr.split("_");
        cardList.forEach(cardID => {
            let text = localStorage.getItem(cardID+"para");
            let completed = (localStorage.getItem(cardID+"completed") == "true");

            addItem1(text,completed,parseInt(cardID.substr(4)));
        });
    }

    /**
     * add a new card, called by the load storage function
     * @param {String} text 
     * @param {Boolean} completed 
     * @param {Number} id 
     */
    function addItem1(text,completed,id){
        let inputTextArea = document.getElementById("write-text-area");

        if(text.length > 0){
            inputTextArea.value = text;
            let newCard = addItem(id);

            if(completed){
                newCard.classList.add("completed");

                tobedoneCount--;
                updateStatus();
            }
        }
    }

    /**
     * add a new card
     * @param {Number} id - the id of the new card
     */
    function addItem(id){
        let inputTextArea = document.getElementById("write-text-area");
        let text = inputTextArea.value;

        if(text.length <= 0){
            inputTextArea.placeholder = "Please tell me what needs to be done."

            return null;
        }else{
            inputTextArea.placeholder = "What to do next?"
            inputTextArea.value = "";

            if(id != null){
                var newCard = spawnNewCard(text,id);
            }else{
                var newCard = spawnNewCard(text);
            }
            document.getElementById("card-container").appendChild(newCard);

            tobedoneCount++;
            cardCount++;

            updateStatus();

            return newCard;
        }
    }

    /**
     * 
     * @param {String} text - the content text of the new card
     * @param {Number} id - the id if it needs to be specified
     */
    function spawnNewCard(text,id){
        let card = document.createElement("div");
        card.className = "card";

        if(id == null){
            card.id = "card"+totalCount;
            totalCount++;
        }else{
            card.id = "card"+id;

            if(id >= totalCount){
                totalCount = id + 1;
            }
        }

        // spawn the front side of the card
        let cardFront = document.createElement("div");
        cardFront.className = "card-front";
        card.appendChild(cardFront);
        
        let cardButtonLayer = document.createElement("div");
        cardButtonLayer.className = "card-button-layer";
        cardFront.appendChild(cardButtonLayer);
        cardButtonLayer.onclick = function(){
            editCardID = card.id;
            writeButton_click();
        };
        let cardButtonImg = document.createElement("img");
        cardButtonImg.className = "card-yes";
        cardButtonImg.src="res/write.png";
        cardButtonLayer.appendChild(cardButtonImg);
        let para = document.createElement("p");
        para.innerText = text;
        para.className = "card-text";
        para.id = card.id+"para";
        cardFront.appendChild(para);
        para.onclick = function(){
            if(card.classList.contains("card-selected")){
                selectedCardID = null;
                card.classList.remove("card-selected");
            }else{
                if(selectedCardID != null){
                    let selectedCard = document.getElementById(selectedCardID);

                    if(selectedCard != null){
                        selectedCard.classList.remove("card-selected");
                    }
                }

                selectedCardID = card.id;
                card.classList.add("card-selected");
            }
        }


        // spawn the back side of the card
        let cardBack = document.createElement("div");
        cardBack.className = "card-back";
        card.appendChild(cardBack);

        let backButtonNo = document.createElement("img");
        backButtonNo.src = "res/no_color.png";
        backButtonNo.className = "card-back-button";
        cardBack.appendChild(backButtonNo);
        backButtonNo.onclick = function(){
            deleteCard(card);
        }

        let backButtonOK = document.createElement("img");
        backButtonOK.src = "res/yes_color.png";
        backButtonOK.className = "card-back-button";
        backButtonOK.onclick = function(){
            completeCard(card);
        }
        cardBack.appendChild(backButtonOK);

        let backButtonBack = document.createElement("img");
        backButtonBack.src = "res/back_color.png";
        backButtonBack.className = "card-back-button";
        backButtonBack.onclick = function(){
            document.getElementById(selectedCardID).classList.remove("card-selected");
            selectedCardID = null;
        }
        cardBack.appendChild(backButtonBack);
        
        return card;
    }

    /**
     * click the all complete button
     */
    function allButton_click(){
        let allButton = document.getElementById("all-button");
        let cards = getCardContainer().children;

        if(!allButton.classList.contains("all-button-disable")){
            for(let i=0;i<cards.length;i++){
                if(!cards[i].classList.contains("completed")){
                    completeCard(cards[i]);
                }
            }

            updateStatus();
        }else{
            for(let i=0;i<cards.length;i++){
                completeCard(cards[i]);
            }

            updateStatus();
        }
    }

    /**
     * click the clear completed cards button
     */
    function clearCompletedButton_click(){
        let cardContainer = document.getElementById("card-container");

        let toDeleteChildren = new Array();

        for(let i=0;i<cardContainer.children.length;i++){
            let child = cardContainer.children[i];
            if(child.classList.contains("completed")){
                toDeleteChildren.push(child);
            }
        }

        // delete the completed cards
        toDeleteChildren.forEach(element => {
            deleteCard(element);
        });
    }

    /**
     * click the write button and show the write layer
     */
    function writeButton_click(){
        let writeButtonImg = document.getElementById("write-button-img");

        if(!writeButtonImg.classList.contains("hidden")){
            if(editCardID != null){
                document.getElementById("write-text-area").value = document.getElementById(editCardID+"para").innerText;
            }

            document.getElementById("ripple").classList.add("rippling");
            document.getElementById("write-button-wrapper").classList.add("clicked");
            document.getElementById("write-button").disabled = true;

            // wait for the ripple animation to finish
            window.setTimeout(showWriteLayer,700);
        }
        else{
            if(editCardID == null){
                let text = document.getElementById("write-text-area").value;
                let newCard = addItem();

                if(newCard == null){
                    return;
                }

                updateLocalStorageCardList();
                localStorage.setItem(newCard.id+"para",text);
                localStorage.setItem(newCard.id+"completed","false");
            }else{
                document.getElementById(editCardID+"para").innerText = document.getElementById("write-text-area").value;
                localStorage.setItem(editCardID+"para",document.getElementById("write-text-area").value);

                document.getElementById("write-text-area").value = "";
                editCardID = null;
            }

            document.getElementById("write-button-wrapper").classList.remove("clicked");

            document.getElementById("write-button-img").classList.remove("hidden");
            document.getElementById("ok-button-img").classList.add("hidden");
            document.getElementById("write-layer").classList.add("hidden");
            document.getElementById("write-button-layer").classList.remove("hidden");
        }

    }

    /**
     * show the layer of write the content of a card
     */
    function showWriteLayer(){
        document.getElementById("write-button").disabled = false;

        document.getElementById("write-button-img").classList.add("hidden");
        document.getElementById("ok-button-img").classList.remove("hidden");

        document.getElementById("ripple").classList.remove("rippling");
        document.getElementById("write-layer").classList.remove("hidden");

        document.getElementById("write-button-layer").classList.add("hidden");

        document.getElementById("write-text-area").focus();
    }

    /** 
     * delete the card
     * @param {Object} card - the card to be deleted
     */
    function deleteCard(card){
        if(!card.classList.contains("completed")){
            tobedoneCount--;
        }
        cardCount--;
        updateStatus();

        document.getElementById("card-container").removeChild(card);

        updateLocalStorageCardList();
        localStorage.removeItem(card.id+"para");
        localStorage.removeItem(card.id+"completed");
    }

    /** 
     * change the complete status of the card
     * @param {Object} card - the card to be changed status
     */
    function completeCard(card){
        if(!card.classList.contains("completed")){
            card.classList.add("completed");

            tobedoneCount--;

            localStorage.setItem(card.id+"completed","true");
        }else{
            card.classList.remove("completed");

            tobedoneCount++;

            localStorage.setItem(card.id+"completed","false");
        }
        updateStatus();

        if(selectedCardID != null){
            document.getElementById(selectedCardID).classList.remove("card-selected");
            selectedCardID = null;
        }
    }

    /**
     * update the count label, clear completed button and all complete button
     */
    function updateStatus(){
        document.getElementById("tobedone-count-label").innerText = tobedoneCount.toString();

        let clearAllCompletedButton = document.getElementById("clear-completed-button");
        if(tobedoneCount != cardCount){
            clearAllCompletedButton.classList.remove("clear-completed-button-disabled");
        }else{
            clearAllCompletedButton.classList.add("clear-completed-button-disabled");
        }

        if(tobedoneCount == 0){
            document.getElementById("all-button").classList.add("all-button-disable");
        }else{
            document.getElementById("all-button").classList.remove("all-button-disable");
        }
    }

    /**
     * click the filter buttons
     */
    function filterAllButton_click(){
        document.getElementById("filter-all-button").classList.add("selected");
        document.getElementById("filter-active-button").classList.remove("selected");
        document.getElementById("filter-completed-button").classList.remove("selected");

        let cards = getCardContainer().children;

        for(let i=0;i<cards.length;i++){
            cards[i].classList.remove("hidden");
        }
    }
    function filterActiveButton_click(){
        document.getElementById("filter-all-button").classList.remove("selected");
        document.getElementById("filter-active-button").classList.add("selected");
        document.getElementById("filter-completed-button").classList.remove("selected");

        let cards = getCardContainer().children;

        for(let i=0;i<cards.length;i++){
            if(!cards[i].classList.contains("completed")){
                cards[i].classList.remove("hidden");
            }else{
                cards[i].classList.add("hidden");
            }
        }
    }
    function filterCompletedButton_click(){
        document.getElementById("filter-all-button").classList.remove("selected");
        document.getElementById("filter-active-button").classList.remove("selected");
        document.getElementById("filter-completed-button").classList.add("selected");

        let cards = getCardContainer().children;

        for(let i=0;i<cards.length;i++){
            if(cards[i].classList.contains("completed")){
                cards[i].classList.remove("hidden");
            }else{
                cards[i].classList.add("hidden");
            }
        }
    }

    /**
     * update the card list storage
     */ 
    function updateLocalStorageCardList(){
        let cards = getCardContainer().children;
        let cardIDs = new Array();

        for(let i=0;i<cards.length;i++){
            cardIDs.push(cards[i].id);
        }

        localStorage.setItem("cardList",cardIDs.join("_"));
    }

    /**
     * fold and unfold the navigator
     */
    function foldNav(){
        document.getElementById("nav").classList.add("fold");
    }
    function unfoldNav(){
        document.getElementById("nav").classList.remove("fold");
    }
})();
