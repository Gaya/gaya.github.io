var Actions = {
	dieTime: Array(),	
		
	//dead plant actions
	plantNew: function() {
		$(InterAction.clickedElement).fadeOut(200, function() {
			$(InterAction.clickedElement).attr("src", "images/flower.png");
			$(InterAction.clickedElement).fadeIn();
		});
		InterAction.forceClose();
		InterAction.init("#" + $(InterAction.clickedElement).attr('id'), normalPlant);
		Actions.dieTime.push(Array("#" + $(InterAction.clickedElement).attr('id'), 100));
	},
	
	throwAway: function() {
		$(InterAction.clickedElement).fadeOut();
		InterAction.forceClose();
	},
	
	//normal plant actions
	waterPlant: function() {
		for (var i = 0; i < Actions.dieTime.length; i++) {
			if (Actions.dieTime[i][0] == "#" + $(InterAction.clickedElement).attr('id')) {
				Actions.dieTime[i][1] = 100;
			}
		}
		InterAction.forceClose();
	},
	
	hitPlant: function() {
		InterAction.forceClose();
		alert("I don't want to hit a plant!");
	},
	
	talkToPlant: function() {
		InterAction.forceClose();
		alert("It's not talking back.");
	},
	
	//automatic actions
	killPlant: function(element) {
		$(element).attr("src", "images/flower_dead.png");
		InterAction.init(element, deadPlant);
	},
	
	//interval actions
	killPlants: function() {
		for (var i = 0; i < Actions.dieTime.length; i++) {
			Actions.dieTime[i][1] = Actions.dieTime[i][1] - 1;
			
			if (Actions.dieTime[i][1] < 1) {
				Actions.killPlant(Actions.dieTime[i][0]);
				Actions.dieTime.splice(i, 1);
			}
		}
	}
}

setInterval("Actions.killPlants()", 100);