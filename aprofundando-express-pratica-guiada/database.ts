import { ACCOUNT_TYPE, CAT_TYPE, TAccount, TRaca } from "./types";

export const accounts: TAccount[] = [
    {
        id: "a001",
        ownerName: "Ciclano",
        balance: 10000,
        type: ACCOUNT_TYPE.GOLD
    },
    {
        id: "a002",
        ownerName: "Astrodev",
        balance: 500000,
        type: ACCOUNT_TYPE.BLACK
    },
    {
        id: "a003",
        ownerName: "Fulana",
        balance: 20000,
        type: ACCOUNT_TYPE.PLATINUM
    }
]

export const catUser: TRaca [] = [
    {
        id:"a001",
    genero: "femea",
        name: "angela",
        cor: "Branca",
        raca: CAT_TYPE.SDR
    },
    {
        id:"a002",
        genero: "macho",
        name: "fofinho",
        cor: "preto",
        raca: CAT_TYPE.OUTRA
    },
    {
        id:"a003",
        genero: "femea",
        name: "lindinha",
        cor: "amarelo",
        raca: CAT_TYPE.SDR
    }
]