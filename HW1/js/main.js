var game = new Phaser.Game(852, 839, Phaser.AUTO, '', {preload: preload, create: create, update: update});
    
    var player;
    var cursor;
    var rock;
    var counter = 0;
    var text = 0;
    var text2 = 0;
    var scoreLoop;
    var rockLoop;
    
    function preload(){
        game.load.image('ship', 'v1assets/ship1.png');
        game.load.image('rock', 'v1assets/rock1.png');
    }
    
    function create(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        scoreLoop = game.time.events.loop(Phaser.Timer.SECOND, score, this);        
        rockLoop = game.time.events.loop(Phaser.Timer.SECOND*1.5, spawnRock, this);
        
        text2 = game.add.text(175, 50, 'Score: 0', { font: "64px Arial", fill: "#ffffff", align: "left" });
        text2.anchor.setTo(0.5, 0.5);
        
        player = game.add.sprite(426, 819, 'ship');
        player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
        player.body.drag.set(100);
        player.body.maxVelocity.set(200);
        player.body.collideWorldBounds = true;
        
        cursor = game.input.keyboard.createCursorKeys();
        
        rocks = game.add.group();
        game.physics.arcade.enable(rocks, Phaser.Physics.ARCADE);
        rocks.enableBody = true;        
    }
    
    function update(){
        
        if (cursor.up.isDown){
        game.physics.arcade.accelerationFromRotation(player.rotation-(Math.PI/2), 200, player.body.acceleration);
        }
        else {
            player.body.acceleration.set(0);
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
    
    function spawnRock(){
        rock = rocks.create(426, 81, 'rock');
        rock.anchor.setTo(0.5, 0.5);
        rock.body.collideWorldBounds = true;
        rock.body.bounce.setTo(1.0);
        rock.angle = Math.floor(Math.random()*360);
        game.physics.arcade.velocityFromAngle(rock.angle, 200, rock.body.velocity);
    }
    
    function killRock(rock1, rock2){
        rock1.kill();
        rock2.kill();
        counter+=50
    }
    
    function gameOver(){
        player.kill();
        text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', { font: "64px Arial", fill: "#ffffff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
        game.time.events.remove(scoreLoop);
        game.time.events.remove(rockLoop);
    }
    
    function score() {        
        counter+=10;
        text2.setText('Score: ' + counter);
    }
//every second, spawn a rock at 426, 30, give random trajectory (180 degree range down and velocity)
    
//ship sprite taken from https://opengameart.org/content/spaceship-9
//rock sprite taken from https://opengameart.org/content/brown-asteroid