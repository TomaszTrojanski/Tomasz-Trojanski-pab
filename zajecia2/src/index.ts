import express from 'express';
import e, {Request, Response} from 'express';
import {Note, Tag} from './classes';

const app = express()
app.use(express.json())

let notes: Note[]=[]
let tags: Tag[]=[]

//dummy data
notes.push(new Note({title:'Pick up dry cleaning', content:'This is an example note'}))
notes.push(new Note({title:'Coffee with Joshua', content: 'This is an example note'}))
notes.push(new Note({title:'Coffee with Sarah', content:'This is an example note'}))
notes.push(new Note({title:'The greatest achievement of humankind', content:'The earth is flat'}))

//get all note

app.get('/notes', (req:Request, res: Response)=>{
    try{
        res.status(200).send(notes)
    }catch(e){
        res.status(500).send(e)
    }
})
//create new note
app.post('/note',(req: Request, res: Response)=>{
    try{
        const note =new Note(req.body.note)
        notes.push(note)
        console.log(notes)
    }catch{
        res.send('error')
    }
})





app.listen(3000)