import Image from 'next/image'
import * as Dialog from "@radix-ui/react-dialog"

import Logo from "../../assets/logo.svg"


function Header() {
    return (
        <header className='bg-[#121214] h-52 test:h-28 text-white'>
        <div className='flex  justify-between 2xl:w-[1200px] xl:w-[900px] md:w-[800px] sm-[600px] mx-auto p-2 pt-9'>
          <div className='flex items-center gap-2'>
            <Image src={Logo} />
            <p className='text-base font-semibold'>DT Money</p>
          </div>
          <Dialog.Trigger className='bg-[#00875F] hover:bg-[#00875ecd] py-3 px-7 rounded-md text-[#FFFFFF]'>Nova transação</Dialog.Trigger>
        </div>
      </header>
    )
}

export default Header