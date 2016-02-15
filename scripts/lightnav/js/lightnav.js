/*
 * 	LightNav
 * 	A Javascript Module by Gaya Kessler
 * 	Version 1.0
 * 	Date: 09-02-09
 * 
 */

//you can adjust this to your needs.
var LightNavOptions = {
	maxWidth: 800,
	maxHeight: 600
}

var LightNav = Class.create();

LightNav.prototype = {

	initialize: function() {
		LightboxOptions.border = 0;
	
		//fix the resize thing
		Lightbox.prototype.resizeImageContainer = function (imgWidth, imgHeight) {
			var dims = this.getPageSize();
		
			 // get current width and height
			var widthCurrent  = this.outerImageContainer.getWidth();
			var heightCurrent = this.outerImageContainer.getHeight();
			
			var realWidth = imgWidth;
			var realHeight = imgHeight;

			if (LightNavOptions.maxHeight > 0 && LightNavOptions.maxWidth > 0 ) {
				
				if (imgWidth > LightNavOptions.maxWidth || imgHeight > LightNavOptions.maxHeight) {
					if (imgWidth > LightNavOptions.maxWidth) {
						imgWidth = LightNavOptions.maxWidth;
					}
					
					if (imgHeight > LightNavOptions.maxHeight) {
						imgHeight = LightNavOptions.maxHeight;
					}
					
					//document.getElementById('imageContainer').style.width = imgWidth + "px";
					document.getElementById('imageContainer').style.height = imgHeight + "px";
				}
				
			} else {
				if (imgWidth > dims[0] || imgHeight > dims[1]) {
					if (imgWidth > dims[0]) {
						imgWidth = (dims[0] - ((LightboxOptions.borderSize * 2)))
					}
					
					if (imgHeight > dims[1]) {
						imgHeight = (dims[1] - ((LightboxOptions.borderSize * 2) + 140))
					}
					
					//document.getElementById('imageContainer').style.width = imgWidth + "px";
					document.getElementById('imageContainer').style.height = imgHeight + "px";
				}
				
			}
			
			// get new width and height
			var widthNew  = (imgWidth  + LightboxOptions.borderSize * 2);
			var heightNew = (imgHeight + LightboxOptions.borderSize * 2);

			// scalars based on change from old to new
			var xScale = (widthNew  / widthCurrent)  * 100;
			var yScale = (heightNew / heightCurrent) * 100;

			// calculate size difference between new and old image, and resize if necessary
			var wDiff = widthCurrent - widthNew;
			var hDiff = heightCurrent - heightNew;
			
			
			
			if (hDiff != 0) new Effect.Scale(this.outerImageContainer, yScale, {scaleX: false, duration: this.resizeDuration, queue: 'front'}); 
			if (wDiff != 0) new Effect.Scale(this.outerImageContainer, xScale, {scaleY: false, duration: this.resizeDuration, delay: this.resizeDuration}); 

			// if new and old image are same size and no scaling transition is necessary, 
			// do a quick pause to prevent image flicker.
			var timeout = 0;
			if ((hDiff == 0) && (wDiff == 0)){
				timeout = 100;
				if (Prototype.Browser.IE) timeout = 250;   
			}
			
			$('overlay').setStyle({ width: (dims[0] + 16) + 'px'});
			
			(function(){
				this.prevLink.setStyle({ height: imgHeight + 'px' });
				this.nextLink.setStyle({ height: imgHeight + 'px' });
				this.imageDataContainer.setStyle({ width: widthNew + 'px' });

				this.showImage();
				PhotoNav.init('imageContainer', imgWidth, realWidth, imgHeight, realHeight);
			}).bind(this).delay(timeout / 1000);
		}
	}
}

document.observe('dom:loaded', function () { new LightNav(); });