import { Schema, model, connect } from "mongoose";
import Customer from "../Core/CustomerModel";

export class CustomerRepository{
    customerSchema = new Schema<Customer>(
        {
            name: {type: String, required: true},
            email: {type: String, required: true},
            phone: {type: String, required: true},
            address: {type: String, required: true},
            loyaltyPoints: {type: Number, required: true},
        });
    CustomerModel = model<Customer>('Customer', this.customerSchema);

    async populateCustomers() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const customers =[
            {
                name: 'Customer',
                email: 'customer@gmail.com',
                phone: '123456789',
                address: 'ul. Adres',
                loyaltyPoints: 0
},{
                name: 'Customer2',
                email: 'customre2@gmail.com',
                phone: '123456782',
                address: 'ul. Adres2',
                loyaltyPoints: 0
}];

        await this.CustomerModel
        .insertMany(customers)
        .then(function(){
            console.log('Customers have been populated')
        }).catch(function(err){
            console.log(err);
        });
    }

    async addCustomer(customer: Customer):Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        
        await this.CustomerModel
        .create(customer)
        .then(function(){
            console.log('Customer has been added')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async deleteCustomer(customerName: string):Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.CustomerModel
        .deleteOne({name: customerName})
        .then(function(){
            console.log('Customer has been deleted')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async getCustomer():Promise<Customer[]>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        return await this.CustomerModel.find();
    }
    async getCustomerByName(customerName: string):Promise<Customer>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let customer = await this.CustomerModel.findOne({name: customerName});
        if(customer)
        {
            
            return customer;
        }   else{
            return null as any;
        }
    }
    async updateCustomer(customer: Customer):Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.CustomerModel
        .updateOne({name: customer.name}, customer)
        .then(function(){
            console.log('Customer has been updated')}
        ).catch(function(err){
            console.log(err);
        });
    }
}
        