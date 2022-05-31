import Table from "./TablesModel";
import Customer from "./CustomerModel";

class Reservation{
    reservationId: number;
    tableNumber: number;
    startDateTime: Date;
    endDateTime: Date;
    customerId:Number;

    constructor(reservationId: Number,table: Table, startDateTime: Date, endDateTime: Date, customerID: Number){
        this.reservationId = reservationId;
        this.tableNumber = table.tableNumber;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customerId = customer.customerId;
    }
}
export default Reservation;

