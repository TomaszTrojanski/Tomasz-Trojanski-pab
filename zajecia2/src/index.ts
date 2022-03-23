import express from 'express';
import e, {Request, Response} from 'express';
import { rmSync } from 'fs';
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
//create new note in bulk
app.post('/notes', (req:Request, res: Response)=>{
    try{
        const reqNotes: Note[] = req.body.notes;
        reqNotes.map(note=>{
            notes.concat(new Note(note))
            res.status(200).send(notes)
        })
    }catch(e){
        res.status(500).send(e)
    }
})
//get note by id
app.get('/note/:id',(req: Request, res:Response)=>{
    try{
        const note = notes.find(note => note.id === Number(req.params.id))
        if(note){
            res.status(200).send(note)
        }else{
            res.status(400).send('note not found')
        }
    }catch{
        res.send('Cannot get note of id: '+req.params.id)
    }
})
//update a note
app.put('/note/:id', (req: Request, res: Response)=>{
    try{
        let foundNote =notes.find(note => note.id === Number(req.params.id))
        if(foundNote){
            foundNote = new Note({...foundNote, ...req.body.note})
            res.status(200).send(foundNote)
        }else{
            res.status(404).send('note not found')
        }
        console.log(notes)
    }catch{
        res.send('Cannot update note of id: '+req.params.id)
    }
})
//delete a note
app.delete('/note/:id',(req:Request, res:Response)=>{
    try{
        const index=notes.findIndex(note => note.id === Number(req.params.id))
        notes.splice(index, 1)
        res.send(notes)
        console.log(notes)
    }catch{
        res.send('Cannot delete note of id: '+req.params.id)
    }
})
//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//TAGS//


//get all tags
app.get('/tags',(req:Request, res:Response)=>{
    try{
        res.status(200).send(tags)
    }catch(e){
        res.status(500).send(e)
    }
})
//create new tag
app.get('/tags',(req:Request, res:Response)=>{
    try{
        const tag = new Tag(req.body.tag)
        tags.push(tag)
        res.send(tag)
        console.log(tags)
    }catch{
        res.send('error')
    }
})


app.listen(3000)