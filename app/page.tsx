"use client"

import Hero from "@/components/Hero";
import { SearchBar, ShowMore } from "@/components";
import {CustomFilter} from "@/components"
import { fetchCars } from "@/utils";
import CarCard from "@/components/CarCard";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading,setLoading] = useState(false);


  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  const [fuel,setFuel] = useState('')
  const [year,setYear] = useState(2022);

  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try{
      const result = await fetchCars({
        manufacturer : manufacturer || '',
        year : year || 2022,
        fuel : fuel || '',
        limit : limit || 10,
        model : model || ''
      });
      setAllCars(result);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCars();
    console.log(fuel,year);
  },[manufacturer,model,fuel,year,limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars ;
  

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='mt-12 w-full flex-wrap items-start gap-5 flex justify-between'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter  title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter  title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        {
          allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {
                  allCars.map((car)=>(
                    <CarCard car={car} />
                  ))
                }
              </div>
              {
                loading && (
                  <div className="mt-16 flex-center w-full">
                    <Image src='/loader.svg' alt="loading" width={50} height={50} className='object-contain' />
                  </div>
                )
              }
              <ShowMore pageNumber={(limit)/10} isNext={limit  > allCars.length} setLimit={setLimit} />
            </section>
          ): loading ? (
            <div className="mt-16 flex-center w-full">
                <Image src='/loader.svg' alt="loading" width={50} height={50} className='object-contain' />
              </div>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Oops,no results
              </h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }
      </div>
    </main>
  )
}
