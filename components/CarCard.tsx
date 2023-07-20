"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { CarProps } from '@/types'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import CustomButton from './CustomButton'
import CarDetails from './CarDetails'
interface CarCardProps{
    car : CarProps
}

const CarCard = ({car} : CarCardProps) => {
  const {city_mpg,year,make,model,transmission,drive,displacement} = car;
  
  const [isOpen,setIsOpen] = useState(false)

  const carRent = calculateCarRent(city_mpg,year);
  return (
    <div className='car-card group'>
      <div className='car-card__content'>
        <h2 className='car-card__content-title'>{make} {model}</h2>
      </div>
      <p className='flex mt-6 text-[32px] font-extrabold'>
        <span className='self-start text-[14px] font-semibold'> $
        </span>
          {carRent}
        <span className='self-end text-[14px] font-medium'>
          /day
        </span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image src={generateCarImageUrl(car)} alt="car model" fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='object-contain' />
      </div>

      <div className="relative flex w-full mt-2">
        <div className='flex group-hover:invusible w-full justify-between px-2 text-gray'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src='steering-wheel.svg' alt='steering wheel' width={20} height={20} />
          <p className='text-[14px]'>
            {transmission === 'a' ? 'Automatic' : 'Manual'}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src='tire.svg' alt='tire' width={20} height={20} />
          <p className='text-[14px]'>
            {drive.toUpperCase()}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src='gas.svg' alt='gas' width={20} height={20} />
          <p className='text-[14px]'>
            {city_mpg}MPG
          </p>
        </div>
      </div>
      <div className='car-card__btn-container'>
        <CustomButton title='View More' textStyles='text-white text-[14px] leading-[17px] font-bold' containerStyles='w-full py-[14px] rounded-full bg-primary-blue' rightIcon='/right-arrow.svg' handleClick={()=>setIsOpen(true)} />
      </div>
      </div>
      <CarDetails isOpen={isOpen} closeModal={()=>setIsOpen(false)} car={car}/>
    </div>
  )
}

export default CarCard