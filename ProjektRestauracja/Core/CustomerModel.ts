class Customer{
    customretId: Number;
    name: string;
    email: string;
    phone: string;
    address: string;
    loyaltyPoints: number;

    constructor(customerId: number,name: string, email: string, phone: string, address: string){
        this.customretId = customerId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.loyaltyPoints = 0;
    }
}
export default Customer;