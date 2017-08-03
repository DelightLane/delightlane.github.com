function showPictureFrame(canvasId, imageName, description){

	$("#descLoading").show();
	$("#descBorder").hide();
	
	$("#"+canvasId).hide();

	(function(){
		var c = document.getElementById(canvasId);
		var c_ctx = c.getContext('2d');

	    c.picture = new Drawable(c, '/resource/img/' + imageName + '.png');
	    c.picture.img.onload = function()
	    {
	    	$("#descLoading").hide();
	    	$("#descBorder").show();

	    	$("#"+canvasId).fadeIn();

	    	c.width = document.getElementById("descHtml").offsetWidth;
			c.height = canvas.offsetHeight;	

		    c.picture.setSize(c.width, c.picture.img.height * c.width / c.picture.img.height);
		    c.picture.setPartialDrawSecond(0.5);
		    c.picture.setPosition(0, 0);

		    c.btnBgRect = { width : 35, height : 35 };
			c.raiseBtnBgRect = false;
			c.successRaiseBtnBgRect = false;
			c.updateBtnBgRect = function(){
				if(c.raiseBtnBgRect)
				{
					if(c.btnBgRect.width < c.width)
					{
						c.btnBgRect.width += c.width / 10;
						c.btnBgRect.height += c.height / 10;
					}
					else
					{
						c.btnBgRect.width = c.width;
						c.btnBgRect.height = c.height;
						
						c.successRaiseBtnBgRect = true;
					}
				}
				else
				{
					c.successRaiseBtnBgRect = false;

					if(c.btnBgRect.width >= 60)
					{
						c.btnBgRect.width -= c.width / 10;
						c.btnBgRect.height -= c.height / 10;
					}
					else
					{
						c.btnBgRect.width = 35;
						c.btnBgRect.height = 35;	
					}
				}
			}

			c.startLineText = function(){
				var text = description;

				var ctxSetFunc = function(){
					c_ctx.strokeStyle = "rgb(93, 93, 93)";

					c_ctx.font = c.fontSize + 'px DungGeunMo';
		  			c_ctx.fillStyle = 'black';
				};

				startLineText(c, text, 0, c.fontSize + c.clickImg.getSize().height, 10, c.fontSize, ctxSetFunc);
			}

			c.drawBtnBgRect = function(){
				
				c_ctx.rect(0, 0, c.btnBgRect.width, c.btnBgRect.height);
				c_ctx.stroke();

				c_ctx.fillStyle = "#FFD8D8";
				c_ctx.globalAlpha = 0.7;
				c_ctx.fillRect(0, 0, c.btnBgRect.width, c.btnBgRect.height);
				c_ctx.globalAlpha = 1;

				c.clickImg.draw();

				if(c.successRaiseBtnBgRect)
				{
					if(!isRunLineText())
					{
						c.startLineText();
					}
					
					drawAllLineText(false);
				}
				else
				{
					stopLineText();
				}
			}

			c.clickImg = new Drawable(c, '/resource/click.png');
			c.clickImg.setPosition(0 ,0);
			c.clickImg.setTouchEvent(function(){
				c.raiseBtnBgRect = !c.raiseBtnBgRect;
			});

		    setUpdateFunc(function(dt){
		    	c.fontSize = c.width / 30;

				if(c.width != document.getElementById("descHtml").offsetWidth)
				{
					stopLineText();

					c.width = document.getElementById("descHtml").offsetWidth;

					c.fontSize = c.width / 30;

					c.startLineText();
				}

				var height = c.picture.img.height * c.width / c.picture.img.width;
				c.height = c.picture.img.height * c.width / c.picture.img.width;
				c.picture.setSize(c.width, c.picture.img.height * c.width / c.picture.img.width);

				c.updateBtnBgRect();

				c_ctx.clearRect(0, 0, c.width, c.height);

				for(var i = 0 ; i < c.drawables.length ; ++i)
				{
					c.drawables[i].draw();
				}

				c.drawBtnBgRect();
			});

			c.addEventListener("mouseup", function (e) {
				var pos = getMouseTouchPos(c, e);

				for(var i = 0 ; i < c.drawables.length ; ++i)
				{
					if(c.drawables[i].isTouched(pos))
					{
						c.drawables[i].runTouchEvent();
					}
				}

			}, false);
		}
	})();
}