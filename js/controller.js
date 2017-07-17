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

function onKeyDown( key ){
    onKeyDownMap(key);
}
