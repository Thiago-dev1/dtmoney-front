import { useContext, useState } from "react"
import { TransactionContext } from "../../context/TransactionsContex"




function Pagination() {
    const [active, setActive] = useState(true)
    const [take, setTake] = useState<Number>(3)
    const [skip, setSkip] = useState(0)

    const {search, type} = useContext(TransactionContext)

    async function next() {
        console.log(skip)
        
        await search({type, take: take as number, skip: skip as number})
    }

    
    return (
        <div className="w-[900px] mx-auto">
            <div className="flex justify-center gap-2">
                <button type="button" className={`bg-[#323238] w-10 h-10 text-gray-400 rounded-md ${active ? "bg-green-800 font-bold text-white": '' }`}
                    onClick={() => {{setSkip(0)} ; next()}}
                >1</button>
                <button className={`bg-[#323238] w-10 h-10 text-gray-400 rounded-md ${active ? "bg-green-800 font-bold text-white": '' }`}
                    onClick={() => {{setSkip(3)} ; next()}}
                >2</button>
                <button className="bg-[#323238] w-10 h-10 text-gray-400 rounded-md"
                    onClick={() => {{setSkip(6)} ; next()}}
                >3</button>
                <button className="bg-[#323238] w-10 h-10 text-gray-400 rounded-md">4</button>
            </div>
        </div>
    )
}

export default Pagination