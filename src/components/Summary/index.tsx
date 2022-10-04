import Image from 'next/image'


import Saidas from "../../assets/saidas.svg"
import Total from "../../assets/total.svg"
import Entradas from "../../assets/entradas.svg"
import { useContext, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { TransactionContext } from '../../context/TransactionsContex'

interface SummaryProps {
    totalW: number,
    totalD: number,
    total: number  
}

function Summary() {

  const [summary, setSummary] = useState<SummaryProps>({total:0, totalD:0, totalW:0})

  const {search, page} = useContext(TransactionContext)

  async function fetchData() {
    let response = await api.get("/transaction/summary")
    setSummary({
      total: response.data.total,
      totalD: response.data.totalD,
      totalW: response.data.totalW
    })
  }


  useEffect(() => { 
    fetchData()
  }, [])

  async function handleTotal() {
    const type = ""
    const take = 3
    const pageR  = 0

    await page(1)

    await search({type: type as string, take, pageR})
  } 

  async function handleDeposit() {
    const type = "deposit"
    const take = 3
    const pageR  = 0

    await page(1)

    await search({type: type as string, take, pageR})
  }

  async function handleWithdraw() {
    const type = "withdraw"
    const take = 3
    const pageR  = 0

    await page(1)


    await search({type: type as string, take, pageR})
  }

  return (  
    <div className='flex test:flex-col sm:flex-row justify-between xl:w-[900px] md:w-[800px] 2xl:w-[1200px] sm-[600px] test:w-[320px] gap-3 mx-auto relative -top-16 bottom-0 left-0 right-0 test:static test:items-center'>
      <button  onClick={handleDeposit}  className='bg-[#323338] 2xl:w-[352px] h-[137px] sm:w-[250px] test:w-[220px] rounded-md hover:scale-110'>
        <div className='h-full p-6 flex flex-col gap-3'>
          <div className='flex justify-between items-center text-sm text-[#C4C4CC]'>
            Entradas
            <Image src={Entradas} />
          </div>
          <span className='text-[#E1E1E6] font-bold text-3xl'>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(summary?.totalD)}</span>
        </div>
      </button>

      <button onClick={handleWithdraw} className='bg-[#323338] 2xl:w-[352px] h-[137px] sm:w-[250px] test:w-[220px] rounded-md hover:scale-110'>
        <div className='h-full p-6 flex flex-col gap-3'>
          <div className='flex justify-between items-center text-sm text-[#C4C4CC]'>
            Saídas
            <Image src={Saidas} />
          </div>
          <span className='text-[#E1E1E6] font-bold text-3xl'>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(summary?.totalW)}</span>
        </div>
      </button>

      <button onClick={handleTotal} className='bg-[#015F43] 2xl:w-[352px] h-[137px] sm:w-[250px] test:w-[220px] rounded-md hover:scale-110'>
        <div className='h-full p-6 flex flex-col gap-3'>
          <div className='flex justify-between items-center text-sm text-[#C4C4CC]'>
            Total
            <Image src={Total} />
          </div>
          <span className='text-[#E1E1E6] font-bold text-3xl'>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(summary?.total)}</span>
        </div>
      </button> 

    </div>
  )
}

export default Summary