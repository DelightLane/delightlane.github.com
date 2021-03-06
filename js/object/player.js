var OFFSET_FOR_CENTER = { x: 0, y: 0 }; // offset값을 주면서 조금씩 왼쪽 위로 밀린 것을 보정해주기 위한 offset값

function Player(pos, drawPos){
    this.initAtlasData(SITE_URL + "resource/CharAtlas.json");

	this.drawPos = { x : drawPos.x, y : drawPos.y };
    this.pos = { x : pos.x, y : pos.y };

    OFFSET_FOR_CENTER = { x: this.drawPos.x * this.offset.x, y: this.drawPos.y * this.offset.y };

    this.img = new Image();
    this.img.src = SITE_URL + 'resource/CharAtlas.png';

    this.spriteName = "hero_idle_UP";
    this.spriteNum = 0;

    this.talks = {};
    for(var i = 0 ; i < 3 ; ++i){
        this.talks[i] = new Image();
        this.talks[i].src = SITE_URL + 'resource/talk' + i +".png";
    }
    this.talkIdx = 0;
    
}

Player.prototype = new Object();

Player.prototype.move = function (key){
    this.prevPos = { x : this.pos.x, y : this.pos.y };

	switch ( key ) {
        case 'left':
        	this.spriteName = "hero_walk_LEFT";
        	++this.spriteNum;

            if(this.pos.x > 0){
                --this.pos.x;
            }
            break;
        case 'right':
        	this.spriteName = "hero_walk_RIGHT";
        	++this.spriteNum;

            if(this.pos.x < COLS - 1){
                ++this.pos.x;
            }
            break;
        case 'down':
        	this.spriteName = "hero_walk_UP";
        	++this.spriteNum;

            if(this.pos.y < ROWS - 1){
                ++this.pos.y;
            }
            break;
        case 'up':
        	this.spriteName = "hero_walk_DOWN";
        	++this.spriteNum;

            if(this.pos.y > 0){
                --this.pos.y;
            }
            break;
    }
}

var checkTime = 0;
Player.prototype.update = function(){
    if(descriptMark){
        checkTime += 1;

        if(checkTime >= 3){
            checkTime = 0;

            ++this.talkIdx;
            if(this.talkIdx >= 3){
                this.talkIdx = 0;
            }
        }
    }
    else
    {
        this.talkIdx = 0;
    }
}

Player.prototype.draw = function (){   
    var success = this.drawSprite(this.spriteName + this.spriteNum);

    if(!success){
        if(this.spriteNum != 0)
        {
            this.spriteNum = 0;
            this.draw();
        }
    }

    if(descriptMark){
        var markWidth = this.talks[this.talkIdx].width * DRAW_SCALE;
        var markHeight = this.talks[this.talkIdx].height * DRAW_SCALE;

        Object.drawImage(this.talks[this.talkIdx], 
            {
                offsetX: 0, 
                offsetY: 0,
                cropWidth: this.talks[this.talkIdx].width,
                cropHeight: this.talks[this.talkIdx].height,
                posX: this.calcX,
                posY: this.calcY - markHeight,
                width: markWidth,
                height: markHeight
            });
    }
}