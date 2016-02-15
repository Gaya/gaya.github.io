/*
 * 	GARAGEDOOR MENU 
 * 	A Javascript Scriptaculous Extention by Gaya Kessler
 * 	Version 1.1
 * 	Date: 24-01-09
 * 
 */
 
var GarageDoor = {
	
	scrollY: 0,
	scrollX: 0,
	
	setBindings: function(id) {
		var as = document.getElementById(id).getElementsByTagName("DIV");
		
		for (var i = 0; i < as.length; i++) {
			if (as[i].className=="mouse") {
				
				if (typeof as[i].addEventListener == 'function') {
					as[i].addEventListener('mouseover', function () {GarageDoor.hideDoor(this)}, false);
					as[i].addEventListener('mouseout', function () {GarageDoor.showDoor(this)}, false);
					
					as[i].addEventListener('click', function () { window.location = this.parentNode.title }, false);
				} else {
					as[i].attachEvent('onmouseover', function () { GarageDoor.hideDoor(event.srcElement.parentNode) });
					as[i].attachEvent('onmouseout', function () { GarageDoor.showDoor(event.srcElement.parentNode) });
					
					as[i].attachEvent('onclick', function () { window.location = event.srcElement.parentNode.parentNode.title });
				}
				
				as[i].effect1 = "";
				as[i].effect2 = "";
			}
		}
	},
	
	hideDoor: function(obj) {	
		var divs = obj.parentNode.getElementsByTagName("IMG");
		
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].className == "overlay") {
				if (typeof obj.effect2.cancel == 'function') {
					obj.effect2.cancel();
				}
				
				var xs = this.scrollX;
				var ys = this.scrollY;
				
				obj.effect1 = new Effect.Move(divs[i], {
					y: ys,
					x: xs,
					mode: 'absolute',
					duration: 0.2
				});
			}
		}
	},
	
	showDoor: function(obj) {
		var divs = obj.parentNode.getElementsByTagName("IMG");
			
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].className == "overlay") {
				if (typeof obj.effect1.cancel == 'function') {
					obj.effect1.cancel();
				}
				obj.effect2 = new Effect.Move(divs[i], {
					y: 0,
					x: 0,
					mode: 'absolute',
					duration: 0.5
				});
			}
		}
	}
	
};