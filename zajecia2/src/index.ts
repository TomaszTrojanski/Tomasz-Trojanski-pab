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


app.get('/',function (req: Request, res: Response){



    res.send('Get Hello World')
})
app.post('/', function (req: Request, res: Response){




    //console.log(req.body) //e.x. req.body.title
    res.status(200).send('POST Hello World')
})

app.listen(3000)