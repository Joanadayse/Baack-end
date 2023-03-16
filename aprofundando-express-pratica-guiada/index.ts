import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts, catUser } from './database'
import { ACCOUNT_TYPE, CAT_TYPE, TRaca } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})


app.get('/accounts/:id', (req:Request, res:Response)=>{
    const id= req.params.id

 const result = accounts.find((account)=>{
    return account.id===id
 })

 res.status(200).send(result)

})

app.delete('/accounts/:id', (req: Request, res: Response)=>{
    const id= req.params.id

    const indexToRemove= accounts.findIndex((account)=>{
        return account.id===id
    })

    if (indexToRemove >=0){
        // splice é o index que quero remover e a posição
        accounts.splice(indexToRemove, 1)
    }

    res.status(200).send("Conta deletada com sucesso")
})

app.put('/accounts/:id', (req:Request, res:Response)=>{
    const id =req.params.id

     const newId= req.body.id as string | undefined
    
     const newOwnerName= req.body.ownerName as string | undefined
     const newBalance= req.body.balance as number | undefined
     const newType= req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account)=>{
        return account.id ===id

    
    })

        // ver se achou uma conta 
        if(account){
            account.id=newId || account.id
            account.ownerName=newOwnerName || account.ownerName
            account.balance= isNaN(newBalance)? account.balance : newBalance
            account.type=newType || account.type
         }

    res.status(200).send("atualização realizada com sucesso")


    })

    app.post('/catUser', (req: Request, res: Response) => {
        const id= req.body.id as string
        const genero = req.body.genero as string
        const name = req.body.name as string
        const cor = req.body.cor as string
        const raca = req.body.raca as CAT_TYPE
    
        const newPet: TRaca = {
            id,
            genero,
            name,
            cor,
            raca
        }
    
        catUser.push(newPet)
    
      res.status(201).send("Cadastro realizado com sucesso")
    })



    app.get("/catUser", (req: Request, res: Response) => {
        res.send(catUser)
    })


    app.put('/catUser/:id' , (req: Request, res: Response)=>{
        const id= req.params.id 

        const newId = req.body.id
        const newGenero= req.body.genero 
        const newName= req.body.name
        const newCor= req.body.cor

        const cat= catUser.find((cat)=>{
            return cat.id === id
        })

        if(cat){
            cat.id= newId || cat.id
            cat.genero= newGenero || cat.genero
            cat.name= newName || cat.name
            cat.cor= !isNaN(newCor) ? newCor : cat.cor
        }

        res.status(200).send("Atualização realizada")

    })


    app.delete("/catUser/:id", (req:Request, res:Response)=>{
        const id = req.params.id
       

        const indexToRemove= catUser.findIndex((cat)=>{
            return cat.id === id
        })

        if (indexToRemove >=0){
            catUser.splice(indexToRemove,1)

        }

        res.status(200).send("Gatinho deletado com sucesso")

    })
   
