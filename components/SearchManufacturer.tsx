"use client"

import React, { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'
import { manufacturers } from '@/constants'
import Image from 'next/image'

const SearchManufacturer = ({selected,setSelected}:SearchManufacturerProps) => {
    const [query,setQuery] = useState('');

    const filtredManufacturers = query === "" ? manufacturers : manufacturers.filter((item)=>(
        item.toLocaleLowerCase()
        .replace(/\s+/g,"")
        .includes(query.toLocaleLowerCase().replace(/\s+/g,""))
    ))

  return (
    <div className='search-manufacturer'>
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full'>
                <Combobox.Button className='absolute top-[14px] ml-5'>
                    <Image src="/car-logo.svg" alt="logo" height={20} width={20} />
                </Combobox.Button>
                <Combobox.Input
                  className='search-manufacturer__input'
                  placeholder='Volkswagen'
                  displayValue={(manufacturer:string)=>manufacturer}
                  onChange={(e)=>setQuery(e.target.value)}
                ></Combobox.Input>
                <Transition as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                afterLeave={()=>setQuery('')}>
                    <Combobox.Options>
                        {
                            filtredManufacturers.length === 0 && query !== "" ? (<Combobox.Option value={query} className='search-manufacturer__option'>
                                Create "{query}"
                            </Combobox.Option>) : (
                                filtredManufacturers.map((item)=>(
                                    <Combobox.Option key={item} value={item} className={({active})=>`
                                      relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                                    `}>
                                         {({ selected, active }) => (
                                            <>
                                                <span
                                                className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                }`}
                                                >
                                                {item}
                                                </span>
                                                {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active ? 'text-white' : 'text-teal-600'
                                                    }`}
                                                >
                                                </span>
                                                ) : null}
                                            </>
                    )}
                                    </Combobox.Option>
                                ))
                            )
                        }
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer