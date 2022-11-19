import React, { useEffect, useState } from 'react'
import SongsContainer from '../components/songs/SongsContainer'
import { useGlobalContext } from '../context'
const geoUrl = 'https://geo.ipify.org/api/v2'
const geoKey = 'at_k6QsDBLsQgaQ39YaTCxbJeasCx73i'

const AroundYou = () => {
    const { setIsError, fetchData, setSongs } = useGlobalContext()
    const [country, setCountry] = useState('MX')

    useEffect(() => {
        setSongs([])
        fetchData(`/charts/country?country_code=${country}`)
    }, [country])

    return (
        <section className='w-100'>
            <h2 className='text-white mb-5'>Around You</h2>
            <SongsContainer />
        </section>
    )
}

export default AroundYou
