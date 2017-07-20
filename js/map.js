var tiles = [];
var placeObjects = [];
var player;

function init(mapName) {

    getJson(SITE_URL + "resource/map/"+ mapName +".json", function(map)
    {
        initGlobal(map);

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


        // 맵 초기화
        var idx = 0;
        for ( var y = 0; y < ROWS; ++y ) {
            tiles[y] = [];
            for ( var x = 0; x < COLS; ++x ) {
                tiles[y][x] = new Tile({x:x, y:y}, player, map.tiles[idx++]);
            }
        }

        // 오브젝트 초기화
        var resCreator = function(resName){
            var img = new Image();
            img.src = SITE_URL + "/resource/" + resName + ".png";
            return img;
        };

        var eventFunc = function(){
            if(this.data.event != null){
                eval(this.data.event);
            }
        }

        for(var i = 0 ; i < map.objs.length ; ++i){
            var objData = map.objs[i];
            placeObjects.push(new TriggerObject(objData, player, resCreator(objData.res), eventFunc));
        }
    });
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
    init("world");
}

newGame();

