import React, { useEffect, useState } from 'react'
import SongsContainer from '../components/songs/SongsContainer'
import { useGlobalContext } from '../context'
const geoUrl = 'https://geo.ipify.org/api/v2'
const geoKey = 'at_k6QsDBLsQgaQ39YaTCxbJeasCx73i'

const AroundYou = () => {
    const { setIsError, fetchData, setSongs } = useGlobalContext()
    const [country, setCountry] = useState('')

    useEffect(() => {
        setSongs([])
        fetchCountry()
        if (country.length > 0) {
            fetchData(`/charts/country?country_code=${country}`)
        }
    }, [country])

    // GET USERS COUNTRY
    const fetchCountry = async () => {
        try {
            const response = await fetch(`${geoUrl}/country?apiKey=${geoKey}`)
            const result = await response.json()
            setCountry(result.location.country)
        } catch (e) {
            console.log(e)
            setIsError(true)
        }
    }

    return (
        <section className='w-100'>
            <h2 className='text-white mb-5'>Around You</h2>
            <SongsContainer />
        </section>
    )
}

export default AroundYou