import { Schema, model, connect } from "mongoose";
import Table from "../Core/TablesModel";

export class TableRepository
{
    tableSchema = new Schema<Table>({
        tableNumber: {type: Number, required: true},
        seats: {type: Number, required: true},
        status: {type: Number, required: true}
    });
    TableModel = model<Table>('Table', this.tableSchema);

    async populateTables() : Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        const tables =[
            {
                tableNumber: 1,
                seats: 4,
                status: 0
    },{
                tableNumber: 2,
                seats: 4,
                status: 0
    },{
                tableNumber: 3,
                seats: 4,
                status: 0
    },{
                tableNumber: 4,

                seats: 4,
                status: 0
    }];

        await this.TableModel
        .insertMany(tables)
        .then(function(){
            console.log('Tables have been populated')
        }
        ).catch(function(err){
            console.log(err);
        });
    }

    async addTable(table: Table):Promise<void>
    {
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');
        
        await this.TableModel
        .create(table)
        .then(function(){
            console.log('Table"+table.tableNumber+"has been added')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async deleteTableByNumber(tableNumber: number):Promise<void>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        await this.TableModel
        .deleteOne({tableNumber: tableNumber})
        .then(function(){
            console.log('Table"+{tableNumber}+" has been deleted')}
        ).catch(function(err){
            console.log(err);
        });
    }
    async getTableByNumber(tableNumber:number):Promise<Table>{
        await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

        let table = await this.TableModel.findOne({tableNumber: tableNumber});
        if(table)
        {
            
            return table;
        }
        else{
            return null as any;
        }}
        async getTable(table: Table):Promise<Table[]>{
            await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

            return await this.TableModel.find();
        }
        async updateTable(table: Table):Promise<void>{
            await connect('mongodb+srv://Admin:<AdminAdmin>@cluster0.tpgqv.mongodb.net/?retryWrites=true&w=majority');

            await this.TableModel
            .updateOne({tableNumber: table.tableNumber}, {$set: {status: table.status}})
            .then(function(){
                console.log('Table"+{tableNumber}+" has been updated')}
            ).catch(function(err){
                console.log(err);
            });
        }        
    }