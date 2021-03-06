import {Schema, model, connect} from 'mongoose';
import { type } from 'os';
import Restaurant from '../Core/RestaurantModel';


export class RestaurantRepository
{
    checkIfRestaurantExists(restaurantName: any): boolean | PromiseLike<boolean> {
        throw new Error("Method not implemented.");
    }
    restaurantSchema = new Schema<Restaurant>(
        {
            name: {type: String, required: true},
            address: {type: String, required: true},
            phone: {type: String, required: true},
            nip: {type: String, required: true},
            email: {type: String, required: true},
            website: {type: String, required: true},
            description: String
        });
    RestaurantModel = model<Restaurant>('Restaurant', this.restaurantSchema);



async populateRestaurants() : Promise<void>
{
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

    const restaurants =[
        {
            name: 'Restauracja',
            address: 'ul. Krakowska',
            phone: '123456789',
            nip: '123456789',
            email: 'resem@gmail.com',
            website: 'www.restauracja.pl',
        },{
            name: 'Restauracja2',
            address: 'ul. Krakowska2',
            phone: '123456782',
            nip: '123456782',
            email: 'resem2@gmail.com',
            website: 'www.restauracja2.pl',
        }];
        if(await this.RestaurantModel.countDocuments() === 0)
        {
            await this.RestaurantModel
            .insertMany(restaurants)
            .then(function()
            {
                console.log("Restaurants have been populated!")
            }).catch(function(err)
            {
                console.log(err);
            });
        }
    }

async addRestaurant(restaurant: Restaurant):Promise<void> 
{
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');


    await this.RestaurantModel
    .create(restaurant)
    .then(function(){
        console.log("Restaurant"+restaurant.name+" has been added")});
}
async getRestaurant():Promise<Restaurant[]> {
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
    let restaurants: Restaurant[];
    await this.RestaurantModel
    .find()
    .then(function(res){
        restaurants=res;}).catch(function(err:any){
            console.log(err);
        });

    return restaurants;
}
async deleteRestaurantByName(restaurantName:string):Promise<void> {
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

    await this.RestaurantModel
    .deleteOne({name: restaurantName})
    .then(function(){
        console.log("Restaurant "+Restaurant.name+"has been deleted")}).catch(function(err){
            console.log(err);
        });
}
async getRestaurantByName(restaurantName:string):Promise<Restaurant> {
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
    let restaurant = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurant)
        {
            return restaurant;
        }
        else
        {
            return null as any;
        }
    }
    async CheckIfRestaurantExists(restaurantName:string):Promise<boolean> {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        let restaurant = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurant)
        {
            return true;
        }else {
            return false;
        }
    }
    async updateRestaurant(restaurantName:string,restaurant:Restaurant):Promise<void> {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let restaurantToUpdate = await this.RestaurantModel.findOne({name: restaurantName});
        if (restaurantToUpdate)
        {
            if(restaurant.name)
                restaurantToUpdate.name = restaurant.name;
            if(restaurant.address)
                restaurantToUpdate.address = restaurant.address;
            if(restaurant.phone)
                restaurantToUpdate.phone = restaurant.phone;
            if(restaurant.nip)
                restaurantToUpdate.nip = restaurant.nip;
            if(restaurant.email)
                restaurantToUpdate.email = restaurant.email;
            if(restaurant.website)
                restaurantToUpdate.website = restaurant.website;
            if(restaurant.description)
                restaurantToUpdate.description = restaurant.description;

                await this.RestaurantModel
            .updateOne({name: restaurantName}, restaurantToUpdate)
            .then(function()
            {
                console.log("Restaurant " + restaurantName + " has been updated!");
            }).catch(function(err)
            {
                console.log(err);
            });
        }
        else
            console.log("Restaurant " + restaurantName + " does not exist!");

    }
}