import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses } from './database'
import { TCourse } from './types'
import { students } from '../apis-e-express-template/src/database'
import { TStudent } from '../apis-e-express-template/src/types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

// --------------PRATICA GUIADA--------------------

// metodo GET --- https://localhost:3003/coures

// primeiro endpoint
app.get('/coures',(req:Request , res:Response)=>{
    res.send(courses)
} )
// GET com query = /courses/search = para buscar todas que o nome tenha q
//  /courses/search?q=react /para buscar uma query especifica

// segundo endpoint
app.get('/courses/search', (req:Request , res:Response)=>{
    const q= req.query.q as string
    const filterCourses:TCourse[]= courses.filter((course)=>{
        // para ver se a q existe
       if(q){
        return course.name.toLowerCase().includes(q.toLowerCase())
       }
       return course
    })

    res.status(200).send(filterCourses)
})

// terceiro endpoint
// https://localhost:3003/coures
//  passar o body-{ "id":"004",
// "name": "css",
// "lessons": 10,
// "stack":"Front-end"}

app.post('/courses', (req:Request , res:Response)=>{
    const body= req.body
    const {id,name,lessons,stack}= body

    const newCourse: TCourse={
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)
    res.status(201).send("Curso Adicionado")
})

// exercicios
// adicionar uma nova entidade na aplicação
app.get('/students', (req:Request, res:Response)=>{
    res.status(200).send(students)
})

app.get('/students/search', (req:Request, res:Response)=>{
    const q= req.query.q as string
    const filterStudents= students.filter((student)=>{
        return student.name.includes(q)
    })
    res.status(200).send( q? filterStudents : students)
})

app.post('/students', (req:Request, res:Response)=>{
    const body= req.body
    const{id, name, age}= body

    const newStudent: TStudent={
        id,
        name,
        age,
    }

    students.push(newStudent)

    res.status(201).send("estudante adicionado com sucesso")
})