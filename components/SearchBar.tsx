"use client"

import React, { useState } from 'react'
import SearchManufacturer from './SearchManufacturer'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-11 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);


const SearchBar = ({setManufacturer,setModel}) => {  
    const [searchManufacturer,setsearchManufacturer] = useState('');
    const [searchModel,setSearchModel] = useState('');
    const router = useRouter();
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if(searchModel.trim() === "" && searchManufacturer.trim() === ""){
        return alert("Please provide some inputs")
      }

      setManufacturer(searchManufacturer);
      setModel(searchModel);
    }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item max-sm:items-start'>
        <SearchManufacturer selected={searchManufacturer} setSelected={setsearchManufacturer} />
        <SearchButton otherClasses='mt-1 sm:hidden' />
      </div>
      <div className="searchbar__item">
        <Image src='/searchModel-icon.png' alt='searchModel' width={25} height={25} className='absolute w-[20px] h-[20px] ml-4' />
        <input type='text' name='searchModel' value={searchModel} onChange={(e)=>setSearchModel(e.target.value)} placeholder='Tiguan...' className='searchbar__input' />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='mt-1 max-sm:hidden' />
    </form>
  )
}

export default SearchBar