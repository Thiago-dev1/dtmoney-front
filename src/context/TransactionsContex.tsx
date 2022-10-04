import { createContext, useEffect, useState } from "react"
import { api } from "../services/api"


interface TransactionProps {
    id: string,
    title: string,
    amount: number,
    category: string,
    createAt: string
  }

  interface TransactionContextData {
    search(type: searchPros): Promise<void>
    transactions: TransactionProps[]
    type: string
  }

interface TransactionProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    type: string,
    take: number,
    skip: number
}

export const TransactionContext = createContext({} as TransactionContextData)

export function TransactionProvaider({children}: TransactionProvaiderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const [type, setType] = useState<string>('')  

    useEffect(() => {
     api.get("/transaction", {
        params: {
            take: 3,
            skip: 0
        }
     })
      .then(response => setTransactions(response.data.all))

      
    }, [])

    async function search({type, take, skip}: searchPros) {
        const response = await api.get("/transaction", {
            params: {
                type: type,
                take,
                skip
            }
        })
        setTransactions(response.data.all)
        setType(type)

    }

    return (
        <TransactionContext.Provider value={{search, transactions, type}}>
            {children}
        </TransactionContext.Provider>
    )
}

