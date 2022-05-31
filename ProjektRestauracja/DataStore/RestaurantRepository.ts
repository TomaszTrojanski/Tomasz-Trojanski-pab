import {Schema, model, connect} from 'mongoose';
import Restaurant from '../Core/RestaurantModel';
const restaurandSchema = new Schema<Restaurant>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    nip: {type: String, required: true},
    email: {type: String, required: true},
    website: {type: String, required: true},
    description: String});

const RestaurantModel = model<Restaurant>('Restaurant', restaurandSchema);

async function populateRestaurants(){
    await connect('ConnectionString');

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
        }
    ];
    await RestaurantModel
    .insertMany(restaurants)
    .then(function(){
        console.log('Restaurants have benn populated')
}).catch(function(err){
    console.log(err);
});
}
async function addRestaurant(restaurant: Restaurant):Promise<void> {
    await RestaurantModel
    .create(restaurant)
    .then(function(){
        console.log('Restaurant has been added')});
}
async function getRestaurant():Promise<Restaurant[]> {
    let restaurants: Restaurant[];
    await RestaurantModel
    .find()
    .then(function(res){
        restaurants=res;});

    return restaurants;
}
async function deleteRestaurantByName(restaurantName:string):Promise<void> {
    await RestaurantModel
    .deleteOne({name: restaurantName})
    .then(function(){
        console.log('Restaurant has been deleted')});
}
    async function getRestaurantByName(restaurantName:string):Promise<Restaurant> {
        let restaurant: Restaurant;
        await RestaurantModel
        .findOne({name: restaurantName})
        .then(function(res){
            restaurant=res;});

        return restaurant;
    }