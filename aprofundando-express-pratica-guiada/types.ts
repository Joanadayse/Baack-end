export enum ACCOUNT_TYPE {
    BRONZE = "Bronze",
    SILVER = "Prata",
    GOLD = "Ouro",
    PLATINUM = "Platina",
    BLACK = "Black"
}

export enum CAT_TYPE {
    SDR = "SDR",
    OUTRA = "OUTRA",
   
}

export type TAccount = {
    id: string,
    ownerName: string,
    balance: number,
    type: ACCOUNT_TYPE
}

export type TRaca = {
    id: string
    genero: string,
    name: string,
    cor: string,
    raca: CAT_TYPE
}
