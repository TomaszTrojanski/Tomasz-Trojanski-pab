import { Schema, model,connect } from "mongoose";
import Order from "../Core/OrderModel";

export class OrderRepository{
    orderSchema = new Schema<Order>({
            employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
            items: [{type: Schema.Types.ObjectId, ref: 'MenuItem'}],
            status: {type: Number, required: true},
            table: {type: Schema.Types.ObjectId, ref: 'Table'},
            price: {type: Number, required: true}
        });
    OrderModel = model<Order>('Order', this.orderSchema);

    async populateOrders() : Promise<void>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const orders =[]
    }
}