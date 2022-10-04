import * as Dialog from "@radix-ui/react-dialog"

import Header from "../components/Header"
import NewTransactionModal from "../components/NewTransationModal"
import Pagination from "../components/Pagination"
import Summary from "../components/Summary"
import TransactionTable from "../components/TransactionTable"


function Home() {
    return (
        <div className='bg-[#202024] w-screen h-screen'>
            <Dialog.Root>
                <Header />

               <NewTransactionModal />
            </Dialog.Root>
            

            <Summary />

            <TransactionTable/>
            <Pagination />
        </div>
    )
}

export default Home