'./ProductModel';
"use strict";
exports.__esModule = true;
var Type;
(function (Type) {
    Type[Type["Starter"] = 0] = "Starter";
    Type[Type["MainDish"] = 1] = "MainDish";
    Type[Type["SideDish"] = 2] = "SideDish";
    Type[Type["Drink"] = 3] = "Drink";
    Type[Type["Dessert"] = 4] = "Dessert";
})(Type || (Type = {}));
var Unit;
(function (Unit) {
    Unit[Unit["Piece"] = 0] = "Piece";
    Unit[Unit["Kg"] = 1] = "Kg";
    Unit[Unit["L"] = 2] = "L";
    Unit[Unit["ml"] = 3] = "ml";
    Unit[Unit["g"] = 4] = "g";
})(Unit || (Unit = {}));
var MenuPosition = /** @class */ (function () {
    function MenuPosition(name, price, type, description, product) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.product = product;
    }
    return MenuPosition;
}());
exports["default"] = MenuPosition;
