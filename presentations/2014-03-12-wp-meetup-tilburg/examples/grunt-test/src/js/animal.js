function Animal(name) {
	this.name = name;
}

Animal.prototype.walk = function () {
	console.log(this.name + " is walking");
};