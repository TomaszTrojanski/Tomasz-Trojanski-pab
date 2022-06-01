import { Schema, model,connect } from "mongoose";
import Product from "../Core/ProductModel";
import MenuItem from "../Core/MenuItemModel";
import Order from "../Core/OrderModel";
import Employee from "../Core/EmployeeModel";
import Table from "../Core/TablesModel";
import Restaurant from "../Core/RestaurantModel";

export class OrderRepository
{
    restaurantSchema = new Schema<Restaurant>({
        name: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: String, required: true},
        nip: {type: String, required: true},
        email: {type: String, required: true},
        website: {type: String, required: true},
        description: {type: String, required: false}
    });

    employeeSchema = new Schema<Employee>({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        position: {type: String, required: true},
        restaurant: {type: this.restaurantSchema, ref: 'Restaurant'}
    });

    productSchema = new Schema<Product>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    });

    menuItemSchema = new Schema<MenuItem>({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: false},
        products: [{type:this.productSchema, ref: 'Product'}]
    });
    
    tableSchema = new Schema<Table>({
        number: {type: Number, required: true},
        seats: {type: Number, required: true},
        status: {type: Number, required: true}
    });
    
    orderSchema = new Schema<Order>(
        {
            dateTime: {type: Date, required: true},
            employee: {type: this.employeeSchema, ref: 'Employee'},
            items: [{type: this.menuItemSchema, ref: 'MenuItem'}],
            status: {type: Number, required: true},
            table: {type: this.tableSchema, ref: 'Table'},
            price: {type: Number, required: true}
        });

    OrderModel = model<Order>('Order', this.orderSchema);

    async populateOrders() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        const orders = [
            {
                dateTime: new Date(),
                employee: 
                {
                    name: "Employee2",
                    surname: "Employee2",
                    position: "Waiter",
                    restaurant: 
                    {
                        name: "Restaurant1",
                        address: "Address1",
                        phone: "123456789",
                        nip: "123456789",
                        email: "someEmail@something.com",
                        website: "someWebsite.com",
                    }
                },
                items: 
                [
                    {
                        name: "Coca_Cola",
                        price: 5,
                        type: 3,
                        description: "Coca Cola can",
                        products: 
                        [
                            {
                                name: "Coca_Cola_Can",
                                price: 2.5,
                                quantity: 1
                            }
                        ]
                    },
                    {
                        name: "Chicken_Nuggets",
                        price: 30,
                        type: 1,
                        description: "Chicken nuggets",
                        products:
                        [
                            {
                                name: "Chicken",
                                price: 3,
                                quantity: 2
                            }
                        ]
                    }
                ],
                status: 1,
                table: 
                {
                    number: 1,
                    seats: 4,
                    status: 0
                },
                price: 35
            }
        ];

        if (await this.OrderModel.countDocuments() === 0)
        {
            await this.OrderModel
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

    async addOrder(order: Order) : Promise<boolean | string>
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