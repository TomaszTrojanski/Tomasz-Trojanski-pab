import Restaurant from "./RestaurantModel";

class Employee{
    employeeId: number;
    name: string;
    surname: string;
    position: string;
    restaraunt: Restaurant;

    constructor(employeeId: number,name: string, surname: string, position: string, restaraunt: Restaurant){
        this.employeeId = employeeId;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.restaraunt = restaraunt;
    }
}
export default Employee;