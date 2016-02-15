function startExample(example) {
	
	document.getElementById('navigate').style.display = 'none';
	document.getElementById('navigate2').style.display = 'none';
	
	switch(example) {
		case 1:
			document.getElementById('navigate').style.display = 'block';
			PhotoNav.init('navigate', 758, 1412);
		break;
		
		case 2:
			document.getElementById('navigate2').style.display = 'block';
			PhotoNav.init('navigate2', 758, 2097);
		break;
		
		case 3:
			document.getElementById('navigate2').style.display = 'block';
			PhotoNav.init('navigate2', 758, 2097, true, 0.1);
		break;
		
		case 4:
			document.getElementById('navigate').style.display = 'block';
			PhotoNav.init('navigate', 758, 1412, false, 0, true);
		break;
	}
}