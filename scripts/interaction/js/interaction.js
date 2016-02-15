/*
 *		Circular InterAction menu
 *		Created by Gaya Kessler of Gaya Design
 *		http://www.gayadesign.com
 */

var InterAction = {
		
	itemNormal: "images/bg_item.png",
	itemHover: "images/bg_item2.png",
	clickedElement: "",
	optionsOpen: false,
	
	init: function(item, options) {
		
		$("body").unbind();
		$(item).unbind();
	
		$("body").click(function() {
			InterAction.closeBubbles();
		});
	
		$(item).click(function() {
			InterAction.closeBubbles();
			InterAction.openBubbles(item, options);
		});
		
		$(item).css("cursor", "pointer");
	},
	
	forceClose: function() {
		$(".ia_box").fadeOut(100, function() {
			$(this).remove()
		});
		InterAction.optionsOpen = false;
	},
	
	closeBubbles: function() {
		if (InterAction.optionsOpen == true) {
			
			$(".ia_box").fadeOut(100, function() {
				$(this).remove()
			});
			InterAction.optionsOpen = false;
		
		}
	},
	
	openBubbles: function(item, options) {
		InterAction.optionsOpen = false;
		
		var item = $(item);
		
		InterAction.clickedElement = item;
		
		var length = options.length;
		//determine radius
		var radius = 30 + (4 * length);
		var degrees = 360 / length;
		
		for (var i = 0; i < length; i++) {
			var box = $("<div>" + options[i][0] + "</div>").appendTo(item.parent());
			$(box).addClass("ia_box");
			$(box).click(options[i][1]);
			
			//get the start coordinates
			var leftB = $(item).offset()['left'];
			var topB = $(item).offset()['top'];
			
			var itemWidth = ($(item).outerWidth() / 2);
			var boxWidth = ($(box).outerWidth() / 2);
			
			var itemHeight = ($(item).outerHeight() / 2);
			var boxHeight = ($(box).outerHeight() / 2);
			
			leftB = (leftB + itemWidth) - boxWidth;
			topB = (topB + itemHeight) - boxHeight;
			
			$(box).css({
				left: leftB + "px",
				top: topB + "px",
				opacity: 0.0
			});
			
			var modLeft = 0;
			var modTop = 0;
			
			if (length > 2) {
				//calculate position in the circle
				var factor = Math.sin((degrees * i)*Math.PI/180);
				var modLeft = factor * radius;
				var factor = Math.cos((degrees * i)*Math.PI/180);
				var modTop = factor * radius;
				
				modTop = modTop * -1;
			} else {
				if (i == 0) {
					var modLeft = 0;
					var modTop = radius * -1;
				} else {
					var modLeft = 0;
					var modTop = radius;
				}
			}
			
			/*
			if (modTop < ((radius / 2) * -1)) {
				modTop = modTop + ($(box).outerHeight() / 2);
			} else if (modTop > (radius / 2)) {
				modTop = modTop - ($(box).outerHeight() / 2);
			}
			*/
			
			//align the items on the circle
			if (modLeft < ((radius / 2) * -1)) {
				modLeft = modLeft - ($(box).outerWidth() / 2);
			} else if (modLeft > (radius / 2)) {
				modLeft = modLeft + ($(box).outerWidth() / 2);
			}
			
			$(box).animate({
				left: (leftB + modLeft) + "px",
				top: (topB + modTop) + "px",
				opacity: 1.0
			}, 200);
			
		}
		
		//hover effects
		$(".ia_box").hover(function() {
			InterAction.optionsOpen = false;
			$(this).css("background-image", "url(" + InterAction.itemHover + ")");
		}, function() {
			InterAction.optionsOpen = true;
			$(this).css("background-image", "url(" + InterAction.itemNormal + ")");
		});
		
		setTimeout(function() {
			InterAction.optionsOpen = true;
		}, 200);
	}
	
}