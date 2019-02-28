"use strict";
    var game = new Phaser.Game(1600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});
    
    var player;
    var cursor;
    var rock;
    var rocks;
    var counter = 0;
    var text = 0;
    var text2 = 0;
    var scoreLoop;
    var rockLoop;
    var background;
    var deathSound;
    
    function preload(){
        game.load.image('background', 'assets/Game_1/star-background.png');
        game.load.image('ship', 'assets/Game_1/ship1.png');
        game.load.image('ship2', 'assets/Game_1/ship2.png');
        game.load.image('rock', 'assets/Game_1/rock1.png');
        game.load.audio('boom', 'assets/Game_1/boom.mp3');
    }
    
    function create(){
        
        game.add.sprite(0, 0, 'background');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        scoreLoop = game.time.events.loop(Phaser.Timer.SECOND, score, this);        
        rockLoop = game.time.events.loop(Phaser.Timer.SECOND*1.5, spawnRock, this, 1.0, game.world.centerX, 81);
        
        
        text2 = game.add.text(175, 50, 'Score: 0', { font: "64px Arial", fill: "#ffffff", align: "left" });
        text2.anchor.setTo(0.5, 0.5);
        
        player = game.add.sprite(game.world.centerX, 819, 'ship');
        player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.drag.set(100);
        player.body.maxVelocity.set(200);
        player.body.collideWorldBounds = true;
        
        cursor = game.input.keyboard.createCursorKeys();
        
        rocks = game.add.group();
        game.physics.arcade.enable(rocks, Phaser.Physics.ARCADE);
        rocks.enableBody = true;
        
        deathSound = game.add.audio('boom');
    }
    
    function update(){
        
        if (cursor.up.isDown){
            game.physics.arcade.accelerationFromRotation(player.rotation-(Math.PI/2), 400, player.body.acceleration);
            player.loadTexture('ship2');
        }
        else {
            player.body.acceleration.set(0);
            player.loadTexture('ship');
        }
        if (cursor.right.isDown){
            player.body.angularVelocity = 300;
        }
        else if (cursor.left.isDown){
            player.body.angularVelocity = -300;
        }
        else{
            player.body.angularVelocity = 0;
        }
        
        game.physics.arcade.overlap(player, rocks, gameOver, null, this);
        game.physics.arcade.collide(rocks, rocks, killRock, null, this);
    }
    
    function spawnRock(newScale, spawnX, spawnY){
        rock = rocks.create(spawnX, spawnY, 'rock');
        rock.anchor.setTo(0.5, 0.5);
        rock.scale.setTo(newScale, newScale);
        rock.body.collideWorldBounds = true;
        rock.body.bounce.setTo(1.0);
        rock.angle = Math.floor(Math.random()*360);
        rock.body.setSize(129, 106, 5, 5);
        game.physics.arcade.velocityFromAngle(rock.angle, 200, rock.body.velocity);
    }
    
    function killRock(rock1, rock2){
        switch (rock1.scale.x){
            case 1.0:
                rock1.scale.setTo(0.5, 0.5);
                spawnRock(0.5, rock1.position.x, rock1.position.y);
                break;
            case 0.5:
                rock1.scale.setTo(0.25, 0.25);
                spawnRock(0.25, rock1.position.x, rock1.position.y);
                break;
            case 0.25:
                rock1.kill();
                counter+=25;
                break;
            default:
                break;
        }
        switch (rock2.scale.x){
            case 1.0:
                rock2.scale.setTo(0.5, 0.5);
                spawnRock(0.5, rock2.position.x, rock2.position.y);
                break;
            case 0.5:
                rock2.scale.setTo(0.25, 0.25);
                spawnRock(0.25, rock2.position.x, rock2.position.y);
                break;
            case 0.25:
                rock2.kill();
                counter+=25;
                break;
            default:
                break;
        }
    }
    
    function gameOver(){
        player.kill();
        deathSound.play();
        text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over!\nCreator\'s High Score: 3190', { font: "64px Arial", fill: "#ffffff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
        game.time.events.remove(scoreLoop);
        game.time.events.remove(rockLoop);
    }
    
    function score() {        
        counter+=10;
        text2.setText('Score: ' + counter);
    }
    function render() {
        
    }