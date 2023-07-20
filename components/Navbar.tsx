import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CustomButton from './CustomButton'
const Navbar = () => {
  return (
    <header className='w-full z-10 absolute'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4'>
        <Link href='/' className='flex justify-center items-center'>
        <Image src="/logo.svg" alt="Car Hub logo" width={118} height={18} className='object-contain' />
        </Link>
        <CustomButton title='Sign In' containerStyles='text-primary-blue rounded-full bg-white py-3 min-w-[130px]' btnType='button' />
      </nav>
    </header>
  )
}

export default Navbar