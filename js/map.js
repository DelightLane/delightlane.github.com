var tiles = [];
var placeObjects = [];
var player;

function init() {

    // 플레이어 초기화
    var playerPos = {};

    if(COLS % 2 != 0)
    {
        playerPos.x = (COLS - 1) / 2;
    }
    else
    {
        playerPos.x = COLS / 2;
    }

    if(ROWS % 2 != 0)
    {
        playerPos.y = (ROWS - 1) / 2;
    }
    else
    {
        playerPos.y = ROWS / 2;
    }

    player = new Player(playerPos);


    // TODO : 맵 정보를 가져와서 처리하도록 변경해야 함. 현재는 하드 코딩.

    // 맵 초기화
    for ( var y = 0; y < ROWS; ++y ) {
        tiles[y] = [];
        for ( var x = 0; x < COLS; ++x ) {
            tiles[y][x] = new Tile({x:x, y:y}, player);
            if(y == 1)
            {
                tiles[y][x].setType("road");
            }
        }
    }

    // 집 초기화
    var houseImgCreator = function(){
        var resName = "house" + Math.floor(Math.random() * 10 % 3);
        var img = new Image();
        img.src = SITE_URL + "/resource/" + resName + ".png";
        return img;
    };

    placeObjects.push(new TriggerObject({x : 0, y : 0}, player, houseImgCreator(), function(){
        window.location.href = 'http://a306.cafe24.com/';
    }));

    placeObjects.push(new TriggerObject({x : 1, y : 1}, player, houseImgCreator(), function(){
        window.location.href = 'http://a306.cafe24.com/';
    }));

    placeObjects.push(new TriggerObject({x : 2, y : 2}, player, houseImgCreator(), function(){
        window.location.href = 'http://a306.cafe24.com/';
    }));


    var signboardProfile = new TriggerObject({x : 1, y : 0}, player, function(){
        var img = new Image();
        img.src = SITE_URL + "/resource/signboardprofile.png";

        return img;
    }(), function(){
        setDecription("하이욤");
    });
    signboardProfile.obstacle = true;
    placeObjects.push(signboardProfile);
}

function drawTiles(){
    var canvasWidth = window.innerWidth < 600 ? window.innerWidth : 600;

    initCanvas(canvasWidth, 300);

    if(tiles.length > 0){
        for ( var y = 0; y < tiles.length; ++y ) {
            for ( var x = 0; x < tiles[y].length; ++x ) {
                tiles[y][x].draw();
            }
        }
    }
}

function drawPlaces()
{
    if(placeObjects.length > 0){
        for ( var i = 0; i < placeObjects.length; ++i ) {
            placeObjects[i].draw();
        }
    }
}

function updateMap() {
    player.update();
}

function drawMap(){
    drawTiles();
    drawPlaces();

    player.draw();
}

function onKeyDownMap( key ) {
    setDecription("");

    player.move(key);

    var isObstacleFront = false;

    if(placeObjects.length > 0){
        for ( var i = 0; i < placeObjects.length; ++i ) {
            if(player.pos.x == placeObjects[i].pos.x && player.pos.y == placeObjects[i].pos.y)
            {
                if(placeObjects[i].isObstacle())
                {
                    placeObjects[i].move(key, true);

                    player.pos = player.prevPos;

                    isObstacleFront = true;
                }
            }
        }
    }

    if(!isObstacleFront)
    {
        if(tiles.length > 0){
            for ( var y = 0; y < tiles.length; ++y ) {
                for ( var x = 0; x < tiles[y].length; ++x ) {
                    tiles[y][x].move(key);
                }   
            }
        }

        if(placeObjects.length > 0){
            for ( var i = 0; i < placeObjects.length; ++i ) {
                placeObjects[i].move(key, player.pos.x == placeObjects[i].pos.x && player.pos.y == placeObjects[i].pos.y);
            }
        }
    }
}

function newGame() {
    init();
}

newGame();

