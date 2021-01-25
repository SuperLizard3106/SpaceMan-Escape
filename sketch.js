//All you have to do - the score(# of plasma)
//Already have one that doesn't work using HTML
//try some other way

var bg, bg2, bg3, bgImage;

var edges;

var spaceMan, spaceManImage, spaceManStop;

var asteroid, asteroidImage;

var asteroidGroup;

var satellite, satelliteImage;

var satelliteGroup;

var circuits, circuitsImage;

var ciruitsGroup;

var plasmaS, plasmaSImage;

var plasmaSGroup;

var plasmaL, plasmaLImage;

var plasmaLGroup;

var PLAY = 0;

var END = 1;

var gameStates  = PLAY;

function preload() {
    bgImage = loadImage("SpaceRunnerArtBG.png");

    spaceManImage = loadAnimation("space_man_running1.png", "space_man_running2.png");

    spaceManStop = loadAnimation("space_man_running1.png");

    asteroidImage = loadImage("space_game_asteroid.png");

    satelliteImage = loadImage("space_game_satellite.png");

    circuitsImage = loadImage("space_game_circuits.png");

    plasmaSImage = loadImage("space_game_plasma_S.png");

    plasmaLImage = loadImage("space_game_plasma_L.png");
}

function setup () {
    createCanvas(windowWidth, windowHeight);

    edges = createEdgeSprites();

    bg = createSprite(width/2,height/2,width,height);
    bg.addImage("background", bgImage);
    bg.scale = 2.2;
    bg.velocityX = -10;
    bg.x = width/2;

    bg2 = createSprite(bg.x - bg.width/2, height/2, width, height);
    bg2.addImage("background 2", bgImage);
    bg2.scale = 2.2;
    bg2.x = bg.x - bg.width; 
    
    bg3 = createSprite(bg.x - bg.width/2, height/2, width, height);
    bg3.addImage("background 2", bgImage);
    bg3.scale = 2.2;
    bg3.x = bg.x + bg.width;

    spaceMan = createSprite(width/4,height/2, 50,50);
    spaceMan.addAnimation("running", spaceManImage);
    spaceMan.addAnimation("stopped", spaceManStop);
    spaceMan.scale = 0.37;
    spaceMan.debug = false;
    spaceMan.setCollider("rectangle", 40,0, 300, spaceMan.height, 0);

    asteroidGroup = new Group();

    satelliteGroup = new Group();

    circuitsGroup = new Group();

    plasmaSGroup = new Group();

    plasmaLGroup = new Group();
}

function draw () {
    background(220); 

    console.log(bg.height);

    if (gameStates === PLAY) {

        spaceMan.bounceOff(edges);

        bg.velocityX = -10;
        if (bg.x < -50) {
            bg.x = width;
        }

        bg2.x = bg.x - bg.width;

        bg3.x = bg.x + bg.width;

        if (keyDown("down")) {
            spaceMan.y = spaceMan.y + 7.5;
        }

        if (keyDown("up")) {
            spaceMan.y = spaceMan.y - 7.5;
        }

        if (keyDown("left")) {
            spaceMan.x = spaceMan.x - 5;
        }

        if (keyDown("right")) {
            spaceMan.x = spaceMan.x + 5;
        }

        Asteroid();
        Satellite();
        Circuits();
        PlasmaS();
        PlasmaL();

        if (plasmaSGroup.isTouching(spaceMan) || plasmaLGroup.isTouching(spaceMan)) {
            plasmaSGroup.setVisibleEach(false);
            plasmaLGroup.setVisibleEach(false);
        }

        if (asteroidGroup.isTouching(spaceMan) || satelliteGroup.isTouching(spaceMan) || circuitsGroup.isTouching(spaceMan)) {
            gameStates = END;
        }
    } 

    else if (gameStates === END) {
        spaceMan.changeAnimation("stopped", spaceManStop);
        spaceMan.x = width/4;

        asteroidGroup.destroyEach();
        satelliteGroup.destroyEach();
        circuitsGroup.destroyEach();
        plasmaSGroup.destroyEach();
        plasmaLGroup.destroyEach();

        bg.velocityX = 0;
        bg2.velocityX = 0;
        bg3.velocityX = 0;

        textSize(50);
        text("Game Over", width/2, height/2);
    }

    drawSprites();
}

function Asteroid() {
    if (frameCount%450 === 0) {
        asteroid = createSprite(width, Math.round(random(100, height-100)), 50,50);
        asteroid.addImage("obs1", asteroidImage);
        asteroid.scale = random(0.28,0.41);
        asteroid.velocityX = -6;
        asteroid.lifetime = width/6 + 50;
        asteroid.debug = false;

        asteroidGroup.add(asteroid);
    }
}

function Satellite() {
    if (frameCount%350 === 0) {
       satellite = createSprite(width, Math.round(random(100, height-100)), 50,50);
       satellite.addImage("obs2", satelliteImage);
       satellite.scale = random(0.3,0.55);
       //var rand1 = random(0,360);
       //satellite.rotation = rand1;
       satellite.velocityX = -5;
       satellite.lifetime = width/5 + 50;
       satellite.debug = false;
       satellite.setCollider("rectangle", 0, 0, 600, 500, 0)

       satelliteGroup.add(satellite);

    }
}

function Circuits() {
    if (frameCount%250 === 0) {
        circuits = createSprite(width, Math.round(random(100, height-100)), 50,50);
        circuits.addImage("obs2", circuitsImage);
        circuits.scale = 0.1;
        circuits.rotation = random(0,360);
        circuits.velocityX = -4;
        circuits.lifetime = width/4 + 50;
        circuits.debug = false;

        circuitsGroup.add(circuits);
    }
}

function PlasmaS() {
    if (frameCount%300 === 0) {
        plasmaS = createSprite(width, Math.round(random(100, height - 100)), 50, 50);
        plasmaS.addImage("col1", plasmaSImage);
        plasmaS.scale = 0.1;
        plasmaS.rotation = random(0,180);
        plasmaS.velocityX = -10;
        plasmaS.lifetime = width/10 +50;
        plasmaS.debug = false;

        plasmaSGroup.add(plasmaS);
    }
}

function PlasmaL() {
    if (frameCount%500 === 0) {
        plasmaL = createSprite(width, Math.round(random(100, height - 100)), 50,50);
        plasmaL.addImage("col2", plasmaLImage);
        plasmaL.scale = 0.2;
        plasmaL.rotation = random(0,180);
        plasmaL.velocityX = -10;
        plasmaL.lifetime = width/10 + 50;
        plasmaL.debug = false;

        plasmaLGroup.add(plasmaL);
    }
}
