var Slider = {
	/* edit these options according to your CSS */
	itemWidth: 250,		//width of an item
	totalWidth: 1000,	//total width of the container
	navWidth: 112,		//width of the nav including padding
	/* end edit options */
	
	items: new Array(),
	loadedItems: 0,
	initDone: false,
	IE: "",
	tempX: 0,
	tempY: 0,
	winH: 0,
	winW: 0,
	position: "",
	openItem: false,
	scrollSpeed: 10,
	fixPos: false,
	navLeft: true,
	navRight: true,
	navigating: false,

	initSlider: function() {
		
		var itemContainer = document.getElementById('items');		
		Slider.createObjects(itemContainer);
		
	},
	
	createObjects: function(container) {
		var overflow = document.getElementById("overflow");
		var preload = document.getElementById("pictureLoadContainer");
		
		var imgs = overflow.getElementsByTagName("IMG");
		for (var i = 0; i < imgs.length; i++) {
			Slider.items[i] = new Array(imgs[i].src, imgs[i].alt);
		}
		overflow.innerHTML = "";
		
		var itemNr = 1;
		for (var j = 0; j < 3; j++) {
			for (var i = 0; i < Slider.items.length; i++) {
				var div = document.createElement("DIV");
				div.style.backgroundImage = 'url("' + Slider.items[i][0] + '")';
				div.className = 'item';
				div.innerHTML = itemNr;
				
				overflow.appendChild(div);
				
				itemNr++;
			}
		}
		
		for (var i = 0; i < Slider.items.length; i++) {
			var oImg = new Image();
			Slider.makeEvent(oImg, "load", function() { Slider.preload() });
			oImg.src = Slider.items[i][0];
			preload.appendChild(oImg);
		}
		
		overflow.style.marginLeft = ((Slider.items.length * Slider.itemWidth) * -1) + "px";
		
	},
	
	preload: function() {
		Slider.loadedItems = parseInt(Slider.loadedItems) + 1;
		
		if (Slider.loadedItems == Slider.items.length && Slider.initDone == false) {
			
			var loading = document.getElementById('loading');
			new Effect.Fade(loading, {duration: 0.5, delay: 0.5, afterFinish: function() {loading.parentNode.removeChild(loading)}});
			
			var itemContainer = document.getElementById('overflow');
			var items = itemContainer.getElementsByTagName('DIV');
			
			for (var i = 0; i < items.length; i++) {
				if (items[i].className == "item") {
					
					var item = items[i];
					
					item.style.cursor = 'pointer';
					
					item.onclick = function() { Slider.slideOpen(this, true) };
					/*
					if (Slider.IE) {
						Slider.makeEvent(item, "click", function () { Slider.slideOpen(Event.srcElement, true) });
					} else {
						Slider.makeEvent(item, "click", function () { Slider.slideOpen(this, true) });
					}
					*/
					
				}
			}
			
			var leftNav = document.getElementById('SlideLeft');
			Slider.makeEvent(leftNav, "click", function () { Slider.navigate("left") });
			
			var rightNav = document.getElementById('SlideRight');
			Slider.makeEvent(rightNav, "click", function () { Slider.navigate("right") });
			
			Slider.hideNav();
			leftNav.style.display = "block";
			rightNav.style.display = "block";
			
			//let Slider determine mouse position
			Slider.IE = document.all?true:false
			if (!Slider.IE) document.captureEvents(Event.MOUSEMOVE)
			document.onmousemove = Slider.getMouseXY;
			
			Slider.initDone = true;
		}
	},

	slideOpen: function(obj, position) {
		if (Slider.openItem == false) {
			if (typeof(obj)=='number') {
				obj = Slider.getObjByNr(obj);
			}
			
			var items = obj.parentNode.getElementsByTagName("DIV");
			
			for (var i = 0; i < items.length; i++) {
				if (items[i].className == "item") {
					Slider.slideClose(items[i], false);
				}
			}
			
			//Slider.openItem = true;
			
			if (position == true) {
				Slider.moveContainer(obj, true);
				Slider.showCaption(obj);
			}
			
			obj.onclick = function() { Slider.slideClose(this, true) };
			
			new Effect.Morph(obj, {
			  style: {
			    width: Slider.totalWidth + 'px'
			  },
			  duration: 0.8,
			  transition: Effect.Transitions.EaseFromTo,
			  afterFinish: function() { if (position == true) { Slider.openItem = true; } }
			});
		}
	},

	slideClose: function(obj, position) {
		
		if (Slider.openItem == true) {
			if (typeof(obj)=='number') {
				obj = Slider.getObjByNr(obj);
			}
			
			obj.onclick = function() { Slider.slideOpen(this, true) };
			
			if (position == true) {
				Slider.moveContainer(obj, false);
				Slider.hideCaption();
			}
			
			new Effect.Morph(obj, {
			  style: {
			    width: Slider.itemWidth + 'px'
			  },
			  duration: 0.8,
			  transition: Effect.Transitions.EaseFromTo,
			  afterFinish: function() { if (position == true) { Slider.openItem = false; } }
			});	
		}
		
	},

	moveContainer: function(obj, opened) {
		var overflow = obj.parentNode;
		var item = 1;
		var currentItem = 0;
		var items = overflow.getElementsByTagName("DIV");
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].className == "item") {
				
				if (obj.innerHTML != items[i].innerHTML) {
					item++;
				} else {
					currentItem = item;
				}
			}
		}
		
		if (opened == true) {
			var extra = 0;
			Slider.fixPos = false;
		} else {
			var extra = 375;
			Slider.fixPos = true;
		}
		
		var position = (((currentItem - 1) * Slider.itemWidth) * -1) + extra;
		
		new Effect.Morph(overflow, {
		  style: {
		    marginLeft: position + 'px'
		  },
		  duration: 0.8,
		  afterFinish: function() { if(Slider.fixPos == true) { Slider.fixPosition(); } },
		  transition: Effect.Transitions.EaseFromTo
		});
	},
	
	showCaption: function(obj) {
		var pattern = new RegExp(/([0-9]*)/g)
		var ar = pattern.exec(obj.innerHTML);
		
		var nr = ar[0];
		
		while (nr > Slider.items.length) {
			nr = nr - Slider.items.length;
		}
		
		var caption = document.getElementById("caption");
		var captionText = document.getElementById("captionContent");
		
		captionText.innerHTML = Slider.items[(nr - 1)][1];
			
		obj.appendChild(caption);
		
		background = caption.getElementsByTagName("DIV");
		for (var i = 0; i < background.length; i++) {
			if (background[i].className == 'background') {
				new Effect.Opacity(background[i], { to: 0.7, duration: 0.1 });
			}
		}
		new Effect.Appear(caption, {duration: 0.5, delay: 1.0});
		new Effect.Appear(captionText, {duration: 0.5, delay: 1.0});
		
	},
	
	hideCaption: function() {
		var caption = document.getElementById("caption");
		var captionText = document.getElementById("captionContent");
		new Effect.Fade(caption, {duration: 0.3});
		new Effect.Fade(captionText, {duration: 0.3});
		
	},
	
	navigate: function(dir) {
		Slider.fixPosition();
		
		var x = 0;
		
		if (dir == 'left') {
			x = 500;
		} else if (dir == 'right') {
			x = -500;
		}
		
		var container = document.getElementById("overflow");
		var margin = container.style.marginLeft;
		margin = parseInt(margin.substr(0, (margin.length - 2)));
		
		if (Slider.openItem == false && Slider.navigating == false) {
			Slider.navigating = true;
			new Effect.Morph(container, {
			  style: {
			    marginLeft: (margin + x) + 'px'
			  },
			  duration: 0.6,
			  transition: Effect.Transitions.EaseFromTo,
			  afterFinish: function() { Slider.fixPosition(); Slider.navigating = false; }
			});
		
		}
	},
	
	fixPosition: function() {
		var container = document.getElementById("overflow");
		var margin = container.style.marginLeft;
		margin = parseInt(margin.substr(0, (margin.length - 2)));
		
		var leftMargin = (Slider.items.length * Slider.itemWidth) * -1;
		var rightMargin = ((Slider.items.length * Slider.itemWidth) * 2) * -1;
		if (margin > leftMargin) {
			container.style.marginLeft = (margin + leftMargin) + "px";
			return true;
		} else if (margin < rightMargin) {
			container.style.marginLeft = (margin - leftMargin) + "px";
			return true;
		}
		
		return false;
	},
	
	showNav: function(obj) {
		new Effect.Opacity(obj, { to: 1.0, duration: 0.4 });
	},
	
	hideNav: function() {
		if (Slider.navLeft == true) {
			var obj = document.getElementById('SlideLeft');
			new Effect.Opacity(obj, { to: 0.0, duration: 0.4 });
			Slider.navLeft = false;
		}
		
		if (Slider.navRight == true) {
			var obj = document.getElementById('SlideRight');
			new Effect.Opacity(obj, { to: 0.0, duration: 0.4 });
			Slider.navRight = false;
		}
	},
	
	getObjByNr: function(nr) {
		var overflow = document.getElementById('overflow');
		var item = 1;
		var currentItem = 0;
		var items = overflow.getElementsByTagName("DIV");
		
		return items[(nr - 1)];
	},
	
	getMouseXY: function (e) {
		//determine mouse position
		if (Slider.IE) { // grab the x-y pos.s if browser is IE
			Slider.tempX = event.clientX + document.body.scrollLeft
			Slider.tempY = event.clientY + document.body.scrollTop
		} else {  // grab the x-y pos.s if browser is NS
			Slider.tempX = e.pageX
			Slider.tempY = e.pageY
		}  
		// catch possible negative values in NS4
		if (Slider.tempX < 0) {
			Slider.tempX = 0;
		}
		
		if (Slider.tempY < 0) {
			Slider.tempY = 0;
		}
		
		if (parseInt(navigator.appVersion)>3) {
			if (navigator.appName=="Netscape") {
				Slider.winW = window.innerWidth;
				Slider.winH = window.innerHeight;
			}
			if (navigator.appName.indexOf("Microsoft")!=-1) {
				Slider.winW = document.body.offsetWidth;
				Slider.winH = document.body.offsetHeight;
			}
		}
		
		var container = document.getElementById("items");
		
		var containerY = Slider.findPosY(container);
		var containerH = container.offsetHeight;
		
		//first check if cursor is height enough
		if (Slider.tempY > containerY && Slider.tempY < (containerY + containerH)) {			
			//determine % horizontal
			var perc = Slider.tempX - Slider.findPosX(container);
			
			if (perc < 0) {
				perc = 0;
				Slider.position = "outside";
				Slider.hideNav();
			} else if (perc > Slider.totalWidth) {
				perc = Slider.totalWidth;
				Slider.position = "outside";
				Slider.hideNav();
			} else {			
				//in element yo
				if (perc < Slider.navWidth && perc > 0) {
					if (Slider.navLeft == false && Slider.openItem == false) {
						var obj = document.getElementById('SlideLeft');
						Slider.showNav(obj);
						Slider.navLeft = true;
					}
					
					Slider.position = "left";
				} else if (perc > (Slider.totalWidth - Slider.navWidth) && perc < Slider.totalWidth) {
					if (Slider.navRight == false && Slider.openItem == false) {
						var obj = document.getElementById('SlideRight');
						Slider.showNav(obj);
						Slider.navRight = true;
					}
					
					Slider.position = "right";
				} else {
					Slider.position = "center";
					Slider.hideNav();
				}
			}
		} else {
			Slider.position = "outside";
			Slider.hideNav();
		}
		
		return true;
	},
	
	findPosX: function (obj) {
		var curleft = 0;
		if(obj.offsetParent)
			while(1) {
				curleft += obj.offsetLeft;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
		else if(obj.x)
			curleft += obj.x;
		return curleft;
	},
	
	findPosY: function(obj) {
		var curtop = 0;
		if(obj.offsetParent)
			while(1) {
				curtop += obj.offsetTop;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
		else if(obj.y)
			curtop += obj.y;
		return curtop;
	},
	
	makeEvent: function(object, type, event) {
		if(window.addEventListener){ // Mozilla, Netscape, Firefox
			object.addEventListener(type, event, false);
		} else { // IE
			object.attachEvent('on' + type, event);
		}
	},
	
	debugText: function(text) {
		document.getElementById('debug').innerHTML = text;
	}
}

window.onload = window.onload = function () {
	Slider.initSlider();
}