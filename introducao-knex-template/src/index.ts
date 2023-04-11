import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { LIMIT_TRIGGER_DEPTH } from 'sqlite3'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Pratica guiada

app.get("/bands",async(req:Request , res:Response)=>{
try{

const result= await db.raw(`SELECT*FROM bands`)

res.status(200).send(result)

}catch(error:any){

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }

}



})


app.post("/bands",async (req:Request , res:Response)=>{

try{

 const {id, name}= req.body


 if(!id || !name){
    res.status(400)
    throw new Error ("Ha dados invalidos")
 }

 await db.raw(`
 INSERT INTO bands
 VALUES("${id}", "${name}")
 `)

 res.status(200).send("Banda Cadastrata!")


}catch(error:any){

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }

}


})


app.put("/bands/:id",async (req:Request , res:Response)=>{

    try{
        const id= req.params.id

        const newId= req.body.id
        const newName= req.body.name

        console.log(id)
        console.log(newId, newName)

        if(newId !== undefined){
            if (typeof newId !== "string"){
                 res.status(400)
                 throw new Error("Id deve ser string")
            }

            if(newId.length <2){
                res.status(400)
                throw new Error("id deve possuir no minimo dois caracteres")
            }  

        }

        if(newName !== undefined){
            if (typeof newName !== "string"){
                res.status(400)
                throw new Error("Name deve ser string")
           }

            if(newName.length <2){
                res.status(400)
                throw new Error("Name deve possuir no minimo dois caracteres")
            }
        }

      const [band]=  await db.raw(`
        SELECT * FROM bands 
        WHERE id="${id}";
        `)
     
        if(band){
            await db.raw(`
            UPDATE bands 
            SET 
            id=" ${newId || band.id}",
            name="${newName || band.name}"
           WHERE 
           id = "${id}";
            `)
        }else{
            res.status(404)
            throw new Error("id não foi econtrado")
        }

    
        res.status(200).send("edição feita com sucesso")


    
    
    }catch(error:any){
    
        if (req.statusCode === 200) {
            res.status(500)
        }
    
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    
    }
    
    
    })
