import { useContext, useState } from "react"
import { TransactionContext } from "../../context/TransactionsContex"
import PaginationItem from "./PaginationItem";



interface PaginationProps {
    totalCountRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
    return [new Array(to - from)]
        .map((_, index) => {
            return from + index + 1
        })
        .filter(page => page > 0)
}

function Pagination({
    totalCountRegisters,
    registersPerPage = 3,
    currentPage = 1,
    onPageChange,
}: PaginationProps) {
    const [active, setActive] = useState(true)
    const [take, setTake] = useState<Number>(3)
    // const [skip, setSkip] = useState(0)

    const { search, type,  } = useContext(TransactionContext)

    // async function next() {
    //     console.log(skip)

    //     await search({ type, take: take as number, skip: skip as number })
    // }

    const lastPage = Math.floor(totalCountRegisters / registersPerPage)

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPage = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []

    return (
        <div className="w-[900px] mx-auto">
            <div className="flex justify-center gap-2">

                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} skip={0} />
                        {currentPage > (2 + siblingsCount) && <span className="text-white text-lg font-bold">...</span>}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
                })}

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCorrent />

                {nextPage.length > 0 && nextPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        {(currentPage + 1 + siblingsCount) && <span className="text-white text-lg font-bold">...</span>}
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                )}
            </div>
        </div>
    )
}

export default Pagination