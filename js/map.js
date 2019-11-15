var tiles = [];
var placeObjects = [];
var player;

var isInit = false;
var isNewInit = false;

function resizeCanvas(){
    var canvasWidth = $(".side1").width() - 50;
    var canvasHeight;

    if(window.innerWidth <= 768)
        canvasHeight = canvasWidth;
    else
        canvasHeight = canvasWidth * 2;

    initCanvas(canvasWidth, canvasHeight);
}

function loadLegacy(map){

    if(map.preloadImages){
        imagePreload.apply(this, map.preloadImages);
    }

    resizeCanvas();

    initGlobalSize(map.cols, map.rows);

    // 플레이어 초기화
    var playerPos = map.startPos;
    var centerPos = {};

    if(COLS % 2 != 0)
        centerPos.x = (COLS - 1) / 2;
    else
        centerPos.x = COLS / 2;

    if(ROWS % 2 != 0)
        centerPos.y = (ROWS - 1) / 2;
    else
        centerPos.y = ROWS / 2;

    if(playerPos == null)
        playerPos = centerPos;

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

    placeObjects = [];
    for(var i = 0 ; i < map.objs.length ; ++i){
        var objData = map.objs[i];
        var obj = new PlaceObject(objData, player);

        obj.img = obj.resCreator(objData.res);
        if(objData.event != null){
            obj.event = objData.event;
            obj.triggerEvent =  function(){ eval(this.event); };
        }
        obj.obstacle = objData.obstacle;

        placeObjects.push(obj);
    }

    isInit = true;

    if(map.mapName && map.mapName.length > 0){
        notifyMapName(map.mapName);
    }
}


var TILESET;
var OBJECTSET;
function loadFromTiles(map){
    
    if(map.preloadImages){
        imagePreload.apply(this, map.preloadImages);
    }

    resizeCanvas();

    initGlobalSize(map.width, map.height);

    var tileLayer = null;
    var objectLayer = null;
    var placeableLayer = null;

    var playerPosObj = null; // 주인공 위치

    // 레이어 검색
    for(var i = 0 ; i < map.layers.length ; ++i){
        if(map.layers[i].name == "tiles"){
            tileLayer = map.layers[i];
        }
        else if(map.layers[i].name == "objects"){
            objectLayer = map.layers[i];
        }
        else if(map.layers[i].name == "placeables"){
            placeableLayer = map.layers[i];
        }
    }

    // 주인공 위치 검색
    if(objectLayer != null){
        for(var i = 0 ; i < objectLayer.objects.length ; ++i){
            if(objectLayer.objects[i].type == "hero"){
                playerPosObj = objectLayer.objects[i];
            }
        }
    }

    TILESET = new Tileset(map.tilesets, 0, function(){
        OBJECTSET = new Tileset(map.tilesets, 1, function(){

            // 플레이어 초기화
            var playerPos = { x: 0, y: 0 };
            if(playerPosObj != null)
                playerPos = TILESET.getMapPos(playerPosObj.x, playerPosObj.y);
            var centerPos = {};

            if(COLS % 2 != 0)
                centerPos.x = (COLS - 1) / 2;
            else
                centerPos.x = COLS / 2;

            if(ROWS % 2 != 0)
                centerPos.y = (ROWS - 1) / 2;
            else
                centerPos.y = ROWS / 2;

            if(playerPos == null)
                playerPos = centerPos;

            player = new Player(playerPos, centerPos);

            // 맵 초기화
            tiles = [];
            for ( var y = 0; y < ROWS; ++y ) {
                tiles[y] = [];
                for ( var x = 0; x < COLS; ++x ) {
                    tiles[y][x] = new Tile({ x:x, y:y }, player, TILESET, tileLayer.data[x + y * ROWS]);
                }
            }

            // 오브젝트 초기화
            placeObjects = [];
            for ( var y = 0; y < ROWS; ++y ) {
                for ( var x = 0; x < COLS; ++x ) {
                    var placeableData = placeableLayer.data[x + y * ROWS];

                    // 셋팅되지 않은 상태
                    if(placeableData <= 0)
                        continue;

                    var obj = new PlaceObject({ x: x, y: y },
                                        player,
                                        OBJECTSET,
                                        placeableData);
                    obj.obstacle = true;

                    placeObjects.push(obj);
                }
            }

            for(var i = 0 ; i < objectLayer.objects.length ; ++i){
                if(objectLayer.objects[i].type == "hero"){
                    continue;
                }


                var objectParam = objectLayer.objects[i];
                var pos = TILESET.getMapPos(objectParam.x, objectParam.y);

                var obstacle = false;
                var event = null;

                if(objectParam.properties != null){
                    for(var j = 0 ; j < objectParam.properties.length ; ++j){
                        if(objectParam.properties[j].name == "obstacle"){
                            obstacle = objectParam.properties[j].value;
                        }
                        else if(objectParam.properties[j].name == "triggerEvent"){
                            event = objectParam.properties[j].value;
                        }
                    }
                }

                // gid가 있는 오브젝트
                if(objectParam.gid != null){
                    var gid = objectParam.gid;

                    var obj = new PlaceObject({ x: pos.x , y: pos.y },
                                            player,
                                            OBJECTSET,
                                            objectLayer.objects[i].gid);
                    obj.obstacle = obstacle;
                    if(event != null){
                        obj.event = event;
                        obj.triggerEvent = function(){ eval(this.event); }
                    }

                    placeObjects.push(obj);
                }
                // gid가 없으면 name을 resource로 판단한다.
                else{
                    var obj = new PlaceObject({ x: pos.x , y: pos.y }, player);

                    obj.img = obj.resCreator(objectParam.name);
                    obj.obstacle = obstacle;
                    if(event != null){
                        obj.event = event;
                        obj.triggerEvent = function(){ eval(this.event); }
                    }

                    placeObjects.push(obj);
                }
            }
            
            isNewInit = true;

        })
    });
}

function init(mapName) {

    getJson(SITE_URL + "resource/map/" + mapName + ".json", function(map){
        if(map.cols != null && map.rows != null){
            loadLegacy(map);
        }
        // width / height로 가로세로 타일 갯수 측정시 tiled로 가정
        else if(map.width != null && map.height != null){
            loadFromTiles(map);
        }
    });
}

function drawTiles(){
    resizeCanvas();

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
    if(isInit || isNewInit){
        player.update();
    }
}

function drawMap(){
    if(isNewInit){
        drawTiles()
        drawPlaces();

        player.draw();
    }

    if(isInit){
        drawTiles();
        drawPlaces();

        player.draw();

        if(canvas.drawables && canvas.drawables.length > 0){
            for(var i = 0 ; i < canvas.drawables.length ; ++i){
                canvas.drawables[i].draw();
            }
        }
    }
}

function onKeyDownMap( key ) {
    if(!isInit && !isNewInit){
        return;
    }

    player.move(key);

    var isObstacleFront = false;

    if(placeObjects.length > 0){

        for ( var i = 0; i < placeObjects.length; ++i ) {

            if(player.pos.x == placeObjects[i].pos.x && player.pos.y == placeObjects[i].pos.y){

                if(placeObjects[i].isObstacle()){
                    placeObjects[i].move(key, true);

                    player.pos = player.prevPos;

                    isObstacleFront = true;
                }
            }
        }
    }

    var playerMoved = player.prevPos.x != player.pos.x || player.prevPos.y != player.pos.y;
    if(playerMoved){

        setDescription("");
        setDescriptionHtml();
        setUpdateFunc();
    }

    if(!isObstacleFront){
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

    if(mapName == null) {
        mapName = getCookie("lastMap");

        if(mapName == null) {
            mapName = "world";
        }
    }

    removeCookies();

    init(mapName);

    setCookie("lastMap", mapName);
}

