import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

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

app.get("/accounts/:id", (req: Request, res: Response) => {
    
// quando acontece um erro no try ele vai para o catch
    try{
        const id = req.params.id
   
    const result = accounts.find((account) => account.id === id) 
//   quando result vinher undefined
    if(!result){
        // personalizando meu erro com o 404
        res.status(404)

        throw new Error("conta não encontrada verifique a 'id'")

  }
    res.status(200).send(result)

    }catch(err){
//    console.log(err)
//    res.status(404).send(err.message)

// vai verificar se o status é 200 , e mudar ele para 500, caso ele não seja ele não entra nesse bloco vai direto para linha 51
if(res.statusCode === 200){
    res.status(500)
}

res.send(err.message)
    }
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
   try{
    const id = req.params.id

    if(id[0] !== 'a'){
        res.status(404)
        throw new Error ("id invalido , deve iniciar com a")

    }

    const accountIndex = accounts.findIndex((account) => account.id === id)

    if (!accountIndex || accountIndex < 0) {
        res.status(404)
        throw new Error ("Conta nao encontrada")
       
    }else {
        // retirar a ultima conta
        accounts.splice(accountIndex, 1)
        res.status(200).send("item deletado com sucesso")
    }

 
} catch(err){
    if(res.statusCode === 200){
        res.status(500)
    }

    res.send(err.message)

}
})

   

app.put("/accounts/:id", (req: Request, res: Response) => {
  try{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined
// se eu estou recebendo alguma coisa , se balance for diferente de undefined
    if(newBalance!== undefined){
        // vai retornar o tipo da variavel , se ele não for um numero retorna o throw
        if(typeof newBalance !== "number"){
            res.status(400)
            throw new Error ("Balance deve ser um numero")

        }
//    se ele for menor que zero
        if(newBalance < 0){
            res.status(400)
            throw new Error ("Balance deve ser maior ou igual a zer")

        }
    }

    // ---------- EXERCICIO DE FIXAÇÃO

    if (newType !== undefined){
        if(newType !== "Ouro" && newType !== "Platina" && newType !== "Black")
         res.status(400)
         throw new Error ("Type deve ser uma categoria válida")
    }

    if(newId !== undefined){
        if (typeof newId !== "string"){
           res.status(400)
           throw new Error ("O id deve ser uma string")
        }

        if (newId[0] !== 'a'){
            res.status(400)
            throw new Error("O id deve ser iniciar com a letra 'a'")
        }
    }

    if (newOwnerName.length <2){
        res.status(400)
        throw new Error("O ownerName deve ter no mínimo 2 caracteres.")
    }

    // --------------

    const account = accounts.find((account) => account.id === id) 

    if (account) {
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.type = newType || account.type

        account.balance = isNaN(newBalance) ? account.balance : newBalance
    }

    res.status(200).send("Atualização realizada com sucesso")
  }catch(err){
    if(res.statusCode === 200){
        res.status(500)
    }

    res.send(err.message)

}

})