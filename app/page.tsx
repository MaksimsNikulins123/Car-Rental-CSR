"use client";
import { useEffect, useState } from 'react';

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction} from '@/constants';
import { SearchParamsProps } from '@/types';
import { fetchCars } from '@/utils'
import Image from 'next/image';



// interface CarSearchParamsProps {
//   searchParams: SearchParamsProps;
// }

// export default async function Home({ searchParams }: CarSearchParamsProps) {
export default function Home () {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // });
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2020);
  // const [seslected, setSelected] = useState("");

  //pagination states
  const [limit, setLimit] = useState(10);

  //search message
  const [message, setMessage] = useState("")

  const getCars = async ({ manufacturer, year, fuel, limit, model }: SearchParamsProps) => {
    // const result = await fetchCars({
    //     manufacturer: manufacturer || '',
    //     year: year || 2022,
    //     fuel: fuel || '',
    //     limit: limit || 10,
    //     model: model || '',
    //   });

    //   setAllCars(result);

    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars({fuel, year, limit, manufacturer, model});
  }, [fuel, year, limit, manufacturer, model]);

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl'>
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          {/* <SearchBar /> */}
          <SearchBar 
          setManufacturer={setManufacturer}
          setModel={setModel}
          />
          <div className='home__filter-container'>
            <CustomFilter 
              title="fuel" 
              options={fuels}
              setFilter={setFuel}
              // setSelected={setSelected}
              // selected={selected}
            />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction}
              setFilter={setYear}
              // setSelected={setSelected}
              // selected={selected}
              />
          </div>
        </div>
        {/* {!isDataEmpty ? ( */}
        {allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                { allCars?.map((car, index) => (
                  <CarCard key={index} car={car}/>))}
              </div>

              {
              loading && (
                <div className="mt-16 w-full flex-center">
                  <Image 
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )
              }

              <ShowMore 
                // pageNumber={(searchParams.limit || 10) / 10}
                pageNumber={limit / 10}
                // isNext={(searchParams.limit || 10) > allCars.length}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              {/* <p>{allCars?.message}</p> */}
              <p>{message}</p>
            </div>
          )
        }

      </div>
    </main>
  )
}
