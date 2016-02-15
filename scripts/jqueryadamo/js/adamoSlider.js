var AdamoSlider = {
	
	init: function() {
		
		$("#adamoSlider .item").click(function() {
			AdamoSlider.openItem(this);
		});
		
	},

	openItem: function(obj) {
		
		AdamoSlider.centerToItem(obj, true);
		
		$(obj).stop().animate({
			width: "900px"
		},{
			duration: 500,
			easing: "easeInOutQuad"
		});
		
		$(obj).unbind('click');
		$(obj).click(function() {
			AdamoSlider.closeItem(obj);
		});
	},
	
	closeItem: function(obj) {
		
		AdamoSlider.centerToItem(obj, false);
		
		$(obj).stop().animate({
			width: "250px"
		},{
			duration: 500,
			easing: "easeInOutQuad"
		});
		
		
		$(obj).unbind('click');
		$(obj).click(function() {
			AdamoSlider.openItem(obj);
		});
	},
	
	centerToItem: function(obj, opened) {
		
		
		if (opened == true) {
			var xfix = 50;
		} else {
			var xfix = 375;
		}
		
		/*
		
		var posX = $(obj).offset()['left'] - $("#adamoSlider").offset()['left'];
		
		var gotoPos = (((1000 / 2) - (posX)) - ($(obj).width() / 2)) + xfix;
		
		*/
		
		var posX = $(obj).offset()['left'] - $("#adamoSlider").offset()['left'];
		
		var gotoPos = xfix - posX;
		
		//alert($(obj).offset()['left']);
		
		$("#overflow").animate({
			marginLeft: gotoPos + "px"
		},{
			duration: 500,
			easing: "easeInOutQuad",
			queue:false
		})
		
	}
		
}