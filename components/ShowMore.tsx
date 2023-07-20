"use client"
import { ShowMoreProps } from '@/types';
import React from 'react'
import CustomButton from './CustomButton';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';

const ShowMore = ({pageNumber,isNext,setLimit}:ShowMoreProps) => {
    const handleNavigation = ()=>{
        const newLimit = (pageNumber + 1) * 10;
        setLimit(newLimit);
    }
  return (
    <div className='w-full flex justify-center gap-5 mt-10'>
        {!isNext && (
            <CustomButton title='Show More' btnType='button' containerStyles='bg-primary-blue rounded-full text-white py-3' handleClick={handleNavigation} />
        )}
    </div>
  )
}

export default ShowMore;