enum Unit{
    Piece,
    Kg,
    L,
    ml,
    g
}
class Product{
    productId: number;
    name:string;
    price:number;
    unit:Unit;
    quantity:number;

    constructor(productId: number,name:string, price:number, unit:Unit, quantity:number){
        this.productId=productId;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.quantity = quantity;
    }
}
export default Product;