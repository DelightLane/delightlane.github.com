// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, W, H );

    drawMap();
}

setInterval( render, 30 );
