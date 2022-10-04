import { useContext, useState } from "react"
import { TransactionContext } from "../../context/TransactionsContex"

interface PaginationItemProps {
    number : number,
    isCorrent?: boolean,
    skip?: number,
    onPageChange: (page: number) => void
}

function PaginationItem({isCorrent = false, number, onPageChange}: PaginationItemProps) {
    const [active, setActive] = useState(true)
    const [take, setTake] = useState<Number>(3)
    // const [skip, setSkip] = useState(0)

    // console.log(skip)

    const { search, type, page, pageR } = useContext(TransactionContext)

    async function next() {

        await page(number)

        await search({ type, take: take as number, pageR: number as number })
    }

    return(
        <button type="button" onClick={() => {onPageChange(number), next()}} className={`bg-[#323238] w-10 h-10 text-gray-400 rounded-md ${isCorrent? "bg-green-800": ''} ` }
    >
        {number}
    </button>
    )
}

export default PaginationItem