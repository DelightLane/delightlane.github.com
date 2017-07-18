document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'up'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        onKeyDown( keys[ e.keyCode ] );
        render();
    }
};


function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

canvas.addEventListener("mouseup", function (e) {
    var pos = getMousePos(canvas, e);
    pos.x = (canvas.width / 2) - pos.x;
    pos.y = (canvas.height / 2) - pos.y;

    var directTarget = Math.abs(pos.x) > Math.abs(pos.y) ? pos.x : pos.y;

    if(pos.x == directTarget)
    {
        if(directTarget > 0)
        {
            onKeyDown('left');
        }
        else
        {
            onKeyDown('right');
        }
    }
    else
    {
        if(directTarget > 0)
        {
            onKeyDown('up');
        }
        else
        {
            onKeyDown('down');
        }
    }
    render();
}, false);

canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);

function onKeyDown( key ){
    onKeyDownMap(key);
}
