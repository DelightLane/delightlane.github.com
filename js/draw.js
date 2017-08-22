// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    drawMap();
}

setInterval( render, 30 );
