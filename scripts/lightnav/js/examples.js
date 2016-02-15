function changeOptions(obj) {
	
	if (obj.checked == true) {
	
		LightNavOptions.maxWidth = 800;
		LightNavOptions.maxHeight = 600;
		
	} else {
		
		LightNavOptions.maxWidth = 0;
		LightNavOptions.maxHeight = 0;
		
	}
}