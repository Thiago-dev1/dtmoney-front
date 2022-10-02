import { InputHTMLAttributes } from "react"


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}


function Input(props: InputProps ) {

    return (
        <div className="flex flex-col">
            <input {...props} className={`p-3 bg-[#121214] rounded placeholder:text-[#7C7C8A] ${props.error? "border-[1px] border-red-400" : ''}`} />
            {props.error && (
                <span className="text-end text-red-500">{props.error}</span>
            )}
        </div>
    )
}

export default Input 