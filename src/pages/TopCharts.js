import React, { useEffect } from 'react'
import SongsContainer from '../components/songs/SongsContainer'
import { useGlobalContext } from '../context'

const TopCharts = () => {
    const { fetchData, setSongs } = useGlobalContext()

    useEffect(() => {
        setSongs([])
        fetchData('/charts/world')
    }, [])

    return (
        <section className='w-100'>
            <h2 className='text-white mb-5'>Top Charts</h2>
            <SongsContainer />
        </section>
    )
}

export default TopCharts