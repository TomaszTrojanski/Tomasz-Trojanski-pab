import { Schema,model,connect } from "mongoose";
import Employee from "../Core/EmployeeModel";
import { RestaurantRepository } from "./RestaurantRepository";

export class EmployeeRepository
{
    employeeSchema = new Schema<Employee>({
        employeeId: {type: Number, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        position: {type: String, required: true},
        restaurantName: {type: String, required: true}
    });
    EmployeeModel = model<Employee>('Employee', this.employeeSchema);

    async populateEmployees() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const employees =[
            {
                employeeId: 1,
                name: "Jan",
                surname: "Kowalski",
                position: "Manager",
                restaurantName: "Restauracja"
        },{
                employeeId: 2,
                name: "Adam",
                surname: "Nowak",
                position: "Waiter",
                restaurantName: "Restauracja"
        },{
                employeeId: 3,
                name: "Piotr",
                surname: "Kowalski",
                position: "Waiter",
                restaurantName: "Restauracja2"
        },{
                employeeId: 4,
                name: "Krzysztof",
                surname: "Kowalski",
                position: "Waiter",
                restaurantName: "Restauracja2"
        }];
        await this.EmployeeModel
        .insertMany(employees)
        .then(function(){
            console.log('Employees have been populated')
        }).catch(function(err){
            console.log(err);
        });
    }
    async addEmployee(employee: Employee):Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let restaurantRepository = new RestaurantRepository();
        let restaurantExists: boolean = await restaurantRepository.checkIfRestaurantExists(employee.restaurantName);

        if(restaurantExists){
            await this.EmployeeModel
            .create(employee)
            .then(function(){
                console.log("Employee"+employee.name+"has been added")}
            ).catch(function(err){
                console.log(err);
            });
        }else{
            console.log("Restaurant"+employee.restarauntName+ "does not exist");
        }
}
