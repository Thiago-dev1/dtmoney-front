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
  }

interface TransactionProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    type: string
}

export const TransactionContext = createContext({} as TransactionContextData)

export function TransactionProvaider({children}: TransactionProvaiderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])  

    useEffect(() => {
     api.get("/transaction")
      .then(response => setTransactions(response.data.transaction))
      
    }, [])

    async function search({type}: searchPros) {
        const response = await api.get("/transaction", {
            params: {
                type: type
            }
        })
        setTransactions(response.data.transaction)

    }

    return (
        <TransactionContext.Provider value={{search, transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}

