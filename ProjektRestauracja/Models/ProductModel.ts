enum Unit{
    Piece,
    Kg,
    L,
    ml,
    g
}
class Product{
    name:string;
    price:number;
    unit:Unit;
    quantity:number;

    constructor(name:string, price:number, unit:Unit, quantity:number){
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.quantity = quantity;
    }
}
export default Product;