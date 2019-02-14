"use strict";

window.onload = function() {
    var game = new Phaser.Game( 936, 755, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
    
    var worldScreen;
    var leftBox;
    var rightBox;
    var ui;
    var descText;
    var searchButton;
    var moveButton;
    var moveAction = false;
    var searchAction = false;
    var kitchenBoxes;
    var gardenBoxes;
    var garageBoxes;
    var box1;
    var box2;
    var box3;
    var box4;
    var box5;
    var box6;
    var box7;
    var box8;
    var box9;
    var p1TrophyCount = 0;
    var p2TrophyCount = 0;
    var trophies;
    var turn = false; //false for P1, true for P2;
    var turnDisplay;
    var winnerText;
    var foundTrophy;
    var winSound;
    
    function preload() {
        
        game.load.image('world', 'assets/world.png');
        game.load.image('left', 'assets/arrow_left_trans.png');
        game.load.image('right', 'assets/arrow_right_trans.png');
        game.load.image('ui', 'assets/UI.png');
        game.load.image('move', 'assets/Move.png');
        game.load.image('search', 'assets/Search.png');
        game.load.image('searchBox', 'assets/searchBox.png');
        game.load.image('trophy', 'assets/trophy.png');
        game.load.audio('zelda', 'assets/zelda_secret.mp3');
        game.load.audio('victory', 'assets/victory.mp3');
    }
    
    function create() {
        worldScreen = game.add.sprite(0, 0, 'world');
        
        leftBox = game.add.sprite(0, 186, 'left');
        
        rightBox = game.add.sprite(798, 186, 'right')
        
        ui = game.add.sprite(0, 550, 'ui');
        descText = game.add.text(5, 555, 'You find yourself inside of an immaculate kitchen.', { font: "bold 22px Arial", fill: "#000", align: "center" });
        foundTrophy = game.add.audio('zelda');
        winSound = game.add.audio('victory');
        
        moveButton = game.add.button(480, 624, 'move', toggleMove);
        searchButton = game.add.button(630, 624, 'search', toggleSearch);
        
        box1 = game.add.button(147, 440, 'searchBox', search, this);    //
        box2 = game.add.button(670, 74, 'searchBox', search, this);
        box3 = game.add.button(850, 400, 'searchBox', search, this);    //
        box4 = game.add.button(235, 417, 'searchBox', search, this);
        box5 = game.add.button(338, 185, 'searchBox', search, this);
        box6 = game.add.button(692, 355, 'searchBox', search, this);    //
        box7 = game.add.button(75, 486, 'searchBox', search, this);     //
        box8 = game.add.button(497, 265, 'searchBox', search, this);
        box9 = game.add.button(763, 394, 'searchBox', search, this);    //
        
        kitchenBoxes = game.add.group();
        garageBoxes = game.add.group();
        gardenBoxes = game.add.group();
        
        kitchenBoxes.add(box1);
        kitchenBoxes.add(box2);
        kitchenBoxes.add(box3);
        
        garageBoxes.add(box4);
        garageBoxes.add(box5);
        garageBoxes.add(box6);
        
        gardenBoxes.add(box7);
        gardenBoxes.add(box8);
        gardenBoxes.add(box9);
        
        kitchenBoxes.alpha = 0.0;
        gardenBoxes.alpha = 0.0;
        garageBoxes.alpha = 0.0;
        
        trophies = game.add.group();
        
        turnDisplay = game.add.text(240, 0, 'PLAYER 1\'S TURN', { font: "bold 64px Arial", fill: "#000", align: "center" });
        
    }
    
    function update() {
        
        rightBox.events.onInputDown.add(moveRight);
        leftBox.events.onInputDown.add(moveLeft); 
        switch (p1TrophyCount){
            case 0:
                break;
            case 1:
                trophies.create(11, 595, 'trophy');
                break;
            case 2:
                trophies.create(11, 595, 'trophy');
                trophies.create(162, 595, 'trophy');
                break;
            case 3:
                trophies.create(11, 595, 'trophy');
                trophies.create(162, 595, 'trophy');
                trophies.create(313, 595, 'trophy');
                victoryTrigger(false);
                break;
            default:
                break;             
            }
        switch (p2TrophyCount){
            case 0:
                break;
            case 1:
                trophies.create(11, 595, 'trophy');
                break;
            case 2:
                trophies.create(11, 595, 'trophy');
                trophies.create(162, 595, 'trophy');
                break;
            case 3:
                trophies.create(11, 595, 'trophy');
                trophies.create(162, 595, 'trophy');
                trophies.create(313, 595, 'trophy');
                victoryTrigger(true);
                break;
            default:
                break;             
            }
    }
    
    function toggleTurn(){
        if (turn == false){
            turn == true;
            turnDisplay.setText('PLAYER 2\'S TURN');
        }
        else if (turn == true){
            turn == false;
            turnDisplay.setText('PLAYER 1\'S TURN');
        }
    }
    
    function search(box){
        if (box == box1 || box == box3 || box == box6 || box == box7 || box == box9){
            if (turn == false){
                p1TrophyCount++;
            }
            if (turn == true){
                p2TrophyCount++;
            }
            box.inputEnabled = false;
            box.alpha = 0.0;
            foundTrophy.play();
        }
        toggleTurn();
    }
    
    function moveLeft(){
        
        if (moveAction == true && worldScreen.x == 0){
            worldScreen.x -= 1872;
        }
        else if (moveAction == true){
            worldScreen.x += 936;
        }
        updateScreen();
        moveAction = false;
        toggleTurn();
    }
    
    function moveRight(){
        if (moveAction == true && worldScreen.x == -1872){
            worldScreen.x += 1872;
        }
        else if (moveAction == true){
            worldScreen.x -= 936;
        }
        updateScreen();
        moveAction = false;
        toggleTurn();
    }
    
    function updateScreen(){
        if (worldScreen.x == 0 && searchAction == false){
            descText.setText('You find yourself inside of an immaculate kitchen.');
        }
        else if (worldScreen.x == -936 && searchAction == false){
            descText.setText('You find yourself inside of a beautiful garden.');
        }
        else if (worldScreen.x == -1872 && searchAction == false){
            descText.setText('You find yourself inside of a well-organized garage.');
        }
        if (searchAction == true){
            if (worldScreen.x == 0){
                kitchenBoxes.alpha = 1.0;
                kitchenBoxes.inputEnabled = true;
            }
            else if (worldScreen.x == -936){
                gardenBoxes.alpha = 1.0;
                gardenBoxes.inputEnabled = true;
            }
            else if (worldScreen.x == -1872){
                garageBoxes.alpha = 1.0;
                garageBoxes.inputEnabled = true;
            }
        }
        else if (searchAction == false){
            kitchenBoxes.alpha = 0.0;
            kitchenBoxes.inputEnabled = false;
            gardenBoxes.alpha = 0.0;
            gardenBoxes.inputEnabled = false;
            garageBoxes.alpha = 0.0;
            garageBoxes.inputEnabled = false;
        }
        if (turn == false){
            switch (p1TrophyCount){
                case 0:
                    break;
                case 1:
                    trophies.create(11, 595, 'trophy');
                    break;
                case 2:
                    trophies.create(11, 595, 'trophy');
                    trophies.create(162, 595, 'trophy');
                    break;
                case 3:
                    trophies.create(11, 595, 'trophy');
                    trophies.create(162, 595, 'trophy');
                    trophies.create(313, 595, 'trophy');
                    victoryTrigger(false);
                    break;
                default:
                    break;             
            }
        }
        if (turn == true){
            switch (p2TrophyCount){
                case 0:
                    break;
                case 1:
                    trophies.create(11, 595, 'trophy');
                    break;
                case 2:
                    trophies.create(11, 595, 'trophy');
                    trophies.create(162, 595, 'trophy');
                    break;
                case 3:
                    trophies.create(11, 595, 'trophy');
                    trophies.create(162, 595, 'trophy');
                    trophies.create(313, 595, 'trophy');
                    victoryTrigger(true);
                    break;
                default:
                    break;             
            }
        }
    }
    
    function toggleMove(){
        searchAction = false;
        updateScreen();
        if (moveAction == false){
            moveAction = true;
            descText.setText('Where would you like to go? Click on the corresponding arrow.');
            leftBox.inputEnabled = true;
            rightBox.inputEnabled = true;
        }
        else if (moveAction == true){
            moveAction = false;
            leftBox.inputEnabled = false;
            rightBox.inputEnabled = false;
            updateScreen();
        }
    }
    
    function toggleSearch(){
        moveAction = false;
        updateScreen();
        if (searchAction == false){
            searchAction = true;
            descText.setText('Click on a red box to search that location.');
            updateScreen();
        }
        else if (searchAction == true){
            searchAction = false;
            updateScreen();
        }
    }
    function victoryTrigger(winner){
        game.world.removeAll();
        if (winner == true){
            winnerText = game.add.text(game.world.centerX, game.world.centerY, 'Player 2 Wins!', { font: "64px Arial", fill: "#ffffff", align: "center" });
            winnerText.anchor.setTo(0.5, 0.5);
            winSound.play();
        }
        if (winner == false){
            winnerText = game.add.text(game.world.centerX, game.world.centerY, 'Player 1 Wins!', { font: "64px Arial", fill: "#ffffff", align: "center" });
            winnerText.anchor.setTo(0.5, 0.5);
            winSound.play();
        }
    }
};
