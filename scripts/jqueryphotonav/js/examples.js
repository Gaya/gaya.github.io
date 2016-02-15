function startExample(example) {
	
	$('#navigate').css({
		'display': 'none'
	});
	$('#navigate2').css({
		'display': 'none'
	});
	
	switch(example) {
		case 1:
			$('#navigate').css({
				'display': 'block'
			});
			PhotoNav.init('navigate', 758, 1412);
		break;
		
		case 2:
			$('#navigate2').css({
				'display': 'block'
			});
			PhotoNav.init('navigate2', 758, 2097, false);
		break;
		
		case 4:
			$('#navigate').css({
				'display': 'block'
			});
			PhotoNav.init('navigate', 758, 1412, true);
		break;
	}
}