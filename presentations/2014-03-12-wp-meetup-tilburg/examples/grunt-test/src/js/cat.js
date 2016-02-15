Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

function Cat(name) {
	this.name = name;
}

Cat.prototype.meow = function () {
	console.log(this.name + " is meowing");
};