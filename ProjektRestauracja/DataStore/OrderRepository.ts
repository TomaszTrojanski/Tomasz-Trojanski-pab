import { Schema, model,connect } from "mongoose";
import { freemem } from "os";
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

        const orders = [
            {
                employee: '62826aff5986dcfe48d66dd4',
                items: [
                    '6283fc51124f7b21d9c97d61',
                    '6283fc51124f7b21d9c97d65'
                ],
                status: 1,
                table: '6284ab720b1b925fc9c801fe',
                price: 35
            }
        ];

        if (await this.orderModel.countDocuments() === 0)
        {
            await this.orderModel
            .insertMany(orders)
            .then(function()
            {
                console.log("Orders have been populated!")
            }).catch(function(err: any)
            {
                console.log(err);
            });
        }
    };

    async addOrder(order: Order) : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let menuItemRepository = new MenuItemRepository();

        if(!order.price){
            let price = 0;
            for(let i = 0; i < order.items.length; i++)
            {
                let orderMenuItem = order.items[i];
                let itemPrice = (await menuItemRepository.getMenuItemById(orderMenuItem._id)).price;
                price += +itemPrice;
            }
            order.price = price;
        }

        await this.orderModel
        .create(order)
        .then(function()
        {
            console.log("Order has been added!")
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async deleteOrderById(id: string) : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        await this.orderModel
        .findByIdAndDelete(id)
        .then(function()
        {
            console.log("Order has been deleted!")
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    async getOrderById(id: string) : Promise<Order>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        let order = await this.orderModel.findById(id);
        if (order)
            return order;
        else
            return null as any;
    }

    async getOrders() : Promise<Order[]>
    {
        return await this.orderModel.find();
    };

    async updateOrderById(id: string, order: Order) : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        let orderToUpdate = await this.orderModel.findById(id);
        let menuItemRepository = new MenuItemRepository();

        if (orderToUpdate)
        {
            if(order.employee)
                orderToUpdate.employee = order.employee;
            if(order.items)
                orderToUpdate.items = order.items;
            if(order.status)
                orderToUpdate.status = order.status;
            if(order.table)
                orderToUpdate.table = order.table;
            if(order.price)
                orderToUpdate.price = order.price;
            else {
                let price = 0;
                for (let i = 0; i < orderToUpdate.items.length; i++)
                {
                    let item = orderToUpdate.items[i];
                    let itemPrice = (await menuItemRepository.getMenuItemById(item._id)).price;
                    price += +itemPrice;
                }
                orderToUpdate.price = price;
            }
        }

        await orderToUpdate.save()
        .then(function()
        {
            console.log("Order has been updated!")
        }).catch(function(err: any)
        {
            console.log(err);
        });
    }

    // get orders by employee id
    async getOrdersByEmployeeId(employeeId: string) : Promise<Order[]>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let orders = await this.orderModel.find({employee: employeeId});
        if (orders)
            return orders;
        else
            return null as any;
    }

    // get orders in a given time period
    async getOrdersByTimePeriod(startDate: Date, endDate: Date) : Promise<Order[]>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        rue&w=majority');

        let orders = await this.orderModel.find({createdAt: {$gte: startDate, $lte: endDate}});
        if (orders)
            return orders;
        else
            return null as any;
    }

    // get income in a given time period
    async getIncomeByTimePeriod(startDate: Date, endDate: Date) : Promise<number>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let orders = await this.orderModel.find({createdAt: {$gte: startDate, $lte: endDate}});
        if (orders)
        {
            let income = 0;
            for (let order of orders)
                income += order.price;
            return income;
        }
        else
            return null as any;
    }
}