"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MenuItemRepository = void 0;
var mongoose_1 = require("mongoose");
var MenuItemRepository = /** @class */ (function () {
    function MenuItemRepository() {
        this.menuItemSchema = new mongoose_1.Schema({
            menuItemId: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: { type: Number, required: true },
            description: { type: String, required: true },
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }
        });
        this.MenuItemModel = (0, mongoose_1.model)('MenuItem', this.menuItemSchema);
    }
    MenuItemRepository.prototype.populateMenuItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menuItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        menuItems = [
                            {
                                name: 'Coca_Cola',
                                price: 5,
                                type: 3,
                                description: 'Coca Cola can',
                                products: [
                                    '6283c1db0ff7f2140b54e984'
                                ]
                            },
                            {
                                name: 'Fanta',
                                price: 5,
                                type: 3,
                                description: 'Fanta can',
                                products: [
                                    '6283c1db0ff7f2140b54e985'
                                ]
                            },
                            {
                                name: 'Vegetable soup',
                                price: 15,
                                type: 2,
                                description: 'Vegetable soup made of carrot, parsley, onion, tomato and cucumber',
                                products: [
                                    '6283c1db0ff7f2140b54e986',
                                    '6283c1db0ff7f2140b54e987',
                                    '6283c1db0ff7f2140b54e988',
                                    '6283c1db0ff7f2140b54e989',
                                    '6283c1db0ff7f2140b54e98a'
                                ]
                            },
                            {
                                name: 'Red Wine',
                                price: 15,
                                type: 4,
                                description: 'Red wine',
                                products: [
                                    '6283c1db0ff7f2140b54e986',
                                    '6283c1db0ff7f2140b54e987',
                                    '6283c1db0ff7f2140b54e988',
                                    '6283c1db0ff7f2140b54e989',
                                    '6283c1db0ff7f2140b54e98a'
                                ]
                            },
                            {
                                name: 'Red Wine',
                                price: 15,
                                type: 4,
                                description: 'Red wine',
                                products: [
                                    '6283c2b5ed64cb8ae6973cdb'
                                ]
                            }
                        ];
                        return [4 /*yield*/, this.MenuItemModel.countDocuments()];
                    case 2:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.MenuItemModel
                                .insertMany(menuItems)
                                .then(function () {
                                console.log('Menu items populated');
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.addMenuItem = function (menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel
                                .create(menuItem)
                                .then(function () {
                                console.log('Menu item ' + menuItem.name + ' has been added!');
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.deleteMenuItemByName = function (menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel
                                .deleteOne({ name: menuItem })
                                .then(function () {
                                console.log('Menu item ' + menuItem + ' has been deleted!');
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.getMenuItemByName = function (menuItemName) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
                    case 2:
                        menuItem = _a.sent();
                        if (menuItem) {
                            return [2 /*return*/, menuItem];
                        }
                        else {
                            console.log("Menu item " + menuItemName + " not found!");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemRepository.prototype.getMenuItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.find()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MenuItemRepository.prototype.updateMenuItem = function (menuItemName, menuItem) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItemToUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mongoose_1.connect)('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.MenuItemModel.findOne({ name: menuItemName })];
                    case 2:
                        menuItemToUpdate = _a.sent();
                        if (!menuItemToUpdate) return [3 /*break*/, 4];
                        if (menuItem.name)
                            menuItemToUpdate.name = menuItem.name;
                        if (menuItem.price)
                            menuItemToUpdate.price = menuItem.price;
                        if (menuItem.type)
                            menuItemToUpdate.type = menuItem.type;
                        if (menuItem.description)
                            menuItemToUpdate.description = menuItem.description;
                        if (menuItem.products)
                            menuItemToUpdate.products = menuItem.products;
                        return [4 /*yield*/, menuItemToUpdate.save()
                                .then(function () {
                                console.log('Menu item ' + menuItemName + ' has been updated!');
                            })["catch"](function (err) {
                                console.log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('Menu item ' + menuItemName + ' does not exist!');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MenuItemRepository;
}());
exports.MenuItemRepository = MenuItemRepository;
