"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

import { SearchManufacturer } from "./"
import Image from 'next/image';
import { SearchBarProps } from '@/types';

const SearchButton = ({ otherClases }: { otherClases: string }) => (
    <button
        type='submit'
        className={`-ml-3 z-10 ${otherClases}`}
    >
        <Image
            src='/magnifying-glass.svg'
            alt='magnifying glass'
            width={40}
            height={40}
            className='object=contain'
        />

    </button>
)

const SearchBar = ({setManufacturer, setModel}: SearchBarProps ) => {
    // const [manufacturer, setManufacturer] = useState('');
    const [searchManufacturer, setSearchManufacturer] = useState('');
    const [searchModel, setSearchModel] = useState('');
    // const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (manufacturer === '' && model === '') {
        if (searchManufacturer === '' && searchModel === '') {
            return alert('Please fill in the search bar')
        }

        // updateSearchParams(
        //     model.toLowerCase(),
        //     manufacturer.toLowerCase()
        // )
        setModel(searchModel)
        setManufacturer(searchManufacturer)
    }

    // const updateSearchParams = (model: string, manufacturer: string) => {
    //     const searchParams = new URLSearchParams(window.location.search);

    //     if (model) {
    //         searchParams.set('model', model)
    //     } else {
    //         searchParams.delete('model')
    //     }

    //     if (manufacturer) {
    //         searchParams.set('manufacturer', manufacturer)
    //     } else {
    //         searchParams.delete('manufacturer')
    //     }

    //     const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    //     router.push(newPathname)
    // }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    // manufacturer={manufacturer}
                    manufacturer={searchManufacturer}
                    // setManufacturer={setManufacturer}
                    setManufacturer={setSearchManufacturer}
                />
                <SearchButton otherClases='sm:hidden' />
            </div>
            <div className='searchbar__item'>
                <Image
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt='car model'
                />
                <input
                    type='text'
                    name='model'
                    // value={model}
                    value={searchModel}
                    // onChange={(e) => setModel(e.target.value)}
                    onChange={(e) => setSearchModel(e.target.value)}
                    placeholder='Tiguan'
                    className='searchbar__input'
                />
                <SearchButton otherClases='sm:hidden' />
            </div>
            <SearchButton otherClases='max-sm:hidden' />
        </form>
    )
}

export default SearchBar