Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

function Dog(name) {
	this.name = name;
}

Dog.prototype.bark = function () {
	console.log(this.name + " is barking");
};