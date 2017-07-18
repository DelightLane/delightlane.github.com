var tiles = [];
var towns = [];
var player;

var isInitCanvas = false;

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

    player = new Player(playerPos.x, playerPos.y);

    // 맵 초기화
    for ( var y = 0; y < ROWS; ++y ) {
        tiles[y] = [];
        for ( var x = 0; x < COLS; ++x ) {
            tiles[y][x] = new Tile(x, y, playerPos.x, playerPos.y);
            if(y == 1)
            {
                tiles[y][x].setType("road");
            }
        }
    }

    towns[0] = new Town(0, 0, playerPos.x, playerPos.y, function(){
        window.location.href = 'http://a306.cafe24.com/';
    });

    towns[1] = new Town(1, 1, playerPos.x, playerPos.y, function(){
        window.location.href = 'http://a306.cafe24.com/';
    });

    towns[2] = new Town(2, 2, playerPos.x, playerPos.y, function(){
        window.location.href = 'http://a306.cafe24.com/';
    });
}

function drawTiles(){
    
        var canvasWidth = window.innerWidth < 600 ? window.innerWidth : 600;

        initCanvas(canvasWidth, 300);

        isInitCanvas = true;
    

    if(tiles.length > 0){
        for ( var y = 0; y < tiles.length; ++y ) {
            for ( var x = 0; x < tiles[y].length; ++x ) {
                tiles[y][x].draw();
            }
        }
    }
}

function drawTowns()
{
    if(towns.length > 0){
        for ( var i = 0; i < towns.length; ++i ) {
            towns[i].draw();
        }
    }
}

function updateMap() {
    player.update();
}

function drawMap(){
    drawTiles();
    drawTowns();

    player.draw();
}

function onKeyDownMap( key ) {
    player.move(key);

    if(tiles.length > 0){
        for ( var y = 0; y < tiles.length; ++y ) {
            for ( var x = 0; x < tiles[y].length; ++x ) {
                tiles[y][x].move(key);
            }   
        }
    }

    if(towns.length > 0){
        for ( var i = 0; i < towns.length; ++i ) {
            towns[i].move(key, player.pos.x == towns[i].pos.x && player.pos.y == towns[i].pos.y);
        }
    }
}

function newGame() {
    init();
}

newGame();

