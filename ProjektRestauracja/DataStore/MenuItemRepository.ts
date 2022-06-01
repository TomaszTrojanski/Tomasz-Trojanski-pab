import { Schema,model, connect } from "mongoose";
import MenuItem from "../Core/MenuItemModel";
import Product from "../Core/ProductModel";

export class MenuItemRepository{
    menuItemSchema = new Schema<MenuItem>({
        menuItemId : {type: Number, required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        type: {type: String, required: true},
        description: {type: String, required: true},
        product: {type: [Product], required: true}
    });
    MenuItemModel = model<MenuItem>('MenuItem', this.menuItemSchema);
}