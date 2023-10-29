
var splashScreen, play, next, bgimg
var gameState = "wait"
var playbutton, musicbutton, mutebutton, nextbutton, bgSound, player, bombimg, bomb
var bg, bgImg;
var player, shooterImg, shooter_shooting, invisibleground;
var boxGroup, villain, patronus, villainGroup, avadakedavra,villainGroup2,boxGroup2,playerimg

var PLAY = 1;
var END = 0;
// var gameState = PLAY;
var score = 70

function preload() {
    splashScreen = loadImage("splash.gif")
    bgImg = loadImage("bgImg2.png")

    bgSound = loadSound("backgroundmusic.mp3")
    bombimg = loadImage("bomb.gif")



    // harryImg = loadAnimation("zombie.png", "zombie.png")
    harryImg = loadImage("zombie.png", "zombie.png")
    voldemortImg = loadImage("bomb.gif")
    dementorImg = loadImage("obs.png")
    boxImg = loadImage("box.png")
    killspellImg = loadImage("avada-kedavra.png")
    patronusspellImg = loadImage("patronus.png")


    harry_running = loadImage("zombie.png", "zombie.png")

    explosionSound = loadSound("explosion.mp3")
    loseSound = loadSound("lose.mp3")
    winSound = loadSound("win.mp3")
    playerimg=loadImage("skeleton.gif")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    explosionSound.setVolume(0.25)
    loseSound.setVolume(0.25)
    winSound.setVolume(0.25)

    playbutton = createImg("play.png")
    playbutton.position(width / 2 - 200, height - 200)
    playbutton.size(150, 150)

    musicbutton = createImg("music.png")
    musicbutton.position(playbutton.x + 200, height - 200)
    musicbutton.size(160, 150)
    musicbutton.mouseClicked(mute)


    mutebutton = createImg("mute.png")
    mutebutton.position(playbutton.x + 200, height - 200)
    mutebutton.size(160, 150)
    mutebutton.mouseClicked(mute)
    mutebutton.hide()

    bg = createSprite(width / 2, height / 2.5)
    // ground.x = ground.width /2;
    bg.addImage("ground", bgImg)
    bg.scale = 4.65
    bg.visible = false




    //creating the player sprite
    player = createSprite(150, windowHeight - 15);
    player.addImage("running", harry_running)
    player.addImage("idle", harryImg)
    player.addImage("level2",playerimg)
    player.scale = 0.8
    player.visible = false

    //  player.debug = true
    // player.setCollider("rectangle", 0, 0, 20, 30)


    invisibleground = createSprite(width / 2, height - 10, width, 20)
    invisibleground.visible = false

    boxGroup = createGroup()
    villainGroup = createGroup()
    patronusGroup = createGroup()
    avadaGroup = createGroup()
    boxGroup2 = createGroup()
    villainGroup2 = createGroup()
}



function draw() {
    //     background(0);
    if (gameState == "wait") {
        background(splashScreen)
    }

    playbutton.mousePressed(() => {
        gameState = "about"
    })


    if (gameState == "about") {
        popabout()
        playbutton.hide()
        musicbutton.hide()
    }



    if (gameState === PLAY) {
        bg.visible = true
        playbutton.hide()
        musicbutton.hide()
        mutebutton.hide()
        bg.velocityX = -6;
        player.visible = true

        if (bg.x < 0) {
            bg.x = bg.width / 3;
        }
        if ((keyDown("space") && player.y >= 750) || touches.length > 0) {
            player.velocityY = -25
            console.log(player.y)
            player.changeImage("idle")
        }

        player.velocityY = player.velocityY + 0.9

        spawnBoxes()
        spawnVillains()

        player.overlap(boxGroup, touched)
        player.overlap(villainGroup, collided)
        patronusGroup.overlap(villainGroup, crashed)


        if (score <= 0) {
            gameState = "END"
        }


        if (score >= 100) {
            gameState = "WIN"
        }
    }


    if (gameState === "level2") {
        bg.visible = true
        playbutton.hide()
        musicbutton.hide()
        mutebutton.hide()
        bg.velocityX = -6;
        player.changeImage("level2")
        player.visible = true

        if (bg.x < 0) {
            bg.x = bg.width / 3;
        }
        if ((keyDown("space") && player.y >= 750) || touches.length > 0) {
            player.velocityY = -25
            console.log(player.y)
            player.changeImage("idle")
        }

        player.velocityY = player.velocityY + 0.9

        spawnBoxes2()
        spawnVillains2()

        player.overlap(boxGroup2, touched)
        player.overlap(villainGroup2, collided)
        patronusGroup.overlap(villainGroup2, crashed)


        if (score <= 0) {
            gameState = "END"
        }


        if (score >= 150) {
            gameState = "finalWIN"
        }
    }

    //moving the player up and down and making the game mobile compatible using touches


    if (keyDown("DOWN_ARROW")) {
        castPatronus()
    }



    player.collide(invisibleground)

    drawSprites();


    if (gameState == "END") {
        bg.velocityX=0
        gameOver()
    }
    if (gameState == "WIN") {
        bg.velocityX = 0
        villainGroup.destroyEach()
        patronusGroup.destroyEach()
        boxGroup.destroyEach()
        WON()
    }

    if (gameState == "finalWIN") {
        bg.velocityX = 0
        villainGroup2.destroyEach()
        patronusGroup.destroyEach()
        boxGroup2.destroyEach()
        FinalWON()
    }


    if (gameState == PLAY || gameState =="level2") {
        fill("cyan")
        textSize(30)
        stroke("black")
        strokeWeight(3)
        textStyle(BOLDITALIC);
        text("SCORE : " + score, width - 200, 50)
    }
}

function spawnBoxes() {
    if (frameCount % 200 === 0) {
        var box = createSprite(width, displayHeight - 190, 20, 80)
        box.velocityX = -7
        box.addImage(boxImg)
        box.lifetime = 600
        box.scale = 0.35
        boxGroup.add(box)

    }
}


function spawnBoxes2() {
    if (frameCount % 200 === 0) {
        var box = createSprite(width, displayHeight - 190, 20, 80)
        box.velocityX = -7
        box.addImage(boxImg)
        box.lifetime = 600
        box.scale = 0.35
        boxGroup2.add(box)

    }
}
function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        musicbutton.show();
        mutebutton.hide();
        console.log("mute")
    }
    else {
        mutebutton.show()
        musicbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}

function touched(player, box) {
    score -= 5
    //boxGroup.destroyEach()
    box.remove()
    loseSound.play()
}

function collided(player, villain) {
    score -= 20
    // villainGroup.destroyEach()
    villain.remove()
    loseSound.play()
}

function crashed(villain, patronus) {
    score += 15
    explosionSound.play()
    winSound.play()
    villain.remove()
    patronus.remove()

}

function spawnVillains() {
    if (frameCount % 275 === 0) {
        var villain = createSprite(width, displayHeight - 270, 50, 80)
        villain.velocityX = -7
        var rand = Math.round(random(1, 2));
        switch (rand) {
            case 1: villain.addImage(voldemortImg);

                villain.scale = 0.6
                break;
            case 2: villain.addImage(dementorImg);

                villain.scale = 0.75
                break;
        }

        villain.lifetime = 400
        villainGroup.add(villain)
    }


}

function spawnVillains2() {
    if (frameCount % 275 === 0) {
        var villain = createSprite(width, displayHeight - 270, 50, 80)
        villain.velocityX = -7
        var rand = Math.round(random(1, 2));
        switch (rand) {
            case 1: villain.addImage(voldemortImg);

                villain.scale = 0.6
                break;
            case 2: villain.addImage(dementorImg);

                villain.scale = 0.75
                break;
        }

        villain.lifetime = 400
        villainGroup2.add(villain)
    }


}

function castPatronus() {
    var patronus = createSprite(100, displayHeight - 250, 5, 5)
    patronus.velocityX = 4
    patronus.scale = 0.6
    patronus.addImage(patronusspellImg)
    patronusGroup.add(patronus)

}


function gameOver() {
    swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Replay'
    },

        function () {

            window.location.reload();
        }
    );
}




function FinalWON() {

    swal({
        title: `TRANSFORMATION COMPLETE!!!`,
        text: "YOU HAVE TRANSFORMED TO A HUMAN...!!!",
        imageUrl:
            "boyreal.png",
        imageSize: "300x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Restart'
    },

        function () {

            window.location.reload();
        }
    );
}




function WON() {

    swal({
        title: `TRANSFORMATION STARTED!!!`,
        text: "YOU HAVE TRANSFORMED TO A Skeleton...!!!",
        imageUrl:
            "skeleton.gif",
        imageSize: "300x300",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Next Level'
    },

        function () {

            nextlevel();
        }
    );
}

function nextlevel(){

    gameState="level2"
}


function popabout() {
    swal({
        title: "Zombie Survival!!",
        text: "Let the Zobmie collect .. self help Items!!",
        imageUrl: "skull.png",
        imageSize: "200x200",
        confirmButtonText: "START ",
        confirmButtonColor: "green"

    },
        function () {
            gameState = PLAY
        })


}










