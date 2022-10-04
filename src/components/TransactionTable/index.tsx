import { useContext } from "react"

import { TransactionContext } from "../../context/TransactionsContex"


function TransactionTable() {

    const {transactions} = useContext(TransactionContext)

    return (
        <div className="2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] test:w-[200px] mx-auto test:m-0 test:mt-4">
          <table className='bg-[#29292E] w-full  rounded-md '>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {transactions.map(transaction => {
                return (
                  <tr key={transaction.id} className="border-b-8 border-[#202024]">
                    <td className='text-[#C4C4CC] px-8 py-4 test:hidden'>{transaction.title}</td>
                    <td className={`px-8 py-4 ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`}>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(transaction.amount)}</td>
                    <td className='text-[#C4C4CC] px-8 py-4'>{transaction.category}</td>
                    <td className='text-[#C4C4CC] px-8 py-4'>{new Intl.DateTimeFormat('pt-BR').format(
                      new Date(transaction.createAt)
                    )}</td>
                  </tr>
                )
              })}                   
            </tbody>
          </table>
        </div>
    )
}

export default TransactionTable