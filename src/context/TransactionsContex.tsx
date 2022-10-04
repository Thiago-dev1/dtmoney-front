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
    page(page: number): Promise<void>
    transactions: TransactionProps[]
    type: string,
    count: number,
    pageR: number
  }

interface TransactionProvaiderProps {
    children: React.ReactNode
}

interface searchPros {
    type: string,
    take: number,
    pageR: number
}

export const TransactionContext = createContext({} as TransactionContextData)

export function TransactionProvaider({children}: TransactionProvaiderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const [type, setType] = useState<string>('')  
    const [count, setCount] = useState<number>(0)
    const [pageR, setPageR] = useState<number>(1)

    useEffect(() => {
     api.get("/transaction", {
        params: {
            take: 3,
            skip: 0
        }
     })
      .then(response => [setTransactions(response.data.all), setCount(response.data.count)])

      
    }, [])


    async function search({type, take, pageR}: searchPros) {
        //console.log(pageR)
        
        const response = await api.get("/transaction", {
            params: {
                type: type,
                take,
                page: pageR
            }
        })
        setTransactions(response.data.all)
        setType(type)
        setCount(response.data.count)

    }

    async function page(page: number) {
        setPageR(page)
        // console.log(pageR)
    }

    return (
        <TransactionContext.Provider value={{search, page, transactions, type, count, pageR}}>
            {children}
        </TransactionContext.Provider>
    )
}

