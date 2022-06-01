import Employee from "./EmployeeModel";
import MenuItem from "./MenuItemModel";
import Table from "./TablesModel";

enum OrderStatus{
    Submitted,
    InProgress,
    Completed,
    BillIssued
}
class Order{
    dateTime: Date;
    employee: Employee;
    items: MenuItem[];
    status: OrderStatus;
    table: Table;
    price: number;

    constructor(dateTime:Date,employee: Employee, items: MenuItem[], status: OrderStatus, table: Table, price: number){
        this.dateTime = dateTime;
        this.employee = employee;
        this.items = items;
        this.status = status;
        this.table = table;
        this.price = price;
    }

}
export default Order;