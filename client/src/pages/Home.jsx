import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useQueries } from '@tanstack/react-query';
import api from './../api/index';
import Loader from '../components/Loader';

const Home = () => {

    const { isLoading, isError, data } = useQueries({
        queryKey: ['recipes'],
        queryFn: () => api.get('/api/v1/recipes').then((res) => res.data.recipes)
    })


    return (
        <main className='overflow-y-auto'>
            <section className='bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg'>
                <CiSearch className='text-xl' />
                <input type='text' className='w-full outline-none text-zinc-700' />
            </section>

            <section>
                {
                    isLoading ? (
                        <Loader />
                    ) : error ? (
                        'Error'
                    ) : (
                        <div>
                            {
                                data.map((i) => (
                                    <div>Kart</div>
                                ))
                            }
                        </div>
                    )
                }
            </section>
        </main>
    )
}

export default Home