import {Schema, model, connect} from 'mongoose';
import { type } from 'os';
import Restaurant from '../Core/RestaurantModel';


export class RestaurantRepository
{
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
    await this.RestaurantModel
    .insertMany(restaurants)
    .then(function(){
        console.log('Restaurants have benn populated')
}).catch(function(err){
    console.log(err);
});
}

async addRestaurant(restaurant: Restaurant):Promise<void> 
{
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');


    await this.RestaurantModel
    .create(restaurant)
    .then(function(){
        console.log('Restaurant has been added')});
}
async getRestaurant():Promise<Restaurant[]> {
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
    let restaurants: Restaurant[];
    await this.RestaurantModel
    .find()
    .then(function(res){
        restaurants=res;});

    return restaurants;
}
async deleteRestaurantByName(restaurantName:string):Promise<void> {
    await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

    await this.RestaurantModel
    .deleteOne({name: restaurantName})
    .then(function(){
        console.log('Restaurant has been deleted')});
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
}