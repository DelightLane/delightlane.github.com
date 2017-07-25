// 텍스트 관련
function getTextHeight(canvas, text, x, y, yMargin, fontSize)
{
	var context = canvas.getContext( '2d' );

	var lineStr = "";
	var count = 0;

	var textLength = text.length;
	var calcX = x;

	var calcHeight = 0;

	for(var i = 0 ; i < textLength ; ++i)
	{
		var char = text[i];

		var charWidth = context.measureText(char).width;
		calcHeight = y + (yMargin + fontSize) * count;

		if(char == '\n' || i == (textLength - 1))
		{
			calcX = x;
			++count;
		}
		else
		{
			calcX += charWidth;
		}

		if(calcX > canvas.width - charWidth)
		{
			calcX = x;
			++count;
		}
	}

	calcHeight += yMargin;

	return calcHeight;
}

var requestAnimId = undefined;
function startLineText(canvas, text, x, y, yMargin, fontSize, ctxSetFunc){
	var context = canvas.getContext( '2d' );

	ctxSetFunc(context);

	canvas.height = getTextHeight(canvas, text, x, y, yMargin, fontSize);

	ctxSetFunc(context);

	var lineStr = "";
	var count = 0;

	var textLength = text.length;
	var i = 0;
	var calcX = x;

	(function loop()
	{
		if(i >= textLength)
		{
			return;
		}

		var char = text[i];

		var calcHeight = y + (yMargin + fontSize) * count;
		var charWidth = context.measureText(char).width;

		context.fillText(char, calcX, calcHeight);
		context.strokeText(char, calcX, calcHeight);

		if(char == '\n' || i == (textLength - 1))
		{
			calcX = x;
			++count;
		}
		else
		{
			calcX += charWidth;
		}

		if(calcX > canvas.width - charWidth)
		{
			calcX = x;
			++count;
		}

		++i;

		requestAnimId = requestAnimationFrame(loop);
	})();

	context.fill();
	context.stroke();
}

function stopLineText()
{
	if(requestAnimId){
		cancelAnimationFrame(requestAnimId);
		requestAnimId = undefined;
	}
}