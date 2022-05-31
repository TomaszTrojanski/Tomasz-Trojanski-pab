
class Employee{
    employeeId: number;
    name: string;
    surname: string;
    position: string;
    restarauntName: string;

    constructor(employeeId: number,name: string, surname: string, position: string, restarauntName:string){
        this.employeeId = employeeId;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.restarauntName = restarauntName;
    }
}
export default Employee;