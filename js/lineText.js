// 텍스트 관련
function getTextHeight(canvas, text, x, y, yMargin, fontSize, ctxSetFunc)
{
	var context = canvas.getContext( '2d' );

	ctxSetFunc();

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

var lineTextData = null;

function drawAllLineText(clearRect)
{
	if(lineTextData)
	{
		if(clearRect)
		{
			lineTextData.context.clearRect(0, 0, lineTextData.canvas.width, lineTextData.canvas.height);
		}

		for(var i = 0 ; i <= lineTextData.drawTextSize ; ++i)
		{
			drawLineText(i);
		}	
	}
}

function drawLineText(i)
{
	if(lineTextData)
	{
		var char = lineTextData.text[i];
		if(char)
		{
			var lineStr = "";
			var lineCount = 0;
			var newLine = true;
			var calcX = lineTextData.x;

			for(var idx = 0 ; idx <= i ; ++idx)
			{
				var innerChar = lineTextData.text[idx];
				var charWidth = lineTextData.context.measureText(innerChar).width;

				if(!newLine)
				{
					calcX += lineTextData.context.measureText(lineTextData.text[idx - 1]).width;
				}

				if(innerChar == '\n' || calcX > lineTextData.canvas.width - charWidth)
				{
					calcX = lineTextData.x;
					++lineCount;
				
					if(innerChar == '\n')
					{
						newLine = true;
					}
				}
				else
				{
					newLine = false;
				}
			}

			var calcHeight = lineTextData.y + (lineTextData.yMargin + lineTextData.fontSize) * lineCount;

			lineTextData.ctxSetFunc();

			lineTextData.context.fillText(char, calcX, calcHeight);
			lineTextData.context.strokeText(char, calcX, calcHeight);
		}
	}
}

function startLineText(canvas, text, x, y, yMargin, fontSize, ctxSetFunc){
	lineTextData = {};
	lineTextData.text = text;
	lineTextData.x = x;
	lineTextData.y = y;
	lineTextData.yMargin = yMargin;
	lineTextData.fontSize = fontSize;
	lineTextData.drawTextSize = 0;
	lineTextData.count = 0;
	lineTextData.canvas = canvas;
	lineTextData.context = canvas.getContext( '2d' );
	lineTextData.ctxSetFunc = ctxSetFunc;

	lineTextData.ctxSetFunc();

	lineTextData.drawTextSize = 0;

	(function loop()
	{
		if(!lineTextData)
		{
			return;
		}

		if(lineTextData.drawTextSize >= lineTextData.text.length)
		{
			return;
		}

		++lineTextData.drawTextSize;

		lineTextData.requestAnimId = requestAnimationFrame(loop);
	})();
}

function stopLineText()
{
	if(isRunLineText()){
		cancelAnimationFrame(lineTextData.requestAnimId);
		lineTextData = null;
	}
}

function isRunLineText()
{
	return lineTextData && lineTextData.requestAnimId;
}