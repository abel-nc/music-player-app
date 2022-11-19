import React, { useEffect, useState } from 'react'
import SongsContainer from '../components/songs/SongsContainer'
import { genres } from '../assets/constants'
import { useGlobalContext } from '../context'

const Discover = () => {
    const { fetchData, setSongs } = useGlobalContext()
    const [selectedGenre, setSelectedGenre] = useState('ALL')
    const genreName = genres.find(genre => genre.value == selectedGenre).title

    useEffect(() => {
        setSongs([])
        if (selectedGenre == 'ALL') {
            fetchData('/charts/world')
        } else {
            fetchData(`/charts/genre-world?genre_code=${selectedGenre}`)
        }
    }, [selectedGenre])

    return (
        <section className='w-100 mb-5'>
            <div className='d-flex w-100 justify-content-between align-items-start mb-4'>
                <h2 className='text-white mb-3'>Discover {genreName}</h2>
                <select className='genres-select border-0 rounded text-white mt-1 p-2'
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    name="genres" 
                    id="genres" 
                    value={selectedGenre}>
                    {       
                        genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)
                    }
                </select>
            </div>
            <SongsContainer />
        </section>
    )
}

export default Discover
