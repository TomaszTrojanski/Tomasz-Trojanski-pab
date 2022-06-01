import {Schema, model, connect} from 'mongoose';
import Reservation from '../Core/ReservationModel';

export class RestaurantRepository
{
    reservationSchema = new Schema<Reservation>(
        {
            table: {type: Schema.Types.ObjectId, ref: 'Table', required: true},
            startDateTime: {type: Date, required: true},
            endDateTime: {type: Date, required: true},
            customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true}
        });
    ReservationModel = model<Reservation>('Reservation', this.reservationSchema);

    async populateReservations() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservations =[
            {
                table: '6284ab720b1b925fc9c801fe',
                startDateTime: new Date(2020, 1, 1, 10, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0),
                customer: '6282601eb18137f01f157f6f'
        },{
            table: '6284ab720b1b925fc9c801ff',
                startDateTime: new Date(2020, 1, 1, 10, 0, 0),
                endDateTime: new Date(2020, 1, 1, 11, 0, 0),
                customer: '62826610ec4736a45905ecae'
        }];

        if(await this.ReservationModel.countDocuments() === 0)
        {
            await this.ReservationModel
            .insertMany(reservations)
            .then(function()
            {
                console.log("Reservation for table " + reservation.table.number + " has been added!");
        }).catch(function(err: any)
            {
                console.log(err);
            }); 
        }
    }

    async addReservation(reservation: Reservation) : Promise<boolean | string >
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const alreadyExists = await this.ReservationModel.findOne({
            'table.number': reservation.table.number,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime,
            'customer.name': reservation.customer.name
        });
        if(alreadyExists)
            return "Such reservation already exists.";

        await this.ReservationModel
        .create(reservation)
        .then(function()
        {
            console.log("Reservation for table " + reservation.table.number + " has been added!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const exists = await this.ReservationModel.findOne({
            'table.number': reservation.table.number,
            startDateTime: reservation.startDateTime,
            endDateTime: reservation.endDateTime,
            'customer.name': reservation.customer.name
        });
        if(exists)
            return true;
        else
            return "Reservation has not been added.";
    }

    async deleteReservationById(reservationId: string) : Promise<boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const exists = await this.ReservationModel.findById(reservationId);
        if(!exists)
            return false;

        await this.ReservationModel
        .findByIdAndDelete({_id: reservationId})
        .then(function()
        {
            console.log("Reservation " + reservationId + " has been deleted!");
        }).catch(function(err: any)
        {
            console.log(err);
        });

        const existsAfter = await this.ReservationModel.findById(reservationId);
        if(!existsAfter)
            return true;
        else
            return false;
    }

    async getReservationById(reservationId: string) : Promise<Reservation | boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservation = await this.ReservationModel.findById(reservationId);
        if(reservation)
            return reservation;
        else
            return false;
    }

    async getReservations() : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservations = await this.ReservationModel.find({});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }

    async updateReservationById(reservationId: string, reservation: Reservation) : Promise<boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let reservationToUpdate = await this.ReservationModel.findById(reservationId);
        if(reservationToUpdate)
        {
            if(reservation.table)
                reservationToUpdate.table = reservation.table;
            if(reservation.startDateTime)
                reservationToUpdate.startDateTime = reservation.startDateTime;
            if(reservation.endDateTime)
                reservationToUpdate.endDateTime = reservation.endDateTime;
            if(reservation.customer)
                reservationToUpdate.customer = reservation.customer;

            await reservationToUpdate.save().
            then(function()
            {
                console.log("Reservation of ID " + reservationId + " has been updated!");
            }).catch(function(err: any)
            {
                console.log(err);
            });
            return true;
        }
        else
            return false;
    }

    async getReservationsByCustomerName(customerName: string) : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservations = await this.ReservationModel.find({'customer.name': customerName});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }

    async getReservationsByTableNumber(tableNumber: number) : Promise<Reservation[] | boolean>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const reservations = await this.ReservationModel.find({'table.number': tableNumber});
        if(reservations.length > 0)
            return reservations;
        else
            return false;
    }
}