var tiles = [];
var placeObjects = [];
var player;

var isInit = false;

function init(mapName) {

    getJson(SITE_URL + "resource/map/"+ mapName +".json", function(map)
    {
        if(map.preloadImages)
        {
            imagePreload.apply(this, map.preloadImages);
        }

        isInit = true;

        initGlobal(map);

        // 플레이어 초기화
        var playerPos = map.startPos;
        var centerPos = {};
        if(COLS % 2 != 0)
        {
            centerPos.x = (COLS - 1) / 2;
        }
        else
        {
            centerPos.x = COLS / 2;
        }

        if(ROWS % 2 != 0)
        {
            centerPos.y = (ROWS - 1) / 2;
        }
        else
        {
            centerPos.y = ROWS / 2;
        }

        if(playerPos == null)
        {
            playerPos = centerPos;
        }

        player = new Player(playerPos, centerPos);


        // 맵 초기화
        tiles = [];
        var idx = 0;
        for ( var y = 0; y < ROWS; ++y ) {
            tiles[y] = [];
            for ( var x = 0; x < COLS; ++x ) {
                tiles[y][x] = new Tile({x:x, y:y}, player, map.tiles[idx++]);
            }
        }

        // 오브젝트 초기화
        var resCreator = function(resName){
            if(resName && resName.length > 0)
            {
                var img = new Image();
                img.src = SITE_URL + "/resource/" + resName + ".png";
                return img;
            }

            return null;
        };

        var eventFunc = function(){
            if(this.data.event != null){
                eval(this.data.event);
            }
        }

        placeObjects = [];
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
    if(isInit){
        player.update();
    }
}

function drawMap(){
    if(isInit){
        drawTiles();
        drawPlaces();

        player.draw();
    }
}

function onKeyDownMap( key ) {
    if(!isInit){
        return;
    }

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

    var playerMoved = player.prevPos.x != player.pos.x || player.prevPos.y != player.pos.y;
    if(playerMoved)
    {
        setDescription("");
        setDescriptionHtml();
        setUpdateFunc();
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

function newGame(mapName) {

    if(mapName == null)
    {
        mapName = getCookie("lastMap");

        if(mapName == null)
        {
            mapName = "world";
        }
    }

    removeCookies();

    init(mapName);

    setCookie("lastMap", mapName);
}

