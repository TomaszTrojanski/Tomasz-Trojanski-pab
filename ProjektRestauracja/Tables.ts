class Table
{
    tableNumber: number;
    seats: number;
    status: TableStatus;

    constructor(tableNumber: number, seats: number, status: TableStatus)
    {
        this.tableNumber = tableNumber;
        this.seats = seats;
        this.status = status;
    }
}
eunm TableStatus{
    Available,
    Occupied,
    Dirty,
    OutOfOrder
}