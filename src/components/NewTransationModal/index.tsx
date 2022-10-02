import Router from "next/router";
import { useFormik } from "formik"
import * as Yup from 'yup'

import Image from "next/image"

import * as Dialog from "@radix-ui/react-dialog"

import Saidas from "../../assets/saidas.svg"
import Entradas from "../../assets/entradas.svg"
import { useState } from "react"
import { api } from "../../services/api"
import Input from "./Input";


interface Props {
    title: string,
    amount: number,
    category: string
}


function NewTransactionModal() {
    // const  { register, handleSubmit, formState: {errors} } = useForm()

    const [type, setType] = useState('deposit')


    const formik = useFormik({
        initialValues: {
            title: '',
            amount: 0,
            type: '',
            category: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Campo obrigatorio!"),
            amount: Yup.number().min(10,'minimo 10'),
            category: Yup.string().required("Campo obrigatorio!")
        }),
        onSubmit: async(values) => {
            const response = await api.post("/transaction/create", {
                title: values.title,
                amount: Number(values.amount),
                category: values.category,
                type: type
            })
    
            if(response.status === 201) {
                alert("Sucesso")
                Router.reload()
            }
        },
    })

    return (
        <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

        <Dialog.Content className="bg-[#2A2634] fixed text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] px-10 py-8 shadow-black/25">
            <Dialog.Title className="text-[#E1E1E6] text-2xl">Nova Transação</Dialog.Title>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-2 mt-6">

                        <Input id="title" name="title" type="text" placeholder="Descrição" onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title}/>
                        
                        <Input id="amount" name="amount" type="number" placeholder="Valor" onChange={formik.handleChange} value={formik.values.amount} error={formik.errors.amount}/>

                        <Input id="category" name="category" type="text" placeholder="Categoria" onChange={formik.handleChange} value={formik.values.category} error={formik.errors.category}/>

                    </div>
                    <div className="my-4 grid grid-cols-2 gap-1">
                        <button
                            type="button"
                            className={`bg-[#29292E] h-12 flex items-center justify-center rounded gap-1 hover:bg-[#202069] ${type === 'deposit' ? 'border-[1px] border-green-500' : ''}`}
                            onClick={() => {setType('deposit')}}
                        >
                            <Image src={Entradas} alt="Entrada"/>
                            <span className="inline-block ml-1 text-[#C4C4CC] ">Entrada</span>
                        </button>
                        <button
                            type="button"
                            className={`bg-[#29292E] h-12 flex items-center justify-center rounded gap-1 hover:bg-[#202069] ${type === 'withdraw' ? 'border-[1px] border-green-500' : ''}`}
                            onClick={() => {setType('withdraw')}}

                        >
                            <Image src={Saidas} alt="Saída"/>
                            <span className="inline-block ml-1 text-[#C4C4CC] ">Saída</span>
                        </button>
                    </div>

                    <button type="submit" className="bg-[#00875F] w-full py-3 rounded-md font-bold hover:bg-[#00875F]/60">Cadastrar</button>
                </form>
        </Dialog.Content>
    </Dialog.Portal>
    )
}

export default NewTransactionModal