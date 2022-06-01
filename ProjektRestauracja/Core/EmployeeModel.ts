import Restaurant from "./RestaurantModel";
class Employee{
    name: string;
    surname: string;
    position: string;
    restaraunt: Restaurant;

    constructor(name: string, surname: string, position: string, restaraunt: Restaurant){
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.restaraunt = restaraunt;
    }
}
export default Employee;